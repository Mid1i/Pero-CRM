<script setup>
	import { RouterView } from 'vue-router';
	import TheSidebar from '@/components/general/TheSidebar.vue';
	import TheHeader from '@/components/general/TheHeader.vue';
</script>


<template>
	<TheSidebar/>
	<div class="content">
		<TheHeader/>
		<RouterView/>
	</div>
</template>


<style lang="scss">
	@import "@/assets/styles/base.scss";
	@import "@/assets/styles/variables.scss";

	#app {
		align-items: stretch;	
		display: flex;
	}

	.content {
		display: flex;
		flex: 1 0 auto;
		flex-direction: column;
		padding: 20px 40px 40px;
	}

	.image {
		pointer-events: none;
		height: 100%;
		width: 100%;
	}
</style>
