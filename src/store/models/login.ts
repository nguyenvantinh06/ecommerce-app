export interface ILoginState {
  isLoggedIn: boolean;
  currentUser: ICurrentUser | undefined;
  deviceToken?: string | undefined;
  isPostedDeviceToken?: boolean | undefined;
}

export interface ICurrentUser {
  accessToken: string;
  refreshToken?: string;
  requiredChallenge?: boolean;
  sub?: string;
  userInfo: any;
}
