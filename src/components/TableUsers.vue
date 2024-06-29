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
	<div class="container">
		<table class="table">
			<thead class="table__head">
				<th 
					v-for="(header, index) in tableHeaders"
					class="table__head-item"
					:key="index"
				>
					{{ header }}
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
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";


	.container {
		overflow: overlay;
		
		max-height: 35vw;
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
	}


	.table {
		border-collapse: collapse;
		width: 100%;

		&__head {
			background: $--tertiary-back;
			border-radius: 0.52vw 0.52vw 0px 0px;

			position: sticky;
			left: 0px;
			top: 0px;

			& th {
				padding: 0.52vw 2.08vw 0.52vw 1.04vw;
			}

			&-item {
				@include subtitle;
				font-weight: 600;

				text-align: left;
			}
		}

		&__body tr {
			&:nth-child(even) {
				background: $--quaternary-back;
			}

			&:last-child {
				border-radius: 0px 0px 0.52vw 0.52vw;
			}
		}

		&__body-item {
			@include table-text;
			color: $--secondary-text;
			font-weight: 600;

			padding: 1.3vw 2.08vw 1.3vw 1.04vw;
			transition: all 0.1s ease-in-out;
		}
	}


	@media(hover: hover) {
		.table__body tr:hover .table__body-item {
			color: $--primary-text;
		}
	}
</style>