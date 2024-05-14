import {ref, type Ref} from "vue";
import type {APIData} from "@/types/index";
import axios from "axios";


interface fetchData {
	data: Ref<APIData[] | null>,
	loading: Ref<boolean>
};


export const useFetch = (url: string, params: Record<string, any> = {}): fetchData => {
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
