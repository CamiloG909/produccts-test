<script setup lang="ts">
import type { ProductHistory } from "@/types/product";

interface Props {
	history: ProductHistory;
}

defineProps<Props>();

function getActionStyle(action: string) {
	switch (action) {
		case "CREATE":
			return "bg-green-500/20 text-green-400";

		case "UPDATE":
			return "bg-blue-500/20 text-blue-400";

		case "STATUS_CHANGE":
			return "bg-yellow-500/20 text-yellow-400";

		default:
			return "bg-neutral-500/20 text-neutral-400";
	}
}

function formatDate(date: string) {
	return new Intl.DateTimeFormat("es-CO", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(date));
}
</script>

<template>
	<div
		class="rounded-xl border border-neutral-800 bg-neutral-900 p-4 transition hover:border-neutral-700"
	>
		<div class="flex items-start justify-between gap-4">
			<div>
				<p class="text-sm text-neutral-400">
					{{ formatDate(history.created_at) }}
				</p>

				<p class="mt-2 text-white">
					{{ history.description }}
				</p>
			</div>

			<span
				class="rounded-full px-3 py-1 text-xs font-medium"
				:class="getActionStyle(history.action)"
			>
				{{ history.action }}
			</span>
		</div>
	</div>
</template>
