import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";

import { Saving } from "./saving.model";
import { Transaction } from "./transaction.model";
import { User } from "./user.model";
import { TaskSchedulingService } from "./task-scheduling.service";

@Module({
  imports: [
    LoggerModule,
    SequelizeModule.forFeature([Saving, Transaction, User]),
  ],
  providers: [
    TaskSchedulingService,
    { provide: "SEQUELIZE", useExisting: Sequelize },
  ],
})
export class TaskSchedulingModule {}
