<script>
	import favicon from '$lib/assets/favicon.svg';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sid$lib/components/shadcn/sidebar/index.js= $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>STAT</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>