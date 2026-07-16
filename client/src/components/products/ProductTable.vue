<script setup lang="ts">
import BaseButton from "@/components/ui/form/BaseButton.vue";
import type { Product } from "@/types/product";

interface Props {
	products: Product[];
}

defineProps<Props>();

const emit = defineEmits<{
	(event: "edit", product: Product): void;
	(event: "delete", product: Product): void;
}>();
</script>

<template>
	<div class="overflow-hidden rounded-xl border border-neutral-800">
		<table class="w-full">
			<thead class="bg-neutral-900">
				<tr>
					<th class="px-5 py-4 text-left">Nombre</th>
					<th class="px-5 py-4 text-left">Precio</th>
					<th class="px-5 py-4 text-left">Stock</th>
					<th class="px-5 py-4 text-right">Acciones</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="product in products"
					:key="product.id"
					class="border-t border-neutral-800"
				>
					<td class="px-5 py-4">{{ product.name }}</td>
					<td class="px-5 py-4">$ {{ product.price }}</td>
					<td class="px-5 py-4">{{ product.stock }}</td>
					<td class="flex justify-end gap-3 px-5 py-4">
						<BaseButton variant="secondary" @click="emit('edit', product)">
							Editar
						</BaseButton>
						<BaseButton variant="danger" @click="emit('delete', product)">
							Eliminar
						</BaseButton>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
