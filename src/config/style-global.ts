import {getSize} from 'src/hooks/use-resize-hoc';
import {ViewStyle, TextStyle} from 'react-native';
import {FONT_FAMILY} from 'src/components/app-text/app-font';

type Typography = ViewStyle | TextStyle | object;

export const SIZE = {
  heading1: getSize.m(48),
  heading2: getSize.m(40),
  heading3: getSize.m(28),
  heading4: getSize.m(20),
  heading5: getSize.m(16),
  heading6: getSize.m(14),
  body1: getSize.m(16),
  body2: getSize.m(14),
  body3: getSize.m(12),
  body4: getSize.m(10),
  body5: getSize.m(8),
};
interface ITypography {
  heading1: Typography;
  heading2: Typography;
  heading3: Typography;
  heading4: Typography;
  heading5: Typography;
  heading6: Typography;
  body1: Typography;
  body2: Typography;
  body3: Typography;
  body4: Typography;
  body5: Typography;
}
const Typography = {
  heading1: {
    fontFamily: FONT_FAMILY.BOLD,
    fontWeight: '700',
    fontSize: SIZE.heading1,
    lineHeight: getSize.m(72),
  },
  heading2: {
    fontFamily: FONT_FAMILY.BOLD,
    fontWeight: '700',
    fontSize: SIZE.heading2,
    lineHeight: getSize.m(60),
  },
  heading3: {
    fontFamily: FONT_FAMILY.BOLD,
    fontWeight: '700',
    fontSize: SIZE.heading3,
    lineHeight: getSize.m(42),
  },
  heading4: {
    fontFamily: FONT_FAMILY.BOLD,
    fontWeight: '700',
    fontSize: SIZE.heading4,
    lineHeight: getSize.m(30),
  },
  heading5: {
    fontFamily: FONT_FAMILY.BOLD,
    fontWeight: '700',
    fontSize: SIZE.heading5,
    lineHeight: getSize.m(24),
  },
  heading6: {
    fontFamily: FONT_FAMILY.BOLD,
    fontWeight: '700',
    fontSize: SIZE.heading6,
    lineHeight: getSize.m(22),
  },
  body1: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '400',
    fontSize: SIZE.body1,
    lineHeight: getSize.m(24),
  },
  body2: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '400',
    fontSize: SIZE.body2,
    lineHeight: getSize.m(22),
  },
  body3: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '400',
    fontSize: SIZE.body3,
    lineHeight: getSize.m(18),
  },
  body4: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '700',
    fontSize: SIZE.body4,
    lineHeight: getSize.m(12),
  },
  body5: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '700',
    fontSize: SIZE.body5,
    lineHeight: getSize.m(10),
  },
};

export const STYLE_GLOBAL: ITypography = Typography;
