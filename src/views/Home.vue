<script setup>
	import { reactive } from "vue";
	import { revenueChartConfig, usersChartConfig } from "@/plugins/charts.js";
	import { useWidgetsFetch } from "@/composables/fetch.js";
	import DailyCharts from "@/components/DailyCharts.vue";
	import { getDateDifference } from "@/helpers/date.js";
	import Widgets from "@/components/Widgets.vue";
	import { api } from "../globals.js";

	const users = reactive(useWidgetsFetch(api.users, 'date_of_registration'));
	const orders = reactive(useWidgetsFetch(api.orders, 'date_of_creating'));
</script>


<template>
	<Widgets :users="users" :orders="orders"/>
	<DailyCharts :users="users" :orders="orders"/>
</template>


<style scoped lang="scss">
</style>
