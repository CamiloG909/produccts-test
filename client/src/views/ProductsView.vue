<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import BaseButton from "@/components/ui/form/BaseButton.vue";
import ProductModal from "@/components/products/ProductModal.vue";
import ProductTable from "@/components/products/ProductTable.vue";
import EmptyState from "@/components/ui/feedback/EmptyState.vue";
import ErrorState from "@/components/ui/feedback/ErrorState.vue";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner.vue";
import { useProductStore } from "@/stores/product.store";

import type { Product } from "@/types/product";
import type { CreateProductDto } from "@/types/product";

const productStore = useProductStore();
const { products, loading, error } = storeToRefs(productStore);
const hasProducts = computed(() => products.value.length > 0);

onMounted(async () => {
	await productStore.getProducts();
});

const showProductModal = ref(false);
const selectedProduct = ref<Product | null>(null);

function openCreateModal() {
	selectedProduct.value = null;
	showProductModal.value = true;
}

function openEditModal(product: Product) {
	selectedProduct.value = product;
	showProductModal.value = true;
}

async function createProduct(dto: CreateProductDto) {
	await productStore.createProduct(dto);

	showProductModal.value = false;
}

function editProduct(product: Product) {
	console.log(product);
}

function deleteProduct(product: Product) {
	console.log(product);
}
</script>

<template>
	<main class="min-h-screen bg-neutral-950 text-white">
		<section class="mx-auto max-w-7xl p-8">
			<div class="mb-8 flex items-center justify-between">
				<h1 class="text-3xl font-bold">Productos</h1>
				<BaseButton @click="openCreateModal">Nuevo producto</BaseButton>
			</div>
			<LoadingSpinner v-if="loading" />
			<ErrorState v-else-if="error" :message="error" />
			<ProductTable
				v-else-if="hasProducts"
				:products="products"
				@edit="openEditModal"
				@delete="deleteProduct"
			/>
			<EmptyState
				v-else
				title="No hay productos"
				description="Empieza creando el primer producto."
			/>
			<ProductModal
				v-model="showProductModal"
				:product="selectedProduct"
				@submit="createProduct"
			/>
		</section>
	</main>
</template>
