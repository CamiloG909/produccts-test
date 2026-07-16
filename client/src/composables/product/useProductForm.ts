import { reactive } from "vue";
import type { CreateProductDto } from "@/types/product";

export function useProductForm() {
	const form = reactive<CreateProductDto>({
		name: "",
		description: "",
		price: 0,
		stock: 0,
	});
	function reset() {
		form.name = "";
		form.description = "";
		form.price = 0;
		form.stock = 0;
	}
	return { form, reset };
}
