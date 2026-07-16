import type { ProductWithHistory } from "@/types/responses";

export const mockProducts: ProductWithHistory[] = [
	{
		id: 1,
		name: "MacBook Pro 16",
		description: "Apple M4 Pro",
		price: 12500000,
		stock: 6,
		status: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		history: [
			{
				id: 1,
				product_id: 1,
				action: "CREATE",
				description: "Producto creado",
				created_at: new Date().toISOString(),
			},
		],
	},
	{
		id: 2,
		name: "Monitor LG UltraGear",
		description: "27 pulgadas IPS",
		price: 1650000,
		stock: 12,
		status: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		history: [
			{
				id: 1,
				product_id: 2,
				action: "CREATE",
				description: "Producto creado",
				created_at: new Date().toISOString(),
			},
		],
	},
	{
		id: 3,
		name: "Logitech MX Master 3S",
		description: "Mouse inalámbrico",
		price: 480000,
		stock: 18,
		status: true,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString(),
		history: [
			{
				id: 1,
				product_id: 3,
				action: "CREATE",
				description: "Producto creado",
				created_at: new Date().toISOString(),
			},
		],
	},
];
