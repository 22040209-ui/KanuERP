import React, { useState } from 'react';
import { MOCK_PRODUCTS, BRANCHES } from '../constants';
import { Search, Filter, Plus, Download, AlertCircle, ArrowLeftRight, Save, X, PackagePlus, Image as ImageIcon } from 'lucide-react';
import { ProductType } from '../types';
import type { Product } from '../types';
const InventoryView: React.FC = () => {
  // State for products to allow mutation (stock updates)
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for Stock Adjustment Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adjustmentQty, setAdjustmentQty] = useState<number | string>('');
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract'>('add');
  const [adjustmentReason, setAdjustmentReason] = useState('Compra');

  // State for New Product Modal
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    sku: '',
    category: '',
    price: 0,
    cost: 0,
    stock: 0,
    minStock: 5,
    type: ProductType.PRODUCT,
    branch: BRANCHES[0].id,
    image: ''
  });

  // Filter Logic
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic Stats
  const totalValue = products.reduce((acc, curr) => acc + (curr.cost * curr.stock), 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock && p.type === ProductType.PRODUCT).length;
  const categoriesCount = new Set(products.map(p => p.category)).size;

  // Handlers
  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setAdjustmentQty('');
    setAdjustmentType('add');
    setIsModalOpen(true);
  };

  const handleSaveStock = () => {
    if (!selectedProduct || !adjustmentQty) return;
    
    const qty = Number(adjustmentQty);
    if (isNaN(qty) || qty <= 0) return;

    setProducts(prev => prev.map(p => {
      if (p.id === selectedProduct.id) {
        const newStock = adjustmentType === 'add' ? p.stock + qty : Math.max(0, p.stock - qty);
        return { ...p, stock: newStock };
      }
      return p;
    }));

    setIsModalOpen(false);
  };

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.sku || !newProduct.price) {
      alert('Por favor complete los campos obligatorios (Nombre, SKU, Precio)');
      return;
    }

    const productToAdd: Product = {
      id: `p-${Date.now()}`, // Simple ID generation
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category || 'General',
      price: Number(newProduct.price),
      cost: Number(newProduct.cost) || 0,
      stock: Number(newProduct.stock) || 0,
      minStock: Number(newProduct.minStock) || 0,
      image: newProduct.image || `https://picsum.photos/200/200?random=${Date.now()}`,
      type: newProduct.type as ProductType,
      branch: newProduct.branch || BRANCHES[0].id
    };

    setProducts([...products, productToAdd]);
    setIsNewProductModalOpen(false);
    
    // Reset Form
    setNewProduct({
      name: '',
      sku: '',
      category: '',
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 5,
      type: ProductType.PRODUCT,
      branch: BRANCHES[0].id,
      image: ''
    });
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventario Global</h1>
          <p className="text-sm text-gray-500">Gestión de existencias, almacén y transferencias.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <ArrowLeftRight size={16} />
            Transferir
          </button>
          <button 
            onClick={() => setIsNewProductModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-kanu-600 text-white rounded-md text-sm font-medium hover:bg-kanu-700 shadow-sm"
          >
            <Plus size={16} />
            Nuevo Producto
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
           <span className="text-gray-500 text-sm font-medium">Valor Total Inventario</span>
           <div className="text-2xl font-bold text-gray-800 mt-1">${totalValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
           <span className="text-gray-500 text-sm font-medium">Items Bajos de Stock</span>
           <div className={`text-2xl font-bold mt-1 flex items-center gap-2 ${lowStockCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
             {lowStockCount} <AlertCircle size={20} />
           </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
           <span className="text-gray-500 text-sm font-medium">Categorías Activas</span>
           <div className="text-2xl font-bold text-gray-800 mt-1">{categoriesCount}</div>
        </div>
      </div>

      {/* Filters Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o SKU..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-kanu-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
               <Filter size={16} /> Filtros
             </button>
             <button className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
               <Download size={16} /> Exportar
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Sucursal</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-right">Costo</th>
                <th className="px-6 py-4 text-right">Precio</th>
                <th className="px-6 py-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.map((product) => {
                const isLowStock = product.stock <= product.minStock;
                const branchName = BRANCHES.find(b => b.id === product.branch)?.name;
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                           <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                        {branchName}
                    </td>
                    <td className="px-6 py-4 text-center">
                       {product.type === ProductType.SERVICE ? (
                         <span className="text-gray-400 text-xs">Servicio</span>
                       ) : (
                         <div className="flex items-center justify-center gap-2">
                           <div className="flex flex-col items-center">
                             <span className={`font-bold ${isLowStock ? 'text-red-600' : 'text-gray-800'}`}>
                               {product.stock}
                             </span>
                             {isLowStock && (
                               <span className="text-[10px] text-red-500 bg-red-50 px-1.5 rounded">Bajo</span>
                             )}
                           </div>
                           <button 
                            onClick={(e) => { e.stopPropagation(); handleOpenModal(product); }}
                            className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 hover:bg-kanu-600 hover:text-white flex items-center justify-center transition-colors"
                            title="Ajustar Stock"
                           >
                              <PackagePlus size={14} />
                           </button>
                         </div>
                       )}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      ${product.cost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-800">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className={`w-2 h-2 rounded-full inline-block ${isLowStock ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No se encontraron productos con el filtro actual.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
           <span>Mostrando {filteredProducts.length} de {products.length} entradas</span>
           <div className="flex gap-1">
             <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Ant.</button>
             <button className="px-3 py-1 bg-kanu-600 text-white rounded shadow-sm">1</button>
             <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">2</button>
             <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Sig.</button>
           </div>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-gray-800">Ajustar Inventario</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                   <X size={20} />
                 </button>
              </div>
              
              <div className="p-6 space-y-4">
                 <div className="flex items-center gap-3 mb-2">
                    <img src={selectedProduct.image} alt="" className="w-12 h-12 rounded bg-gray-100 object-cover" />
                    <div>
                      <div className="font-bold text-gray-800">{selectedProduct.name}</div>
                      <div className="text-xs text-gray-500">SKU: {selectedProduct.sku}</div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
                       <span className="block text-xs text-blue-600 font-bold uppercase">Stock Actual</span>
                       <span className="block text-2xl font-bold text-gray-800">{selectedProduct.stock}</span>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
                       <span className="block text-xs text-gray-500 font-bold uppercase">Stock Final</span>
                       <span className="block text-2xl font-bold text-gray-800">
                         {adjustmentType === 'add' 
                           ? selectedProduct.stock + (Number(adjustmentQty) || 0)
                           : Math.max(0, selectedProduct.stock - (Number(adjustmentQty) || 0))
                         }
                       </span>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Movimiento</label>
                    <div className="flex rounded-md shadow-sm">
                      <button 
                        onClick={() => setAdjustmentType('add')}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-md border ${adjustmentType === 'add' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      >
                        + Entrada
                      </button>
                      <button 
                        onClick={() => setAdjustmentType('subtract')}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${adjustmentType === 'subtract' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                      >
                        - Salida
                      </button>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                    <input 
                      type="number" 
                      value={adjustmentQty}
                      onChange={(e) => setAdjustmentQty(e.target.value)}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                      placeholder="0"
                      autoFocus
                    />
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                   <select 
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                   >
                     <option>Compra a Proveedor</option>
                     <option>Ajuste de Inventario</option>
                     <option>Devolución de Cliente</option>
                     <option>Merma / Dañado</option>
                     <option>Uso Interno</option>
                   </select>
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
                  onClick={handleSaveStock}
                  className="px-4 py-2 bg-kanu-600 text-white rounded-lg font-medium hover:bg-kanu-700 shadow-sm flex items-center gap-2"
                 >
                   <Save size={18} /> Guardar
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* New Product Modal */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in-up max-h-[90vh] flex flex-col">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-gray-800">Registrar Nuevo Producto</h3>
                 <button onClick={() => setIsNewProductModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                   <X size={20} />
                 </button>
              </div>
              
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                 {/* Basic Info */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto *</label>
                      <input 
                        type="text" 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                        placeholder="Ej: Alimento Premium Adulto"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SKU / Código *</label>
                      <input 
                        type="text" 
                        value={newProduct.sku}
                        onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                        placeholder="Ej: KANU-001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                      <input 
                        type="text" 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 focus:outline-none"
                        placeholder="Ej: Alimentos, Juguetes..."
                      />
                    </div>
                 </div>

                 {/* Pricing & Stock */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Precio Venta *</label>
                      <div className="relative">
                         <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                         <input 
                          type="number" 
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                          className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-kanu-500 text-sm"
                          min="0"
                         />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Costo</label>
                      <div className="relative">
                         <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                         <input 
                          type="number" 
                          value={newProduct.cost}
                          onChange={(e) => setNewProduct({...newProduct, cost: Number(e.target.value)})}
                          className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-kanu-500 text-sm"
                          min="0"
                         />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Stock Inicial</label>
                      <input 
                        type="number" 
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-kanu-500 text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Min. Stock</label>
                      <input 
                        type="number" 
                        value={newProduct.minStock}
                        onChange={(e) => setNewProduct({...newProduct, minStock: Number(e.target.value)})}
                        className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-kanu-500 text-sm"
                        min="0"
                      />
                    </div>
                 </div>

                 {/* Config */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Item</label>
                      <select 
                         value={newProduct.type}
                         onChange={(e) => setNewProduct({...newProduct, type: e.target.value as ProductType})}
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-kanu-500"
                      >
                         <option value={ProductType.PRODUCT}>Producto Físico</option>
                         <option value={ProductType.SERVICE}>Servicio</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sucursal</label>
                      <select 
                         value={newProduct.branch}
                         onChange={(e) => setNewProduct({...newProduct, branch: e.target.value})}
                         className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-kanu-500"
                      >
                         {BRANCHES.map(b => (
                           <option key={b.id} value={b.id}>{b.name}</option>
                         ))}
                      </select>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
                    <div className="flex gap-2">
                       <div className="relative flex-1">
                          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                          <input 
                            type="text" 
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kanu-500 text-sm"
                            placeholder="https://..."
                          />
                       </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Dejar vacío para generar imagen aleatoria.</p>
                 </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                 <button 
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                 >
                   Cancelar
                 </button>
                 <button 
                  onClick={handleCreateProduct}
                  className="px-6 py-2 bg-kanu-600 text-white rounded-lg font-medium hover:bg-kanu-700 shadow-sm flex items-center gap-2"
                 >
                   <Save size={18} /> Crear Producto
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default InventoryView;