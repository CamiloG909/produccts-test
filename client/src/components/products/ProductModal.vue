<script setup lang="ts">
import BaseModal from "@/components/ui/overlay/BaseModal.vue";
import ProductForm from "./ProductForm.vue";

import type {
	Product,
	CreateProductDto,
} from "@/types/product";

interface Props {
	modelValue: boolean;
	product?: Product | null;
}

defineProps<Props>();

const emit = defineEmits<{
	(event: "update:modelValue", value: boolean): void;
	(event: "submit", dto: CreateProductDto): void;
}>();

function handleSubmit(dto: CreateProductDto) {
	emit("submit", dto);
	emit("update:modelValue", false);
}
</script>

<template>
	<BaseModal
		title="Producto"
		:model-value="modelValue"
		@update:model-value="(value) => emit('update:modelValue', value)"
	>
		<ProductForm
			:product="product"
			@submit="handleSubmit"
		/>
	</BaseModal>
</template>
