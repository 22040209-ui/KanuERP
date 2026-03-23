import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  History, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  Calendar,
  Fingerprint,
  CheckCircle2,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AttendanceView: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [pin, setPin] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [recentLogs, setRecentLogs] = useState<{ id: string, name: string, time: string, type: 'Entrada' | 'Salida', photo: string }[]>([
    { id: '1', name: 'Carlos Ruiz', time: '08:00 AM', type: 'Entrada', photo: '' },
    { id: '2', name: 'Ana Lopez', time: '08:15 AM', type: 'Entrada', photo: '' }
  ]);

  // Clock Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- ATTENDANCE HANDLERS ---
  const handleNumClick = (num: string) => {
    if (pin.length < 6) {
        setPin(prev => prev + num);
        setFeedback({ type: null, message: '' });
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setFeedback({ type: null, message: '' });
  };

  const handleAttendanceSubmit = (type: 'Entrada' | 'Salida') => {
    const employee = MOCK_EMPLOYEES.find(e => e.id === pin || e.id.replace('e', '') === pin);

    if (employee) {
        const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setRecentLogs(prev => [{
            id: Date.now().toString(),
            name: employee.name,
            time: timeStr,
            type: type,
            photo: '' 
        }, ...prev].slice(0, 10));

        setFeedback({ 
            type: 'success', 
            message: `¡Hola ${employee.name.split(' ')[0]}! ${type} registrada exitosamente.` 
        });
        setPin('');
        
        setTimeout(() => setFeedback({ type: null, message: '' }), 4000);
    } else {
        setFeedback({ type: 'error', message: 'Código de empleado no válido.' });
        setPin('');
        setTimeout(() => setFeedback({ type: null, message: '' }), 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col space-y-8 font-sans pb-10"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
            <Clock size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Kiosco de Asistencia</h1>
            <p className="text-slate-500 font-medium">Registro de entradas y salidas en tiempo real.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sistema Activo</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden min-h-[600px]">
        
        {/* Left Panel: Kiosk Interface */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-500/5 flex flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full -mr-48 -mt-48 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-50 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />

          {/* Digital Clock Display */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-12 text-center relative z-10"
          >
            <div className="flex items-center justify-center gap-3 text-slate-400 font-black text-xs uppercase tracking-[0.3em] mb-4">
              <Calendar size={16} className="text-indigo-600" />
              {currentTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-8xl font-black text-slate-900 tracking-tighter font-mono flex items-baseline gap-2">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              <span className="text-3xl text-indigo-600 animate-pulse">:</span>
              <span className="text-4xl text-slate-400">{currentTime.toLocaleTimeString([], { second: '2-digit' })}</span>
            </div>
          </motion.div>

          {/* PIN Input Display */}
          <div className="w-full max-w-sm mb-12 relative z-10">
            <div className="flex justify-center gap-5 mb-6">
              {[...Array(6)].map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={i < pin.length ? { scale: [1, 1.2, 1], backgroundColor: '#4f46e5' } : { scale: 1, backgroundColor: '#f1f5f9' }}
                  className={cn(
                    "w-5 h-5 rounded-full border-2 transition-colors",
                    i < pin.length ? "border-indigo-600" : "border-slate-200"
                  )}
                />
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              {feedback.message ? (
                <motion.div 
                  key="feedback"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest py-3 rounded-2xl",
                    feedback.type === 'success' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                  )}
                >
                  {feedback.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                  {feedback.message}
                </motion.div>
              ) : (
                <div className="h-11" /> // Spacer
              )}
            </AnimatePresence>
          </div>

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-6 mb-12 relative z-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={num}
                onClick={() => handleNumClick(num.toString())}
                className="w-24 h-24 rounded-[2rem] bg-slate-50 border border-slate-100 text-3xl font-black text-slate-700 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/10"
              >
                {num}
              </motion.button>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackspace}
              className="w-24 h-24 rounded-[2rem] bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center hover:bg-rose-100 transition-all shadow-sm"
            >
              <ArrowLeft size={32} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNumClick('0')}
              className="w-24 h-24 rounded-[2rem] bg-slate-50 border border-slate-100 text-3xl font-black text-slate-700 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/10"
            >
              0
            </motion.button>
            <div className="w-24 h-24 flex items-center justify-center text-slate-200">
              <Fingerprint size={48} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 w-full max-w-lg relative z-10">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAttendanceSubmit('Entrada')}
              disabled={pin.length === 0}
              className="flex-1 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              <LogIn size={24} /> Entrada
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAttendanceSubmit('Salida')}
              disabled={pin.length === 0}
              className="flex-1 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl shadow-slate-900/20 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              <LogOut size={24} /> Salida
            </motion.button>
          </div>
        </div>

        {/* Right Panel: Recent Activity */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-indigo-500/5 flex flex-col overflow-hidden h-full">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <h3 className="font-black text-slate-900 flex items-center gap-3 text-sm uppercase tracking-widest">
                <History size={20} className="text-indigo-600" /> Actividad Reciente
              </h3>
              <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                En Vivo
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              <AnimatePresence initial={false}>
                {recentLogs.map((log) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={log.id} 
                    className="group bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-lg shadow-sm">
                        {log.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{log.name}</div>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Clock size={12} /> {log.time}
                        </div>
                      </div>
                    </div>
                    <div className={cn(
                      "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                      log.type === 'Entrada' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                    )}>
                      {log.type}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {recentLogs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 py-20">
                  <div className="w-20 h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-6">
                    <Clock size={40} />
                  </div>
                  <h3 className="text-lg font-black text-slate-400 tracking-tight">Sin registros</h3>
                  <p className="text-xs font-medium text-slate-400 mt-2">No hay actividad registrada hoy</p>
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-50">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Kanu Attendance v2.0</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-500" /> Seguro
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats / Info Card */}
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-600/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h4 className="text-xs font-black uppercase tracking-widest opacity-80 mb-4">Resumen de Hoy</h4>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-black mb-1">24</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Entradas</div>
              </div>
              <div>
                <div className="text-3xl font-black mb-1">18</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Salidas</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Próximo Turno</span>
              <span className="text-xs font-black">02:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendanceView;
