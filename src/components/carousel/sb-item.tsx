import React from 'react';
import {
  StyleProp,
  ViewStyle,
  ViewProps,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import {SBImageItem} from './sb-image-item';
import {SBTextItem} from './sb-text-item';

interface Props extends ViewProps {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
  img?: ImageSourcePropType;
  onPress?: () => {};
  item: any;
}

export const SBItem: React.FC<Props> = props => {
  const {
    style,
    showIndex = false,
    index,
    img,
    testID,
    onPress,
    item,
    ...rest
  } = props;
  console.log('item', item?.img);
  return (
    <Pressable style={{flex: 1}} onPress={onPress}>
      {item?.img ? (
        <SBImageItem
          style={style}
          index={index}
          showIndex={typeof index === 'number' && showIndex}
          img={item?.img}
        />
      ) : (
        <SBTextItem style={style} index={index} />
      )}
    </Pressable>
  );
};
