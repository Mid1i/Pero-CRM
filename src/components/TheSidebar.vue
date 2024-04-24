<script setup>
	import TheSidebarItem from "@/components/TheSidebarItem.vue";
	import { ref } from "vue";

	const sidebarItems = {
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
	}

	const menuSize = ref(localStorage.getItem("menuSize") || "big")

	const onMenuResize = () => {
		const sizes = {
			big: "small",
			small: "big",
		}
		
		menuSize.value = sizes[menuSize.value]
		localStorage.setItem("menuSize", menuSize.value)
	}
</script>

<template>
	<aside :class="['aside-bar', { small: menuSize === 'small' }]">
		<div class="aside-bar__row">
			<div class="aside-bar__wrapper">
				<img
					alt="Логотип Pero"
					class="aside-bar__logo image"
					src="@/assets/images/Pero-logo.svg"
				/>
			</div>
			<h2 class="aside-bar__title">Pero</h2>
			<div class="aside-bar__arrow" @click="onMenuResize">
				<svg fill="none" height="14" viewBox="0 0 8 14" width="8">
					<path
						d="M7 13L1 7L7 1"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</div>
		<nav class="aside-bar__nav">
			<ul class="aside-bar__menu">
				<li class="aside-bar__menu-category">Категории</li>
				<li class="aside-bar__menu-el">
					<ul class="aside-bar__menu-list">
						<TheSidebarItem
							v-for="item in sidebarItems.categories"
							:key="item.id"
							:="item"
						/>
					</ul>
				</li>
				<li class="aside-bar__menu-category">Служебные</li>
				<li class="aside-bar__menu-el">
					<ul class="aside-bar__menu-list">
						<TheSidebarItem
							v-for="item in sidebarItems.services"
							:key="item.id"
							:="item"
						/>
					</ul>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.aside-bar {
	background: $--secondary-back;
	display: flex;
	flex-direction: column;
	transition: all 0.2s linear;
	height: 100%;
	width: 13.8vw;

	&__row {
		align-items: center;
		border-bottom: 0.05vw solid $--secondary-text;
		display: flex;
		padding: 1.04vw;
		overflow: hidden;
		position: relative;
	}

	&__wrapper {
		flex: 0 0 auto;
		margin-right: 0.52vw;
		height: 2.08vw;
		width: 2.08vw;
	}

	&__title {
		@include title;
		transition: all 0.2s linear;
		text-transform: uppercase;
	}

	&__arrow {
		align-items: center;
		cursor: pointer;
		display: flex;
		flex: 0 0 auto;
		justify-content: center;
		margin-left: auto;
		transition: all 0.2s linear;
		height: 1.25vw;
		width: 1.25vw;

		& svg {
			height: 0.73vw;
			width: 0.42vw;
		}

		& path {
			transition: all 0.2s linear;
		}
	}

	&__menu {
		display: flex;
		flex-direction: column;
		gap: 0.52vw;
		padding: 1.04vw 2.08vw;

		&-category {
			color: $--primary-text;
			font-size: 0.63vw;
			font-weight: 500;
			padding-left: 0.52vw;
			transition: all 0.2s linear;
			text-transform: uppercase;
		}

		&-list {
			display: flex;
			flex-direction: column;
			gap: 0.52vw;
			margin-bottom: 1.56vw;
		}
	}

	&.small {
		width: 5.99vw;

		:where(.aside-bar__title, .item__text, .aside-bar__menu-category) {
			visibility: hidden;
			opacity: 0;
			width: 0;
		}

		& .aside-bar__arrow {
			transform: rotate(180deg);
		}

		& .aside-bar__row {
			padding: 1.04vw 0.78vw;
		}

		& .aside-bar__menu {
			padding: 1.04vw 1.82vw;
		}
	}
}

@media (hover: hover) {
	.aside-bar__arrow:hover path {
		stroke: $--secondary-text;
	}

	.aside-bar__arrow:active path {
		stroke: $--tertiary-text;
	}
}
</style>
