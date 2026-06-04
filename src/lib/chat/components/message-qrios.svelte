<script>
	let { message } = $props();
    let conversationUrl = "http://stat.to/app/" + message.conversationId;
</script>

<article class="text-foreground text-[15px] leading-7">
	<p class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
		Qrios Summary
	</p>

	<div class="bg-card rounded-2xl border p-4">
		<h3 class="text-base font-semibold">QRIOS Summary</h3>
        <p> Conversation Id: {message.conversationId}</p>
        <p> Conversation url: <a href={conversationUrl} target="_blank" rel="noopener noreferrer">{conversationUrl}</a></p>
		{#if message.summarySections?.length}
			<div class="mt-4 space-y-4">
				{#each message.summarySections as section (section.id)}
					<section class="rounded-xl border p-3">
						<h4 class="text-sm font-semibold">{section.title}</h4>

						<dl class="mt-2 space-y-2">
							{#each section.answers as item (item.id)}
								<div>
									<dt class="text-muted-foreground text-xs font-medium uppercase tracking-wide">
										{item.label}
									</dt>
									<dd class="mt-0.5 text-sm whitespace-pre-wrap wrap-break-word">{item.answer}</dd>
								</div>
							{/each}
						</dl>
					</section>
				{/each}
			</div>
		{:else}
			<p class="text-muted-foreground mt-2 text-sm">No answers were captured.</p>
		{/if}
	</div>
</article>
