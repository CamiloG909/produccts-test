<script setup lang="ts">
import { computed } from "vue";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface Props {
	variant?: Variant;
	loading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
	variant: "primary",
	loading: false,
	disabled: false,
	type: "button",
});

const classes = computed(() => {
	const base =
		"inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

	const variants = {
		primary: "bg-green-500 text-black hover:bg-green-400",
		secondary: "bg-neutral-800 text-white hover:bg-neutral-700",
		danger: "bg-red-600 text-white hover:bg-red-500",
		ghost: "bg-transparent text-neutral-300 hover:bg-neutral-800",
	};

	return `${base} ${variants[props.variant]}`;
});
</script>
