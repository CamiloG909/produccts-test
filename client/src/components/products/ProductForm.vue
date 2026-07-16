<script setup lang="ts">
import { watch } from "vue";

import BaseButton from "@/components/ui/form/BaseButton.vue";
import BaseInput from "@/components/ui/form/BaseInput.vue";

import { useProductForm } from "@/composables/product/useProductForm";
import { useProductValidation } from "@/composables/product/useProductValidation";

import type { CreateProductDto, Product } from "@/types/product";

interface Props {
	product?: Product | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	(event: "submit", product: CreateProductDto): void;
}>();

const { form } = useProductForm(props.product);

const { errors, validate, clearErrors } = useProductValidation();

watch(
	() => props.product,
	(product) => {
		form.name = product?.name ?? "";
		form.description = product?.description ?? "";
		form.price = product?.price ?? 0;
		form.stock = product?.stock ?? 0;

		clearErrors();
	},
	{
		immediate: true,
	},
);

function submit() {
	if (!validate(form)) {
		return;
	}

	emit("submit", { ...form });
}
</script>

<template>
	<form class="space-y-5" @submit.prevent="submit">
		<BaseInput
			label="Nombre"
			v-model="form.name"
			:error="errors.name"
			required
		/>

		<BaseInput
			label="Descripción"
			v-model="form.description"
			:error="errors.description"
			required
		/>

		<BaseInput
			label="Precio"
			type="number"
			v-model="form.price"
			:error="errors.price"
			required
		/>

		<BaseInput
			label="Stock"
			type="number"
			v-model="form.stock"
			:error="errors.stock"
			required
		/>

		<div class="flex justify-end">
			<BaseButton type="submit">
				{{ product ? "Actualizar producto" : "Guardar producto" }}
			</BaseButton>
		</div>
	</form>
</template>
