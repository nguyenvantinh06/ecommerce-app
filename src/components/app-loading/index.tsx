import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {useAppTheme} from 'src/config/theme-config';
import {getSize} from 'src/hooks/use-resize-hoc';

function Loading() {
  const theme = useAppTheme();
  return (
    <View style={{...styles.view}}>
      <View style={{...styles.linearGradient}}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    </View>
  );
}

export default React.memo(Loading);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: getSize.m(24),
    borderRadius: getSize.m(10),
  },
});
