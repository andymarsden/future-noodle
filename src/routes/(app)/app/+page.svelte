<script>
    //Svelte

    import { onMount, tick } from "svelte";
    import { page } from "$app/stores";

    //utils
    import { formatTimestamp, wait, generateId, generateShortId } from "$lib/utils.js";

    import AppHeader from "$lib/components/sidenav/app-header.svelte";

    import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";

    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";

    //chat functionality
    import { chat } from "$lib/chat/workings";
    import { loadConversation, saveConversation } from "$lib/services/conversation-storage";

    import MessageUser from "$lib/chat/components/message-user.svelte";
    import MessageAssistant from "$lib/chat/components/message-assistant.svelte";
    import MessageThinking from "$lib/chat/components/message-thinking.svelte";
    import { Message } from "$lib/classes/Message";

    //#region Layout limits
    const MAX_TEXTAREA_HEIGHT = 224;
    // const ASSISTANT_STREAM_WORDS_PER_CHUNK = 2;
    // const ASSISTANT_STREAM_DELAY_MS = 40;
    //#endregion

    //#region Chat state
    let messages = $state([]);
    let draft = $state("");
    let isThinking = $state(false);
    let activeFlow = $state(null);
    let conversationId = $state(null);
    let lastAssistantMessageID = $state(null);
    let routeConversationId = $derived($page.params.conversationId ?? null);
    // let lastAssistantMessageWithOptionsIndex = $derived(
    //     messages.reduce((lastIndex, message, index) => {
    //         if (message.role === "assistant" && Array.isArray(message.options) && message.options.length > 0) {
    //             return index;
    //         }
    //         return lastIndex;
    //     }, -1),
    // );

    //#endregion

    //#region DOM refs
    let textareaRef = $state(null);
    let messageListRef = $state(null);
    //#endregion

    //#region UI helpers
    function autoResizeTextarea() {
        if (!textareaRef) return;

        textareaRef.style.height = "auto";
        const nextHeight = Math.min(
            textareaRef.scrollHeight,
            MAX_TEXTAREA_HEIGHT,
        );
        textareaRef.style.height = `${nextHeight}px`;
        textareaRef.style.overflowY =
            textareaRef.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
    }

    function handleComposerKeydown(event) {
        if (event.key !== "Enter") return;
        if (event.shiftKey) return;

        event.preventDefault();
        void handleSend(event);
    }

    async function scrollToBottom() {
        await tick();
        // if (!messageListRef) return;

        // messageListRef.scrollTo({
        //     top: messageListRef.scrollHeight + 150,
        //     behavior: "smooth",
        // });

        //TODO: find a better way to handle this. This is a bandaid for the fact that the message list doesn't always grow in height as expected when new messages come in, which causes the scroll to not reach the bottom. This ensures we always scroll to the bottom, but it's not ideal.
      window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
});
    }
    //#endregion

    //#region Reactive updates
    $effect(() => {
        draft;
        autoResizeTextarea();
    });

    $effect(() => {
        messages;
    });
    //#endregion

    //#region Lifecycle


    onMount(async () => {
        if (routeConversationId) {
            conversationId = routeConversationId;
            const stored = loadConversation(routeConversationId);
            messages = Array.isArray(stored.messages) ? stored.messages : [];
            activeFlow = stored.activeFlow ?? null;
            lastAssistantMessageID = messages.filter((message) => message.role === "assistant").at(-1)?.id ?? null;
        } else {
            conversationId = generateShortId();
        }

        textareaRef?.focus();
        autoResizeTextarea();
        await scrollToBottom();
    });

    //#endregion

    async function sendMessage(text) {
        const nextDraft = String(text ?? "").trim();
        if (!nextDraft || isThinking) return;

        isThinking = true;

        const userMessage = new Message({
            content: { text: nextDraft },
            role: "user",
            activeFlow,
            conversationId,
        });

        const thinkingMessage = new Message({
            content: { text: "" },
            role: "thinking",
            conversationId,
        });

        messages = await chat.addMessageToList(messages, userMessage, thinkingMessage);
        await scrollToBottom();

        const assistantMessage = await chat.message.send({ message: userMessage });
        lastAssistantMessageID = assistantMessage.id;
        activeFlow = assistantMessage.activeFlow;

        messages = await chat.updateMessage(messages, { ...userMessage }, userMessage.id);
        messages = await chat.updateMessage(messages, assistantMessage, thinkingMessage.id);
        saveConversation(conversationId, messages, activeFlow);
        await scrollToBottom();

        draft = "";
        isThinking = false;
        await tick();
        textareaRef?.focus();
    }

    async function handleSend(event) {
        event.preventDefault();
        await sendMessage(draft);
    }

    async function handleOptionSelect(optionValue) {
        await sendMessage(optionValue);
    }
</script>

<AppHeader
    crumbs={[
        { label: "Sandbox", href: "/app" },
        // { label: "Sandbox", href: "/app/sandbox" },
    ]}
    currentPage="Qrios"
/>

<main
    class="bg-background flex h-dvh min-h-0 flex-1 flex-col"
    aria-label="Chat page"
