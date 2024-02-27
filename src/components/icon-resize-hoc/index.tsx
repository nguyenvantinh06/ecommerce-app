import {getSize} from 'src/hooks/use-resize-hoc';
import React from 'react';
import {SvgProps} from 'react-native-svg';
interface IIconProps {
  s?: number;
  w?: number;
  h?: number;
  color?: string;
}
function iconResizeHOC(IconComponent: React.FC<SvgProps>, props: IIconProps) {
  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      width={getSize.m(props?.s || props?.w || 12)}
      height={getSize.m(props?.s || props?.h || 12)}
      fill={props?.color || 'transparent'}
    />
  );
}

const useIconResizeHOC = iconResizeHOC;

export {iconResizeHOC, useIconResizeHOC};
