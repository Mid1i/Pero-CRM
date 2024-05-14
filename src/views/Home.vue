<script setup lang="ts">
	import {reactive, computed, provide} from "vue";
	import type {OrderAPIType} from "@/types/index";
	import {useSeparateData} from "@/composables/separateWeeksData";
	import DoughnutCharts from "@/components/DoughnutCharts.vue";
	import TopProducts from "@/components/TopProducts.vue";
	import ActiveUsers from "@/components/ActiveUsers.vue";
	import DailyCharts from "@/components/DailyCharts.vue";
	import Widgets from "@/components/Widgets.vue";
	import {api} from "../globals";


	const users = reactive(useSeparateData(api.users, "date_of_registration"));
	const orders = reactive(useSeparateData(api.orders, "date_of_creating"));

	const isLoading = computed((): boolean => users.loading || orders.loading);
	
	provide("isLoading", isLoading);
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
