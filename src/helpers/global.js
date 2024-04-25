export const addLeadingZeros = (num) => String(num).padStart(2, '0'); 


export const between = (min, max, value) => value >= min && value <= max;


export const createGradient = (ref, point) => {
	let gradient = ref.getContext('2d').createLinearGradient(0, 0, 0, point);
	gradient.addColorStop(0, 'rgb(10, 132, 255, .4)');
	gradient.addColorStop(0.6, 'rgb(15, 66, 118, .1)');
	gradient.addColorStop(1, 'transparent');

	return gradient;
};


export const addWordEnding = (word, count) => {
	if ([11, 12, 13, 14].includes(count)) {
		return `${word}ов`;
	} 

	const endings = {
		1: ' ',
		2: 'а',
		3: 'а',
		4: 'а'
	};

	return `${word}${endings[count] || 'ов'}`
}