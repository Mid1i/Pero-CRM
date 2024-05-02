<script setup>
	defineProps({
		data: Array
	});
</script>


<template>
	<div class="products">

	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.products {
		@include secondary-layout;
		flex: 1 0 auto;
	}
</style>