import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { User } from "./user.model";
import { Saving } from "./saving.model";
import { Transaction } from "./transaction.model";
import { SavingsDto } from "./saving.dto";

@Injectable()
export class TaskSchedulingService {
  private readonly logger = new Logger(TaskSchedulingService.name);
  @InjectModel(User) private readonly repoUser: typeof User;
  @InjectModel(Saving) private readonly repoSaving: typeof Saving;
  @InjectModel(Transaction)
  private readonly repoTransaction: typeof Transaction;
  @Inject("SEQUELIZE") private readonly sequelizeInstance: Sequelize;

  // @Cron(`${process.env.CRON_EXPRESSION}`)
  @Cron("*/5 * * * * *")
  async handleCron() {
    this.logger.debug("handleCron=========");

    const result: number = await this.repoUser.count();

    const numberUserOfPart = Number(process.env.NUMBER_USER_OF_PART);
    const parts: number = Math.ceil(result / numberUserOfPart);

    // this.logger.debug("UsersService#count.result %o", result, parts);
    let offset = 0;
    for (let i = 1; i <= parts; i++) {
      const user: User[] = await this.repoUser.findAll({
        attributes: ["id"],
        offset: offset,
        limit: numberUserOfPart,
        raw: true,
      });
      offset = offset + numberUserOfPart;
      // console.log(JSON.stringify(user));
      this.handleSaving(user);
    }
  }

  async handleSaving(listUser: User[]): Promise<void> {
    // console.log(listId);
    const savingFixedInterestYear = Number(process.env.SAVING_FIXED_INTEREST);
    const savingFixedInterestDay: number = savingFixedInterestYear / 365;
    console.log("savingFixedInterestDay", savingFixedInterestDay);
    // 5000000 * (3,9/365)* 30 * 3/100 balanceAmount * savingFixedInterestDay / 100
    Promise.all(
      listUser.map(async (user: User) => {
        const saving = await this.repoSaving.findOne({
          where: { users_id: user.id },
        });
        this.logger.debug(saving);
        if (saving) {
          const interestRateAmount: number = Math.ceil(
            (saving.balance_amount * savingFixedInterestDay) / 100
          );

          const savingUpdateData = {
            balance_amount: saving.balance_amount + interestRateAmount,
          };

          const transactionData = {
            savings_id: saving.id,
            users_id: user.id,
            old_balance_amount: saving.balance_amount,
            amount: interestRateAmount,
            new_balance_amount: savingUpdateData.balance_amount,
            type: "SAVING",
          };

          // Start Transaction
          const t = await this.sequelizeInstance.transaction({
            logging: true, // Just for debugging purposes
          });

          const transactionResult = await this.repoTransaction.create(
            transactionData,
            { transaction: t }
          );
          this.logger.debug(
            "TransactionsService#create.transaction",
            transactionResult
          );

          const result: Saving = await saving.update(savingUpdateData, {
            transaction: t,
          });
          this.logger.debug("SavingsService#update.result", result);
          t.commit();
        }
      })
    );
  }
}
