import api from "@/api/axios";

import type { Product } from "@/types/product/product";
import type { CreateProductDto } from "@/types/product";
import type { UpdateProductDto } from "@/types/product";

class ProductService {
	async getProducts(): Promise<Product[]> {
		const response = await api.get<Product[]>("/products");

		return response.data;
	}

	async getProductById(id: number): Promise<Product> {
		const response = await api.get<Product>(`/products/${id}`);

		return response.data;
	}

	async createProduct(dto: CreateProductDto): Promise<Product> {
		const response = await api.post<Product>("/products", dto);

		return response.data;
	}

	async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
		const response = await api.put<Product>(`/products/${id}`, dto);

		return response.data;
	}

	async deleteProduct(id: number): Promise<void> {
		await api.delete(`/products/${id}`);
	}
}

export default new ProductService();
