<script setup lang="ts">
	import type { IUsersAPI } from "@/interfaces";
	
	import { onFormatUserDate, onFormatPhone } from "@/helpers/formatters";
	import { getFormattedDate } from "@/helpers/date";


	defineProps<{
		users: IUsersAPI[] | undefined,
	}>();

	const tableHeaders: string[] = ["ID", "Имя", "E-mail", "Телефон", "Возраст", "Пол", "Дата Регистрации", "Всего Заказов", "Статус"];


	const getStatus = (status: string): string => {
		const statuses = {
			admin: "Админ",
			banned: "Бан",
			consumer: "Покупатель"
		}

		return statuses[status];
	}
</script>


<template>
	<table class="table">
		<thead class="table__head">
			<th>
				<td 
					v-for="(header, index) in tableHeaders"
					class="table__head-item"
					:key="index"
				>
					{{ header }}
				</td>
			</th>
		</thead>
		<tbody class="table__body">
			<tr v-for="user in users" :key="user.id">
				<td class="table__body-item">{{ user.id }}</td>
				<td class="table__body-item">{{ user.name }}</td>
				<td class="table__body-item">{{ user.email }}</td>
				<td class="table__body-item">{{ onFormatPhone(user.phone) }}</td>
				<td class="table__body-item">{{ user.age }}</td>
				<td class="table__body-item">{{ user.gender ? "Мужской" : "Женский" }}</td>
				<td class="table__body-item">{{ onFormatUserDate(getFormattedDate(user.date_of_registration)) }}</td>
				<td class="table__body-item">{{ user.orders.length }}</td>
				<div class="table__body-item">{{ getStatus(user.status) }}</div>
			</tr>
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
			}
		}

		&__body tr {
			display: flex;
			gap: 1.56vw;

			padding: 1.3vw 2.08vw 1.3vw 1.04vw;

			width: 100%;

			&:nth-child(even) {
				background: $--quaternary-back;
			}

			&:last-child {
				border-radius: 0px 0px 0.52vw 0.52vw;
			}
		}

		&__body-item {
			@include table-text;
			font-weight: 600;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__head-item,
		&__body-item {
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
</style>