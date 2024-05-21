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


export const onFormatPhone = (phone: number): string => {
	const strPhone = String(phone);
	return `${strPhone[0] === "7" ? "+7" : "8"} (${strPhone.slice(1, 4)} ${strPhone.slice(4, 7)}-${strPhone.slice(7, 9)}-${strPhone.slice(9, -1)})`;
}
