import {doughnutTooltipCallbacks, revenueAxisCallback, revenueTooltipCallbacks, usersAxisCallback, usersTooltipCallbacks} from "@/plugins/chartsCallbacks";
import {xAxis, yAxis} from "@/plugins/chartsAxes";


export const revenueChartConfig = (revenue,  ordersAmount, weekDates, weekDays) => ({
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
	options: options("revenue", weekDates, ordersAmount, revenue)
});


export const usersChartConfig = (users, prevWeekUsers, weekDates, weekDays, prevWeekDates) => ({
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


export const doughnutChartConfig = (data, labels, colors) => ({
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
		tooltip: tooltipOptions(type, weekDates, extraData, array)
	},
	scales: {
		y: yAxis(type, array),
		x: xAxis
	},
});


const tooltipOptions = (type, weekDates, extraData, array) => ({
	cornerRadius: 10,
	displayColors: false,
	titleAlign: "center",
	titleMarginBottom: 20,
	bodyFont: {
		size: 20,
		weight: "bold",
	},
	bodyAlign: "center",
	callbacks: () => {
		const types = {
			revenue: revenueTooltipCallbacks(weekDates, extraData),
			users: usersTooltipCallbacks(weekDates, extraData),
			doughnut: doughnutTooltipCallbacks()
		}

		return types[type];
	},
	padding: {
		y: 10,
		x: 20,
	},
	titleColor: "rgb(235, 235, 245, 0.6)",
	titleFont: fontSettings,
	footerColor: "rgb(235, 235, 245, 0.6)",
	footerAlign: "center",
	footerMarginTop: 20,
	footerFont: fontSettings
});


const fontSettings = {
	size: 14,
	weight: "normal",
};
