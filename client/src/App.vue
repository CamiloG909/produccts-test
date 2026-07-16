<script setup lang="ts">
import { Toaster } from "vue-sonner";

import "vue-sonner/style.css";
</script>

<template>
	<RouterView />

	<Toaster position="bottom-center" theme="dark" :rich-colors="true" close-button />
</template>
