import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user.model';
import Doctor from '../models/doctor.model';
import Patient from '../models/patient.model';
import Mapping from '../models/mapping.model';

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  models: [User, Doctor, Patient, Mapping], // Pass model classes directly
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production'
      ? { require: true, rejectUnauthorized: false }
      : undefined,
  },
  logging: false,
});
