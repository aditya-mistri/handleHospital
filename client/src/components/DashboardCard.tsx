import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface DashboardCardProps {
  title: string;
  link: string;
  icon: ReactNode;
  subtitle: string;
}

const DashboardCard = ({ title, link, icon, subtitle }: DashboardCardProps) => {
  return (
    <Link to={link}>
      <div className="bg-white p-6 rounded shadow hover:shadow-lg transition-all flex items-center space-x-4">
        <div className="text-blue-600">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
