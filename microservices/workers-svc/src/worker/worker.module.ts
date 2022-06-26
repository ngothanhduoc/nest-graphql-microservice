import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";

import { Saving } from "./saving.model";
import { Transaction } from "./transaction.model";
import { WorkerService } from "./worker.service";

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Saving, Transaction])],
  providers: [WorkerService, { provide: "SEQUELIZE", useExisting: Sequelize }],
})
export class WorkerModule {}
