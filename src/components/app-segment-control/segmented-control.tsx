/**
 * @flow
 */

'use strict';

import * as React from 'react';

import {
  Animated,
  Easing,
  I18nManager,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import type {SegmentedControlProps} from './types';
import {SegmentedControlTab} from './segment-control-tab';
import {SegmentsSeparators} from './segments-separators';
import {getSize} from 'src/hooks/use-resize-hoc';

/**
 * SegmentedControl
 * iOS 13 Style UISegmentedControl Component for Android and Web
 */
const SegmentedControl = ({
  style,
  onChange,
  onValueChange,
  enabled = true,
  selectedIndex,
  values,
  tintColor,
  backgroundColor,
  tabStyle,
  fontStyle,
  activeFontStyle,
  appearance,
}: SegmentedControlProps) => {
  const colorSchemeHook = useColorScheme();
  const colorScheme = appearance || colorSchemeHook;
  const [segmentWidth, setSegmentWidth] = React.useState(0);
  const animation = React.useRef(new Animated.Value(0)).current;

  const handleChange = (index: number) => {
    // mocks iOS's nativeEvent
    const event: any = {
      nativeEvent: {
        value: values[index],
        selectedSegmentIndex: index,
      },
    };
    onChange && onChange(event);
    onValueChange && onValueChange(values[index]);
  };

  React.useEffect(() => {
    if (animation && segmentWidth) {
      let isRTL = I18nManager.isRTL ? -segmentWidth : segmentWidth;
      Animated.timing(animation, {
        toValue: isRTL * (selectedIndex || 0),
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [animation, segmentWidth, selectedIndex]);

  return (
    <View
      style={[
        styles.default,
        style,
        colorScheme === 'dark' && styles.darkControl,
        backgroundColor && {backgroundColor},
        // !enabled && styles.disabled,
      ]}
      onLayout={({
        nativeEvent: {
          layout: {width},
        },
      }) => {
        const newSegmentWidth = values.length ? width / values.length : 0;
        if (newSegmentWidth !== segmentWidth) {
          animation.setValue(newSegmentWidth * (selectedIndex || 0));
          setSegmentWidth(newSegmentWidth);
        }
      }}>
      {!backgroundColor && !tintColor && (
        <SegmentsSeparators
          values={values.length}
          selectedIndex={selectedIndex}
        />
      )}
      <View style={styles.segmentsContainer}>
        {values &&
          values.map((value, index) => {
            return (
              <SegmentedControlTab
                enabled={selectedIndex === index ? false : true}
                selected={selectedIndex === index}
                key={index}
                value={value}
                tintColor={tintColor}
                tabStyle={tabStyle}
                fontStyle={fontStyle}
                activeFontStyle={activeFontStyle}
                appearance={colorScheme}
                onSelect={() => {
                  handleChange(index);
                }}
              />
            );
          })}
      </View>
      {selectedIndex != null && segmentWidth ? (
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{translateX: animation}],
              width: segmentWidth,
              backgroundColor:
                tintColor || (colorScheme === 'dark' ? '#636366' : 'white'),
            },
          ]}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    overflow: 'hidden',
    // position: 'relative',
    height: getSize.m(32),
    backgroundColor: '#EEEEF0',
    borderRadius: getSize.m(24),
  },
  darkControl: {
    backgroundColor: '#1C1C1F',
  },
  disabled: {
    opacity: 0.4,
  },
  slider: {
    position: 'absolute',
    borderRadius: getSize.m(24),
    top: 2,
    bottom: 2,
    right: 0,
    left: 0,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.04)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  segmentsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'transparent',
    zIndex: 99,
  },
});

export default SegmentedControl;
