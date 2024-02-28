import {useAppTheme} from 'src/config/theme-config';
import {getSize} from 'src/hooks/use-resize-hoc';
import React, {useCallback, useState} from 'react';
import {FlatList, RefreshControl, FlatListProps} from 'react-native';
import AppView from '../app-view';
import FooterLoading from '../footer-loading';
import EmptyComponent from './empty-component';
import Search from 'src/components/app-search';

interface IAppFlatList<ItemT> extends FlatListProps<ItemT> {
  refreshing: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  errorOccurred?: boolean;
  textListEmpty?: string;
  loadingMore?: boolean;
  hasSearchInput?: boolean;
  fieldSearch?: string;
  isLocalSearch?: boolean;
  disabledRefresh?: boolean;
}
const AppFlatList = ({
  style,
  data,
  renderItem,
  contentContainerStyle,
  refreshing,
  onRefresh,
  onLoadMore,
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
  errorOccurred,
  textListEmpty,
  loadingMore = false,
  hasSearchInput = false,
  fieldSearch = '',
  isLocalSearch = true,
  disabledRefresh = false,
  ...props
}: IAppFlatList<any>) => {
  const theme = useAppTheme();
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [search, setSearch] = useState('');

  const renderLoadingMoreComponent = useCallback(() => {
    return loadingMore ? (
      <FooterLoading />
    ) : (
      <AppView marginBottom={getSize.m(16)} />
    );
  }, [loadingMore]);

  return (
    <AppView flex>
      {hasSearchInput ? (
        <AppView
          style={{
            paddingBottom: getSize.m(8),
            paddingTop: getSize.m(12),
          }}>
          <Search isLocalSearch={isLocalSearch} setSearch={setSearch} />
        </AppView>
      ) : (
        <AppView />
      )}
      <FlatList
        {...props}
        style={style || {backgroundColor: theme.colors.background}}
        data={
          hasSearchInput && isLocalSearch && fieldSearch
            ? (data || [])?.filter((item: any) =>
                item?.[fieldSearch]?.unUnicodeMatch(search),
              )
            : data
        }
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item?.id || item?.token || index.toString()
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        refreshControl={
          !disabledRefresh && (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          )
        }
        // fix FlatList onEndReached triggered before reach onEndReachedThreshold
        onEndReached={({distanceFromEnd}) => {
          if (!onEndReachedCalledDuringMomentum) {
            onLoadMore?.();
            setOnEndReachedCalledDuringMomentum(true);
          }
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
        ListEmptyComponent={
          ListEmptyComponent ?? (
            <EmptyComponent
              errorOccurred={errorOccurred}
              textEmpty={textListEmpty}
              search={search}
            />
          )
        }
        ListFooterComponent={
          ListFooterComponent ?? renderLoadingMoreComponent()
        }
      />
    </AppView>
  );
};

export default React.memo(AppFlatList);
