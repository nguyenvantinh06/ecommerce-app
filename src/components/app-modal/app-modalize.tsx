import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextStyle,
} from 'react-native';
import React from 'react';
import {Modalize, ModalizeProps} from 'react-native-modalize';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Portal} from 'react-native-paper';
import AppView from '../app-view';
import AppText from '../app-text';
import VectorIcon from '../vector-icon';
import AppStyles from 'src/config/styles';
import {getSize} from 'src/hooks/use-resize-hoc';
import {STYLE_GLOBAL} from 'src/config/style-global';

interface IAppModalize extends ModalizeProps {
  showAppModal: boolean;
  setShowAppModal: Function;
  titleModal: string;
  children: React.ReactElement;
  reset?: Function;
  titleModalStyles?: TextStyle;
  refreshControl?: Function | undefined;
}
const AppModalize = ({
  showAppModal,
  setShowAppModal,
  titleModal,
  children,
  titleModalStyles,
  refreshControl = undefined,
  panGestureEnabled = true,
  flatListProps = undefined,
  reset,
  adjustToContentHeight = true,
  ...props
}: IAppModalize) => {
  const modalRef = React.useRef(null);
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    if (!showAppModal) {
      modalRef.current?.close();
      return;
    }
    modalRef.current?.open();
    return () => {};
  }, [showAppModal]);

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <Portal>
      <Modalize
        {...props}
        ref={modalRef}
        handleStyle={{
          backgroundColor: 'transparent',
        }}
        {...(!adjustToContentHeight
          ? {
              avoidKeyboardLikeIOS: true,
              keyboardAvoidingBehavior:
                Platform.OS === 'android' ? 'height' : 'padding',
              modalStyle: {
                marginTop: insets.top + 35,
                height: 'auto',
              },
            }
          : {
              adjustToContentHeight: true,
            })}
        disableScrollIfPossible={false}
        // scrollViewProps={
        //   !flatListProps && {
        //     showsVerticalScrollIndicator: false,
        //     refreshControl: refreshControl,
        //     keyboardShouldPersistTaps: 'handled',
        //     removeClippedSubviews: false,
        //   }
        // }
        onBackButtonPress={() => {
          modalRef.current?.close();
          return true;
        }}
        useNativeDriver={true}
        onClosed={() => {
          reset?.();
          setShowAppModal(false);
        }}
        // flatListProps={
        //   !children && {...flatListProps, removeClippedSubviews: false}
        // }
        panGestureEnabled={panGestureEnabled}
        HeaderComponent={
          <>
            <AppView style={styles.headerModal}>
              <AppView style={{height: 24, aspectRatio: 1}} />
              <AppText style={[styles.txtTitleHeader, titleModalStyles]}>
                {titleModal}
              </AppText>
              <TouchableOpacity onPress={() => closeModal()}>
                <VectorIcon.MaterialCommunityIcons
                  name="close"
                  size={getSize.m(18)}
                  color={AppStyles.color.COLOR_GRAY_300}
                />
              </TouchableOpacity>
            </AppView>
            <AppView
              style={{
                borderBottomWidth: 1,
                borderColor: AppStyles.color.COLOR_GRAY_300,
              }}
            />
          </>
        }>
        {children}
      </Modalize>
    </Portal>
  );
};

export default React.memo(AppModalize);

const styles = StyleSheet.create({
  headerModal: {
    paddingHorizontal: getSize.m(12),
    height: getSize.v(46),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTitleHeader: {
    ...STYLE_GLOBAL.body1,
    fontWeight: '700',
  },
});
