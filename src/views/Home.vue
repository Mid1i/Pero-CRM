<script setup lang="ts">
	import {reactive, computed, provide} from "vue";
	import type {OrderAPIType} from "@/types/index";
	import {useTwoWeeksData} from "@/composables/separateTwoWeeksData";
	import DoughnutCharts from "@/components/DoughnutCharts.vue";
	import TopProducts from "@/components/TopProducts.vue";
	import ActiveUsers from "@/components/ActiveUsers.vue";
	import DailyCharts from "@/components/DailyCharts.vue";
	import Widgets from "@/components/Widgets.vue";
	import {api} from "../globals";


	const users = reactive(useTwoWeeksData(api.users, "date_of_registration"));
	const orders = reactive(useTwoWeeksData(api.orders, "date_of_creating"));

	const checkStatus = computed((): boolean => !users.loadingWeekData && !orders.loadingWeekData);
	
	provide("statusFunc", checkStatus);
</script>


<template>
	<Widgets :users="users" :orders="orders"/>
	<DailyCharts :users="users" :orders="orders"/>
	<div class="content__row">
		<DoughnutCharts/>
		<TopProducts :orders="orders.currentWeek as OrderAPIType[]"/>
		<ActiveUsers :orders="orders.currentWeek as OrderAPIType[]"/>
	</div>
</template>


<style scoped lang="scss">
	.content__row {
		align-items: stretch;
		display: flex;
		gap: 2.6vw;
	}
</style>
