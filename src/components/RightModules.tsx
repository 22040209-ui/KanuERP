import React from 'react';
import { 
  Bell, 
  Clock, 
  Calendar, 
  MessageSquare, 
  ArrowUpRight,
  User,
  Zap,
  Shield,
  Package,
  DollarSign,
  Users,
  Briefcase,
  Instagram,
  Facebook,
  Video
} from 'lucide-react';
import type {  AppNotification, Approval, Activity, } from '../types';
import { Role } from '../types';
import { 
  MOCK_NOTIFICATIONS, 
  MOCK_APPROVALS, 
  MOCK_ACTIVITIES, 
} from '../constants';

interface ModuleCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, icon: Icon, children, actionLabel, onAction }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-white rounded-lg shadow-sm">
          <Icon size={16} className="text-indigo-600" />
        </div>
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
      </div>
      {actionLabel && (
        <button 
          onClick={onAction}
          className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider"
        >
          {actionLabel}
        </button>
      )}
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

const NotificationItem: React.FC<{ notification: AppNotification }> = ({ notification }) => (
  <div className="flex gap-3 py-3 first:pt-0 last:pb-0 border-b border-gray-50 last:border-0">
    <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${notification.read ? 'bg-gray-200' : 'bg-indigo-500'}`} />
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-gray-800 truncate">{notification.title}</p>
      <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5">{notification.message}</p>
      <p className="text-[9px] text-gray-400 mt-1">{notification.date}</p>
    </div>
  </div>
);

const ApprovalItem: React.FC<{ approval: Approval }> = ({ approval }) => (
  <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0 border-b border-gray-50 last:border-0">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
        {approval.type === 'Gasto' ? <DollarSign size={14} /> : approval.type === 'Vacaciones' ? <Calendar size={14} /> : <Briefcase size={14} />}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-800">{approval.title}</p>
        <p className="text-[10px] text-gray-500">{approval.requester}</p>
      </div>
    </div>
    <button className="p-1.5 hover:bg-gray-50 rounded-lg text-indigo-600">
      <ArrowUpRight size={14} />
    </button>
  </div>
);

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="flex gap-3 py-3 first:pt-0 last:pb-0 border-b border-gray-50 last:border-0">
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
      <User size={14} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] text-gray-800">
        <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold">{activity.target}</span>
      </p>
      <p className="text-[9px] text-gray-400 mt-0.5">{activity.date}</p>
    </div>
  </div>
);

const RightModules: React.FC<{ role: Role }> = ({ role }) => {
  return (
    <div className="space-y-6">
      {/* Notifications Module - Common to all but filtered by relevance */}
      <ModuleCard title="Notificaciones" icon={Bell} actionLabel="Ver Todas">
        <div className="space-y-1">
          {MOCK_NOTIFICATIONS.slice(0, 3).map(n => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      </ModuleCard>

      {/* Role Specific Modules */}
      { (role === Role.ADMIN || role === Role.MANAGER || role === Role.FINANCE) && (
        <ModuleCard title="Aprobaciones Pendientes" icon={Zap} actionLabel="Gestionar">
          <div className="space-y-1">
            {MOCK_APPROVALS.slice(0, 3).map(a => (
              <ApprovalItem key={a.id} approval={a} />
            ))}
          </div>
        </ModuleCard>
      )}

      { role === Role.SALES && (
        <ModuleCard title="Top Clientes Hoy" icon={Users}>
          <div className="space-y-3">
            {['Luis Perez', 'Maria Gonzalez', 'Ana Torres'].map((name, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                    {name[0]}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{name}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600">VIP</span>
              </div>
            ))}
          </div>
        </ModuleCard>
      )}

      { (role === Role.BODEGA || role === Role.RECEPCION) && (
        <ModuleCard title="Alertas de Stock" icon={Package}>
          <div className="space-y-3">
            {[
              { item: 'Nupec Cachorro 2kg', stock: 8, min: 15 },
              { item: 'Royal Canin Adulto', stock: 45, min: 10 },
            ].filter(i => i.stock < i.min).map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs text-gray-700">{item.item}</span>
                <span className="text-[10px] font-bold text-red-500">{item.stock} / {item.min}</span>
              </div>
            ))}
          </div>
        </ModuleCard>
      )}

      { role === Role.IT && (
        <ModuleCard title="Estado de Servidores" icon={Shield}>
          <div className="space-y-3">
            {[
              { name: 'DB-Primary', status: 'Online', load: '24%' },
              { name: 'Web-Server-01', status: 'Online', load: '45%' },
              { name: 'Auth-Service', status: 'Warning', load: '89%' },
            ].map((srv, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${srv.status === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-xs text-gray-700">{srv.name}</span>
                </div>
                <span className="text-[10px] font-mono text-gray-500">{srv.load}</span>
              </div>
            ))}
          </div>
        </ModuleCard>
      )}

      { role === Role.MARKETING && (
        <div className="space-y-6">
          <ModuleCard title="Rendimiento Social" icon={Instagram}>
            <div className="space-y-4">
              {[
                { platform: 'Instagram', reach: '45.2k', change: '+12%', icon: Instagram, color: 'text-pink-500' },
                { platform: 'Facebook', reach: '28.1k', change: '+5%', icon: Facebook, color: 'text-blue-600' },
                { platform: 'TikTok', reach: '124.5k', change: '+28%', icon: Video, color: 'text-black' },
              ].map((social, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <social.icon size={14} className={social.color} />
                    <span className="text-xs font-medium text-gray-700">{social.platform}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-800">{social.reach}</p>
                    <p className="text-[9px] text-emerald-600 font-bold">{social.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </ModuleCard>

          <ModuleCard title="Próximas Campañas" icon={Zap}>
            <div className="space-y-3">
              {[
                { name: 'Día del Perro', date: '15 Abr', status: 'Planificación' },
                { name: 'Promo Primavera', date: '01 Abr', status: 'Diseño' },
              ].map((camp, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-800">{camp.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-gray-500">{camp.date}</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded-full font-bold uppercase">{camp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </ModuleCard>
        </div>
      )}

      {/* Activity Module - Common */}
      <ModuleCard title="Actividad Reciente" icon={Clock} actionLabel="Ver Historial">
        <div className="space-y-1">
          {MOCK_ACTIVITIES.slice(0, 3).map(a => (
            <ActivityItem key={a.id} activity={a} />
          ))}
        </div>
      </ModuleCard>

      {/* Quick Support - Common */}
      <div className="bg-indigo-600 rounded-2xl p-4 text-white shadow-lg shadow-indigo-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <MessageSquare size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold">Soporte Kanu</h4>
            <p className="text-[10px] text-indigo-100">¿Necesitas ayuda técnica?</p>
          </div>
        </div>
        <button className="w-full py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors">
          Contactar IT
        </button>
      </div>
    </div>
  );
};

export default RightModules;
