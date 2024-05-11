<script setup>
	import {reactive, computed, provide} from "vue";
	import {useTwoWeeksData} from "@/composables/separateTwoWeeksData";
	import DoughnutCharts from "@/components/DoughnutCharts.vue";
	import TopProducts from "@/components/TopProducts.vue";
	import ActiveUsers from "@/components/ActiveUsers.vue";
	import DailyCharts from "@/components/DailyCharts.vue";
	import Widgets from "@/components/Widgets.vue";
	import {api} from "@/globals";


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
		<TopProducts :orders="orders.currentWeek"/>
		<ActiveUsers :orders="orders.currentWeek"/>
	</div>
</template>


<style scoped lang="scss">
	.content__row {
		align-items: stretch;
		display: flex;
		gap: 2.6vw;
	}
</style>
