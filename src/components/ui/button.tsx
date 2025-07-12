import { utils } from '@/lib/index';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

type BaseProps = {
  buttonProps: TouchableOpacityProps;
  textProps?: TouchableOpacityProps;
};

const Component = (props: BaseProps) => {
  const { children, ...rest } = props.buttonProps;

  let content = children;

  if (utils.isString(children)) {
    content = <Text {...props.textProps}>{children}</Text>;
  }

  return <TouchableOpacity {...rest}>{content}</TouchableOpacity>;
};

Component.displayName = `RnButton`;

export { Component };
