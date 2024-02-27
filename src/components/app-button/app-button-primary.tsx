import React, { PureComponent } from 'react';
import BaseButton, { IBaseButton } from './app-base-button';
import { withTheme } from 'react-native-paper';
import { AppTheme } from 'src/config/theme-config';
import AppStyles from 'src/config/styles';
import { getSize } from 'src/hooks/use-resize-hoc';

class ButtonPrimary extends PureComponent<
  IBaseButton & { theme: AppTheme },
  {}
> {
  static defaultProps: IBaseButton;
  render() {
    const {
      styleTouchOpacity = {},
      styleText = {},
      stylePress = {},
      ...rest
    } = this.props;
    return (
      <BaseButton
        styleText={{
          fontWeight: '600',
          color: AppStyles.color.WHITE,
          ...styleText,
        }}
        styleTouchOpacity={{
          backgroundColor: AppStyles.color.SECONDARY,
          paddingHorizontal: getSize.m(16),
          ...styleTouchOpacity,
        }}
        stylePress={{
          backgroundColor: '#1F92FF',
          ...stylePress,
        }}
        {...rest}
      />
    );
  }
}

ButtonPrimary.defaultProps = {
  title: 'Button',
  style: undefined,
  styleTouchOpacity: undefined,
  styleText: undefined,
  disabled: undefined,
  children: undefined,
  onPress: undefined,
  styleChildren: undefined,
};

export default withTheme(ButtonPrimary);
