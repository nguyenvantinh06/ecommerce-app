import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import AppText from 'src/components/app-text';
import AppStyles from 'src/config/styles';
import {getSize} from 'src/hooks/use-resize-hoc';
import {useTheme} from 'react-native-paper';
import {FONT_FAMILY} from '../app-text/app-font';
interface IFooterLoading {}

const FooterLoading = ({}: IFooterLoading) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="small"
        color={theme.dark ? AppStyles.color.GRAY3 : theme.colors.text}
      />
      <View style={{width: getSize.m(8), height: getSize.m(8)}} />
      <AppText
        color={theme.dark ? AppStyles.color.GRAY3 : theme.colors.text}
        style={styles.label}>
        Loading
      </AppText>
    </View>
  );
};

export default React.memo(FooterLoading);

const styles = StyleSheet.create({
  image: {
    width: getSize.m(24),
    height: getSize.m(24),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getSize.m(24),
  },
  label: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: getSize.m(12),
    lineHeight: getSize.m(18),
  },
});
