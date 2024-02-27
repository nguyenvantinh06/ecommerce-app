import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContainer from 'src/components/app-container';
import {getSize} from 'src/hooks/use-resize-hoc';
import VectorIcon from 'src/components/vector-icon';
import AppText from 'src/components/app-text';
import {STYLE_GLOBAL} from 'src/config/style-global';
import {SCENE_NAME} from 'src/utils/app-const';
import {Controller, useForm} from 'react-hook-form';
import AppTextInput from 'src/components/app-text-input';
import * as yup from 'yup';
import {isEmpty} from 'lodash';
import {yupResolver} from '@hookform/resolvers/yup';
import AppStyles from 'src/config/styles';
import AppButton from 'src/components/app-button';

interface Props {
  navigation: any;
  handleOnPressResetPassword: any;
}

export type ResetPasswordDto = {
  password: string;
  passwordConfirmation: string;
};

const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required('Password is required')
      .min(7, 'Password must be at least 7 characters')
      .matches(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        'Password must contain a number, a lowercase letter, and an uppercase letter',
      ),
    passwordConfirmation: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password'), ''], 'Confirm password does not match'),
  })
  .required();

const ResetPasswordScreen = ({navigation, handleOnPressResetPassword}: any) => {
  const onBackToLoginScreen = () => {
    navigation.navigate(SCENE_NAME.LOGIN);
  };

  const defaultValues = {
    password: '',
    passwordConfirmation: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty, isValid},
    reset,
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const isDisabledSubmit = React.useMemo(() => {
    return watch('password') === '' || watch('passwordConfirmation') === '';
  }, [watch('password'), watch('passwordConfirmation')]);

  const onSubmit = (data: ResetPasswordDto) => {
    handleOnPressResetPassword(data, reset);
  };

  return (
    <AppContainer
      hasIconRight={false}
      title="Reset Password"
      onPressIconLeft={onBackToLoginScreen}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'handled'}>
        {/* <TouchableOpacity onPress={onBackToLoginScreen}>
          <VectorIcon.Ionicons
            name="arrow-back"
            color="black"
            size={getSize.s(24)}
          />
        </TouchableOpacity>
        <AppText style={styles.pageTitle}>Reset password</AppText> */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
          }}>
          <View>
            <Controller
              control={control}
              rules={{
                required: 'Please enter new password',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AppTextInput
                  label="Enter new password"
                  textContentType="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.password}
                  isSecure
                  isRequired
                />
              )}
              name="password"
            />
            {!isEmpty(errors.password) && (
              <AppText style={styles.textError}>
                {errors.password?.message}
              </AppText>
            )}
          </View>
          <View
            style={{
              marginTop: errors?.password ? getSize.m(24) : getSize.m(16),
            }}>
            <Controller
              control={control}
              rules={{
                required: 'Please re-enter new password',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AppTextInput
                  label="Re-enter new password"
                  textContentType="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.passwordConfirmation}
                  isSecure
                  isRequired
                />
              )}
              name="passwordConfirmation"
            />
            {!isEmpty(errors.passwordConfirmation) && (
              <AppText style={styles.textError}>
                {errors.passwordConfirmation?.message}
              </AppText>
            )}
          </View>
          <AppButton
            disabled={isDisabledSubmit}
            type={isDisabledSubmit ? 'agora_gray_300' : 'agora_primary_600'}
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            styleText={styles.submitText}
            style={{marginTop: getSize.m(24)}}
            styleTouchOpacity={{opacity: 1}}
          />
        </View>
      </ScrollView>
    </AppContainer>
  );
};

export default React.memo(ResetPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getSize.m(20),
    paddingTop: getSize.m(16),
  },
  pageTitle: {
    ...STYLE_GLOBAL.heading1,
    fontSize: getSize.m(30),
    fontWeight: '800',
    lineHeight: getSize.m(36),
    marginTop: getSize.m(48),
    marginBottom: getSize.m(44),
  },
  textError: {
    ...STYLE_GLOBAL.body2,
    color: AppStyles.color?.RED_500,
    marginTop: getSize.m(8),
  },
  submitText: {
    ...STYLE_GLOBAL.heading5,
    fontWeight: '700',
    color: AppStyles.color.WHITE,
  },
});
