<script>
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Separator } from "$lib/components/ui/separator";

	import {
		FileDown,
		CircleHelp,
		User,
		HeartPulse,
		MessageSquare,
		ListChecks
	} from "lucide-svelte";

	let { message = null } = $props();
	let conversationUrl = $derived(
		message?.conversationId
			? `http://stat.to/app/${message.conversationId}`
			: ""
	);
	let summarySections = $derived(Array.isArray(message?.summarySections) ? message.summarySections : []);
	let summaryText = $derived(typeof message?.summary === "string" ? message.summary : "");
</script>

<Card.Root class="mx-auto w-full max-w-4xl">
	<Card.Header>
		<div class="flex items-start justify-between gap-6">
			<div>
				<Card.Title class="text-2xl">Qrios Summary</Card.Title>
				<Card.Description class="mt-2">This is a summary of your form.</Card.Description>

				<div class="mt-4 space-y-1 text-sm text-muted-foreground">
					<p><strong>Conversation ID:</strong> {message?.conversationId ?? "—"}</p>
					<p>
						<strong>Conversation URL:</strong>
						{#if conversationUrl}
							<a href={conversationUrl} target="_blank" rel="noopener noreferrer">{conversationUrl}</a>
						{:else}
							—
						{/if}
					</p>
				</div>
			</div>

			<Button class="bg-green-600 text-white hover:bg-green-700">
				<FileDown class="mr-2 h-4 w-4" />
				Export to PDF
			</Button>
		</div>
		<Separator class="mt-4 mb-0" />
	</Card.Header>

	<Card.Content class="space-y-8">
		{#if summaryText && summarySections.length === 0}
			<div class="rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground whitespace-pre-wrap">
				{summaryText}
			</div>
		{/if}

		{#if summarySections.length}
			{#each summarySections as section, index (section.id || `${section.title}-${index}`)}
				<section class="space-y-4">
					<div class="flex items-center gap-2">
						{#if String(section.title || "").toLowerCase().includes("details")}
							<CircleHelp class="h-5 w-5" />
						{:else if String(section.title || "").toLowerCase().includes("about")}
							<User class="h-5 w-5" />
						{:else if String(section.title || "").toLowerCase().includes("well")}
							<HeartPulse class="h-5 w-5" />
						{:else if String(section.title || "").toLowerCase().includes("next")}
							<ListChecks class="h-5 w-5" />
						{:else}
							<MessageSquare class="h-5 w-5" />
						{/if}
						<h2 class="text-lg font-semibold">{section.title}</h2>
					</div>

				<div class="space-y-3">
					{#each section.answers ?? [] as item (item.id)}
						<div>
							<p>
								<span class="font-medium text-muted-foreground">{item.label}</span>
								<span class="font-medium text-foreground"> {item.answer}</span>
							</p>
						</div>
					{/each}
				</div>
				</section>

				{#if index < summarySections.length - 1}
					<Separator class="my-6" />
				{/if}
			{/each}
		{:else}
			<p class="text-sm text-muted-foreground">No answers were captured.</p>
		{/if}
	</Card.Content>
</Card.Root>