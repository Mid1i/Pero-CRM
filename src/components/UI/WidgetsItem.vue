<script setup>
	const props = defineProps({
		title: String,
		amount: Number,
		status: Boolean,
		previousAmount: Number,
		iconURL: String
	});

	const compareAmounts = () => {
		if (props.previousAmount === 0) {
			return '+100%';
		}

		const difference = Number(((props.amount - props.previousAmount) / props.previousAmount * 100).toFixed(2));

		if (props.previousAmount > props.amount) {
			return `${difference}%`;
		} else {
			return `+${difference}%`;
		}
	};

	const comparisonClasses = [
		'widget__comparison', 
		{increase: props.previousAmount < props.amount}, 
		{decrease: props.previousAmount > props.amount}
	];
</script>


<template>
	<section class="content__widgets-item widget">
		<h3 :class="['widget__title', {loading: !status}]">{{ title }}</h3>
		<div :class="['widget__row', {loading: !status}]">
			<span class="widget__amount">{{ amount }}</span>
			<span v-if="status" :class="comparisonClasses">{{ compareAmounts() }}</span>
		</div>
		<p class="widget__text">По сравнению с предыдущей неделей</p>
		<div :class="['widget__icon', {loading: !status}, {bigger: iconURL !== 'visitors.svg'}]">
			<img 
				v-if="status" 
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
		gap: 1.04vw;
		padding: 1.3vw;
		position: relative;

		&__title {
			@include subtitle;
			color: $--secondary-text;

			&.loading {
				animation: pulse-bg 2s infinite;
				border-radius: 0.26vw;
				height: 1.1vw;
				width: 10.4vw;
			}
		}

		&__row {
			align-items: center;
			display: flex;
			gap: 1.04vw;

			&.loading {
				animation: pulse-bg 2s infinite;
				border-radius: 0.26vw;
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
				animation: pulse-bg 2s infinite;
				border-radius: 0.26vw;
				height: 3.9vw;
				width: 3.9vw;
			}
		}
	}

	@keyframes pulse-bg {
  0% {
    background-color: $--secondary-text;
  }
  50% {
    background-color: $--tertiary-text;
  }
  100% {
    background-color: $--secondary-text;
  }
}
</style>