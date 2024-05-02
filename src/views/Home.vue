<script setup>
	import {reactive, computed, provide} from "vue";
	import BestSellingProducts from "@/components/BestSellingProducts.vue";
	import MostActiveUsers from "@/components/MostActiveUsers.vue";
	import DoughnutCharts from "@/components/DoughnutCharts.vue";
	import DailyCharts from "@/components/DailyCharts.vue";
	import {useWeekData} from "@/composables/weekData.js";
	import Widgets from "@/components/Widgets.vue";
	import {api} from "@/globals.js";


	const users = reactive(useWeekData(api.users.url, api.users.dateType));
	const orders = reactive(useWeekData(api.orders.url, api.orders.dateType));

	const checkStatus = computed(() => users.status === 'success' && orders.status === 'success');

	provide("statusFunc", checkStatus);
</script>


<template>
	<Widgets :users="users" :orders="orders"/>
	<DailyCharts :users="users" :orders="orders"/>
	<div class="content__row">
		<DoughnutCharts/>
		<BestSellingProducts :data="orders.data"/>
		<MostActiveUsers :orders="orders"/>
	</div> 
</template>


<style scoped lang="scss">
	.content__row {
		align-items: stretch;
		display: flex;
		justify-content: space-between;
		gap: 2.6vw;
	}
</style>
