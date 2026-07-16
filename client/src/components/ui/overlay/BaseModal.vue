<script setup lang="ts">
interface Props {
	modelValue: boolean;
	title: string;
}

defineProps<Props>();

const emit = defineEmits<{
	(event: "update:modelValue", value: boolean): void;
}>();

function close() {
	emit("update:modelValue", false);
}
</script>

<template>
	<div
		v-if="modelValue"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
	>
		<div class="w-full max-w-xl rounded-xl bg-neutral-900 shadow-2xl">
			<header
				class="flex items-center justify-between border-b border-neutral-800 p-5"
			>
				<h2 class="text-xl font-semibold">
					{{ title }}
				</h2>

				<button
					@click="close"
					class="text-neutral-400 transition hover:text-white"
				>
					✕
				</button>
			</header>

			<section class="p-6">
				<slot />
			</section>
		</div>
	</div>
</template>
