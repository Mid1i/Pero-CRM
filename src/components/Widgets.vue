<script setup>
	import {computed, ref, inject} from "vue";
	import WidgetsItem from "@/components/WidgetsItem.vue";


	const props = defineProps({
		users: Object,
		orders: Object
	});

	const widgets = ref([]);

	const checkStatus = inject("statusFunc");

	const onCountProducts = (array) => {
		const products = array.reduce((result, item) => [...result, ...item.order], []);
		return products.reduce((result, item) => result += item.count, 0);
	}

	const onCountRevenue = (array) => array.reduce((value, item) => value += item.price, 0);
</script>


<template>
	<div class="content__widgets">
		<WidgetsItem
			title="Зарегистрировались"
			iconURL="visitors.svg"
			:currentAmount="props.users.currentWeek.length"
			:previousAmount="props.users.previousWeek.length"
		/>
		<WidgetsItem
			title="Товаров продано"
			iconURL="products.svg"
			:currentAmount="onCountProducts(props.orders.currentWeek)"
			:previousAmount="onCountProducts(props.orders.previousWeek)"
		/>
		<WidgetsItem
			title="Общая выручка"
			iconURL="revenue.svg"
			:currentAmount="onCountRevenue(props.orders.currentWeek)"
			:previousAmount="onCountRevenue(props.orders.previousWeek)"
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