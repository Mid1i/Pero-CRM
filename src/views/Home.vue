<script setup>
	import { onMounted, reactive, ref, nextTick } from "vue";
	import { getWidgetsData } from "@/api/WidgetsAPI.js";
	import { priceFormatter } from "@/helpers/global.js";
	import Widgets from "@/components/Widgets.vue";
	import { ordersURL, usersURL } from "@/api";

	const users = reactive({ status: "loading" });
	const orders = reactive({ status: "loading" });
	const canvasRef = ref(null);

	onMounted(async () => {
		Object.assign(users, await getWidgetsData(usersURL, "date_of_registration"));
		Object.assign(orders, await getWidgetsData(ordersURL, "date_of_creating"));
	});

	import { Chart } from "chart.js/auto";

	nextTick(() => {
		const topCanvasPoint = canvasRef.value.getBoundingClientRect().top;
		let gradient = canvasRef.value.getContext('2d').createLinearGradient(0, 0, 0, topCanvasPoint);
		gradient.addColorStop(0, 'rgb(10, 132, 255, .5)');
		gradient.addColorStop(0.5, 'rgb(15, 66, 118, .5)');
		gradient.addColorStop(1, 'transparent');

		new Chart(canvasRef.value.getContext('2d'), {
			type: 'line',
			data: {
				labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
				datasets: [{
					label: 'Продажи',
					data: [23499, 46898, 64192, 36599, 25499, 0, 22499],
					borderJoinStyle: 'round',
					backgroundColor: gradient,
					borderColor: '#0A84FF',
					borderWidth: 2,
					fill: true,
					pointBackgroundColor: 'rgb(10, 132, 255, .6)',
					pointRadius: 6
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
						beginAtZero: true,
						border: {
							display: false,
							dash: [15, 10]
						},
						ticks: {
							color: 'rgb(235, 235, 245, .6)',
							font: {
								size: 14
							},
							callback: value => priceFormatter(value)
						},
						grid: {
							color: 'rgb(235, 235, 245, .1)',
							tickLength: 15,
							tickWidth: 0
						}
					},
					x: {
						ticks: {
							color: 'rgb(235, 235, 245, .6)',
							font: {
								size: 14
							}
						},
						border: {
							display: true,
							color: '#2C2C2E'
						},
						grid: {
							display: false
						}
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
