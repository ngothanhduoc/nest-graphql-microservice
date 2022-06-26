import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";

import { Saving } from "./saving.model";
import { Transaction } from "./transaction.model";
import { SavingsController } from "./saving.controller";
import { SavingsService } from "./saving.service";

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Saving, Transaction])],
  providers: [
    { provide: "SavingsService", useClass: SavingsService },
    { provide: "SEQUELIZE", useExisting: Sequelize },
  ],
  controllers: [SavingsController],
})
export class SavingsModule {}
