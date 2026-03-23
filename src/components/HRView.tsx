import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Filter, 
  Search, 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Briefcase, 
  FileText, 
  Download, 
  Edit, 
  Save, 
  CheckCircle2,
  MoreHorizontal,
  UserPlus,
  TrendingUp,
  Clock,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { MOCK_EMPLOYEES, BRANCHES } from '../constants';
import type { Employee } from '../types';
import { Role } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const HRView: React.FC = () => {
  // Data State
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  
  // UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  
  // Edit Mode States
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<Partial<Employee>>({});

  // Stats calculation
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(e => e.status === 'Activo').length;
    const inactive = total - active;
    const avgSalary = employees.reduce((acc, curr) => acc + (curr.salary || 0), 0) / total;
    return { total, active, inactive, avgSalary };
  }, [employees]);

  // Helper for role styles
  const getRoleStyle = (role: Role) => {
    switch (role) {
      case Role.ADMIN: return { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' };
      case Role.MANAGER: return { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' };
      case Role.STYLIST: return { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100' };
      case Role.SALES: return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' };
      case Role.IT: return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-100' };
    }
  };

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBranchName = (id: string) => BRANCHES.find(b => b.id === id)?.name || id;

  // --- HANDLERS ---

  const handleOpenProfile = (emp: Employee) => {
    setSelectedEmployee(emp);
    setIsEditing(false);
    setEditFormData({});
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    setIsEditing(false);
    setEditFormData({});
  };

  const handleEditClick = () => {
    setEditFormData({ ...selectedEmployee });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({});
  };

  const handleSaveChanges = () => {
    if (!selectedEmployee || !editFormData) return;
    const updatedEmployee = { ...selectedEmployee, ...editFormData } as Employee;
    setEmployees(prev => prev.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
    setSelectedEmployee(updatedEmployee);
    setIsEditing(false);
  };

  const handleDeactivate = () => {
    if (!selectedEmployee) return;
    const updatedEmployee = { ...selectedEmployee, status: 'Inactivo' } as Employee;
    setEmployees(prev => prev.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
    setSelectedEmployee(updatedEmployee);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 font-sans pb-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
            <Users size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Recursos Humanos</h1>
            <p className="text-slate-500 font-medium">Gestión de talento, nómina y estructura organizacional.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsNewEmployeeModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 group"
        >
           <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
           Nuevo Empleado
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Equipo', value: stats.total, icon: Users, color: 'indigo', trend: 'Crecimiento +2' },
          { label: 'Colaboradores Activos', value: stats.active, icon: ShieldCheck, color: 'emerald', trend: '98% Asistencia' },
          { label: 'Bajas / Inactivos', value: stats.inactive, icon: Clock, color: 'rose', trend: 'Rotación 2%' },
          { label: 'Salario Promedio', value: `$${Math.round(stats.avgSalary).toLocaleString()}`, icon: TrendingUp, color: 'violet', trend: 'Ajuste anual' }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group"
          >
            <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 group-hover:scale-110 transition-transform", 
              stat.color === 'emerald' ? 'bg-emerald-500' : 
              stat.color === 'rose' ? 'bg-rose-500' : 
              stat.color === 'violet' ? 'bg-violet-500' : 'bg-indigo-500')} />
            
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", 
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 
                stat.color === 'violet' ? 'bg-violet-50 text-violet-600' : 
                'bg-indigo-50 text-indigo-600')}>
                <stat.icon size={24} />
              </div>
              <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", 
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 
                stat.color === 'violet' ? 'bg-violet-50 text-violet-600' : 
                'bg-indigo-50 text-indigo-600')}>
                {stat.trend}
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</span>
            <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-500/5 overflow-hidden">
        {/* Toolbar */}
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-6 bg-slate-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, ID o puesto..."
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
               <Filter size={16} /> Filtros
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
               <Download size={16} /> Reporte
            </button>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                <th className="px-8 py-5">Colaborador</th>
                <th className="px-6 py-5">Puesto / Rol</th>
                <th className="px-6 py-5">Sucursal</th>
                <th className="px-6 py-5">Ingreso</th>
                <th className="px-6 py-5 text-right">Salario</th>
                <th className="px-6 py-5 text-center">Estado</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredEmployees.map(emp => {
                const roleStyle = getRoleStyle(emp.role);
                return (
                  <motion.tr 
                    layout
                    key={emp.id} 
                    className="group hover:bg-indigo-50/30 transition-colors cursor-pointer"
                    onClick={() => handleOpenProfile(emp)}
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xl shadow-sm overflow-hidden">
                          {emp.name.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{emp.name}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: {emp.id.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "inline-flex px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                        roleStyle.bg, roleStyle.text, roleStyle.border
                      )}>
                        {emp.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                        <Building2 size={14} className="text-slate-400" />
                        {getBranchName(emp.branch)}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-500">
                      {emp.joinDate || '2023-01-01'}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-base font-black text-slate-900 tracking-tight">
                        ${emp.salary?.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest",
                          emp.status === 'Activo' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        )}>
                          {emp.status === 'Activo' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {emp.status}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-300">
            <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center mb-6">
              <Users size={48} />
            </div>
            <h3 className="text-xl font-black text-slate-400 tracking-tight">Sin resultados</h3>
            <p className="text-sm font-medium text-slate-400 mt-2">No encontramos colaboradores con esos criterios</p>
          </div>
        )}
      </div>

      {/* --- MODAL: EMPLOYEE PROFILE --- */}
      <AnimatePresence>
        {selectedEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Profile Header */}
              <div className="bg-indigo-600 px-10 py-10 flex justify-between items-start text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                
                <div className="flex gap-8 items-center relative z-10">
                  <div className="w-24 h-24 rounded-[2.5rem] bg-white text-indigo-600 flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-indigo-500/30">
                    {selectedEmployee.name.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white font-black text-3xl mb-2 w-full focus:outline-none focus:bg-white/20"
                      />
                    ) : (
                      <h2 className="text-4xl font-black tracking-tight mb-2">{selectedEmployee.name}</h2>
                    )}
                    <div className="flex items-center gap-3 opacity-90">
                      <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">
                        {selectedEmployee.role}
                      </span>
                      <span className="text-indigo-200 font-black text-xs tracking-widest uppercase">ID: {selectedEmployee.id.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleCloseModal} 
                  className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all relative z-10"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Profile Content */}
              <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Contact Info */}
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Phone size={16} className="text-indigo-600" /> Información de Contacto
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Email Corporativo</label>
                        <div className="flex items-center gap-3 text-slate-900 font-bold">
                          <Mail size={16} className="text-slate-300" />
                          {isEditing ? (
                            <input 
                              type="email" 
                              value={editFormData.email} 
                              onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm"
                            />
                          ) : (
                            selectedEmployee.email
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Teléfono</label>
                        <div className="flex items-center gap-3 text-slate-900 font-bold">
                          <Phone size={16} className="text-slate-300" />
                          {isEditing ? (
                            <input 
                              type="text" 
                              value={editFormData.phone} 
                              onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm"
                            />
                          ) : (
                            selectedEmployee.phone || 'No registrado'
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Ubicación</label>
                        <div className="flex items-center gap-3 text-slate-900 font-bold">
                          <MapPin size={16} className="text-slate-300" />
                          <span className="text-sm">Ciudad de México, MX</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Employment Details */}
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={16} className="text-indigo-600" /> Detalles Laborales
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Sucursal</label>
                          {isEditing ? (
                            <select 
                              value={editFormData.branch} 
                              onChange={(e) => setEditFormData({...editFormData, branch: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-sm font-bold"
                            >
                              {BRANCHES.map(b => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="font-bold text-slate-900 text-sm">{getBranchName(selectedEmployee.branch)}</div>
                          )}
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Estado</label>
                          <div className={cn(
                            "inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                            selectedEmployee.status === 'Activo' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          )}>
                            {selectedEmployee.status}
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Fecha de Ingreso</label>
                        <div className="flex items-center gap-3 text-slate-900 font-bold text-sm">
                          <Calendar size={16} className="text-slate-300" />
                          {selectedEmployee.joinDate || '01 Ene 2023'}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-slate-50">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Salario Mensual</label>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-indigo-600 tracking-tight">
                            ${selectedEmployee.salary?.toLocaleString()}
                          </span>
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">MXN</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="mt-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <FileText size={16} className="text-indigo-600" /> Expediente Digital
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Contrato_Laboral.pdf', icon: FileText, color: 'text-indigo-500' },
                      { name: 'Identificacion.jpg', icon: FileText, color: 'text-rose-500' },
                      { name: 'Comprobante_Dom.pdf', icon: FileText, color: 'text-emerald-500' }
                    ].map(doc => (
                      <button key={doc.name} className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-100 transition-all group">
                        <div className="flex items-center gap-3">
                          <doc.icon size={20} className={doc.color} />
                          <span className="text-xs font-bold text-slate-600">{doc.name}</span>
                        </div>
                        <Download size={16} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Footer */}
              <div className="p-8 bg-white border-t border-slate-100 flex justify-between items-center">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleCancelEdit}
                      className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all"
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleSaveChanges}
                      className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 flex items-center gap-3"
                    >
                      <Save size={20} /> Guardar Cambios
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-50 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                      <Download size={18} /> Recibos de Nómina
                    </button>
                    <div className="flex gap-4">
                      {selectedEmployee.status === 'Activo' && (
                        <button 
                          onClick={handleDeactivate}
                          className="px-8 py-4 bg-white border border-rose-200 text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all"
                        >
                          Dar de Baja
                        </button>
                      )}
                      <button 
                        onClick={handleEditClick}
                        className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 flex items-center gap-3"
                      >
                        <Edit size={20} /> Editar Perfil
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL: NEW EMPLOYEE --- */}
      <AnimatePresence>
        {isNewEmployeeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewEmployeeModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-slate-50 px-10 py-8 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Nuevo Colaborador</h3>
                  <p className="text-slate-500 text-sm font-medium">Registra un nuevo integrante al equipo.</p>
                </div>
                <button 
                  onClick={() => setIsNewEmployeeModalOpen(false)} 
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-10 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nombre Completo *</label>
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                      placeholder="Ej: Roberto Gómez"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Puesto / Rol *</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold appearance-none">
                      {Object.values(Role).map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Corporativo *</label>
                    <input 
                      type="email" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                      placeholder="usuario@kanu.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Teléfono</label>
                    <input 
                      type="text" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                      placeholder="55-0000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Sucursal *</label>
                    <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold appearance-none">
                      {BRANCHES.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Salario Mensual *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="number" 
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                <button onClick={() => setIsNewEmployeeModalOpen(false)} className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Cancelar</button>
                <button onClick={() => setIsNewEmployeeModalOpen(false)} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3">
                  <Save size={20} /> Registrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HRView;
