import { Inject, OnModuleInit, UseGuards } from "@nestjs/common";
import { ClientGrpcProxy } from "@nestjs/microservices";
import { Resolver, Args, Mutation } from "@nestjs/graphql";

import { PinoLogger } from "nestjs-pino";

import { IUsersService } from "./users.interface";
import {
  User,
  UserPayload,
  UpdateProfileInput,
  UpdatePasswordInput,
} from "../graphql/typings";

import { PasswordUtils } from "../utils/password.utils";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { CurrentUser } from "../auth/user.decorator";

@Resolver()
export class UsersMutationResolver implements OnModuleInit {
  constructor(
    @Inject("UsersServiceClient")
    private readonly usersServiceClient: ClientGrpcProxy,

    private readonly passwordUtils: PasswordUtils,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(UsersMutationResolver.name);
  }

  private usersService: IUsersService;

  onModuleInit(): void {
    this.usersService = this.usersServiceClient.getService<IUsersService>(
      "UsersService"
    );
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updateProfile(
    @CurrentUser() user: User,
    @Args("data") data: UpdateProfileInput
  ): Promise<UserPayload> {
    const updatedUser: User = await this.usersService
      .update({
        id: user.id,
        data: {
          ...data,
        },
      })
      .toPromise();

    return { user: updatedUser };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async updatePassword(
    @CurrentUser() user: any,
    @Args("data") data: UpdatePasswordInput
  ): Promise<UserPayload> {
    const isSame: boolean = await this.passwordUtils.compare(
      data.currentPassword,
      user.password
    );
    const isConfirmed: boolean = data.newPassword === data.confirmPassword;

    if (!isSame || !isConfirmed) {
      throw new Error("Error updating password. Kindly check your passwords.");
    }

    const password: string = await this.passwordUtils.hash(data.newPassword);

    const updatedUser: any = await this.usersService.update({
      id: user.id,
      data: {
        password,
      },
    });

    return { user: updatedUser };
  }
}
