import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ActionSheetItem} from './type';
import {useAppTheme} from 'src/config/theme-config';

function useActionSheetViewModel() {
  const insets = useSafeAreaInsets();
  const theme = useAppTheme();

  // Missing height when using snap to content height
  const stylesMissingHeight = React.useMemo(() => {
    return [
      {
        height: insets.bottom + 12 * 2,
      },
    ];
  }, [insets.bottom]);

  // const stylesLeadingIcon = React.useCallback(
  //   (item: ActionSheetItem) => {
  //     return [
  //       {
  //         marginRight: theme.space['4'],
  //         width: scaledSize.scale(
  //           item.subTitle ? theme.iconSizes['5'] : theme.iconSizes['2'],
  //         ),
  //         height: scaledSize.scale(
  //           item.subTitle ? theme.iconSizes['5'] : theme.iconSizes['2'],
  //         ),
  //       },
  //     ];
  //   },
  //   [theme.iconSizes, theme.space],
  // );

  return {stylesMissingHeight, theme};
}

export default useActionSheetViewModel;
