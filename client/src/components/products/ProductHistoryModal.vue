<script setup lang="ts">
import BaseModal from "@/components/ui/overlay/BaseModal.vue";

import type { ProductWithHistory } from "@/types/responses.ts";
import ProductHistoryCard from "./ProductHistoryCard.vue";
import { computed } from "vue";
import EmptyState from "../ui/feedback/EmptyState.vue";

interface Props {
	modelValue: boolean;
	product?: ProductWithHistory | null;
}

const { product } = defineProps<Props>();

const emit = defineEmits<{
	(event: "update:modelValue", value: boolean): void;
}>();

function close() {
	emit("update:modelValue", false);
}

const hasRecords = computed(() =>
	product ? product.history.length > 0 : false,
);
</script>

<template>
	<BaseModal
		title="Historial"
		:model-value="modelValue"
		@update:model-value="close"
	>
		<div class="space-y-3" v-if="hasRecords && product">
			<ProductHistoryCard
				v-for="item in product.history"
				:key="item.id"
				:history="item"
			/>
		</div>

		<EmptyState
			v-else
			title="No hay movimientos"
			description="Este producto no tiene historial de movimientos."
		/>
	</BaseModal>
</template>
