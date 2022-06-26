import { Column, Model, Table, DataType, Index } from "sequelize-typescript";

@Table({
  modelName: "saving",
  tableName: "savings",
})
export class Saving extends Model<Saving> {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    comment: "The identifier for the saving record.",
  })
  id: string;

  @Index("users_id")
  @Column({
    type: DataType.TEXT,
    comment: "The saving's user.",
  })
  users_id: string;

  @Column({
    type: DataType.FLOAT,
    comment: "Total balance amount of User",
  })
  balance_amount: number;
}
