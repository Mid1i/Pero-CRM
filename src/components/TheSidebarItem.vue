<script setup lang="ts">
	import {RouterLink, useRouter} from "vue-router";
	

	defineProps<{
		title: string,
		iconURL: string,
		link: string
	}>();

	const router = useRouter();
</script>


<template>
	<li class="aside-bar__menu-item item">
		<routerLink :class="['item__link', {active: router.currentRoute.value.path === link}]" :to="link">
			<div class="item__wrapper">
				<img :alt="title" class="item__image image" :src="`/src/assets/images/Sidebar/${iconURL}`"/>
			</div>
			<span class="item__text">{{ title }}</span>
		</routerLink>
	</li>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss"; 


	.item {
		width: 100%;

		&__link {
			border-radius: 0.52vw;

			align-items: center;
			display: flex;
			gap: 10px;

			padding: 0.42vw 0.52vw;
			overflow: hidden;
			
			transition: all 0.2s linear;
			width: 100%;

			&.active {
				background: $--blue;
			}
		}

		&__wrapper {
			flex: 0 0 auto;
			
			height: 1.25vw;
			width: 1.25vw;
		}

		&__text {
			@include subtitle;
			transition: all 0.2s linear;
		}
	}

	@media(hover: hover) {
		.item__link:not(.active):hover {
			background: $--tertiary-back;
		}

		.item__link:not(.active):active {
			background: $--primary-back;
		}
	}
</style>