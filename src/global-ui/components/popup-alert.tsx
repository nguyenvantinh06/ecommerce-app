import {Animated, Easing, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {IPopupUI} from 'src/global-ui/type';
import AppView from 'src/components/app-view';
import {IPopupOptions} from '../type';
import {Divider, Modal, Portal} from 'react-native-paper';
import {getSize} from 'src/hooks/use-resize-hoc';
import {useAppTheme} from 'src/config/theme-config';
import AppText from 'src/components/app-text';
import AppStyles from 'src/config/styles';
import {deviceHeight, deviceWidth} from 'src/utils/app-const';
import {FONT_FAMILY} from 'src/components/app-text/app-font';
type ICallback = (content?: string) => void;
const PopupAlertUI = React.forwardRef<IPopupUI, {}>((props: any, ref) => {
  const theme = useAppTheme();
  const [visible, setVisible] = React.useState(false);
  const [titlePopup, setTitle] = React.useState<string>('');
  const [messagePopup, setMessage] = React.useState<string>('');
  const [textConfirmAction, setTextConfirm] = React.useState<string>('');
  const confirmRef = React.useRef<ICallback | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = React.useCallback(() => {
    setVisible(true);
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, [fadeAnim]);

  const fadeOut = React.useCallback(() => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      setVisible(false);
    });
  }, [fadeAnim]);

  const showModal = fadeIn;
  const hideModal = fadeOut;

  const handleShowPopup = React.useCallback(
    ({title, message, onConfirm, textConfirm}: IPopupOptions): void => {
      setTitle(title || '');
      setMessage(message || '');
      setTextConfirm(textConfirm || '');
      showModal();
      confirmRef.current = onConfirm || null;
    },
    [showModal],
  );

  const handleConfirm = React.useCallback(() => {
    confirmRef.current?.();
    hideModal();
  }, [hideModal]);

  React.useImperativeHandle(
    ref,
    () => ({
      showPopup: handleShowPopup,
    }),
    [handleShowPopup],
  );

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        theme={{colors: {backdrop: 'transparent'}}}
        contentContainerStyle={styles.modalContain}>
        <Animated.View
          style={{
            width: deviceWidth,
            height: deviceHeight + 100,
            backgroundColor: theme.colors.backdrop,
            opacity: fadeAnim,
            ...styles.modalContain,
          }}>
          <Animated.View
            style={[
              styles.popupContainer,
              {
                transform: [{scale: fadeAnim}],
                opacity: fadeAnim,
                backgroundColor: theme.colors.background,
              },
            ]}>
            {/* Content */}
            <AppView center padding={getSize.m(16)}>
              {titlePopup ? (
                <AppText style={styles.titleHeader}>{titlePopup}</AppText>
              ) : null}
              {messagePopup ? (
                <AppText style={styles.messageContent}>{messagePopup}</AppText>
              ) : null}
            </AppView>
            <Divider />

            {/* Actions */}
            <AppView height={getSize.v(44)} row>
              <TouchableOpacity
                style={[styles.btnAction]}
                onPress={handleConfirm}>
                <AppText
                  color={AppStyles.color.SECONDARY}
                  style={styles.textAction}>
                  {textConfirmAction || 'Ok'}
                </AppText>
              </TouchableOpacity>
            </AppView>
          </Animated.View>
        </Animated.View>
      </Modal>
    </Portal>
  );
});

const styles = StyleSheet.create({
  modalContain: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: getSize.m(16),
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnAction: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightRadius: {
    borderBottomRightRadius: getSize.m(16),
  },
  titleHeader: {
    fontFamily: FONT_FAMILY.BOLD,
    fontWeight: '700',
    fontSize: getSize.m(20),
    lineHeight: getSize.m(20) * 1.5,
    marginBottom: getSize.m(8),
  },
  messageContent: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '400',
    fontSize: getSize.m(15),
    lineHeight: getSize.m(15) * 1.5,
    marginBottom: getSize.m(2),
  },
  textAction: {
    fontFamily: FONT_FAMILY.BOLD,
    fontWeight: '600',
    fontSize: getSize.m(16),
    lineHeight: getSize.m(16) * 1.5,
  },
});

export default PopupAlertUI;
