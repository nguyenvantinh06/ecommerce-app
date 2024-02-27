/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import AppView from 'src/components/app-view';
import AppText from 'src/components/app-text';
import AppButton from 'src/components/app-button';
import VectorIcon from 'src/components/vector-icon';
import {getSize} from 'src/hooks/use-resize-hoc';
import {useAppTheme} from 'src/config/theme-config';
import AppStyles from 'src/config/styles';
import AppIcons from 'src/utils/app-icon';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {STYLE_GLOBAL} from 'src/config/style-global';
import {IErrorInternetConnectionProps} from '../type';
import AppService from 'src/services/app-service';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import NetInfo, {
  NetInfoState,
  NetInfoStateType,
} from '@react-native-community/netinfo';
import Toast from 'react-native-toast-notifications';
import {BaseToastComponent} from 'src/config/toast-config';
import {FONT_FAMILY} from 'src/components/app-text/app-font';

const ErrorInternetConnection = React.forwardRef<
  IErrorInternetConnectionProps,
  {}
>((props: any, ref) => {
  const theme = useAppTheme();
  const [visible, setVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const fetchingActions = useAppSelector(
    state => state.loading.fetchingActions,
  );

  const cachingActions = useAppSelector(state => state.loading.cachingActions);
  React.useImperativeHandle(
    ref,
    () => ({
      open: onOpenModal,
      close: onCloseModal,
    }),
    [],
  );

  const onOpenModal = () => setVisible(true);

  const onCloseModal = () => handleRetry();

  const checkConnect = async (): Promise<boolean> => {
    const netInfo: NetInfoState | null = await NetInfo.fetch();
    if (!netInfo) {
      return false;
    }

    if (
      netInfo.type === NetInfoStateType.none ||
      netInfo.type === NetInfoStateType.unknown ||
      !(netInfo.isInternetReachable !== null
        ? netInfo.isInternetReachable && netInfo.isConnected
        : netInfo.isConnected)
    ) {
      AppService.showToastDisconnect();
      return false;
    }

    return true;
  };

  const handleRetry = React.useCallback(() => {
    checkConnect().then((value: boolean) => {
      if (value) {
        setVisible(false);

        console.log('fetchingActions: ', fetchingActions);
        Object.keys(cachingActions || {}).map(type => {
          if ((fetchingActions || {}).hasOwnProperty(type)) {
            dispatch({type, payload: (cachingActions as any)[type]});
          }
        });
      }
    });
  }, [fetchingActions, cachingActions, dispatch]);

  return (
    <Modal
      visible={visible}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
      onRequestClose={() => {
        // handle back button
        onCloseModal();
      }}>
      <AppView
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <AppView style={[styles.content, {paddingTop: getSize.m(191)}]}>
          <AppView>
            {theme.dark
              ? AppIcons.NO_INTERNET_CONNECTION_DARK
              : AppIcons.NO_INTERNET_CONNECTION}
          </AppView>

          <AppView paddingTop={getSize.m(16)}>
            <AppView alignItems="center">
              <AppText style={{...STYLE_GLOBAL.heading4}}>
                No internet connection!
              </AppText>
            </AppView>

            <AppView paddingTop={getSize.m(24)}>
              <AppText style={{...STYLE_GLOBAL.body1}}>
                Please follow the instructions below:
              </AppText>

              <AppView row paddingTop={getSize.m(8)}>
                <VectorIcon.EvilIcons
                  name="check"
                  size={getSize.m(24)}
                  color={
                    theme.dark
                      ? AppStyles.color.WHITE
                      : AppStyles.color.SECONDARY
                  }
                />
                <AppText style={styles.body1}>
                  Check your modem and router
                </AppText>
              </AppView>

              <AppView row paddingTop={getSize.m(8)}>
                <VectorIcon.EvilIcons
                  name="check"
                  size={getSize.m(24)}
                  color={
                    theme.dark
                      ? AppStyles.color.WHITE
                      : AppStyles.color.SECONDARY
                  }
                />
                <AppText style={styles.body1}>Tap on Retry button</AppText>
              </AppView>
            </AppView>
          </AppView>
        </AppView>

        <AppView style={styles.footer}>
          <AppButton
            onPress={handleRetry}
            type="primary"
            styleChildren={styles.buttonContainer}
            title={'Retry'}
            styleText={{top: getSize.m(2)}}>
            <VectorIcon.MaterialCommunityIcons
              name="reload"
              size={getSize.m(24)}
              color="white"
              style={{marginRight: getSize.m(4)}}
            />
          </AppButton>
        </AppView>
      </AppView>

      <AppView absolute top={0} left={0} safeAreaTop>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <AppView center padding={getSize.m(16)}>
            <VectorIcon.MaterialCommunityIcons
              name="close-circle-outline"
              size={getSize.m(24)}
              color={theme.dark ? AppStyles.color.GRAY3 : theme.colors.text}
            />
          </AppView>
        </TouchableOpacity>
      </AppView>
      <Toast
        ref={toastRef => (global.toastNetworkModal = toastRef)}
        offset={50}
        animationType="slide-in"
        placement="top"
        renderToast={toastOptions => (
          <BaseToastComponent
            toastOptions={toastOptions}
            toastNetworkModal={true}
          />
        )}
      />
    </Modal>
  );
});

export default ErrorInternetConnection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getSize.m(16),
  },
  content: {flex: 1, alignItems: 'center'},
  footer: {
    marginBottom: getBottomSpace() || getSize.m(24),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body1: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '400',
    fontSize: getSize.m(16),
    marginLeft: getSize.m(8),
    bottom: getSize.m(2),
  },
});
