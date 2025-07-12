// ./ui/Text.tsx
import React from 'react';
import { Text as NativeText, TextProps } from 'react-native';

const Component = (props: TextProps) => {
  return <NativeText {...props} />;
};

Component.displayName = `RnText`;

export { Component };
