import React from 'react';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/dist/FontAwesome5Pro';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import Foundation from 'react-native-vector-icons/dist/Foundation';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {IconProps} from 'react-native-vector-icons/Icon';

export type AppIconProps = IconProps & {
  name?: string;
  type?:
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'FontAwesome5Pro'
    | 'FontAwesome6'
    | 'Fontisto'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons';
  size?: number;
  color?: string;
};

export const AppVectorIcons = (props: AppIconProps) => {
  const {type, ...others} = props;

  if (type === 'FontAwesome5') {
    return <FontAwesome5 {...others} />;
  } else if (type === 'Entypo') {
    return <Entypo {...others} />;
  } else if (type === 'AntDesign') {
    return <AntDesign {...others} />;
  } else if (type === 'EvilIcons') {
    return <EvilIcons {...others} />;
  } else if (type === 'Feather') {
    return <Feather {...others} />;
  } else if (type === 'FontAwesome') {
    return <FontAwesome {...others} />;
  } else if (type === 'FontAwesome5Pro') {
    return <FontAwesome5Pro {...others} />;
  } else if (type === 'FontAwesome6') {
    return <FontAwesome6 {...others} />;
  } else if (type === 'Fontisto') {
    return <Fontisto {...others} />;
  } else if (type === 'Foundation') {
    return <Foundation {...others} />;
  } else if (type === 'Ionicons') {
    return <Ionicons {...others} />;
  } else if (type === 'MaterialCommunityIcons') {
    return <MaterialCommunityIcons {...others} />;
  }

  return <MaterialIcons {...others} />;
};

const VectorIcon = {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  FontAwesome5Pro,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AppVectorIcons,
};
export default VectorIcon;
