<script setup lang="ts">
	import { ref, watch, computed } from "vue";
	import type { IUsersAPI } from "@/types";
	import { Chart, ChartConfiguration } from "chart.js/auto";
	import { doughnutChartConfig } from "@/plugins/charts";


	const props = defineProps<{
		data: (IUsersAPI[] | undefined)[],
		colors: string[],
		labels: string[]
	}>();

	const canvasRef = ref<HTMLCanvasElement | null>(null);


	const isReady = computed<boolean>(() => props.data.every((item: IUsersAPI[] | undefined) => item));

	const getDataLengths = computed<(number | undefined)[]>(() => props.data.map(item => item?.length));


	watch(isReady, () => {
		if (isReady.value && canvasRef.value) {
			const config = <ChartConfiguration>doughnutChartConfig(getDataLengths, props.labels, props.colors);
			new Chart(canvasRef.value, config);
		}
	});
</script>


<template>
	<div :class="['chart__section', {loading: !isReady}]">
		<canvas ref="canvasRef"></canvas>
	</div>
	<ul class="chart__labels">
		<li
			v-for="(label, index) in labels" 
			class="chart__labels-item"
			:key="index"
		>
			<span class="chart__labels-color" :style="{background: colors[index]}"></span>
			{{ label }}
		</li>
	</ul>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/mixins.scss";


	.chart__section {
		height: 10.4vw;
		width: 10.4vw;

		&.loading {
			@include skeleton;
		}
	}

	.chart__labels {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1vw;

		&-item {
			@include table-text;

			align-items: center;
			display: flex;
			gap: 0.46vw;

			font-weight: 500;
		}

		&-color {
			border-radius: 100%;
			
			height: 0.83vw;
			width: 0.83vw;
		}
	}
</style>
