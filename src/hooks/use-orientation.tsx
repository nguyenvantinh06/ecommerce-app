import React, {PropsWithChildren} from 'react';
import {useWindowDimensions} from 'react-native';
import {deviceHeight, deviceWidth} from 'src/utils/app-const';
import AppOrientation, {
  OrientationType,
  useOrientationChange,
  useDeviceOrientationChange,
  useLockListener,
} from 'react-native-orientation-locker';

/**
 *
 * @type IOrientationType
 * */
type IOrientationType = keyof typeof OrientationType;

/**
 *
 * @interface IOrientationResponse
 * */
interface IOrientationResponse {
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
  orientation: IOrientationType;
  deviceOrientation: IOrientationType;
  isLocked: IOrientationType | boolean;
}

/**
 *
 * @context OrientationContext
 * */
const OrientationContext = React.createContext<IOrientationResponse>({
  width: deviceWidth,
  height: deviceHeight,
  isPortrait: true,
  isLandscape: false,
  orientation: 'PORTRAIT',
  deviceOrientation: 'PORTRAIT',
  isLocked: false,
});

/**
 *
 * @export OrientationContext
 * @component OrientationProvider
 * */
export const OrientationProvider = React.memo(
  ({children}: PropsWithChildren<{}>) => {
    const {width, height} = useWindowDimensions();
    const [currentOrientation, setCurrentOrientation] =
      React.useState<IOrientationType>(AppOrientation.getInitialOrientation());
    const [isLocked, setLocked] = React.useState<IOrientationType | boolean>(
      false,
    );
    const [deviceOrientation, setDeviceOrientation] =
      React.useState<IOrientationType>('PORTRAIT');

    React.useEffect(() => {
      AppOrientation.getOrientation((orientation: OrientationType) => {
        // console.log('getOrientation: ', error, orientation);
        setCurrentOrientation(orientation);
      });
      AppOrientation.getDeviceOrientation((orientation: OrientationType) => {
        // console.log('getSpecificOrientation: ', error, orientation);
        setDeviceOrientation(orientation);
      });

      return () => {};
    }, []);

    /**
     *
     * @hook - add hook useOrientationChange
     * @summary - add the listener orientation changed
     * @returns {IOrientationType}
     * */
    useOrientationChange((o: OrientationType) => {
      setCurrentOrientation(o);
    });

    /**
     *
     * @hook - add hook useDeviceOrientationChange
     * @summary - add the listener device orientation changed
     * @returns {IOrientationType}
     * */
    useDeviceOrientationChange((o: OrientationType) => {
      setDeviceOrientation(o);
    });

    /**
     *
     * @hook - add hook useLockListener
     * @summary - add the listener trigger orientation is locked
     * @returns {IOrientationType}
     * */
    useLockListener((o: OrientationType) => {
      setLocked(o);
    });

    return (
      <OrientationContext.Provider
        value={{
          width,
          height,
          isPortrait:
            currentOrientation === 'PORTRAIT' ||
            currentOrientation === 'PORTRAIT-UPSIDEDOWN',
          isLandscape:
            currentOrientation === 'LANDSCAPE-LEFT' ||
            currentOrientation === 'LANDSCAPE-RIGHT',
          orientation: currentOrientation,
          deviceOrientation,
          isLocked,
        }}>
        {children}
      </OrientationContext.Provider>
    );
  },
);

/**
 *
 * @hook useOrientation
 * @returns {IOrientationResponse}
 * @property {width} Automatically change if its orientation is landscape and vice versa.
 * @property {height} Automatically change if its orientation is landscape and vice versa.
 * @property {isPortrait} Is the orientation landscape mode?
 * @property {isLandscape} Is the orientation landscape mode?
 * @property {orientation} Orientation type including "PORTRAIT" | "PORTRAIT-UPSIDEDOWN" | "LANDSCAPE-LEFT" | "LANDSCAPE-RIGHT" | "FACE-UP" | "FACE-DOWN" | "UNKNOWN"
 * @property {deviceOrientation} Device Orientation type including "PORTRAIT" | "PORTRAIT-UPSIDEDOWN" | "LANDSCAPE-LEFT" | "LANDSCAPE-RIGHT" | "FACE-UP" | "FACE-DOWN" | "UNKNOWN"
 * @property {isLocked} Is the orientation locked?
 * */
function useOrientation(): IOrientationResponse {
  const context = React.useContext(OrientationContext);
  return context;
}

export default useOrientation;
