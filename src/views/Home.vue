<script setup>
	import {reactive, computed, provide} from "vue";
	import BestSellingProducts from "@/components/BestSellingProducts.vue";
	import {useTwoWeeksData} from "@/composables/separateTwoWeeksData.js";
	import MostActiveUsers from "@/components/MostActiveUsers.vue";
	import DoughnutCharts from "@/components/DoughnutCharts.vue";
	import DailyCharts from "@/components/DailyCharts.vue";
	import Widgets from "@/components/Widgets.vue";
	import {api} from "@/globals.js";


	const users = reactive(useTwoWeeksData(api.users, "date_of_registration"));
	const orders = reactive(useTwoWeeksData(api.orders, "date_of_creating"));

	const checkStatus = computed(() => users.status === "success" && orders.status === "success");

	provide("statusFunc", checkStatus);
</script>


<template>
	<Widgets :users="users" :orders="orders"/>
	<DailyCharts :users="users" :orders="orders"/>
	<div class="content__row">
		<DoughnutCharts/>
		<BestSellingProducts :orders="orders.currentWeek"/>
		<MostActiveUsers :orders="orders.currentWeek"/>
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
