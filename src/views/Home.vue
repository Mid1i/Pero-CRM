<script setup>
	import { reactive, ref, nextTick, watch } from "vue";
	import { revenueChartConfig, usersChartConfig } from "@/plugins/charts.js";
	import DoughnutCharts from "@/components/DoughnutCharts.vue";
	import { useWidgetsFetch } from "@/composables/fetch.js";
	import DailyCharts from "@/components/DailyCharts.vue";
	import { getDateDifference } from "@/helpers/date.js";
	import Widgets from "@/components/Widgets.vue";
	import { api } from "@/globals.js";

	const users = reactive(useWidgetsFetch(api.users, 'date_of_registration'));
	const orders = reactive(useWidgetsFetch(api.orders, 'date_of_creating'));
</script>


<template>
	<Widgets :users="users" :orders="orders"/>
	<DailyCharts :users="users" :orders="orders"/>
	<div class="content__row">
		<DoughnutCharts :users="users" :orders="orders" title="Зарегистрированные пользователи"/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/mixins.scss";

	.content__row {
		display: flex;
		justify-content: space-between;
		gap: 2.6vw;
	}
</style>
