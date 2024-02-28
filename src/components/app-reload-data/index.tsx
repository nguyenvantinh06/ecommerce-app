import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import AppView from '../app-view';
import AppText from '../app-text';
import VectorIcon from '../vector-icon';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppStyles from 'src/config/styles';
import {STYLE_GLOBAL} from 'src/config/style-global';

interface IAppReloadData {
  onRefresh: Function;
}
const AppReloadData = ({onRefresh}: IAppReloadData) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onRefresh();
      }}
      style={styles.buttonReload}>
      <Animated.View
        entering={FadeInUp.delay(100).duration(400).springify().damping(12)}
        exiting={FadeOutUp.delay(50).duration(400).springify().damping(12)}>
        <AppView rowAlignCenter>
          <AppText style={styles.textStyle}>
            You have new records. Click here to reload
          </AppText>
          <VectorIcon.MaterialCommunityIcons
            name="reload"
            size={getSize.m(24)}
            color={AppStyles.color.GRAY_500}
          />
        </AppView>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonReload: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: getSize.m(6),
  },
  textStyle: {
    ...STYLE_GLOBAL.body2,
    color: AppStyles.color.GRAY_500,
    marginRight: getSize.m(4),
  },
});

export default React.memo(AppReloadData);
