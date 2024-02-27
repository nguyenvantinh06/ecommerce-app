import {StyleSheet} from 'react-native';
import {getSize} from 'src/hooks/use-resize-hoc';

export default StyleSheet.create({
  container: {
    width: getSize.s(60),
    height: getSize.v(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch',
  },
});
