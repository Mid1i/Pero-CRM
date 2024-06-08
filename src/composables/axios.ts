import { Ref, ref } from "vue";
import axios, { AxiosResponse } from "axios";


export const useAxios = <T>(url: string, params: Record<string, any> = {}): {
	data: Ref<T[] | undefined>,
	isLoading: Ref<boolean>
} => {
	const isLoading = ref<boolean>(false);
	const data = ref<T[]>();

	const fetch = async (): Promise<void> => {
		isLoading.value = true;

		await axios.get(url, {params})
			.then((response: AxiosResponse) => data.value = response.data)
			.catch((error: unknown) => console.error(error))
			.finally(() => isLoading.value = false);
	}

	fetch();

	return {data, isLoading};
}
