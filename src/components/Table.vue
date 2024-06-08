<script setup lang="ts">
	import type { IUsersAPI } from "@/types/index";
	import { usersTableHeaders as headers } from "@/globals";
	import TableUser from "@/components/TableUser.vue";


	defineProps<{
		items: IUsersAPI[] | undefined,
		type: string
	}>();
</script>


<template>
	<table class="table">
		<thead class="table__head">
			<th>
				<td 
					v-for="(header, index) in headers"
					class="table__head-item"
					:key="index"
				>
					{{ header }}
				</td>
			</th>
		</thead>
		<tbody class="table__body">
			<TableUser 
				v-for="(item) in items"
				v-if="type === 'users'"
				:key="item.id"
				:="item"
			/>
		</tbody>
	</table>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.table {
		display: flex;
		flex-direction: column;
		overflow: overlay;
		
		max-height: 37vw;
		width: 100%;

		&::-webkit-scrollbar {
			width: 1.56vw;

			&-track {
				background: transparent;
			}

			&-thumb {
				background: $--primary-text;
				border: 0.65vw solid $--secondary-back;
				border-radius: 1.04vw;
			}
		}

		&__head {
			background: $--secondary-back;
			position: sticky;
			left: 0px;
			top: 0px;

			& th {
				background: $--tertiary-back;
				border-radius: 0.52vw 0.52vw 0px 0px;

				display: flex;
				gap: 1.56vw;

				padding: 0.52vw 2.08vw 0.52vw 1.04vw;

				width: 100%;
				z-index: 1;
			}

			&-item {
				@include subtitle;
				font-weight: 600;

				text-align: left;

				&:nth-child(1) {
					flex: 0 0 1.04vw;
				}

				&:nth-child(2) {
					flex: 1 0 8vw;
				}

				&:nth-child(3) {
					flex: 0 0 9.5vw;
				}

				&:nth-child(4) {
					flex: 0 0 7.8vw;
				}

				&:nth-child(5) {
					flex: 0 0 4.5vw;
				}

				&:nth-child(6) {
					flex: 0 0 5.2vw;
				}

				&:nth-child(7) {
					flex: 0 0 8.5vw;
				}

				&:nth-child(8) {
					flex: 0 0 7vw;
				}

				&:nth-child(9) {
					flex: 0 0 5vw;
					text-align: right;
				}
			}
		}
	}
</style>