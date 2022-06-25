import Aigle from "aigle";

import { PinoLogger } from "nestjs-pino";
import { Controller, Inject } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { isEmpty, isNil } from "lodash";

import { ICount, IQuery } from "../commons/commons.interface";
import { ISavingsService } from "./saving.interface";
import { IFindPayload } from "../commons/cursor-pagination.interface";

import { Saving } from "./saving.model";
import { SavingsDto, DepositSavingsDot } from "./saving.dto";

const { map } = Aigle;

@Controller()
export class SavingsController {
  constructor(
    @Inject("SavingsService") private readonly service: ISavingsService,
    private readonly logger: PinoLogger
  ) {
    logger.setContext(SavingsController.name);
  }

  @GrpcMethod("SavingsService", "findOne")
  async findOne(query: IQuery): Promise<Saving> {
    this.logger.info("SavingsController#findOne.call %o", query);

    const result: Saving = await this.service.findOne({
      attributes: !isEmpty(query.select) ? query.select : undefined,
      where: !isEmpty(query.where) ? JSON.parse(query.where) : undefined,
    });

    this.logger.info("SavingsController#findOne.result %o", result);

    if (isEmpty(result)) throw new Error("Record not found.");

    return result;
  }

  @GrpcMethod("SavingsService", "create")
  async create(data: SavingsDto): Promise<Saving> {
    this.logger.info("SavingsController#create.call %o", data);

    const result: Saving = await this.service.create(data);

    this.logger.info("SavingsController#create.result %o", result);

    return result;
  }

  @GrpcMethod("SavingsService", "update")
  async update(data: DepositSavingsDot): Promise<SavingsDto> {
    this.logger.info(
      "SavingsController#update.call %o %o",
      data.usersId,
      data.amount
    );

    const result: SavingsDto = await this.service.update(data);

    this.logger.info("SavingsController#update.result %o", result);

    return result;
  }
}
