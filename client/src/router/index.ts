import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "@/layouts/MainLayout.vue";
import ProductsView from "@/views/ProductsView.vue";

const router = createRouter({
	history: createWebHistory(),

	routes: [
		{
			path: "/",
			component: MainLayout,
			children: [
				{
					path: "",
					name: "products",
					component: ProductsView,
				},
			],
		},
	],
});

export default router;
