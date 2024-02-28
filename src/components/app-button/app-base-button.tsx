import {Keyboard, Pressable, TextStyle, View, ViewStyle} from 'react-native';
import React, {PureComponent} from 'react';
import AppText from '../app-text';
import styles from './styles';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppStyles from 'src/config/styles';
export interface IBaseButton {
  style?: ViewStyle;
  styleTouchOpacity?: ViewStyle;
  title?: string;
  styleText?: TextStyle;
  disabled?: boolean;
  children?: React.ReactElement;
  onPress?: () => void;
  styleChildren?: ViewStyle;
  stylePress?: ViewStyle;
}
class BaseButton extends PureComponent<IBaseButton, {}> {
  static defaultProps: IBaseButton;

  handleOnPress() {
    Keyboard.dismiss();
    const {onPress} = this.props;
    onPress?.();
  }
  render() {
    const {
      title,
      style,
      styleTouchOpacity,
      styleText,
      disabled,
      children,
      styleChildren,
      stylePress,
    } = this.props;

    const styleTitle = [
      ...styles.defaultText(disabled),
      {color: AppStyles.color.SECONDARY},
      styleText,
    ];
    const defaultStyleButton: ViewStyle = {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: 'transparent',
      opacity: disabled ? 0.4 : 1,
      height: getSize.m(44),
      width: '100%',
      borderRadius: getSize.m(4),
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <View style={style}>
        <Pressable
          style={({pressed}) => [
            defaultStyleButton,
            styleTouchOpacity,
            pressed && (stylePress || {opacity: 0.65}),
          ]}
          disabled={disabled}
          onPress={this.handleOnPress.bind(this)}>
          {children ? (
            <View style={styleChildren}>
              {children}
              <AppText style={[styleTitle]}>{title}</AppText>
            </View>
          ) : (
            <AppText style={[styleTitle]}>{title}</AppText>
          )}
        </Pressable>
      </View>
    );
  }
}

BaseButton.defaultProps = {
  title: 'Button',
  style: undefined,
  styleTouchOpacity: undefined,
  styleText: undefined,
  disabled: undefined,
  children: undefined,
  onPress: undefined,
  styleChildren: undefined,
  stylePress: undefined,
};

export default BaseButton;
