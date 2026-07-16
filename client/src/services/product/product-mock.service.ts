import { mockProducts } from "@/mocks/product.mock";

import type {
	CreateProductDto,
	ProductHistory,
	UpdateProductDto,
} from "@/types/product";
import type { ProductWithHistory } from "@/types/responses";

let products: ProductWithHistory[] = [...mockProducts];

class ProductMockService {
	async getProducts(): Promise<ProductWithHistory[]> {
		return [...products];
	}

	async getProductById(id: number): Promise<ProductWithHistory> {
		const product = products.find((p) => p.id === id);

		if (!product) {
			throw new Error("Producto no encontrado");
		}

		return { ...product };
	}

	async createProduct(dto: CreateProductDto): Promise<ProductWithHistory> {
		const idProduct = Date.now();
		const product: ProductWithHistory = {
			id: idProduct,
			...dto,
			status: true,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			history: [this.createHistory(idProduct, "CREATE", "Producto creado")],
		};

		products.push(product);

		return product;
	}

	async updateProduct(
		id: number,
		dto: UpdateProductDto,
	): Promise<ProductWithHistory> {
		const index = products.findIndex((p) => p.id === id);

		if (index === -1) {
			throw new Error("Producto no encontrado");
		}

		const product = products[index];

		products[index] = {
			...product,
			...dto,
			updated_at: new Date().toISOString(),
			history: [
				...product.history,
				this.createHistory(id, "UPDATE", "Producto actualizado"),
			],
		};

		return products[index];
	}

	async changeStatusProduct(id: number): Promise<ProductWithHistory> {
		const index = products.findIndex((p) => p.id === id);

		if (index === -1) {
			throw new Error("Producto no encontrado");
		}

		const product = products[index];

		const newStatus = !product.status;

		products[index] = {
			...product,
			status: newStatus,
			updated_at: new Date().toISOString(),
			history: [
				...product.history,
				this.createHistory(
					id,
					"STATUS_CHANGE",
					newStatus ? "Producto activado" : "Producto desactivado",
				),
			],
		};

		return products[index];
	}

	async deleteProduct(id: number): Promise<void> {
		products = products.filter((p) => p.id !== id);
	}

	createHistory(
		productId: number,
		action: "CREATE" | "UPDATE" | "STATUS_CHANGE",
		description: string,
	): ProductHistory {
		return {
			id: Date.now(),
			product_id: productId,
			action,
			description,
			created_at: new Date().toISOString(),
		};
	}
}

export default new ProductMockService();
