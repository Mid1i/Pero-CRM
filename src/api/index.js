import axios from "axios";
import { reactive } from 'vue';


export const userURL = 'https://efa01a8820d3e67e.mokky.dev/users';


// export const getUsers = async () => {
// 	const users = reactive({
// 		data: null,
// 		error: null
// 	}); 

// 	await axios.get(url)
// 						 .then(response => users.data = response.data)
// 						 .catch(error => users.error = error)

// 	return users;
// }