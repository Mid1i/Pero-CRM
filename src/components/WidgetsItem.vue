<script setup>
	import {inject} from "vue";
	import {onFormatPrice} from "@/helpers/formatter.js";

	const props = defineProps({
		title: String,
		status: String,
		currentAmount: Number,
		previousAmount: Number,
		iconURL: String,
	});

	const checkStatus = inject("statusFunc");
	
	const compareAmounts = () => {
		if (props.previousAmount === 0) {
			return "+100%";
		}

		const difference = Number((((props.currentAmount - props.previousAmount) / props.previousAmount) * 100).toFixed(2));

		if (props.previousAmount > props.currentAmount) {
			return `${difference}%`;
		} else {
			return `+${difference}%`;
		}
	};
</script>


<template>
	<section class="content__widgets-item widget">
		<h3 class="widget__title">{{ title }}</h3>
		<div v-if="checkStatus" class="widget__row">
			<span class="widget__amount">{{ title === "Общая выручка" ? onFormatPrice(currentAmount) : currentAmount }}</span>
			<span :class="['widget__comparison',  props.previousAmount < props.currentAmount ? 'increase' : 'decrease']">{{ compareAmounts() }}</span>
		</div>
		<div v-else class="widget__row loading"></div>
		<p class="widget__text">По сравнению с предыдущей неделей</p>
		<div :class="['widget__icon', {bigger: props.iconURL !== 'visitors.svg'}]">
			<img
				:alt="title"
				class="widget__image image"
				:src="`/src/assets/images/Widgets/${iconURL}`"
			/>
		</div>
	</section>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.widget {
		@include secondary-layout;
		position: relative;

		&__title {
			@include subtitle;
			color: $--secondary-text;
		}

		&__row {
			align-items: center;
			display: flex;
			gap: 1.04vw;

			&.loading {
				@include skeleton;
				height: 3.2vw;
				width: 12vw;
			}
		}

		&__amount {
			@include title;
			font-size: 2.5vw;
		}

		&__comparison {
			border-radius: 0.52vw;
			color: $--secondary-text;
			font-size: 0.73vw;
			font-weight: 700;
			padding: 0.26vw 0.52vw;

			&.increase {
				background: $--transp-green;
				color: $--green;
			}

			&.decrease {
				background: $--transp-red;
				color: $--red;
			}
		}

		&__text {
			@include small-text;
			color: $--tertiary-text;
		}

		&__icon {
			position: absolute;
			bottom: 1.3vw;
			right: 2.6vw;
			height: 3.9vw;
			width: 2.6vw;

			&.bigger {
				width: 3.6vw;
			}
		}
	}
</style>
