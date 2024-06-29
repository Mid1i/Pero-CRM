import { ChartConfiguration, ChartDataset, ChartOptions } from "chart.js";
import { options, tooltipOptions } from "@/plugins/chartsOptions";


type TypeRevenueChartConfig = (revenue: number[],  ordersAmount: string[], weekDates: string[], weekDays: string[]) => ChartConfiguration<"line">;
type TypeUsersChartConfig = (users: number[], prevWeekUsers: number[], weekDates: string[], weekDays: string[], prevWeekDates: string[]) => ChartConfiguration<"bar">;
type TypeDoughnutChartConfig = (data: number[], labels: string[], colors: string[]) => ChartConfiguration<"doughnut">;


export const revenueChartConfig: TypeRevenueChartConfig = (revenue,  ordersAmount, weekDates, weekDays) => ({
	type: "line",
	data: {
		labels: weekDays,
		datasets: [
			{
				borderColor: "rgb(10, 132, 255, 1)",
				borderJoinStyle: "round",
				borderWidth: 2,
				data: revenue,
				fill: true,
				pointBackgroundColor: "rgb(10, 132, 255, .6)",
				pointHitRadius: 20,
				pointRadius: 6,
				tension: 0.3,
			}
		],
	},
	options: <ChartOptions<"line">>options("revenue", weekDates, ordersAmount, revenue)
});


export const usersChartConfig: TypeUsersChartConfig = (users, prevWeekUsers, weekDates, weekDays, prevWeekDates) => ({
	type: "bar",
		data: {
			labels: weekDays,
			datasets: [
				usersChartBar(users, "rgb(10, 132, 255, 1)"),
				usersChartBar(prevWeekUsers, "rgb(23, 60, 97)")
			],
	},
	options: options("users", weekDates, prevWeekDates)
});


export const doughnutChartConfig: TypeDoughnutChartConfig = (data, labels, colors) => ({
	type: "doughnut",
	data: {
		labels: labels,
		datasets: [{
			label: "",
			data: data,
			backgroundColor: colors,
			hoverBackgroundColor: [...colors.map(item => `${item.slice(0, -1)}, .8)`)],
			borderWidth: 0
		}]
	},
	options: {
		maintainAspectRatio: false,
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: tooltipOptions("doughnut")
		}
	} 
})


const usersChartBar = (data: number[], color: string): ChartDataset<"bar"> => ({
	barPercentage: 0.9,
	backgroundColor: color,
	borderRadius: 5,
	borderWidth: 0,
	data: data,
	minBarLength: 5
});
