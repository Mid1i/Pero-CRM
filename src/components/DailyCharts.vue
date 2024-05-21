<script setup lang="ts">
	import type { OrderAPIType, SeparateData, UserAPIType } from "@/types/index";
	import { revenueChartConfig, usersChartConfig } from "@/plugins/charts";
	import DailyChartsItem from "@/components/DailyChartsItem.vue";


	defineProps<{
		orders: SeparateData,
		users: SeparateData
	}>();
</script>


<template>
	<div class="content__charts">
		<DailyChartsItem
			:previous-week="orders.previousWeek as OrderAPIType[]" 
			:current-week="orders.currentWeek as OrderAPIType[]"
			:config="revenueChartConfig" 
			title="Дневная статистика по продажам"
			type="orders"
		/>
		<DailyChartsItem
			:previous-week="users.previousWeek as UserAPIType[]" 
			:current-week="users.currentWeek as UserAPIType[]"
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