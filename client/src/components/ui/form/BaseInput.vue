<script setup lang="ts">
interface Props {
	modelValue: string | number;
	label?: string;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
	label: "",
	placeholder: "",
	type: "text",
	disabled: false,
});

const emit = defineEmits<{
	(event: "update:modelValue", value: string | number): void;
}>();

function handleInput(event: Event) {
	const target = event.target as HTMLInputElement;
	emit("update:modelValue", target.value);
}
</script>

<template>
	<div class="flex flex-col gap-2">
		<label v-if="label" class="text-sm font-medium text-neutral-300">
			{{ label }}
		</label>
		<input
			:value="modelValue"
			:type="type"
			:placeholder="placeholder"
			:disabled="disabled"
			class="rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 outline-none transition focus:border-green-500"
			@input="handleInput"
		/>
	</div>
</template>
