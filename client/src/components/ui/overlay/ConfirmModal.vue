<script setup lang="ts">
import BaseModal from "./BaseModal.vue";
import BaseButton from "../form/BaseButton.vue";

interface Props {
	modelValue: boolean;
	title?: string;
	message: string;
	loading?: boolean;
}

withDefaults(defineProps<Props>(), {
	title: "Confirmar acción",
	loading: false,
});

const emit = defineEmits<{
	(event: "update:modelValue", value: boolean): void;
	(event: "confirm"): void;
}>();

function close() {
	emit("update:modelValue", false);
}

function confirm() {
	emit("confirm");
}
</script>

<template>
	<BaseModal
		:title="title"
		:model-value="modelValue"
		@update:model-value="close"
	>
		<div class="space-y-6">
			<p class="text-neutral-300">
				{{ message }}
			</p>

			<div class="flex justify-end gap-3">
				<BaseButton variant="secondary" @click="close"> Cancelar </BaseButton>

				<BaseButton variant="danger" :loading="loading" @click="confirm">
					Eliminar
				</BaseButton>
			</div>
		</div>
	</BaseModal>
</template>
