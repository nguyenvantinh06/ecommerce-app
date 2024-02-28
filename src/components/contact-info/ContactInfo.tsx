import React, {useMemo} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import AppStyles from 'src/config/styles';
import {getSize} from 'src/hooks/use-resize-hoc';
import {callNumber, sendMail} from 'src/utils/app-utils';
import AppImage from '../app-image';
import {STYLE_GLOBAL} from 'src/config/style-global';
import AppText from '../app-text';
import {DEFAULT_AVATAR} from 'src/utils/app-const';
import AppIcons from 'src/utils/app-icon';

type Props = {
  item?: any;
  style?: ViewStyle;
  onPressEdit?: () => void;
  hasEditButton?: boolean;
};

type ItemProps = {
  type: 'phone' | 'email' | 'userType';
  title: string;
  styleTitle?: ViewStyle | TextStyle;
};

function ItemInformation({type, title, styleTitle}: ItemProps) {
  const info = React.useMemo(() => {
    switch (type) {
      case 'phone':
        return {
          icon: AppIcons.PhoneProfile,
        };
      case 'email':
        return {
          icon: AppIcons.MailProfile,
        };
      case 'userType':
        return {
          icon: AppIcons.UserProfile,
        };
    }
  }, []);
  const onPress = React.useCallback(() => {
    switch (type) {
      case 'phone':
        callNumber(title);
        break;
      case 'email':
        sendMail(title);
    }
  }, []);
  return (
    <Pressable
      style={styles.containerItemInfo}
      onPress={onPress}
      disabled={type === 'userType'}>
      {info?.icon}
      <View style={{flexWrap: 'nowrap', flex: 1}}>
        <AppText style={[styles.titleItemInfo, styleTitle]}>
          {title || '-'}
        </AppText>
      </View>
    </Pressable>
  );
}

export default function ContactInfo({
  item,
  style,
  hasEditButton = true,
  onPressEdit,
}: Props) {
  const getTitleUserType = useMemo(() => {
    if (item?.userType === 'others') {
      return item?.otherUserType?.capitalize();
    } else {
      return item?.userType?.capitalize();
    }
  }, [item?.userType]);

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{
          uri: item?.avatar || DEFAULT_AVATAR,
        }}
        style={styles.imageFile}
      />
      <View style={{flexWrap: 'nowrap', flex: 1}}>
        <>
          <AppText style={styles.contactName}>{item?.fullname}</AppText>
          <ItemInformation type="userType" title={getTitleUserType} />
          <ItemInformation type="phone" title={item?.phoneNumber} />
          <ItemInformation type="email" title={item?.email} />
        </>
      </View>
      {!hasEditButton ? null : (
        <Pressable style={styles.editIcon} onPress={onPressEdit}>
          {AppIcons.EditProfile}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: getSize.m(12),
    borderWidth: 0.5,
    borderColor: AppStyles.color.GRAY_300,
    borderRadius: getSize.m(6),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 12,
  },
  contactName: {
    ...STYLE_GLOBAL.heading5,
    color: AppStyles.color.GRAY_700,
  },
  imageFile: {
    width: getSize.m(80),
    height: getSize.m(80),
    borderRadius: getSize.m(80) / 2,
    resizeMode: 'contain',
    marginRight: getSize.m(12),
  },
  containerItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getSize.m(4),
  },
  titleItemInfo: {
    ...STYLE_GLOBAL.body2,
    marginLeft: getSize.m(8),
    color: AppStyles.color.GRAY_700,
  },
  editIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
