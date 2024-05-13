export const addLeadingZeros = (num: number): string => String(num).padStart(2, "0"); 


export const createArrayFromObject = (object: any[], params: string): any[] => object.map(item => item[params]);
