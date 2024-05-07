<script setup>
	import {ref, reactive, inject, watch, computed} from "vue";
	import MostActiveUsersItem from "@/components/MostActiveUsersItem.vue";
	import {useFetch} from "@/composables/fetch.js";
	import {api} from "@/globals.js";

	const props = defineProps({
		orders: Array
	});

	const activeUsers = ref([]);
	const activeUsersData = reactive({});

	const checkStatus = inject("statusFunc");


	const getOrdersAmount = (order) => order.reduce((value, product) => value += product.count, 0);

	const sortUsersByCount = () => {
		activeUsers.value.sort((val1, val2) => {
			return val1.count < val2.count ? 1
					 : val1.count > val2.count ? -1
					 : 0;
		});
	}

	const getActiveUsers = () => {
		props.orders.map(order => {
			const currentUser = activeUsers.value.find(user => user.id === order.user_id);

			if (currentUser) {
				const index = activeUsers.value.indexOf(currentUser);

				activeUsers.value[index].count += getOrdersAmount(order.order);
				activeUsers.value[index].price += order.price;
			} else {
				activeUsers.value.push({
					id: order.user_id,
					count: getOrdersAmount(order.order),
					price: order.price
				})
			}
		});

		sortUsersByCount();
		return activeUsers.value.length;
	}


	watch(checkStatus, () => {
		if (checkStatus.value && getActiveUsers() > 0) {
			const params = activeUsers.value.reduce((value, user) => value += `id[]=${user.id}&`, "?");
			Object.assign(activeUsersData, useFetch(`${api.users}${params.slice(0, -1)}`));
		}
	});


	const getUserNames = computed(() => {
		if (activeUsersData.data) {
			activeUsers.value.map(user => {
				const currentUser = activeUsersData.data.find(item => item.id === user.id);
				user.name = `${currentUser.name} ${currentUser.surname}`;
			});
		}

		return activeUsers.value;
	});
</script>


<template>
	<div class="users">
		<h4 class="users__title">Самые активные пользователи<br/>за неделю</h4>
		<ul class="users__list">
			<MostActiveUsersItem
				v-for="(user, index) in getUserNames"
				:index="index + 1"
				:key="index"
				:="user"
			/>
		</ul>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.users {
		@include secondary-layout;

		&__title {
			@include subtitle;
			text-align: center;
		}

		&__list {
			align-self: center;
			display: flex;
			flex-direction: column;
			max-width: 12.5vw;
			width: 100%;
		}
	}
</style>