import {StyleSheet} from 'react-native';
import React from 'react';
import {Button, Snackbar} from 'react-native-paper';
import {ISnackbar} from '../type';
import AppStyles from 'src/config/styles';

// function snackbar-ui() {
//   const [visible, setVisible] = React.useState(false);

//   const onToggleSnackBar = () => setVisible(!visible);

//   const onDismissSnackBar = () => setVisible(false);

//   return (
//       <Snackbar
//         visible={visible}
//         onDismiss={onDismissSnackBar}
//         >
//         Hey there! I'm a Snackbar.
//       </Snackbar>
//   );
// }
interface IState {
  visible: boolean;
  message: string;
  // TODO: feature/update-api-trip-events
  // duration show snackbar
  duration: number;
  // actions snackbar
  action?: Omit<React.ComponentProps<typeof Button>, 'children'> & {
    label: string;
  };
}
class SnackBarUI extends React.Component<{}, IState, {}> {
  state: Readonly<IState> = {
    visible: false,
    message: '',
    duration: 5000,
    action: undefined,
  };
  constructor(props: any) {
    super(props);
  }

  onDismissSnackBar() {
    this.setState({visible: false});
  }

  show(options: ISnackbar) {
    this.setState(
      {
        message: options.message || '',
        // TODO: feature/update-api-trip-events
        // update set duration and action property
        duration: options.duration || 5000,
        action: options.action,
      },
      () => {
        this.setState({visible: true});
      },
    );
  }

  hide() {
    this.setState({visible: false});
  }

  render() {
    return (
      <Snackbar
        visible={this.state.visible}
        // duration hidden snackbar
        duration={this.state.duration}
        onDismiss={() => this.onDismissSnackBar()}
        // action on the snackbar
        action={
          this.state.action || {
            icon: 'close',
            color: AppStyles.color.GRAY3,
            onPress: this.onDismissSnackBar.bind(this),
            label: '',
          }
        }>
        {this.state.message || ''}
      </Snackbar>
    );
  }
}

export default SnackBarUI;

const styles = StyleSheet.create({});
