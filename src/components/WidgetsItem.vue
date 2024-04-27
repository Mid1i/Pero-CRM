<script setup>
	import { onFormatPrice } from "@/helpers/formatter.js";

	const props = defineProps({
		title: String,
		currentAmount: Number,
		prevAmount: Number,
		iconURL: String,
	});

	const compareAmounts = () => {
		if (props.prevAmount === 0) {
			return "+100%";
		}

		const difference = Number((((props.currentAmount - props.prevAmount) / props.prevAmount) * 100).toFixed(2));

		if (props.prevAmount > props.currentAmount) {
			return `${difference}%`;
		} else {
			return `+${difference}%`;
		}
	};

	const comparisonClasses = [
		'widget__comparison',
		{ increase: props.prevAmount < props.currentAmount },
		{ decrease: props.prevAmount > props.currentAmount },
	];

	const iconClasses = [
		'widget__icon',
		{ loading: !props.currentAmount },
		{ bigger: props.iconURL !== 'visitors.svg' }
	];
</script>


<template>
	<section class="content__widgets-item widget">
		<h3 :class="['widget__title', { loading: !currentAmount }]">{{ title }}</h3>
		<div :class="['widget__row', { loading: !currentAmount }]">
			<span class="widget__amount">{{ title === "Общая выручка" ? onFormatPrice(currentAmount) : currentAmount }}</span>
			<span v-if="currentAmount" :class="comparisonClasses">{{	compareAmounts() }}</span>
		</div>
		<p class="widget__text">По сравнению с предыдущей неделей</p>
		<div :class="iconClasses">
			<img
				v-if="currentAmount"
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

			&.loading {
				@include skeleton;
				height: 1.1vw;
				width: 10.4vw;
			}
		}

		&__row {
			align-items: center;
			display: flex;
			gap: 1.04vw;

			&.loading {
				@include skeleton;
				height: 3vw;
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

			&.loading {
				@include skeleton;
				position: absolute;
				height: 3.9vw;
				width: 3.9vw;
			}
		}
	}
</style>
