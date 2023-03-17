import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';

export interface IAxiosClient {
  baseURL: string;
}

export class AxiosClient {
  private baseURL: string;
  private instance: AxiosInstance;

  constructor(payload: IAxiosClient) {
    this.baseURL = payload.baseURL;
    this.instance = this.init();

    this.instance.interceptors.request.use(
      this.interceptorsRequestSuccess as any,
      this.interceptorsRequestFail
    );

    this.instance.interceptors.response.use(
      this.interceptorsResponseSuccess,
      this.interceptorsResponseFail
    );
  }

  private init() {
    return axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      paramsSerializer: {
        serialize: (params: Record<string, any>) => {
          return queryString.stringify(params);
        },
      },
    });
  }

  private interceptorsRequestSuccess(config: AxiosRequestConfig) {
    // const token = getFromSessionStorage(SESSION_KEY.ACCESS_TOKEN); //token is value
    // const headers: AxiosRequestHeaders = {
    // 	Authorization: `Bearer ${token}`
    // };

    // if (token) config.headers = { ...config.headers, ...headers };
    return config;
  }

  private interceptorsResponseFail(err: any) {
    return Promise.reject(err);
  }

  private interceptorsResponseSuccess(res: AxiosResponse) {
    if (res && res.data) return res.data;
    return res;
  }

  private interceptorsRequestFail(err: any) {
    if (err.response && err.response.data) return err.response.data;
    return Promise.reject(err);
  }

  public getInstance() {
    return this.instance;
  }
}
