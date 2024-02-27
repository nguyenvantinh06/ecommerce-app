import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import AppView from '../app-view';
import AppText from '../app-text';
import {STYLE_GLOBAL} from 'src/config/style-global';
import {getSize} from 'src/hooks/use-resize-hoc';
import {useAppTheme} from 'src/config/theme-config';

interface IProps {
  searchKey: string;
}

const EmptySearch = ({searchKey}: IProps) => {
  const theme = useAppTheme();
  const color = useMemo(() => {
    return {
      result: theme.dark ? 'rgba(255, 255, 255, 0.67)' : 'rgba(0, 0, 0, 0.67)',
      deciption: theme.dark
        ? 'rgba(255, 255, 255, 0.38)'
        : 'rgba(0, 0, 0, 0.38)',
    };
  }, [theme.dark]);

  return (
    <AppView style={styles.container}>
      <AppText style={{textAlign: 'center'}}>
        <AppText
          style={{
            ...STYLE_GLOBAL.heading4,
            fontWeight: '500',
            color: color.result,
          }}>
          No Results for{' '}
        </AppText>
        <AppText
          style={{
            ...STYLE_GLOBAL.heading4,
            fontWeight: '500',
            color: color.result,
          }}>
          “{searchKey.trim()}”
        </AppText>
      </AppText>

      <AppText
        style={{
          ...STYLE_GLOBAL.heading6,
          fontWeight: '500',
          color: color.deciption,
        }}>
        Check the spelling or try a new search.
      </AppText>
    </AppView>
  );
};

export default EmptySearch;

const styles = StyleSheet.create({
  container: {
    paddingTop: getSize.s(254),
    alignItems: 'center',
  },
});
