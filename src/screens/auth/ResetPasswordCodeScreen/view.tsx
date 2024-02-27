import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
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
import _ from 'lodash';
import AppView from 'src/components/app-view';

interface Props {
  navigation: any;
  handleOnPressResetPassword: any;
  errorResponseMessage: string;
  setErrorResponseMessage: Function;
  route: any;
}

export type ResetPasswordDto = {
  password: string;
  passwordConfirmation: string;
  code: string;
};

const schema = yup
  .object({
    code: yup.string().required('Code is required'),
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

const ResetPasswordCodeScreen = ({
  navigation,
  route,
  handleOnPressResetPassword,
  setErrorResponseMessage,
  errorResponseMessage,
}: Props) => {
  const onBackToForgotPasswordScreen = () => {
    navigation.navigate(SCENE_NAME.FORGOT_PASSWORD);
  };

  const defaultValues = {
    code: '',
    password: '',
    passwordConfirmation: '',
  };

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
    reset,
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  const isDisabledSubmit = React.useMemo(() => {
    return (
      watch('password') === '' ||
      watch('passwordConfirmation') === '' ||
      watch('code') === ''
    );
  }, [watch('password'), watch('passwordConfirmation'), watch('code')]);

  const onSubmit = (data: ResetPasswordDto) => {
    handleOnPressResetPassword(data, reset);
  };

  useEffect(() => {
    if (isDirty) {
      setErrorResponseMessage('');
    }
  }, [isDirty]);

  return (
    <AppContainer
      hasIconRight={false}
      title="Reset Password"
      onPressIconLeft={onBackToForgotPasswordScreen}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={'handled'}>
        {/* <TouchableOpacity onPress={onBackToForgotPasswordScreen}>
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
          <AppText style={[styles.textSendCode]}>
            We have sent a password reset code by email to{' '}
            {route?.params?.email || ''}. Enter it below to reset your password.
          </AppText>
          <View>
            <Controller
              control={control}
              rules={{
                required: 'Please enter code',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AppTextInput
                  label="Enter code"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.code}
                  keyboardType="numeric"
                  isRequired
                />
              )}
              name="code"
            />
            {!isEmpty(errors.code) && (
              <AppText style={styles.textError}>{errors.code?.message}</AppText>
            )}
          </View>
          <View
            style={{
              marginTop: errors?.code ? getSize.m(24) : getSize.m(16),
            }}>
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
          {!_.isEmpty(errorResponseMessage) ? (
            <AppView style={styles.containerErrorResponse}>
              <VectorIcon.MaterialCommunityIcons
                name="close-circle"
                size={getSize.s(18)}
                color={AppStyles.color.RED_500}
                style={{marginTop: getSize.m(2)}}
              />
              <AppText style={styles.textErrorResponse}>
                {errorResponseMessage}
              </AppText>
            </AppView>
          ) : null}
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

export default React.memo(ResetPasswordCodeScreen);

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
  containerErrorResponse: {
    flexDirection: 'row',
    marginTop: getSize.m(24),
    backgroundColor: AppStyles.color.RED_50,
    padding: getSize.m(12),
    borderRadius: getSize.m(6),
  },
  textErrorResponse: {
    ...STYLE_GLOBAL.body2,
    color: AppStyles.color?.RED_800,
    marginLeft: getSize.m(8),
  },
  textSendCode: {
    ...STYLE_GLOBAL.body2,
    color: AppStyles.color?.GRAY_500,
    marginBottom: getSize.m(8),
    fontWeight: '700',
  },
});
