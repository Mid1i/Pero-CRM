import {createRouter, createWebHistory} from "vue-router";
import { nextTick } from 'vue';


const routes = [
	{
		path: '/',
		component: () => import('@/views/Home.vue'),
		meta: {
			title: 'PERO CRM | Главная'
		}
	},
	{
		path: '/users',
		component: () => import('@/views/Users.vue'),
		meta: {
			title: 'PERO CRM | Пользователи'
		}
	},
	{
		path: '/orders',
		component: () => import('@/views/Orders.vue'),
		meta: {
			title: 'PERO CRM | Заказы'
		}
	},
	{
		path: '/products',
		component: () => import('@/views/Products.vue'),
		meta: {
			title: 'PERO CRM | Товары'
		}
	},
	{
		path: '/settings',
		component: () => import('@/views/Settings.vue'),
		meta: {
			title: 'PERO CRM | Настройки'
		}
	},
	{
		path: '/help',
		component: () => import('@/views/Help.vue'),
		meta: {
			title: 'PERO CRM | Помощь'
		}
	}
];


export const router = createRouter({
	history: createWebHistory(),
	routes
});

router.afterEach(to => nextTick(() => document.title = to.meta.title));