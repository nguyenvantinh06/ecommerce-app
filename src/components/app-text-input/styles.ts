import {StyleSheet} from 'react-native';
import {DEFAULT_PREFIX_FONT_FAMILY} from 'src/components/app-text/app-font';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppStyles from 'src/config/styles';

export default StyleSheet.create({
  paddingInputContainer: {
    // paddingLeft: scalePortrait(12),
    paddingRight: getSize.m(8),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  focus: {
    borderColor: AppStyles.color.GRAY4,
    borderWidth: 2,
  },
  focusMultiline: {
    borderColor: AppStyles.color.BLACK,
    borderWidth: 2,
  },
  container: {
    backgroundColor: AppStyles.color.BACKGROUND_TEXT_INPUT,
    height: getSize.m(45),
    minHeight: 45,
    paddingLeft: getSize.m(12),
    paddingRight: getSize.m(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppStyles.color.COLOR_BORDER,
    borderWidth: 1,
    borderRadius: getSize.m(6),
  },
  textInput: {
    width: '100%',
    height: '100%',
    fontSize: getSize.m(16),
    color: AppStyles.color.TEXT_CONTENT,
    fontFamily: `${DEFAULT_PREFIX_FONT_FAMILY}-Regular`,
  },
  txtError: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: 'red',
    fontSize: getSize.m(12) - 2,
    paddingHorizontal: getSize.m(5),
    marginBottom: -getSize.m(16),
    position: 'absolute',
    bottom: 0,
  },
  heightWithError: {
    height: getSize.m(60),
  },
  label: {
    color: '#676767',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  clearButton: {
    height: getSize.v(18),
    aspectRatio: 1,
    alignSelf: 'center',
    backgroundColor: AppStyles.color.GRAY3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: getSize.v(6),
    borderRadius: getSize.v(18) / 2,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
