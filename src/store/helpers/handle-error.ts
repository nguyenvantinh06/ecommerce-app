import i18n from 'i18next';

export function handleErrorMessage(err: any) {
  const {response} = err;
  console.log('respones ===> ', response, err);

  if (typeof err?.err === 'boolean') {
    return {
      code: 200,
      data: err?.err,
      status: 'RESPONSE_TYPE_BOOLEAN',
    };
  }

  if (response) {
    const {status, data} = response || {};
    const {message} = data || {};
    if (status === 401) {
      console.log('expired token');
      return {
        code: status,
        message,
        status: 'EXP_TOKEN',
      };
    } else if (status === 403) {
      console.log('token not valid');
      return {
        code: status,
        message,
        status: 'UNAUTHORIZED',
      };
    }

    if (message) {
      console.log('message error', message);
      return {
        code: status,
        message: message,
        status: status,
      };
    }

    return {
      code: status,
      message: i18n.t('common:error_message.server'),
      status: status,
    };
  } else {
    if (err) {
      console.log('err check', err);
      const {code, data, status} = err || {};
      const {message} = data || {};
      if (status === 401) {
        return {
          code: status,
          message,
          status: 'EXP_TOKEN',
        };
      } else if (status === 403) {
        return {
          code: status,
          message,
          status: 'UNAUTHORIZED',
        };
      }

      if (message) {
        return {
          code: code,
          message: message,
          status: status,
        };
      }

      return {
        code: code,
        message:
          i18n.t('error_message.server') || 'Error occurred. Please try again.',
        status: status,
      };
    }
  }
  const strMessage = err ? err.message : 'Error';

  return {
    code: 0,
    message: strMessage,
    status: 0,
  };
}
