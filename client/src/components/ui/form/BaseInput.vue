<script setup lang="ts">
interface Props {
	label?: string;
	modelValue: string | number;
	type?: "text" | "number" | "email" | "password";
	placeholder?: string;
	error?: string;
	disabled?: boolean;
	required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	type: "text",
	placeholder: "",
	error: "",
	disabled: false,
	required: false,
});

const emit = defineEmits<{
	(event: "update:modelValue", value: string | number): void;
}>();

function onInput(event: Event) {
	const target = event.target as HTMLInputElement;

	if (props.type === "number") {
		emit("update:modelValue", target.value === "" ? 0 : Number(target.value));

		return;
	}

	emit("update:modelValue", target.value);
}
</script>

<template>
	<div class="space-y-1">
		<label v-if="label" class="block text-sm font-medium text-neutral-200">
			{{ label }}

			<span v-if="required" class="ml-1 text-red-500"> * </span>
		</label>

		<input
			:value="modelValue"
			:type="type"
			:placeholder="placeholder"
			:disabled="disabled"
			:class="[
				'w-full rounded-lg border bg-neutral-900 px-4 py-2 text-white outline-none transition-all duration-200',
				error
					? 'border-red-500 focus:border-red-500'
					: 'border-neutral-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30',
			]"
			@input="onInput"
		/>

		<p v-if="error" class="text-sm text-red-500">
			{{ error }}
		</p>
	</div>
</template>
