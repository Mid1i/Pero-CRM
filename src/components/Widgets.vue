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
		if (props.users.currentWeek && props.orders.currentWeek) {
			widgets.value = [
				{
					id: 1,
					title: 'Зарегистрировались',
					iconURL: 'visitors.svg',
					currentAmount: props.users.currentWeek.length,
					prevAmount: props.users.prevWeek.length
				},
				{
					id: 2,
					title: 'Товаров продано',
					iconURL: 'products.svg',
					currentAmount: onCountProducts(props.orders.currentWeek),
					prevAmount: onCountProducts(props.orders.prevWeek)
				},
				{
					id: 3,
					title: 'Общая выручка',
					iconURL: 'revenue.svg',
					currentAmount: props.orders.currentWeek.reduce((value, item) => value += item.price, 0),
					prevAmount: props.orders.prevWeek.reduce((value, item) => value += item.price, 0),
				}
			]
		}
	})
</script>


<template>
	<div v-if="users.currentWeek && orders.currentWeek" class="content__widgets">
		<WidgetsItem 
			v-for="widget in widgets"
			:key="widget.id"
			:="widget"
		/>
	</div>
	<div v-else class="content__widgets">
		<WidgetsItem
			v-for="index in 3"
			:key="index"
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