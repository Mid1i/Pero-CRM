<script setup>
	import { onMounted, reactive, ref, nextTick } from "vue";
	import { getWidgetsData } from "@/api/WidgetsAPI.js";
	import Widgets from "@/components/Widgets.vue";
	import { ordersURL, usersURL } from "@/api";

	const users = reactive({ status: "loading" });
	const orders = reactive({ status: "loading" });
	const canvasRef = ref(null);

	onMounted(async () => {
		Object.assign(users, await getWidgetsData(usersURL, "date_of_registration"));
		Object.assign(orders, await getWidgetsData(ordersURL, "date_of_creating"));
	});

	import { Chart } from 'chart.js/auto';

	nextTick(() => {
		new Chart(canvasRef.value, {
			type: 'line',
			data: {
				labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
				datasets: [{
					label: 'Продажи',
					data: [10, 15, 30, 40, 20, 70, 20],
					borderJoinStyle: 'round',
					backgroundColor: '#0A84FF',
					borderColor: '#0A84FF',
					pointRadius: 0,
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false,
						labels: {
							font: {
								family: 'Manrope'
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true
					}
				},
				elements: {
					line: {
						tension: 0.3
					}
				}
			}
		})
	})
	
</script>

<template>
	<Widgets :users="users" :orders="orders" />
	<div class="content__charts">
		<div class="content__charts-chart chart">
			<h4 class="chart__title">Дневная статистика по продажам</h4>
			<div class="chart__section">
				<canvas ref="canvasRef"></canvas>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.content__charts {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2.6vw;
		margin-bottom: 2.6vw;
	}

	.chart {
		@include secondary-layout;
		padding: 1.3vw;

		&__title {
			@include subtitle;
			margin-bottom: 1.04vw;
		}

		&__section {
			width: 100%;
		}
	}
</style>
