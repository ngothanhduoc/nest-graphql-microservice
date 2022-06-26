export class SavingsDto {
  readonly id?: string;
  readonly usersId?: string;
  readonly balanceAmount?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export class DepositSavingsDot {
  readonly usersId?: string;
  readonly amount?: number;
}
