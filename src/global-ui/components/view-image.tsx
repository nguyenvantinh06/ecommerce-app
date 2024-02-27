import ImageView from 'react-native-image-viewing';
import {StyleSheet} from 'react-native';
import React from 'react';
import {IViewImage} from '../type';

interface IState {
  visible: boolean;
  uri: string;
}
class ViewImageUI extends React.Component<{}, IState, {}> {
  state: Readonly<IState> = {
    visible: false,
    uri: '',
  };
  constructor(props: any) {
    super(props);
  }

  onCloseViewImage() {
    this.setState({visible: false});
  }

  show(options: IViewImage) {
    this.setState(
      {
        uri: options.uri || '',
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
      <ImageView
        visible={this.state.visible}
        images={[{uri: this.state.uri}]}
        imageIndex={0}
        onRequestClose={() => this.onCloseViewImage()}></ImageView>
    );
  }
}

export default ViewImageUI;

const styles = StyleSheet.create({});
