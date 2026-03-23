import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Scissors, 
  ChevronRight, 
  MoreVertical,
  CheckCircle2,

  Plus,
  Search,
  ChevronLeft,
  Users,
  Wallet,
  BarChart3,
  Globe,
  XCircle,
  CheckCircle,
  DollarSign,
  History,
  CalendarCheck
} from 'lucide-react';
import { MOCK_EMPLOYEES, MOCK_APPOINTMENTS, MOCK_CLIENTS } from '../constants';
import { Role } from '../types';
type ServicesTab = 'agenda' | 'citas' | 'catalogo' | 'clientes' | 'empleados' | 'caja' | 'reportes' | 'portal';

const ServicesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ServicesTab>('agenda');
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate] = useState('2023-10-27');

  const stylists = MOCK_EMPLOYEES.filter(e => e.role === Role.STYLIST);
  const appointments = MOCK_APPOINTMENTS.filter(a => a.date === selectedDate);

  const renderTabButton = (id: ServicesTab, label: string, icon: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
        activeTab === id 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
          : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
      }`}
    >
      {React.createElement(icon, { size: 18 })}
      {label}
    </button>
  );

  const renderAgenda = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('day')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'day' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
            >
              Día
            </button>
            <button 
              onClick={() => setViewMode('week')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'week' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
            >
              Semana
            </button>
            <button 
              onClick={() => setViewMode('month')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'month' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
            >
              Mes
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><ChevronLeft size={20} /></button>
            <span className="text-sm font-bold text-gray-800">27 Octubre, 2023</span>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
            <Plus size={18} />
            Nueva Cita
          </button>
        </div>
      </div>

      {/* Column View by Employee */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
        <div className="min-w-[1000px]">
          <div className="flex border-b border-gray-100">
            <div className="w-20 flex-shrink-0 border-r border-gray-100 bg-gray-50/50"></div>
            {stylists.map(stylist => (
              <div key={stylist.id} className="flex-1 p-4 text-center border-r border-gray-100 last:border-r-0 bg-gray-50/50">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {stylist.name.charAt(0)}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{stylist.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex relative h-[800px]">
            {/* Time labels */}
            <div className="w-20 flex-shrink-0 border-r border-gray-100 bg-white">
              {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => (
                <div key={hour} className="h-20 border-b border-gray-50 relative">
                  <span className="absolute -top-2.5 right-2 text-[10px] font-bold text-gray-400 uppercase">
                    {hour > 12 ? `${hour-12} PM` : `${hour} AM`}
                  </span>
                </div>
              ))}
            </div>

            {/* Columns */}
            {stylists.map(stylist => (
              <div key={stylist.id} className="flex-1 border-r border-gray-100 last:border-r-0 relative group">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-20 border-b border-gray-50 group-hover:bg-gray-50/30 transition-colors"></div>
                ))}
                
                {/* Mock Appointments for this stylist */}
                {appointments.filter(a => a.stylistId === stylist.id).map(apt => (
                  <div 
                    key={apt.id}
                    className={`absolute left-1 right-1 rounded-xl p-3 text-xs border-l-4 shadow-sm cursor-pointer hover:brightness-95 transition-all z-10 ${
                      apt.status === 'Completado' ? 'bg-emerald-50 border-emerald-400 text-emerald-900' :
                      apt.status === 'En Proceso' ? 'bg-blue-50 border-blue-400 text-blue-900' :
                      'bg-amber-50 border-amber-400 text-amber-900'
                    }`}
                    style={{ 
                      top: `${(parseInt(apt.time.split(':')[0]) - 8) * 80 + (parseInt(apt.time.split(':')[1]) / 60) * 80}px`,
                      height: '100px' // Mock 1h 15m
                    }}
                  >
                    <div className="font-bold truncate">{apt.petName}</div>
                    <div className="opacity-80 truncate text-[10px]">{apt.service}</div>
                    <div className="mt-2 flex items-center gap-1 text-[9px] font-bold uppercase">
                      <Clock size={10} />
                      {apt.time}
                    </div>
                  </div>
                ))}

                {/* Blocked time example */}
                {stylist.id === 'e2' && (
                  <div className="absolute top-[320px] left-0 right-0 h-40 bg-gray-100/50 flex items-center justify-center border-y border-gray-200 z-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Descanso</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCitas = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Próximas Citas</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-48" />
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {MOCK_APPOINTMENTS.map(apt => (
              <div key={apt.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <CalendarCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{apt.petName} <span className="text-gray-400 font-normal">({apt.ownerName})</span></h3>
                    <p className="text-xs text-gray-500">{apt.service} • {apt.date} {apt.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                    apt.status === 'Completado' ? 'bg-emerald-100 text-emerald-600' :
                    apt.status === 'Pendiente' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {apt.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-indigo-600"><MoreVertical size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Lista de Espera</h2>
            <div className="space-y-4">
              {[
                { name: 'Toby', owner: 'Sarah W.', service: 'Corte', waitTime: '45m' },
                { name: 'Bella', owner: 'Mike R.', service: 'Baño', waitTime: '1h 20m' },
              ].map((wait, i) => (
                <div key={i} className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-amber-900">{wait.name}</p>
                    <p className="text-xs text-amber-700">{wait.service} • {wait.owner}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-600">{wait.waitTime}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors">
              Añadir a Lista
            </button>
          </div>
          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <h3 className="font-bold mb-2">Citas Recurrentes</h3>
            <p className="text-xs text-indigo-100 mb-4">Configura citas fijas para tus clientes más leales.</p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold">Configurar</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCatalogo = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {['Todos', 'Corte', 'Baño', 'Higiene', 'Salud'].map(cat => (
            <button key={cat} className="px-4 py-1.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors">
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm">
          <Plus size={18} />
          Nuevo Servicio
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[
          { name: 'Baño y Corte Full', price: 450, duration: '90 min', category: 'Estética', status: 'Activo' },
          { name: 'Deslanado Profundo', price: 380, duration: '60 min', category: 'Cuidado', status: 'Activo' },
          { name: 'Corte de Uñas', price: 120, duration: '15 min', category: 'Higiene', status: 'Activo' },
          { name: 'Limpieza de Oídos', price: 150, duration: '20 min', category: 'Salud', status: 'Inactivo' },
        ].map((service, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all">
            <div className="h-32 bg-gray-100 relative">
              <img src={`https://picsum.photos/seed/service${i}/400/200`} alt={service.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 right-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${service.status === 'Activo' ? 'bg-emerald-500 text-white' : 'bg-gray-500 text-white'}`}>
                  {service.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{service.category}</span>
                <span className="text-sm font-black text-gray-900">${service.price}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">{service.name}</h3>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold">
                <Clock size={12} />
                {service.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderClientes = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Directorio de Clientes</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Buscar cliente..." className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm w-64" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase">Cliente</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase">Mascotas</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase">Última Visita</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase">Puntos</th>
                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase">Ticket Prom.</th>
                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-400 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_CLIENTS.map(client => (
                <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{client.name}</p>
                        <p className="text-[10px] text-gray-500">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-1">
                      {client.petNames.map(pet => (
                        <span key={pet} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-bold">{pet}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-600">{client.lastVisit}</td>
                  <td className="py-4 px-6 text-xs font-bold text-indigo-600">{client.loyaltyPoints} pts</td>
                  <td className="py-4 px-6 text-xs font-bold text-gray-800">$450.00</td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-indigo-600"><History size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderEmpleados = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {stylists.map(stylist => (
          <div key={stylist.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                  {stylist.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{stylist.name}</h3>
                  <p className="text-xs text-gray-500">Estilista Senior • {stylist.branch}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-emerald-600 uppercase">Comisión: 15%</p>
                <p className="text-[10px] text-gray-400 mt-1">ID: {stylist.id}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Citas Hoy</p>
                <p className="text-lg font-black text-gray-800">8</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Horas Ocup.</p>
                <p className="text-lg font-black text-gray-800">6.5h</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Eficiencia</p>
                <p className="text-lg font-black text-emerald-600">92%</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Servicios Ofrecidos</h4>
              <div className="flex flex-wrap gap-2">
                {['Corte', 'Baño', 'Tinte', 'Spa'].map(s => (
                  <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold uppercase">{s}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCaja = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Cobros Pendientes</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {MOCK_APPOINTMENTS.filter(a => a.status === 'Completado').map(apt => (
                <div key={apt.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">{apt.petName} <span className="text-gray-400 font-normal">({apt.ownerName})</span></h3>
                      <p className="text-xs text-gray-500">{apt.service} • Finalizado a las 11:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-black text-gray-900">$450.00</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold">Total</p>
                    </div>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
                      Cobrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Resumen de Caja</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Efectivo</span>
                <span className="text-sm font-bold text-gray-800">$2,450.00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Tarjeta</span>
                <span className="text-sm font-bold text-gray-800">$5,820.00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray-500">Transferencia</span>
                <span className="text-sm font-bold text-gray-800">$1,200.00</span>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <span className="text-base font-bold text-gray-800">Total Hoy</span>
                <span className="text-xl font-black text-indigo-600">$9,470.00</span>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-all">
              Cerrar Caja
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportes = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Citas Totales', value: '342', trend: '+12%', icon: CalendarIcon },
          { label: 'Ingresos', value: '$124,500', trend: '+8%', icon: DollarSign },
          { label: 'No-Shows', value: '4%', trend: '-2%', icon: XCircle },
          { label: 'Nuevos Clientes', value: '28', trend: '+15%', icon: UserPlus },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <stat.icon size={20} />
              </div>
              <span className={`text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'} uppercase`}>{stat.trend}</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Servicios más Solicitados</h2>
          <div className="space-y-4">
            {[
              { name: 'Baño y Corte Full', count: 145, percent: 42 },
              { name: 'Solo Baño', count: 82, percent: 24 },
              { name: 'Corte de Uñas', count: 65, percent: 19 },
              { name: 'Tinte Fantasía', count: 50, percent: 15 },
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-700">{s.name}</span>
                  <span className="text-gray-400">{s.count} citas</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${s.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Ingresos por Estilista</h2>
          <div className="h-64 flex items-end justify-around gap-4 px-4">
            {[65, 85, 45, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full bg-indigo-100 rounded-t-xl relative group-hover:bg-indigo-200 transition-colors" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${h * 150}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">{stylists[i]?.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPortal = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl">
              <Globe size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Portal de Autoagendado</h2>
              <p className="text-sm text-gray-500">Configura el link para que tus clientes agenden solos.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-indigo-600" />
                <span className="text-sm font-bold text-indigo-700">kanu-amigos.com/book/sucursal-1</span>
              </div>
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase">Copiar Link</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Confirmación Automática</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Activado</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Antelación Mínima</label>
                <select className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm font-medium">
                  <option>2 horas antes</option>
                  <option>4 horas antes</option>
                  <option>24 horas antes</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800">Recordatorios Automáticos</h3>
              <div className="space-y-3">
                {['WhatsApp', 'SMS', 'Email'].map(method => (
                  <div key={method} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-sm font-medium text-gray-700">{method}</span>
                    </div>
                    <button className="text-[10px] font-bold text-indigo-600 uppercase">Configurar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'agenda': return renderAgenda();
      case 'citas': return renderCitas();
      case 'catalogo': return renderCatalogo();
      case 'clientes': return renderClientes();
      case 'empleados': return renderEmpleados();
      case 'caja': return renderCaja();
      case 'reportes': return renderReportes();
      case 'portal': return renderPortal();
      default: return renderAgenda();
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Module Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Servicios & Citas</h1>
          <p className="text-gray-500 font-medium">Gestión integral de la estética y servicios especializados.</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {renderTabButton('agenda', 'Agenda', CalendarIcon)}
        {renderTabButton('citas', 'Gestión Citas', CalendarCheck)}
        {renderTabButton('catalogo', 'Catálogo', Scissors)}
        {renderTabButton('clientes', 'Clientes', Users)}
        {renderTabButton('empleados', 'Empleados', User)}
        {renderTabButton('caja', 'Caja', Wallet)}
        {renderTabButton('reportes', 'Reportes', BarChart3)}
        {renderTabButton('portal', 'Portal', Globe)}
      </div>

      {/* Main Content Area */}
      <div className="min-h-[600px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ServicesView;

// Re-importing missing icons for the new components
const UserPlus = (props: any) => <Users {...props} />;
