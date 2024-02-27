import NetInfo from '@react-native-community/netinfo';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
  PaperThemeDark,
  PaperThemeDefault,
} from 'src/config/theme-config';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import RootStack from 'src/navigation';
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
// import FirebaseConfig from './firebase-config';
import {getIsLoadingSelector} from 'src/store/slices/loading-slice';
import AppLoading from 'src/components/app-loading';
import {GlobalUI} from 'src/global-ui';
import {Appearance, NativeEventSubscription} from 'react-native';
import {changeTheme} from 'src/store/slices/theme-slice';
import {StartupStatus} from 'src/store/slices/app-startup-slice';

const Screens: React.FC = () => {
  const isDark = useAppSelector(state => state.theme.isDark);
  const themeSelector = useAppSelector(state => state.theme.themeSelect);
  const {status} = useAppSelector(state => state.appStartUp);
  const paperTheme = isDark ? PaperThemeDark : PaperThemeDefault;
  const combinedTheme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const isLoading = useAppSelector(getIsLoadingSelector);
  // const dispatch = useAppDispatch();
  // const firstCheckScheme = React.useRef(false);

  // useEffect(() => {
  //   let colorSchemaChange: NativeEventSubscription | null = null;
  //   if (themeSelector?.keyWord === 'system_setting') {
  //     colorSchemaChange = Appearance.addChangeListener(({colorScheme}) => {
  //       dispatch(
  //         changeTheme({
  //           title: 'Use system setting',
  //           keyWord: 'system_setting',
  //           value: colorScheme,
  //         }),
  //       );
  //     });
  //     return () => {
  //       // Appearance.removeChangeListener(dispatch);
  //       colorSchemaChange && colorSchemaChange.remove();
  //     };
  //   }
  // }, [dispatch, themeSelector?.keyWord]);

  // useEffect(() => {
  //   if (firstCheckScheme.current) {
  //     return;
  //   }
  //   if (
  //     themeSelector?.keyWord === 'system_setting' &&
  //     Appearance.getColorScheme() !== themeSelector?.value
  //   ) {
  //     dispatch(
  //       changeTheme({
  //         title: 'Use system setting',
  //         keyWord: 'system_setting',
  //         value: Appearance.getColorScheme(),
  //       }),
  //     );
  //     firstCheckScheme.current = true;
  //   }
  // }, [dispatch, themeSelector]);

  return React.useMemo(() => {
    console.log('status', status);

    return (
      <PaperProvider theme={PaperThemeDefault}>
        {status === StartupStatus.READY ? (
          <RootStack theme={combinedTheme} />
        ) : null}
        <GlobalUI />
        {/* <FirebaseConfig /> */}
        {isLoading && <AppLoading />}
      </PaperProvider>
    );
  }, [combinedTheme, isLoading, paperTheme, status]);
};

export default Screens;
