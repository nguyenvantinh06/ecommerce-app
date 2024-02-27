import React, {useCallback, useState} from 'react';
import {useAppDispatch} from "src/store/hooks";
import ResetPassword, {ResetPasswordDto} from './view';
import {SCENE_NAME} from "src/utils/app-const";
import {ChallengePasswordRequest} from "../../../apis";
import { authActions } from 'src/store/slices/auth-slice';

interface Props {
  navigation: any
  route: any
}

export default function ({
 navigation,
 route
}: Props) {
  const dispatch = useAppDispatch();

  const handleOnPressResetPassword = useCallback(
    (dataResetPassword: ResetPasswordDto, reset?: Function) => {
      console.log('dataResetPassword', dataResetPassword)
      console.log('route', route)
      const { email, tempPassword } = route.params
      const { password } = dataResetPassword
      const challengePasswordReq: ChallengePasswordRequest = {
        email,
        tempPassword,
        newPassword: password
      }
      console.log('challengePasswordReq', challengePasswordReq)
      const option = {
        callback: (res: any) => {
          console.log('challenge password response', res)
          if (res) {
            global.toast?.show('Your password has been reset successfully.', {
              type: 'success'
            })
            setTimeout(() => {
              navigation.reset({
                index: 0,
                routes: [{name: SCENE_NAME.LOGIN}],
              });
            }, 500);
          } else {
            global.toast?.show('The password reset didn\'t work. Please try again or contact us for help.', {
              type: 'error'
            })
          }
        },
        payLoadResetPassword: challengePasswordReq
      }
      dispatch(authActions.onResetPasswordSubmit({ ...option }))
    },
    [dispatch]
  )

  return (
    <ResetPassword
      navigation={navigation}
      handleOnPressResetPassword={handleOnPressResetPassword}
    />
  )
}
