<script setup lang="ts">
interface Props {
	message?: string;
}

withDefaults(defineProps<Props>(), {
	message: "Cargando...",
});
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-4 py-16">
		<div
			class="h-10 w-10 animate-spin rounded-full border-4 border-neutral-700 border-t-purple-500"
		/>

		<p class="text-sm text-neutral-400">
			{{ message }}
		</p>
	</div>
</template>
