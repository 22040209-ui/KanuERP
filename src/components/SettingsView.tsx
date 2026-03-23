import React from 'react';
import { Settings, Shield, Database,  Save } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
           <Settings className="text-gray-600" /> Configuración del Sistema
        </h1>
        <button className="flex items-center gap-2 px-6 py-2 bg-kanu-600 text-white rounded-md text-sm font-medium hover:bg-kanu-700 shadow-sm">
           <Save size={16} /> Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Sidebar Nav (Static for now) */}
         <div className="col-span-1 space-y-1">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-white border border-gray-200 font-medium text-kanu-700 shadow-sm border-l-4 border-l-kanu-600">
               General
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white text-gray-600 hover:shadow-sm transition-all">
               Usuarios y Permisos
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white text-gray-600 hover:shadow-sm transition-all">
               Facturación
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white text-gray-600 hover:shadow-sm transition-all">
               Copias de Seguridad
            </button>
         </div>

         {/* Form Content */}
         <div className="col-span-1 md:col-span-2 space-y-6">
            
            {/* General Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de la Empresa</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Comercial</label>
                     <input type="text" defaultValue="Kanu & Amigos" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:border-kanu-500 text-sm" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social</label>
                     <input type="text" defaultValue="Kanu & Amigos S.A. de C.V." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:border-kanu-500 text-sm" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">RFC</label>
                     <input type="text" defaultValue="KAM230101XYZ" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:border-kanu-500 text-sm" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Principal</label>
                     <input type="text" defaultValue="55-1234-5678" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:border-kanu-500 text-sm" />
                  </div>
               </div>
            </div>

            {/* System Prefs */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferencias del Sistema</h3>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded">
                           <Shield size={20} />
                        </div>
                        <div>
                           <p className="font-medium text-gray-800 text-sm">Autenticación de Dos Pasos (2FA)</p>
                           <p className="text-xs text-gray-500">Aumenta la seguridad para roles administrativos.</p>
                        </div>
                     </div>
                     <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-emerald-400 right-5" />
                        <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                     </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded">
                           <Database size={20} />
                        </div>
                        <div>
                           <p className="font-medium text-gray-800 text-sm">Respaldo Automático Diario</p>
                           <p className="text-xs text-gray-500">Ejecutar backup a las 00:00 hrs.</p>
                        </div>
                     </div>
                     <input type="checkbox" defaultChecked className="w-5 h-5 text-kanu-600 rounded focus:ring-kanu-500" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsView;