import {addLeadingZeros} from "@/helpers/global";


export const getCurrentDate = () => Date.now() / 1000;


export const getPastDate = (days: number) => new Date(getCurrentDate() - days * 24 * 60 * 60).getTime();


export const getFormattedDate = (date: number) => {
	const oldDate = new Date(date * 1000);
	
	const year = oldDate.getFullYear();
	const month = addLeadingZeros(oldDate.getMonth() + 1);
	const day = addLeadingZeros(oldDate.getDate());
	
	return `${year}-${month}-${day}`;
}
