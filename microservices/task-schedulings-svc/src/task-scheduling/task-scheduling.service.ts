import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { Saving } from "./saving.model";
import { Transaction } from "./transaction.model";
import RabbitmqServer from "./rabbitmq-server";

@Injectable()
export class TaskSchedulingService {
  private readonly logger = new Logger(TaskSchedulingService.name);
  @InjectModel(Saving) private readonly repoSaving: typeof Saving;
  @InjectModel(Transaction)
  private readonly repoTransaction: typeof Transaction;
  @Inject("SEQUELIZE") private readonly sequelizeInstance: Sequelize;

  @Cron(`${process.env.CRON_EXPRESSION}`)
  async handleCron() {
    const server = new RabbitmqServer(`${process.env.RABBIT_URL}`);
    await server.start();

    const result: number = await this.repoSaving.count();

    const numberUserOfPart = Number(process.env.NUMBER_USER_OF_PART);
    const parts: number = Math.ceil(result / numberUserOfPart);

    this.logger.debug("UsersService#count.result %o", result, parts);
    let offset = 0;
    for (let i = 1; i <= parts; i++) {
      const listSaving: Saving[] = await this.repoSaving.findAll({
        attributes: ["id", "users_id", "balance_amount"],
        offset: offset,
        limit: numberUserOfPart,
        raw: true,
      });
      offset = offset + numberUserOfPart;
      // Push message to Queue
      const queue = await server.publishInQueue(
        `${process.env.QUEUE_SAVING_NAME}`,
        JSON.stringify(listSaving)
      );
      await this.sleep(500);
    }
  }

  async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
