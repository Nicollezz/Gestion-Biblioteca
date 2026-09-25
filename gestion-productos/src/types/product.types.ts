export interface Product {
  id: number | string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

export type ProductFormData = Omit<Product, 'id'>;