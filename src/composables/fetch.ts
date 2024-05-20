import {ref} from "vue";
import axios from "axios";
import type {APIData, FetchData} from "@/types/index";


export const useFetch = (url: string, params: Record<string, any> = {}): FetchData => {
	const loading = ref<boolean>(true);
	const data = ref<APIData[] | null>(null);

	const fetch = async (): Promise<void> => {
		try {
			const response = await axios.get<APIData[]>(url, {params});
			data.value = response.data;
		} catch (err) {
			console.error(err);
		} finally {
			loading.value = false;
		}
	}

	fetch();

	return {data, loading};
}
