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
</script>

<Card.Root class="mx-auto w-full max-w-4xl">
	<Card.Header>
		<div class="flex items-start justify-between gap-6">
			<div>
				<Card.Title class="text-2xl">
					Qrios Summary
				</Card.Title>

				<Card.Description class="mt-2">
					This is a summary of your form.
				</Card.Description>

				<div class="mt-4 space-y-1 text-sm text-muted-foreground">
					<p><strong>Conversation ID:</strong> 5678</p>
					<p><strong>Conversation URL:</strong> https://www.stat.co.uk</p>
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

		<!-- Details -->
		<section class="space-y-4">
			<div class="flex items-center gap-2">
				<CircleHelp class="h-5 w-5" />
				<h2 class="text-lg font-semibold">Details</h2>
			</div>

			<div class="space-y-3">
				<div>
					<p>
	                <span class="font-medium text-muted-foreground">Hub attended:</span>
	                <span class="font-medium text-foreground"> The Cottage</span>
                    </p>
				</div>

				<div>
					<p>
						<span class="font-medium text-muted-foreground">Date attended:</span>
						<span class="font-medium text-foreground"> 29 June 2026</span>
					</p>
				</div>

				<div>
					<p>
						<span class="font-medium text-muted-foreground">Reason for visit:</span>
						<span class="font-medium text-foreground"> This is where a much longer answer can go. It will wrap naturally onto multiple lines without breaking the layout.</span>
					</p>
				</div>
			</div>
		</section>

		<Separator class="my-6" />

		<!-- About You -->
		<section class="space-y-4">
			<div class="flex items-center gap-2">
				<User class="h-5 w-5" />
				<h2 class="text-lg font-semibold">About You</h2>
			</div>

			<div class="space-y-3">
				<div>
					<p>
						<span class="font-medium text-muted-foreground">Age band:</span>
						<span class="font-medium text-foreground"> 25–34</span>
					</p>
				</div>

				<div>
					<p>
						<span class="font-medium text-muted-foreground">Gender:</span>
						<span class="font-medium text-foreground"> Female</span>
					</p>
				</div>

				<div>
					<p>
						<span class="font-medium text-muted-foreground">Ethnicity:</span>
						<span class="font-medium text-foreground"> White British</span>
					</p>
				</div>
			</div>
		</section>

		<Separator class="my-6" />

		<!-- Wellbeing -->
		<section class="space-y-4">
			<div class="flex items-center gap-2">
				<HeartPulse class="h-5 w-5" />
				<h2 class="text-lg font-semibold">Wellbeing</h2>
			</div>

			<div class="space-y-3">
				<div>
					<p>
						<span class="font-medium text-muted-foreground">How are you coping?</span>
						<span class="font-medium text-foreground"> Good</span>
					</p>
				</div>

				<div>
					<p>
						<span class="font-medium text-muted-foreground">Do you feel supported?</span>
						<span class="font-medium text-foreground"> Yes</span>
					</p>
				</div>
			</div>
		</section>

		<Separator class="my-6" />

		<!-- Next Steps -->
		<section class="space-y-4">
			<div class="flex items-center gap-2">
				<ListChecks class="h-5 w-5" />
				<h2 class="text-lg font-semibold">Next Steps</h2>
			</div>

			<div class="space-y-3">
				<div>
					<p>
						<span class="font-medium text-muted-foreground">Actions:</span>
						<span class="font-medium text-foreground"> Information, Advice and Guidance Offered<br />
						Connection to other Council Service<br />
						No Further Action</span>
					</p>
				</div>
			</div>
		</section>

        <Separator class="my-6" />

        		<!-- Experience -->
		<section class="space-y-4">
			<div class="flex items-center gap-2">
				<MessageSquare class="h-5 w-5" />
				<h2 class="text-lg font-semibold">Experience</h2>
			</div>

			<div class="space-y-3">
				<div>
					<p>
						<span class="font-medium text-muted-foreground">Venue accessibility:</span>
						<span class="font-medium text-foreground"> Excellent</span>
					</p>
				</div>

				<div>
					<p>
						<span class="font-medium text-muted-foreground">Comments:</span>
						<span class="font-medium text-foreground"> The staff were extremely helpful and explained everything clearly. The environment was welcoming and easy to access.</span>
					</p>
				</div>
			</div>
		</section>


	</Card.Content>
</Card.Root>