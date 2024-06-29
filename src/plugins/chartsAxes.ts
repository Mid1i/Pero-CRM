import { onFormatPrice } from "@/helpers/formatters";


export const xAxis: any = {
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

export const yAxis = (type: string, array: number[] = []): any => ({
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
		callback: (value: string | number, index: number): string | undefined => (type === "revenue") ? revenueAxisCallback(Number(value), index, array) : usersAxisCallback(value),
	}
});


const revenueAxisCallback = (value: number, index: number, array: number[]): string | undefined => {
	if (Math.max(...array) % 2 === 1 && index % 2 === 0) return onFormatPrice(value);
	if (Math.max(...array) % 2 === 0 && index % 2 === 1) return onFormatPrice(value);
}

const usersAxisCallback = (value: string | number): string | undefined => {
	if (Number.isInteger(value)) {
		return String(value);
	}
}