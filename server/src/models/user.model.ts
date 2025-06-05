// src/models/user.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import Patient from './patient.model';
import Doctor from './doctor.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
export default class User extends Model {
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
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Patient)
  patients!: Patient[];

  @HasMany(() => Doctor)
  doctors!: Doctor[];

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
