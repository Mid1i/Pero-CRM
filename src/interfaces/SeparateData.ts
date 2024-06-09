export interface ISeparateData<T> {
	data: T[] | null,
	currentWeek: T[],
	previousWeek: T[],
	isLoading: boolean
};
