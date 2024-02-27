import React, {useCallback} from 'react';
import _ from 'lodash';

import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import AppView from 'src/components/app-view';
import AppText from 'src/components/app-text';
import VectorIcon from 'src/components/vector-icon';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppStyles from 'src/config/styles';
import {STYLE_GLOBAL} from 'src/config/style-global';

export const BaseToastComponent = ({
  toastOptions,
  toastNetworkModal = false,
}: any) => {
  const hideToast = (id: any) => {
    toastNetworkModal
      ? global.toastNetworkModal?.hide(id)
      : global.toast?.hide(id);
  };

  const getToastIcon = useCallback(() => {
    switch (toastOptions.type) {
      case 'error':
        return (
          <VectorIcon.Ionicons
            name="close-circle"
            color={'#E70000'}
            size={getSize.m(24)}
          />
        );
      case 'success':
        return (
          <VectorIcon.Ionicons
            name="checkmark-circle"
            color={'#21B442'}
            size={getSize.m(24)}
          />
        );
      case 'warning':
        return (
          <VectorIcon.Ionicons
            name="information-circle"
            color={'#FF9F0A'}
            size={getSize.m(24)}
          />
        );
      case 'normal':
        return (
          <VectorIcon.Ionicons
            name="information-circle"
            color={'#31BFDE'}
            size={getSize.m(24)}
          />
        );
      default:
        return null;
    }
  }, [toastOptions.type]);

  return (
    <Pressable
      style={[styles.containerToast, {marginVertical: getSize.m(8)}]}
      onPress={() => {
        hideToast(toastOptions?.id);
        toastOptions?.onPress?.();
      }}>
      <AppView flex>
        {toastOptions?.data?.title ? (
          <AppView>
            <AppView row justifyContent="space-between">
              <AppView row flex>
                <AppView marginRight={getSize.m(12)} width={getSize.s(24)}>
                  {getToastIcon()}
                </AppView>
                <AppView flex>
                  <AppText numberOfLines={2} style={styles?.text1}>
                    {toastOptions?.data?.title}
                  </AppText>
                </AppView>
              </AppView>
              <TouchableOpacity onPress={() => hideToast(toastOptions?.id)}>
                <VectorIcon.Ionicons
                  name="close"
                  color={'#212429'}
                  size={getSize.m(24)}
                />
              </TouchableOpacity>
            </AppView>
            <AppView row>
              <AppView marginRight={getSize.m(12)} width={getSize.s(24)} />
              <AppView flex>
                <AppText numberOfLines={2} style={styles?.textStyle}>
                  {toastOptions?.message}
                </AppText>
              </AppView>
            </AppView>
          </AppView>
        ) : (
          <AppView>
            <AppView row justifyContent="space-between">
              <AppView row flexWrap="nowrap" flex={0.95}>
                <AppView marginRight={getSize.m(14)}>{getToastIcon()}</AppView>
                <AppView flex>
                  <AppText numberOfLines={2} style={styles?.textStyle}>
                    {toastOptions?.message}
                  </AppText>
                </AppView>
              </AppView>
              <TouchableOpacity onPress={() => hideToast(toastOptions?.id)}>
                <VectorIcon.Ionicons
                  name="close"
                  color={'#212429'}
                  size={getSize.m(24)}
                />
              </TouchableOpacity>
            </AppView>
          </AppView>
        )}
      </AppView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerToast: Platform.select({
    ios: {
      width: '95%',
      backgroundColor: '#ffffff',
      padding: getSize.m(16),
      borderRadius: getSize.m(4),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
    },
    android: {
      width: '95%',
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      padding: getSize.m(16),
      borderRadius: getSize.m(4),
      elevation: 6,
    },
  }) as ViewStyle,
  text1: {
    ...STYLE_GLOBAL.heading5,
    color: AppStyles?.color?.BLACK,
  },
  text2: {
    ...STYLE_GLOBAL.body1,
    color: AppStyles?.color?.BLACK,
    marginLeft: getSize.m(24),
  },
  textStyle: {
    ...STYLE_GLOBAL.body2,
    color: AppStyles?.color?.BLACK,
  },
});
