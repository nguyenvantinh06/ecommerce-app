/* eslint-disable consistent-this */
// import {} from 'src/apis';
// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: '/react-dev',
//   responseType: 'json',
//   withCredentials: true,
// });

let apiClient: APIService;
class APIService {
  private static _instance?: APIService;
  constructor() {
    apiClient = this;
  }

  static instance(): APIService {
    if (!APIService._instance) {
      APIService._instance = new APIService();
    }
    return APIService._instance;
  }
}

export {apiClient, APIService};
