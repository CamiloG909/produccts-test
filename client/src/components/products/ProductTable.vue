<script setup lang="ts">
import BaseButton from "@/components/ui/form/BaseButton.vue";
import type { ProductWithHistory } from "@/types/responses";
import { formatCurrency } from "@/utils/formatCurrency";

interface Props {
	products: ProductWithHistory[];
}

defineProps<Props>();

const emit = defineEmits<{
	(event: "edit", product: ProductWithHistory): void;
	(event: "status-change", product: ProductWithHistory): void;
	(event: "delete", product: ProductWithHistory): void;
	(event: "history", product: ProductWithHistory): void;
}>();
</script>

<template>
	<div class="overflow-hidden rounded-xl border border-neutral-800">
		<table class="w-full">
			<thead class="bg-neutral-900">
				<tr>
					<th class="px-5 py-4 text-left">Nombre</th>
					<th class="px-5 py-4 text-left">Precio</th>
					<th class="px-5 py-4 text-left">Existencias</th>
					<th class="px-5 py-4 text-right">...</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="product in products"
					:key="product.id"
					class="border-t border-neutral-800"
				>
					<td class="px-5 py-4 flex gap-2">
						<p>{{ product.name }}</p>
						<p
							@click="emit('status-change', product)"
							:class="[
								'cursor-pointer rounded-full px-3 py-1 text-sm font-medium w-fit',
								product.status
									? 'bg-green-500/20 text-green-400'
									: 'bg-red-500/20 text-red-400',
							]"
						>
							{{ product.status ? "Activo" : "Inactivo" }}
						</p>
					</td>
					<td class="px-5 py-4">{{ formatCurrency(product.price) }}</td>
					<td class="px-5 py-4">{{ product.stock }}</td>
					<td class="flex justify-end gap-3 px-5 py-4">
						<BaseButton variant="primary" @click="emit('history', product)">
							Historial
						</BaseButton>
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
