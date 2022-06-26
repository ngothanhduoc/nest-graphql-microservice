import { isEmpty } from "lodash";
import { PinoLogger } from "nestjs-pino";
import { Inject, Injectable } from "@nestjs/common";
import { FindOptions } from "sequelize/types";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";

import { ISavingsService } from "./saving.interface";

import { Saving } from "./saving.model";
import { SavingsDto, DepositSavingsDot } from "./saving.dto";

import { Transaction } from "./transaction.model";

@Injectable()
export class SavingsService implements ISavingsService {
  constructor(
    @InjectModel(Saving) private readonly repo: typeof Saving,
    @InjectModel(Transaction)
    private readonly repoTransaction: typeof Transaction,
    @Inject("SEQUELIZE") private readonly sequelizeInstance: Sequelize,
    private readonly logger: PinoLogger
  ) {
    logger.setContext(SavingsService.name);
  }

  async findOne(query: FindOptions): Promise<SavingsDto> {
    this.logger.info("UsersService#findOne.call %o", query);

    const result: Saving = await this.repo.findOne({
      ...query,
      raw: true,
    });
    const mappingResult: SavingsDto = {
      id: result.id,
      usersId: result.users_id,
      balanceAmount: result.balance_amount,
    };
    this.logger.info("SavingsService#findOne.result %o", result);

    return mappingResult;
  }

  /**
   * Create Saving recode when SignUp
   * @param saving
   * @returns Saving
   */
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

  async update(deposit: DepositSavingsDot, type?: string): Promise<SavingsDto> {
    this.logger.info("SavingsService#update.call %o", deposit);
    const numberAmount = Number(deposit.amount);
    const record: Saving = await this.repo.findOne({
      where: { users_id: deposit.usersId },
    });

    if (isEmpty(record)) throw new Error("Record not found.");

    const saving = {
      balance_amount: numberAmount + Number(record.balance_amount),
    };

    const transactionData = {
      savings_id: record.id,
      users_id: record.users_id,
      old_balance_amount: record.balance_amount,
      amount: numberAmount,
      new_balance_amount: saving.balance_amount,
      type: type || "DEPOSIT",
    };
    const t = await this.sequelizeInstance.transaction({
      logging: false, // Just for debugging purposes
    });

    const transactionResult = await this.repoTransaction.create(
      transactionData,
      { transaction: t }
    );
    this.logger.info(
      "TransactionsService#create.transaction %o",
      transactionResult
    );

    const result: Saving = await record.update(saving, { transaction: t });

    this.logger.info("SavingsService#update.result %o", result);

    const mappingResult: SavingsDto = {
      id: record.id,
      usersId: record.users_id,
      balanceAmount: record.balance_amount,
    };

    t.commit();

    return mappingResult;
  }
}
