export const onFormatDate = date => String(date).padStart(2, '0');


export const getCurrentDate = () => new Date();


export const getPreviousWeekDate = () => {
	const currentDate = getCurrentDate();

	return new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
}


export const getDateDifference = (date) => {
	const currentDate = getCurrentDate();
	const formatDate = new Date(date);

	return Number(currentDate.getDate() - formatDate.getDate());
}