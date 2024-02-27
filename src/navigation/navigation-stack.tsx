import {NavigationContainer, Theme} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {useAppSelector} from 'src/store/hooks';
import BottomTabStack from 'src/navigation/tab-navigator';
import {SCENE_NAME} from 'src/utils/app-const';
import * as React from 'react';
import {DeviceEventEmitter, Platform, StatusBar} from 'react-native';
import {navigationRef, routeNameRef} from './navigations-service';
// import analytics from '@react-native-firebase/analytics';
import AppView from 'src/components/app-view';
import {useAppTheme} from 'src/config/theme-config';
import AppText from 'src/components/app-text';
import WelcomeScreen from 'src/screens/Welcome';
import ForgotPasswordScreen from 'src/screens/auth/ForgotPasswordScreen';
import SignUpScreen from 'src/screens/auth/SignUpScreen';
import {useCallback, useEffect} from 'react';
import {useAppDispatch} from 'src/store/hooks';
import {authActions} from 'src/store/slices/auth-slice';
import ResetPasswordScreen from 'src/screens/auth/ResetPasswordScreen';
import ResetPasswordCodeScreen from 'src/screens/auth/ResetPasswordCodeScreen';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

interface IProps {
  theme: Theme;
}

const Todo = () => {
  return (
    <AppView>
      <AppText>Todo</AppText>
    </AppView>
  );
};

const AuthNavigator = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCENE_NAME.WELCOME}
        component={WelcomeScreen}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name={SCENE_NAME.LOGIN}
        component={Todo}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name={SCENE_NAME.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name={SCENE_NAME.SIGN_UP}
        component={SignUpScreen}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name={SCENE_NAME.RESET_PASSWORD_SCREEN}
        component={ResetPasswordScreen}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name={SCENE_NAME.RESET_PASSWORD_CODE_SCREEN}
        component={ResetPasswordCodeScreen}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => {
  // const isPostedDeviceToken = useAppSelector(
  //   state => state.auth.isPostedDeviceToken,
  // );
  // post device token
  // const dispatch = useAppDispatch();
  // const postDeviceToken = useCallback(() => {
  //   const options = {
  //     callback: (res: any) => {
  //       console.log('res post token', res);
  //     },
  //   };
  //   dispatch(authActions.postDeviceTokenSubmit({...options}));
  // }, [dispatch]);
  // useEffect(() => {
  //   if (isPostedDeviceToken) return;
  //   postDeviceToken();
  // }, [postDeviceToken, isPostedDeviceToken]);

  return (
    <LoggedInStack.Navigator
      initialRouteName={SCENE_NAME.ROOT}
      // initialRouteName={SCENE_NAME.ERROR_UNDER_CONSTRUCTION}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCENE_NAME.ROOT} component={BottomTabStack} />
      {/* <Stack.Screen
        name={SCENE_NAME.NOTIFICATIONS_SCREEN}
        component={NotificationsScreen}
      />
       */}
      {/* <Stack.Screen name={SCENE_NAME.CURRENT_TRIP_DETAIL_SCREEN}>
        {props => (
          <CurrentTripDetail
            isCurrentTripTab={false}
            tripDetails={{}}
            isTripHistory={false}
            hasBack={false}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name={SCENE_NAME.TRIP_HISTORY_SCREEN}
        component={TripHistoryScreen}
      />
     */}
    </LoggedInStack.Navigator>
  );
};

const App: React.FC<IProps> = () => {
  const theme = useAppTheme();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  React.useEffect(() => {
    return StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current =
          navigationRef.current?.getCurrentRoute()?.name || '';
      }}
      onStateChange={async () => {
        // const previousRouteName = routeNameRef.current;
        const currentRouteName: string =
          navigationRef.current?.getCurrentRoute()?.name || '';

        // if (previousRouteName !== currentRouteName) {
        //   await analytics().logScreenView({
        //     screen_name: currentRouteName,
        //     screen_class: currentRouteName,
        //   });
        // }
        DeviceEventEmitter.emit('currentRouteName', {name: currentRouteName});
        routeNameRef.current = currentRouteName || null;
      }}
      theme={theme}>
      <StatusBar
        backgroundColor={Platform.select({
          ios: undefined,
          android: 'transparent',
        })}
        translucent={true}
      />
      <AppView row flex>
        <AppView flex>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {!isLoggedIn ? (
              <Stack.Screen name="LoggedStack" component={LoggedInNavigator} />
            ) : (
              <Stack.Screen
                name="AuthStack"
                component={AuthNavigator}
                options={{
                  animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
                }}
              />
            )}
          </Stack.Navigator>
        </AppView>
      </AppView>
    </NavigationContainer>
  );
};

export default App;
