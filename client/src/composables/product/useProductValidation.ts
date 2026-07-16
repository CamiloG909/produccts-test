import { reactive } from "vue";

import { productSchema } from "@/validations/product/product.schema";

import type { CreateProductDto } from "@/types/product";

interface ProductErrors {
	name: string;
	description: string;
	price: string;
	stock: string;
}

export function useProductValidation() {
	const errors = reactive<ProductErrors>({
		name: "",
		description: "",
		price: "",
		stock: "",
	});

	function clearErrors() {
		errors.name = "";
		errors.description = "";
		errors.price = "";
		errors.stock = "";
	}

	function validate(form: CreateProductDto): boolean {
		clearErrors();

		const result = productSchema.safeParse(form);

		if (result.success) {
			return true;
		}

		for (const issue of result.error.issues) {
			const field = issue.path[0] as keyof ProductErrors;
			errors[field] = issue.message;
		}

		return false;
	}

	return {
		errors,
		validate,
		clearErrors,
	};
}
