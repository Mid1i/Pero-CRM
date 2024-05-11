<script setup>
	import {revenueChartConfig, usersChartConfig} from "@/plugins/charts";
	import DailyChartsItem from "@/components/DailyChartsItem.vue";


	const props = defineProps({
		orders: Object,
		users: Object
	});
</script>


<template>
	<div class="content__charts">
		<DailyChartsItem 
			:="orders" 
			:config="revenueChartConfig" 
			title="Дневная статистика по продажам"
			type="orders"
		/>
		<DailyChartsItem
			:="users" 
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