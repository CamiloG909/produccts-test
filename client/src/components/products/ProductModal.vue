<script setup lang="ts">
import BaseModal from "@/components/ui/overlay/BaseModal.vue";
import ProductForm from "./ProductForm.vue";

import type { CreateProductDto } from "@/types/product";

interface Props {
	modelValue: boolean;
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
		title="Nuevo producto"
		:model-value="modelValue"
		@update:model-value="$emit('update:modelValue', $event)"
	>
		<ProductForm @submit="handleSubmit" />
	</BaseModal>
</template>
