'use client';

import { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

// User hooks
export function useUsers() {
  const users = useQuery(api.users.getUsers);
  const createUser = useMutation(api.users.createUser);
  const updateUser = useMutation(api.users.updateUser);
  const deleteUser = useMutation(api.users.deleteUser);

  return {
    users: users || [],
    loading: users === undefined,
    createUser,
    updateUser,
    deleteUser,
  };
}

export function useUser(id: Id<"users">) {
  const user = useQuery(api.users.getUser, { id });
  const updateUser = useMutation(api.users.updateUser);
  const deleteUser = useMutation(api.users.deleteUser);

  return {
    user,
    loading: user === undefined,
    updateUser,
    deleteUser,
  };
}

export function useUserByEmail(email: string) {
  const user = useQuery(api.users.getUserByEmail, { email });
  return {
    user,
    loading: user === undefined,
  };
}

export function useUsersByRole(role: "buyer" | "seller") {
  const users = useQuery(api.users.getUsersByRole, { role });
  return {
    users: users || [],
    loading: users === undefined,
  };
}

export function useSearchUsers(query: string) {
  const users = useQuery(api.users.searchUsers, { query });
  return {
    users: users || [],
    loading: users === undefined,
  };
}

// Message hooks
export function useMessages(userId: Id<"users">) {
  const messages = useQuery(api.messages.getMessages, { userId });
  const createMessage = useMutation(api.messages.createMessage);
  const deleteMessage = useMutation(api.messages.deleteMessage);
  const clearMessages = useMutation(api.messages.clearUserMessages);

  return {
    messages: messages || [],
    loading: messages === undefined,
    createMessage,
    deleteMessage,
    clearMessages,
  };
}

export function useRecentMessages(userId: Id<"users">) {
  const messages = useQuery(api.messages.getRecentMessages, { userId });
  return {
    messages: messages || [],
    loading: messages === undefined,
  };
}

export function useAIMessages(userId: Id<"users">) {
  const messages = useQuery(api.messages.getAIMessages, { userId });
  return {
    messages: messages || [],
    loading: messages === undefined,
  };
}

export function useUserMessages(userId: Id<"users">) {
  const messages = useQuery(api.messages.getUserMessages, { userId });
  return {
    messages: messages || [],
    loading: messages === undefined,
  };
}

// Collection hooks
export function useUserCollections(userId: Id<"users">) {
  const collections = useQuery(api.collections.getUserCollections, { userId });
  const createCollection = useMutation(api.collections.createCollection);
  const updateCollection = useMutation(api.collections.updateCollection);
  const deleteCollection = useMutation(api.collections.deleteCollection);

  return {
    collections: collections || [],
    loading: collections === undefined,
    createCollection,
    updateCollection,
    deleteCollection,
  };
}

export function useCollection(id: Id<"collections">) {
  const collection = useQuery(api.collections.getCollection, { id });
  const updateCollection = useMutation(api.collections.updateCollection);
  const deleteCollection = useMutation(api.collections.deleteCollection);

  return {
    collection,
    loading: collection === undefined,
    updateCollection,
    deleteCollection,
  };
}

export function useAddPropertyToCollection() {
  const addProperty = useMutation(api.collections.addPropertyToCollection);
  const removeProperty = useMutation(api.collections.removePropertyFromCollection);

  return {
    addProperty,
    removeProperty,
  };
}

// Analytics hooks
export function useUserStats(userId: Id<"users">) {
  const stats = useQuery(api.analytics.getUserStats, { userId });
  return {
    stats,
    loading: stats === undefined,
  };
}

export function usePlatformStats() {
  const stats = useQuery(api.analytics.getPlatformStats);
  return {
    stats,
    loading: stats === undefined,
  };
}

export function useUserActivity(userId: Id<"users">) {
  const activity = useQuery(api.analytics.getUserActivity, { userId });
  return {
    activity,
    loading: activity === undefined,
  };
}

export function usePropertyAnalytics(propertyId: Id<"properties">) {
  const analytics = useQuery(api.analytics.getPropertyAnalytics, { propertyId });
  return {
    analytics,
    loading: analytics === undefined,
  };
}

// Property hooks
export function useProperties() {
  const properties = useQuery(api.properties.getProperties);
  const createProperty = useMutation(api.properties.createProperty);
  const updateProperty = useMutation(api.properties.updateProperty);
  const deleteProperty = useMutation(api.properties.deleteProperty);

  return {
    properties: properties || [],
    loading: properties === undefined,
    createProperty,
    updateProperty,
    deleteProperty,
  };
}

export function useFeaturedProperties() {
  const properties = useQuery(api.properties.getFeaturedProperties);
  return {
    featuredProperties: properties || [],
    loading: properties === undefined,
  };
}

export function usePropertySearch(query: string) {
  const searchResults = useQuery(api.properties.searchProperties, { query });
  
  return {
    searchResults: searchResults || [],
    loading: searchResults === undefined,
  };
}

// AI Chat hook with Convex
export function useAIChat(userId: Id<"users">) {
  const { messages, createMessage, clearMessages } = useMessages(userId);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      
      // Add user message
      await createMessage({
        userId,
        content,
        isAI: false,
      });
      
      // Simulate AI response
      setTimeout(async () => {
        const aiResponses = [
          "I'd be happy to help you find the perfect property! What's your budget range?",
          "Based on your preferences, I recommend checking out our featured properties.",
          "That's a great location! I have several properties in that area that might interest you.",
          "I can help you compare different properties and their features.",
          "Let me know if you'd like to schedule a viewing for any of these properties.",
          "I can provide more details about the neighborhood and local amenities.",
          "Would you like me to save this property to your favorites?",
          "I can help you understand the financing options available.",
        ];
        
        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        await createMessage({
          userId,
          content: randomResponse,
          isAI: true,
        });
        
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    clearMessages,
    isLoading,
  };
}
