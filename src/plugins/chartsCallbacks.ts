import { addWordEnding, addWordEndingPlural } from "@/helpers/endings";
import { onFormatPrice, onFormatUserDate } from "@/helpers/formatters";
import { TooltipCallbacks, TooltipItem} from "chart.js";


type TypeRevenueTooltipCallbacks = (weekDates: string[], ordersAmount: string[]) => Partial<TooltipCallbacks<"line">>;
type TypeUsersTooltipCallbacks = (weekDates: string[], prevWeekDates: string[]) => Partial<TooltipCallbacks<"bar">>


export const revenueTooltipCallbacks: TypeRevenueTooltipCallbacks = (weekDates, ordersAmount) => ({
	title: (context: TooltipItem<"line">[]) => onFormatUserDate(weekDates[context[0].dataIndex]),
	label: (context: TooltipItem<"line">) => onFormatPrice(context.formattedValue),
	footer: (context: TooltipItem<"line">[]) => `${ordersAmount[context[0].dataIndex]} ${addWordEnding("заказ", Number(ordersAmount[context[0].dataIndex]))}`,
})


export const usersTooltipCallbacks: TypeUsersTooltipCallbacks = (weekDates, prevWeekDates) => ({
	title: (context: TooltipItem<"bar">[]) => {
		const data = {
			0: onFormatUserDate(weekDates[context[0].dataIndex]),
			1: onFormatUserDate(prevWeekDates[context[0].dataIndex]),
		}

		return data[context[0].datasetIndex]
	},
	label: (context: TooltipItem<"bar">) => `${context.formattedValue} ${addWordEndingPlural("пользователь", Number(context.formattedValue))}`,
	footer: () => "зарегистрировались"
})


export const doughnutTooltipCallbacks = (): Partial<TooltipCallbacks<"doughnut">> => ({
	label: (context: TooltipItem<"doughnut">) => {
		const total = context.dataset.data.reduce((value, item) => value += item, 0);
		const percents = Number(context.formattedValue) / total * 100;

	  return `${percents.toFixed(1)}%`;
	}
})
