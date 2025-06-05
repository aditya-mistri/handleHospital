// src/models/mapping.model.ts
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
import Patient from './patient.model';
import Doctor from './doctor.model';

@Table({
  tableName: 'mappings',
  timestamps: true,
})
export default class Mapping extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  patientId!: number;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  doctorId!: number;

  @BelongsTo(() => Patient)
  patient!: Patient;

  @BelongsTo(() => Doctor)
  doctor!: Doctor;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
