<script setup lang="ts">
	import { ComputedRef, inject } from "vue";
	import type { IOrdersAPI, ISeparateData, ISizes, IUsersAPI } from "@/interfaces";
	import WidgetsItem from "@/components/WidgetsItem.vue";


	const props = defineProps<{
		users: ISeparateData<IUsersAPI>,
		orders: ISeparateData<IOrdersAPI>
	}>();

	const isLoading = inject("isLoading") as ComputedRef<boolean>;

		
	const onCountTotalProducts = (orders: IOrdersAPI[]): number => {
		const products = orders.reduce((result: ISizes[], item: IOrdersAPI): ISizes[] => [...result, ...item.order], []);
		return products.reduce((result: number, item: ISizes): number => result += item.count, 0);
	}

	const onCountTotalRevenue = (orders: IOrdersAPI[]): number => orders.reduce((value: number, item: IOrdersAPI): number => value += item.price, 0);
</script>


<template>
	<div class="content__widgets">
		<WidgetsItem
			title="Зарегистрировались"
			iconURL="visitors.svg"
			:loading="isLoading"
			:current-amount="props.users.currentWeek.length"
			:previous-amount="props.users.previousWeek.length"
		/>
		<WidgetsItem
			title="Товаров продано"
			iconURL="products.svg"
			:loading="isLoading"
			:current-amount="onCountTotalProducts(props.orders.currentWeek)"
			:previous-amount="onCountTotalProducts(props.orders.previousWeek)"
		/>
		<WidgetsItem
			title="Общая выручка"
			iconURL="revenue.svg"
			:loading="isLoading"		
			:current-amount="onCountTotalRevenue(props.orders.currentWeek)"
			:previous-amount="onCountTotalRevenue(props.orders.previousWeek)"
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