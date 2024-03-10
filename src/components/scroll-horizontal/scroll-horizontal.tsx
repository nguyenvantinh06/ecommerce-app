import React, {useCallback, useRef, useState} from 'react';
import {Animated, FlatList, Pressable, ScrollView, View} from 'react-native';
import VectorIcon from '../vector-icon';
import AppText from '../app-text';
import {deviceWidth} from 'src/utils/app-const';
// import {DATA} from 'src/screens/HomeScreen/constant';
import {IScrollHorizontal} from './types';

const ScrollHorizontal = ({data, onPress}: IScrollHorizontal) => {
  const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
  const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);

  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarWidth > visibleScrollBarWidth
      ? (visibleScrollBarWidth * visibleScrollBarWidth) / completeScrollBarWidth
      : visibleScrollBarWidth;

  const difference =
    visibleScrollBarWidth > scrollIndicatorSize
      ? visibleScrollBarWidth - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarWidth / completeScrollBarWidth,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
  });

  const renderItem = useCallback(({item}) => {
    return (
      <Pressable
        key={item?.id}
        style={{
          width: 100,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 8,
        }}
        onPress={() => onPress?.(item)}>
        <VectorIcon.AntDesign name="home" size={24} color="red" />
        <AppText>{item?.description}</AppText>
      </Pressable>
    );
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView
        contentContainerStyle={{}}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onContentSizeChange={(width, _) => {
          console.log('width content size: ' + width);
          setCompleteScrollBarWidth(width);
        }}
        horizontal
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          console.log('width layout: ' + width);
          setVisibleScrollBarWidth(width);
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollIndicator}}}],
          {useNativeDriver: false},
        )}
        directionalLockEnabled={true}
        alwaysBounceVertical={false}>
        <FlatList
          keyExtractor={item => item?.id}
          data={data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
          columnWrapperStyle={{flexWrap: 'wrap'}}
          numColumns={Math.ceil(data.length / 2)}
        />
      </ScrollView>
      <View
        style={{
          width: deviceWidth - 20 * 2,
          backgroundColor: 'red',
          borderRadius: 8,
          height: 6,
        }}>
        <Animated.View
          style={{
            height: 6,
            borderRadius: 8,
            backgroundColor: 'blue',
            width: scrollIndicatorSize,
            transform: [{translateX: scrollIndicatorPosition}],
          }}
        />
      </View>
    </View>
  );
};

export default React.memo(ScrollHorizontal);
