"use client";

import { auth } from "@/config/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function MapPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading user information...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">No user found</div>
      </div>
    );
  }

  // Helper function to format dates
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  // Helper function to display object properties
  const displayObject = (obj: any, title: string) => {
    if (!obj) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">{title}</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          {Object.entries(obj).map(([key, value]) => (
            <div key={key} className="mb-2">
              <span className="font-medium text-gray-700">{key}:</span>
              <span className="ml-2 text-gray-900">
                {typeof value === 'object' && value !== null 
                  ? JSON.stringify(value, null, 2)
                  : String(value)
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Firebase User Information</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Basic User Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-2">
                  <span className="font-medium text-gray-700">UID:</span>
                  <span className="ml-2 text-gray-900">{user.uid}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-900">{user.email || "N/A"}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Display Name:</span>
                  <span className="ml-2 text-gray-900">{user.displayName || "N/A"}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Phone Number:</span>
                  <span className="ml-2 text-gray-900">{user.phoneNumber || "N/A"}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Photo URL:</span>
                  <span className="ml-2 text-gray-900">{user.photoURL || "N/A"}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Email Verified:</span>
                  <span className={`ml-2 ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {user.emailVerified ? "Yes" : "No"}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Anonymous:</span>
                  <span className={`ml-2 ${user.isAnonymous ? 'text-orange-600' : 'text-green-600'}`}>
                    {user.isAnonymous ? "Yes" : "No"}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Creation Time:</span>
                  <span className="ml-2 text-gray-900">{formatDate(user.metadata?.creationTime)}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Last Sign In:</span>
                  <span className="ml-2 text-gray-900">{formatDate(user.metadata?.lastSignInTime)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Provider Data */}
          {user.providerData && user.providerData.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600">Provider Data</h2>
              <div className="space-y-4">
                {user.providerData.map((provider, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-gray-800">Provider {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="font-medium text-gray-700">Provider ID:</span>
                        <span className="ml-2 text-gray-900">{provider.providerId}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">UID:</span>
                        <span className="ml-2 text-gray-900">{provider.uid}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-900">{provider.email || "N/A"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Display Name:</span>
                        <span className="ml-2 text-gray-900">{provider.displayName || "N/A"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Phone Number:</span>
                        <span className="ml-2 text-gray-900">{provider.phoneNumber || "N/A"}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Photo URL:</span>
                        <span className="ml-2 text-gray-900">{provider.photoURL || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional User Properties */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Additional Properties</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-2">
                <span className="font-medium text-gray-700">Tenant ID:</span>
                <span className="ml-2 text-gray-900">{user.tenantId || "N/A"}</span>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-700">Provider ID:</span>
                <span className="ml-2 text-gray-900">{user.providerId || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Raw User Object */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">Complete User Object (JSON)</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-auto max-h-96">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Data
            </button>
            <button
              onClick={() => auth.signOut()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
