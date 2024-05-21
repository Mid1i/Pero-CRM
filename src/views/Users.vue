<script setup lang="ts">
	import { reactive, toRefs, watchEffect } from "vue";
	// import type { FetchData } from "@/types/index";
	import SearchInput from "@/components/SearchInput.vue";
	import { useFetch } from "@/composables/fetch";
	import { api, usersTableHeaders as headers } from "../globals";

	
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
		<table class="users__table">
			<thead class="users__table-head">
				<tr>
					<td 
						v-for="(header, index) in headers"
						class="users__table-header"
						:key="index"
					>
						{{ header }}
					</td>
				</tr>
			</thead>
		</table>
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

		&__table {
			display: flex;
			flex-direction: column;

			width: 100%;

			&-head tr {
				background: $--tertiary-back;
				border-radius: 0.52vw 0.52vw 0px 0px;

				display: flex;
				gap: 1.56vw;

				padding: 0.52vw 2.08vw 0.52vw 1.04vw;

				width: 100%;
			}

			&-header {
				@include subtitle;
				font-weight: 600;

				&:nth-child(1) {
					flex: 0 0 1.04vw;
				}

				&:nth-child(2),
				&:nth-child(3) {
					flex: 1 0 auto;
				}

				&:nth-child(4) {
					flex: 0 0 7.8vw;
				}

				&:nth-child(5) {
					flex: 0 0 3.65vw;
				}

				&:nth-child(6) {
					flex: 0 0 5.2vw;
				}

				&:nth-child(7) {
					flex: 0 0 8.5vw;
				}

				&:nth-child(8) {
					flex: 0 0 6.7vw;
				}

				&:nth-child(9) {
					flex: 0 0 6.2vw;
					text-align: right;
				}
			}
		}
	}
</style>