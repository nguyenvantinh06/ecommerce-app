import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import VectorIcon from 'src/components/vector-icon';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppStyles from 'src/config/styles';
import {useAppTheme} from 'src/config/theme-config';
import {useAppSelector} from 'src/store/hooks';
import AppText from 'src/components/app-text';
import {StackNavigation} from 'src/types';
import AppIcons from 'src/utils/app-icon';
import {parseBadge} from 'src/utils/app-utils';
import {SvgName} from 'src/config/svg-path';
import {FONT_FAMILY} from '../app-text/app-font';
import {BlurView} from '@react-native-community/blur';

const BottomTabView = (props: BottomTabBarProps) => {
  const theme = useAppTheme();
  const {countCheckIns, countUpdates} = useAppSelector(state => state.counter);

  const activeColor = AppStyles.color.COLOR_PRIMARY_100;
  const unActiveColor = theme.dark
    ? AppStyles.color.GRAY_500
    : AppStyles.color.GRAY_500;
  const {state, descriptors, navigation, insets} = props;

  const tabIcons = [
    {
      id: 1,
      iconActive: (
        <SvgName.HomeActive
          width={getSize.s(24)}
          height={getSize.v(24)}
          stroke={activeColor}
        />
      ),
      iconUnActive: AppIcons.Home,
    },
    {
      id: 2,
      iconActive: (
        <SvgName.CheckCircleActive
          width={getSize.s(24)}
          height={getSize.v(24)}
          stroke={activeColor}
        />
      ),
      iconUnActive: AppIcons.CheckCircle,
    },
    {
      id: 3,
      iconActive: (
        <SvgName.MessageActive
          width={getSize.s(24)}
          height={getSize.v(24)}
          stroke={activeColor}
        />
      ),
      iconUnActive: AppIcons.MessageCircle,
    },
    {
      id: 4,
      iconActive: (
        <SvgName.CartActive
          width={getSize.s(24)}
          height={getSize.v(24)}
          stroke={activeColor}
        />
      ),
      iconUnActive: AppIcons.Cart,
    },
    {
      id: 5,
      iconActive: (
        <SvgName.UserActive
          width={getSize.s(24)}
          height={getSize.v(24)}
          stroke={activeColor}
        />
      ),
      iconUnActive: AppIcons.User,
    },
  ];

  const containerStyle = {
    paddingBottom: insets.bottom,
    backgroundColor: theme.colors.background,
    borderTopWidth: 0,
    borderColor: theme.colors.borderColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* <BlurView
        blurType="regular"
        blurAmount={80}
        style={styles.blurViewStyle}
      /> */}
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            (navigation as unknown as StackNavigation)?.navigate<any>({
              name: route.name,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options?.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarButton}>
            {
              <View style={styles.button}>
                <View style={styles.iconView}>
                  {isFocused
                    ? tabIcons[index].iconActive
                    : tabIcons[index].iconUnActive}
                  {index === 1 && countCheckIns > 0 && (
                    <View
                      style={{
                        ...styles.countBadgeStyle,
                        borderColor: theme.colors.background,
                      }}>
                      <AppText style={styles.badgeTextStyle}>
                        {parseBadge(countCheckIns)}
                      </AppText>
                    </View>
                  )}

                  {index === 2 && countUpdates > 0 && (
                    <View
                      style={{
                        ...styles.countBadgeStyle,
                        borderColor: theme.colors.background,
                      }}>
                      <AppText style={styles.badgeTextStyle}>
                        {parseBadge(countUpdates)}
                      </AppText>
                    </View>
                  )}
                </View>
                <AppText
                  style={[
                    styles.labelText,
                    {color: isFocused ? activeColor : unActiveColor},
                  ]}>
                  {label}
                </AppText>
              </View>
            }
          </Pressable>
        );
      })}
    </View>
  );
};

export default React.memo(BottomTabView);

const styles = StyleSheet.create({
  container: {
    minHeight: getSize.v(52),
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 12,
  },
  tabBarButton: {
    minHeight: getSize.m(52),
    flex: 1,
  },
  button: {
    paddingTop: getSize.m(5),
    flex: 1,
    alignItems: 'center',
  },
  iconView: {
    height: getSize.v(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    // paddingTop: getSize.m(2),
    fontSize: getSize.m(10),
    lineHeight: getSize.m(16),
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '600',
  },
  countBadgeStyle: {
    width: getSize.m(14),
    height: getSize.m(14),
    borderRadius: getSize.m(14) / 2,
    // borderWidth: 1,
    backgroundColor: AppStyles.color.RED_500,
    position: 'absolute',
    zIndex: Number.MAX_SAFE_INTEGER,
    top: 2,
    right: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTextStyle: {
    color: AppStyles.color.WHITE,
    fontSize: getSize.m(8),
    fontWeight: '600',
    lineHeight: getSize.m(10),
  },
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
});
