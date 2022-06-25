import { FindOptions } from "sequelize/types";

import { Saving } from "./saving.model";
import { SavingsDto, DepositSavingsDot } from "./saving.dto";

export interface ISavingsService {
  findOne(query?: FindOptions): Promise<Saving>;
  create(saving: SavingsDto): Promise<Saving>;
  update(deposit: DepositSavingsDot): Promise<SavingsDto>;
}
