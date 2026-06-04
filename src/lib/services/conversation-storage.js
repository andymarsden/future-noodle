import { generateId } from "$lib/utils";

const STORAGE_KEY = "future-noodle:conversations";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAllConversations() {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn("Unable to read stored conversations", error);
    return [];
  }
}

function writeAllConversations(conversations) {
  if (!isBrowser()) return conversations;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  return conversations;
}

export function saveConversation(conversationId = generateId(), messages = [], activeFlow = null) {
  const entry = {
    id: conversationId,
    messages: Array.isArray(messages) ? messages : [],
    activeFlow,
    updatedAt: new Date().toISOString(),
  };

  const conversations = readAllConversations();
  const next = [entry, ...conversations.filter((item) => item.id !== conversationId)];
  writeAllConversations(next);

  return entry;
}

export function loadConversation(conversationId) {
  if (!conversationId) return { id: null, messages: [], activeFlow: null };

  return readAllConversations().find((item) => item.id === conversationId) ?? {
    id: conversationId,
    messages: [],
    activeFlow: null,
  };
}

export function listConversations() {
  return readAllConversations().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}
