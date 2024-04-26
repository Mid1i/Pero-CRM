import { onFormatUserDate } from "@/helpers/Formatters.js";
import { addWordEndingPlural } from "@/helpers/Global.js";


export const config = (users, previousWeekUsers, weekDates, previousWeekDates, weekDays) => {
	const fontSettings = {
		size: 14,
		weight: 'normal',
	};


	return {
		type: "bar",
		data: {
			labels: weekDays,
			datasets: [
				{
					barPercentage: 0.9,
					backgroundColor: "rgb(10, 132, 255, 1)",
					borderRadius: 5,
					borderWidth: 0,
					data: users,
					minBarLength: 5
				},
				{
					barPercentage: 0.9,
					backgroundColor: "rgb(23, 60, 97)",
					borderRadius: 5,
					borderWidth: 0,
					data: previousWeekUsers,
					minBarLength: 5
				}
			],
		},
		options: {
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
					callbacks: {
						title: (context) => {
							const data = {
								0: onFormatUserDate(weekDates[context[0].dataIndex]),
								1: onFormatUserDate(previousWeekDates[context[0].dataIndex])
							};
							
							return data[context[0].datasetIndex];
						},
						label: (context) => `${context.formattedValue} ${addWordEndingPlural('пользователь', context.formattedValue)}`,
						footer: () => 'зарегистрировались',
					},
					padding: {
						y: 10,
						x: 20,
					},
					titleFont: fontSettings,
					footerAlign: 'center',
					footerMarginTop: 20,
					footerFont: fontSettings
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					border: {
						display: false,
						dash: [15, 10],
					},
					grid: {
						color: "rgb(235, 235, 245, .1)",
						tickLength: 15,
						tickWidth: 0,
					},
					ticks: {
						color: "rgb(235, 235, 245, .6)",
						font: {
							size: 14,
						},
						callback: (value) => {
							if (Number.isInteger(value)) {
								return value;
							}
						},
					}
				},
				x: {
					border: {
						display: true,
						color: "#2C2C2E",
					},
					grid: {
						color: "rgb(235, 235, 245, .1)",
						display: true,
						drawOnChartArea: false,
						tickLength: 5
					},
					ticks: {
						color: "rgb(235, 235, 245, .6)",
						font: {
							size: 14,
						},
					}
				},
			},
		},
	}
}