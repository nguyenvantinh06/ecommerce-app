import React from 'react';
import type {StyleProp, ViewStyle, ImageSourcePropType} from 'react-native';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import AppImage from '../app-image';
import AppText from '../app-text';

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
  img?: ImageSourcePropType;
}

export const SBImageItem: React.FC<Props> = ({
  style,
  index: _index,
  showIndex = true,
  img,
}) => {
  const index = _index ?? 0;
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="small" />
      <AppImage key={index} style={styles.image} source={{uri: img}} />
      {showIndex && (
        <AppText
          style={{
            position: 'absolute',
            color: '#6E6E6E',
            fontSize: 20,
            overflow: 'hidden',
            bottom: 0,
            right: 5,
          }}>
          {index}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
