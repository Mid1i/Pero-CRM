<script setup lang="ts">
	import { ComputedRef, inject } from "vue";
	import type { IOrdersAPI, IProductsAPI } from "@/interfaces";
	import TopProductsCard from "@/components/TopProductsCard.vue";

	import { useFindTopItemsAndUsers } from "@/composables/topItemsAndUsers";
	import { api } from "@/globals";


	const props = defineProps<{
		orders: IOrdersAPI[]
	}>();

	const isLoadingOrders = inject("isLoading") as ComputedRef<boolean>;

	const {topItems, isLoading} = useFindTopItemsAndUsers<IProductsAPI>(props.orders, isLoadingOrders, api.products);
</script>


<template>
	<div class="products">
		<h4 class="products__title">Самые продаваемые товары за неделю</h4>
		<ul v-if="!isLoading" class="products__list">
			<TopProductsCard
				v-for="(product, index) in topItems.slice(0, 8)"
				:index="index + 1"
				:key="index"
				:="product"
			/>
		</ul>
		<ul v-else class="products__list">
			<TopProductsCard
				v-for="index in 8"
				:index="index"
				:key="index"
			/>
		</ul>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/mixins.scss";


	.products {
		@include secondary-layout;

		flex: 1 0 auto;
		position: relative;

		&__title {
			@include subtitle;
			text-align: center;
		}

		&__list {
			column-gap: calc(100% - 38vw);
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;

			max-height: 28vw;
		}
	}
</style>