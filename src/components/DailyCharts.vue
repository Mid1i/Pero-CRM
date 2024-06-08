<script setup lang="ts">
	import type { IOrdersAPI, IUsersAPI, ISeparateData } from "@/types";
	import { revenueChartConfig, usersChartConfig } from "@/plugins/charts";
	import DailyChartsItem from "@/components/DailyChartsItem.vue";


	defineProps<{
		orders: ISeparateData<IOrdersAPI>,
		users: ISeparateData<IUsersAPI>
	}>();
</script>


<template>
	<div class="content__charts">
		<DailyChartsItem
			:previous-week="orders.previousWeek" 
			:current-week="orders.currentWeek"
			:config="revenueChartConfig" 
			title="Дневная статистика по продажам"
			type="orders"
		/>
		<DailyChartsItem
			:previous-week="users.previousWeek" 
			:current-week="users.currentWeek"
			:config="usersChartConfig" 
			title="Дневная статистика по пользователям"
			type="users"
		/>
	</div>
</template>


<style scoped lang="scss">
	.content__charts {
		display: flex;
		gap: 2.6vw;
		justify-content: space-between;
		
		margin-bottom: 2.6vw;
	}
</style>