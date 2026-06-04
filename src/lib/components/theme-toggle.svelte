<script>
	import { onMount } from "svelte";
	import MoonIcon from "@lucide/svelte/icons/moon";
	import SunIcon from "@lucide/svelte/icons/sun";
	import { Button } from "$lib/components/ui/button/index.js";
import { THEMES, THEME_EVENT, THEME_STORAGE_KEY, applyTheme, getActiveTheme, readStoredTheme, toggleTheme } from "$lib/services/theme.js";
	let { class: className = "" } = $props();
	let theme = $state(THEMES.LIGHT);

	function syncThemeFromDom() {
		theme = getActiveTheme();
	}

	function handleToggle() {
		theme = toggleTheme();
	}

	onMount(() => {
		const storedTheme = readStoredTheme();
		if (storedTheme) {
			applyTheme(storedTheme, { persist: false });
			theme = storedTheme;
		} else {
			theme = getActiveTheme();
		}

		const handleThemeChange = (event) => {
			theme = event.detail?.theme ?? getActiveTheme();
		};

		const handleStorage = (event) => {
			if (event.key !== THEME_STORAGE_KEY) return;
			syncThemeFromDom();
		};

		window.addEventListener(THEME_EVENT, handleThemeChange);
		window.addEventListener("storage", handleStorage);

		return () => {
			window.removeEventListener(THEME_EVENT, handleThemeChange);
			window.removeEventListener("storage", handleStorage);
		};
	});
</script>

<Button
	type="button"
	variant="ghost"
	size="icon-sm"
	class={className}
	onclick={handleToggle}
	aria-label={theme === THEMES.DARK ? "Switch to light mode" : "Switch to dark mode"}
	title={theme === THEMES.DARK ? "Switch to light mode" : "Switch to dark mode"}
>
	{#if theme === THEMES.DARK}
		<SunIcon class="size-4" />
	{:else}
		<MoonIcon class="size-4" />
	{/if}
</Button>
