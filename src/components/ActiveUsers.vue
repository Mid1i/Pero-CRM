<script setup lang="ts">
	import { ComputedRef, inject } from "vue";
	import type { IOrdersAPI, IUsersAPI } from "@/interfaces";
	import ActiveUserCard from "@/components/ActiveUsersCard.vue";

	import { useFindTopItemsAndUsers } from "@/composables/topItemsAndUsers";
	import { api } from "@/globals";


	const props = defineProps<{
		orders: IOrdersAPI[]
	}>();

	const isLoadingOrders = inject("isLoading") as ComputedRef<boolean>;


	const {topItems, isLoading} = useFindTopItemsAndUsers<IUsersAPI>(props.orders, isLoadingOrders, api.users);
</script>


<template>
	<div class="users">
		<h4 class="users__title">Самые активные пользователи<br/>за неделю</h4>
		<ul v-if="!isLoading" class="users__list">
			<ActiveUserCard
				v-for="(user, index) in topItems.slice(0, 5)"
				:index="index + 1"
				:key="index"
				:="user"
			/>
		</ul>
		<ul v-else class="users__list">
			<ActiveUserCard
				v-for="index in 5"
				:index="index"
				:key="index"
			/>
		</ul>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.users {
		@include secondary-layout;
		align-items: center;

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

		&__text {
			@include table-text;

			background: $--tertiary-back;
			border-radius: 0.52vw;

			padding: 0.42vw 0.78vw;
			margin-top: 1.04vw;
		}
	}
</style>