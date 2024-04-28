<script setup>
	import { reactive, watch } from "vue";
	import DoughnutChartsItem from "@/components/DoughnutChartsItem.vue";

	const props = defineProps({
		title: String,
		orders: Object,
		users: Object
	});

	const usersStatistics = reactive({
		age: {
			young: 0,
			average: 0,
			old: 0
		},
		gender: {
			male: 0,
			female: 0
		}
	});


	watch(props, () => {
		if (props.users.data) {
			props.users.data.map(user => {
				usersStatistics.gender[user.gender] ++;

				if (user.age < 30) {
					usersStatistics.age.young ++;
				} else if (user.age > 50) {
					usersStatistics.age.average ++;
				} else {
					usersStatistics.age.old ++;
				}
			})
		}
	});
</script>


<template>
	<div class="content__users users">
		<h4 class="users__title">{{ title }}</h4>
		<DoughnutChartsItem
			v-if="users.data"
			:data="Object.values(usersStatistics.gender)"
			:colors="['rgb(85, 161, 232)', 'rgb(238, 110, 132)']"
			:labels="['Мужчины', 'Женщины']"
		/>
		<DoughnutChartsItem
			v-if="users.data"
			:data="Object.values(usersStatistics.age)"
			:colors="['rgb(255, 204, 0)', 'rgb(255, 149, 0)', 'rgb(76, 217, 100)']"
			:labels="['Меньше 30 лет', '30-50 лет', 'Больше 50 лет']"
		/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/mixins.scss";

	.users {
		align-items: center;
		@include secondary-layout;
		flex: 0 0 25%;
		min-width: 0px;

		&__title {
			@include subtitle;
		}
	}
</style>