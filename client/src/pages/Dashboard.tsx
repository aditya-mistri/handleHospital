import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import { UserIcon, UserGroupIcon, LinkIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Healthcare Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Patients"
          link="/patients"
          icon={<UserGroupIcon className="w-10 h-10" />}
          subtitle="Manage patient records"
        />
        <DashboardCard
          title="Doctors"
          link="/doctors"
          icon={<UserIcon className="w-10 h-10" />}
          subtitle="Manage doctor profiles"
        />
        <DashboardCard
          title="Mappings"
          link="/mappings"
          icon={<LinkIcon className="w-10 h-10" />}
          subtitle="Assign doctors to patients"
        />
      </div>
    </div>
  );
}
