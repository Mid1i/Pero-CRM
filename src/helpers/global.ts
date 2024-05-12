export const addLeadingZeros = (num: number) => String(num).padStart(2, "0"); 


export const between = (min: number, max: number, value: number) => value >= min && value <= max;


export const createArrayFromObject = (object: any[], params: string) => object.map(item => item[params]);
