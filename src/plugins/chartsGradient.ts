export const createGradient = (ref: HTMLCanvasElement, point: number): CanvasGradient | undefined => {
	const gradient = ref.getContext("2d")?.createLinearGradient(0, 0, 0, point);
	gradient?.addColorStop(0, "rgb(10, 132, 255, .4)");
	gradient?.addColorStop(0.6, "rgb(15, 66, 118, .1)");
	gradient?.addColorStop(1, "transparent");

	return gradient;
};