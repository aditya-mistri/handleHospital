// src/models/associations.model.ts
import User from './user.model';
import Patient from './patient.model';
import Doctor from './doctor.model';
import Mapping from './mapping.model';

// REMOVE these lines if using decorators in models
// User.hasMany(Patient, { foreignKey: 'userId', as: 'patients' });
// User.hasMany(Doctor, { foreignKey: 'userId', as: 'doctors' });

Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Doctor.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Patient.hasMany(Mapping, { foreignKey: 'patientId', as: 'mappings' });
Mapping.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

Doctor.hasMany(Mapping, { foreignKey: 'doctorId', as: 'mappings' });
Mapping.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

export default {};
