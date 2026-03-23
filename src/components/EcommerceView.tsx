import React from 'react';
import { Globe, RefreshCw, Filter, ExternalLink } from 'lucide-react';
import { MOCK_ONLINE_ORDERS } from '../constants';

const EcommerceView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <Globe className="text-blue-500" /> Kanu Online Store
           </h1>
           <p className="text-sm text-gray-500">Gestión de pedidos web y sincronización de catálogo.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
             <ExternalLink size={16} /> Ver Tienda
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">
             <RefreshCw size={16} /> Sincronizar Inventario
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Pedidos Pendientes</h3>
            <div className="text-2xl font-bold text-gray-800">5</div>
            <div className="text-xs text-orange-500 mt-1 font-medium">Requieren atención inmediata</div>
         </div>
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Ventas Online (Mes)</h3>
            <div className="text-2xl font-bold text-gray-800">$45,230.00</div>
            <div className="text-xs text-green-600 mt-1 font-medium">+15% vs mes anterior</div>
         </div>
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Productos Publicados</h3>
            <div className="text-2xl font-bold text-gray-800">124</div>
            <div className="text-xs text-blue-500 mt-1 font-medium">98% Sincronizados</div>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Pedidos Recientes</h3>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
               <Filter size={16} /> Filtrar
            </button>
         </div>
         <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
               <tr>
                  <th className="px-6 py-4">ID Pedido</th>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Items</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Pago</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Acciones</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
               {MOCK_ONLINE_ORDERS.map(order => {
                  const statusColors: any = {
                     'Pendiente': 'bg-yellow-100 text-yellow-700',
                     'Preparando': 'bg-blue-100 text-blue-700',
                     'Enviado': 'bg-purple-100 text-purple-700',
                     'Entregado': 'bg-green-100 text-green-700',
                  };
                  return (
                     <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-blue-600">{order.id}</td>
                        <td className="px-6 py-4 text-gray-800 font-medium">{order.customerName}</td>
                        <td className="px-6 py-4 text-gray-500">{order.date}</td>
                        <td className="px-6 py-4 text-gray-600">{order.itemsCount}</td>
                        <td className="px-6 py-4 font-bold text-gray-800">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                           <span className="text-xs font-semibold px-2 py-1 rounded bg-green-50 text-green-600 border border-green-100">
                              {order.paymentStatus}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                              {order.status}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <button className="text-kanu-600 hover:underline font-medium text-xs">Gestionar</button>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
    </div>
  );
};

export default EcommerceView;