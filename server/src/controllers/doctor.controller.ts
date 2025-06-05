import { Request, Response, NextFunction } from 'express';
import Doctor from '../models/doctor.model';

export const getDoctors = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (err) {
    next(err);
  }
};

export const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    next(err);
  }
};

export const updateDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }
    await doctor.update(req.body);
    res.json(doctor);
  } catch (err) {
    next(err);
  }
};

export const deleteDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found' });
      return;
    }
    await doctor.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};