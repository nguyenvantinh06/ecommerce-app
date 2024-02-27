import React, {LegacyRef} from 'react';
import {WebView, WebViewNavigation, WebViewProps} from 'react-native-webview';
import {StyleSheet} from 'react-native';

import {deviceHeight, deviceWidth} from 'src/utils/app-const';
import Loading from 'src/components/app-loading';
import AppStyles from 'src/config/styles';

type Props = WebViewProps & {
  uri?: any;
  html?: any;
  hasHeader?: boolean;
  onLoadStart?: () => void;
  onLoad?: () => void;
  allowFileAccess?: boolean;
  onShouldStartLoadWithRequest?: (e: any) => boolean;
  onNavigationStateChange?: (event: WebViewNavigation) => void;
  webViewRef?: LegacyRef<WebView>;
  injectedJavaScript?: string;
  isHelpScreen?: boolean;
};

const AppWebView = ({
  uri,
  html,
  hasHeader = false,
  onLoadStart,
  onLoad,
  allowFileAccess,
  onShouldStartLoadWithRequest,
  onNavigationStateChange,
  webViewRef,
  injectedJavaScript,
  isHelpScreen = false,
  ...props
}: Props) => {
  const htmlTitle = `
    <html>
        <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <style>
            body{display: block;zoom: 1; font-size: 16px; padding: 4px; font-family: 'TTCommonsPro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;}
            p{line-height:24px;font-size: 16px;display: block;text-rendering: geometricPrecision} 
            img{border: 0;font-size: 0;line-height: 0;max-width:100%;height: auto; object-fit: contain; align-self: center;min-width: ${
              deviceWidth - 20
            }px !important}
            ul{list-style: none;}
            ul li::before {content: "\\2022";color: ${
              isHelpScreen
                ? AppStyles.color.COLOR_PRIMARY_600
                : AppStyles.color.BLACK
            };font-weight: bold;display: inline-block; width: 1em; margin-left: -1em;}
            a{font-size: 20px; font-weight:600; line-height: 24px; underline: none; text-decoration: none;}
            a[href^="tel:"] {color: inherit;}
            h1{font-size: 2em; font-weight: bolder; color: black;}
            h2 {font-size: 1.5em; font-weight: bolder; color: black;}
            h3 {font-size: 1.17em; font-weight: bolder; color: black;}
            h4 {font-size: 1em; font-weight: bolder; color: black;}
            h5 {font-size: 0.83em; font-weight: bolder; color: black;}
            blockquote {background: #f9f9f9; border-left: 4px solid #ccc; margin-top: 1.5em; margin-bottom: 1.5em; padding: 0.5em 10px; quotes: "\\201C""\\201D""\\2018""\\2019";}
            strong {color: black;}
        </style>
    </head>
  `;

  return (
    <WebView
      {...props}
      ref={webViewRef}
      javaScriptEnabled={true}
      injectedJavaScript={injectedJavaScript}
      domStorageEnabled
      startInLoadingState
      originWhitelist={['*']}
      scalesPageToFit={true}
      style={styles.container}
      renderLoading={() => <Loading />}
      source={
        uri
          ? {uri: uri}
          : {
              html: hasHeader ? htmlTitle + html + '</html>' : html,
            }
      }
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      onLoadStart={onLoadStart}
      onLoad={onLoad}
      allowFileAccess={allowFileAccess}
      onError={error => {
        console.log('error', error);
      }}
      onNavigationStateChange={onNavigationStateChange}
      androidLayerType="hardware"
      nestedScrollEnabled
    />
  );
};

export default AppWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 30,
  },
});
