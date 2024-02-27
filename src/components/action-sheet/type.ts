import React from 'react';
import { BottomSheetProps } from '@gorhom/bottom-sheet';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { StyleProp } from 'react-native';

/**
 * Action sheet item
 */
export interface ActionSheetItem {
  /**
   * Leading icon
   */
  leadingIcon?: ImageSourcePropType;

  /**
   * Trailing icon
   */
  trailingIcon?: string;

  /**
   * Title
   */
  title: string;

  /**
   * Subtitle
   */
  subTitle?: string;

  /**
   * On press
   */
  onPress?: () => void;

  /// Local variable ///

  /**
   * Leading icon style (Action sheet item)
   */
  leadingIconStyle?: StyleProp<any>;
}

/**
 * Action sheet props
 */
export interface ActionSheetProps extends BottomSheetProps {
  /**
   * Ref
   */
  ref?: React.RefObject<any>;

  /**
   * Header
   */
  header?: string;

  /**
   * Cancel text
   */
  cancelText?: string;

  /**
   * Actions
   */
  actions: ActionSheetItem[];

  /**
   * On cancel
   */
  onCancel?: () => void;
}
