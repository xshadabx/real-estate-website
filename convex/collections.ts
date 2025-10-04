import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get collections for a user
export const getUserCollections = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
  },
});

// Get a specific collection
export const getCollection = query({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create new collection
export const createCollection = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    propertyIds: v.array(v.id("properties")),
  },
  handler: async (ctx, args) => {
    const collectionId = await ctx.db.insert("collections", {
      userId: args.userId,
      name: args.name,
      propertyIds: args.propertyIds,
      createdAt: Date.now(),
    });

    return collectionId;
  },
});

// Update collection
export const updateCollection = mutation({
  args: {
    id: v.id("collections"),
    name: v.optional(v.string()),
    propertyIds: v.optional(v.array(v.id("properties"))),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return await ctx.db.get(id);
  },
});

// Delete collection
export const deleteCollection = mutation({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Add property to collection
export const addPropertyToCollection = mutation({
  args: {
    collectionId: v.id("collections"),
    propertyId: v.id("properties"),
  },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    const updatedPropertyIds = [...collection.propertyIds, args.propertyId];
    await ctx.db.patch(args.collectionId, {
      propertyIds: updatedPropertyIds,
    });

    return await ctx.db.get(args.collectionId);
  },
});

// Remove property from collection
export const removePropertyFromCollection = mutation({
  args: {
    collectionId: v.id("collections"),
    propertyId: v.id("properties"),
  },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }

    const updatedPropertyIds = collection.propertyIds.filter(
      (id) => id !== args.propertyId
    );
    await ctx.db.patch(args.collectionId, {
      propertyIds: updatedPropertyIds,
    });

    return await ctx.db.get(args.collectionId);
  },
});

// Get collections containing a specific property
export const getCollectionsWithProperty = query({
  args: { propertyId: v.id("properties") },
  handler: async (ctx, args) => {
    const allCollections = await ctx.db.query("collections").collect();
    return allCollections.filter(c => 
      c.propertyIds.includes(args.propertyId)
    );
  },
});
