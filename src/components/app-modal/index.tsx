import AppStyles from 'src/config/styles';
import {getSize} from 'src/hooks/use-resize-hoc';
import {STYLE_GLOBAL} from 'src/config/style-global';
import React, {useEffect} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import AppText from 'src/components/app-text';
import {useAppTheme} from 'src/config/theme-config';
interface Props {
  showModal: boolean;
  setShowModal: (value?: boolean) => void;
  children: React.ReactElement;
  hasButtonLeft?: boolean;
}
const AppModal = ({
  showModal,
  setShowModal,
  children,
  hasButtonLeft = true,
}: Props) => {
  const theme = useAppTheme();
  useEffect(() => {
    Keyboard.dismiss();
  }, [showModal]);
  return (
    <Portal>
      <Modal
        visible={showModal}
        onDismiss={setShowModal}
        contentContainerStyle={[
          styles.container,
          {backgroundColor: theme.dark ? '#292541' : theme.colors.background},
        ]}>
        <>
          <View style={styles.content}>{children}</View>
          {/* footer */}
          <View
            style={[styles.footer, {borderColor: theme.colors.borderColor}]}>
            <View style={styles.innerFooter}>
              {hasButtonLeft ? (
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    <AppText
                      style={{
                        ...STYLE_GLOBAL.body1,
                        color: AppStyles.color.SECONDARY,
                      }}>
                      Save
                    </AppText>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderLeftWidth: 1,
                      borderColor: 'rgba(0, 0, 0, 0.16)',
                    }}
                  />
                </>
              ) : null}
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowModal(false);
                }}>
                <AppText
                  style={{
                    ...STYLE_GLOBAL.body1,
                    color: AppStyles.color.SECONDARY,
                  }}>
                  Cancel
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </Modal>
    </Portal>
  );
};
export default AppModal;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: getSize.m(16),
    borderRadius: getSize.m(24),
  },
  footer: {
    borderTopWidth: 1,
    height: getSize.m(56),
  },
  innerFooter: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 12,
  },
  content: {},
});
