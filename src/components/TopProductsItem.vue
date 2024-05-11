<script setup>
	import {onFormatPrice} from "@/helpers/formatters";


	const props = defineProps({
		index: Number,
		product: Object
	});
</script>


<template>
	<li class="products__list-el product">
		<span class="product__number">{{ index }}</span>
		<div v-if="product" class="product__right">
			<div class="product__wrapper">
				<img 
					:alt="product.name"
					class="image"
					:src="`/src/assets/images/Products/${product.imgURL}`"
				>
			</div>
			<div class="product__information">
				<h6 class="product__title">{{ product.name }}</h6>
				<span class="product__text">
					Арт.
					<span>{{ product.id }}</span>
				</span>
				<span class="product__text">
					Продано:
					<span>{{ product.count }}</span>
				</span>
				<span class="product__text">
					Общая выручка:
					<span>{{ onFormatPrice(product.price * product.count) }}</span>
				</span>
			</div>
		</div>
		<div v-else class="product__right loading"></div>
	</li>
</template>


<style lang="scss" scoped>
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.product {
		border-bottom: 0.05vw solid $--secondary-text;

		align-items: center;
		display: flex;
		gap: 1.56vw;

		padding: 1.04vw 0px;

		max-width: 19vw;
		width: 100%;

		&:first-child,
		&:nth-child(5n) {
			padding-top: 0px;
		}

		&:nth-child(4n) {
			border-bottom: none;
			padding-bottom: 0px;
		}

		&__number {
			@include title;

			color: $--secondary-text;
			font-size: 3.3vw;

			width: 2.08vw;
		}

		&__right {
			cursor: pointer;

			align-items: center;
			display: flex;
			gap: 0.78vw;

			&.loading {
				@include skeleton;

				flex: 1 0 auto;
				height: 5.2vw;
			}
		}

		&__wrapper {
			border-radius: 1.56vw;

			overflow: hidden;
			height: 5.2vw;
			width: 5.2vw;
		}

		&__information {
			display: flex;
			flex-direction: column;
			gap: 0.26vw;
		}

		&__title {
			@include main-text;

			overflow: hidden;
			text-transform: capitalize;
			text-overflow: ellipsis;
			text-wrap: nowrap;

			width: 8.6vw;
		}

		&__text {
			@include table-text;
			color: $--secondary-text;

			& span {
				color: $--primary-text;
				font-weight: 700;
				
				margin-left: 0.26vw;
			}
		}
	}
</style>