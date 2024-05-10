<script setup>
import {ref, reactive, inject, watch, computed} from "vue";
	const props = defineProps({
		orders: Array
	});
</script>


<template>
	<div class="products">
		<h4 class="products__title">Самые продаваемые товары за неделю</h4>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.products {
		@include secondary-layout;
		flex: 1 0 auto;

		&__title {
			@include subtitle;
			text-align: center;
		}
	}
</style>