<script setup>
	import { ref, nextTick } from "vue";
	import { Chart } from "chart.js/auto";
	import { doughnutChartConfig } from "@/plugins/charts.js";

	const props = defineProps({
		data: Array,
		colors: Array,
		labels: Array
	});

	const canvasRef = ref(null);

	nextTick(() => {
		new Chart(canvasRef.value.getContext("2d"), doughnutChartConfig(props.data, props.labels, props.colors))
	});
</script>


<template>
	<div :class="['chart__section', {loading: !data}]">
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
		height: 13vw;
		width: 13vw;

		&.loading {
			@include skeleton;
		}
	}

	.chart__labels {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 1.8vw;

		&-item {
			@include table-text;
			align-items: center;
			display: flex;
			font-weight: 500;
			gap: 0.52vw;
		}

		&-color {
			border-radius: 100%;
			height: 1.04vw;
			width: 1.04vw;
		}
	}
</style>
