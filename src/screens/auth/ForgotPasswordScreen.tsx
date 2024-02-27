import React, {useCallback, useEffect, useState} from 'react';
import AppContainer from 'src/components/app-container';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AppText from 'src/components/app-text';
import AppTextInput from 'src/components/app-text-input';
import _ from 'lodash';
import AppButton from 'src/components/app-button';
import AppView from 'src/components/app-view';
import VectorIcon from 'src/components/vector-icon';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppStyles from 'src/config/styles';
import {StyleSheet} from 'react-native';
import {useAppDispatch} from 'src/store/hooks';
import {authActions} from 'src/store/slices/auth-slice';
import {GlobalUIManager} from 'src/global-ui';
import NavigationService from 'src/navigation/navigations-service';
import {SCENE_NAME} from 'src/utils/app-const';
import {PasswordResetResponse} from "../../apis";

export type FormData = {
  email: string;
};

const schema = yup
  .object({
    email: yup.string().required().email(),
  })
  .required();

function ForgotPasswordScreen() {
  const [errorResponseMessage, setErrorResponseMessage] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleOnPressForgotPassword = useCallback(
    (formData: FormData, reset?: Function) => {
      const options = {
        callback: (res: any) => {
          console.log('forgot password res', res);
            reset?.({
              email: formData?.email,
            });
          const {status, data} = res;
          if (status === 200) {
            const { userStatus } = data
            if (userStatus === 'CONFIRMED' || userStatus === 'RESET_REQUIRED') {
              GlobalUIManager.view?.showPopup('alert', {
                title: 'Success',
                message:
                  `Check your inbox for the code to unlock your new password.`,
                textConfirm: 'Confirm',
                onConfirm: () =>
                  NavigationService.navigate(
                    SCENE_NAME.RESET_PASSWORD_CODE_SCREEN,
                    {email: formData?.email},
                  ),
              });
            } else if (userStatus === 'FORCE_CHANGE_PASSWORD') {
              GlobalUIManager.view?.showPopup('alert', {
                title: 'Success',
                message:
                  'Please use the temporary password that send to your email to sign in, after which you will be prompted to create a new one.',
                textConfirm: 'Confirm',
                onConfirm: () =>
                  NavigationService.navigate(
                    SCENE_NAME.LOGIN
                  ),
              });
            }
          } else if (status === 400) {
            const { message } = data
            GlobalUIManager.view?.showPopup('alert', {
              title: 'Error',
              message,
              textConfirm: 'Cancel'
            });
          }
          // adjust flow with code
          // NavigationService.navigate(SCENE_NAME.RESET_PASSWORD_CODE_SCREEN, {
          //   email: formData?.email,
          // });
        },
        formData,
      };
      dispatch(authActions.forgotPasswordSubmit({...options}));
    },
    [dispatch],
  );

  const defaultValues = {
    email: '',
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
  });

  const onSubmit = (data: FormData) => {
    handleOnPressForgotPassword(data, reset);
  };
  const isDisabledForgotPassword = React.useMemo(() => {
    return watch('email') === '';
  }, [watch('email')]);

  useEffect(() => {
    if (isDirty) {
      setErrorResponseMessage('');
    }
  }, [isDirty]);
  return (
    <AppContainer hasIconRight={false} title="Forgot Password">
      <AppView style={styles.container}>
        {/* <AppText style={{}}>Forgot password</AppText> */}
        <AppView style={{marginBottom: getSize.m(24)}}>
          <Controller
            control={control}
            rules={{
              required: 'Please enter email',
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <AppTextInput
                label="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors?.email || !_.isEmpty(errorResponseMessage)}
              />
            )}
            name="email"
          />
          {!_.isEmpty(errors.email) && (
            <AppText style={styles.textErrorEmail}>
              Enter a valid email ID
            </AppText>
          )}
        </AppView>
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
          disabled={isDisabledForgotPassword || !_.isEmpty(errors)}
          title="Reset password"
          onPress={handleSubmit(onSubmit)}
          type={
            isDisabledForgotPassword ? 'agora_gray_300' : 'agora_primary_600'
          }
        />
      </AppView>
    </AppContainer>
  );
}

export default React.memo(ForgotPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getSize.m(20),
    paddingTop: getSize.m(16),
  },
  textErrorEmail: {
    color: AppStyles.color.GRAY_500,
    marginTop: getSize.m(8),
  },
  containerErrorResponse: {
    flexDirection: 'row',
    marginTop: getSize.m(24),
    backgroundColor: AppStyles.color.RED_50,
    padding: getSize.m(12),
    borderRadius: getSize.m(6),
  },
  textErrorResponse: {
    color: AppStyles.color?.RED_800,
    marginLeft: getSize.m(8),
  },
});
