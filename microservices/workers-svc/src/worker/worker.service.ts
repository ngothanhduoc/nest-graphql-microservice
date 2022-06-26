import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Saving } from "./saving.model";
import { Transaction } from "./transaction.model";
import RabbitmqServer from "./rabbitmq-server";

@Injectable()
export class WorkerService implements OnModuleInit {
  onModuleInit() {
    this.logger.debug("Start consuming Savings Queue");
    this.sleep(2000);
    setTimeout(() => this.handleSaving(), 5000);
  }
  private readonly logger = new Logger(WorkerService.name);
  @InjectModel(Saving) private readonly repoSaving: typeof Saving;
  @InjectModel(Transaction)
  private readonly repoTransaction: typeof Transaction;
  @Inject("SEQUELIZE") private readonly sequelizeInstance: Sequelize;

  async handleSaving() {
    const savingFixedInterestYear = Number(process.env.SAVING_FIXED_INTEREST);
    const savingFixedInterestDay: number = savingFixedInterestYear / 365;

    const savingModel = this.repoSaving;

    const server = new RabbitmqServer(`${process.env.RABBIT_URL}`);
    await server.start();
    await server.consume(
      `${process.env.QUEUE_SAVING_NAME}`,
      async (message) => {
        const listUser = JSON.parse(message.content.toString());
        await Promise.all(
          listUser.map(async (saving: Saving) => {
            if (saving) {
              const savingDb: Saving = await savingModel.findOne({
                where: { id: saving.id },
              });

              const interestRateAmount: number = Math.ceil(
                (saving.balance_amount * savingFixedInterestDay) / 100
              );

              const savingUpdateData = {
                balance_amount: saving.balance_amount + interestRateAmount,
              };

              const transactionData = {
                savings_id: saving.id,
                users_id: saving.users_id,
                old_balance_amount: saving.balance_amount,
                amount: interestRateAmount,
                new_balance_amount: savingUpdateData.balance_amount,
                type: "SAVING",
              };

              // Start Transaction
              const t = await this.sequelizeInstance.transaction({
                logging: false, // Just for debugging purposes
              });
              this.sleep(500);
              const transactionResult = await this.repoTransaction.create(
                transactionData,
                { transaction: t }
              );
              this.logger.debug("TransactionsService#create.transaction");

              const result = await savingDb.update(savingUpdateData, {
                transaction: t,
              });
              this.logger.debug("SavingsService#update.result");

              t.commit();
            }
          })
        );
      }
    );
  }
  async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
