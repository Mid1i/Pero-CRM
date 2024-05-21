<script setup lang="ts">
	import { ref } from "vue";

	const emit = defineEmits<{
		(e: "onSearch", key: string, value: string): void
	}>();

	const searchValue = ref<string>("");
</script>


<template>
	<div class="search">
		<svg 
			class="search__icon" 
			@click="() => $emit('onSearch', 'name', searchValue)"
			fill="none" 
			viewBox="0 0 20 20" 
			height="20" 
			width="20"
		>
			<path d="M19 19L13 13M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		<input 
			class="search__input"
			v-model="searchValue"
			placeholder="Найти"
			@keyup.enter="() => $emit('onSearch', 'name', searchValue)"
			type="text"
		/>
	</div>
</template>


<style scoped lang="scss">
	@import "@/assets/styles/variables.scss";
	@import "@/assets/styles/mixins.scss";

	.search {
		background: $--tertiary-back;
		border-radius: 0.52vw;

		position: relative;

		height: 2.8vw;
		width: 19vw;

		&__input {
			@include subtitle;
			background: transparent;

			font-weight: 600;

			padding: 0.52vw;
			padding-left: 2.7vw;

			height: 100%;
			width: 100%;

			&::placeholder {
				color: $--primary-text;
			}
		}

		&__icon {
			position: absolute;
			left: 0.52vw;
			top: 50%;
			transform: translateY(-50%);

			height: 1.25vw;
			width: 1.25vw;
		}
	}
</style>