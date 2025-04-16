"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { trpc } from '@/tRPC/client/client';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isLoading } = trpc.getSession.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isAuthenticated = !!session?.user;

  useEffect(() => {
    // List of paths that require authentication
    const protectedPaths = ['/user', '/settings', '/dashboard'];
    // List of paths that should redirect to dashboard if user is authenticated
    const authPaths = ['/auth/login', '/auth/signup'];

    const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
    const isAuthPath = authPaths.some(path => pathname === path);

    if (!isLoading) {
      if (isProtectedPath && !isAuthenticated) {
        router.push('/auth/login');
      } else if (isAuthPath && isAuthenticated) {
        router.push('/user/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const value = {
    isAuthenticated,
    user: session?.user ?? null,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 