>
    <section
        class="relative flex min-h-0 flex-1 flex-col"
        aria-label="Conversation"
    >
        <Badge
            variant="outline"
            class="pointer-events-none absolute right-4 top-4 hidden bg-blue-500 text-white dark:bg-blue-600 normal-case text-[12px] tracking-normal sm:inline-flex"
            >{activeFlow ? "flow mode" : "echo mode"} {activeFlow?.name} {activeFlow?.current_step}</Badge
        >

        <!-- <div
            bind:this={messageListRef}
            class="min-h-0 flex-1 overflow-y-auto"
            aria-live="polite"
        > -->
        <div
            bind:this={messageListRef}
            class="min-h-0 flex-1 overflow-y-auto scroll-smooth"
            aria-live="polite"
            id="message-list"
        >
            <div
                class="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 pb-24 md:px-6 md:pb-24"
            >
                {#if messages.length === 0}
                    <div class="flex items-center justify-center py-6">
                        <!-- {#if routeConversationId}
                            <span
                                class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent"
                                aria-label="Loading conversation"
                            ></span>
                        {:else}
                            <p class="text-muted-foreground text-sm">Loading...</p>
                        {/if} -->
                         <span
                                class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent"
                                aria-label="Loading conversation"
                            ></span>
                    </div>
                {/if}

                {#each messages as message, index (message.id)}
                    {#if message.role === "user"}
                        <div class="pb-12">
                            <MessageUser {message} {formatTimestamp} {lastAssistantMessageID} />
                        </div>
                    <!-- {:else if message.role === "assistant" && message.card?.type === "album"}
                        <MessageAlbumCard {message} /> -->
                    {:else if message.role === "thinking"}
                        <MessageThinking {message} />
                    {:else if message.role === "assistant"}
                        <MessageAssistant
                            {message}
                            {lastAssistantMessageID}
                            onOptionSelect={handleOptionSelect}
                        />
                    {/if}
                {/each}
                <!-- {#each messages as message, index (message.id)}
                    {#if message.role === "user"}
                        <div class="pb-12">
                            <MessageUser
                                {message}
                                {formatTimestamp}
                                user={userParam}
                            />
                        </div>
                    {:else if message.role === "assistant" && message.card?.type === "album"}
                        <MessageAlbumCard {message} />
                    {:else if message.role === "assistant" && message.card?.type === "chart"}
                        <MessageChart {message} />
                    {:else if message.role === "assistant"}
                        <MessageAssistant
                            {message}
                            onOptionSelect={handleOptionSelect}
                            isLastMessageWithOptions={index === lastAssistantMessageWithOptionsIndex}
                        />
                    {:else if message.role === "thinking"}
                        <MessageThinking {message} />
                    {/if}
                {/each} -->
            </div>
        </div>

        <div
            class="from-background via-background/95 to-background sticky bottom-0 border-t bg-linear-to-t px-3 pb-3 pt-4 md:px-6 md:pb-2"
        >
            <form
                class="relative mx-auto w-full max-w-3xl"
                onsubmit={handleSend}
            >
                <div
                    class="bg-card ring-ring/30 focus-within:ring-ring rounded-3xl border p-2 shadow-sm transition-shadow focus-within:ring-2"
                >
                    <div class="flex items-end gap-2">
                        <Textarea
                            id="porto-input"
                            bind:ref={textareaRef}
                            bind:value={draft}
                            onkeydown={handleComposerKeydown}
                            rows="1"
                            class="h-9 max-h-56 min-h-0 flex-1 resize-none border-0 bg-transparent px-3 py-1.5 text-base shadow-none focus-visible:ring-0 md:text-sm"
                            placeholder="Type a message..."
                            aria-describedby="composer-hint"
                            disabled={isThinking}
                        />
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                {#snippet child({ props })}
                                    <Button
                                        variant="ghost"
                                        size="icon-sm"
                                        class="rounded-full"
                                        disabled={isThinking}
                                        {...props}
                                    >
                                        <ChevronsUpDownIcon class="size-4" />
                                    </Button>
                                {/snippet}
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content
                                side="top"
                                align="end"
                                sideOffset={8}
                                class="w-40 rounded-lg"
                            >
                                <DropdownMenu.Item>Live 1.5.2</DropdownMenu.Item
                                >
                                <DropdownMenu.Item
                                    >Preview 2.3</DropdownMenu.Item
                                >
                                <DropdownMenu.Item>Test 2.6.1</DropdownMenu.Item
                                >
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                        <Button
                            type="submit"
                            size="icon-sm"
                            class="rounded-full"
                            disabled={!draft.trim() || isThinking}
                            aria-label={isThinking
                                ? "Assistant is thinking"
                                : "Send message"}
                        >
                            {#if isThinking}
                                <span
                                    class="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
                                    aria-hidden="true"
                                ></span>
                            {:else}
                                ↑
                            {/if}
                        </Button>
                    </div>
                </div>
                <p
                    id="composer-hint"
                    class="text-muted-foreground mt-2 px-2 text-xs"
                >
                    Enter sends. Shift + Enter adds a new line.
                </p>
            </form>
        </div>
    </section>
</main>
