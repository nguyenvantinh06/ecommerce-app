// @flow

import moment from 'moment';

const formatMessages = (
  messages: Array<any>,
  type?: 'success' | 'info' | 'error' | 'start' | 'warning' | 'end',
) => {
  let color = 'black';
  let bgc = 'White';
  switch (type) {
    case 'success':
      color = 'white';
      bgc = 'LimeGreen';
      break;
    case 'info':
      color = 'white';
      bgc = 'DodgerBlue';
      break;
    case 'error':
      color = 'Red';
      bgc = 'Black';
      break;
    case 'start':
      color = 'OliveDrab';
      bgc = 'PaleGreen';
      break;
    case 'warning':
      color = 'Tomato';
      bgc = 'Black';
      break;
    case 'end':
      color = 'white';
      bgc = 'MediumVioletRed';
      break;
    default:
      color = color;
  }
  return [
    `%c[${type?.toUpperCase()} - @${moment(new Date()).format('HH:mm:ss')}] ➟`,
    `🐦;background: ${bgc}; color: ${color}; padding: 3px; border-radius: 5px;`,
    ...messages,
  ];
};

class Logger {
  private static _instance?: Logger;
  static instance(): Logger {
    if (!Logger._instance) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }

  private silent: boolean = false;

  constructor() {
    if (!__DEV__) {
      this.silence();
    }
  }

  log(...messages: any[]): void {
    !this.silent && console.log(...formatMessages(messages, 'info'));
  }

  warn(...messages: any[]): void {
    !this.silent && console.log(...formatMessages(messages, 'warning'));
  }

  error(...messages: any[]): void {
    !this.silent && console.log(...formatMessages(messages, 'error'));
  }

  success(...messages: any[]): void {
    !this.silent && console.log(...formatMessages(messages, 'success'));
  }

  start(...messages: any[]): void {
    !this.silent && console.log(...formatMessages(messages, 'start'));
  }

  end(...messages: any[]): void {
    !this.silent && console.log(...formatMessages(messages, 'end'));
  }

  silence(): void {
    this.silent = true;
  }
}
const logger: Logger = Logger.instance();
export default logger;
