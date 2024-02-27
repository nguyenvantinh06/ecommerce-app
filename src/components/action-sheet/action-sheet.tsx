import React, {forwardRef, useCallback, useMemo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Portal} from 'react-native-paper';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import {ActionSheetProps, ActionSheetItem as ActionSheetItemType} from './type';
import useActionSheetViewModel from './use-action-sheet-view-model';
import makeStyles from './styles';
import {useAppTheme} from 'src/config/theme-config';
import AppText from '../app-text';
import AppButton from '../app-button';
import {STYLE_GLOBAL} from 'src/config/style-global';
import AppStyles from 'src/config/styles';

const ActionSheetItem = (item: ActionSheetItemType) => {
  const theme = useAppTheme();
  const styles = React.useMemo(() => makeStyles(), []);

  const leadingIcon = item.leadingIcon;
  return (
    <TouchableOpacity
      style={styles.actionSheetItem}
      onPress={item.onPress}
      activeOpacity={item.onPress ? 0.2 : 1}>
      {leadingIcon && (
        <Image source={leadingIcon} style={item.leadingIconStyle} />
      )}
      <View style={styles.itemContent}>
        <AppText style={[styles.itemTitle, {color: AppStyles.color.BLACK}]}>
          {item.title}
        </AppText>
        {item.subTitle ? (
          <AppText style={styles.subtitle}>{item.subTitle}</AppText>
        ) : null}
      </View>
      {/* {item.onPress && (
        <Image
          source={theme.images['chevron-right-ic']}
          style={styles.trailingIcon}
        />
      )} */}
    </TouchableOpacity>
  );
};

const ActionSheet = forwardRef<
  BottomSheet,
  Omit<ActionSheetProps, 'snapPoints' | 'children'>
>((props, ref) => {
  const {stylesMissingHeight} = useActionSheetViewModel();

  // variables
  const theme = useAppTheme();
  const styles = React.useMemo(() => makeStyles(), []);
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const onDismiss = useCallback(() => {
    // @ts-ignore
    // Close the bottom sheet
    ref?.current?.close();
    props.onCancel?.();
  }, [props, ref]);

  // renders
  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.6}
        onPress={onDismiss}
      />
    ),
    [onDismiss],
  );

  return (
    <Portal>
      <BottomSheet
        {...props}
        ref={ref}
        index={-1}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.handleIndicator}
        handleComponent={null}
        style={styles.bottomSheetContainer}>
        <BottomSheetView onLayout={handleContentLayout}>
          {props.header ? (
            <AppText style={[styles.header]}>{props.header}</AppText>
          ) : null}
          {props.actions.map(item => {
            return (
              <ActionSheetItem
                key={'action_sheet_item'.uuidv4()}
                {...item}
                // leadingIconStyle={stylesLeadingIcon(item)}
              />
            );
          })}
          <AppButton
            type="secondary"
            title="Cancel"
            onPress={onDismiss}
            styleText={styles.buttonCancelTitle}
          />
          <View style={stylesMissingHeight} />
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
});

ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
