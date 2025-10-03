'use client';

import { useState, useEffect } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { supabase } from '@/lib/supabase';

export default function SupabaseExample() {
  const { user, loading, signIn, signOut } = useSupabase();
  const [properties, setProperties] = useState<any[]>([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  // Example: Fetch properties from Supabase
  const fetchProperties = async () => {
    setLoadingProperties(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .limit(10);
      
      if (error) {
        console.error('Error fetching properties:', error);
      } else {
        setProperties(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingProperties(false);
    }
  };

  // Example: Sign in with email and password
  const handleSignIn = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    if (error) {
      console.error('Sign in error:', error);
    }
  };

  // Example: Sign out
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Sign out error:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Supabase Integration Example</h2>
      
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button 
            onClick={handleSignOut}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Sign Out
          </button>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Properties</h3>
            {loadingProperties ? (
              <p>Loading properties...</p>
            ) : (
              <div className="grid gap-4">
                {properties.map((property) => (
                  <div key={property.id} className="p-4 border rounded">
                    <h4 className="font-semibold">{property.title}</h4>
                    <p>Price: ${property.price}</p>
                    <p>Location: {property.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Please sign in to view properties.</p>
          <button 
            onClick={() => handleSignIn('test@example.com', 'password')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Sign In (Example)
          </button>
        </div>
      )}
    </div>
  );
}
