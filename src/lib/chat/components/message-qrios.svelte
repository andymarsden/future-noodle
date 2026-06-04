<script>
	import { Button } from "$lib/components/ui/button/index.js";

	let { message } = $props();
	let conversationUrl = $derived("http://stat.to/app/" + message.conversationId);
	let isDownloading = $state(false);

	async function downloadSummaryPdf() {
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

			if (message.summarySections?.length) {
				for (const section of message.summarySections) {
					writeBlock(section.title, { fontSize: 13, fontStyle: "bold", lineHeight: 18, gapAfter: 10 });

					for (const item of section.answers ?? []) {
						writeBlock(item.label, { fontSize: 10, fontStyle: "bold", lineHeight: 14, gapAfter: 4 });
						writeBlock(item.answer, { fontSize: 11, lineHeight: 16, gapAfter: 10 });
					}
				}
			} else {
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

<article class="text-foreground text-[15px] leading-7">
	<p class="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
		Qrios Summary
	</p>

	<div class="bg-card rounded-2xl border p-4">
		<div class="flex flex-wrap items-start justify-between gap-3">
			<div>
				<h3 class="text-base font-semibold">QRIOS Summary</h3>
				<p> Conversation Id: {message.conversationId}</p>
				<p>
					Conversation url:
					<a href={conversationUrl} target="_blank" rel="noopener noreferrer">{conversationUrl}</a>
				</p>
			</div>

			<Button
				variant="outline"
				size="sm"
				class="cursor-pointer"
				onclick={downloadSummaryPdf}
				disabled={isDownloading}
			>
				{isDownloading ? "Preparing PDF..." : "Download PDF"}
			</Button>
		</div>
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
