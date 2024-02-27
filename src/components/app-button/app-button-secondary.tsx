import React, {PureComponent} from 'react';
import BaseButton, {IBaseButton} from './app-base-button';
import {withTheme} from 'react-native-paper';
import {AppTheme} from 'src/config/theme-config';
import AppStyles from 'src/config/styles';
import {getSize} from 'src/hooks/use-resize-hoc';

class ButtonSecondary extends PureComponent<
  IBaseButton & {theme: AppTheme},
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
          color: AppStyles.color.SECONDARY,
          ...styleText,
        }}
        styleTouchOpacity={{
          backgroundColor: 'transparent',
          paddingHorizontal: getSize.m(16),
          borderColor: AppStyles.color.SECONDARY,
          ...styleTouchOpacity,
        }}
        stylePress={{
          backgroundColor: '#0074E214',
          ...stylePress,
        }}
        {...rest}
      />
    );
  }
}

ButtonSecondary.defaultProps = {
  title: 'Button',
  style: undefined,
  styleTouchOpacity: undefined,
  styleText: undefined,
  disabled: undefined,
  children: undefined,
  onPress: undefined,
  styleChildren: undefined,
};

export default withTheme(ButtonSecondary);
