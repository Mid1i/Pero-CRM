import {revenueAxisCallback, usersAxisCallback} from "@/plugins/chartsCallbacks";


export const xAxis = {
	border: {
		color: "#2C2C2E",
		display: true
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
};

export const yAxis = (type, array) => ({
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
			if (type === "revenue") {
				return revenueAxisCallback(value, index, array);
			} else {
				return usersAxisCallback(value);
			}
		},
	}
});