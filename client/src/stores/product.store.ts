import { defineStore } from "pinia";
import { ref } from "vue";
import productService from "@/services/product.service";
import type { Product } from "@/types/product";

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

	return {
		products,
		loading,
		error,
		getProducts,
	};
});
