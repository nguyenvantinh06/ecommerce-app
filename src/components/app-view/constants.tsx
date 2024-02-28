import React from 'react';
import {View} from 'react-native';
import {getSize} from 'src/hooks/use-resize-hoc';
import {ISpacing, Spacing} from 'src/utils/app-const';

const useReactElementHOC = (WrappedComponent: any, props: any) => (
  <WrappedComponent {...props}>{props?.children}</WrappedComponent>
);

const SpacingElement = React.memo<{spacing: ISpacing | number | undefined}>(
  ({spacing}) => {
    let spacingHeight = 0;

    if (typeof spacing === 'number') {
      spacingHeight = Number(spacing || '0');
    } else if (spacing && spacing in Spacing) {
      spacingHeight = Number(Spacing[spacing].valueOf() || '0');
    }

    return useReactElementHOC(View, {
      style: {
        height: getSize.m(spacingHeight),
        width: getSize.m(spacingHeight),
      },
    });
  },
);

export {SpacingElement};
