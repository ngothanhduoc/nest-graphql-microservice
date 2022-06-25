import { Inject, OnModuleInit, UseGuards } from "@nestjs/common";
import { ClientGrpcProxy } from "@nestjs/microservices";
import { Resolver, Args, Mutation } from "@nestjs/graphql";

import { PinoLogger } from "nestjs-pino";

import { ISavingsService } from "./savings.interface";
import { SavingPayload, DepositWithdrawSavingInput } from "../graphql/typings";

import { PasswordUtils } from "../utils/password.utils";
import { GqlAuthGuard } from "../auth/gql-auth.guard";
import { CurrentUser } from "../auth/user.decorator";
import { SavingsDto } from "./saving.dto";

@Resolver()
export class SavingMutationResolver implements OnModuleInit {
  constructor(
    @Inject("SavingsServiceClient")
    private readonly savingsServiceClient: ClientGrpcProxy,

    private readonly passwordUtils: PasswordUtils,

    private readonly logger: PinoLogger
  ) {
    logger.setContext(SavingMutationResolver.name);
  }

  private savingsService: ISavingsService;

  onModuleInit(): void {
    this.savingsService = this.savingsServiceClient.getService<ISavingsService>(
      "SavingsService"
    );
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async depositSaving(
    @CurrentUser() user: any,
    @Args("data") data: DepositWithdrawSavingInput
  ): Promise<SavingPayload> {
    if (Number(data.amount) <= 0) {
      return {
        errors: [
          {
            field: "amount",
            message: ["Amount must be greater than 0"],
          },
        ],
      };
    }

    const saving: SavingsDto = await this.savingsService
      .update({
        usersId: user.id,
        amount: Number(data.amount),
      })
      .toPromise();

    console.log("Call depositSaving result amount", saving);

    return {
      balanceAmount: saving.balanceAmount,
    };
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async withdrawSaving(
    @CurrentUser() saving: any,
    @Args("data") data: DepositWithdrawSavingInput
  ): Promise<any> {
    // const isSame: boolean = await this.passwordUtils.compare(
    //   data.currentPassword,
    //   saving.password
    // );
    // const isConfirmed: boolean = data.newPassword === data.confirmPassword;

    // if (!isSame || !isConfirmed) {
    //   throw new Error("Error updating password. Kindly check your passwords.");
    // }

    // const password: string = await this.passwordUtils.hash(data.newPassword);

    // const updatedSaving: any = await this.savingsService.update({
    //   id: saving.id,
    //   data: {
    //     password,
    //   },
    // });
    console.log("Call withdrawSaving");

    return {
      balanceAmount: data.amount,
    };
  }
}
