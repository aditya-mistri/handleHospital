import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Login</button>
    </form>
  );
}
