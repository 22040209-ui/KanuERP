import React, { useState, useMemo } from 'react';
import { 
  Truck, 
  Plus, 
  FileText, 
  Phone, 
  Mail, 
  Search, 
  Star, 
  MoreHorizontal, 
  Filter, 
  X, 
  Save, 
  Calendar, 
  DollarSign, 
  User,
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Users,
  Download
} from 'lucide-react';
import { MOCK_SUPPLIERS, MOCK_PURCHASE_ORDERS } from '../constants';
import type { Supplier, PurchaseOrder } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PurchasesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'suppliers'>('orders');
  const [searchTerm, setSearchTerm] = useState('');

  // Data State
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [orders, setOrders] = useState<PurchaseOrder[]>(MOCK_PURCHASE_ORDERS);

  // Modal States
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Form States
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    category: '',
    rating: 5
  });

  const [newOrder, setNewOrder] = useState<Partial<PurchaseOrder>>({
    supplierId: '',
    date: new Date().toISOString().split('T')[0],
    expectedDate: '',
    total: 0,
    status: 'Solicitado',
    itemsCount: 0
  });

  // Filter logic
  const filteredOrders = useMemo(() => 
    orders.filter(o => o.id.toLowerCase().includes(searchTerm.toLowerCase())),
    [orders, searchTerm]
  );
  
  const filteredSuppliers = useMemo(() => 
    suppliers.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.contactName.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [suppliers, searchTerm]
  );

  const stats = useMemo(() => {
    const pendingOrders = orders.filter(o => o.status === 'Solicitado').length;
    const monthlyInvestment = orders
      .filter(o => o.status === 'Recibido')
      .reduce((acc, curr) => acc + curr.total, 0);
    const activeSuppliers = suppliers.length;
    return { pendingOrders, monthlyInvestment, activeSuppliers };
  }, [orders, suppliers]);

  // Handlers
  const handleOpenModal = () => {
      if (activeTab === 'orders') {
          setNewOrder({
            supplierId: suppliers[0]?.id || '',
            date: new Date().toISOString().split('T')[0],
            expectedDate: '',
            total: 0,
            status: 'Solicitado',
            itemsCount: 0
          });
          setIsOrderModalOpen(true);
      } else {
          setNewSupplier({
            name: '',
            contactName: '',
            email: '',
            phone: '',
            category: '',
            rating: 5
          });
          setIsSupplierModalOpen(true);
      }
  };

  const handleCreateSupplier = () => {
      if (!newSupplier.name || !newSupplier.contactName) return;
      const supplier: Supplier = {
          id: `sup${Date.now()}`,
          name: newSupplier.name,
          contactName: newSupplier.contactName,
          email: newSupplier.email || '',
          phone: newSupplier.phone || '',
          category: newSupplier.category || 'General',
          rating: 5
      };
      setSuppliers([...suppliers, supplier]);
      setIsSupplierModalOpen(false);
  };

  const handleCreateOrder = () => {
      if (!newOrder.supplierId || !newOrder.total) return;
      const order: PurchaseOrder = {
          id: `PO-${new Date().getFullYear()}-${orders.length + 100}`,
          supplierId: newOrder.supplierId,
          date: newOrder.date || new Date().toISOString().split('T')[0],
          expectedDate: newOrder.expectedDate || '',
          total: Number(newOrder.total),
          status: newOrder.status as any,
          itemsCount: Number(newOrder.itemsCount) || 1
      };
      setOrders([order, ...orders]);
      setIsOrderModalOpen(false);
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
            <Truck size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Compras & Abastecimiento</h1>
            <p className="text-slate-500 font-medium">Gestión de cadena de suministro, órdenes de compra y proveedores.</p>
          </div>
        </div>
        <button 
          onClick={handleOpenModal}
          className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 group"
        >
           <Plus size={20} className="group-hover:scale-110 transition-transform" />
           {activeTab === 'orders' ? 'Nueva Orden' : 'Nuevo Proveedor'}
        </button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Órdenes Pendientes', value: stats.pendingOrders, icon: Clock, color: 'violet', trend: 'Seguimiento activo' },
          { label: 'Inversión del Mes', value: `$${stats.monthlyInvestment.toLocaleString()}`, icon: TrendingUp, color: 'emerald', trend: '+8.4% vs anterior' },
          { label: 'Proveedores Activos', value: stats.activeSuppliers, icon: Briefcase, color: 'indigo', trend: 'Directorio verificado' }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col relative overflow-hidden group"
          >
            <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-5 group-hover:scale-110 transition-transform", 
              stat.color === 'emerald' ? 'bg-emerald-500' : stat.color === 'violet' ? 'bg-violet-500' : 'bg-indigo-500')} />
            
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", 
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                stat.color === 'violet' ? 'bg-violet-50 text-violet-600' : 
                'bg-indigo-50 text-indigo-600')}>
                <stat.icon size={24} />
              </div>
              <div className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", 
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
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

      {/* Tabs & Toolbar Section */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-500/5 overflow-hidden">
        {/* Tabs */}
        <div className="px-8 pt-8 border-b border-slate-50 bg-slate-50/30">
          <div className="flex gap-10">
            {[
              { id: 'orders', label: 'Órdenes de Compra', icon: FileText },
              { id: 'suppliers', label: 'Directorio Proveedores', icon: Users }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setSearchTerm(''); }}
                className={cn(
                  "pb-6 text-xs font-black uppercase tracking-widest transition-all relative flex items-center gap-2",
                  activeTab === tab.id 
                    ? "text-indigo-600" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={activeTab === 'orders' ? "Buscar orden por ID..." : "Buscar proveedor por nombre..."}
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
               <Filter size={16} /> Filtros
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
               <Download size={16} /> Exportar
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'orders' ? (
              <motion.table 
                key="orders-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-left border-collapse"
              >
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                    <th className="px-8 py-5">ID Orden</th>
                    <th className="px-6 py-5">Proveedor</th>
                    <th className="px-6 py-5">Fecha Solicitud</th>
                    <th className="px-6 py-5">Entrega Estimada</th>
                    <th className="px-6 py-5 text-center">Items</th>
                    <th className="px-6 py-5 text-right">Total</th>
                    <th className="px-6 py-5 text-center">Estado</th>
                    <th className="px-8 py-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredOrders.map(po => {
                    const supplierName = suppliers.find(s => s.id === po.supplierId)?.name || 'Desconocido';
                    return (
                      <tr key={po.id} className="group hover:bg-indigo-50/30 transition-colors">
                        <td className="px-8 py-5">
                          <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{po.id}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{supplierName}</span>
                        </td>
                        <td className="px-6 py-5 text-xs font-bold text-slate-600">{po.date}</td>
                        <td className="px-6 py-5 text-xs font-bold text-slate-500">{po.expectedDate || '-'}</td>
                        <td className="px-6 py-5 text-center">
                          <span className="inline-flex w-8 h-8 items-center justify-center bg-slate-100 rounded-lg text-xs font-black text-slate-600">
                            {po.itemsCount}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-base font-black text-slate-900 tracking-tight">${po.total.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-center">
                            <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest", 
                              po.status === 'Recibido' ? 'bg-emerald-50 text-emerald-600' : 
                              po.status === 'Solicitado' ? 'bg-indigo-50 text-indigo-600' : 
                              'bg-rose-50 text-rose-600')}>
                              {po.status === 'Recibido' ? <CheckCircle2 size={12} /> : po.status === 'Solicitado' ? <Clock size={12} /> : <AlertCircle size={12} />}
                              {po.status}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </motion.table>
            ) : (
              <motion.table 
                key="suppliers-table"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-left border-collapse"
              >
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                    <th className="px-8 py-5">Empresa / Proveedor</th>
                    <th className="px-6 py-5">Categoría</th>
                    <th className="px-6 py-5">Contacto Principal</th>
                    <th className="px-6 py-5">Datos de Contacto</th>
                    <th className="px-6 py-5 text-center">Rating</th>
                    <th className="px-8 py-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredSuppliers.map(supplier => (
                    <tr key={supplier.id} className="group hover:bg-indigo-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xl shadow-sm">
                              {supplier.name.substring(0,1)}
                          </div>
                          <div>
                            <div className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{supplier.name}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: {supplier.id.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                         <span className="inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border border-slate-200">
                           {supplier.category}
                         </span>
                      </td>
                      <td className="px-6 py-5 text-slate-700 font-bold text-sm">
                        {supplier.contactName}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                             <Mail size={14} className="text-slate-400" />
                             <a href={`mailto:${supplier.email}`} className="hover:text-indigo-600 transition-colors">{supplier.email}</a>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                             <Phone size={14} className="text-slate-400" />
                             <span>{supplier.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                         <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-amber-100">
                            <Star size={12} className="fill-amber-400 text-amber-400" />
                            {supplier.rating}
                         </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                            <MoreHorizontal size={18} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </motion.table>
            )}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {((activeTab === 'orders' && filteredOrders.length === 0) || (activeTab === 'suppliers' && filteredSuppliers.length === 0)) && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-300">
            <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center mb-6">
              <ShoppingBag size={48} />
            </div>
            <h3 className="text-xl font-black text-slate-400 tracking-tight">Sin resultados</h3>
            <p className="text-sm font-medium text-slate-400 mt-2">No encontramos registros con esos criterios</p>
          </div>
        )}
      </div>

      {/* --- MODAL: NEW SUPPLIER --- */}
      <AnimatePresence>
        {isSupplierModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSupplierModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col"
            >
              <div className="bg-slate-50 px-10 py-8 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Nuevo Proveedor</h3>
                  <p className="text-slate-500 text-sm font-medium">Registra un nuevo aliado comercial.</p>
                </div>
                <button 
                  onClick={() => setIsSupplierModalOpen(false)} 
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-10 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Empresa / Razón Social *</label>
                  <div className="relative">
                    <Truck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                      placeholder="Ej: Distribuidora Patitas S.A."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nombre de Contacto *</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={newSupplier.contactName}
                      onChange={(e) => setNewSupplier({...newSupplier, contactName: e.target.value})}
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                    <input 
                      type="email" 
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Teléfono</label>
                    <input 
                      type="text" 
                      value={newSupplier.phone}
                      onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Categoría Principal</label>
                  <select 
                    value={newSupplier.category}
                    onChange={(e) => setNewSupplier({...newSupplier, category: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold appearance-none"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Farmacia">Farmacia / Salud</option>
                    <option value="Higiene">Higiene y Limpieza</option>
                    <option value="Servicios">Servicios Generales</option>
                  </select>
                </div>
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                <button onClick={() => setIsSupplierModalOpen(false)} className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Cancelar</button>
                <button onClick={handleCreateSupplier} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3">
                  <Save size={20} /> Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL: NEW PURCHASE ORDER --- */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col"
            >
              <div className="bg-slate-50 px-10 py-8 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Crear Orden de Compra</h3>
                  <p className="text-slate-500 text-sm font-medium">Genera una nueva solicitud de abastecimiento.</p>
                </div>
                <button 
                  onClick={() => setIsOrderModalOpen(false)} 
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-10 space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Proveedor *</label>
                  <select 
                    value={newOrder.supplierId}
                    onChange={(e) => setNewOrder({...newOrder, supplierId: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold appearance-none"
                  >
                    <option value="">Seleccionar proveedor...</option>
                    {suppliers.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Fecha Solicitud</label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="date" 
                        value={newOrder.date}
                        onChange={(e) => setNewOrder({...newOrder, date: e.target.value})}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Entrega Estimada</label>
                    <input 
                      type="date" 
                      value={newOrder.expectedDate}
                      onChange={(e) => setNewOrder({...newOrder, expectedDate: e.target.value})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Monto Total *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="number" 
                        value={newOrder.total}
                        onChange={(e) => setNewOrder({...newOrder, total: Number(e.target.value)})}
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Cantidad de Items</label>
                    <input 
                      type="number" 
                      value={newOrder.itemsCount}
                      onChange={(e) => setNewOrder({...newOrder, itemsCount: Number(e.target.value)})}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Estado Inicial</label>
                  <select 
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({...newOrder, status: e.target.value as any})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-bold appearance-none"
                  >
                    <option value="Borrador">Borrador</option>
                    <option value="Solicitado">Solicitado</option>
                    <option value="Recibido">Recibido</option>
                  </select>
                </div>
              </div>

              <div className="p-10 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                <button onClick={() => setIsOrderModalOpen(false)} className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Cancelar</button>
                <button onClick={handleCreateOrder} className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3">
                  <Save size={20} /> Crear Orden
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PurchasesView;
