import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Doctor } from '../types/Doctor';

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [form, setForm] = useState<Omit<Doctor, 'id'>>({
    name: '',
    specialization: '',
    experience: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchDoctors = async () => {
    const res = await axios.get('/doctors');
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId === null) {
      await axios.post('/doctors', form);
    } else {
      await axios.put(`/doctors/${editingId}`, form);
      setEditingId(null);
    }
    setForm({ name: '', specialization: '', experience: 0 });
    fetchDoctors();
  };

  const handleEdit = (doctor: Doctor) => {
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
    });
    setEditingId(doctor.id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/doctors/${id}`);
    fetchDoctors();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 max-w-md">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          name="experience"
          type="number"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          {editingId ? 'Update' : 'Add'} Doctor
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">Doctor List</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Experience</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id}>
              <td className="border p-2">{d.name}</td>
              <td className="border p-2">{d.specialization}</td>
              <td className="border p-2">{d.experience} yrs</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(d)} className="bg-yellow-500 text-white px-2 py-1">
                  Edit
                </button>
                <button onClick={() => handleDelete(d.id)} className="bg-red-500 text-white px-2 py-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
