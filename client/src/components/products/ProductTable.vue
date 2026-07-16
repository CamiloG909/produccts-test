<script setup lang="ts">
import type { Product } from "@/types/product";

interface Props {
	products: Product[];
}

defineProps<Props>();
</script>

<template>
	<table class="w-full mt-8">
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Precio</th>
				<th>Stock</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="product in products" :key="product.id">
				<td>
					{{ product.name }}
				</td>

				<td>
					{{ product.price }}
				</td>

				<td>
					{{ product.stock }}
				</td>
			</tr>
		</tbody>
	</table>
</template>
