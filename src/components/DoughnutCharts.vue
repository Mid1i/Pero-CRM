<script setup lang="ts">
	import { reactive } from "vue";
	import DoughnutChartsItem from "@/components/DoughnutChartsItem.vue";
	import { useFetch } from "@/composables/fetch";
	import { api } from "../globals";


	const params = (val1: number, val2: number): Record<string, number> => ({
		"age[from]": val1,
		"age[to]": val2
	});

	const maleUsers = reactive(useFetch(api.users, {gender: true}));
	const femaleUsers = reactive(useFetch(api.users, {gender: false}));

	const youngUsers = reactive(useFetch(api.users, params(0, 30)));
	const averageUsers = reactive(useFetch(api.users, params(31, 50)));
	const oldUsers = reactive(useFetch(api.users, params(51, 150)));
</script>


<template>
	<div class="content__charts charts">
		<h4 class="charts__title">Зарегистрированные пользователи</h4>
		<DoughnutChartsItem
			:data="[maleUsers.data, femaleUsers.data]"
			:colors="['rgb(85, 161, 232)', 'rgb(238, 110, 132)']"
			:labels="['Мужчины', 'Женщины']"
		/>
		<DoughnutChartsItem
			:data="[youngUsers.data, averageUsers.data, oldUsers.data]"
			:colors="['rgb(255, 204, 0)', 'rgb(255, 149, 0)', 'rgb(76, 217, 100)']"
			:labels="['Меньше 30 лет', '30-50 лет', 'Больше 50 лет']"
		/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/mixins.scss";


	.charts {
		@include secondary-layout;

		align-items: center;
		flex: 0 0 15.5vw;

		min-width: 0px;

		&__title {
			@include subtitle;
			
			max-width: 10.42vw;
			text-align: center;
		}
	}
</style>