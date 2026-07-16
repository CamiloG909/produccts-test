<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { toast } from "vue-sonner";

import ProductModal from "@/components/products/ProductModal.vue";
import ProductTable from "@/components/products/ProductTable.vue";
import BaseButton from "@/components/ui/form/BaseButton.vue";
import ConfirmModal from "@/components/ui/overlay/ConfirmModal.vue";

import EmptyState from "@/components/ui/feedback/EmptyState.vue";
import ErrorState from "@/components/ui/feedback/ErrorState.vue";
import LoadingSpinner from "@/components/ui/feedback/LoadingSpinner.vue";

import { useProductStore } from "@/stores/product.store";

import ProductHistoryModal from "@/components/products/ProductHistoryModal.vue";
import type { CreateProductDto } from "@/types/product";
import type { ProductWithHistory } from "@/types/responses";

const productStore = useProductStore();

const { products, loading, error } = storeToRefs(productStore);

const hasProducts = computed(() => products.value.length > 0);

const showProductModal = ref(false);
const showDeleteModal = ref(false);
const showHistoryModal = ref(false);

const selectedProduct = ref<ProductWithHistory | null>(null);

onMounted(async () => {
	await productStore.getProducts();
});

function openCreateModal() {
	selectedProduct.value = null;
	showProductModal.value = true;
}

function openEditModal(product: ProductWithHistory) {
	selectedProduct.value = product;
	showProductModal.value = true;
}

async function saveProduct(dto: CreateProductDto) {
	try {
		if (selectedProduct.value) {
			await productStore.updateProduct(selectedProduct.value.id, dto);

			toast.success("Producto actualizado correctamente.");
		} else {
			await productStore.createProduct(dto);

			toast.success("Producto creado correctamente.");
		}

		showProductModal.value = false;
		selectedProduct.value = null;
	} catch {
		toast.error("No fue posible guardar el producto.");
	}
}

function openDeleteModal(product: ProductWithHistory) {
	selectedProduct.value = product;
	showDeleteModal.value = true;
}

async function confirmDelete() {
	if (!selectedProduct.value) {
		return;
	}

	try {
		await productStore.deleteProduct(selectedProduct.value.id);

		toast.success("Producto eliminado correctamente.");

		showDeleteModal.value = false;
		selectedProduct.value = null;
	} catch {
		toast.error("No fue posible eliminar el producto.");
	}
}

async function handleStatusChange(product: ProductWithHistory) {
	try {
		await productStore.changeStatusProduct(product.id);
		toast.success("Estado del producto actualizado correctamente.");
	} catch {
		toast.error("No fue posible actualizar el estado del producto.");
	}
}

function openHistoryModal(product: ProductWithHistory) {
	selectedProduct.value = product;
	showHistoryModal.value = true;
}
</script>

<template>
	<main class="min-h-screen bg-neutral-950 text-white">
		<section class="mx-auto max-w-7xl p-8">
			<div class="mb-8 flex items-center justify-between">
				<h1 class="text-3xl font-bold">Productos</h1>

				<BaseButton @click="openCreateModal"> Nuevo producto </BaseButton>
			</div>

			<LoadingSpinner v-if="loading" />

			<ErrorState v-else-if="error" :message="error" />

			<ProductTable
				v-else-if="hasProducts"
				:products="products"
				@edit="openEditModal"
				@delete="openDeleteModal"
				@status-change="handleStatusChange"
				@history="openHistoryModal"
			/>

			<EmptyState
				v-else
				title="No hay productos"
				description="Empieza creando el primer producto."
			/>

			<ProductModal
				v-model="showProductModal"
				:product="selectedProduct"
				@submit="saveProduct"
			/>

			<ConfirmModal
				v-model="showDeleteModal"
				title="Eliminar producto"
				:message="`¿Deseas eliminar '${selectedProduct?.name}'?`"
				@confirm="confirmDelete"
			/>

			<ProductHistoryModal
				v-model="showHistoryModal"
				:product="selectedProduct"
			/>
		</section>
	</main>
</template>
