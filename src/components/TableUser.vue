<script setup lang="ts">
	import { onFormatUserDate, onFormatPhone } from "@/helpers/formatters";
	import { getFormattedDate } from "@/helpers/date";
	

	const props = defineProps<{
		id: number,
		name: string,
		age: number,
		gender: boolean,
		orders: number[],
		status: string,
		email: string,
		phone: number,
		date_of_registration: number
	}>();

	const getStatus = (): string => {
		const statuses = {
			admin: "Админ",
			banned: "Бан",
			consumer: "Покупатель"
		}

		return statuses[props.status];
	}
</script>


<template>
	<tr class="item" :key="id">
		<td class="item-cell">{{ id }}</td>
		<td class="item-cell">{{ name }}</td>
		<td class="item-cell">{{ email }}</td>
		<td class="item-cell">{{ onFormatPhone(phone) }}</td>
		<td class="item-cell">{{ age }}</td>
		<td class="item-cell">{{ gender ? "Мужской" : "Женский" }}</td>
		<td class="item-cell">{{ onFormatUserDate(getFormattedDate(date_of_registration)) }}</td>
		<td class="item-cell">{{ orders.length }}</td>
		<div class="item-cell">{{ getStatus() }}</div>
	</tr>
</template>


<style lang="scss" scoped>
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.item {
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

		&-cell {
			@include table-text;
			font-weight: 600;
			overflow: hidden;
			text-overflow: ellipsis;

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