import React from 'react';
import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('screen');

//iPhone X
const DESIGN_WIDTH = 376;
const DESIGN_HEIGHT = 812;

const WIDTH = width > height ? height : width;
const HEIGHT = width > height ? width : height;

const scale = (size: number) => {
  return (WIDTH / DESIGN_WIDTH) * size;
};

const verticalScale = (size: number) => {
  return (HEIGHT / DESIGN_HEIGHT) * size;
};

const moderateScale = (
  size: number,
  factor = Platform.OS === 'android' ? 0.7 : 0.5,
) => {
  return size + (scale(size) - size) * factor;
};

/**
 * getSize.m(10) Responsive for padding - margin - fontSize.
 *
 * getSize.s(10) Responsive by width screen. (Image Size)
 *
 * getSize.v(10) Responsive by height screen.
 **/

const getSize = {
  m: moderateScale,
  s: scale,
  v: verticalScale,
};

function withIconResizeHOC(
  WrappedComponent: any,
  props: {
    s?: number;
    w?: number;
    h?: number;
    color?: string;
    strokeColor?: string;
  } = {
    s: 12,
    w: 12,
    h: 12,
    color: '#000',
    strokeColor: '#000',
  },
) {
  return (
    <WrappedComponent
      width={getSize.m(props?.s || props?.w || 12)}
      height={getSize.m(props?.s || props?.h || 12)}
      fill={props?.color || 'transparent'}
      stroke={props?.strokeColor || 'transparent'}
    />
  );
}

export {getSize, withIconResizeHOC};
