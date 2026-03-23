import React, { useState } from 'react';
import { Smile, Search, UserPlus, Filter, Phone, Mail, MapPin, Star, MoreHorizontal, X, Save, PawPrint } from 'lucide-react';
import { MOCK_CLIENTS } from '../constants';
import type { Client } from '../types';

const ClientsView: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    petNames: [],
    status: 'Activo',
    loyaltyPoints: 0
  });
  const [tempPetName, setTempPetName] = useState('');

  // Filtering
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  // Handlers
  const handleAddPet = () => {
    if (tempPetName.trim()) {
      setNewClient({ ...newClient, petNames: [...(newClient.petNames || []), tempPetName.trim()] });
      setTempPetName('');
    }
  };

  const handleCreateClient = () => {
    if (!newClient.name || !newClient.phone) {
      alert('Nombre y teléfono son obligatorios');
      return;
    }

    const clientToAdd: Client = {
      id: `c-${Date.now()}`,
      name: newClient.name,
      email: newClient.email || '',
      phone: newClient.phone,
      address: newClient.address || '',
      petNames: newClient.petNames || [],
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Activo',
      loyaltyPoints: 0
    };

    setClients([...clients, clientToAdd]);
    setIsModalOpen(false);
    setNewClient({ name: '', email: '', phone: '', address: '', petNames: [], status: 'Activo', loyaltyPoints: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <Smile className="text-kanu-600" /> Directorio de Clientes
           </h1>
           <p className="text-sm text-gray-500">Gestión de clientes, mascotas y programa de lealtad.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-kanu-600 text-white rounded-md text-sm font-medium hover:bg-kanu-700 shadow-sm"
        >
           <UserPlus size={16} /> Nuevo Cliente
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Clientes Activos</h3>
            <div className="text-2xl font-bold text-gray-800">{clients.filter(c => c.status === 'Activo').length}</div>
            <div className="text-xs text-green-600 mt-1 font-medium">+5 esta semana</div>
         </div>
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Puntos de Lealtad (Global)</h3>
            <div className="text-2xl font-bold text-gray-800">
               {clients.reduce((acc, curr) => acc + curr.loyaltyPoints, 0).toLocaleString()}
            </div>
            <div className="text-xs text-blue-500 mt-1 font-medium">Equivale a $4,500 en descuentos</div>
         </div>
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Mascotas Registradas</h3>
            <div className="text-2xl font-bold text-gray-800">
               {clients.reduce((acc, curr) => acc + curr.petNames.length, 0)}
            </div>
            <div className="text-xs text-orange-500 mt-1 font-medium">Promedio 1.5 por cliente</div>
         </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o teléfono..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kanu-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
             <Filter size={16} /> Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Mascotas</th>
                <th className="px-6 py-4 text-center">Puntos</th>
                <th className="px-6 py-4">Última Visita</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-kanu-100 flex items-center justify-center text-kanu-700 font-bold text-lg">
                         {client.name.substring(0,1)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{client.name}</div>
                        <div className="text-xs text-gray-500">ID: {client.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-gray-600 text-xs">
                          <Mail size={12} /> {client.email || 'N/A'}
                       </div>
                       <div className="flex items-center gap-2 text-gray-600 text-xs">
                          <Phone size={12} /> {client.phone}
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {client.petNames.length > 0 ? (
                        client.petNames.map((pet, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium border border-purple-100">
                             <PawPrint size={10} /> {pet}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400 italic">Sin mascotas</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold border border-yellow-100">
                       <Star size={10} className="fill-yellow-500" /> {client.loyaltyPoints} pts
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {client.lastVisit}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${client.status === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                       <span className={`w-1.5 h-1.5 rounded-full ${client.status === 'Activo' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                       {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-kanu-600 hover:bg-gray-100 rounded-full transition-colors">
                       <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in-up flex flex-col">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-gray-800">Registrar Nuevo Cliente</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                   <X size={20} />
                 </button>
              </div>
              
              <div className="p-6 space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                    <input 
                      type="text" 
                      value={newClient.name}
                      onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                       <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            type="text" 
                            value={newClient.phone}
                            onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                          />
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                       <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            type="email" 
                            value={newClient.email}
                            onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                          />
                       </div>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <div className="relative">
                       <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                       <input 
                         type="text" 
                         value={newClient.address}
                         onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                         className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                       />
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mascotas</label>
                    <div className="flex gap-2 mb-2">
                       <input 
                         type="text" 
                         value={tempPetName}
                         onChange={(e) => setTempPetName(e.target.value)}
                         placeholder="Nombre de la mascota"
                         className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none text-sm"
                       />
                       <button 
                         onClick={handleAddPet}
                         className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200"
                       >
                         <PawPrint size={18} />
                       </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {newClient.petNames?.map((pet, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs border border-purple-100">
                             {pet} 
                             <button 
                               onClick={() => setNewClient({...newClient, petNames: newClient.petNames?.filter((_, i) => i !== idx)})}
                               className="hover:text-red-500 ml-1"
                             >
                                <X size={12} />
                             </button>
                          </span>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                 <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                 >
                   Cancelar
                 </button>
                 <button 
                  onClick={handleCreateClient}
                  className="px-6 py-2 bg-kanu-600 text-white rounded-lg font-medium hover:bg-kanu-700 shadow-sm flex items-center gap-2"
                 >
                   <Save size={18} /> Guardar Cliente
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClientsView;