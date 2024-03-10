import * as React from 'react';
import {View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import {deviceWidth} from 'src/utils/app-const';
import {SBItem} from './sb-item';
import {getSize} from 'src/hooks/use-resize-hoc';
import {ICarouselProps} from './types';
import AppStyles from 'src/config/styles';
import AppText from '../app-text';
import AppImage from '../app-image';
import {useCallback} from 'react';

const colors = [
  '#26292E',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

const data = [
  {
    id: 1,
    img: 'https://picsum.photos/id/1/400/300',
  },
  {
    id: 2,
    img: 'https://picsum.photos/id/2/400/300',
  },
  {
    id: 3,
    img: 'https://picsum.photos/id/3/400/300',
  },
  {
    id: 4,
    img: 'https://picsum.photos/id/4/400/300',
  },
  {
    id: 5,
    img: 'https://picsum.photos/id/5/400/300',
  },
  {
    id: 6,
    img: 'https://picsum.photos/id/6/400/300',
  },
];

function AppCarousel({
  isVertical = false,
  pagingEnabled = true,
  snapEnabled = true,
  autoPlay = true,
  ...rest
}: ICarouselProps) {
  const progressValue = useSharedValue<number>(0);
  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: deviceWidth * 0.86,
        height: deviceWidth * 0.6,
      } as const)
    : ({
        vertical: false,
        width: deviceWidth,
        height: deviceWidth * 0.6,
      } as const);

  const renderItemCarousel = useCallback(({item, index}) => {
    return <SBItem index={index} item={item} />;
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Carousel
        {...baseOptions}
        style={{
          width: deviceWidth,
        }}
        loop
        pagingEnabled={pagingEnabled}
        snapEnabled={snapEnabled}
        autoPlay={autoPlay}
        autoPlayInterval={2000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={data}
        renderItem={renderItemCarousel}
      />
      {!!progressValue && (
        <View
          style={
            isVertical
              ? {
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: getSize.s(10),
                  alignSelf: 'center',
                  position: 'absolute',
                  right: 5,
                  top: 40,
                }
              : {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: getSize.s(100),
                  alignSelf: 'center',
                }
          }>
          {colors.map((backgroundColor, index) => {
            return (
              <PaginationItem
                backgroundColor={backgroundColor}
                animValue={progressValue}
                index={index}
                key={index}
                isRotate={isVertical}
                length={colors.length}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

const PaginationItem: React.FC<{
  index: number;
  // backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = props => {
  const {animValue, index, length, isRotate} = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            'clamp',
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: '#D4D4D4',
        width,
        height: width,
        borderRadius: getSize.m(50),
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: getSize.m(50),
            backgroundColor: AppStyles?.color?.PRIMARY,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default React.memo(AppCarousel);
