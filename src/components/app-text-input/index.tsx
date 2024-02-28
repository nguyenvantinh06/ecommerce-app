import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import AppText from 'src/components/app-text';
import styles from './styles';
import AppView from 'src/components/app-view';
import VectorIcon from 'src/components/vector-icon';
import {getSize} from 'src/hooks/use-resize-hoc';
import formatWithMask from './format-with-mask';
import AppStyles from 'src/config/styles';

type Props = {
  containerStyle?: ViewStyle;
  textInputStyle?: TextStyle;
  error?: any;
  messageError?: string;
  success?: any;
  hasShadow?: boolean;
  label?: string;
  styleViewInput?: ViewStyle;
  children?: React.ReactElement;
  refCallback?: React.LegacyRef<TextInput> | undefined;
  isSecure?: boolean;
  iconLeft?: React.ReactElement;
  styleTextError?: TextStyle;
  mask?: Array<any>;
  placeholderFillCharacter?: string;
  obfuscationCharacter?: string;
  showObfuscatedValue?: boolean;
  hiddenClearMode?: boolean;
  placeholder?: string;
  keyboardType?: string | undefined;
  onChangeText?: any;
  editable?: boolean;
  multiline?: boolean;
  value?: any;
  [x: string]: any;
  maxLength?: number;
  isRequired?: boolean;
};

