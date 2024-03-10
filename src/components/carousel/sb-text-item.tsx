import React from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet, View} from 'react-native';
import AppText from '../app-text';

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
}

export const SBTextItem: React.FC<Props> = ({style, index}) => {
  return (
    <View style={[styles.container, style]}>
      {typeof index === 'number' && (
        <AppText style={{fontSize: 30, color: 'black'}}>{index}</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
  },
});
