<script setup>
	import { ref, reactive, onMounted, watch } from "vue";
	import axios from "axios";

	import WidgetsItem from "@/components/UI/WidgetsItem.vue";
	import { getWidgetsData } from "@/api/WidgetsAPI.js";
	import { usersURL, ordersURL } from "@/api";

	const users = reactive({});
	const orders = reactive({});
	const widgets = ref([]);

	onMounted(async () => {
		Object.assign(users, await getWidgetsData(usersURL, 'date_of_registration'));
		Object.assign(orders, await getWidgetsData(ordersURL, 'date_of_creating'));
	});

	const onCountProducts = (array) => {
		const products = array.reduce((result, item) => [...result, ...item.order], []);
		return products.reduce((result, item) => result += item.count, 0);
	}

	watch([users, orders], () => {
		if ([users.status, orders.status].every(item => item === 'success')) {
			widgets.value = [
				{
					id: 1,
					title: 'Зарегистрировались',
					iconURL: 'visitors.svg',
					amount: users.data.length,
					previousAmount: users.previousWeekData.length
				},
				{
					id: 2,
					title: 'Товаров продано',
					iconURL: 'products.svg',
					amount: onCountProducts(orders.data),
					previousAmount: onCountProducts(orders.previousWeekData)
				},
				{
					id: 3,
					title: 'Общая выручка',
					iconURL: 'revenue.svg',
					amount: orders.data.reduce((value, item) => value += item.price, 0),
					previousAmount: orders.previousWeekData.reduce((value, item) => value += item.price, 0),
				}
			]
		}
	})
</script>


<template>
	<div v-if="[users.status, orders.status].every(item => item === 'success')" class="content__widgets">
		<WidgetsItem 
			v-for="widget in widgets"
			:key="widget.id"
			:status="true"
			:="widget"
		/>
	</div>
	<div v-else class="content__widgets">
		<WidgetsItem
			v-for="index in 3"
			:key="index"
			:status="false"
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