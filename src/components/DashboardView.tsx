import React from 'react';
import { 
 
  Bell, 
 
} from 'lucide-react';
import type { ViewState, Employee } from '../types';

import RoleSpecificDashboard from './RoleDashboard';
import RightModules from './RightModules';

interface DashboardViewProps {
  onNavigate: (view: ViewState) => void;
  currentUser: Employee;
}

const DashboardView: React.FC<DashboardViewProps> = ({  currentUser }) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Common Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Panel de {currentUser.role}</h1>
          <p className="text-gray-500 text-sm">Bienvenido de nuevo, {currentUser.name}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Entirely Dynamic Content based on Role with Right Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="xl:col-span-3">
          <RoleSpecificDashboard role={currentUser.role} />
        </div>
        <div className="xl:col-span-1">
          <RightModules role={currentUser.role} />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
