import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../types/product.types';

interface ProductTableProps {
  productos: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number | string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ productos, loading, onEdit, onDelete }) => {
  if (loading) {
    return <div className="text-center py-10 text-slate-400">Cargando productos...</div>;
  }

  if (productos.length === 0) {
    return <div className="text-center py-10 text-slate-400">No hay productos registrados en el sistema.</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 text-slate-600 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
              <th className="py-4 px-6">Nombre</th>
              <th className="py-4 px-6">Categoría</th>
              <th className="py-4 px-6">Precio</th>
              <th className="py-4 px-6">Stock</th>
              <th className="py-4 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {productos.map((producto) => (
              <tr key={producto.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-4 px-6 font-medium text-slate-900">{producto.nombre}</td>
                <td className="py-4 px-6">
                  <span className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-medium">
                    {producto.categoria}
                  </span>
                </td>
                <td className="py-4 px-6 text-slate-600">${Number(producto.precio).toFixed(2)}</td>
                <td className="py-4 px-6">
                  <span className={`font-semibold ${producto.stock < 10 ? 'text-amber-600' : 'text-slate-700'}`}>
                    {producto.stock} un.
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(producto)}
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(producto.id)}
                      className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};