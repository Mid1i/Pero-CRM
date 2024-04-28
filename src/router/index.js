import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";


const routes = [
	{
		path: '/',
		component: () => import('@/views/Home.vue'),
		meta: {
			title: 'PERO CRM | Главная',
			headerTitle: 'Главная'
		}
	},
	{
		path: '/users',
		component: () => import('@/views/Users.vue'),
		meta: {
			title: 'PERO CRM | Пользователи',
			headerTitle: 'Пользователи'
		}
	},
	{
		path: '/orders',
		component: () => import('@/views/Orders.vue'),
		meta: {
			title: 'PERO CRM | Заказы',
			headerTitle: 'Заказы'
		}
	},
	{
		path: '/products',
		component: () => import('@/views/Products.vue'),
		meta: {
			title: 'PERO CRM | Товары',
			headerTitle: 'Товары'
		}
	},
	{
		path: '/settings',
		component: () => import('@/views/Settings.vue'),
		meta: {
			title: 'PERO CRM | Настройки',
			headerTitle: 'Настройки'
		}
	},
	{
		path: '/help',
		component: () => import('@/views/Help.vue'),
		meta: {
			title: 'PERO CRM | Помощь',
			headerTitle: 'Помощь'
		}
	}
];


export const router = createRouter({
	history: createWebHistory(),
	routes
});


router.afterEach(to => nextTick(() => document.title = to.meta.title));
