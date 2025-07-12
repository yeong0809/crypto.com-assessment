import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  TextInput,
  View,
} from 'react-native';
import { RnButton, RnText } from '@/components/index';
import { Images } from '@/assets/index';
import { useComponent } from '@/hooks/index';

type CurrencyInfo = {
  id: string;
  name: string;
  symbol: string;
  code?: string;
};

type BaseProps = {
  className?: string;
  data: CurrencyInfo[];
  onSearch: (text: string) => void;
};

const Gap = () => {
  return <View className={`h-[0.5px] bg-gray-500 self-end w-full ml-8`} />;
};

const ListEmpty = () => {
  return (
    <View
      testID={`empty-list-indicator`}
      className={`justify-center items-center mt-16`}
    >
      <Image
        className={`h-32 aspect-square`}
        style={{ tintColor: `gray` }}
        source={Images.match_case_off}
      />
      <RnText className={`text-slate-700 mt-8`}>{`No Results`}</RnText>
      <RnText className={`text-slate-500 mt-2`}>{`Try "MCO"`}</RnText>
    </View>
  );
};

const ITEM_HEIGHT = 50;

const renderItem: ListRenderItem<CurrencyInfo> = (
  props: ListRenderItemInfo<CurrencyInfo>
) => {
  const { item } = props;

  let iconText = ``;

  if (item.name.length > 0) {
    iconText = item.name.charAt(0).toUpperCase();
  }

  return (
    <View
      testID={`currency-list-item-${props.index}`}
      className={`flex-row justify-between gap-2 py-4 px-2`}
      style={{ height: ITEM_HEIGHT }}
    >
      <View className={`flex-row items-center gap-2`}>
        <View
          className={`rounded-full bg-slate-700 aspect-square justify-center items-center h-8`}
        >
          <RnText className={`text-white`}>{iconText}</RnText>
        </View>
        <RnText testID={`currency-list-item-${item.name}`}>{item.name}</RnText>
      </View>
      <View className={`flex-row items-center gap-2`}>
        <RnText testID={`currency-list-item-${item.symbol}`}>
          {item.symbol}
        </RnText>
        <Image
          className={`w-4 aspect-square`}
          source={Images.chevron_right}
          tintColor={`gray`}
        />
      </View>
    </View>
  );
};

const Component = (props: BaseProps) => {
  const component = useComponent();

  const [search, setSearch] = useState(``);

  const onSearchRef = useRef(props.onSearch);

  const timeoutDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutDebounce.current = setTimeout(() => {
      if (!component.isFirstRender) {
        onSearchRef.current(search);
      }
    }, 500);

    return () => {
      if (timeoutDebounce.current) {
        clearTimeout(timeoutDebounce.current);
      }
    };
  }, [component.isFirstRender, search]);

  return (
    <>
      <View {...props}>
        {/* Search bar */}
        <View className="flex-row justify-between items-center bg-gray-200">
          {search.length === 0 && (
            <View testID={`search-image`} className={`p-2`}>
              <View className={`h-8 aspect-square`}>
                <Image
                  className={`h-8 aspect-square`}
                  style={{ tintColor: `gray` }}
                  source={Images.search}
                />
              </View>
            </View>
          )}
          {search.length > 0 && (
            <RnButton
              buttonProps={{
                testID: `back-button`,
                className: `p-2`,
                onPress: () => {
                  if (timeoutDebounce.current) {
                    clearTimeout(timeoutDebounce.current);
                  }

                  setSearch(``);
                },
                children: (
                  <View className={`h-8 aspect-square`}>
                    <Image
                      className={`h-8 aspect-square`}
                      style={{ tintColor: `black` }}
                      source={Images.arrow_left}
                    />
                  </View>
                ),
              }}
            />
          )}
          <TextInput
            testID={`search-textinput`}
            value={search}
            onChangeText={setSearch}
            placeholder={`Search currency`}
            className="flex-1 px-2 py-4 text-xl"
            autoCorrect={false}
            autoCapitalize={`none`}
          />
          <RnButton
            buttonProps={{
              testID: `close-button`,
              className: `p-2`,
              onPress: () => {
                if (timeoutDebounce.current) {
                  clearTimeout(timeoutDebounce.current);
                }

                setSearch(``);
              },
              children: (
                <View className={`h-8 aspect-square`}>
                  {search.length > 0 && (
                    <Image
                      className={`h-8 aspect-square`}
                      style={{ tintColor: `black` }}
                      source={Images.close}
                    />
                  )}
                </View>
              ),
            }}
          />
        </View>

        {/* List */}
        <FlatList
          testID={`currency-list`}
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(_item, index) => {
            return `currency-list-item-${index}`;
          }}
          ItemSeparatorComponent={Gap}
          ListEmptyComponent={ListEmpty}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          windowSize={30}
          getItemLayout={(data, index) => {
            return {
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            };
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </>
  );
};

Component.displayName = `RnCurrencyList`;

export { Component };
