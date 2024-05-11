<script setup>
	import {RouterView} from "vue-router";
	import Container from "@/layouts/Container.vue";
</script>


<template>
	<Container>
		<RouterView/>
	</Container>
</template>


<style lang="scss">
	.image {
		pointer-events: none;
		
		height: 100%;
		width: 100%;
	}
</style>
