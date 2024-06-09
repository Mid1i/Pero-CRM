import { addWordEnding, addWordEndingPlural } from "@/helpers/endings";
import { onFormatPrice, onFormatUserDate } from "@/helpers/formatters";

export const revenueAxisCallback = (value, index, array) => {
	if (Math.max(...array) % 2 === 1) {
		if (index % 2 === 0) {
			return onFormatPrice(value);
		}
	} else {
		if (index % 2 === 1) {
			return onFormatPrice(value);
		}
	}
}

export const revenueTooltipCallbacks = (weekDates, ordersAmount) => ({
	title: (context) => onFormatUserDate(weekDates[context[0].dataIndex]),
	label: (context) => onFormatPrice(context.formattedValue),
	footer: (context) => `${ordersAmount[context[0].dataIndex]} ${addWordEnding("заказ", ordersAmount[context[0].dataIndex])}`,
})

export const usersAxisCallback = (value) => {
	if (Number.isInteger(value)) {
		return value;
	}
}

export const usersTooltipCallbacks = (weekDates, prevWeekDates) => ({
	title: (context) => {
		const data = {
			0: onFormatUserDate(weekDates[context[0].dataIndex]),
			1: onFormatUserDate(prevWeekDates[context[0].dataIndex]),
		}

		return data[context[0].datasetIndex]
	},
	label: (context) => `${context.formattedValue} ${addWordEndingPlural("пользователь", context.formattedValue)}`,
	footer: () => "зарегистрировались"
})


export const doughnutTooltipCallbacks = () => ({
	label: (context) => `${(context.formattedValue / context.dataset.data.reduce((value, item) => value += item, 0) * 100).toFixed(1)}%`
})
