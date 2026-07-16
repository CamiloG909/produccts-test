import { defineStore } from "pinia";
import { ref } from "vue";
import productService from "@/services/product.service";
import type {
	CreateProductDto,
	Product,
	UpdateProductDto,
} from "@/types/product";

export const useProductStore = defineStore("product", () => {
	const products = ref<Product[]>([]);
	const loading = ref<boolean>(false);
	const error = ref<string>("");

	async function getProducts() {
		loading.value = true;
		error.value = "";

		try {
			products.value = await productService.getProducts();
		} catch {
			error.value = "Error obteniendo los productos.";
		} finally {
			loading.value = false;
		}
	}

	async function createProduct(dto: CreateProductDto) {
		loading.value = true;
		error.value = "";

		try {
			const product = await productService.createProduct(dto);

			products.value.push(product);
		} catch {
			error.value = "Error creando el producto.";
		} finally {
			loading.value = false;
		}
	}

	async function updateProduct(id: number, dto: UpdateProductDto) {
		loading.value = true;
		error.value = "";

		try {
			const updatedProduct = await productService.updateProduct(id, dto);

			const index = products.value.findIndex((product) => product.id === id);

			if (index !== -1) {
				products.value[index] = updatedProduct;
			}
		} catch {
			error.value = "Error actualizando el producto.";
		} finally {
			loading.value = false;
		}
	}

	async function deleteProduct(id: number) {
		loading.value = true;
		error.value = "";

		try {
			await productService.deleteProduct(id);

			products.value = products.value.filter((product) => product.id !== id);
		} catch {
			error.value = "Error eliminando el producto.";
		} finally {
			loading.value = false;
		}
	}

	return {
		products,
		loading,
		error,
		getProducts,
		createProduct,
		updateProduct,
		deleteProduct,
	};
});
