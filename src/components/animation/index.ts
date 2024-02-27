import {LayoutAnimation, LayoutAnimationConfig} from 'react-native';

export const toggleAnimation: LayoutAnimationConfig = {
  update: {
    duration: 300,
    property: LayoutAnimation.Properties.scaleXY,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 300,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  duration: 300,
};
