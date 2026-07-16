<script setup lang="ts">
const menu = [
	{
		name: "Productos",
		path: "/",
	},
	{
		name: "Usuarios",
		path: "/",
	},
	{
		name: "Ajustes",
		path: "/",
	},
];
</script>

<template>
	<aside class="fixed left-0 top-0 h-screen w-64 bg-neutral-900 text-white p-6">
		<h2 class="text-xl font-bold mb-8">Admin Panel</h2>

		<nav class="space-y-2">
			<RouterLink
				v-for="item in menu"
				:key="item.path"
				:to="item.path"
				class="block rounded-lg px-4 py-3 hover:bg-neutral-800"
				active-class="bg-neutral-700"
			>
				{{ item.name }}
			</RouterLink>
		</nav>
	</aside>
</template>
