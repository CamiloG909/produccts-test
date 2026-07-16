export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductHistory {
  id: number;
  product_id: number;
  action: "CREATE" | "UPDATE" | "STATUS_CHANGE";
  description: string;
  created_at: string;
}

export interface ProductWithHistory extends Product {
  history: ProductHistory[];
}
