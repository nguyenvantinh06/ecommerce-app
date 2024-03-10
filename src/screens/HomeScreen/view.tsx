import React from 'react';
import {ScrollView, View, StatusBar} from 'react-native';
import {DATA} from './constant';
import {AppCarousel, ScrollHorizontal} from 'src/components/index';

export default function HomeScreen() {
  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <View style={{flex: 1, paddingTop: 50}}>
        <ScrollHorizontal
          data={DATA}
          onPress={item => {
            console.log(item?.id);
          }}
        />
        <AppCarousel />
      </View>
    </ScrollView>
  );
}
