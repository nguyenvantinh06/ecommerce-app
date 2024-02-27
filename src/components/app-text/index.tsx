/* eslint-disable no-sparse-arrays */
import React, {useMemo} from 'react';
import {Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {mapPropsToFontStyle} from './styles';
import {useTheme} from 'react-native-paper';
import {useGlobalConfig} from 'src/hooks/use-global-config';
import {getSize} from 'src/hooks/use-resize-hoc';
import _ from 'lodash';
import {useAppTheme} from 'src/config/theme-config';

export type TextProps = {
  style?:
    | TextStyle
    | ViewStyle
    | object
    | Array<TextStyle | ViewStyle | object>;
  color?: string;
  marginBottom?: number;
  required?: boolean;
  children?: React.ReactNode;
  textHighLight?: string;
  [x: string]: any;
};

const AppText = (props: TextProps) => {
  const {
    configs: {fontSize},
  } = useGlobalConfig();

  const theme = useAppTheme();
  const {style, color, marginBottom, required = false} = props;
  const fontScale = React.useCallback(
    (size: number): number => {
      switch (fontSize) {
        case 'default':
          return size;
        case 'small':
          return size - size * 0.25;
        case 'large':
          return size + size * 0.25;
        default:
          return size;
      }
    },
    [fontSize],
  );

  const stylesText = React.useMemo(() => {
    return [
      (color && {color}) || {color: theme.colors.text},
      marginBottom && {marginBottom},
      {...StyleSheet.flatten(style)},
      {
        fontSize: fontScale(
          Number(
            props?.fontSize ||
              (StyleSheet.flatten(style) as any)?.fontSize ||
              getSize.m(14).toString(),
          ),
        ),
      },
      ,
    ];
  }, [
    color,
    fontScale,
    marginBottom,
    props?.fontSize,
    style,
    theme.colors.text,
  ]);

  const stylesFont = useMemo(
    () => [mapPropsToFontStyle(props), stylesText],
    [props, stylesText],
  );

  const renderChildren = React.useCallback(() => {
    if (
      props.textHighLight &&
      props.children &&
      typeof props.children === 'string'
    ) {
      if (props.children.unUnicodeMatch(props.textHighLight)) {
        const fullText = props.children;
        const indexWord = fullText
          .unUnicode()
          .indexOf(props.textHighLight.unUnicode());
        const childrenList: any[] = [];
        const beforeTextHighLight = fullText.slice(0, indexWord);
        if (beforeTextHighLight) {
          childrenList.push(beforeTextHighLight);
        }
        const textHighLight = fullText.slice(
          indexWord,
          indexWord + props.textHighLight.length,
        );
        childrenList.push({
          text: textHighLight,
        });

        const afterTextHighLight = fullText.slice(
          indexWord + props.textHighLight.length,
          fullText.length,
        );
        if (afterTextHighLight) {
          childrenList.push(afterTextHighLight);
        }

        return childrenList.map((child: any) => {
          if (_.isObject(child)) {
            return (
              <AppText
                key={''.uuidv4()}
                style={[stylesFont, {backgroundColor: 'yellow'}]}>
                {(child as any)?.text || ''}
              </AppText>
            );
          }

          return child;
        });
      }
    }
    return props.children;
  }, [props.textHighLight, props.children, stylesFont]);

  return (
    <Text {...props} style={stylesFont} allowFontScaling={false}>
      {renderChildren()}
      {required && (
        <Text style={styles.required} allowFontScaling={false}>
          *
        </Text>
      )}
    </Text>
  );
};

export default React.memo<TextProps>(AppText);

const styles = StyleSheet.create({
  required: {
    fontSize: 14,
    fontWeight: '400',
    color: '#DA294A',
  },
});
