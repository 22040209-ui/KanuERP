import React, { useState } from 'react';
import { Lock, User, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';
import { Employee } from '../types';

interface LoginViewProps {
  onLogin: (user: Employee) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const user = MOCK_EMPLOYEES.find(
        emp => emp.id === employeeId && emp.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Número de empleado o contraseña incorrectos.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Brand Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-4">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">KanuERP</h1>
          <p className="text-gray-500 mt-2 font-medium">Sistema de Gestión Integral para Mascotas</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Iniciar Sesión</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  Número de Empleado
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Ej: e123456"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <p className="text-xs font-bold">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Entrar al Sistema
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Acceso Restringido • Kanu & Amigos 2026
            </p>
          </div>
        </div>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
          <p className="text-[10px] font-bold text-indigo-600 uppercase mb-2">Cuentas de Prueba:</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-[10px] text-indigo-700">
              <span className="font-bold">Admin:</span> e123456 / admin
            </div>
            <div className="text-[10px] text-indigo-700">
              <span className="font-bold">Ventas:</span> e3 / 123
            </div>
            <div className="text-[10px] text-indigo-700">
              <span className="font-bold">Marketing:</span> e5 / 123
            </div>
            <div className="text-[10px] text-indigo-700">
              <span className="font-bold">Bodega:</span> e4 / 123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
