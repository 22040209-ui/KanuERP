import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Truck, 
  Shield, 
  BarChart3, 
  Briefcase, 
  Cpu,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  MessageSquare,
  FileText,
  Wallet,
  Ticket,
  Eye,
  Activity,
  Zap,
  HardDrive,
  Database,
  Lock,
  UserPlus,
  Star,
  Instagram,
  Facebook,
  Video
} from 'lucide-react';
import { Role } from '../types';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}
      </div>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="flex justify-between items-end mb-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
    </div>
    <button className="text-indigo-600 text-sm font-semibold hover:underline">Ver todo</button>
  </div>
);

// --- ROLE SPECIFIC DASHBOARDS ---

const SalesDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Ventas Totales" value="$45,280" change="+12.5%" isPositive={true} icon={DollarSign} color="bg-indigo-500" />
      <StatCard title="Nuevos Clientes" value="124" change="+8.2%" isPositive={true} icon={Users} color="bg-emerald-500" />
      <StatCard title="Ticket Promedio" value="$365" change="-2.4%" isPositive={false} icon={Ticket} color="bg-amber-500" />
      <StatCard title="Conversión" value="3.2%" change="+0.5%" isPositive={true} icon={TrendingUp} color="bg-rose-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Embudo de Ventas" subtitle="Rendimiento del pipeline este mes" />
        <div className="space-y-4">
          {[
            { label: 'Prospectos', value: 450, color: 'bg-indigo-500', width: 'w-full' },
            { label: 'Calificados', value: 280, color: 'bg-indigo-400', width: 'w-[62%]' },
            { label: 'Propuesta', value: 120, color: 'bg-indigo-300', width: 'w-[26%]' },
            { label: 'Cierre', value: 45, color: 'bg-emerald-500', width: 'w-[10%]' },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-500">{item.value}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} ${item.width} rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Top Productos" />
        <div className="space-y-6">
          {[
            { name: 'Suscripción Pro', sales: 124, trend: '+12%' },
            { name: 'Módulo ERP', sales: 89, trend: '+5%' },
            { name: 'Soporte Premium', sales: 56, trend: '-2%' },
            { name: 'Consultoría', sales: 34, trend: '+20%' },
          ].map((product) => (
            <div key={product.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  <ShoppingBag size={20} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} ventas</p>
                </div>
              </div>
              <span className={`text-xs font-bold ${product.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                {product.trend}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ReceivingDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Entregas Hoy" value="12" change="4 pendientes" isPositive={false} icon={Truck} color="bg-blue-500" />
      <StatCard title="Items Recibidos" value="1,240" change="+15%" isPositive={true} icon={Package} color="bg-indigo-500" />
      <StatCard title="Tiempo Descarga" value="45m" change="-5m" isPositive={true} icon={Clock} color="bg-amber-500" />
      <StatCard title="Eficiencia" value="98%" change="+2%" isPositive={true} icon={CheckCircle2} color="bg-emerald-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Próximas Llegadas" subtitle="Cronograma de recepción para hoy" />
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-50">
                <th className="pb-4 font-medium">Proveedor</th>
                <th className="pb-4 font-medium">Hora Est.</th>
                <th className="pb-4 font-medium">Items</th>
                <th className="pb-4 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { provider: 'Logística Global', time: '10:30 AM', items: 450, status: 'En camino', color: 'text-blue-600 bg-blue-50' },
                { provider: 'Suministros ACME', time: '11:45 AM', items: 120, status: 'Retrasado', color: 'text-amber-600 bg-amber-50' },
                { provider: 'Tech Parts Inc', time: '02:15 PM', items: 85, status: 'Programado', color: 'text-gray-600 bg-gray-50' },
                { provider: 'Distribuidora Sur', time: '04:00 PM', items: 300, status: 'Programado', color: 'text-gray-600 bg-gray-50' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-bold text-gray-800 text-sm">{row.provider}</td>
                  <td className="py-4 text-gray-500 text-sm">{row.time}</td>
                  <td className="py-4 text-gray-500 text-sm">{row.items}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Control de Calidad" />
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-gray-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-emerald-500" strokeDasharray="95, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">95%</span>
              <span className="text-[10px] text-gray-400 uppercase">Aprobado</span>
            </div>
          </div>
          <div className="mt-6 w-full space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Total Inspeccionado</span>
              <span className="font-bold text-gray-800">840 items</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Rechazados</span>
              <span className="font-bold text-rose-500">42 items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const WarehouseDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Stock Total" value="8,450" change="+2.1%" isPositive={true} icon={Package} color="bg-indigo-500" />
      <StatCard title="Ocupación" value="78%" change="+5%" isPositive={false} icon={BarChart3} color="bg-amber-500" />
      <StatCard title="Picking Hoy" value="245" change="+12%" isPositive={true} icon={CheckCircle2} color="bg-emerald-500" />
      <StatCard title="Alertas Stock" value="14" change="Crítico" isPositive={false} icon={AlertTriangle} color="bg-rose-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Mapa de Almacén" subtitle="Estado de ocupación por zonas" />
        <div className="grid grid-cols-4 gap-4 h-64">
          {['Zona A', 'Zona B', 'Zona C', 'Zona D', 'Zona E', 'Zona F', 'Zona G', 'Zona H'].map((zona, i) => (
            <div key={zona} className={`rounded-xl border-2 flex flex-col items-center justify-center p-4 transition-all hover:scale-105 cursor-pointer ${i % 3 === 0 ? 'bg-emerald-50 border-emerald-200' : i % 4 === 0 ? 'bg-rose-50 border-rose-200' : 'bg-blue-50 border-blue-200'}`}>
              <span className="text-xs font-bold text-gray-500 uppercase">{zona}</span>
              <span className="text-lg font-bold text-gray-800">{i % 3 === 0 ? '45%' : i % 4 === 0 ? '98%' : '72%'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Alertas de Inventario" />
        <div className="space-y-4">
          {[
            { item: 'Cable HDMI 2.1', stock: 5, min: 20, priority: 'Alta' },
            { item: 'Monitor 27" 4K', stock: 2, min: 10, priority: 'Crítica' },
            { item: 'Teclado Mecánico', stock: 12, min: 15, priority: 'Baja' },
            { item: 'Mouse Wireless', stock: 8, min: 25, priority: 'Alta' },
          ].map((alert) => (
            <div key={alert.item} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-bold text-gray-800">{alert.item}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${alert.priority === 'Crítica' ? 'bg-rose-100 text-rose-600' : alert.priority === 'Alta' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                  {alert.priority}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Stock: {alert.stock}</span>
                <span>Mínimo: {alert.min}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SecurityDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Cámaras Activas" value="32/32" change="100%" isPositive={true} icon={Eye} color="bg-blue-500" />
      <StatCard title="Incidentes Hoy" value="0" change="Limpio" isPositive={true} icon={Shield} color="bg-emerald-500" />
      <StatCard title="Accesos" value="145" change="+5%" isPositive={false} icon={Users} color="bg-indigo-500" />
      <StatCard title="Alertas Sistema" value="2" change="Baja" isPositive={true} icon={Activity} color="bg-amber-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Monitoreo en Vivo" subtitle="Vista previa de cámaras principales" />
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((cam) => (
            <div key={cam} className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                  <Zap size={24} className="text-white" />
                </div>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-white uppercase">CAM-0{cam}</span>
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] text-white/70 font-mono">
                2026-03-22 21:35:04
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Registro de Accesos" />
        <div className="space-y-4">
          {[
            { user: 'Juan Pérez', zone: 'Almacén A', time: '21:30', status: 'Entrada' },
            { user: 'María García', zone: 'Oficinas', time: '21:15', status: 'Salida' },
            { user: 'Carlos Ruiz', zone: 'Carga/Descarga', time: '20:45', status: 'Entrada' },
            { user: 'Ana López', zone: 'Servidores', time: '20:30', status: 'Entrada' },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <div className={`w-2 h-10 rounded-full ${log.status === 'Entrada' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{log.user}</p>
                <p className="text-xs text-gray-500">{log.zone}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-800">{log.time}</p>
                <p className="text-[10px] text-gray-400 uppercase">{log.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MarketingDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Alcance Total" value="1.2M" change="+24%" isPositive={true} icon={Users} color="bg-indigo-500" />
      <StatCard title="Engagement" value="4.5%" change="+0.8%" isPositive={true} icon={TrendingUp} color="bg-rose-500" />
      <StatCard title="Leads Hoy" value="85" change="+12" isPositive={true} icon={UserPlus} color="bg-emerald-500" />
      <StatCard title="ROI Campañas" value="3.2x" change="-0.2x" isPositive={false} icon={DollarSign} color="bg-amber-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <SectionHeader title="Rendimiento de Canales" subtitle="Tráfico y conversiones por fuente" />
          <div className="space-y-6">
            {[
              { channel: 'Google Ads', traffic: '45k', conv: '3.2%', color: 'bg-blue-500' },
              { channel: 'Facebook/IG', traffic: '32k', conv: '2.8%', color: 'bg-indigo-500' },
              { channel: 'Email Marketing', traffic: '12k', conv: '5.4%', color: 'bg-emerald-500' },
              { channel: 'Orgánico', traffic: '28k', conv: '1.2%', color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.channel} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-gray-600">{item.channel}</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden flex">
                  <div className={`h-full ${item.color}`} style={{ width: `${(parseInt(item.traffic) / 50) * 100}%` }}></div>
                </div>
                <div className="w-16 text-right text-sm font-bold text-gray-800">{item.conv}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <SectionHeader title="Métricas de Redes Sociales" subtitle="Interacciones y crecimiento por plataforma" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              { platform: 'Instagram', followers: '12.4k', growth: '+1.2%', posts: 24, icon: Instagram },
              { platform: 'Facebook', followers: '8.2k', growth: '+0.5%', posts: 12, icon: Facebook },
              { platform: 'TikTok', followers: '45.1k', growth: '+15.4%', posts: 32, icon: Video },
            ].map((social) => (
              <div key={social.platform} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <social.icon size={20} className="text-indigo-600" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">{social.growth}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">{social.platform}</p>
                <h4 className="text-xl font-bold text-gray-800 mt-1">{social.followers}</h4>
                <p className="text-[10px] text-gray-400 mt-1">{social.posts} posts este mes</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <SectionHeader title="Campañas Activas" />
          <div className="space-y-4">
            {[
              { name: 'Cyber Monday 2026', budget: '$15k', spent: '65%', status: 'Activa' },
              { name: 'Lanzamiento Pro', budget: '$8k', spent: '90%', status: 'Finalizando' },
              { name: 'Retargeting Global', budget: '$5k', spent: '20%', status: 'Activa' },
            ].map((camp) => (
              <div key={camp.name} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-sm font-bold text-gray-800">{camp.name}</p>
                  <span className="text-[10px] px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded font-bold uppercase">{camp.status}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Presupuesto: {camp.budget}</span>
                    <span>Gasto: {camp.spent}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: camp.spent }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <SectionHeader title="Contenido Programado" />
          <div className="space-y-4">
            {[
              { date: 'Hoy, 18:00', title: 'Video: Tips de Cuidado', platform: 'TikTok' },
              { date: 'Mañana, 10:00', title: 'Post: Nueva Colección', platform: 'Instagram' },
              { date: '24 Mar, 12:00', title: 'Newsletter Semanal', platform: 'Email' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">{item.title}</p>
                  <p className="text-[10px] text-gray-500">{item.platform} • {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FinanceDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Balance Neto" value="$245,800" change="+15.2%" isPositive={true} icon={Wallet} color="bg-emerald-500" />
      <StatCard title="Ingresos Mes" value="$84,200" change="+8.4%" isPositive={true} icon={TrendingUp} color="bg-indigo-500" />
      <StatCard title="Gastos Mes" value="$32,450" change="-2.1%" isPositive={true} icon={ArrowDownRight} color="bg-rose-500" />
      <StatCard title="Cuentas x Cobrar" value="$12,800" change="5 vencidas" isPositive={false} icon={FileText} color="bg-amber-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Flujo de Caja" subtitle="Ingresos vs Gastos (últimos 6 meses)" />
        <div className="h-64 flex items-end justify-between gap-4 px-4">
          {[45, 62, 58, 75, 82, 90].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex gap-1 items-end h-full">
                <div className="flex-1 bg-indigo-500 rounded-t-md" style={{ height: `${h}%` }}></div>
                <div className="flex-1 bg-rose-400 rounded-t-md" style={{ height: `${h * 0.6}%` }}></div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Mes {i+1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Aprobaciones Pendientes" />
        <div className="space-y-4">
          {[
            { desc: 'Reembolso Viaje Ventas', amount: '$450', user: 'Juan P.', date: 'Hoy' },
            { desc: 'Factura AWS Mensual', amount: '$1,200', user: 'Sistemas', date: 'Ayer' },
            { desc: 'Compra Mobiliario', amount: '$3,500', user: 'Admin', date: 'Ayer' },
          ].map((item, i) => (
            <div key={i} className="p-3 hover:bg-gray-50 rounded-xl border border-transparent hover:border-gray-100 transition-all group">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-bold text-gray-800">{item.desc}</p>
                <span className="text-sm font-bold text-indigo-600">{item.amount}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">{item.user} • {item.date}</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 bg-emerald-100 text-emerald-600 rounded hover:bg-emerald-200"><CheckCircle2 size={14} /></button>
                  <button className="p-1 bg-rose-100 text-rose-600 rounded hover:bg-rose-200"><AlertTriangle size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Ingresos Totales" value="$1.2M" change="+18%" isPositive={true} icon={DollarSign} color="bg-indigo-500" />
      <StatCard title="Margen Operativo" value="24%" change="+2%" isPositive={true} icon={BarChart3} color="bg-emerald-500" />
      <StatCard title="Headcount" value="156" change="+4" isPositive={true} icon={Users} color="bg-blue-500" />
      <StatCard title="Satisfacción" value="4.8/5" change="+0.2" isPositive={true} icon={TrendingUp} color="bg-amber-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Salud por Departamento" />
        <div className="space-y-6">
          {[
            { dept: 'Ventas', health: 92, status: 'Excelente', color: 'bg-emerald-500' },
            { dept: 'Operaciones', health: 78, status: 'Bueno', color: 'bg-blue-500' },
            { dept: 'Finanzas', health: 95, status: 'Excelente', color: 'bg-emerald-500' },
            { dept: 'Marketing', health: 64, status: 'Atención', color: 'bg-amber-500' },
          ].map((item) => (
            <div key={item.dept} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-800">{item.dept}</span>
                <span className="text-gray-500">{item.status} ({item.health}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.health}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Hitos Estratégicos" />
        <div className="space-y-6">
          {[
            { goal: 'Expansión Mercado Latam', progress: 75, date: 'Q3 2026' },
            { goal: 'Certificación ISO 9001', progress: 40, date: 'Q4 2026' },
            { goal: 'Reducción Costos Op.', progress: 90, date: 'Q2 2026' },
          ].map((hito) => (
            <div key={hito.goal} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hito.progress === 100 ? 'bg-emerald-500 text-white' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'}`}>
                  {hito.progress === 100 ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{hito.progress}%</span>}
                </div>
                <div className="w-0.5 h-full bg-gray-100 my-1"></div>
              </div>
              <div className="pb-6">
                <p className="text-sm font-bold text-gray-800">{hito.goal}</p>
                <p className="text-xs text-gray-500">Fecha objetivo: {hito.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const HRDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Colaboradores" value="156" change="+4" isPositive={true} icon={Users} color="bg-indigo-500" />
      <StatCard title="Vacantes" value="12" change="3 urgentes" isPositive={false} icon={Briefcase} color="bg-blue-500" />
      <StatCard title="Clima Laboral" value="8.4" change="+0.2" isPositive={true} icon={TrendingUp} color="bg-emerald-500" />
      <StatCard title="Rotación" value="2.1%" change="-0.5%" isPositive={true} icon={ArrowDownRight} color="bg-amber-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Cumpleaños y Aniversarios" subtitle="Celebraciones de la semana" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Lucía Méndez', event: 'Cumpleaños', date: 'Mañana', type: 'bday' },
            { name: 'Roberto Sosa', event: '3 Años en la empresa', date: '24 Mar', type: 'anniv' },
            { name: 'Elena Torres', event: 'Cumpleaños', date: '26 Mar', type: 'bday' },
            { name: 'Marcos Díaz', event: '1 Año en la empresa', date: '27 Mar', type: 'anniv' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${item.type === 'bday' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-100 text-indigo-600'}`}>
                {item.type === 'bday' ? <Zap size={20} /> : <CheckCircle2 size={20} />}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{item.name}</p>
                <p className="text-xs text-gray-500">{item.event} • {item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Procesos de Selección" />
        <div className="space-y-4">
          {[
            { pos: 'Senior Developer', candidates: 12, stage: 'Entrevistas' },
            { pos: 'Gerente de Ventas', candidates: 45, stage: 'Screening' },
            { pos: 'Analista Contable', candidates: 8, stage: 'Pruebas' },
          ].map((job) => (
            <div key={job.pos} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <p className="text-sm font-bold text-gray-800">{job.pos}</p>
                <span className="text-[10px] font-bold text-indigo-600 uppercase">{job.stage}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"></div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">+{job.candidates - 3} candidatos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ITDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Uptime Sistemas" value="99.98%" change="+0.01%" isPositive={true} icon={Activity} color="bg-emerald-500" />
      <StatCard title="Tickets Abiertos" value="14" change="-2" isPositive={true} icon={MessageSquare} color="bg-indigo-500" />
      <StatCard title="Carga Servidor" value="42%" change="+5%" isPositive={false} icon={Cpu} color="bg-blue-500" />
      <StatCard title="Vulnerabilidades" value="0" change="Limpio" isPositive={true} icon={Shield} color="bg-emerald-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Estado de Infraestructura" subtitle="Monitoreo de servicios críticos" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Base de Datos Principal', status: 'Online', load: '12%', icon: Database },
            { name: 'Servidor de Aplicaciones', status: 'Online', load: '45%', icon: HardDrive },
            { name: 'API Gateway', status: 'Online', load: '28%', icon: Zap },
            { name: 'Firewall Corporativo', status: 'Online', load: '5%', icon: Lock },
          ].map((service) => (
            <div key={service.name} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
              <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                <service.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-bold text-gray-800">{service.name}</p>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">{service.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: service.load }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{service.load}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Tickets Recientes" />
        <div className="space-y-4">
          {[
            { title: 'Error acceso VPN', user: 'Ana L.', priority: 'Alta', time: '10m ago' },
            { title: 'Reset password ERP', user: 'Pedro S.', priority: 'Baja', time: '25m ago' },
            { title: 'Lentitud en Almacén', user: 'Juan R.', priority: 'Media', time: '1h ago' },
            { title: 'Nuevo equipo RH', user: 'Elena T.', priority: 'Baja', time: '2h ago' },
          ].map((ticket, i) => (
            <div key={i} className="flex flex-col p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-bold text-gray-800">{ticket.title}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${ticket.priority === 'Alta' ? 'bg-rose-100 text-rose-600' : ticket.priority === 'Media' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                  {ticket.priority}
                </span>
              </div>
              <p className="text-xs text-gray-500">{ticket.user} • {ticket.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ManagerDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Ingresos Sucursal" value="$124,500" change="+15%" isPositive={true} icon={DollarSign} color="bg-emerald-500" />
      <StatCard title="Proyectos Activos" value="8" change="+2" isPositive={true} icon={Briefcase} color="bg-indigo-500" />
      <StatCard title="Satisfacción Cliente" value="4.9" change="+0.1" isPositive={true} icon={Star} color="bg-amber-500" />
      <StatCard title="Productividad" value="92%" change="-3%" isPositive={false} icon={Activity} color="bg-blue-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Rendimiento por Departamento" subtitle="Comparativa de cumplimiento de metas" />
        <div className="space-y-6">
          {[
            { name: 'Ventas', progress: 95, color: 'bg-emerald-500' },
            { name: 'Operaciones', progress: 82, color: 'bg-blue-500' },
            { name: 'Atención al Cliente', progress: 88, color: 'bg-indigo-500' },
            { name: 'Logística', progress: 74, color: 'bg-amber-500' },
          ].map((dept) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-800">{dept.name}</span>
                <span className="text-gray-500">{dept.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${dept.color}`} style={{ width: `${dept.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Aprobaciones Urgentes" />
        <div className="space-y-4">
          {[
            { title: 'Presupuesto Marketing Q2', amount: '$15,000', type: 'Gasto' },
            { title: 'Contratación Senior Dev', amount: '-', type: 'RH' },
            { title: 'Mantenimiento Servidores', amount: '$2,400', type: 'IT' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.type} {item.amount !== '-' && `• ${item.amount}`}</p>
              </div>
              <button className="p-2 bg-white rounded-lg border border-gray-200 text-indigo-600 hover:bg-indigo-50 transition-colors">
                <ArrowUpRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const StylistDashboard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Citas Hoy" value="8" change="2 pendientes" isPositive={false} icon={Calendar} color="bg-indigo-500" />
      <StatCard title="Propinas Mes" value="$1,240" change="+12%" isPositive={true} icon={Wallet} color="bg-emerald-500" />
      <StatCard title="Tiempo Promedio" value="45m" change="-5m" isPositive={true} icon={Clock} color="bg-blue-500" />
      <StatCard title="Retención" value="85%" change="+5%" isPositive={true} icon={Users} color="bg-rose-500" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Agenda del Día" subtitle="Tus citas programadas para hoy" />
        <div className="space-y-4">
          {[
            { time: '09:00 AM', client: 'Ana García', service: 'Corte y Peinado', status: 'Completado' },
            { time: '10:30 AM', client: 'Roberto Sosa', service: 'Barba y Corte', status: 'En Proceso' },
            { time: '12:00 PM', client: 'Elena Torres', service: 'Coloración', status: 'Pendiente' },
            { time: '02:30 PM', client: 'Marcos Díaz', service: 'Tratamiento Capilar', status: 'Pendiente' },
          ].map((appt, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-center min-w-[80px]">
                <p className="text-sm font-bold text-gray-800">{appt.time}</p>
                <p className="text-[10px] text-gray-400 uppercase">Hora</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{appt.client}</p>
                <p className="text-xs text-gray-500">{appt.service}</p>
              </div>
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${appt.status === 'Completado' ? 'bg-emerald-100 text-emerald-600' : appt.status === 'En Proceso' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                {appt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <SectionHeader title="Feedback de Clientes" />
        <div className="space-y-6">
          {[
            { user: 'Ana G.', comment: 'Excelente servicio, muy profesional.', rating: 5 },
            { user: 'Roberto S.', comment: 'Me encantó el resultado.', rating: 5 },
            { user: 'Elena T.', comment: 'Muy atenta a los detalles.', rating: 4 },
          ].map((review, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-800">{review.user}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Fallback for roles not explicitly implemented yet
const PlaceholderDashboard = ({ role }: { role: string }) => (
  <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
    <div className="p-4 bg-gray-50 rounded-full mb-4">
      <Briefcase size={48} className="text-gray-300" />
    </div>
    <h2 className="text-xl font-bold text-gray-800">Panel de {role}</h2>
    <p className="text-gray-500 max-w-md mt-2">
      Estamos personalizando este panel con las herramientas y métricas específicas para tu rol. 
      Pronto verás aquí toda la información relevante para tu día a día.
    </p>
  </div>
);

const RoleSpecificDashboard: React.FC<{ role: Role }> = ({ role }) => {
  switch (role) {
    case Role.SALES:
      return <SalesDashboard />;
    case Role.RECEPCION:
      return <ReceivingDashboard />;
    case Role.BODEGA:
      return <WarehouseDashboard />;
    case Role.SEGURIDAD:
      return <SecurityDashboard />;
    case Role.MARKETING:
      return <MarketingDashboard />;
    case Role.FINANCE:
      return <FinanceDashboard />;
    case Role.ADMIN:
      return <AdminDashboard />;
    case Role.HR:
      return <HRDashboard />;
    case Role.IT:
      return <ITDashboard />;
    case Role.MANAGER:
      return <ManagerDashboard />;
    case Role.STYLIST:
      return <StylistDashboard />;
    default:
      return <PlaceholderDashboard role={role} />;
  }
};

export default RoleSpecificDashboard;
