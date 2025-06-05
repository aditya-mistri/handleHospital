import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Error registering user.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Register</button>
    </form>
  );
}
