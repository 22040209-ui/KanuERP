import React, { useState } from 'react';
import { 
  Server, 
  Users, 
  Activity, 
  HardDrive, 
  Search, 
  Lock, 
  Eye, 
  RefreshCw,
  Database,
  Clock,
  UserCog,
  ChevronRight,
  Terminal,
  Cpu,
  Globe,
  Zap,
  MoreVertical,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data for IT Module
const SYSTEM_LOGS = [
  { id: 'LOG-9921', timestamp: '2023-10-27 11:45:22', level: 'INFO', message: 'Backup diario completado exitosamente', user: 'SYSTEM', category: 'Backup' },
  { id: 'LOG-9920', timestamp: '2023-10-27 10:12:05', level: 'WARN', message: 'Intento de acceso fallido (3 intentos)', user: 'unknown_ip', category: 'Security' },
  { id: 'LOG-9919', timestamp: '2023-10-27 09:30:00', level: 'INFO', message: 'Sincronización de inventario sucursal Norte', user: 'SYSTEM', category: 'Sync' },
  { id: 'LOG-9918', timestamp: '2023-10-27 09:00:15', level: 'INFO', message: 'Inicio de sesión usuario Admin', user: 'cruiz@kanu.com', category: 'Auth' },
  { id: 'LOG-9917', timestamp: '2023-10-27 08:55:00', level: 'ERROR', message: 'Timeout conexión API Pasarela Pagos', user: 'POS-01', category: 'API' },
];

const SERVER_STATS = {
  cpu: 45,
  memory: 62,
  storage: 78,
  uptime: '14d 2h 15m',
  version: 'v2.4.0-stable',
  latency: '42ms',
  threats: 0
};

const ITView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'logs'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users
  const filteredUsers = MOCK_EMPLOYEES.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
              <Server className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              IT <span className="text-indigo-600">&</span> Soporte
            </h1>
          </div>
          <p className="text-slate-500 font-medium ml-1">Gestión de infraestructura, seguridad y accesos del sistema.</p>
        </div>

        <div className="flex bg-slate-100/80 backdrop-blur-md p-1.5 rounded-[2rem] border border-slate-200 shadow-inner">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'users', label: 'Usuarios', icon: Users },
            { id: 'logs', label: 'Logs', icon: Terminal },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "relative flex items-center gap-2 px-6 py-2.5 rounded-[1.5rem] text-sm font-bold transition-all duration-300",
                activeTab === tab.id 
                  ? "text-white shadow-lg" 
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIT"
                  className="absolute inset-0 bg-indigo-600 rounded-[1.5rem]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <tab.icon size={16} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Real-time Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: 'Uptime Sistema', 
                  value: SERVER_STATS.uptime, 
                  sub: '99.99% Disponibilidad',
                  icon: Activity, 
                  color: 'indigo',
                  trend: 'Estable'
                },
                { 
                  label: 'Latencia DB', 
                  value: SERVER_STATS.latency, 
                  sub: 'Carga: 42%',
                  icon: Database, 
                  color: 'violet',
                  progress: 42
                },
                { 
                  label: 'Almacenamiento', 
                  value: `${SERVER_STATS.storage}%`, 
                  sub: '1.2TB / 2TB',
                  icon: HardDrive, 
                  color: 'amber',
                  progress: SERVER_STATS.storage
                },
                { 
                  label: 'Ciberseguridad', 
                  value: 'Protegido', 
                  sub: '0 Amenazas activas',
                  icon: ShieldCheck, 
                  color: 'emerald',
                  trend: 'Seguro'
                }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 relative overflow-hidden"
                >
                  <div className={cn(
                    "absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-[0.03] transition-transform duration-700 group-hover:scale-150",
                    `bg-${stat.color}-600`
                  )} />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn(
                      "p-4 rounded-2xl shadow-inner",
                      `bg-${stat.color}-50 text-${stat.color}-600`
                    )}>
                      <stat.icon size={28} />
                    </div>
                    {stat.trend && (
                      <span className={cn(
                        "text-[10px] font-black px-3 py-1 rounded-full border tracking-wider uppercase",
                        stat.trend === 'Seguro' || stat.trend === 'Estable' 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      )}>
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-slate-400 text-sm font-bold mb-1 uppercase tracking-widest">{stat.label}</h3>
                  <p className="text-3xl font-black text-slate-900 mb-4">{stat.value}</p>
                  
                  {stat.progress ? (
                    <div className="space-y-2">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={cn("h-full rounded-full", `bg-${stat.color}-500`)} 
                        />
                      </div>
                      <p className="text-xs text-slate-400 font-bold text-right">{stat.sub}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 font-bold">{stat.sub}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Infrastructure & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Server Details */}
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-2 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
              >
                <div className="p-10">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Cpu className="text-indigo-600" size={20} />
                      </div>
                      Infraestructura Core
                    </h3>
                    <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                      <MoreVertical className="text-slate-400" size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {[
                      { label: 'Versión del Sistema', value: SERVER_STATS.version, icon: Zap },
                      { label: 'Dirección IP Pública', value: '192.168.1.105', icon: Globe },
                      { label: 'Zona Horaria', value: 'America/Mexico_City', icon: Clock },
                      { label: 'Estado de Backups', value: 'Activo (Diario 00:00)', icon: Database, highlight: 'emerald' },
                      { label: 'Uso de CPU', value: '45% (8 Cores)', icon: Cpu },
                      { label: 'Memoria RAM', value: '12GB / 16GB', icon: Activity },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                          <p className={cn(
                            "text-base font-black text-slate-900",
                            item.highlight === 'emerald' && "text-emerald-600"
                          )}>{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-slate-200">
                      <RefreshCw size={18} />
                      REINICIAR SERVICIOS
                    </button>
                    <button className="flex-1 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-indigo-200">
                      <Zap size={18} />
                      MANTENIMIENTO PROACTIVO
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Security Alerts */}
              <motion.div 
                variants={itemVariants}
                className="bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-900/20 overflow-hidden flex flex-col"
              >
                <div className="p-10 flex-1">
                  <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                    <ShieldAlert className="text-rose-500" size={24} />
                    Alertas Críticas
                  </h3>
                  
                  <div className="space-y-6">
                    {[
                      { 
                        title: 'Uso de Memoria Crítico', 
                        desc: 'El proceso de reportes consumió 85% de RAM.', 
                        time: '10:00 AM',
                        type: 'warn'
                      },
                      { 
                        title: 'Error API Facturación', 
                        desc: '5 intentos fallidos con el proveedor PAC.', 
                        time: '09:45 AM',
                        type: 'error'
                      },
                      { 
                        title: 'Actualización Lista', 
                        desc: 'Nueva versión v2.4.1 con parches de seguridad.', 
                        time: '08:30 AM',
                        type: 'info'
                      }
                    ].map((alert, i) => (
                      <div key={i} className="group relative pl-6 border-l-2 border-slate-700 hover:border-indigo-500 transition-colors duration-300">
                        <div className={cn(
                          "absolute -left-[5px] top-0 w-2 h-2 rounded-full",
                          alert.type === 'error' ? 'bg-rose-500' : alert.type === 'warn' ? 'bg-amber-500' : 'bg-indigo-500'
                        )} />
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors">{alert.title}</h4>
                          <span className="text-[10px] font-bold text-slate-500">{alert.time}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{alert.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 bg-slate-800/50 border-t border-slate-800">
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-xs tracking-widest transition-all duration-300">
                    VER HISTORIAL COMPLETO
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            key="users"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
              <div className="relative w-full md:w-[450px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre, email o rol..." 
                  className="w-full pl-14 pr-6 py-4 bg-white border-none rounded-2xl text-sm font-bold text-slate-700 shadow-inner focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all duration-300">
                <UserCog size={20} />
                NUEVO USUARIO
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                    <th className="px-10 py-6">Usuario</th>
                    <th className="px-10 py-6">Rol & Permisos</th>
                    <th className="px-10 py-6">Sucursal</th>
                    <th className="px-10 py-6">Estado</th>
                    <th className="px-10 py-6">Último Acceso</th>
                    <th className="px-10 py-6 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredUsers.map((user, i) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group hover:bg-indigo-50/30 transition-all duration-300"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm shadow-inner group-hover:scale-110 transition-transform duration-300">
                            {user.name.substring(0,2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-black text-slate-900 text-base">{user.name}</div>
                            <div className="text-xs text-slate-400 font-bold">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className="inline-flex px-4 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider border border-slate-200 group-hover:bg-white transition-colors">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-10 py-6 font-bold text-slate-600 text-sm">
                        {user.branch === 'b1' ? 'Sucursal Matriz' : 'Sucursal Norte'}
                      </td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                          user.status === 'Activo' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        )}>
                          <span className={cn("w-2 h-2 rounded-full animate-pulse", user.status === 'Activo' ? 'bg-emerald-500' : 'bg-rose-500')}></span>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-slate-400 font-bold text-xs">
                        Hace 2 horas
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md" title="Ver Detalles">
                            <Eye size={20} />
                          </button>
                          <button className="p-3 text-slate-400 hover:text-amber-600 hover:bg-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md" title="Resetear Contraseña">
                            <Lock size={20} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'logs' && (
          <motion.div
            key="logs"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="bg-slate-900 rounded-[3xl] shadow-2xl shadow-slate-900/40 overflow-hidden border border-slate-800"
          >
            <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Terminal className="text-indigo-400" size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Consola de Auditoría</h3>
                  <p className="text-xs text-slate-500 font-bold">Registros de eventos del sistema en tiempo real</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-[10px] font-black text-slate-300 uppercase tracking-widest transition-all">
                  Exportar CSV
                </button>
                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-[10px] font-black text-white uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/20">
                  Limpiar Filtros
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/30 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                    <th className="px-10 py-6">Timestamp</th>
                    <th className="px-10 py-6">Nivel</th>
                    <th className="px-10 py-6">Categoría</th>
                    <th className="px-10 py-6">Evento / Mensaje</th>
                    <th className="px-10 py-6">Usuario</th>
                    <th className="px-10 py-6 text-right">ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50 font-mono">
                  {SYSTEM_LOGS.map((log, i) => {
                    const levelStyles: any = {
                      'INFO': 'text-indigo-400 bg-indigo-400/10',
                      'WARN': 'text-amber-400 bg-amber-400/10',
                      'ERROR': 'text-rose-400 bg-rose-400/10 font-black'
                    };

                    return (
                      <motion.tr 
                        key={log.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-white/5 transition-all duration-200"
                      >
                        <td className="px-10 py-5 text-slate-500 text-xs">{log.timestamp}</td>
                        <td className="px-10 py-5">
                          <span className={cn(
                            "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                            levelStyles[log.level]
                          )}>
                            {log.level}
                          </span>
                        </td>
                        <td className="px-10 py-5">
                          <span className="text-slate-400 text-xs font-bold">{log.category}</span>
                        </td>
                        <td className="px-10 py-5 text-slate-200 text-sm group-hover:text-white transition-colors">{log.message}</td>
                        <td className="px-10 py-5 text-slate-400 text-xs">{log.user}</td>
                        <td className="px-10 py-5 text-right text-slate-600 text-[10px]">{log.id}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-slate-800/20 border-t border-slate-800 flex justify-center">
              <button className="text-slate-500 hover:text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2">
                Cargar más registros <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ITView;
