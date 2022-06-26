import { FindOptions } from "sequelize/types";

import { Saving } from "./saving.model";
import { SavingsDto, DepositSavingsDot } from "./saving.dto";

export interface ISavingsService {
  findOne(query?: FindOptions): Promise<SavingsDto>;
  create(saving: SavingsDto): Promise<Saving>;
  update(deposit: DepositSavingsDot, type: string): Promise<SavingsDto>;
}
