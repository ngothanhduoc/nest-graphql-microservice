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
    @CurrentUser() user: any,
    @Args("data") data: DepositWithdrawSavingInput
  ): Promise<any> {
    console.log("Call withdrawSaving");
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

    const amount = await this.savingsService
      .findOne({
        where: JSON.stringify({ users_id: user.id }),
      })
      .toPromise();

    if (Number(amount.balanceAmount) === 0) {
      return {
        errors: [
          {
            field: "balance",
            message: ["Your balance is currently 0"],
          },
        ],
      };
    }

    const amountWithdraw = -Number(data.amount);
    const saving: SavingsDto = await this.savingsService
      .update({
        usersId: user.id,
        amount: amountWithdraw,
      })
      .toPromise();

    console.log("Call depositSaving result amount", saving);

    return {
      balanceAmount: saving.balanceAmount,
    };
  }
}
