<script setup>
	import WidgetsItem from "@/components/WidgetsItem.vue";
	import { ref, watch } from "vue";

	const props = defineProps({
		users: Object,
		orders: Object
	});

	const widgets = ref([]);

	const onCountProducts = (array) => {
		const products = array.reduce((result, item) => [...result, ...item.order], []);
		return products.reduce((result, item) => result += item.count, 0);
	}
	
	watch([props.users, props.orders], () => {
		if (props.users.status === 'success' && props.orders.status === 'success') {
			widgets.value = [
				{
					id: 1,
					title: 'Зарегистрировались',
					iconURL: 'visitors.svg',
					amount: props.users.data.length,
					previousAmount: props.users.previousWeekData.length
				},
				{
					id: 2,
					title: 'Товаров продано',
					iconURL: 'products.svg',
					amount: onCountProducts(props.orders.data),
					previousAmount: onCountProducts(props.orders.previousWeekData)
				},
				{
					id: 3,
					title: 'Общая выручка',
					iconURL: 'revenue.svg',
					amount: props.orders.data.reduce((value, item) => value += item.price, 0),
					previousAmount: props.orders.previousWeekData.reduce((value, item) => value += item.price, 0),
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