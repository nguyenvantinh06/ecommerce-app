import {Platform, Keyboard} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import _ from 'lodash';

import BottomTabView from 'src/components/bottom-tab-view';
import AppText from 'src/components/app-text';
import AppView from 'src/components/app-view';
import {useAppTheme} from 'src/config/theme-config';
import AppContainer from 'src/components/app-container';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import useOrientation from 'src/hooks/use-orientation';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {SCENE_NAME} from 'src/utils/app-const';
import {StackActions} from '@react-navigation/native';
import TestScreen from 'src/screens/Test';

const Todo = () => {
  return (
    <AppView>
      <AppText>Todo</AppText>
    </AppView>
  );
};

const Tab = createBottomTabNavigator();
const Stack =
  createStackNavigator<
    Record<'HomeScreen' | 'NOTIFICATIONS_SCREEN', undefined>
  >();

const HomeStack = React.memo(() => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={'HomeScreen'} component={Todo} />
    <Stack.Screen name={'ExampleScreen'}>
      {props => <TestScreen hasBack={true} {...props} />}
    </Stack.Screen>
    {/* <Stack.Screen
      name={SCENE_NAME.NOTIFICATIONS_SCREEN}
      component={NotificationsScreen}
    /> */}
  </Stack.Navigator>
));

const BottomTabStack = () => {
  const {orientation} = useOrientation();
  const [visible, setVisible] = React.useState<boolean>(true);
  // hide bottom tab when keyboard show
  React.useEffect(() => {
    let keyboardEventListeners: any[];
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach((eventListener: any) =>
            eventListener.remove(),
          );
      }
    };
  }, []);

  React.useEffect(() => {
    if (orientation === 'PORTRAIT') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [orientation]);

  // const tabPressListener = props => {
  //   const {navigation} = props;
  //   return {
  //     blur: e => {
  //       const target = e.target;
  //       const route = navigation.getState().routes.find(r => r.key === target);

  //       if (route?.state?.type === 'stack' && route.state.routes?.length > 1) {
  //         navigation.dispatch(StackActions.popToTop());
  //       }
  //     },
  //     state: () => {
  //       const state = navigation.getState();
  //       console.log('state', state);
  //     },
  //   };
  // };

  return (
    <Tab.Navigator
      initialRouteName={'HomeTab'}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => {
        if (!visible) {
          return null;
        }
        return <BottomTabView {...props} />;
      }}>
      <Tab.Screen
        name={SCENE_NAME.HOME_TAB}
        component={Todo}
        options={{title: 'Home'}}
        // listeners={props => tabPressListener({...props})}
      />
      <Tab.Screen
        name={SCENE_NAME.CHECK_IN_TAB}
        component={Todo}
        options={{
          title: 'Likes',
        }}
      />
      <Tab.Screen
        name={SCENE_NAME.UPDATES_TAB}
        component={Todo}
        options={{
          title: 'Messages',
        }}
      />
      <Tab.Screen
        name={SCENE_NAME.PROFILE_TAB}
        component={Todo}
        options={{
          title: 'Cart',
        }}
      />
      <Tab.Screen
        name={SCENE_NAME.HELP_TAB}
        component={Todo}
        options={{
          title: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};
export default React.memo(BottomTabStack);
