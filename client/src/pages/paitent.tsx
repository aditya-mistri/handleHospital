import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Patient } from '../types/Patient';

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState<Omit<Patient, 'id'>>({ name: '', age: 0, gender: '', disease: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchPatients = async () => {
    const res = await axios.get('/patients');
    setPatients(res.data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) {
      await axios.post('/patients', form);
    } else {
      await axios.put(`/patients/${editingId}`, form);
      setEditingId(null);
    }
    setForm({ name: '', age: 0, gender: '', disease: '' });
    fetchPatients();
  };

  const handleEdit = (patient: Patient) => {
    setForm({ name: patient.name, age: patient.age, gender: patient.gender, disease: patient.disease });
    setEditingId(patient.id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/patients/${id}`);
    fetchPatients();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 max-w-md">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2" />
        <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} className="w-full border p-2" />
        <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} className="w-full border p-2" />
        <input name="disease" placeholder="Disease" value={form.disease} onChange={handleChange} className="w-full border p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">{editingId ? 'Update' : 'Add'} Patient</button>
      </form>

      <h2 className="text-xl font-bold mb-2">Patient List</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Gender</th>
            <th className="border p-2">Disease</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.age}</td>
              <td className="border p-2">{p.gender}</td>
              <td className="border p-2">{p.disease}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-2 py-1">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
