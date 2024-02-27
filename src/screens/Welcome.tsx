import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import AppButton from 'src/components/app-button';
import AppText from 'src/components/app-text';
import {STYLE_GLOBAL} from 'src/config/style-global';
import AppStyles from 'src/config/styles';
import {getSize} from 'src/hooks/use-resize-hoc';
import {SCENE_NAME} from 'src/utils/app-const';

const WelcomeScreen = ({navigation}: any) => {
  const navigateToLoginScreen = async () => {
    navigation.navigate(SCENE_NAME.LOGIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.image}
        // resizeMode="cover"
        source={require('../assets/images/welcome_background.png')}>
        <View style={styles.bodyContainer}>
          <View style={styles.bodyContent}>
            <AppText style={styles.welcomeText}>
              Please use the same login details that you signed-up with on the
              rnproject_template Website
            </AppText>
            <AppButton
              title="Login"
              type="agora_chrome_yellow"
              styleText={styles.loginText}
              onPress={navigateToLoginScreen}
            />
          </View>
          {/* <Image
            source={require('../assets/images/learn_welcome_background.png')}
            style={styles.imageChild}
          /> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: getSize.m(160),
  },
  bodyContent: {
    marginLeft: getSize.m(64),
    marginRight: getSize.m(28),
  },
  welcomeText: {
    fontSize: getSize.m(18),
    fontWeight: '600',
    lineHeight: getSize.m(32),
    color: AppStyles.color.WHITE,
    marginBottom: getSize.m(24),
  },
  imageChild: {
    width: getSize.s(380),
    height: getSize.v(330),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  loginText: {
    ...STYLE_GLOBAL.heading5,
    fontWeight: '700',
    color: AppStyles.color.COLOR_WARM_GREY,
  },
});

export default WelcomeScreen;
