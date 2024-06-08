import { ComputedRef, Ref, ref, reactive, watch } from "vue";
import type { IOrdersAPI, IProductsAPI, ISizes, IUsersAPI } from "@/types";
import { createArrayFromObject } from "@/helpers/global";
import { useAxios } from "@/composables/axios";
import { api } from "@/globals";


interface ITopItem {
	id: number,
	count: number,
	revenue: number
};

interface ITopItemsAPI<T> {
	data: T[] | undefined,
	isLoading: boolean
}


export const useFindTopItemsAndUsers = <T extends (IUsersAPI | IProductsAPI)>(orders: IOrdersAPI[], status: ComputedRef<boolean>, url: string): {
	topItems: Ref<(ITopItem & T)[] | ITopItem[]>,
	isLoading: Ref<boolean>
} => {
	const isLoading = ref<boolean>(true);
	const topItems = ref<ITopItem[]>([]);
	const topItemsAPI: ITopItemsAPI<T> = reactive({
		data: [],
		isLoading: true
	});


	const fillTopItems = (): number => {
		if (url === api.products) {
			createArrayFromObject(orders, "order").map((order: ISizes[]) => order.map(getItem));
		} else {
			orders.map(getItem);
		}
		
		sortTopItems();
		return topItems.value.length;
	}

	const getItem = (item: IOrdersAPI | ISizes) => findItem(getIDByType(item)) ? updateItem(item) : addItem(item);

	const findItem = (id: number): ITopItem | undefined => topItems.value.find((item) => item.id === id);

	const addItem = (item: IOrdersAPI | ISizes) => {
		const newItem = {
			id: getIDByType(item), 
			count: getNumberByType(item, "count"), 
			revenue: getNumberByType(item, "price")
		};

		topItems.value = [...topItems.value, newItem];
	}

	const updateItem = (item:IOrdersAPI | ISizes) => {
		const currentItem = <ITopItem>findItem(getIDByType(item));

		const index = topItems.value.indexOf(currentItem);

		topItems.value[index] = {
			...currentItem, 
			count: currentItem.count + getNumberByType(item, "count"), 
			revenue: currentItem.revenue + getNumberByType(item, "price")
		};
	}

	const sortTopItems = () => {
		topItems.value.sort((val1: ITopItem, val2: ITopItem): number => {
			if (val1.count < val2.count) return 1;
			if (val1.count > val2.count) return -1;
			if (val1.revenue < val2.revenue) return 1;
			if (val1.revenue > val2.revenue) return -1;
			return 0;
		});
	}


	const getIDByType = (item: IOrdersAPI | ISizes): number => "user_id" in item ? item.user_id : item.id;

	const getNumberByType = (item: IOrdersAPI | ISizes, property: string): number => property in item ? item[property] : 1;


	watch(status, () => {
		if (!status.value && fillTopItems() > 0) {
			const params = topItems.value.reduce((value: string, item): string => value += `id[]=${item.id}&`, "?");
			Object.assign(topItemsAPI, useAxios<T, {}>(`${url}${params.slice(0, -1)}`));
		}
	});

	
	watch(() => topItemsAPI.isLoading, (): void => {
		if (topItemsAPI.data) {
			topItems.value = topItems.value.map((item: ITopItem): ITopItem => ({...item, ...topItemsAPI.data?.find((obj: T) => obj.id === item.id)}));
			isLoading.value = false;
		}
	});

	return {topItems, isLoading};
}