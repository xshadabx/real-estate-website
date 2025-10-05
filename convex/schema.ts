import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  properties: defineTable({
    title: v.string(),
    price: v.string(),
    location: v.string(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    area: v.string(),
    image: v.string(),
    description: v.string(),
    type: v.string(),
    featured: v.boolean(),
    createdAt: v.number(),
  }),
  
  users: defineTable({
    userId: v.string(), // Auth provider user ID
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("buyer"), v.literal("seller")),
    avatar: v.optional(v.string()),
    createdAt: v.number(),
  }),
  
  messages: defineTable({
    userId: v.id("users"),
    content: v.string(),
    isAI: v.boolean(),
    timestamp: v.number(),
  }),
  
  collections: defineTable({
    userId: v.id("users"),
    name: v.string(),
    propertyIds: v.array(v.id("properties")),
    createdAt: v.number(),
  }),
});
