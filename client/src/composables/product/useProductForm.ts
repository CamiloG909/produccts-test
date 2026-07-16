import { reactive } from "vue";

import type { CreateProductDto, Product } from "@/types/product";

export function useProductForm(product?: Product | null) {
	const form = reactive<CreateProductDto>({
		name: product?.name ?? "",
		description: product?.description ?? "",
		price: product?.price ?? 0,
		stock: product?.stock ?? 0,
	});

	function reset() {
		form.name = "";
		form.description = "";
		form.price = 0;
		form.stock = 0;
	}

	return {
		form,
		reset,
	};
}
