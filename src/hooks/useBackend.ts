'use client';

import { useState, useEffect } from 'react';
import { backend, Property, User, Message } from '@/lib/backend';

// Properties hook
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await backend.getProperties();
        setProperties(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const createProperty = async (property: Omit<Property, 'id' | 'createdAt'>) => {
    try {
      const newProperty = await backend.createProperty(property);
      setProperties(prev => [...prev, newProperty]);
      return newProperty;
    } catch (err) {
      setError('Failed to create property');
      throw err;
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const updatedProperty = await backend.updateProperty(id, updates);
      if (updatedProperty) {
        setProperties(prev => 
          prev.map(p => p.id === id ? updatedProperty : p)
        );
      }
      return updatedProperty;
    } catch (err) {
      setError('Failed to update property');
      throw err;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const success = await backend.deleteProperty(id);
      if (success) {
        setProperties(prev => prev.filter(p => p.id !== id));
      }
      return success;
    } catch (err) {
      setError('Failed to delete property');
      throw err;
    }
  };

  return {
    properties,
    loading,
    error,
    createProperty,
    updateProperty,
    deleteProperty,
    refetch: () => {
      setLoading(true);
      backend.getProperties().then(data => {
        setProperties(data);
        setLoading(false);
      });
    }
  };
}

// Featured properties hook
export function useFeaturedProperties() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await backend.getFeaturedProperties();
        setFeaturedProperties(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured properties');
        console.error('Error fetching featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { featuredProperties, loading, error };
}

// Property search hook
export function usePropertySearch() {
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const results = await backend.searchProperties(query);
      setSearchResults(results);
      setError(null);
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    searchResults,
    loading,
    error,
    search
  };
}

// AI Chat hook
export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string, userId: string = 'user-1') => {
    try {
      setLoading(true);
      
      // Add user message
      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        userId,
        content,
        isAI: false,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Get AI response
      const aiResponse = await backend.sendAIMessage(content);
      
      // Add AI message
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        userId,
        content: aiResponse,
        isAI: true,
        timestamp: Date.now() + 1000,
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setError(null);
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages
  };
}

// Users hook
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await backend.getUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (user: Omit<User, 'id' | 'createdAt'>) => {
    try {
      const newUser = await backend.createUser(user);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError('Failed to create user');
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    refetch: () => {
      setLoading(true);
      backend.getUsers().then(data => {
        setUsers(data);
        setLoading(false);
      });
    }
  };
}
