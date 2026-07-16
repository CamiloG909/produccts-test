<script setup lang="ts">
import BaseButton from "@/components/ui/form/BaseButton.vue";
import BaseInput from "@/components/ui/form/BaseInput.vue";
import { useProductForm } from "@/composables/product/useProductForm";
import type { CreateProductDto } from "@/types/product";
const emit = defineEmits<{
	(event: "submit", product: CreateProductDto): void;
}>();
const { form, reset } = useProductForm();
function submit() {
	emit("submit", { ...form });
	reset();
}
</script>

<template>
	<form class="space-y-5" @submit.prevent="submit">
		<BaseInput label="Nombre" v-model="form.name" />
		<BaseInput label="Descripción" v-model="form.description" />
		<BaseInput label="Precio" type="number" v-model.number="form.price" />
		<BaseInput label="Stock" type="number" v-model.number="form.stock" />
		<div class="flex justify-end">
			<BaseButton type="submit"> Guardar producto </BaseButton>
		</div>
	</form>
</template>
