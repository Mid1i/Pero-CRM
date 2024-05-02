<script setup>
	import {reactive, watch} from "vue";
	import MostActiveUsersItem from "@/components/MostActiveUsersItem.vue";

	const props = defineProps({
		orders: Object,
		users: Object
	});

	const activeUsers = reactive({});

	watch(() => props.orders.data, () => {
		if (props.orders.data) {
			props.orders.data.map(order => {
				activeUsers[order.user_id] = {
					count: order.order.reduce((value, product) => value += product.count, activeUsers[order.user_id]?.count || 0),
					price: (order.price + activeUsers[order.user_id]?.price) || order.price
				};
			});
		}
	});
</script>


<template>
	<div class="users">
		<h4 class="users__title">Самые активные пользователи</h4>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.users {
		@include secondary-layout;

		&__title {
			@include subtitle;
		}
	}
</style>