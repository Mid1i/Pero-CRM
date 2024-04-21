<script setup>
	import { reactive, onMounted } from "vue";
	import axios from "axios";

	import WidgetsItem from "@/components/UI/WidgetsItem.vue";
	import { getDateDifference } from "@/helpers/date.js";
	import { between } from "@/helpers/global.js";
	import { userURL } from "@/api";


	const users = reactive({
		data: null,
		previousData: null,
		status: 'loading',
		error: null
	})


	const onCountVisitors = async () => {
		await axios.get(userURL)
						 .then(response => {
							  users.data = response.data.filter(user => getDateDifference(user.dateOfRegistration) <= 7);
								users.previousData = response.data.filter(user => between(7, 14, getDateDifference(user.dateOfRegistration)));
							})
						 .catch(error => users.error = error)
						 .finally(() => users.status = 'success')	
	}

	onMounted(async () => {
		await onCountVisitors();
	});
</script>


<template>
	<div class="content__widgets">
		<WidgetsItem 
			v-if="users.status === 'success'"
			title="Зарегистрировались" 
			iconURL="visitors.svg" 
			:amount="users.data.length"
			:previousAmount="users.previousData.length"
		/>
	</div>
</template>


<style scoped lang="scss">
	.content__widgets {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2.6vw;
		margin-bottom: 2.6vw;
	}
</style>