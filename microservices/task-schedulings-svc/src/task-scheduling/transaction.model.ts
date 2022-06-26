import { Column, Model, Table, DataType, Index } from "sequelize-typescript";

@Table({
  modelName: "transaction",
  tableName: "transactions",
})
export class Transaction extends Model<Transaction> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    comment: "The identifier for the transaction record.",
  })
  id: string;

  @Index("users_id_index")
  @Column({
    type: DataType.TEXT,
    comment: "The identifier user.",
  })
  users_id: string;

  @Column({
    type: DataType.TEXT,
    comment: "The saving's user.",
  })
  savings_id: string;

  @Column({
    type: DataType.FLOAT,
    comment: "Total balance amount of User",
  })
  old_balance_amount: number;

  @Column({
    type: DataType.FLOAT,
    comment: "Total balance amount of User",
  })
  amount: number;

  @Column({
    type: DataType.FLOAT,
    comment: "Total balance amount of User",
  })
  new_balance_amount: number;

  @Column({
    type: DataType.STRING,
    comment: "Action with: Deposit, Withdraw, Cron",
  })
  type: string;
}
