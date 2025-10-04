'use client';

import { useState } from 'react';
import { useUsers, useProperties, useUserStats, usePlatformStats } from '@/hooks/useConvex';
import { Id } from '../../convex/_generated/dataModel';

export default function DataViewer() {
  const [activeTab, setActiveTab] = useState('users');
  
  // Get all data from Convex
  const { users, loading: usersLoading } = useUsers();
  const { properties, loading: propertiesLoading } = useProperties();
  const { stats: platformStats, loading: platformLoading } = usePlatformStats();

  const tabs = [
    { id: 'users', label: 'Users', count: users.length },
    { id: 'properties', label: 'Properties', count: properties.length },
    { id: 'platform', label: 'Platform Stats', count: 1 },
  ];

  if (usersLoading || propertiesLoading || platformLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold">Loading Data from Convex Database...</h2>
            <p className="text-gray-400 mt-2">Fetching real-time data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">🗄️ Convex Database Viewer</h1>
          <p className="text-gray-400 text-lg">
            Real-time data from your Convex database. All user data is stored here!
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-yellow-500 text-black'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">👥 Users ({users.length})</h2>
            <div className="grid gap-4">
              {users.map((user) => (
                <div key={user._id} className="bg-zinc-800 rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <span className="text-black font-bold text-xl">{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <p className="text-gray-400">{user.email}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.role === 'buyer' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                        }`}>
                          {user.role}
                        </span>
                        <span className="text-gray-500 text-sm">
                          Created: {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">ID: {user._id}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">🏠 Properties ({properties.length})</h2>
            <div className="grid gap-4">
              {properties.map((property) => (
                <div key={property._id} className="bg-zinc-800 rounded-lg p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-24 rounded-lg overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{property.title}</h3>
                          <p className="text-gray-400">{property.location}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-yellow-400 font-bold text-lg">{property.price}</span>
                            <span className="text-gray-500">{property.bedrooms} bed • {property.bathrooms} bath</span>
                            <span className="text-gray-500">{property.area}</span>
                          </div>
                          <p className="text-gray-300 mt-2 text-sm">{property.description}</p>
                        </div>
                        <div className="text-right">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold mb-2 ${
                            property.featured ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white'
                          }`}>
                            {property.featured ? 'Featured' : 'Regular'}
                          </div>
                          <div className="text-gray-500 text-sm">
                            Type: {property.type}
                          </div>
                          <div className="text-gray-500 text-sm">
                            ID: {property._id}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Stats Tab */}
        {activeTab === 'platform' && platformStats && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">📊 Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-zinc-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400">{platformStats.totalUsers}</div>
                <div className="text-gray-400">Total Users</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-400">{platformStats.totalBuyers}</div>
                <div className="text-gray-400">Buyers</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-400">{platformStats.totalSellers}</div>
                <div className="text-gray-400">Sellers</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-400">{platformStats.totalProperties}</div>
                <div className="text-gray-400">Properties</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-orange-400">{platformStats.featuredProperties}</div>
                <div className="text-gray-400">Featured</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400">{platformStats.totalMessages}</div>
                <div className="text-gray-400">Messages</div>
              </div>
              <div className="bg-zinc-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-pink-400">{platformStats.totalCollections}</div>
                <div className="text-gray-400">Collections</div>
              </div>
            </div>
          </div>
        )}

        {/* Database Info */}
        <div className="mt-12 bg-zinc-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">🗄️ Database Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Storage Location:</h4>
              <p className="text-gray-300">Convex Cloud Database</p>
              <p className="text-gray-400 text-sm">Real-time, scalable, serverless</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Data Types:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Users (profiles, roles, avatars)</li>
                <li>• Properties (listings, images, details)</li>
                <li>• Messages (AI chat, conversations)</li>
                <li>• Collections (favorites, organization)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Features:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Real-time synchronization</li>
                <li>• Automatic scaling</li>
                <li>• Type-safe operations</li>
                <li>• Built-in authentication</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Access:</h4>
              <p className="text-gray-300">Convex Dashboard</p>
              <p className="text-gray-400 text-sm">View, edit, and manage data in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
