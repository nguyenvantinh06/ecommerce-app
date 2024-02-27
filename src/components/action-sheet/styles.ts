import {STYLE_GLOBAL} from 'src/config/style-global';
import {getSize} from 'src/hooks/use-resize-hoc';
import {StyleSheet} from 'react-native';

const styles = () =>
  StyleSheet.create({
    bottomSheetContainer: {
      padding: getSize.m(12),
    },
    actionSheetItem: {
      borderColor: '#000',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: getSize.m(12),
      padding: getSize.m(12),
      paddingLeft: getSize.m(12),
      borderWidth: getSize.m(1),
      borderRadius: getSize.m(4),
    },
    subtitle: {
      marginTop: getSize.m(1),
      color: '#000',
    },
    header: {
      paddingBottom: getSize.m(4),
      textAlign: 'center',
    },
    itemContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    trailingIcon: {
      marginLeft: getSize.m(12),
    },
    handleIndicator: {
      display: 'none',
    },
    itemTitle: {
      ...STYLE_GLOBAL.body1,
    },
    buttonCancelTitle: {
      ...STYLE_GLOBAL.body1,
      fontWeight: '700',
    },
  });

export default styles;
