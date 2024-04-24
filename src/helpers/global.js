export const between = (min, max, value) => value >= min && value <= max;

export const priceFormatter = (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;