import React, { useState } from 'react';
import { useProducts } from './hooks/useProducts';
import { ProductTable } from './components/ProductTable';
import { ProductModal } from './components/ProductModal';
import { Product } from './types/product.types';
import { Plus, Coffee, Layers } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const {
    productos: products,
    loading,
    createProduct: addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = async (productData: Omit<Product, 'id'>) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, productData);
    } else {
      await addProduct(productData);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3B32] selection:bg-[#FDE047] selection:text-[#4A3B32] font-sans antialiased">
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: {
            background: '#FFFBEB',
            color: '#78350F',
            border: '1px solid #FDE68A',
          }
        }}
      />
      
      {/* Contenedor principal con diseño cozy / minimalista */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Cabecera Cálida en tonos Café y Amarillo */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 bg-[#FFFBEB] p-6 rounded-2xl border border-[#FDE68A]/60 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FEF3C7] border border-[#FDE047]/50 rounded-xl text-[#92400E]">
              <Coffee className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-[#4A3B32]">Inventario de Productos</h1>
              <p className="text-[#8C7A6B] text-sm mt-0.5">Gestión y control de artículos en tiempo real</p>
            </div>
          </div>
          
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Nuevo Producto
          </button>
        </header>

        {/* Resumen rápido / Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#FFFBEB]/60 border border-[#FDE68A]/60 rounded-2xl p-5 flex items-center gap-4">
            <div className="p-3 bg-[#FEF3C7] border border-[#FDE047]/40 text-[#B45309] rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[#8C7A6B] text-xs font-medium uppercase tracking-wider">Total Registrados</p>
              <p className="text-xl font-bold text-[#4A3B32] mt-0.5">{products.length} productos</p>
            </div>
          </div>
        </div>

        {/* Sección de la Tabla */}
        <main className="bg-white border border-[#E7E2DA] rounded-2xl overflow-hidden shadow-sm">
          <ProductTable
            productos={products}
            loading={loading}
            onEdit={handleOpenEdit}
            onDelete={deleteProduct}
          />
        </main>

        {/* Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}