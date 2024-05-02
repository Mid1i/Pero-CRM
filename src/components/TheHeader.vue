<script setup>
	import {useRouter} from "vue-router";

	const router = useRouter();
</script>

<template>
	<header class="header">
		<h1 class="header__title">{{ router.currentRoute.value.meta.headerTitle }}</h1>
		<div class="header__right">
			<div class="header__notify">
				<svg fill="none" height="20" viewBox="0 0 18 20" width="18">
					<path d="M6 15V16C6 16.7956 6.31607 17.5587 6.87868 18.1213C7.44129 18.6839 8.20435 19 9 19C9.79565 19 10.5587 18.6839 11.1213 18.1213C11.6839 17.5587 12 16.7956 12 16V15M7 3C7 2.46957 7.21071 1.96086 7.58579 1.58579C7.96086 1.21071 8.46957 1 9 1C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3C12.1484 3.54303 13.1274 4.38833 13.8321 5.4453C14.5367 6.50227 14.9404 7.73107 15 9V12C15.0753 12.6217 15.2954 13.2171 15.6428 13.7381C15.9902 14.2592 16.4551 14.6914 17 15H1C1.54494 14.6914 2.00981 14.2592 2.35719 13.7381C2.70457 13.2171 2.92474 12.6217 3 12V9C3.05956 7.73107 3.4633 6.50227 4.16795 5.4453C4.8726 4.38833 5.85159 3.54303 7 3Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
			<div class="header__account">
				<div class="header__wrapper">
					<img alt="Аватарка админа" class="header__image image" src="@/assets/images/account-avatar.png"/>
				</div>
				<span class="header__nickname">Midi</span>
				<svg class="header__icon" fill="none" height="8" viewBox="0 0 14 8" width="14">
					<path d="M1 1L7 7L13 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
		</div>
	</header>
</template>

<style scope lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.header {
		align-items: center;
		display: flex;	
		justify-content: space-between;
		padding-bottom: 1.56vw;

		&__title {
			@include title;
			font-size: 2.08vw;
		}

		&__right {
			align-items: center;
			display: flex;
		}

		&__button {
			@include subtitle;
			align-items: center;
			background: transparent;
			border: 0.05vw solid $--secondary-text;
			border-radius: 0.52vw;
			color: $--primary-text;
			display: flex;
			gap: 0.52vw;
			padding: 0.52vw 1.3vw;
			margin-right: 1.56vw;
		}

		&__notify {
			cursor: pointer;
			margin-right: 1.04vw;

			& svg {
				height: 1.25vw;
				width: 1.25vw;
			}
		}

		&__account {
			align-items: center;
			border-left: 0.05vw solid $--secondary-text;
			cursor: pointer;
			display: flex;
			gap: 0.52vw;
			padding-left: 1.04vw;
		}

		&__wrapper {
			height: 2.08vw;
			width: 2.08vw;
		}

		&__nickname {
			@include subtitle;
		}

		&__icon {
			margin-left: 0.26vw;
		}
	}
</style>