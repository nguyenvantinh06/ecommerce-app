/**
 * @typedef T - generic type data need filter
 * @param {searchKey} - search key need filter by
 * @param {keyFields} - key field need check
 * @param {data} - data list need filter
 */

import _, { get } from 'lodash';

export const searchEngine = <T extends any>(
  data: T[],
  keyFields: string[],
  searchKey?: string,
): T[] => {
  if (!searchKey) {
    return data;
  }

  const $result = data?.filter(item => {
    let isFound = false;
    for (const key of keyFields) {
      if (!isFound) {
        const $value = get(item, key, null);
        console.log('value', $value, key);
        if (!$value) {
          isFound = false;
        } else {
          if (
            (typeof $value === 'string' || typeof $value === 'number') &&
            $value.toString().unUnicodeMatch(searchKey)
          ) {
            isFound = true;
          } else if (_.isArray($value) && !_.isEmpty($value)) {
            if (typeof $value[0] === 'string') {
              isFound = $value.some(e => e.unicodeMatch(searchKey));
            } else if (typeof $value[0] === 'number') {
              isFound = $value.some(e => e.toString().unicodeMatch(searchKey));
            } else if (typeof $value[0] === 'object') {
              isFound =
                searchEngine($value, Object.keys($value[0]), searchKey)
                  ?.length > 0;
            } else {
              isFound = false;
            }
          } else {
            isFound = false;
          }
        }
      }
    }
    return isFound;
  });

  return $result;
};
