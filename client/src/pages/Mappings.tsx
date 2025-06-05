import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Mapping } from '../types/Mapping';
import { Patient } from '../types/Patient';
import { Doctor } from '../types/Doctor';

export default function Mappings() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [form, setForm] = useState({ patientId: '', doctorId: '' });

  const fetchAll = async () => {
    const [pRes, dRes, mRes] = await Promise.all([
      axios.get('/patients'),
      axios.get('/doctors'),
      axios.get('/mappings'),
    ]);
    setPatients(pRes.data);
    setDoctors(dRes.data);
    setMappings(mRes.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/mappings', {
      patientId: parseInt(form.patientId),
      doctorId: parseInt(form.doctorId),
    });
    setForm({ patientId: '', doctorId: '' });
    fetchAll();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/mappings/${id}`);
    fetchAll();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assign Doctor to Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 max-w-md">
        <select
          name="patientId"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
          className="w-full border p-2"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select
          name="doctorId"
          value={form.doctorId}
          onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
          className="w-full border p-2"
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Assign</button>
      </form>

      <h2 className="text-xl font-bold mb-2">Doctor-Patient Mappings</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Patient</th>
            <th className="border p-2">Doctor</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((m) => {
            const patient = patients.find((p) => p.id === m.patientId);
            const doctor = doctors.find((d) => d.id === m.doctorId);
            return (
              <tr key={m.id}>
                <td className="border p-2">{patient?.name || 'Unknown'}</td>
                <td className="border p-2">{doctor?.name || 'Unknown'}</td>
                <td className="border p-2">
                  <button onClick={() => handleDelete(m.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
