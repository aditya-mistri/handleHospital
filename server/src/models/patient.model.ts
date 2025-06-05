// src/models/patient.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import User from './user.model';

@Table({
  tableName: 'patients',
  timestamps: true,
})
export default class Patient extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age!: number;

  @Column({
    type: DataType.ENUM('male', 'female', 'other'),
    allowNull: false,
  })
  gender!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  disease!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
