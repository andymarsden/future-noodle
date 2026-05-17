import { generateId, wait } from "$lib/utils";
export class Message {
  constructor({
    id = generateId(),
    content = {},
    role = "user",
    state = "pending",
    conversationId,
    activeFlow = null,
    createdAt = new Date(),
    options = []
  } = {}) {
    if (!conversationId) {
      throw new Error("conversationId is required");
    }
    this.id = id;
    this.content = content;
    this.role = role;
    this.state = state;
    this.conversationId = conversationId;
    this.activeFlow = activeFlow;
    this.createdAt = createdAt;
    this.options = options;
  }
}

export class Option {
  constructor({
    id = generateId(),
    label = "",
    value = "",
  } = {}) {
    this.id = id;
    this.label = label;
    this.value = value;
  }
}