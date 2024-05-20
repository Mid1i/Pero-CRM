<script setup lang="ts">
	import {reactive, toRefs, watchEffect} from "vue";
	// import type {FetchData} from "@/types/index";
	import SearchInput from "@/components/SearchInput.vue";
	import {useFetch} from "@/composables/fetch";
	import {api} from "../globals";

	
	// const users = reactive<FetchData>(useFetch(api.users));
	const users = reactive({});
	const params = reactive({
		name: ''
	});

	const updateParams = (key: string, value: string): void => {Object.assign(params, {[key]: `*${value}`})};

	watchEffect((): void => {
		const validParams = Object.fromEntries(Object.entries(params).filter(([key, value]: [string, any]): void => (value || key === "name")));
		Object.assign(users, useFetch(api.users, validParams));
		
		toRefs(params);
	});
</script>

<template>
	<div class="users">
		<div class="users__row">
			<SearchInput @on-search="updateParams"/>
		</div>
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
	}
</style>