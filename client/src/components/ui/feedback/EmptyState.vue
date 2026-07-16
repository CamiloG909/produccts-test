<script setup lang="ts">
interface Props {
	title?: string;
	description?: string;
}

withDefaults(defineProps<Props>(), {
	title: "No hay información",
	description: "No existen registros para mostrar.",
});
</script>

<template>
	<div class="py-20 text-center">
		<h2 class="text-xl font-semibold">
			{{ title }}
		</h2>

		<p class="mt-2 text-neutral-400">
			{{ description }}
		</p>
	</div>
</template>
