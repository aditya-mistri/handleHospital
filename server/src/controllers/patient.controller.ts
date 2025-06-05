import { Request, Response, NextFunction } from 'express';
import Patient from '../models/patient.model';

export const getPatients = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients); // no return
  } catch (err) {
    next(err);
  }
};

export const getPatientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' }); // no return
      return;
    }
    res.json(patient); // no return
  } catch (err) {
    next(err);
  }
};

export const createPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient); // no return
  } catch (err) {
    next(err);
  }
};

export const updatePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' }); // no return
      return;
    }
    await patient.update(req.body);
    res.json(patient); // no return
  } catch (err) {
    next(err);
  }
};

export const deletePatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' }); // no return
      return;
    }
    await patient.destroy();
    res.status(204).send(); // no return
  } catch (err) {
    next(err);
  }
};
