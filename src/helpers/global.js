import {getPastDate, getCurrentDate} from "@/helpers/date.js";


export const addLeadingZeros = (num) => String(num).padStart(2, "0"); 


export const between = (min, max, value) => value >= min && value <= max;


export const createArrayFromObject = (object, params) => object.value.map(item => item[params]);
