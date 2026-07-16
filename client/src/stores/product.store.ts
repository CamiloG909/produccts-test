import productService from "@/services/product";
import type {
	CreateProductDto,
	UpdateProductDto
} from "@/types/product";
import type { ProductWithHistory } from "@/types/responses";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
	const products = ref<ProductWithHistory[]>([]);
	const loading = ref<boolean>(false);
	const error = ref<string>("");

	async function getProducts() {
		loading.value = true;
		error.value = "";

		try {
			products.value = await productService.getProducts();
		} catch (err) {
			error.value = "Error obteniendo los productos.";

			throw err;
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
		} catch (err) {
			error.value = "Error creando el producto.";

			throw err;
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
		} catch (err) {
			error.value = "Error actualizando el producto.";

			throw err;
		} finally {
			loading.value = false;
		}
	}

	async function changeStatusProduct(id: number) {
		loading.value = true;
		error.value = "";

		try {
			const updatedProduct = await productService.changeStatusProduct(id);
			const index = products.value.findIndex((product) => product.id === id);

			if (index !== -1) {
				products.value[index] = updatedProduct;
			}
		} catch (err) {
			error.value = "Error cambiando el estado del producto.";

			throw err;
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
		} catch (err) {
			error.value = "Error eliminando el producto.";

			throw err;
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
		changeStatusProduct,
		deleteProduct,
	};
});
