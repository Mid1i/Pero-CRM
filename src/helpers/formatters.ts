export const onFormatPrice = (value: number) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;


export const onFormatDay = (day: number): string => {
	const days = {
		0: "Вс",
		1: "Пн",
		2: "Вт",
		3: "Ср",
		4: "Чт",
		5: "Пт",
		6: "Сб"
	};

	return days[day];
}


export const onFormatUserDate = (date: string): string => date.split("-").reverse().join(".");
