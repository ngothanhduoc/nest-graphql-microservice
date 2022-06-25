import { Inject, OnModuleInit, UseGuards } from "@nestjs/common";
import { ClientGrpcProxy } from "@nestjs/microservices";
import { Resolver, Args, Mutation, Context } from "@nestjs/graphql";

import { isEmpty } from "lodash";
import { PinoLogger } from "nestjs-pino";

import { AuthService } from "./auth.service";
import { RefreshAuthGuard } from "./refresh-auth.guard";
import { GqlAuthGuard } from "./gql-auth.guard";
import { CurrentUser } from "./user.decorator";

import { IUsersService } from "../users/users.interface";
import {
  User,
  Saving,
  SignupUserInput,
  UserPayload,
  LoginUserInput,
} from "../graphql/typings";

import { PasswordUtils } from "../utils/password.utils";
import { ISavingsService } from "../savings/savings.interface";

@Resolver()
export class AuthResolver implements OnModuleInit {
  constructor(
    @Inject("UsersServiceClient")
    private readonly usersServiceClient: ClientGrpcProxy,

    @Inject("SavingsServiceClient")
    private readonly savingsServiceClient: ClientGrpcProxy,

    private readonly authService: AuthService,

    private readonly passwordUtils: PasswordUtils,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(AuthResolver.name);
  }

  private usersService: IUsersService;
  private savingsService: ISavingsService;

  onModuleInit(): void {
    this.usersService = this.usersServiceClient.getService<IUsersService>(
      "UsersService"
    );
    this.savingsService = this.savingsServiceClient.getService<ISavingsService>(
      "SavingsService"
    );
  }

  @Mutation()
  async signup(@Args("data") data: SignupUserInput): Promise<UserPayload> {
    const { count } = await this.usersService
      .count({
        where: JSON.stringify({ email: data.email }),
      })
      .toPromise();

    if (count >= 1) throw new Error("Email taken");

    this.logger.info(`usersService info =>>>>>`, this.usersService);
    const user: User = await this.usersService
      .create({
        ...data,
        password: await this.passwordUtils.hash(data.password),
      })
      .toPromise();

    this.logger.info(`Saving info =>>>>>`, this.savingsService);

    const saving: Saving = await this.savingsService
      .create({
        usersId: user.id,
        balanceAmount: 0,
      })
      .toPromise();

    this.logger.info(`Saving info ${saving}`);
    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  @Mutation()
  async login(
    @Context() context: any,
    @Args("data") data: LoginUserInput
  ): Promise<any> {
    const { res } = context;

    const user: any = await this.usersService
      .findOne({
        where: JSON.stringify({ email: data.email }),
      })
      .toPromise();

    if (isEmpty(user)) throw new Error("Unable to login");

    const isSame: boolean = await this.passwordUtils.compare(
      data.password,
      user.password
    );

    if (!isSame) throw new Error("Unable to login");

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);
    return { user, accessToken, refreshToken };
  }

  @Mutation()
  @UseGuards(RefreshAuthGuard)
  async refreshToken(
    @Context() context: any,
    @CurrentUser() user: User
  ): Promise<UserPayload> {
    const { res } = context;

    const accessToken = await this.authService.generateAccessToken(user);
    const refreshToken = await this.authService.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async logout(@Context() context: any): Promise<boolean> {
    const { res } = context;
    return true;
  }
}
