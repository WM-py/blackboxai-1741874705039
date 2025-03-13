import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useUser } from '../../src/contexts/UserContext';
import { useRouter } from 'expo-router';

export default function AuthLayout() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // If user is authenticated, redirect to main app
      router.replace('/(tabs)/calendar');
    }
  }, [user, loading]);

  if (loading) {
    // You could show a loading screen here
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Registro',
        }}
      />
    </Stack>
  );
}
