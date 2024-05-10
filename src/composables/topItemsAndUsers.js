import {ref, reactive, watch} from "vue";
import {useFetch} from "@/composables/fetch.js";


export const useFindTopItemsAndUsers = (orders, status, url) => {
	const topItemsApi = reactive({});
	const loading = ref(true);
	const topItems = ref([]);

	const getTopItems = () => {
		orders.map(order => findItem(order.user_id || order.id) ? editItem(order) : addItem(order));
		sortItems();

		if (topItems.value.length > 0) {
			const params = topItems.value.reduce((value, item) => value += `id[]=${item.id}&`, "?");
			Object.assign(topItemsApi, useFetch(`${url}${params.slice(0, -1)}`));
		};
	}

	const addItem = ({id, user_id, order, count, price}) => {
		const item = {
			id: user_id || id, 
			count: order ? getCounts(order) : count, 
			price: price
		};

		topItems.value.push(item);
	}

	const editItem = ({id, user_id, order, count, price}) => {
		const currentItem = findItem(user_id || id);
		const index = topItems.value.indexOf(currentItem);

		topItems.value[index] = {
			...currentItem, 
			count: currentItem.count + (order ? getCounts(order) : count), 
			price: currentItem.price + price
		};
	}

	const sortItems = () => {
		topItems.value.sort((val1, val2) => {
			return val1.count < val2.count ? 1
					 : val1.count > val2.count ? -1
					 : 0;
		});
	}

	const findItem = (id) => topItems.value.find(item => item.id === id);

	const getCounts = (order) => order.reduce((value, product) => value += product.count, 0);


	watch(status, () => {
		if (status.value && getTopItems() > 0) {
			const params = topItems.value.reduce((value, item) => value += `id[]=${item.id}&`, "?");
			Object.assign(topItemsApi, useFetch(`${url}${params.slice(0, -1)}`));
		}
	});

	watch(() => topItemsApi.loading, () => {
		if (!topItemsApi.loading) {
			topItems.value = topItems.value.map(item => ({...item, ...topItemsApi.data.find(obj => obj.id === item.id)}));
			loading.value = false;
		}
	});

	return {topItems, loading};
}