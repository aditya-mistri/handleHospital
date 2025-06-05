import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './config/db';
// import { setupAssociations } from './models/associations';

import authRoutes from './routes/user.route';
import patientRoutes from './routes/patient.route';
import doctorRoutes from './routes/doctor.route';
import mappingRoutes from './routes/mapping.route';

dotenv.config();

const app = express();

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

app.get('/', (req, res) => {
  res.send('Healthcare API is running');
});

// Setup model associations
// setupAssociations();

// Connect to DB and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync(); // creates tables if not exist
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err: unknown) => {
  if (err instanceof Error) {
    console.error('DB connection or sync error:', err.message);
  } else {
    console.error('DB connection or sync error:', err);
  }
});

export default app;
