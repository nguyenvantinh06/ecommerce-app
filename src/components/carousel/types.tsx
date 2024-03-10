import {TCarouselProps} from 'react-native-reanimated-carousel';

export type ICarouselProps = TCarouselProps & {
  isVertical?: boolean;
  pagingEnabled?: boolean;
  snapEnabled?: boolean;
};
