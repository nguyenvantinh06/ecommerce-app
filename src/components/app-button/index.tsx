import {
  TouchableOpacity,
  View,
  Keyboard,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import styles from './styles';
import AppStyles from 'src/config/styles';
import AppText from 'src/components/app-text';
import AppButtonPrimary from './app-button-primary';
import AppButtonSuccess from './app-button-success';
import AppButtonWarning from './app-button-warning';
import AppButtonError from './app-button-error';
import AppButtonSecondary from './app-button-secondary';
import AppButtonBase from './app-base-button';

type Props = {
  type: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'custom' | 'agora_chrome_yellow' | 'agora_primary_600' | 'agora_gray_300';
  style?: ViewStyle;
  styleTouchOpacity?: ViewStyle;
  title?: string;
  styleText?: TextStyle;
  disabled?: boolean;
  children?: React.ReactElement;
  onPress?: () => void;
  outline?: boolean;
  styleChildren?: ViewStyle;
};
function AppButtonView({
  type,
  style,
  styleTouchOpacity,
  title = 'Default Title',
  styleText,
  disabled,
  children,
  onPress,
  outline,
  styleChildren,
}: Props) {
  const styleButton = useMemo(() => {
    return [styles.defaultButton(disabled), styleTouchOpacity];
  }, [styleTouchOpacity, disabled]);
  const getColorByType = React.useMemo(() => {
    switch (type) {
      case 'primary':
        return AppStyles.color.SECONDARY;
      case 'secondary':
        return AppStyles.color.WHITE;
      case 'success':
        return AppStyles.color.SUCCESS;
      case 'error':
        return AppStyles.color.DANGER;
      case 'warning':
        return AppStyles.color.WARNING;
      case 'custom':
        return AppStyles.color.WHITE;
      case 'agora_chrome_yellow':
        return AppStyles.color.COLOR_CHROME_YELLOW;
      case 'agora_primary_600':
        return AppStyles.color.COLOR_PRIMARY_600;
        case 'agora_gray_300':
          return AppStyles.color.COLOR_GRAY_300;
      default:
        return AppStyles.color.SECONDARY;
    }
  }, [type]);
  const styleTitle = useMemo(() => {
    return [
      styles.defaultText(disabled),
      type === 'secondary' && {color: AppStyles.color.SECONDARY},
      outline && {color: getColorByType},
      styleText,
    ];
  }, [disabled, styleText, type, outline, getColorByType]);
  const handleOnPress = () => {
    Keyboard.dismiss();
    onPress?.();
  };

  const defaultStyleButton = useMemo(() => {
    const defaultStyle: ViewStyle = {
      backgroundColor: outline ? 'transparent' : getColorByType,
      borderWidth: 2,
      borderColor: getColorByType,
      opacity: disabled ? 0.67 : 1,
    };

    if (type === 'secondary') {
      defaultStyle.borderColor = outline
        ? getColorByType
        : AppStyles.color.SECONDARY;
    }

    return defaultStyle;
  }, [outline, getColorByType, disabled, type]);

  return (
    <View style={style}>
      <TouchableOpacity
        style={[defaultStyleButton, styleButton]}
        disabled={disabled}
        onPress={handleOnPress}
        activeOpacity={0.6}>
        {children ? (
          <View style={styleChildren}>
            {children}
            <AppText style={[styleTitle]}>{title}</AppText>
          </View>
        ) : (
          <AppText style={[styleTitle]}>{title}</AppText>
        )}
      </TouchableOpacity>
    </View>
  );
}

export const AppButton = {
  Base: React.memo(AppButtonBase),
  Primary: React.memo(AppButtonPrimary),
  Secondary: React.memo(AppButtonSecondary),
  Success: React.memo(AppButtonSuccess),
  Error: React.memo(AppButtonError),
  Warning: React.memo(AppButtonWarning),
};

export default React.memo(AppButtonView);
