<script setup>
	import { onMounted, reactive, computed } from "vue";
	import DailyStatistics from "@/components/DailyStatistics.vue";
	import { getWidgetsData } from "@/api/WidgetsAPI.js";
	import Widgets from "@/components/Widgets.vue";
	import { ordersURL, usersURL } from "@/api";

	const users = reactive({ status: "loading" });
	const orders = reactive({ status: "loading" });

	onMounted(async () => {
		Object.assign(users, await getWidgetsData(usersURL, "date_of_registration"));
		Object.assign(orders, await getWidgetsData(ordersURL, "date_of_creating"));
	});
</script>


<template>
	<Widgets :users="users" :orders="orders" />
	<div class="content__charts">
		<DailyStatistics :orders="orders"/>
	</div>
</template>


<style scoped lang="scss">
	.content__charts {
		display: flex;
		gap: 2.6vw;
		margin-bottom: 2.6vw;
	}
</style>
