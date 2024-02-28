import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Keyboard,
} from 'react-native';
import AppStyles from 'src/config/styles';
import {getSize} from 'src/hooks/use-resize-hoc';
import VectorIcon from 'src/components/vector-icon';
import AppView from 'src/components/app-view';
import {useAppSelector} from 'src/store/hooks';
import {useAppTheme} from 'src/config/theme-config';

interface ISearchComp {
  autoFocus?: boolean;
  onPressSearch?: (keySearch: string) => void;
  placeholder?: string;
  onSubmitSearch?: (keySearch: string) => void;
  isLocalSearch?: boolean;
  setSearch?: (search: string) => void;
  disabled?: boolean;
}

const Search = ({
  autoFocus = false,
  onPressSearch,
  placeholder,
  onSubmitSearch,
  isLocalSearch = false,
  setSearch = () => {},
  disabled = false,
}: ISearchComp) => {
  const theme = useAppTheme();
  const [searchKey, setSearchKey] = useState('');

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onSearch = useCallback(() => {
    Keyboard.dismiss();
    onPressSearch?.(searchKey);
  }, [onPressSearch, searchKey]);

  const handleSearchTextChange = (values: string) => {
    setSearchKey?.(values);
    if (!onSubmitSearch) {
      return;
    }
    if (!isLocalSearch) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        onSubmitSearch?.(values);
      }, 300);
    } else {
      onSubmitSearch?.(values);
    }
  };

  useEffect(() => {
    return () => {
      setSearchKey('');
    };
  }, []);

  useEffect(() => {
    setSearch(searchKey);
  }, [searchKey, setSearch]);

  const fontSize = useAppSelector(state => state?.theme?.fontSelect?.value);

  const fontScale = React.useCallback(
    (size: number): number => {
      switch (fontSize) {
        case 'default':
          return size;
        case 'small':
          return size - size * 0.25;
        case 'large':
          return size + size * 0.25;
        default:
          return size;
      }
    },
    [fontSize],
  );

  return (
    <AppView
      style={[
        styles.container,
        theme.dark
          ? {backgroundColor: '#292541'}
          : {backgroundColor: AppStyles.color.GRAY4},
      ]}>
      <AppView style={styles.content}>
        <Pressable onPress={onSearch} disabled={disabled}>
          <VectorIcon.AntDesign
            name="search1"
            size={getSize.m(16)}
            color={theme.dark ? AppStyles.color.GRAY3 : theme.colors.text}
          />
        </Pressable>
        <View style={styles.textInput}>
          <TextInput
            style={[
              styles.inputValue,
              {
                color: theme.dark ? AppStyles.color.GRAY2 : theme.colors.text,
                fontSize: getSize.m(fontScale(16)),
              },
            ]}
            value={searchKey}
            onChangeText={handleSearchTextChange}
            placeholder={placeholder || 'Search'}
            autoFocus={autoFocus}
            placeholderTextColor={
              theme.dark ? AppStyles.color.GRAY2 : theme.colors.text
            }
            returnKeyType={'search'}
            editable={!disabled}
            allowFontScaling={false}
          />
        </View>
        {searchKey ? (
          <TouchableOpacity onPress={() => handleSearchTextChange('')}>
            <VectorIcon.Feather
              name="x"
              size={getSize.m(18)}
              color={theme.dark ? AppStyles.color.GRAY3 : theme.colors.text}
            />
          </TouchableOpacity>
        ) : null}
      </AppView>
    </AppView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    height: getSize.m(44),
    paddingHorizontal: getSize.m(12),
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: getSize.m(6),
  },
  inputValue: {
    fontWeight: '400',
    fontSize: getSize.m(16),
  },
});
