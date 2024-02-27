export const ROOT_MODULE = 'startup';
export const INIT = `${ROOT_MODULE}/INIT`;
export const GET_CONFIG = `${ROOT_MODULE}/GET_CONFIG`;
export const GET_CONFIG_DONE = `${ROOT_MODULE}/GET_CONFIG_DONE`;
export const TRY_AUTH = `${ROOT_MODULE}/TRY_AUTH`;
export const LOAD_DATA = `${ROOT_MODULE}/LOAD_DATA`;
export const LOAD_UI = `${ROOT_MODULE}/LOAD_UI`;
export interface IActionCallback {
  onSuccess?: (data?: any, identify?: string) => void;
  onFail?: (error?: any) => void;
}
export type IActionStartupInitPayload = IActionCallback;
export type IActionStartupConfigPayload = IActionCallback;
export type IActionStartupTryAuthPayload = IActionCallback;
export interface IActionStartupLoadDataPayload extends IActionCallback {
  isInitial?: boolean;
}
export type IActionStartupLoadUIPayload = IActionCallback;
