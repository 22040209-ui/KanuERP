import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Receipt,
  TrendingUp,
  TrendingDown,
  Wallet,
  MoreVertical,
  FileText,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { MOCK_TRANSACTIONS, RECENT_SALES } from '../constants';
import type { Transaction } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TransactionsViewProps {
  onBack: () => void;
}

const TransactionsView: React.FC<TransactionsViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'Todos' | 'Ingreso' | 'Gasto'>('Todos');

  // Combine Mock Transactions with Recent Sales to populate the list for the demo
  const allTransactions: Transaction[] = useMemo(() => [
    ...MOCK_TRANSACTIONS,
    ...RECENT_SALES.map(sale => ({
      id: sale.id,
      date: sale.date.split(' ')[0],
      description: `Venta POS - ${sale.items} items`,
      type: 'Ingreso' as const,
      category: 'Ventas',
      amount: sale.total,
      status: 'Completado' as const
    })),
    { id: 'trx-old-1', date: '2023-10-25', description: 'Pago Internet', type: 'Gasto', category: 'Servicios', amount: 899.00, status: 'Completado' },
    { id: 'trx-old-2', date: '2023-10-24', description: 'Venta del día', type: 'Ingreso', category: 'Ventas', amount: 18450.00, status: 'Completado' },
    { id: 'trx-old-3', date: '2023-10-23', description: 'Compra Insumos Limpieza', type: 'Gasto', category: 'Compras', amount: 2100.50, status: 'Completado' },
  ], []);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(t => {
      const matchesSearch = 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'Todos' || t.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [allTransactions, searchTerm, filterType]);

  const stats = useMemo(() => {
    const income = allTransactions.filter(t => t.type === 'Ingreso').reduce((acc, t) => acc + t.amount, 0);
    const expenses = allTransactions.filter(t => t.type === 'Gasto').reduce((acc, t) => acc + t.amount, 0);
    return { income, expenses, net: income - expenses };
  }, [allTransactions]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 font-sans pb-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Historial Financiero</h1>
            <p className="text-slate-500 font-medium">Auditoría completa de ingresos, egresos y flujo de caja.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all shadow-sm group">
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Ingresos Totales', value: `$${stats.income.toLocaleString()}`, icon: TrendingUp, color: 'emerald', trend: '+15.2%' },
          { label: 'Gastos Totales', value: `$${stats.expenses.toLocaleString()}`, icon: TrendingDown, color: 'rose', trend: '-4.1%' },
          { label: 'Balance Neto', value: `$${stats.net.toLocaleString()}`, icon: Wallet, color: 'indigo', trend: 'Saludable' }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group"
          >
            <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 group-hover:scale-110 transition-transform", 
              stat.color === 'emerald' ? 'bg-emerald-500' : stat.color === 'rose' ? 'bg-rose-500' : 'bg-indigo-500')} />
            
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", 
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 
                'bg-indigo-50 text-indigo-600')}>
                <stat.icon size={24} />
              </div>
              <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", 
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 
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
        <div className="p-6 border-b border-slate-50 flex flex-col xl:flex-row justify-between gap-6 bg-slate-50/30">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por descripción, ID o categoría..." 
                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
              {[
                { label: 'Todos', value: 'Todos' },
                { label: 'Ingresos', value: 'Ingreso' },
                { label: 'Gastos', value: 'Gasto' }
              ].map(type => (
                <button
                  key={type.value}
                  onClick={() => setFilterType(type.value as any)}
                  className={cn(
                    "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                    filterType === type.value 
                      ? "bg-white text-indigo-600 shadow-sm" 
                      : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
               <Calendar size={16} /> Período
             </button>
             <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
               <Filter size={16} /> Más Filtros
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                <th className="px-8 py-5">ID / Fecha</th>
                <th className="px-6 py-5">Descripción</th>
                <th className="px-6 py-5">Categoría</th>
                <th className="px-6 py-5 text-center">Tipo</th>
                <th className="px-6 py-5 text-right">Monto</th>
                <th className="px-6 py-5 text-center">Estado</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {filteredTransactions.map((trx) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={trx.id} 
                    className="group hover:bg-indigo-50/30 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{trx.id}</span>
                        <span className="text-xs font-bold text-slate-600">{trx.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", 
                          trx.type === 'Ingreso' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>
                          <Receipt size={14} />
                        </div>
                        <span className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{trx.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
                        {trx.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest", 
                          trx.type === 'Ingreso' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>
                          {trx.type === 'Ingreso' ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                          {trx.type}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className={cn("text-base font-black tracking-tight", 
                        trx.type === 'Ingreso' ? 'text-emerald-600' : 'text-rose-600')}>
                        {trx.type === 'Ingreso' ? '+' : '-'}${trx.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest", 
                          trx.status === 'Completado' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600')}>
                          {trx.status === 'Completado' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                          {trx.status}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                          <FileText size={18} />
                        </button>
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-300">
            <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center mb-6">
              <Receipt size={48} />
            </div>
            <h3 className="text-xl font-black text-slate-400 tracking-tight">Sin transacciones</h3>
            <p className="text-sm font-medium text-slate-400 mt-2">No hay registros que coincidan con tu búsqueda</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-8 py-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
           <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mostrando {filteredTransactions.length} de {allTransactions.length} registros</span>
           <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all disabled:opacity-30">Anterior</button>
             <button className="w-10 h-10 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-lg shadow-indigo-600/20">1</button>
             <button className="w-10 h-10 bg-white border border-slate-200 text-slate-400 rounded-xl text-xs font-black hover:text-indigo-600 transition-all">2</button>
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Siguiente</button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionsView;
