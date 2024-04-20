<script setup>
	import { RouterView } from 'vue-router';
	import TheSidebar from '@/components/general/TheSidebar.vue';
</script>


<template>
	<TheSidebar/>
	<RouterView/>
</template>


<style lang="scss">
	@import "@/assets/styles/base.scss";
	@import "@/assets/styles/variables.scss";

	.image {
		pointer-events: none;
		height: 100%;
		width: 100%;
	}
</style>
