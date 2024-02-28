import {useAppTheme} from 'src/config/theme-config';
import {getSize} from 'src/hooks/use-resize-hoc';
import React, {useCallback, useState} from 'react';
import {RefreshControl, SectionList, SectionListProps} from 'react-native';
import AppView from '../app-view';
import FooterLoading from '../footer-loading';
import EmptyComponent from './empty-component';
import Search from 'src/components/app-search';

interface IAppSectionList<ItemT> extends SectionListProps<ItemT> {
  refreshing: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  errorOccurred?: boolean;
  textListEmpty?: string;
  loadingMore?: boolean;
  hasSearchInput?: boolean;
  isLocalSearch?: boolean;
}
const AppSectionList = ({
  style,
  sections,
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
  isLocalSearch = true,
  initialNumToRender = 5,
  renderSectionHeader,
  ...props
}: IAppSectionList<any>) => {
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
      <SectionList
        {...props}
        style={style || {backgroundColor: theme.colors.background}}
        sections={sections}
        initialNumToRender={initialNumToRender}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item: any, index: number) =>
          item?.id || index.toString()
        }
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={contentContainerStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
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
          ListEmptyComponent || (
            <EmptyComponent
              errorOccurred={errorOccurred}
              textEmpty={textListEmpty}
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

export default React.memo(AppSectionList);
