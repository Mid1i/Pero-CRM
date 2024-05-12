import {ref, Ref} from "vue";
import axios from "axios";
import type {OrderAPIType, UserAPIType, ProductAPIType} from "@/types/index";


type Data = OrderAPIType[] | UserAPIType[] | ProductAPIType[] | null;


export const useFetch = (url: string, params: any = {}): {data: Ref<Data>, loading: Ref<boolean>} => {
	const loading = ref<boolean>(true);
	const data = ref<Data>(null);

	const fetch = async () => {
		try {
			const response = await axios.get<Data>(url, {params});
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
