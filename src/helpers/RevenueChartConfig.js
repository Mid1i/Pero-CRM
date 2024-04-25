import { onFormatPrice, onFormatUserDate } from "@/helpers/Formatters.js";
import { addWordEnding } from "@/helpers/Global.js";


export const config = (weekDates, revenue, ordersAmount, weekDays, gradient) => {
	const fontSettings = {
		size: 14,
		weight: 'normal',
	};


	return {
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
						title: context => onFormatUserDate(weekDates[context[0].dataIndex]),
						label: context => onFormatPrice(context.formattedValue),
						footer: context => `${ordersAmount[context[0].dataIndex]} ${addWordEnding('заказ', ordersAmount[context[0].dataIndex])}`
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
						callback: (value, index) => {
							if (Number(String(Math.max(...revenue))[0]) % 2 === 1) {
								if (index % 2 === 0) {
									return onFormatPrice(value);
								}
							} else {
								if (index % 2 === 1) {
									return onFormatPrice(value);
								}
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
