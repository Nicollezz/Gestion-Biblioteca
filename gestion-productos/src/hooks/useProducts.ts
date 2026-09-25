import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Product, ProductFormData } from '../types/product.types';

const API_URL = 'https://api.example.com/productos'; 

export function useProducts() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // READ: Obtener productos
  const fetchProductos = async () => {
    try {
      setLoading(true);
      

      setProductos([
        { id: 1, nombre: 'Café Orgánico', precio: 12.50, stock: 30, categoria: 'Bebidas' },
        { id: 2, nombre: 'Miel Pura', precio: 8.00, stock: 15, categoria: 'Abarrotes' }
      ]);
    } catch (error) {
      toast.error('Error al cargar los productos desde la API.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // CREATE
  const createProduct = async (data: ProductFormData) => {
    try {
     
      
      const nuevo: Product = { id: Date.now(), ...data };
      setProductos(prev => [nuevo, ...prev]);
      toast.success('¡Producto creado exitosamente!');
    } catch (error) {
      toast.error('No se pudo crear el producto.');
    }
  };

  // UPDATE
  const updateProduct = async (id: number | string, data: ProductFormData) => {
    try {
     

      setProductos(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
      toast.success('¡Producto actualizado con éxito!');
    } catch (error) {
      toast.error('No se pudo actualizar el producto.');
    }
  };

  // DELETE
  const deleteProduct = async (id: number | string) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) return;

    try {
      

      setProductos(prev => prev.filter(p => p.id !== id));
      toast.success('Producto eliminado correctamente.');
    } catch (error) {
      toast.error('No se pudo eliminar el producto.');
    }
  };

  return {
    productos,
    loading,
    createProduct,
    updateProduct,
    deleteProduct
  };
}