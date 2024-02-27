import React, {useCallback, useState, useMemo, useEffect} from 'react';
import {Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import AppText from 'src/components/app-text';
import AppStyles from 'src/config/styles';

type Props = {
  style?: any;
  source?: any;
  url?: string;
  imgError?: string;
  iconError?: JSX.Element;
  [x: string]: any;
};

function AppImage({style, source, url, imgError, iconError, ...rest}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);
  const sour = useMemo(() => source || {uri: url}, [source, url]);
  const onError = useCallback(() => {
    setIsError(true);
  }, []);

  // useEffect(() => {
  //   setIsError(false);
  //   sour?.uri &&
  //     Image.prefetch(sour.uri).catch(() => {
  //       setIsError(true);
  //     });
  // }, [sour]);

  const onLoadStart = useCallback(() => {
    setIsError(false);
    setIsLoading(true);
  }, []);

  if (isError) {
    return imgError ? (
      <Image
        {...rest}
        style={[styles.container, styles.image, style]}
        source={{uri: imgError}}
      />
    ) : (
      <View
        style={[
          styles.container,
          style,
          {
            backgroundColor: AppStyles.color.COLOR_BORDER,
          },
        ]}>
        {iconError ? <>{iconError}</> : <AppText>Error</AppText>}
      </View>
    );
  }

  return (
    <>
      <FastImage
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        {...rest}
        style={[styles.container, style]}
        source={sour}>
        {isLoading && (
          <View style={[styles.container, style, styles.overlay]}>
            <Spinner color={AppStyles.color.COLOR_PRIMARY_100} />
          </View>
        )}
      </FastImage>
    </>
  );
}

export default React.memo(AppImage);
