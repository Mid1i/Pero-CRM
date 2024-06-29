<script setup lang="ts">
	import { ComputedRef, ref, inject, onUpdated } from "vue";
	import type { IOrdersAPI, IUsersAPI } from "@/interfaces";
	
	import { useCharts } from "@/composables/charts";


	const props = defineProps<{
		config: Function,
		currentWeek: IOrdersAPI[] | IUsersAPI[],
		previousWeek: IOrdersAPI[] | IUsersAPI[],
		title: string,
		type: string
	}>();

	const canvasRef = ref<HTMLCanvasElement | null>(null);

	const isLoading = <ComputedRef<boolean>>inject("isLoading");


	onUpdated(() => useCharts(props.currentWeek, props.previousWeek, props.config, canvasRef, props.type));
</script>


<template>
	<div class="content__charts-chart chart">
		<div class="chart__row">
			<h4 class="chart__title">{{ title }}</h4>
			<div v-if="type === 'users'" class="chart__right">
				<span class="chart__right-text">Текущая неделя</span>
				<span class="chart__right-text">Прошлая неделя</span>
			</div>
		</div>
		<div :class="['chart__section', {loading: isLoading}]">
			<canvas v-if="!isLoading && (currentWeek.length > 0 || previousWeek.length > 0)" ref="canvasRef"></canvas>
			<h4 v-else-if="currentWeek.length === 0 || previousWeek.length === 0" class="chart__empty">Нет данных</h4>
		</div>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.chart {
		@include secondary-layout;

		flex: 0 0 47.7%;
		min-width: 0px;

		&__title {
			@include subtitle;
		}

		&__row {
			align-items: center;
			display: flex;
			justify-content: space-between;
		}

		&__empty {
			@include title;
		}

		&__right {
			align-items: center;
			display: flex;
			gap: 0.78vw;

			&-text {
				@include table-text;

				align-items: center;
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
			align-items: center;
			display: flex;
			justify-content: center;

			height: 280px;
			width: 100%;

			&.loading {
				@include skeleton;
			}
		}
	}
</style>