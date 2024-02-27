import React, {useCallback, useMemo} from 'react';
import AppView from '../app-view';
import AppText from '../app-text';
import {SVG_NAME} from 'src/config/svg-path';
import {getSize} from 'src/hooks/use-resize-hoc';
import {
  DeviceEventEmitter,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import AppStyles from 'src/config/styles';
import {STYLE_GLOBAL} from 'src/config/style-global';
import AppImage from '../app-image';
import {DEFAULT_AVATAR, EventKeys, hitSlopColor} from 'src/utils/app-const';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {childrenActions, IChildren} from 'src/store/slices/children-slice';
import {
  getColorCheckedIn,
  transferDateMessageToString,
} from 'src/utils/app-utils';
import Animated, {FadeInLeft, FadeOutLeft} from 'react-native-reanimated';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function AppContainerHeader({
  isHeader = true,
  showListChildren,
  setShowListChildren,
  data: data,
  onPressItem,
}: any) {
  const {listChildren, listColor} = useAppSelector(state => state.children);

  const dispatch = useAppDispatch();
  const backgroundColor = useMemo(() => {
    return data?.backgroundColor || AppStyles.color.COLOR_PRIMARY_100;
  }, [data?.backgroundColor]);

  const polygonColor = useMemo(() => {
    return data?.polygonColor || AppStyles.color.PRIMARY_300;
  }, [data?.polygonColor]);

  const getNameChild = useMemo(() => {
    return data?.name || 'All children';
  }, [data?.name]);

  const onPressSelectChild = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (isHeader) {
      setShowListChildren(!showListChildren);
    } else {
      dispatch(childrenActions.setSelectorChild(data));
      setShowListChildren(!showListChildren);
      // onPressItem?.();
      DeviceEventEmitter.emit(EventKeys.RELOAD_TOGGLE);
    }
  }, [isHeader, showListChildren, data]);

  const handleSelectColorChild = useCallback(
    (item: any, child: IChildren) => {
      const options = {
        childId: child.id === 'all' ? '' : child.id,
        color: item.backgroundColor,
        callback: res => {
          console.log('update children', child.id);
          console.log('update children res', res);
          if (res) {
            const temp = listChildren.map(child => {
              if (child?.id === data?.id) {
                return {
                  ...child,
                  backgroundColor: item.backgroundColor,
                  polygonColor: item.polygonColor,
                };
              }
              return child;
            });
            dispatch(childrenActions.setListColorChild(temp));
          }
        },
        showLoading: true,
      };
      console.log('options', options);
      dispatch(childrenActions.updateChildren({...options}));
    },
    [listChildren, dispatch],
  );

  const getChildCheckedInText = useMemo(() => {
    return data?.timeCheckIn
      ? `Checked in ${transferDateMessageToString(data?.timeCheckIn)}`
      : '';
  }, [data]);
  return (
    <Pressable
      onPress={onPressSelectChild}
      style={[
        styles.container,
        !isHeader
          ? [styles.innerHeader, {backgroundColor: backgroundColor}]
          : {flex: 1},
      ]}>
      <Pressable onPress={onPressSelectChild} disabled>
        {!data?.avatarUrl ? (
          <AppView
            style={[{backgroundColor: '#00000033'}, styles.containerNoImage]}>
            <AppText style={styles.textAllChildren}>All</AppText>
          </AppView>
        ) : (
          <AppImage
            source={{
              uri: data?.avatarUrl || DEFAULT_AVATAR,
            }}
            style={styles.containerNoImage}
          />
        )}
      </Pressable>
      <Pressable
        onPress={onPressSelectChild}
        style={{maxWidth: '60%'}}
        disabled>
        <AppText style={styles.textAllChildren}>{getNameChild}</AppText>
        {!showListChildren ? (
          <AppText
            style={[
              styles.textSelectChildren,
              {
                color:
                  data?.id === 'all'
                    ? AppStyles.color.WHITE
                    : getColorCheckedIn(data?.backgroundColor),
              },
            ]}>
            {data?.id === 'all' ? 'Tap to select child' : getChildCheckedInText}
          </AppText>
        ) : (
          <View style={[styles.containerPoint]}>
            {listColor?.map((item, index) => {
              return Platform.OS === 'ios' ? (
                <Pressable
                  key={item?.id}
                  hitSlop={hitSlopColor}
                  onPress={() => handleSelectColorChild(item, data)}
                  // disabled={item?.isSelected}
                  style={[
                    {zIndex: 100},
                    // item?.isSelected &&
                    //   data?.backgroundColor !== item?.backgroundColor && {
                    //     opacity: 0.3,
                    //   },
                  ]}>
                  <Animated.View
                    style={[
                      styles.point,
                      {
                        backgroundColor: item?.backgroundColor,
                      },
                      data?.backgroundColor === item?.backgroundColor && {
                        borderColor: '#fff',
                        borderWidth: 2,
                      },
                    ]}
                    entering={FadeInLeft.delay(index * 100)
                      .springify()
                      .damping(12)}
                    exiting={FadeOutLeft.delay(index * 100)
                      .springify()
                      .damping(12)}
                  />
                </Pressable>
              ) : (
                <Pressable
                  key={item?.id}
                  hitSlop={hitSlopColor}
                  onPress={() => handleSelectColorChild(item, data)}
                  // disabled={item?.isSelected}
                  style={[
                    {zIndex: 100},
                    // item?.isSelected &&
                    //   data?.backgroundColor !== item?.backgroundColor && {
                    //     opacity: 0.3,
                    //   },
                  ]}>
                  <View
                    style={[
                      styles.point,
                      {
                        backgroundColor: item?.backgroundColor,
                      },
                      data?.backgroundColor === item?.backgroundColor && {
                        borderColor: '#fff',
                        borderWidth: 2,
                      },
                    ]}
                  />
                </Pressable>
              );
            })}
          </View>
        )}
      </Pressable>
      <AppView style={{position: 'absolute', right: 0, top: 0, bottom: 0}}>
        <SVG_NAME.HOME_POLYGON
          width={getSize.s(77)}
          height={getSize.v(100)}
          fill={polygonColor}
        />
      </AppView>
    </Pressable>
  );
}

export default React.memo(AppContainerHeader);

const styles = StyleSheet.create({
  containerNoImage: {
    width: getSize.m(80),
    height: getSize.m(80),
    borderRadius: getSize.m(80) / 2,
    // backgroundColor: '#00000033',
    marginRight: getSize.m(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAllChildren: {
    fontSize: getSize.m(18),
    lineHeight: getSize.m(24),
    fontWeight: '600',
    color: '#fff',
  },
  textSelectChildren: {
    ...STYLE_GLOBAL.body2,
    fontWeight: '400',
    // color: AppStyles.color.GRAY_200,
  },
  innerHeader: {
    paddingVertical: getSize.m(9),
    paddingLeft: getSize.m(16),
  },
  point: {
    width: getSize.m(14),
    height: getSize.m(14),
    borderRadius: getSize.m(14) / 2,
    marginRight: getSize.m(16),
    zIndex: 100,
  },
  containerPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getSize.m(10),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
