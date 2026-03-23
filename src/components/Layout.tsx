import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  LogOut, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ViewState, Role } from '../types';
import type { Branch } from '../types';
import { NAV_ITEMS, BRANCHES } from '../constants';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  userRole: Role;
  currentBranch: Branch;
  onBranchChange: (branchId: string) => void;
  onLogout: () => void;
  userName: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  currentView, 
  onNavigate, 
  userRole, 
  currentBranch,
  onBranchChange,
  onLogout,
  userName,
  children 
}) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const filteredNavItems = NAV_ITEMS.filter(item => !item.roles || item.roles.includes(userRole));

  const categories = [
    { id: 'main', label: 'Principal' },
    { id: 'operations', label: 'Operaciones' },
    { id: 'management', label: 'Administración' },
    { id: 'system', label: 'Sistema' }
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FB] overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 88 }}
        className="bg-slate-950 text-white flex flex-col shadow-2xl z-30 relative border-r border-white/5"
      >
        {/* Brand Area */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <span className="text-xl">🐾</span>
            </div>
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-black text-lg tracking-tight leading-none">KanuERP</span>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-0.5">Premium Suite</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
          {categories.map((category) => {
            const items = filteredNavItems.filter(item => item.category === category.id);
            if (items.length === 0) return null;

            return (
              <div key={category.id} className="mb-6 px-4">
                {isSidebarOpen && (
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3"
                  >
                    {category.label}
                  </motion.h3>
                )}
                <ul className="space-y-1">
                  {items.map((item) => {
                    const isActive = currentView === item.id.toUpperCase();
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => onNavigate(item.id.toUpperCase() as ViewState)}
                          className={cn(
                            "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                            isActive 
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                              : "text-slate-400 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <div className={cn(
                            "shrink-0 transition-transform duration-300",
                            isActive ? "scale-110" : "group-hover:scale-110"
                          )}>
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                          </div>
                          
                          {isSidebarOpen && (
                            <motion.span 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-sm font-bold whitespace-nowrap"
                            >
                              {item.label}
                            </motion.span>
                          )}

                          {isActive && (
                            <motion.div 
                              layoutId="active-pill"
                              className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                            />
                          )}

                          {item.id === 'marketing' && isSidebarOpen && (
                            <span className="ml-auto px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 text-[9px] font-black rounded-md uppercase border border-indigo-500/30">
                              New
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* User Profile & Collapse */}
        <div className="p-4 border-t border-white/5 bg-slate-900/50">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 transition-all",
            !isSidebarOpen && "justify-center"
          )}>
             <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-600/20 shrink-0">
                {getInitials(userName)}
             </div>
             {isSidebarOpen && (
               <div className="flex flex-col min-w-0 flex-1">
                 <span className="text-sm font-bold truncate text-white">{userName}</span>
                 <span className="text-[10px] text-slate-500 font-bold truncate uppercase tracking-wider">{userRole}</span>
               </div>
             )}
          </div>

          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-slate-500 hover:text-white transition-colors group"
          >
            {isSidebarOpen ? (
              <>
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Colapsar</span>
              </>
            ) : (
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-6">
            {/* Branch Selector */}
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-all cursor-pointer">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <div className="flex flex-col">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sucursal Actual</span>
                 <select 
                  className="bg-transparent text-sm font-bold text-slate-800 outline-none cursor-pointer pr-2"
                  value={currentBranch.id}
                  onChange={(e) => onBranchChange(e.target.value)}
                 >
                   {BRANCHES.map(b => (
                     <option key={b.id} value={b.id}>{b.name}</option>
                   ))}
                 </select>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden xl:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar en KanuERP..." 
                className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-80 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 uppercase">Ctrl</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-400 uppercase">K</kbd>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-100 mx-2" />

            <button className="relative p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <main className="flex-1 overflow-auto bg-[#F8F9FB] relative">
          <div className="max-w-[1600px] mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
