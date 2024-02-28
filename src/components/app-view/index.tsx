import {getSize} from 'src/hooks/use-resize-hoc';
import {isNumber} from 'lodash';
import React, {PropsWithChildren} from 'react';
import {Platform, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styles from './styles';
import {SpacingElement} from './constants';
import _ from 'lodash';
import {ISpacing} from 'src/utils/app-const';

type IViewStyle = Omit<ViewStyle, 'flex'>;
interface IAppView extends ViewProps, IViewStyle {
  row?: boolean;
  rowAlignCenter?: boolean;
  center?: boolean;
  column?: boolean;
  shadow?: boolean;
  space?: string | undefined;
  alignStart?: boolean;
  alignCenter?: boolean;
  alignEnd?: boolean;
  wrap?: boolean;
  justifyCenter?: boolean;
  justifyEnd?: boolean;
  justifyStart?: boolean;
  square?: boolean;
  round?: boolean | number;
  relative?: boolean;
  absolute?: boolean;
  isPaddingIos?: boolean;
  spacing?: ISpacing | number;
  safeArea?: boolean;
  safeAreaTop?: boolean;
  safeAreaLeft?: boolean;
  safeAreaRight?: boolean;
  safeAreaBottom?: boolean;
  flex?: boolean | number;
  radius?: number;
}

export const AppView = ({
  flex,
  flexShrink,
  flexGrow,
  row,
  rowAlignCenter,
  center,
  column,
  backgroundColor,
  space,
  padding,
  margin,
  alignStart,
  alignCenter,
  alignEnd,
  wrap,
  justifyCenter,
  justifyEnd,
  justifyStart,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  radius,
  height,
  width,
  square,
  round,
  borderWidth,
  relative,
  absolute,
  top,
  left,
  right,
  bottom,
  borderColor,
  children,
  overflow,
  alignSelf,
  style,
  opacity,
  elevation,
  maxWidth,
  maxHeight,
  borderTopWidth,
  borderRightWidth,
  borderBottomWidth,
  borderLeftWidth,
  isPaddingIos,
  zIndex,
  borderTopLeftRadius,
  borderTopRightRadius,
  spacing,
  safeArea,
  safeAreaTop,
  safeAreaLeft,
  safeAreaRight,
  safeAreaBottom,
  ...rest
}: PropsWithChildren<IAppView>) => {
  const insets = useSafeAreaInsets();

  const blockStyles: any = [
    isPaddingIos && {
      paddingBottom: Platform.OS === 'ios' ? insets.bottom : 20,
    },
    typeof flex === 'boolean' && (flex ? styles.block : {flex: 0}),
    flexShrink && styles.flexShrink,
    flexGrow && styles.flexGrow,
    isNumber(flex) && {flex},
    isNumber(maxWidth) && {maxWidth},
    isNumber(maxHeight) && {maxHeight},
    isNumber(width) && {width},
    isNumber(height) && {height},
    row && styles.row,
    rowAlignCenter && styles.rowAlignCenter,
    center && styles.center,
    column && styles.column,
    wrap && {flexWrap: 'wrap'},
    backgroundColor && {
      backgroundColor: backgroundColor,
    },
    isNumber(padding) && {padding},
    isNumber(margin) && {padding},
    alignStart && styles.alignStart,
    alignCenter && styles.alignCenter,
    alignEnd && styles.alignEnd,
    justifyCenter && styles.justifyCenter,
    justifyStart && styles.justifyStart,
    justifyEnd && styles.justifyEnd,
    space && {justifyContent: `space-${space}`},
    isNumber(marginBottom) && {marginBottom},
    isNumber(marginTop) && {marginTop},
    isNumber(marginRight) && {marginRight},
    isNumber(marginLeft) && {marginLeft},
    isNumber(paddingHorizontal) && {paddingHorizontal},
    isNumber(paddingVertical) && {paddingVertical},
    isNumber(marginHorizontal) && {marginHorizontal},
    isNumber(marginVertical) && {marginVertical},
    isNumber(radius) && {borderRadius: radius},
    isNumber(borderWidth) && {borderWidth},
    isNumber(square) && {borderRadius: square || getSize.m(8)},
    round && {
      borderRadius:
        typeof round === 'number' ? round : Number(height || width || 0) / 2,
    },
    isNumber(opacity) && {opacity},
    borderColor && {
      borderColor,
    },
    relative && {position: 'relative'},
    absolute && {position: 'absolute'},
    isNumber(top) && {top: top},
    isNumber(left) && {left: left},
    isNumber(right) && {right: right},
    isNumber(bottom) && {bottom: bottom},
    overflow && {overflow},
    alignSelf && {alignSelf},
    isNumber(borderTopWidth) && {borderTopWidth},
    isNumber(borderRightWidth) && {borderRightWidth},
    isNumber(borderBottomWidth) && {borderBottomWidth},
    isNumber(borderLeftWidth) && {borderLeftWidth},
    zIndex && {zIndex},
    isNumber(borderTopLeftRadius) && {borderTopLeftRadius},
    isNumber(borderTopRightRadius) && {borderTopRightRadius},
    (paddingTop || safeAreaTop || safeArea) && {
      paddingTop:
        Number(paddingTop || 0) +
        Number(safeAreaTop || safeArea ? insets.top : 0),
    },
    (paddingRight || safeAreaRight || safeArea) && {
      paddingRight:
        Number(paddingRight || 0) +
        Number(safeAreaRight || safeArea ? insets.right : 0),
    },
    (paddingBottom || safeAreaBottom || safeArea) && {
      paddingBottom:
        Number(paddingBottom || 0) +
        Number(safeAreaBottom || safeArea ? insets.bottom : 0),
    },
    (paddingLeft || safeAreaLeft || safeArea) && {
      paddingLeft:
        Number(paddingLeft || 0) +
        Number(safeAreaLeft || safeArea ? insets.left : 0),
    },
    {...StyleSheet.flatten(style)},
  ];

  const renderChildComponent = React.useMemo(() => {
    if (spacing && _.isArray(children) && children?.length > 1) {
      return children.insertBetweenElement(
        <SpacingElement spacing={spacing} />,
      );
    }

    return children;
  }, [spacing, children]);

  return (
    <View style={blockStyles} {...rest}>
      {renderChildComponent}
    </View>
  );
};

export default AppView;
