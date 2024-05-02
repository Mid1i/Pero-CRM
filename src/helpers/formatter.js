export const onFormatPrice = (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;


export const onFormatDay = (day) => {
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


export const onFormatUserDate = (date) => date.split("-").reverse().join(".");
