import api from "@/api/axios";

import type { CreateProductDto, UpdateProductDto } from "@/types/product";
import type { ProductWithHistory } from "@/types/responses";

class ProductService {
	async getProducts(): Promise<ProductWithHistory[]> {
		const response = await api.get<ProductWithHistory[]>("/products");

		return response.data;
	}

	async getProductById(id: number): Promise<ProductWithHistory> {
		const response = await api.get<ProductWithHistory>(`/products/${id}`);

		return response.data;
	}

	async createProduct(dto: CreateProductDto): Promise<ProductWithHistory> {
		const response = await api.post<ProductWithHistory>("/products", dto);

		return response.data;
	}

	async updateProduct(
		id: number,
		dto: UpdateProductDto,
	): Promise<ProductWithHistory> {
		const response = await api.put<ProductWithHistory>(`/products/${id}`, dto);

		return response.data;
	}

	async changeStatusProduct(id: number): Promise<ProductWithHistory> {
		const response = await api.patch<ProductWithHistory>(
			`/products/${id}/status`,
		);

		return response.data;
	}

	async deleteProduct(id: number): Promise<void> {
		await api.delete(`/products/${id}`);
	}
}

export default new ProductService();
