<script setup lang="ts">
	import {type ComputedRef, inject} from "vue";
	import type {OrderAPIType, OrderArrayType, SeparateData} from "@/types/index";
	import WidgetsItem from "@/components/WidgetsItem.vue";


	const props = defineProps<{
		users: SeparateData,
		orders: SeparateData
	}>();

	const isLoading = inject("isLoading") as ComputedRef<boolean>;

	const onCountProducts = (array: OrderAPIType[]): number => {
		const products = array.reduce((result: OrderArrayType[], item: OrderAPIType): OrderArrayType[] => [...result, ...item.order], []);
		return products.reduce((result: number, item: OrderArrayType): number => result += item.count, 0);
	}

	const onCountRevenue = (array: OrderAPIType[]): number => array.reduce((value: number, item: OrderAPIType): number => value += item.price, 0);
</script>


<template>
	<div class="content__widgets">
		<WidgetsItem
			title="Зарегистрировались"
			iconURL="visitors.svg"
			:loading="isLoading"
			:currentAmount="props.users.currentWeek.length"
			:previousAmount="props.users.previousWeek.length"
		/>
		<WidgetsItem
			title="Товаров продано"
			iconURL="products.svg"
			:loading="isLoading"
			:currentAmount="onCountProducts(props.orders.currentWeek as OrderAPIType[])"
			:previousAmount="onCountProducts(props.orders.previousWeek as OrderAPIType[])"
		/>
		<WidgetsItem
			title="Общая выручка"
			iconURL="revenue.svg"
			:loading="isLoading"		
			:currentAmount="onCountRevenue(props.orders.currentWeek as OrderAPIType[])"
			:previousAmount="onCountRevenue(props.orders.previousWeek as OrderAPIType[])"
		/>
	</div>
</template>


<style scoped lang="scss">
	.content__widgets {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2.6vw;
		
		margin-bottom: 2.6vw;
	}
</style>