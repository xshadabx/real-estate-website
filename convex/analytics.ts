import { query } from "./_generated/server";
import { v } from "convex/values";

// Get user statistics
export const getUserStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Get user's collections count
    const collections = await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // Get user's messages count
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // Get total properties in all collections
    const totalProperties = collections.reduce(
      (sum, collection) => sum + collection.propertyIds.length,
      0
    );

    return {
      collectionsCount: collections.length,
      messagesCount: messages.length,
      totalPropertiesInCollections: totalProperties,
      lastActivity: messages.length > 0 ? Math.max(...messages.map(m => m.timestamp)) : null,
    };
  },
});

// Get platform statistics
export const getPlatformStats = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const properties = await ctx.db.query("properties").collect();
    const messages = await ctx.db.query("messages").collect();
    const collections = await ctx.db.query("collections").collect();

    const buyers = users.filter(u => u.role === "buyer").length;
    const sellers = users.filter(u => u.role === "seller").length;
    const featuredProperties = properties.filter(p => p.featured).length;

    return {
      totalUsers: users.length,
      totalBuyers: buyers,
      totalSellers: sellers,
      totalProperties: properties.length,
      featuredProperties,
      totalMessages: messages.length,
      totalCollections: collections.length,
    };
  },
});

// Get user activity
export const getUserActivity = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(10);

    const collections = await ctx.db
      .query("collections")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .take(5);

    return {
      recentMessages: messages,
      recentCollections: collections,
    };
  },
});

// Get property views/analytics
export const getPropertyAnalytics = query({
  args: { propertyId: v.id("properties") },
  handler: async (ctx, args) => {
    // Get all collections and filter those containing this property
    const allCollections = await ctx.db.query("collections").collect();
    const collections = allCollections.filter(c => 
      c.propertyIds.includes(args.propertyId)
    );

    return {
      timesAddedToCollections: collections.length,
      collectionsContaining: collections.map(c => ({
        id: c._id,
        name: c.name,
        userId: c.userId,
      })),
    };
  },
});
