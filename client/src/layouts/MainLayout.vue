<script setup lang="ts">
import Sidebar from "@/components/layout/Sidebar.vue";
import Navbar from "@/components/layout/Navbar.vue";
</script>

<template>
	<div class="min-h-screen bg-neutral-950">
		<Sidebar />

		<div class="ml-64">
			<Navbar />

			<main class="pt-16 p-8">
				<RouterView />
			</main>
		</div>
	</div>
</template>
