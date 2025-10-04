'use client';

import { useState, useEffect } from 'react';
import { database, Property, User, Message, Collection } from '@/lib/database';

// Properties hook
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await database.getProperties();
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
      const newProperty = await database.createProperty(property);
      setProperties(prev => [...prev, newProperty]);
      return newProperty;
    } catch (err) {
      setError('Failed to create property');
      throw err;
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const updatedProperty = await database.updateProperty(id, updates);
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
      const success = await database.deleteProperty(id);
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
      database.getProperties().then(data => {
        setProperties(data);
        setLoading(false);
      });
    }
  };
}

// Property hook
export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await database.getProperty(id);
        setProperty(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch property');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
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
        const data = await database.getUsers();
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
      const newUser = await database.createUser(user);
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
      database.getUsers().then(data => {
        setUsers(data);
        setLoading(false);
      });
    }
  };
}

// Messages hook
export function useMessages(userId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await database.getMessages(userId);
        setMessages(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch messages');
        console.error('Error fetching messages:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  const createMessage = async (message: Omit<Message, 'id' | 'timestamp'>) => {
    try {
      const newMessage = await database.createMessage(message);
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      setError('Failed to create message');
      throw err;
    }
  };

  return {
    messages,
    loading,
    error,
    createMessage,
    refetch: () => {
      setLoading(true);
      database.getMessages(userId).then(data => {
        setMessages(data);
        setLoading(false);
      });
    }
  };
}

// Collections hook
export function useCollections(userId: string) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        const data = await database.getCollections(userId);
        setCollections(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch collections');
        console.error('Error fetching collections:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchCollections();
    }
  }, [userId]);

  const createCollection = async (collection: Omit<Collection, 'id' | 'createdAt'>) => {
    try {
      const newCollection = await database.createCollection(collection);
      setCollections(prev => [...prev, newCollection]);
      return newCollection;
    } catch (err) {
      setError('Failed to create collection');
      throw err;
    }
  };

  return {
    collections,
    loading,
    error,
    createCollection,
    refetch: () => {
      setLoading(true);
      database.getCollections(userId).then(data => {
        setCollections(data);
        setLoading(false);
      });
    }
  };
}

// Search hook
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
      const results = await database.searchProperties(query);
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

// Featured properties hook
export function useFeaturedProperties() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await database.getFeaturedProperties();
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
