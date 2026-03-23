import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  CreditCard, 
  Receipt, 
  Calendar,
  Filter,
  Target,
  Zap
} from 'lucide-react';
import { FINANCIAL_DATA, MOCK_TRANSACTIONS } from '../constants';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FinanceView: React.FC = () => {
  // Mock data for a small bar chart
  const categoryData = [
    { name: 'Nómina', value: 45, color: '#6366f1' },
    { name: 'Insumos', value: 25, color: '#8b5cf6' },
    { name: 'Renta', value: 15, color: '#ec4899' },
    { name: 'Marketing', value: 15, color: '#10b981' },
  ];

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
            <DollarSign size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Finanzas</h1>
            <p className="text-slate-500 font-medium">Control de ingresos, egresos y salud financiera del negocio.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
             <Download size={18} /> Exportar
          </button>
          <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 group">
             <Plus size={20} className="group-hover:scale-110 transition-transform" />
             Registrar Movimiento
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Ingresos Totales', value: '$67,450', icon: TrendingUp, color: 'emerald', trend: '+12.5%', sub: 'vs mes anterior' },
          { label: 'Gastos Operativos', value: '$38,200', icon: TrendingDown, color: 'rose', trend: '+2.1%', sub: 'En presupuesto' },
          { label: 'Utilidad Neta', value: '$29,250', icon: Wallet, color: 'indigo', trend: '+18.4%', sub: 'Margen 43%' },
          { label: 'Caja Disponible', value: '$142,800', icon: CreditCard, color: 'violet', trend: 'Estable', sub: '3 cuentas activas' }
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
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-indigo-500/5 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Flujo de Caja</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Comparativa semestral de ingresos vs egresos</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Ingresos</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-rose-600" />
                <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Egresos</span>
              </div>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FINANCIAL_DATA}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    padding: '16px'
                  }} 
                  itemStyle={{ fontWeight: 900, fontSize: '12px', textTransform: 'uppercase' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="ingresos" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorIngresos)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="gastos" 
                  stroke="#f43f5e" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorGastos)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="lg:col-span-4 bg-indigo-900 p-8 rounded-[3rem] text-white relative overflow-hidden shadow-xl shadow-indigo-900/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <h3 className="text-xl font-black tracking-tight mb-2 relative z-10">Distribución de Gastos</h3>
          <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-8 relative z-10">Análisis por categoría</p>
          
          <div className="h-48 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" hide />
                <Tooltip cursor={{ fill: 'transparent' }} content={() => null} />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 mt-6 relative z-10">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs font-bold text-indigo-100">{cat.name}</span>
                </div>
                <span className="text-xs font-black">{cat.value}%</span>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
            Optimizar Gastos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Transactions Table */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-indigo-500/5 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Movimientos Recientes</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                <Filter size={18} />
              </button>
              <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                <Calendar size={18} />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                  <th className="px-8 py-5">Concepto / Fecha</th>
                  <th className="px-6 py-5">Categoría</th>
                  <th className="px-6 py-5">Método</th>
                  <th className="px-6 py-5 text-right">Monto</th>
                  <th className="px-8 py-5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {MOCK_TRANSACTIONS.map(trx => (
                  <tr key={trx.id} className="group hover:bg-indigo-50/30 transition-colors cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm",
                          trx.type === 'Ingreso' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        )}>
                          {trx.type === 'Ingreso' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                        </div>
                        <div>
                          <div className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{trx.description}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{trx.date}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                        {trx.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                        <CreditCard size={14} className="text-slate-400" />
                        Transferencia
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className={cn(
                        "text-base font-black tracking-tight",
                        trx.type === 'Ingreso' ? 'text-emerald-600' : 'text-rose-600'
                      )}>
                        {trx.type === 'Ingreso' ? '+' : '-'}${trx.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                        <Receipt size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-slate-50/30 border-t border-slate-50 text-center">
            <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Ver Historial Completo</button>
          </div>
        </div>

        {/* Quick Actions / Goals */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-500/5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
              <Target size={20} className="text-indigo-600" /> Metas Financieras
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Fondo de Reserva', current: 85000, target: 100000, color: 'bg-indigo-600' },
                { label: 'Expansión Sucursal', current: 45000, target: 150000, color: 'bg-violet-600' }
              ].map(goal => (
                <div key={goal.label}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                    <span className="text-slate-500">{goal.label}</span>
                    <span className="text-slate-900">{Math.round((goal.current / goal.target) * 100)}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", goal.color)}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>${goal.current.toLocaleString()}</span>
                    <span>Meta: ${goal.target.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <Zap size={32} className="mb-4 text-indigo-200" />
            <h3 className="text-xl font-black tracking-tight mb-2">Asistente Inteligente</h3>
            <p className="text-sm font-medium text-indigo-100 mb-6">Hemos detectado una oportunidad de ahorro del 15% en insumos este mes.</p>
            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-lg">
              Ver Recomendación
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceView;
