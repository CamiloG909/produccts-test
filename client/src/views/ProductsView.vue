<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";

import ProductTable from "@/components/products/ProductTable.vue";

import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner.vue";
import EmptyState from "@/components/ui/feedback/EmptyState.vue";
import ErrorState from "@/components/ui/feedback/ErrorState.vue";

import { useProductStore } from "@/stores/product.store";

const productStore = useProductStore();

const { products, loading, error } = storeToRefs(productStore);

const hasProducts = computed(() => products.value.length > 0);

onMounted(async () => {
	await productStore.getProducts();
});
</script>

<template>
	<main class="min-h-screen bg-neutral-950 text-white">
		<section class="mx-auto max-w-7xl p-8">
			<h1 class="mb-8 text-3xl font-bold">Productos</h1>

			<LoadingSpinner v-if="loading" />

			<ErrorState v-else-if="error" :message="error" />

			<ProductTable v-else-if="hasProducts" :products="products" />

			<EmptyState
				v-else
				title="No hay productos"
				description="Empieza creando el primer producto."
			/>
		</section>
	</main>
</template>
