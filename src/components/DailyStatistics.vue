<script setup>
	import { nextTick, ref, watch } from "vue";
	import { getCurrentDate, getWeekDate } from "@/helpers/DateWorkers.js";
	import { onFormatDate, onFormatDay } from "@/helpers/Formatters.js";
	import { createArrayFromObject } from "@/helpers/Global.js";
	import { config } from "@/helpers/RevenueChartConfig.js";
	import { createGradient } from "@/helpers/Global.js";
	import { Chart } from "chart.js/auto";

	const props = defineProps({
		orders: Object
	});

	const canvasRef = ref(null);
	const weekData = ref([]);

	watch(() => props.orders.status, () => {
		if (props.orders.status === 'success') {
			const currentDate = getCurrentDate();

			for (let i = 0; i < 7; i++) {
				const date = onFormatDate(getWeekDate(currentDate, 7 - i - 1));
				const day = onFormatDay(new Date(date).getDay());
				
				let dailyRevenue = 0;
				let dailyOrderAmount = 0;

				props.orders.data.map(item => {
					if (item.date_of_creating === date) {
						dailyRevenue += item.price;
						dailyOrderAmount ++;
					}
				});

				weekData.value.push({
					revenue: dailyRevenue,
					orders: dailyOrderAmount,
					date: date,
					day: day
				});
			}

			nextTick(() => {
				const topCanvasPoint = canvasRef.value.getBoundingClientRect().top;

				const [revenue, orders, date, day] = Object.keys(weekData.value[0]).map(item => createArrayFromObject(weekData, item));

				new Chart(canvasRef.value.getContext('2d'), config(revenue, orders, date, day, createGradient(canvasRef.value, topCanvasPoint)));

				Chart.defaults.font.family = 'Manrope';
			});
		};
	})
</script>


<template>
	<div class="content__charts-chart chart">
		<h4 class="chart__title">Дневная статистика по продажам</h4>
		<div :class="['chart__section', {loading: orders.status === 'loading'}]">
			<canvas v-if="orders.status === 'success'" ref="canvasRef"></canvas>
		</div>
	</div>
</template>


<style lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.chart {
		@include secondary-layout;
		flex: 0 0 48%;
		padding: 1.3vw;
		min-width: 0px;

		&__title {
			@include subtitle;
			margin-bottom: 1.04vw;
		}

		&__row {
			align-items: center;
			display: flex;
			justify-content: space-between;
			margin-bottom: 1.04vw;

			& .chart__title {
				margin-bottom: 0px;
			}
		}

		&__right {
			align-items: center;
			display: flex;
			gap: 0.78vw;

			&-text {
				align-items: center;
				@include table-text;
				display: flex;
				gap: 0.26vw;

				&::before {
					border-radius: 100%;
					content: "";
					display: block;
					height: 0.63vw;
					width: 0.63vw;
				}

				&:first-child::before {
					background: $--blue;
				}

				&:last-child::before {
					background: $--dark-blue;
				}
			}
		}

		&__section {
			height: 280px;
			width: 100%;

			&.loading {
				@include skeleton;
			}
		}
	}
</style>