import React, { useState } from 'react';
import { 
  Megaphone, 
  Instagram, 
  Facebook, 
  Video, 
  TrendingUp, 
  Users, 
  Plus, 
  Calendar, 
  Target, 
  Globe, 
  Search,
  Filter,
  MoreVertical,
  DollarSign,
  Sparkles,
  Layout,
  Share2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'social' | 'content'>('campaigns');

  const campaigns = [
    { id: 1, name: 'Cyber Monday 2026', status: 'Activa', budget: '$15,000', spent: '$9,750', roi: '3.2x', leads: 450, reach: '1.2M', color: 'indigo' },
    { id: 2, name: 'Lanzamiento Pro', status: 'Finalizando', budget: '$8,000', spent: '$7,200', roi: '2.8x', leads: 280, reach: '450k', color: 'violet' },
    { id: 3, name: 'Retargeting Global', status: 'Activa', budget: '$5,000', spent: '$1,000', roi: '4.1x', leads: 120, reach: '200k', color: 'emerald' },
    { id: 4, name: 'Promo Primavera', status: 'Planificación', budget: '$10,000', spent: '$0', roi: '-', leads: 0, reach: '-', color: 'slate' },
  ];

  const socialMetrics = [
    { platform: 'Instagram', followers: '12.4k', growth: '+1.2%', engagement: '4.8%', color: 'text-pink-500', bg: 'bg-pink-50', icon: Instagram },
    { platform: 'Facebook', followers: '8.2k', growth: '+0.5%', engagement: '2.1%', color: 'text-blue-600', bg: 'bg-blue-50', icon: Facebook },
    { platform: 'TikTok', followers: '45.1k', growth: '+15.4%', engagement: '8.2%', color: 'text-slate-900', bg: 'bg-slate-100', icon: Video },
    { platform: 'LinkedIn', followers: '2.1k', growth: '+2.1%', engagement: '1.5%', color: 'text-blue-700', bg: 'bg-blue-50', icon: Globe },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20 font-sans"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
            <Megaphone size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Marketing</h1>
            <p className="text-slate-500 font-medium">Estrategia, campañas y presencia digital de la marca.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 group">
             <Plus size={20} className="group-hover:scale-110 transition-transform" />
             Nueva Campaña
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-[2rem] w-fit">
        {[
          { id: 'campaigns', label: 'Campañas', icon: Target },
          { id: 'social', label: 'Redes Sociales', icon: Share2 },
          { id: 'content', label: 'Contenido', icon: Layout }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all",
              activeTab === tab.id 
                ? "bg-white text-indigo-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'campaigns' && (
          <motion.div 
            key="campaigns"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Leads Totales', value: '2,450', icon: Users, color: 'indigo', trend: '+12%' },
                { label: 'ROI Promedio', value: '3.4x', icon: TrendingUp, color: 'emerald', trend: '+0.5x' },
                { label: 'Costo por Lead', value: '$12.50', icon: DollarSign, color: 'rose', trend: '-4%' },
                { label: 'Alcance Total', value: '1.8M', icon: Globe, color: 'violet', trend: '+24%' }
              ].map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={stat.label}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center",
                      stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                      stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                      stat.color === 'rose' ? 'bg-rose-50 text-rose-600' :
                      'bg-violet-50 text-violet-600'
                    )}>
                      <stat.icon size={24} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full",
                      stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    )}>{stat.trend}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                </motion.div>
              ))}
            </div>

            {/* Campaigns Table Card */}
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-indigo-500/5 overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/30">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Gestión de Campañas</h2>
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Buscar campaña..." 
                      className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                    <Filter size={20} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                      <th className="px-8 py-5">Campaña / ID</th>
                      <th className="px-6 py-5">Estado</th>
                      <th className="px-6 py-5">Presupuesto</th>
                      <th className="px-6 py-5">Invertido</th>
                      <th className="px-6 py-5">Leads</th>
                      <th className="px-6 py-5">ROI</th>
                      <th className="px-8 py-5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {campaigns.map((camp) => (
                      <tr key={camp.id} className="group hover:bg-indigo-50/30 transition-colors cursor-pointer">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm",
                              camp.color === 'indigo' ? 'bg-indigo-600' :
                              camp.color === 'violet' ? 'bg-violet-600' :
                              camp.color === 'emerald' ? 'bg-emerald-600' : 'bg-slate-400'
                            )}>
                              <Megaphone size={18} />
                            </div>
                            <div>
                              <div className="font-black text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{camp.name}</div>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CAMP-00{camp.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={cn(
                            "text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border",
                            camp.status === 'Activa' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            camp.status === 'Finalizando' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                            'bg-slate-50 text-slate-500 border-slate-100'
                          )}>
                            {camp.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-black text-slate-900 tracking-tight">{camp.budget}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              <span>{camp.spent}</span>
                              <span>{camp.spent === '$0' ? '0%' : '65%'}</span>
                            </div>
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: camp.spent === '$0' ? '0%' : '65%' }}
                                className="h-full bg-indigo-600 rounded-full"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-black text-slate-900 tracking-tight">{camp.leads}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-sm font-black text-indigo-600 tracking-tight">{camp.roi}</span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'social' && (
          <motion.div 
            key="social"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Social Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {socialMetrics.map((social, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={social.platform} 
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm", social.bg)}>
                      <social.icon size={28} className={social.color} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{social.growth}</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Crecimiento</span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{social.platform}</p>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">{social.followers}</h3>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-400">Engagement</span>
                      <span className="text-indigo-600">{social.engagement}</span>
                    </div>
                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: social.engagement }}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Interactions Chart */}
              <div className="lg:col-span-7 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-indigo-500/5">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Interacciones por Día</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Análisis de actividad semanal</p>
                  </div>
                  <select className="px-4 py-2 text-xs font-black text-slate-600 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 uppercase tracking-widest">
                    <option>Últimos 7 días</option>
                    <option>Últimos 30 días</option>
                  </select>
                </div>
                <div className="h-72 flex items-end justify-between gap-4 px-4">
                  {[45, 62, 58, 85, 72, 95, 88].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                      <div className="w-full relative">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.05 }}
                          className="w-full bg-indigo-50 rounded-2xl relative group-hover:bg-indigo-600 transition-all duration-500"
                        >
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-xl whitespace-nowrap">
                            {h * 10} ints.
                          </div>
                        </motion.div>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Posts */}
              <div className="lg:col-span-5 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-indigo-500/5">
                <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8">Mejores Publicaciones</h2>
                <div className="space-y-6">
                  {[
                    { platform: 'Instagram', title: 'Tips de Cuidado Dental', likes: '1.2k', comments: 45, reach: '12k', img: 'pet0' },
                    { platform: 'TikTok', title: 'POV: Baño de Burbujas', likes: '4.5k', comments: 120, reach: '85k', img: 'pet1' },
                    { platform: 'Facebook', title: 'Promo Alimento Premium', likes: '320', comments: 12, reach: '4.2k', img: 'pet2' },
                  ].map((post, i) => (
                    <div key={i} className="flex items-center gap-5 p-4 hover:bg-slate-50 rounded-[2rem] transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <img src={`https://picsum.photos/seed/${post.img}/200/200`} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{post.title}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{post.platform}</p>
                      </div>
                      <div className="flex gap-6 text-right">
                        <div>
                          <p className="text-sm font-black text-slate-900 tracking-tight">{post.likes}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Likes</p>
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 tracking-tight">{post.reach}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Alcance</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-4 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-100 transition-all">
                  Ver Analítica Completa
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div 
            key="content"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Content Calendar */}
              <div className="lg:col-span-8 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-indigo-500/5">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Calendario de Contenido</h2>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Programación estratégica semanal</p>
                  </div>
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-indigo-600 transition-all shadow-sm">
                    <Calendar size={20} />
                  </button>
                </div>
                <div className="space-y-8">
                  {[
                    { day: 'Hoy', date: '22 Mar', items: [
                      { time: '18:00', title: 'Video: Tips de Cuidado', platform: 'TikTok', status: 'Programado', color: 'indigo' },
                      { time: '20:00', title: 'Story: Reposición Stock', platform: 'Instagram', status: 'Publicado', color: 'emerald' }
                    ]},
                    { day: 'Mañana', date: '23 Mar', items: [
                      { time: '10:00', title: 'Post: Nueva Colección', platform: 'Instagram', status: 'Programado', color: 'indigo' },
                      { time: '14:00', title: 'Ads: Retargeting', platform: 'Facebook', status: 'En Revisión', color: 'amber' }
                    ]},
                    { day: 'Martes', date: '24 Mar', items: [
                      { time: '12:00', title: 'Newsletter Semanal', platform: 'Email', status: 'Borrador', color: 'slate' }
                    ]},
                  ].map((day, i) => (
                    <div key={i} className="flex gap-8">
                      <div className="w-16 text-center pt-2 flex-shrink-0">
                        <p className="text-sm font-black text-slate-900">{day.day}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{day.date}</p>
                      </div>
                      <div className="flex-1 space-y-4">
                        {day.items.map((item, j) => (
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            key={j} 
                            className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 flex justify-between items-center group cursor-pointer hover:bg-white hover:shadow-lg hover:shadow-indigo-500/5 transition-all"
                          >
                            <div className="flex gap-6 items-center">
                              <span className="text-xs font-black text-slate-400 font-mono tracking-tighter">{item.time}</span>
                              <div>
                                <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.platform}</p>
                              </div>
                            </div>
                            <span className={cn(
                              "text-[9px] px-3 py-1.5 rounded-xl font-black uppercase tracking-widest border",
                              item.status === 'Publicado' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                              item.status === 'Programado' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                              'bg-amber-50 text-amber-600 border-amber-100'
                            )}>
                              {item.status}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideas & AI */}
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-indigo-500/5">
                  <h2 className="text-xl font-black text-slate-900 tracking-tight mb-8">Ideas y Borradores</h2>
                  <div className="space-y-5">
                    {[
                      { title: 'Serie: Conoce a nuestro equipo', platform: 'Instagram', priority: 'Alta' },
                      { title: 'Blog: Dieta Barf vs Croquetas', platform: 'Web', priority: 'Media' },
                      { title: 'Concurso: La mascota del mes', platform: 'Multi', priority: 'Baja' },
                    ].map((idea, i) => (
                      <div key={i} className="p-5 bg-slate-50/50 rounded-[2rem] border border-slate-100 group cursor-pointer hover:border-indigo-200 hover:bg-white hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <span className={cn(
                            "text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-widest",
                            idea.priority === 'Alta' ? 'bg-rose-50 text-rose-600' : 
                            idea.priority === 'Media' ? 'bg-amber-50 text-amber-600' : 
                            'bg-indigo-50 text-indigo-600'
                          )}>
                            {idea.priority}
                          </span>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-black text-slate-900 leading-tight">{idea.title}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{idea.platform}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-4 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-100 transition-all">
                    Añadir Idea
                  </button>
                </div>

                {/* AI Generator Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[3rem] text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-110 transition-transform" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg">
                      <Sparkles size={28} className="text-indigo-100" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight">Generador AI</h3>
                      <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Beta v2.0</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-indigo-100 mb-8 leading-relaxed">
                    Utiliza nuestra IA para generar copys creativos y estrategias de contenido en segundos.
                  </p>
                  <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl">
                    Probar Generador
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MarketingView;

