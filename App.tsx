import React, { useState } from 'react';
import { KeyboardAvoidingView, StatusBar } from 'react-native';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Navigators } from '@/routers/index';
import './global.css';
import { verifyInstallation } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

enableScreens(true);

const App = () => {
  verifyInstallation();

  const handleError = (error: any) => {
    if (error.code === 401) {
      return;
    }
  };

  const [queryClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        onError: handleError,
      }),
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
        mutations: {
          onError: handleError,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={`padding`}>
          <StatusBar
            barStyle={`dark-content`}
            translucent
            backgroundColor={`transparent`}
          />
          <Navigators />
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

export default App;
