import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {StackNavigation, ScreenNames} from 'src/types';
import {SCENE_NAME} from 'src/utils/app-const';
interface RefObject<T> {
  current: T | null;
}
// NavigationContainer is referred here - Check NavigationStack
export const navigationRef = React.createRef<NavigationContainerRef<{}>>();

export const routeNameRef: RefObject<string> = React.createRef<string | null>();
function navigate(name: ScreenNames | SCENE_NAME, params?: any) {
  const navigation: StackNavigation =
    navigationRef.current as unknown as StackNavigation;
  navigation?.navigate<any>(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

const NavigationService = {
  navigate,
  goBack,
};

export default NavigationService;
