import React from 'react';
import AppContainer from 'src/components/app-container';
import AppWebView from 'src/components/app-web-view';

function SignUpScreen() {
  return (
    <AppContainer hasIconRight={false} title="Sign Up">
      <AppWebView uri={'https://dev.rnproject_template-colearning.space/sign-up'} />
    </AppContainer>
  );
}

export default React.memo(SignUpScreen);
