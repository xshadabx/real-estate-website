import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get messages for a user
export const getMessages = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
  },
});

// Get recent messages for a user (last 50)
export const getRecentMessages = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(50);
  },
});

// Create new message
export const createMessage = mutation({
  args: {
    userId: v.id("users"),
    content: v.string(),
    isAI: v.boolean(),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      userId: args.userId,
      content: args.content,
      isAI: args.isAI,
      timestamp: Date.now(),
    });

    return messageId;
  },
});

// Delete message
export const deleteMessage = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Clear all messages for a user
export const clearUserMessages = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
    
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }
  },
});

// Get AI messages only
export const getAIMessages = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("isAI"), true)
        )
      )
      .order("desc")
      .collect();
  },
});

// Get user messages only
export const getUserMessages = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => 
        q.and(
          q.eq(q.field("userId"), args.userId),
          q.eq(q.field("isAI"), false)
        )
      )
      .order("desc")
      .collect();
  },
});
