<script setup>
	import TheSidebar from "@/components/TheSidebar.vue";
	import TheHeader from "@/components/TheHeader.vue";
</script>


<template>
	<div class="container">
		<TheSidebar/>
		<main class="container__content">
			<TheHeader/>
			<slot></slot>
		</main>
	</div>
</template>


<style scoped lang="scss">
	.container {
		align-items: stretch;
		display: flex;
		min-height: 100%;
		width: 100%;

		&__content {
			display: flex;
			flex: 1 0 auto;
			flex-direction: column;
			padding: 1.04vw 2.08vw 2.08vw;
		}
	}
</style>