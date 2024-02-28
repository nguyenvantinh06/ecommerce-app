import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Platform, UIManager} from 'react-native';
import {STYLE_GLOBAL} from 'src/config/style-global';
import {getSize} from 'src/hooks/use-resize-hoc';
import AppStyles from 'src/config/styles';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';

import SegmentedControl from '../app-segment-control';
import _ from 'lodash';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface IFilterMessageUpdate {
  onPressSelectorFilter?: () => void;
}
const FilterMessageUpdates = ({
  onPressSelectorFilter,
}: IFilterMessageUpdate) => {
  const filterUpdates = [...FILTER_CATEGORY];
  const dispatch = useAppDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const loaded = useRef<boolean>(false);

  useEffect(() => {
    if (loaded.current) return;
    if (_.isEmpty(filterUpdates) && !loaded) {
      const index = filterUpdates?.findIndex(item => item.isSelected);
      loaded.current = true;
      setSelectedIndex(index);
    }
  }, [loaded, filterUpdates]);

  const handleValueChange = useCallback(
    (event: any) => {
      // console.log('event', event);
      setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
      const tempValue = [...filterUpdates];
      const result = tempValue?.map(itemFilter => ({
        ...itemFilter,
        isSelected:
          itemFilter?.name === event?.nativeEvent?.value ? true : false,
      }));
      // dispatch(messageActions.setFilterMessagesUpdates(result));
      onPressSelectorFilter?.();
    },
    [dispatch, filterUpdates],
  );
  return (
    <View style={styles.containerFilterSegment}>
      <SegmentedControl
        values={filterUpdates?.map((item: any) => item?.name)}
        selectedIndex={selectedIndex}
        onChange={handleValueChange}
        backgroundColor={AppStyles.color.PRIMARY_100}
        tintColor={AppStyles.color.COLOR_PRIMARY_600}
        fontStyle={styles.textFilterStyle}
        activeFontStyle={{color: AppStyles.color.WHITE}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textFilterStyle: {
    ...STYLE_GLOBAL.body3,
    fontWeight: Platform.OS === 'android' ? '700' : '600',
    color: AppStyles.color.COLOR_PRIMARY_600,
  },
  containerFilterSegment: {
    margin: getSize.m(4),
  },
});

export default React.memo(FilterMessageUpdates);
