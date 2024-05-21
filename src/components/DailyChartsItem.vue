<script setup lang="ts">
	import { type ComputedRef, ref, inject, onUpdated } from "vue";
	import type { OrderAPIType, UserAPIType } from "@/types/index";
	import { useCharts } from "@/composables/charts";


	const props = defineProps<{
		config: Function,
		currentWeek: UserAPIType[] | OrderAPIType[],
		previousWeek: UserAPIType[] | OrderAPIType[],
		title: string,
		type: string
	}>();

	const canvasRef = ref<HTMLCanvasElement | null>(null);

	const isLoading = inject("isLoading") as ComputedRef<boolean>;
	
	onUpdated((): void => useCharts(props.currentWeek, props.previousWeek, props.config, canvasRef, props.type));
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
			<canvas v-if="!isLoading" ref="canvasRef"></canvas>
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
			height: 280px;
			width: 100%;

			&.loading {
				@include skeleton;
			}
		}
	}
</style>