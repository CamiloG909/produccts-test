<script setup lang="ts">
interface Props {
	message: string;
}

defineProps<Props>();
</script>

<template>
	<div class="rounded-lg border border-red-800 bg-red-950 p-4">
		<p class="text-red-300">
			{{ message }}
		</p>
	</div>
</template>
