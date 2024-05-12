import {ref, reactive, watch} from "vue";
import {useFetch} from "@/composables/fetch";
import {createArrayFromObject} from "@/helpers/global";


export const useFindTopItemsAndUsers = (orders, status, url, type) => {
	const topItemsAPI = reactive({});
	const loading = ref(true);
	const topItems = ref([]);

	const getTopItems = () => {
		type === "products" ? createArrayFromObject(orders, "order").map(order => order.map(getItem)) : orders.map(getItem);
		
		sortItems();

		if (topItems.value.length > 0) {
			const params = topItems.value.reduce((value, item) => value += `id[]=${item.id}&`, "?");
			Object.assign(topItemsAPI, useFetch(`${url}${params.slice(0, -1)}`));
		};

		return topItems.value.length;
	}

	const getItem = (item) => findItem(item.user_id || item.id) ? editItem(item) : addItem(item);

	const findItem = (id) => topItems.value.find((item) => item.id === id);

	const addItem = ({id, user_id, count, price}) => {
		const item = {
			id: user_id || id, 
			count: count || 1, 
			revenue: price
		};

		topItems.value = [...topItems.value, item];
	}

	const editItem = ({id, user_id, count, price}) => {
		const currentItem = findItem(user_id || id);
		const index = topItems.value.indexOf(currentItem);

		topItems.value[index] = {
			...currentItem, 
			count: currentItem.count + (count || 1), 
			revenue: currentItem.revenue + price
		};
	}

	const sortItems = () => {
		topItems.value.sort((val1, val2) => {
			if (val1.count < val2.count) return 1;
			if (val1.count > val2.count) return -1;
			if (val1.revenue < val2.revenue) return 1;
			if (val1.revenue > val2.revenue) return -1;
			return 0;
		});
	}

	watch(status, () => {
		if (status.value && getTopItems() > 0) {
			const params = topItems.value.reduce((value, item) => value += `id[]=${item.id}&`, "?");
			Object.assign(topItemsAPI, useFetch(`${url}${params.slice(0, -1)}`));
		}
	});

	watch(() => topItemsAPI.loading, () => {
		if (topItemsAPI.data) {
			topItems.value = topItems.value.map(item => ({...item, ...topItemsAPI.data.find(obj => obj.id === item.id)}));
			loading.value = false;
		}
	});

	return {topItems, loading};
}