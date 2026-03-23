import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ScanBarcode, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  Banknote, 
  UserPlus, 
  X, 
  CheckCircle, 
  Receipt,
  ShoppingCart,
  History,
  User,
  ChevronRight,
  DollarSign,
  Wallet,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, CartItem,  Client } from '../types';
import { ProductType } from '../types';
import { MOCK_PRODUCTS, MOCK_CLIENTS } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const POSView: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientSelector, setShowClientSelector] = useState(false);
  
  // Payment States
  const [paymentStep, setPaymentStep] = useState<'CLOSED' | 'SELECT_METHOD' | 'CASH_INPUT' | 'CARD_PROCESSING' | 'SUCCESS'>('CLOSED');
  const [amountTendered, setAmountTendered] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'Efectivo' | 'Tarjeta' | 'Transferencia'>('Efectivo');

  // Filter products
  const categories = useMemo(() => ['Todos', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))], []);
  
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;
  const change = amountTendered ? Math.max(0, parseFloat(amountTendered) - total) : 0;

  // Cart Handlers
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Payment Handlers
  const initiatePayment = (method: 'Efectivo' | 'Tarjeta' | 'Transferencia') => {
    setPaymentMethod(method);
    if (method === 'Efectivo') {
        setPaymentStep('CASH_INPUT');
        setAmountTendered('');
    } else if (method === 'Tarjeta') {
        setPaymentStep('CARD_PROCESSING');
        setTimeout(() => setPaymentStep('SUCCESS'), 2500);
    } else {
        setPaymentStep('SUCCESS'); // Transfer is usually manual confirmation
    }
  };

  const confirmCashPayment = () => {
    if (parseFloat(amountTendered) < total) return;
    setPaymentStep('SUCCESS');
  };

  const closePaymentModal = () => {
    setPaymentStep('CLOSED');
    setCart([]);
    setAmountTendered('');
    setSelectedClient(null);
  };

  const quickCashOptions = [50, 100, 200, 500, 1000];

  return (
    <div className="flex h-[calc(100vh-140px)] gap-8 font-sans">
      {/* Left Column: Product Catalog */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Search & Categories */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Buscar producto, SKU o escanear..." 
                className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                <ScanBarcode size={20} />
              </button>
            </div>
            
            <button className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm">
              <History size={20} />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border",
                  selectedCategory === cat 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:text-indigo-600"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id} 
                  onClick={() => addToCart(product)}
                  className="group bg-white rounded-3xl border border-slate-100 p-3 cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all flex flex-col relative overflow-hidden"
                >
                   <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3 relative">
                     <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                     />
                     <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-black text-slate-900 shadow-sm">
                       ${product.price}
                     </div>
                     {product.stock < 5 && product.type === ProductType.PRODUCT && (
                       <div className="absolute bottom-2 left-2 right-2 bg-rose-500/90 backdrop-blur-sm text-white text-[9px] font-black text-center py-1 rounded-lg uppercase tracking-wider">
                         Stock Bajo ({product.stock})
                       </div>
                     )}
                   </div>
                   
                   <div className="flex-1 flex flex-col">
                     <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                     <div className="flex items-center justify-between mt-auto">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.sku}</span>
                        {product.type === ProductType.SERVICE && (
                          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">Servicio</span>
                        )}
                     </div>
                   </div>

                   {/* Add to cart indicator */}
                   <div className="absolute inset-0 bg-indigo-600/0 group-active:bg-indigo-600/10 transition-colors pointer-events-none" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Column: Floating Receipt Cart */}
      <div className="w-[400px] flex flex-col gap-4">
        {/* Client Selector Card */}
        <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm">
          {selectedClient ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">{selectedClient.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{selectedClient.loyaltyPoints} Puntos</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedClient(null)}
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowClientSelector(true)}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-dashed border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">Asignar Cliente</span>
              </div>
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Cart/Receipt Card */}
        <div className="flex-1 bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-indigo-500/5 flex flex-col overflow-hidden relative">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                <ShoppingCart size={16} />
              </div>
              <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest">Orden Actual</h2>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-wider">Abierta</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-slate-300 py-12"
                >
                  <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                    <ScanBarcode size={40} />
                  </div>
                  <p className="text-sm font-bold text-slate-400">Escanea o selecciona productos</p>
                </motion.div>
              ) : (
                cart.map(item => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id} 
                    className="flex gap-4 items-center group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex-shrink-0 overflow-hidden border border-slate-100">
                      <img src={item.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-black text-indigo-600">${item.price.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">x {item.quantity}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                       <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-lg text-slate-500 hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center"
                       >
                         <Minus size={14} />
                       </button>
                       <span className="text-xs font-black w-8 text-center text-slate-900">{item.quantity}</span>
                       <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg text-slate-500 hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center"
                       >
                         <Plus size={14} />
                       </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Footer / Totals */}
          <div className="px-6 py-6 bg-slate-950 text-white rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>IVA (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-white/10">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400">Total</span>
                <span className="text-4xl font-black tracking-tighter">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => initiatePayment('Efectivo')}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-white transition-all disabled:opacity-30 group"
              >
                <Banknote size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Efectivo</span>
              </button>
              <button 
                onClick={() => initiatePayment('Tarjeta')}
                disabled={cart.length === 0}
                className="flex flex-col items-center justify-center py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-white shadow-xl shadow-indigo-600/20 transition-all disabled:opacity-30 group"
              >
                <CreditCard size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Tarjeta</span>
              </button>
            </div>
            
            <button 
              onClick={() => initiatePayment('Transferencia')}
              disabled={cart.length === 0}
              className="w-full mt-3 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 transition-all disabled:opacity-30"
            >
              Transferencia Bancaria
            </button>
          </div>
        </div>
      </div>

      {/* CLIENT SELECTOR MODAL */}
      <AnimatePresence>
        {showClientSelector && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClientSelector(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Seleccionar Cliente</h3>
                  <button onClick={() => setShowClientSelector(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-all">
                    <X size={24} />
                  </button>
                </div>

                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Buscar por nombre o teléfono..." 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                    autoFocus
                  />
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                  {MOCK_CLIENTS.map(client => (
                    <button 
                      key={client.id}
                      onClick={() => {
                        setSelectedClient(client);
                        setShowClientSelector(false);
                      }}
                      className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <User size={24} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-slate-900">{client.name}</p>
                          <p className="text-xs text-slate-500 font-medium">{client.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{client.loyaltyPoints} pts</p>
                      </div>
                    </button>
                  ))}
                </div>

                <button className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                  <UserPlus size={20} />
                  Nuevo Cliente
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PAYMENT MODAL */}
      <AnimatePresence>
        {paymentStep !== 'CLOSED' && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
                {/* Header */}
                <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                        {paymentMethod === 'Efectivo' ? <Banknote size={24} /> : <CreditCard size={24} />}
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          {paymentStep === 'SUCCESS' ? '¡Pago Completado!' : `Pago en ${paymentMethod}`}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transacción #POS-8829</p>
                      </div>
                    </div>
                    {paymentStep !== 'SUCCESS' && paymentStep !== 'CARD_PROCESSING' && (
                        <button onClick={() => setPaymentStep('CLOSED')} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                            <X size={24} />
                        </button>
                    )}
                </div>

                {/* Body Content */}
                <div className="p-10">
                    {/* CASH INPUT STEP */}
                    {paymentStep === 'CASH_INPUT' && (
                        <div className="space-y-8">
                            <div className="flex justify-between items-center p-8 bg-slate-950 rounded-[2rem] text-white">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Total a Pagar</span>
                                  <span className="text-5xl font-black tracking-tighter">${total.toFixed(2)}</span>
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                                  <DollarSign size={32} className="text-indigo-400" />
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Monto Recibido</label>
                                  <button 
                                    onClick={() => setAmountTendered(total.toString())}
                                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                                  >
                                    Monto Exacto
                                  </button>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 text-3xl font-black">$</span>
                                    <input 
                                        type="number" 
                                        className="w-full pl-14 pr-6 py-6 text-4xl font-black bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                                        placeholder="0.00"
                                        value={amountTendered}
                                        onChange={(e) => setAmountTendered(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            {/* Quick Cash Buttons */}
                            <div className="grid grid-cols-5 gap-2">
                              {quickCashOptions.map(amount => (
                                <button
                                  key={amount}
                                  onClick={() => setAmountTendered((prev) => {
                                    const current = parseFloat(prev || '0');
                                    return (current + amount).toString();
                                  })}
                                  className="py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all"
                                >
                                  +${amount}
                                </button>
                              ))}
                            </div>

                            <div className="flex justify-between items-center p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest mb-1">Cambio a Entregar</span>
                                  <span className={cn("text-3xl font-black tracking-tight", change < 0 ? 'text-rose-500' : 'text-emerald-600')}>
                                      ${change.toFixed(2)}
                                  </span>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                                  <Wallet size={24} />
                                </div>
                            </div>

                            <button 
                                onClick={confirmCashPayment}
                                disabled={!amountTendered || parseFloat(amountTendered) < total}
                                className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-500 shadow-2xl shadow-indigo-600/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                            >
                                Finalizar Venta
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}

                    {/* CARD PROCESSING STEP */}
                    {paymentStep === 'CARD_PROCESSING' && (
                        <div className="text-center py-12">
                            <div className="relative inline-block mb-10">
                                <motion.div 
                                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-20"
                                />
                                <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center relative z-10">
                                    <Smartphone className="text-indigo-600 animate-bounce" size={56} />
                                </div>
                            </div>
                            <h4 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Esperando Terminal...</h4>
                            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Inserta, desliza o acerca la tarjeta</p>
                            
                            <div className="mt-12 p-6 bg-slate-50 rounded-3xl inline-flex flex-col items-center">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monto a Cobrar</span>
                              <span className="text-4xl font-black text-slate-900 tracking-tighter">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    )}

                    {/* SUCCESS STEP */}
                    {paymentStep === 'SUCCESS' && (
                        <div className="text-center">
                             <motion.div 
                               initial={{ scale: 0 }}
                               animate={{ scale: 1, rotate: [0, 10, 0] }}
                               className="w-24 h-24 rounded-[2rem] bg-emerald-100 mx-auto flex items-center justify-center mb-8"
                             >
                                 <CheckCircle className="text-emerald-600" size={56} />
                             </motion.div>
                             
                             <h4 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">¡Venta Exitosa!</h4>
                             <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-10">El ticket ha sido generado correctamente</p>

                             <div className="bg-slate-50 rounded-[2rem] p-8 mb-10 text-left space-y-4 border border-slate-100">
                                 <div className="flex justify-between items-center">
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Método</span>
                                     <span className="font-black text-slate-900">{paymentMethod}</span>
                                 </div>
                                 <div className="flex justify-between items-center">
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</span>
                                     <span className="font-black text-slate-900 text-xl">${total.toFixed(2)}</span>
                                 </div>
                                 {paymentMethod === 'Efectivo' && (
                                     <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                                         <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Cambio</span>
                                         <span className="font-black text-emerald-600 text-2xl">${change.toFixed(2)}</span>
                                     </div>
                                 )}
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <button 
                                     className="flex items-center justify-center gap-3 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all"
                                 >
                                     <Receipt size={20} /> Imprimir
                                 </button>
                                 <button 
                                     onClick={closePaymentModal}
                                     className="flex items-center justify-center gap-3 py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 transition-all"
                                 >
                                     <Plus size={20} /> Nueva Venta
                                 </button>
                             </div>
                        </div>
                    )}
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default POSView;
