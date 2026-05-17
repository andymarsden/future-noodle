import { generateId, wait } from "$lib/utils";
export class Message {
  constructor({
    id = generateId(),
    content = {},
    role = "user",
    state = "pending",
    conversationId = null,
    activeFlow = null,
    createdAt = new Date(),
  } = {}) {
    this.id = id;
    this.content = content;
    this.role = role;
    this.state = state;
    this.conversationId = conversationId;
    this.activeFlow = activeFlow;
    this.createdAt = createdAt;
  }
}