import { revenueAxisCallback, revenueTooltipCallbacks, usersAxisCallback, usersTooltipCallbacks } from "@/plugins/chartsCallbacks.js";
import { xAxis, yAxis } from "@/plugins/chartsAxises.js";


export const revenueChartConfig = (revenue,  ordersAmount, weekDates, weekDays, gradient) => ({
	type: "line",
	data: {
		labels: weekDays,
		datasets: [
			{
				backgroundColor: gradient,
				borderColor: "rgb(10, 132, 255, 1)",
				borderJoinStyle: "round",
				borderWidth: 2,
				data: revenue,
				fill: true,
				pointBackgroundColor: "rgb(10, 132, 255, .6)",
				pointHitRadius: 20,
				pointRadius: 6,
				tension: 0.3,
			},
		],
	},
	options: options('revenue', weekDates, ordersAmount, revenue)
});


export const usersChartConfig = (users, prevWeekUsers, prevWeekDates, weekDates, weekDays) => ({
	type: "bar",
		data: {
			labels: weekDays,
			datasets: [
				usersChartBar(users, 'rgb(10, 132, 255, 1)'),
				usersChartBar(prevWeekUsers, 'rgb(23, 60, 97)')
			],
	},
	options: options('users', weekDates, prevWeekDates)
});


const usersChartBar = (data, color) => ({
	barPercentage: 0.9,
	backgroundColor: color,
	borderRadius: 5,
	borderWidth: 0,
	data: data,
	minBarLength: 5
});


const options = (type, weekDates, extraData, array) => ({
	maintainAspectRatio: false,
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			cornerRadius: 10,
			displayColors: false,
			titleAlign: "center",
			titleMarginBottom: 20,
			bodyFont: {
				size: 20,
				weight: "bold",
			},
			bodyAlign: 'center',
			callbacks: () => {
				if (type === 'revenue') {
					return revenueTooltipCallbacks(weekDates, extraData);
				} else {
					return usersTooltipCallbacks(weekDates, extraData);
				}
			},
			padding: {
				y: 10,
				x: 20,
			},
			titleFont: fontSettings,
			footerAlign: 'center',
			footerMarginTop: 20,
			footerFont: fontSettings
		}
	},
	scales: {
		y: yAxis(type, array),
		x: xAxis
	},
});


const fontSettings = {
	size: 14,
	weight: 'normal',
};
