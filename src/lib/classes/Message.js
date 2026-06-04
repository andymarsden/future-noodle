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
    options = [],
    isValidated = null,
    memoryId = null,
    summary = null,
    summarySections = [],
    flowId = null,
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
    this.isValidated = isValidated;
    this.memoryId = memoryId;
    this.summary = summary;
    this.summarySections = summarySections;
    this.flowId = flowId;
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