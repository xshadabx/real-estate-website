'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function ConvexTest() {
  const users = useQuery(api.users.getUsers);
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-bold mb-2">Convex Connection Test</h3>
      <p className="text-sm text-gray-600 mb-2">
        Users in database: {users ? users.length : 'Loading...'}
      </p>
      {users && users.length > 0 && (
        <div className="text-xs">
          <p>Latest user: {users[users.length - 1]?.name}</p>
          <p>Email: {users[users.length - 1]?.email}</p>
          <p>Role: {users[users.length - 1]?.role}</p>
        </div>
      )}
    </div>
  );
}
