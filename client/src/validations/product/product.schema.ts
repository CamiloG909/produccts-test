import { z } from "zod";

export const productSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, "El nombre debe tener al menos 3 caracteres.")
		.max(100, "El nombre no puede superar los 100 caracteres."),

	description: z
		.string()
		.trim()
		.min(5, "La descripción debe tener al menos 5 caracteres.")
		.max(500, "La descripción no puede superar los 500 caracteres."),

	price: z.number().min(1, "El precio debe ser mayor que cero."),

	stock: z.number().min(0, "El stock no puede ser negativo."),
});

export type ProductFormData = z.infer<typeof productSchema>;
