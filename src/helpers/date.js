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


export const getWeekDate = (date, index) => new Date(date - index * 24 * 60 * 60 * 1000);
