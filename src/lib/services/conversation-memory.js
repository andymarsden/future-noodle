import { generateId } from "$lib/utils";

const STORAGE_KEY = "future-noodle:conversation-memory";

function isBrowser() {
	return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAllMemories() {
	if (!isBrowser()) return [];

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch (error) {
		console.warn("Unable to read conversation memory", error);
		return [];
	}
}

function writeAllMemories(memories) {
	if (!isBrowser()) return memories;

	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
	return memories;
}

export function saveConversationMemory(entry = {}) {
	const memory = {
		id: entry.id ?? generateId(),
		conversationId: entry.conversationId ?? null,
		flowId: entry.flowId ?? null,
		flowName: entry.flowName ?? null,
		summary: entry.summary ?? "",
		answers: entry.answers ?? [],
		createdAt: entry.createdAt ?? new Date().toISOString(),
		updatedAt: entry.updatedAt ?? new Date().toISOString(),
	};

	const memories = readAllMemories();
	const nextMemories = [memory, ...memories.filter((item) => item.id !== memory.id)];
	writeAllMemories(nextMemories);

	return memory;
}

export function getConversationMemory(memoryId) {
	if (!memoryId) return null;
	return readAllMemories().find((item) => item.id === memoryId) ?? null;
}

export function listConversationMemories() {
	return readAllMemories().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
