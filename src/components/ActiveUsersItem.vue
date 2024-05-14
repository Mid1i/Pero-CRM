<script setup lang="ts">
	import {onFormatPrice} from "@/helpers/formatters";


	defineProps<{
		index: number,
		name?: string,
		surname?: string,
		count?: number,
		revenue?: number
	}>();
</script>


<template>
	<li class="users__list-el user">
		<span class="user__number">{{ index }}</span>
		<div v-if="name && count && revenue" class="user__right">
			<span class="user__title">{{ `${surname} ${name}` }}</span>
			<span class="user__text">
				Всего заказов: 
				<span>{{ count }}</span>
			</span>
			<span class="user__text">
				На сумму: 
				<span>{{ onFormatPrice(revenue) }}</span>
			</span>
		</div>
		<div v-else class="user__right loading"></div>
	</li>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.user {
		align-items: center;
		display: flex;
		gap: 1.56vw;

		border-bottom: 0.05vw solid $--secondary-text;

		padding: 0.78vw 0px;
		width: 100%;
		
		&:first-child {
			padding-top: 0px;
		}

		&:last-child {
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
			display: flex;
			flex-direction: column;
			gap: 0.26vw;

			overflow: hidden;

			&.loading {
				@include skeleton;

				flex: 1 0 auto;
				height: 3.65vw;
			}
		}

		&__title {
			@include main-text;

			overflow: hidden;
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