function AppTextInput({
  value,
  placeholder,
  containerStyle,
  textInputStyle,
  keyboardType,
  error,
  messageError,
  success,
  hasShadow,
  label,
  onChangeText,
  styleViewInput,
  children,
  refCallback,
  isSecure,
  iconLeft,
  styleTextError,
  editable = true,
  mask,
  placeholderFillCharacter,
  obfuscationCharacter,
  showObfuscatedValue,
  selection,
  hiddenClearMode = false,
  multiline = false,
  maxLength,
  isRequired = false,
  ...otherProps
}: Props) {
  const [focus, setFocus] = useState(false);
  const [secureEye, setSecureEye] = useState(true);
  const _renderSecureIcon = () => {
    return (
      <TouchableOpacity onPress={() => setSecureEye(!secureEye)}>
        {secureEye ? (
          <VectorIcon.Ionicons
            name="eye-off-outline"
            color="gray"
            size={getSize.s(24)}
          />
        ) : (
          <VectorIcon.Ionicons
            name="eye-outline"
            color="gray"
            size={getSize.s(24)}
          />
        )}
      </TouchableOpacity>
    );
  };

  const maskArray = React.useMemo(
    () => (typeof mask === 'function' ? mask(value) : mask),
    [mask, value],
  );

  const formattedValueResult = React.useMemo(() => {
    return formatWithMask({text: value || '', mask, obfuscationCharacter});
  }, [mask, obfuscationCharacter, value]);

  const maskHasObfuscation = React.useMemo(
    () =>
      maskArray && !!maskArray.find((maskItem: any) => Array.isArray(maskItem)),
    [maskArray],
  );

  const isValueObfuscated = React.useMemo(
    () => !!maskHasObfuscation && !!showObfuscatedValue,
    [maskHasObfuscation, showObfuscatedValue],
  );
  const [heightText, setHeightText] = useState(0);
  const handleChangeText = React.useCallback(
    (text: string) => {
      let textToFormat = text;

      if (isValueObfuscated) {
        textToFormat = formattedValueResult.masked || '';

        if (textToFormat.length > text.length) {
          textToFormat = textToFormat.slice(0, -1);
        } else if (textToFormat.length < text.length) {
          textToFormat = textToFormat + text[text.length - 1];
        }
      }

      const result = formatWithMask({
        text: textToFormat,
        mask,
        obfuscationCharacter,
      });

      onChangeText &&
        onChangeText(result.masked, result.unmasked, result.obfuscated);
    },
    [
      isValueObfuscated,
      mask,
      obfuscationCharacter,
      onChangeText,
      formattedValueResult.masked,
    ],
  );

  const defaultPlaceholder = React.useMemo(() => {
    if (maskArray) {
      return maskArray
        .map((maskChar: any) => {
          if (typeof maskChar === 'string') {
            return maskChar;
          } else {
            return placeholderFillCharacter;
          }
        })
        .join('');
    } else {
      return undefined;
    }
  }, [maskArray, placeholderFillCharacter]);

  const inputValue = isValueObfuscated
    ? formattedValueResult.obfuscated
    : formattedValueResult.masked;

  return (
    <>
      {label && (
        <AppText style={[styles.label]}>
          {label}
          {isRequired && (
            <AppText style={[styles.label, {color: AppStyles?.color?.RED_600}]}>
              *
            </AppText>
          )}
        </AppText>
      )}
      <View
        style={
          !focus
            ? [
                styles.container,
                containerStyle,
                // hasShadow && styles.shadow,
                !editable && {
                  backgroundColor: AppStyles.color.BACKGROUND_TEXT_INPUT,
                },
                error && {borderColor: AppStyles.color.RED_300},
                success && {borderColor: AppStyles.color.SUCCESS},
                multiline && {
                  height: Math.max(getSize.v(100), heightText + getSize.v(40)),
                  paddingBottom: getSize.v(16),
                  borderWidth: 1,
                },
              ]
            : [
                styles.container,
                containerStyle,
                hasShadow && styles.shadow,
                !multiline ? styles.focus : styles.focusMultiline,
                !editable && {
                  backgroundColor: AppStyles.color.WHITE,
                },
                error && !focus && {borderColor: AppStyles.color.DANGER},
                success && !focus && {borderColor: AppStyles.color.SUCCESS},
                multiline && {
                  height: Math.max(getSize.v(120), heightText + getSize.v(40)),
                  paddingBottom: getSize.v(16),
                },
              ]
        }>
        {error && (
          <AppText style={[styles.txtError, styleTextError]}>
            {messageError}
          </AppText>
        )}
        <View
          style={[
            styles.inputContainer,
            (children || iconLeft) && styles.paddingInputContainer,
            styleViewInput,
            multiline && {
              alignItems: 'flex-start',
              paddingTop: 8,
            },
          ]}>
          {iconLeft && <View style={{marginRight: 12}}>{iconLeft}</View>}
          <AppView flex row>
            <TextInput
              clearButtonMode="never"
              placeholder={
                placeholderFillCharacter ? defaultPlaceholder : placeholder
              }
              {...otherProps}
              style={[
                styles.textInput,
                value && focus && !hiddenClearMode && {paddingRight: 35},
                textInputStyle,
                multiline && {
                  height: Math.max(getSize.v(120), heightText + getSize.v(24)),
                },
                error && !focus && {color: AppStyles.color.RED_900},
              ]}
              placeholderTextColor={AppStyles.color.COLOR_BORDER}
              value={mask ? inputValue : value}
              selection={
                mask
                  ? isValueObfuscated
                    ? {start: inputValue.length, end: inputValue.length}
                    : selection
                  : undefined
              }
              keyboardType={keyboardType}
              onChangeText={mask ? handleChangeText : onChangeText}
              textAlignVertical={multiline ? 'top' : 'center'}
              includeFontPadding={false}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              autoCapitalize="none"
              blurOnSubmit={!multiline}
              ref={refCallback}
              secureTextEntry={secureEye && isSecure}
              editable={editable}
              multiline={multiline}
              onContentSizeChange={event => {
                setHeightText(event.nativeEvent.contentSize.height);
              }}
              maxLength={maxLength}
              allowFontScaling={false}
            />
            {!focus && !hiddenClearMode && error ? (
              <AppView
                center
                style={{
                  zIndex: 1000,
                  width: 30,
                  right: 30,
                }}>
                <AppView center>
                  <VectorIcon.MaterialCommunityIcons
                    name="information"
                    size={getSize.s(18)}
                    color={AppStyles.color.RED_500}
                  />
                </AppView>
              </AppView>
            ) : null}
            {value && focus && !hiddenClearMode ? (
              <AppView
                center
                style={{
                  zIndex: 1000,
                  width: 30,
                  right: 30,
                }}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => onChangeText?.('')}>
                  <AppView center>
                    <VectorIcon.Feather
                      name="x"
                      size={getSize.s(10)}
                      color={AppStyles.color.GRAY5}
                    />
                  </AppView>
                </TouchableOpacity>
              </AppView>
            ) : null}
          </AppView>

          {children
            ? children
            : (!error && isSecure && _renderSecureIcon()) ||
              (error && isSecure && focus && _renderSecureIcon())}
        </View>
      </View>
    </>
  );
}

export default React.memo(AppTextInput);
