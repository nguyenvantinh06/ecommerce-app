import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {Switch} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {changeTheme} from 'src/store/slices/theme-slice';
import {AppVectorIcons} from 'src/components/vector-icon';
import {getSize} from 'src/hooks/use-resize-hoc';
import useOrientation from 'src/hooks/use-orientation';

const ThemeController: React.FC = () => {
  const isDark = useAppSelector(state => state.theme.isDark);

  const dispatch = useAppDispatch();
  const onToggleTheme = () => {
    dispatch(changeTheme(!isDark));
  };
  const iconName = isDark ? 'weather-night' : 'white-balance-sunny';
  const iconColor = isDark ? 'white' : 'black';
  /**
   *
   * *UPDATE: auto resize on multiple device
   * */
  const {isLandscape} = useOrientation();
  return (
    <View
      style={[
        styles.container,
        isLandscape && {
          marginVertical: getSize.m(8),
        },
      ]}>
      <Switch
        value={isDark}
        onValueChange={onToggleTheme}
        style={{
          transform: [
            {
              scale: Platform.OS === 'ios' ? 1 : getSize.m(1),
            },
          ],
        }}
      />
      <AppVectorIcons
        type="MaterialCommunityIcons"
        name={iconName}
        size={getSize.m(20)}
        style={styles.icon}
        color={iconColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: getSize.m(12),
    marginVertical: getSize.m(16),
  },
  icon: {marginLeft: getSize.m(8)},
});

export default ThemeController;
