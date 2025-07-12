import React from 'react';
import { DemoPage } from '@/app/index';
import {
  createNavigationContainerRef,
  createStaticNavigation,
  ParamListBase,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NativeStackNavigator = createNativeStackNavigator({
  initialRouteName: `Demo`,
  screens: {
    Demo: DemoPage,
  },
  screenOptions: {
    headerShown: false,
  },
});

const Navigation = createStaticNavigation(NativeStackNavigator);

export const navigationRef = createNavigationContainerRef<ParamListBase>();

const Component = () => {
  return <Navigation ref={navigationRef} />;
};

export default Component;
