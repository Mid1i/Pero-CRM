<script setup>
	import { ref, watch, nextTick } from "vue";
	import { getCurrentDate, getWeekDate } from "@/helpers/DateWorkers.js";
	import { onFormatDate, onFormatDay } from "@/helpers/Formatters.js";
	import { createArrayFromObject } from "@/helpers/Global.js";
	import { config } from "@/helpers/UsersChartConfig.js";
	import { Chart } from "chart.js/auto";

	const props = defineProps({
		users: Object
	});


	const canvasRef = ref(null);
	const weekData = ref([]);

	const datesComparison = (item, date) => {
		if (item.date_of_registration === date) {
			return 1;
		}
		return 0;
	}

	watch(() => props.users.status, () => {
		if (props.users.status === 'success') {
			const currentDate = getCurrentDate();

			for (let i = 0; i < 7; i++) {
				const date = onFormatDate(getWeekDate(currentDate, 7 - i - 1));
				const previousWeekDate = onFormatDate(getWeekDate(currentDate, 14 - i - 1));
				const day = onFormatDay(new Date(date).getDay());
				
				let dailyUsers = 0;
				let previousWeekDailyUsers = 0;

				props.users.data.map(item => dailyUsers += datesComparison(item, date));

				props.users.previousWeekData.map(item => previousWeekDailyUsers += datesComparison(item, previousWeekDate));

				weekData.value.push({
					users: dailyUsers,
					previousWeekUsers: previousWeekDailyUsers,
					previousWeekDate: previousWeekDate,
					date: date,
					day: day
				});
			}

			nextTick(() => {
				const [users, previousWeekUsers, previousWeekDate, date, day] = Object.keys(weekData.value[0]).map(item => createArrayFromObject(weekData, item));

				new Chart(canvasRef.value.getContext('2d'), config(users, previousWeekUsers, date, previousWeekDate, day));

				Chart.defaults.font.family = 'Manrope';
			});
		};
	})
</script>


<template>
	<div class="content__charts-chart chart">
		<div class="chart__row">
			<h4 class="chart__title">Дневная статистика по пользователям</h4>
			<div class="chart__right">
				<span class="chart__right-text">Текущая неделя</span>
				<span class="chart__right-text">Прошлая неделя</span>
			</div>
		</div>
		<div :class="['chart__section', {loading: users.status === 'loading'}]">
			<canvas v-if="users.status === 'success'" ref="canvasRef"></canvas>
		</div>
	</div>
</template>
