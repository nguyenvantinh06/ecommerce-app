import {StyleSheet, Modal, View, Platform} from 'react-native';
import React, {useState} from 'react';
import AppView from 'src/components/app-view';
import AppText from 'src/components/app-text';
import {getSize} from 'src/hooks/use-resize-hoc';
import {useAppTheme} from 'src/config/theme-config';
import AppStyles from 'src/config/styles';
import AppIcons from 'src/utils/app-icon';
import {STYLE_GLOBAL} from 'src/config/style-global';
import {Portal} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export interface IErrorUnderConstructionUI {
  show?: () => void;
}
const ErrorUnderConstructionUI = React.forwardRef<
  IErrorUnderConstructionUI,
  {}
>((props: any, ref) => {
  const theme = useAppTheme();
  const inset = useSafeAreaInsets();
  const [visible, setVisible] = useState<boolean>(false);
  const showModal = React.useCallback(() => {
    setVisible(true);
  }, []);
  const hideModal = React.useCallback(() => {
    setVisible(false);
  }, []);
  React.useImperativeHandle(ref, () => ({show: showModal}), [showModal]);
  return (
    <Portal>
      <Modal visible={visible}>
        <View
          style={[
            styles.container,
            {backgroundColor: theme.colors.background},
          ]}>
          {/* header */}
          <AppView
            style={[
              styles.header,
              {
                backgroundColor: theme.colors.background,
                paddingTop:
                  Platform.OS === 'ios'
                    ? inset.top + getSize.v(7)
                    : getSize.v(7),
              },
            ]}>
            <AppView style={styles.innerHeader}>
              {/* <TouchableOpacity activeOpacity={0.6} onPress={hideModal}>
                <VectorIcon.MaterialCommunityIcons
                  name="close-circle-outline"
                  size={getSize.m(24)}
                  color={theme.dark ? AppStyles.color.GRAY3 : theme.colors.text}
                />
              </TouchableOpacity> */}
            </AppView>
          </AppView>
          {/* body */}
          <AppView style={[styles.body, {paddingTop: getSize.m(132)}]}>
            {AppIcons.RoadBlock}
            <AppText
              style={{...STYLE_GLOBAL.heading4, paddingTop: getSize.m(48)}}>
              We will be back soon!
            </AppText>
            <AppText
              style={{
                ...STYLE_GLOBAL.body1,
                textAlign: 'center',
                paddingTop: getSize.m(24),
              }}>
              rnproject_template Parent is performing routine maintenance.
              Please wait a few minutes and then restart rnproject_template
              Parent.
            </AppText>
          </AppView>
          {/* footer */}
          {/* <AppView
            paddingHorizontal={getSize.m(16)}
            paddingBottom={getBottomSpace() || getSize.m(8)}>
            <AppButton type="primary" title="OK" onPress={hideModal} />
          </AppView> */}
        </View>
      </Modal>
    </Portal>
  );
});
export default ErrorUnderConstructionUI;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    minHeight: getSize.v(52),
    paddingHorizontal: getSize.m(16),
    backgroundColor: AppStyles.color.WHITE,
  },
  innerHeader: {
    height: getSize.v(52),
    paddingVertical: getSize.m(8),
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: getSize.m(32),
  },
});
