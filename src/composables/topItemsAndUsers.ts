import { type ComputedRef, type Ref, ref, reactive, watch } from "vue";
import type { OrderAPIType, APIData, OrderArrayType, ProductAPIType, UserAPIType, OrderItem } from "@/types/index";
import { createArrayFromObject } from "@/helpers/global";
import { useFetch } from "@/composables/fetch";
import { api } from "../globals";


interface TopItem {
	id: number,
	count: number,
	revenue: number
};

type TopItemInfo = TopItem | ProductAPIType & TopItem | UserAPIType & TopItem;

interface TopItemsAPI {
	data: APIData[],
	loading: boolean
};

interface TopItemsFunc {
	topItems: Ref<TopItemInfo[]>, 
	loading: Ref<boolean>
}


export const useFindTopItemsAndUsers = (orders: OrderAPIType[], status: ComputedRef<boolean>, url: string): TopItemsFunc => {
	const topItemsAPI = reactive<TopItemsAPI | Record<any, never>>({});
	const topItems = ref<TopItemInfo[]>([]);
	const loading = ref<boolean>(true);


	const fillTopItems = (): number => {
		if (url === api.products) {
			createArrayFromObject(orders, "order").map((order: OrderArrayType[]): void[] => order.map(getItem));
		} else {
			orders.map(getItem);
		}
		
		sortTopItems();
		return topItems.value.length;
	}

	const getItem = (item: OrderItem): void => findItem(getIDByType(item)) ? updateItem(item) : addItem(item);

	const findItem = (id: number): TopItemInfo | undefined => topItems.value.find((item) => item.id === id);

	const addItem = (item: OrderItem): void => {
		const newItem = {
			id: getIDByType(item), 
			count: getNumberByType(item, "count"), 
			revenue: getNumberByType(item, "price")
		};

		topItems.value = [...topItems.value, newItem];
	}

	const updateItem = (item: OrderItem): void => {
		const currentItem = findItem(getIDByType(item)) as TopItem;
		const index = topItems.value.indexOf(currentItem);

		topItems.value[index] = {
			...currentItem, 
			count: currentItem.count + getNumberByType(item, "count"), 
			revenue: currentItem.revenue + getNumberByType(item, "price")
		};
	}

	const sortTopItems = (): void => {
		topItems.value.sort((val1: TopItemInfo, val2: TopItemInfo): number => {
			if (val1.count < val2.count) return 1;
			if (val1.count > val2.count) return -1;
			if (val1.revenue < val2.revenue) return 1;
			if (val1.revenue > val2.revenue) return -1;
			return 0;
		});
	}


	const getIDByType = (item: OrderItem): number => "user_id" in item ? item.user_id : item.id;

	const getNumberByType = (item: OrderItem, property: string): number => property in item ? item[property] : 1;


	watch(status, (): void => {
		if (!status.value && fillTopItems() > 0) {
			const params = topItems.value.reduce((value: string, item: TopItemInfo): string => value += `id[]=${item.id}&`, "?");
			Object.assign(topItemsAPI, useFetch(`${url}${params.slice(0, -1)}`));
		}
	});

	
	watch(() => topItemsAPI.loading, (): void => {
		if (topItemsAPI.data) {
			topItems.value = topItems.value.map((item: TopItemInfo): TopItemInfo => ({...item, ...topItemsAPI.data.find(obj => obj.id === item.id)}));
			loading.value = false;
		}
	});

	return {topItems, loading};
}