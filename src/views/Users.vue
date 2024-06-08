<script setup lang="ts">
	import { reactive, toRefs, watchEffect } from "vue";
	import { IUsersAPI } from "@/types";
	import SearchInput from "@/components/SearchInput.vue";
	import { useAxios } from "@/composables/axios";
	import Table from "@/components/Table.vue";
	import { api } from "@/globals";

	
	const users = reactive(useAxios<IUsersAPI>(api.users));
	const params = reactive({
		name: ''
	});


	const updateParams = (key: string, value: string) => Object.assign(params, {[key]: `*${value}`});


	watchEffect(() => {
		const validParams = Object.fromEntries(Object.entries(params).filter((item: [string, any]): any => item[1]));
		Object.assign(users, useAxios<IUsersAPI>(api.users, validParams));
		
		toRefs(params);
	});
</script>


<template>
	<div class="users">
		<div class="users__row">
			<SearchInput @on-search="updateParams"/>
		</div>
		<Table 
			:items="users.data"
			type="users"
		/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.users {
		background: $--secondary-back;
		border-radius: 1.04vw;

		display: flex;
		flex: 1 0 auto;
		flex-direction: column;

		padding: 1.3vw;

		&__row {
			align-items: center;
			display: flex;
			justify-content: space-between;

			margin-bottom: 1.56vw;
		}
	}
</style>