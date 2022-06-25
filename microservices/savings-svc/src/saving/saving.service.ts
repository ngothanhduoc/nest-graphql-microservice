import { isEmpty } from "lodash";
import { PinoLogger } from "nestjs-pino";
import { Injectable } from "@nestjs/common";
import { FindOptions } from "sequelize/types";
import { InjectModel } from "@nestjs/sequelize";

import { ISavingsService } from "./saving.interface";
import {
  IFindAndPaginateOptions,
  IFindAndPaginateResult,
} from "../commons/find-and-paginate.interface";

import { Saving } from "./saving.model";
import { SavingsDto, DepositSavingsDot } from "./saving.dto";

@Injectable()
export class SavingsService implements ISavingsService {
  constructor(
    @InjectModel(Saving) private readonly repo: typeof Saving,
    private readonly logger: PinoLogger
  ) {
    logger.setContext(SavingsService.name);
  }

  async findOne(query: FindOptions): Promise<Saving> {
    this.logger.info("UsersService#findOne.call %o", query);

    const result: Saving = await this.repo.findOne({
      ...query,
      raw: true,
    });

    this.logger.info("SavingsService#findOne.result %o", result);

    return result;
  }

  async create(saving: SavingsDto): Promise<Saving> {
    this.logger.info("SavingsService#create.call %o", saving);

    const mapping = {
      users_id: saving.usersId,
      balance_amount: Number(saving.balanceAmount),
    };
    const result: Saving = await this.repo.create(mapping);

    this.logger.info("SavingsService#create.result %o", result);

    return result;
  }

  async update(deposit: DepositSavingsDot): Promise<SavingsDto> {
    this.logger.info("SavingsService#update.call %o", deposit);

    const record: Saving = await this.repo.findOne({
      where: { users_id: deposit.usersId },
    });

    if (isEmpty(record)) throw new Error("Record not found.");

    const saving = {
      balance_amount: Number(deposit.amount) + Number(record.balance_amount),
    };

    const result: Saving = await record.update(saving);

    this.logger.info("SavingsService#update.result %o", result);

    const mappingResult: SavingsDto = {
      id: record.id,
      usersId: record.users_id,
      balanceAmount: record.balance_amount,
    };

    //TODO: Create record mapping to Transaction Table

    return mappingResult;
  }
}
