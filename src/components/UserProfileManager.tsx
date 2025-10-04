'use client';

import { useState, useEffect } from 'react';
import { useUsers, useUser, useUserStats, useUserActivity } from '@/hooks/useConvex';
import { Id } from '../../convex/_generated/dataModel';

interface UserProfileManagerProps {
  userId?: Id<"users">;
  onUserSelect?: (userId: Id<"users">) => void;
}

export default function UserProfileManager({ userId, onUserSelect }: UserProfileManagerProps) {
  const { users, loading: usersLoading, createUser } = useUsers();
  const { user, loading: userLoading, updateUser } = useUser(userId || "" as Id<"users">);
  const { stats, loading: statsLoading } = useUserStats(userId || "" as Id<"users">);
  const { activity, loading: activityLoading } = useUserActivity(userId || "" as Id<"users">);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    name: '',
    role: 'buyer' as 'buyer' | 'seller',
    avatar: '',
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      setNewUser({ email: '', name: '', role: 'buyer', avatar: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  if (usersLoading) {
    return <div className="text-white p-4">Loading users...</div>;
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      
      {/* User List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">All Users ({users.length})</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user._id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                userId === user._id ? 'bg-yellow-500/20 border border-yellow-500' : 'bg-zinc-800 hover:bg-zinc-700'
              }`}
              onClick={() => onUserSelect?.(user._id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-black font-bold">{user.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-400">{user.email}</div>
                  <div className="text-xs text-yellow-400 capitalize">{user.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create User Button */}
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="w-full bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors mb-4"
      >
        {showCreateForm ? 'Cancel' : 'Create New User'}
      </button>

      {/* Create User Form */}
      {showCreateForm && (
        <form onSubmit={handleCreateUser} className="space-y-4 bg-zinc-800 p-4 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'buyer' | 'seller' })}
              className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 text-white"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Avatar URL (optional)</label>
            <input
              type="url"
              value={newUser.avatar}
              onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
              className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Create User
          </button>
        </form>
      )}

      {/* Selected User Details */}
      {user && (
        <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">User Details</h3>
          <div className="space-y-2">
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Role:</strong> <span className="capitalize text-yellow-400">{user.role}</span></div>
            <div><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
          </div>

          {/* User Stats */}
          {stats && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-zinc-700 p-2 rounded">
                  <div className="text-yellow-400 font-bold">{stats.collectionsCount}</div>
                  <div>Collections</div>
                </div>
                <div className="bg-zinc-700 p-2 rounded">
                  <div className="text-yellow-400 font-bold">{stats.messagesCount}</div>
                  <div>Messages</div>
                </div>
                <div className="bg-zinc-700 p-2 rounded">
                  <div className="text-yellow-400 font-bold">{stats.totalPropertiesInCollections}</div>
                  <div>Properties Saved</div>
                </div>
                <div className="bg-zinc-700 p-2 rounded">
                  <div className="text-yellow-400 font-bold">
                    {stats.lastActivity ? new Date(stats.lastActivity).toLocaleDateString() : 'None'}
                  </div>
                  <div>Last Activity</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
