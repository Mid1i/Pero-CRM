<script setup>
	import {inject} from "vue";
	import {useFindTopItemsAndUsers} from "@/composables/topItemsAndUsers.js";
	import MostActiveUsersItem from "@/components/MostActiveUsersItem.vue";
	import {api} from "@/globals.js";

	const props = defineProps({
		orders: Array
	});

	const checkStatus = inject("statusFunc");

	const {topItems, loading} = useFindTopItemsAndUsers(props.orders, checkStatus, api.users);
</script>


<template>
	<div class="users">
		<h4 class="users__title">Самые активные пользователи<br/>за неделю</h4>
		<ul v-if="!loading" class="users__list">
			<MostActiveUsersItem
				v-for="(user, index) in topItems"
				:index="index + 1"
				:key="index"
				:="user"
			/>
		</ul>
		<ul v-else class="users__list">
			<MostActiveUsersItem
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