import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { SequelizeModule } from "@nestjs/sequelize";

import { Saving } from "./saving.model";
import { SavingsController } from "./saving.controller";
import { SavingsService } from "./saving.service";

@Module({
  imports: [LoggerModule, SequelizeModule.forFeature([Saving])],
  providers: [{ provide: "SavingsService", useClass: SavingsService }],
  controllers: [SavingsController],
})
export class SavingsModule {}
