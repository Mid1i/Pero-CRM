<script setup>
	import {ref, nextTick, watch, computed} from "vue";
	import {Chart} from "chart.js/auto";
	import {doughnutChartConfig} from "@/plugins/charts.js";

	const props = defineProps({
		data: Array,
		colors: Array,
		labels: Array
	});

	const canvasRef = ref(null);

	const checkStatus = computed(() => props.data.every(item => item));

	watch(checkStatus, () => {
		if (checkStatus.value) {
			nextTick(
				() => new Chart(canvasRef.value.getContext("2d"), doughnutChartConfig(props.data.map(item => item.length), props.labels, props.colors))
			);
		}
	});
</script>


<template>
	<div :class="['chart__section', {loading: !checkStatus}]">
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
			font-weight: 500;
			gap: 0.46vw;
		}

		&-color {
			border-radius: 100%;
			height: 0.83vw;
			width: 0.83vw;
		}
	}
</style>
