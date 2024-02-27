import logger from 'src/utils/logger';
import {SCENE_NAME} from 'src/utils/app-const';
import NavigationService from 'src/navigation/navigations-service';
import {DeviceEventEmitter} from 'react-native';
import _ from 'lodash';
import {store} from 'src/store/store';
import moment from 'moment';
import {apiClient} from './client';

interface IMessageService {
  goToMessageDetail(itemMessage: any): void;
}

type GetMessageDetailRequest = IRequestAction;

class MessageUseCase {
  //   private static _instance?: MessageUseCase;
  //   static instance(): MessageUseCase {
  //     if (!MessageUseCase._instance) {
  //       MessageUseCase._instance = new MessageUseCase();
  //     }
  //     return MessageUseCase._instance;
  //   }
  //   constructor() {}

  private static _instance?: MessageUseCase;

  constructor() {}
  static instance(): MessageUseCase {
    if (!MessageUseCase._instance) {
      MessageUseCase._instance = new MessageUseCase();
    }
    return MessageUseCase._instance;
  }

  // protected handleGetMessageDetail(
  //   messageId: string,
  //   callback: (data: any) => void,
  // ): void {
  //   // get info messageDetail
  //   const options: any = {
  //     callback: callback,
  //     showLoading: true,
  //     messageId: messageId,
  //   };

  //   store.dispatch(messageActions.getMessageDetail(options));
  // }
  // protected handleCountUnreadMessage(callback: (data: any) => void): void {
  //   // count unread messages
  //   const options: any = {
  //     callback: callback,
  //     showLoading: false,
  //   };

  //   store.dispatch(messageActions.getMessageUpdateUnRead(options));
  // }

  // protected handleMarkReadPdf(
  //   messageId: string,
  //   callback: (data: any) => void,
  // ): void {
  //   const options: any = {
  //     callback: callback,
  //     showLoading: false,
  //     messageId: messageId,
  //   };

  //   store.dispatch(messageActions.putMessageRecipientToRead(options));
  // }

  // goToMessageDetail(itemMessage: IMessageUpdate): void {
  //   this.handleGetMessageDetail(itemMessage?.messageId || '', data => {
  //     logger.log('handleGetMessageDetail', data);
  //     NavigationService.navigate(SCENE_NAME.MESSAGE_DETAIL, {
  //       messageDetail: data,
  //     });
  //   });
  // }

  // //un necessary callback
  // markReadPdf(messageId: string): void {
  //   this.handleMarkReadPdf(messageId || '', data => {
  //     logger.log('handle mark read pdf', data);
  //   });
  // }

  // //un necessary callback
  // countUnreadMessage(): void {
  //   this.handleCountUnreadMessage(data => {
  //     logger.log('count unread message', data);
  //   });
  // }
}

export const MessageService: MessageUseCase = MessageUseCase.instance();
export default MessageService;
