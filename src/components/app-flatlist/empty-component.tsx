import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import AppText from 'src/components/app-text';
import {useAppTheme} from 'src/config/theme-config';
import AppStyles from 'src/config/styles';
import {STYLE_GLOBAL} from 'src/config/style-global';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppView from 'src/components/app-view';
import AppImage from 'src/components/app-image';

interface Props {
  errorOccurred?: boolean;
  textEmpty?: string;
  search?: string;
  hasImage?: boolean;
}
const EmptyComponent = ({
  errorOccurred,
  textEmpty,
  search,
  hasImage = true,
}: Props) => {
  const theme = useAppTheme();
  const {t} = useTranslation();

  const renderEmptyNoSearch = useCallback(() => {
    return hasImage ? (
      <>
        <AppImage
          source={require('src/assets/images/EmptyState.png')}
          style={styles.imageNoInformationFound}
        />
        <AppText style={styles.noDataImage}>
          You don’t have any updates yet. They will appear here as soon as you
          do.
        </AppText>
      </>
    ) : (
      <AppText
        style={[
          styles.noData,
          {
            color: theme.colors.text,
          },
        ]}>
        {errorOccurred ? t('error_message.server') : textEmpty || t('no_data')}
      </AppText>
    );
  }, [hasImage, errorOccurred, textEmpty]);

  return (
    <AppView flex={1} justifyCenter alignCenter>
      {!search ? (
        renderEmptyNoSearch()
      ) : (
        <AppView>
          <AppText
            style={[
              styles.noDataSearch,
              {
                color: theme.dark
                  ? AppStyles.color.WHITE_67
                  : AppStyles.color.BLACK_67,
              },
            ]}>
            {`No results for “${search}”`}
          </AppText>
          <AppText
            style={[
              styles.noTextSearch,
              {
                color: theme.dark
                  ? AppStyles.color.WHITE_38
                  : AppStyles.color.BLACK_38,
              },
            ]}>
            {'Check the spelling or try a new search.'}
          </AppText>
        </AppView>
      )}
    </AppView>
  );
};

export default React.memo(EmptyComponent);

const styles = StyleSheet.create({
  noData: {
    ...STYLE_GLOBAL.body2,
    marginTop: getSize.m(40),
    textAlign: 'center',
  },
  noDataSearch: {
    ...STYLE_GLOBAL.heading4,
    marginTop: getSize.m(240),
    textAlign: 'center',
    fontWeight: '500',
  },
  noTextSearch: {
    ...STYLE_GLOBAL.heading6,
    textAlign: 'center',
    fontWeight: '500',
  },
  imageNoInformationFound: {
    width: getSize.s(320),
    height: getSize.v(230),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  noDataImage: {
    ...STYLE_GLOBAL.body3,
    marginTop: getSize.m(16),
    marginHorizontal: getSize.m(24),
    color: AppStyles.color.GRAY_700,
    textAlign: 'center',
  },
});
