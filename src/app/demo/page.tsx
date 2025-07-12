import React from 'react';
import { RnButton, RnCurrencyList } from '@/components/index';
import TestComponent from './page.test';
import useData from './useData';
import { useSafeAreaInsets } from '@/hooks/index';
import { View } from 'react-native';
import CONFIG from '@/commons/config';

const Component = () => {
  const safeAreaInsets = useSafeAreaInsets();

  const {
    list,
    clearDatabase,
    insertToDatabase,
    populateCurrencyListA,
    populateCurrencyListB,
    populateCurrencyListAB,
    onSearch,
  } = useData();

  return (
    <>
      {__DEV__ && <TestComponent list={list} />}
      <View
        style={{
          flex: 1,
          paddingTop: safeAreaInsets.top + CONFIG.BASE_UNIT,
        }}
      >
        <View className={`flex-row flex-wrap justify-between gap-2 mx-4`}>
          {[
            {
              testId: `clear-button`,
              label: `Clear`,
              color: `bg-red-500`,
              onPress: clearDatabase,
            },
            {
              testId: `insert-button`,
              label: `Insert`,
              color: `bg-green-500`,
              onPress: insertToDatabase,
            },
            {
              testId: `populate-cryptos-button`,
              label: `Populate Currency List A`,
              color: `bg-yellow-400`,
              onPress: populateCurrencyListA,
            },
            {
              testId: `populate-fiats-button`,
              label: `Populate Currency List B`,
              color: `bg-indigo-400`,
              onPress: populateCurrencyListB,
            },
            {
              testId: `populate-all-button`,
              label: `Populate All`,
              color: `bg-purple-600`,
              onPress: populateCurrencyListAB,
            },
          ].map(({ label, color, onPress, testId }) => {
            return (
              <RnButton
                key={label}
                buttonProps={{
                  testID: testId,
                  className: `${color} p-2`,
                  onPress,
                  children: label,
                }}
                textProps={{
                  className: `text-white font-bold`,
                }}
              />
            );
          })}
        </View>
        <RnCurrencyList
          className={`flex-1 mt-4`}
          data={list}
          onSearch={onSearch}
        />
      </View>
    </>
  );
};

export default Component;
