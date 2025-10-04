import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all properties
export const getProperties = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("properties").collect();
  },
});

// Query to get a specific property by ID
export const getProperty = query({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutation to create a new property
export const createProperty = mutation({
  args: {
    title: v.string(),
    price: v.string(),
    location: v.string(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    area: v.string(),
    image: v.string(),
    description: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const propertyId = await ctx.db.insert("properties", {
      title: args.title,
      price: args.price,
      location: args.location,
      bedrooms: args.bedrooms,
      bathrooms: args.bathrooms,
      area: args.area,
      image: args.image,
      description: args.description,
      type: args.type,
      featured: false,
      createdAt: Date.now(),
    });
    return propertyId;
  },
});

// Mutation to update a property
export const updateProperty = mutation({
  args: {
    id: v.id("properties"),
    title: v.optional(v.string()),
    price: v.optional(v.string()),
    location: v.optional(v.string()),
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    area: v.optional(v.string()),
    image: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

// Mutation to delete a property
export const deleteProperty = mutation({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Query to get featured properties
export const getFeaturedProperties = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("properties")
      .filter((q) => q.eq(q.field("featured"), true))
      .collect();
  },
});

// Query to search properties
export const searchProperties = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const properties = await ctx.db.query("properties").collect();
    return properties.filter(property => 
      property.title.toLowerCase().includes(args.query.toLowerCase()) ||
      property.location.toLowerCase().includes(args.query.toLowerCase()) ||
      property.description.toLowerCase().includes(args.query.toLowerCase())
    );
  },
});
