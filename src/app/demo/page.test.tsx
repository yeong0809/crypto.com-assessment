import React from 'react';
import { RnText } from '@/components/index';
import { Crypto, Fiat } from './useData';
import { View } from 'react-native';

type BaseProps = {
  list: (Crypto | Fiat)[];
};

const Component = (props: BaseProps) => {
  return (
    <>
      <View className={`absolute top-0 right-0 bg-red-600 p-4 z-50`}>
        <RnText
          className={`text-white`}
          testID="currency-list-count"
        >{`currency list count: ${props.list.length}`}</RnText>
      </View>
    </>
  );
};

export default Component;
