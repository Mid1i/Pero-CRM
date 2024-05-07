import {ref} from "vue";
import axios from "axios";


export const useFetch = (url, params = {}) => {
	const loading = ref(true);
	const error = ref(null);
	const data = ref(null);

	const fetch = async () => {
		await axios.get(url, {params})
					.then(response => data.value = response.data)
					.catch(e => error.value = e)
					.finally(() => loading.value = false)
	}

	fetch();

	return {data, error, loading};
}
