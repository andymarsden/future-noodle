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
	let isDownloading = $state(false);

	async function downloadSummaryPdf() {
		if (!message?.conversationId) return;

		isDownloading = true;

		try {
			const { jsPDF } = await import("jspdf");
			const QRCode = (await import("qrcode")).default;
			const doc = new jsPDF({ unit: "pt", format: "a4" });
			const pageWidth = doc.internal.pageSize.getWidth();
			const pageHeight = doc.internal.pageSize.getHeight();
			const marginX = 48;
			const maxWidth = pageWidth - marginX * 2;
			let cursorY = 56;

			const ensureSpace = (requiredHeight = 24) => {
				if (cursorY + requiredHeight <= pageHeight - 48) return;
				doc.addPage();
				cursorY = 56;
			};

			const writeBlock = (text, options = {}) => {
				const {
					fontSize = 11,
					fontStyle = "normal",
					lineHeight = 16,
					gapAfter = 8,
				} = options;

				doc.setFont("helvetica", fontStyle);
				doc.setFontSize(fontSize);
				const lines = doc.splitTextToSize(String(text ?? ""), maxWidth);
				ensureSpace(lines.length * lineHeight + gapAfter);
				doc.text(lines, marginX, cursorY);
				cursorY += lines.length * lineHeight + gapAfter;
			};

			writeBlock("QRIOS Summary", { fontSize: 18, fontStyle: "bold", lineHeight: 22, gapAfter: 12 });
			writeBlock(`Conversation ID: ${message.conversationId}`, { fontSize: 10, gapAfter: 4 });
			writeBlock(`Conversation URL: ${conversationUrl}`, { fontSize: 10, gapAfter: 16 });

			if (summaryText && summarySections.length === 0) {
				writeBlock(summaryText, { fontSize: 11, lineHeight: 15, gapAfter: 16 });
			}

			if (summarySections.length) {
				for (const section of summarySections) {
					writeBlock(section.title, { fontSize: 13, fontStyle: "bold", lineHeight: 18, gapAfter: 10 });

					for (const item of section.answers ?? []) {
						writeBlock(item.label, { fontSize: 10, fontStyle: "bold", lineHeight: 14, gapAfter: 4 });
						writeBlock(item.answer, { fontSize: 11, lineHeight: 16, gapAfter: 10 });
					}
				}
			} else if (!summaryText) {
				writeBlock("No answers were captured.", { fontSize: 11 });
			}

			const qrDataUrl = await QRCode.toDataURL(conversationUrl, {
				margin: 1,
				width: 256,
			});

			const qrSize = 110;
			const qrX = (pageWidth - qrSize) / 2;
			const qrY = pageHeight - 48 - qrSize;

			if (cursorY > qrY - 48) {
				doc.addPage();
			}

			doc.setFont("helvetica", "normal");
			doc.setFontSize(10);
			doc.text("Scan to open this conversation", pageWidth / 2, qrY - 10, { align: "center" });
			doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

			doc.save(`qrios-summary-${message.conversationId}.pdf`);
		} finally {
			isDownloading = false;
		}
	}
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

			<Button
				class="bg-green-600 text-white hover:bg-green-700"
				onclick={downloadSummaryPdf}
				disabled={isDownloading}
			>
				<FileDown class="mr-2 h-4 w-4" />
				{isDownloading ? "Preparing PDF..." : "Export to PDF"}
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
   						 <div class="space-y-1">
       					 <p class="font-medium text-muted-foreground">{item.label}</p>
       					 <p class="font-medium text-foreground">{item.answer}</p>
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