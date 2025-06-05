// src/models/doctor.model.ts
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
  tableName: 'doctors',
  timestamps: true,
})
export default class Doctor extends Model {
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
    type: DataType.STRING(100),
    allowNull: false,
  })
  specialization!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  experience!: number;

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
