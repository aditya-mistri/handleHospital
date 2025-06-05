import { Request, Response, NextFunction } from 'express';
import Mapping from '../models/mapping.model';
import Doctor from '../models/doctor.model';
import Patient from '../models/patient.model';

// Get all mappings with patient and doctor info
export const getMappings = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const mappings = await Mapping.findAll({
      include: [Patient, Doctor],
    });
    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

// Get mappings for a specific patient
export const getMappingsByPatient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientId } = req.params;
    const mappings = await Mapping.findAll({
      where: { patientId },
      include: [Patient, Doctor],
    });
    res.json(mappings);
  } catch (err) {
    next(err);
  }
};

// Assign doctor to patient
export const createMapping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientId, doctorId } = req.body;

    // Optional: check if already mapped
    const existing = await Mapping.findOne({ where: { patientId, doctorId } });
    if (existing) {
      res.status(400).json({ message: 'Mapping already exists' });
      return;
    }

    const mapping = await Mapping.create({ patientId, doctorId });
    res.status(201).json(mapping);
  } catch (err) {
    next(err);
  }
};

// Delete a mapping by ID
export const deleteMapping = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const mapping = await Mapping.findByPk(id);
    if (!mapping) {
      res.status(404).json({ message: 'Mapping not found' });
      return;
    }

    await mapping.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
