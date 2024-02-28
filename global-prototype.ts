/* eslint-disable no-bitwise */
import {isIphoneX} from 'src/lib/is-iphone-X';
import React from 'react';
import DeviceInfo from 'react-native-device-info';
import {AxiosResponse} from 'axios';
import ToastContainer from 'react-native-toast-notifications';

declare global {
  /**
   *
   * @export
   * @interface Array<T>
   */
  interface Array<T> {
    /**
     *
     * @template T
     * @param {T} item A generic parameter is valueof array
     * @type {Function}
     * @return {Array<T>}
     */
    insertBetweenElement(item: T): Array<T>;
    /**
     *
     * @type {Function}
     * @return {Array<T>}
     */
    last(): T;
  }

  /**
   *
   * @export
   * @interface String
   */
  interface String {
    /**
     *
     * Will check this string is unicode
     * @type {Function} isUnicode
     * @returns {boolean}
     * @memberof String
     */
    isUnicode(): boolean;
    /**
     *
     * Will unUnicode this string
     * @type {Function} unUnicode
     * @returns {boolean}
     * @memberof String
     */
    unUnicode(): string;
    /**
     *
     * Unicode two string and check equal them.
     * @type {Function} unUnicodeMatch
     * @param {string} lookupString string need check equal
     * @returns {boolean}
     * @memberof String
     */
    unUnicodeMatch(lookupString: string): boolean;
    splice(startIndex: number, delCount: number, newSubStr?: string): string;
    capitalize(): string;
    getImageName(numberChar?: number): string;
    /**
     * @summary generate uuidv4 string.
     **/
    uuidv4(): string;
    capitalizeEachWord(): string;
  }
  /**
   *
   * @export GlobalState
   * @interface TokenResponse
   */
  interface TokenResponse {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    scope?: string;
    refreshToken?: string;
    idToken?: string;
    expiresOn?: number;
    notBefore?: number;
    refreshTokenExpiresIn?: number;
  }

  /**
   *
   * @export GlobalState
   * @interface IRequestAction
   */
  interface IRequestAction {
    /**
     *
     * Will callback data after successful fetching the api!
     * @param {(...args: any[])} args: any[]
     * @type {Function} callback
     * @returns {void}
     * @memberof IRequestAction
     */
    callback?: (...args: any[]) => void;
    /**
     *
     * Will show loading modal while fetching data
     * @type {boolean}
     * @return {boolean}
     * @memberof IRequestAction
     */
    showLoading?: boolean;
    /**
     *
     * an other parameter
     * @type {any}
     * @returns {any}
     * @memberof IRequestAction
     */
    [keyField: string]: any;
  }

  var __hasDynamicIsland: Boolean;
  var __isTablet: Boolean;
  var __isIphoneX: Boolean;
  var __isDisplayZoomed: Boolean;

  type ResponseData<T> = AxiosResponse<T, any>;
  var toast: ToastContainer | null;
  var toastNetworkModal: ToastContainer | null;
}

function childrenWithProps(children: React.ReactNode, props: any) {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        ...props,
        style: [child.props?.style, props?.style || {}],
      });
    }
    return child;
  });
}

Array.prototype.insertBetweenElement = function (item: React.ReactNode) {
  let result: React.ReactNode[] = [];

  this.forEach((element, index) => {
    if (index <= this.length - 1) {
      result.push(
        childrenWithProps(element, {key: index}),
        childrenWithProps(item, {key: index + 1 + this.length}),
      );
    } else {
      result.push(childrenWithProps(element, {key: index}));
    }
  });

  return result;
};

Array.prototype.last = function () {
  if (this.length - 1 < 0) {
    return undefined;
  }
  return this[this.length - 1];
};

// Check if a string contains any unicode chacracters
String.prototype.isUnicode = function () {
  for (var i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) >= 192) {
      return true;
    }
  }

  return false;
};

// parse unicode string to un-unicode string
String.prototype.unUnicode = function () {
  var result = this.toLowerCase();
  result = result.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  result = result.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  result = result.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  result = result.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  result = result.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  result = result.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  result = result.replace(/đ/g, 'd');
  return result;
};

// match un-unicode lookup string in unicode full string
String.prototype.unUnicodeMatch = function (lookupString: string) {
  var fullString = this.unUnicode();
  lookupString = lookupString.unUnicode();
  return fullString.indexOf(lookupString) >= 0;
};

String.prototype.splice = function (
  startIndex: number,
  delCount: number,
  newSubStr?: string,
) {
  return (
    this.slice(0, startIndex) +
    (newSubStr || '') +
    this.slice(startIndex + Math.abs(delCount))
  );
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.getImageName = function (numberChar?: number) {
  let firstCharWords = Array.prototype.map
    .call(this?.split(' '), function (x: string) {
      return x.substring(0, 1).toLocaleLowerCase();
    })
    .join('');

  return firstCharWords.substring(0, numberChar || 2);
};

String.prototype.uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

String.prototype.capitalizeEachWord = function () {
  return this.split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

global.__hasDynamicIsland = DeviceInfo.hasDynamicIsland();
global.__isTablet = DeviceInfo.isTablet();
global.__isIphoneX = isIphoneX();
global.__isDisplayZoomed = DeviceInfo.isDisplayZoomed();

export {};
