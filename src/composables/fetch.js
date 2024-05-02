import {ref} from "vue";
import axios from "axios";


export const useFetch = (url, params) => {
	const error = ref(null);
	const data = ref(null);

	axios.get(url, {params})
			.then(response => data.value = response.data)
			.catch(e => error.value = e)

	return {data, error};
}
