export const addWordEnding = (word: string, count: number) => {
	if ([11, 12, 13, 14].includes(count)) {
		return `${word}ов`;
	} 

	const endings = {
		1: " ",
		2: "а",
		3: "а",
		4: "а"
	};

	return `${word}${endings[count] || "ов"}`
};


export const addWordEndingPlural = (word: string, count: number) => {
	if ([11, 12, 13, 14].includes(count)) {
		return `${word.slice(0, -1)}ей`;
	} 

	const endings = {
		1: "ь",
		2: "я",
		3: "я",
		4: "я"
	};

	return `${word.slice(0, -1)}${endings[count] || "ей"}`
};