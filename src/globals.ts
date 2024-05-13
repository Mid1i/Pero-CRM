interface SidebarItem {
	id: number,
	title: string,
	iconURL: string,
	link: string
}


const mainURL = "https://efa01a8820d3e67e.mokky.dev";


export const api: Record<string, string> = {
	users: `${mainURL}/users`,
	orders: `${mainURL}/orders`,
	products: `${mainURL}/products`
};


export const sidebarItems: Record<string, SidebarItem[]> = {
	categories: [
		{
			id: 1,
			title: "Главная",
			iconURL: "Sidebar-home-icon.svg",
			link: "/",
		},
		{
			id: 2,
			title: "Пользователи",
			iconURL: "Sidebar-users-icon.svg",
			link: "/users",
		},
		{
			id: 3,
			title: "Заказы",
			iconURL: "Sidebar-orders-icon.svg",
			link: "/orders",
		},
		{
			id: 4,
			title: "Товары",
			iconURL: "Sidebar-products-icon.svg",
			link: "/products",
		},
	],
	services: [
		{
			id: 1,
			title: "Настройки",
			iconURL: "Sidebar-settings-icon.svg",
			link: "/settings",
		},
		{
			id: 2,
			title: "Помощь",
			iconURL: "Sidebar-help-icon.svg",
			link: "/help",
		},
	],
};

