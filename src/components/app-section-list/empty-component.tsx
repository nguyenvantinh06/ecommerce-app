import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import AppText from 'src/components/app-text';
import {useAppTheme} from 'src/config/theme-config';
import AppStyles from 'src/config/styles';
import {STYLE_GLOBAL} from 'src/config/style-global';
import {getSize} from 'src/hooks/use-resize-hoc';

interface props {
  errorOccurred?: boolean;
  textEmpty?: string;
}
const EmptyComponent = ({errorOccurred, textEmpty}: props) => {
  const theme = useAppTheme();
  const {t} = useTranslation();
  return (
    <AppText
      style={[
        styles.noData,
        {
          color: theme.dark ? theme.colors.text : AppStyles.color.PRIMARY,
        },
      ]}>
      {errorOccurred ? t('error_message.server') : textEmpty || t('no_data')}
    </AppText>
  );
};

export default React.memo(EmptyComponent);

const styles = StyleSheet.create({
  noData: {
    ...STYLE_GLOBAL.body2,
    margin: getSize.m(12),
    marginTop: getSize.m(36),
    textAlign: 'center',
  },
});
