/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-notifications';
import RootScreens from 'src/screens';
import Loading from './components/app-loading';
import './locales/IMLocalize';
import {persistor, store} from 'src/store/store';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {APIService} from 'src/services/client';
import {OrientationProvider} from 'src/hooks/use-orientation';
import {UIManager, Platform} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {GlobalConfigProvider} from 'src/hooks/use-global-config';
import 'src/services/app-service';
// import 'src/services/background-service';
import useStartUp from 'src/hooks/use-start-up';
import {StartupStatus} from 'src/store/slices/app-startup-slice';
import {useAppSelector} from './store/hooks';
import useBackHandler from './hooks/use-back-handler';
import {BaseToastComponent} from 'src/config/toast-config';
import codePush from 'react-native-code-push';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  // mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: null,
};

const Setup = () => {
  useStartUp();
  useBackHandler();
  const {status} = useAppSelector(state => state.appStartUp);
  return React.useMemo(() => {
    const isLoadedUI =
      status === StartupStatus.LOAD_UI ||
      status === StartupStatus.LOAD_UI_DONE ||
      status === StartupStatus.READY;
    if (isLoadedUI) {
      return <RootScreens />;
    } else {
      return null;
    }
  }, [status]);
};
// @codePush(codePushOptions)
@StartApplication
class EntryPoint extends React.Component {
  constructor(props: any) {
    super(props);
  }

  componentWillUnmount(): void {
    // BackgroundService.onDestroy();
  }

  render() {
    return (
      <GlobalConfigProvider onReadyRender={() => {}}>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <SafeAreaProvider>
              {/* addition provider for the orientation feature*/}
              <OrientationProvider>
                <Setup />
                <Toast
                  offset={50}
                  animationType="slide-in"
                  placement="top"
                  ref={ref => (global.toast = ref)}
                  renderToast={toastOptions => (
                    <BaseToastComponent toastOptions={toastOptions} />
                  )}
                />
              </OrientationProvider>
              {/* <Toast config={toastConfig} /> */}
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </GlobalConfigProvider>
    );
  }
}

// define class decorator for the initialize app root
function StartApplication(fn: Function) {
  console.log(
    '------------------------------- Start initialize app root ----------------------------',
  );
  // first init crashlytics
  // crashlytics().crash();
  // console.log('Init crashlytics done!');
  // crashlytics().log('Init crashlytics feature!');

  console.log('Locking to portrait!');
  Orientation.lockToPortrait();
  console.log('Locked to portrait!');

  console.log('Initialing api client service');
  APIService.instance();
  console.log('Completed init api client service!');

  // apiClient = APIService.instance();
  console.log(
    '------------------------------- End initialize app root ----------------------------',
  );
}

let EntryPointApp = EntryPoint;
// if (!__DEV__) {
//   EntryPointApp = codePush(codePushOptions)(EntryPoint);
// }

export default gestureHandlerRootHOC(EntryPointApp, {
  flex: 1,
});
