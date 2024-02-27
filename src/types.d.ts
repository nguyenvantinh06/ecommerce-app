import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import { SCENE_NAME } from 'app/utils/app-const';

declare type ParamList<T> = {
  params: T;
};

/**
 * @example
 * - Example using with hook
 * type ScreenAProps = { data: any; }
 * const route = useRoute<RouteType<ScreenAProps>>();
 * */
declare type RouteType<T extends ParamListBase> = RouteProp<
  ParamList<T>,
  'params'
>;

declare type ScreenNames =
  | keyof typeof SCENE_NAME
  | 'AuthStack'
  | 'LoggedStack'
  | 'HomeTab'
  | 'ChatTab'
  | 'CurrentTrip'
  | 'BulletinTab'
  | 'CalendarTab'
  | 'HomeScreen'
  | 'TripDetailScreen'
  | 'EventCalendarDetailScreen'
  | 'CalendarScreen';
declare type RootStackParamList = Record<ScreenNames | SCENE_NAME, any>;

/**
 * @example
 * - Example using with hook
 * const navigation = useNavigation<StackNavigation>();
 * */
declare type StackNavigation = NavigationProp<RootStackParamList>;
