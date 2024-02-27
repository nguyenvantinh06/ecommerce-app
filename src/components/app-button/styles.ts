// import { STYLE_GLOBAL, COLOR } from 'utils/styleGlobal';
import {StyleSheet} from 'react-native';
import {getSize} from 'src/hooks/use-resize-hoc';
import {STYLE_GLOBAL} from 'src/config/style-global';
import AppStyles from 'src/config/styles';

type Style = {
  defaultButton: any;
  defaultText: any;
};

export default StyleSheet.create<Style>({
  defaultButton: (disabled: boolean) => ({
    height: getSize.m(44),
    width: '100%',
    borderRadius: getSize.m(4),
    justifyContent: 'center',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
  }),

  defaultText: () => [STYLE_GLOBAL.body2, {color: AppStyles.color.WHITE}],
});
