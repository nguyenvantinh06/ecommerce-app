import React, {useCallback, useState} from 'react';
import {useAppDispatch} from 'src/store/hooks';
import ResetPasswordCodeScreen, {ResetPasswordDto} from './view';
import {SCENE_NAME} from 'src/utils/app-const';
import {authActions} from 'src/store/slices/auth-slice';

export interface ResetPasswordWithCodeRequest {
  email: string;
  code: string;
  password: string;
}
interface Props {
  navigation: any;
  route: any;
}

export default function ({navigation, route}: Props) {
  const dispatch = useAppDispatch();
  const [errorResponseMessage, setErrorResponseMessage] = useState<string>('');

  const handleOnPressResetPassword = useCallback(
    (dataResetPassword: ResetPasswordDto, reset?: Function) => {
      console.log('dataResetPassword', dataResetPassword);
      console.log('route', route);
      const {email} = route.params;
      const {password, code, passwordConfirmation} = dataResetPassword;
      const changePasswordCode: ResetPasswordWithCodeRequest = {
        email,
        code: code,
        password: password,
      };
      console.log('changePasswordCode', changePasswordCode);
      const option = {
        callback: (res: any) => {
          console.log('challenge password response', res);
          const {status, data} = res;
          if (status === 200) {
            global.toast?.show('Your password has been reset successfully.', {
              type: 'success',
            });
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{name: SCENE_NAME.LOGIN}],
              });
            }, 500);
          } else if (status === 400) {
            reset?.({
              code: code,
              password: password,
              passwordConfirmation: passwordConfirmation,
            });
            const errMsg = data.message;
            if (errMsg === 'CodeMismatchException') {
              setErrorResponseMessage(
                'Invalid verification code provided, please try again',
              );
            }
            if (errMsg === 'LimitExceededException') {
              setErrorResponseMessage(
                'Attempt limit exceeded, please try after some time',
              );
            }
          } else {
            setErrorResponseMessage(
              'Something went wrong, please try again later!',
            );
          }
        },
        payLoadResetPassword: changePasswordCode,
      };
      dispatch(authActions.resetPasswordWithCodeSubmit({...option}));
    },
    [dispatch],
  );

  return (
    <ResetPasswordCodeScreen
      navigation={navigation}
      handleOnPressResetPassword={handleOnPressResetPassword}
      setErrorResponseMessage={setErrorResponseMessage}
      errorResponseMessage={errorResponseMessage}
      route={route}
    />
  );
}
