import { MOCK } from './index';
import { CONFIG } from '@/commons/index';
import { utils } from '@/lib/index';

const defaultHeaders = {
  Accept: `application/json`,
};

const newAbortSignal = (timeoutMs: number) => {
  const abortController = new AbortController();
  setTimeout(() => {
    return abortController.abort();
  }, timeoutMs || 0);

  return abortController.signal;
};

const get = async <T>({ url = ``, body = {}, headers = {} }) => {
  return new Promise<{
    code: number;
    data: T;
    message: string;
    current_date_time: string;
  }>((resolve, reject) => {
    setTimeout(async () => {
      try {
        const urlChunks = `${url}`.split(`/`);
        const path = urlChunks[urlChunks.length - 1];
        const domainUrl = url.replace(path, ``);

        let result;
        let responseCode;
        let resultJson: {
          data: any;
          message: string;
          code: number;
          current_date_time: string;
        };

        if (domainUrl === CONFIG.DOMAIN_URL) {
          resultJson = MOCK[path as keyof typeof MOCK];
          responseCode = resultJson.code;
        } else {
          result = await fetch(
            `${url}?${utils.convertObjectToUrlParameters(body)}`,
            {
              method: `GET`,
              headers: {
                ...defaultHeaders,
                'Content-Type': `application/json`,
                ...headers,
              },
              signal: newAbortSignal(60 * 1000),
            }
          );

          resultJson = await result.json();
          responseCode = result.status;
        }

        const { current_date_time, data, message } = resultJson;

        if (responseCode === 200) {
          resolve({
            code: responseCode,
            data,
            message,
            current_date_time,
          });
        } else {
          reject({
            code: responseCode,
            title: `Oops...`,
            message,
            data,
          });
        }
      } catch (error) {
        const status = 999;

        reject({
          code: status,
          title: `Oops...`,
          message: `unknown error`,
        });
      }
    }, 1000);
  }).finally(() => {});
};

const post = async <T>({
  url = ``,
  body,
  headers = {},
  shouldStringify = true,
}: {
  url: string;
  body: any;
  headers: any;
  shouldStringify?: boolean;
}) => {
  return new Promise<{
    code: number;
    data: T;
    message: string;
    current_date_time: string;
  }>((resolve, reject) => {
    setTimeout(async () => {
      try {
        const urlChunks = `${url}`.split(`/`);
        const path = urlChunks[urlChunks.length - 1];
        const domainUrl = url.replace(path, ``);

        let result;
        let responseCode;
        let resultJson: {
          data: any;
          message: string;
          code: number;
          current_date_time: string;
        };

        if (domainUrl === CONFIG.DOMAIN_URL) {
          resultJson = MOCK[path as keyof typeof MOCK];
          responseCode = resultJson.code;
        } else {
          result = await fetch(`${url}`, {
            method: `POST`,
            headers: {
              ...defaultHeaders,
              ...(shouldStringify && { 'Content-Type': `application/json` }),
              ...headers,
            },
            body: shouldStringify ? JSON.stringify(body) : body,
            signal: newAbortSignal(60 * 1000),
          });

          resultJson = await result.json();
          responseCode = result.status;
        }

        const { current_date_time, data, message } = resultJson;

        if (responseCode === 200) {
          resolve({ code: responseCode, data, message, current_date_time });
        } else {
          reject({
            code: responseCode,
            title: `Oops...`,
            message,
            data,
          });
        }
      } catch (error) {
        const status = 999;

        reject({
          code: status,
          title: `Oops...`,
          message: `unknown error`,
        });
      }
    }, 1000);
  }).finally(() => {});
};

const put = async <T>({ url = ``, body = {}, headers = {} }) => {
  return new Promise<{
    code: number;
    data: T;
    message: string;
    current_date_time: string;
  }>((resolve, reject) => {
    setTimeout(async () => {
      try {
        const urlChunks = `${url}`.split(`/`);
        const path = urlChunks[urlChunks.length - 1];
        const domainUrl = url.replace(path, ``);

        let result;
        let responseCode;
        let resultJson: {
          data: any;
          message: string;
          code: number;
          current_date_time: string;
        };

        if (domainUrl === CONFIG.DOMAIN_URL) {
          resultJson = MOCK[path as keyof typeof MOCK];
          responseCode = resultJson.code;
        } else {
          result = await fetch(`${url}`, {
            method: `PUT`,
            headers: {
              ...defaultHeaders,
              'Content-Type': `application/json`,
              ...headers,
            },
            body: JSON.stringify(body),
            signal: newAbortSignal(60 * 1000),
          });

          resultJson = await result.json();
          responseCode = result.status;
        }

        const { current_date_time, data, message } = resultJson;

        if (responseCode === 200) {
          resolve({ code: responseCode, data, message, current_date_time });
        } else {
          reject({
            code: responseCode,
            title: `Oops...`,
            message,
            data,
          });
        }
      } catch (error) {
        const status = 999;

        reject({
          code: status,
          title: `Oops...`,
          message: `unknown error`,
        });
      }
    }, 1000);
  }).finally(() => {});
};

const patch = async <T>({ url = ``, body = {}, headers = {} }) => {
  return new Promise<{
    code: number;
    data: T;
    message: string;
    current_date_time: string;
  }>((resolve, reject) => {
    setTimeout(async () => {
      try {
        const urlChunks = `${url}`.split(`/`);
        const path = urlChunks[urlChunks.length - 1];
        const domainUrl = url.replace(path, ``);

        let result;
        let responseCode;
        let resultJson: {
          data: any;
          message: string;
          code: number;
          current_date_time: string;
        };

        if (domainUrl === CONFIG.DOMAIN_URL) {
          resultJson = MOCK[path as keyof typeof MOCK];
          responseCode = resultJson.code;
        } else {
          result = await fetch(`${url}`, {
            method: `PATCH`,
            headers: {
              ...defaultHeaders,
              'Content-Type': `application/json`,
              ...headers,
            },
            body: JSON.stringify(body),
            signal: newAbortSignal(60 * 1000),
          });

          resultJson = await result.json();
          responseCode = result.status;
        }

        const { current_date_time, data, message } = resultJson;

        if (responseCode === 200) {
          resolve({ code: responseCode, data, message, current_date_time });
        } else {
          reject({
            code: responseCode,
            title: `Oops...`,
            message,
            data,
          });
        }
      } catch (error) {
        const status = 999;

        reject({
          code: status,
          title: `Oops...`,
          message: `unknown error`,
        });
      }
    }, 1000);
  }).finally(() => {});
};

const deletion = async <T>({ url = ``, body = {}, headers = {} }) => {
  return new Promise<{
    code: number;
    data: T;
    message: string;
    current_date_time: string;
  }>((resolve, reject) => {
    setTimeout(async () => {
      try {
        const urlChunks = `${url}`.split(`/`);
        const path = urlChunks[urlChunks.length - 1];
        const domainUrl = url.replace(path, ``);

        let result;
        let responseCode;
        let resultJson: {
          data: any;
          message: string;
          code: number;
          current_date_time: string;
        };

        if (domainUrl === CONFIG.DOMAIN_URL) {
          resultJson = MOCK[path as keyof typeof MOCK];
          responseCode = resultJson.code;
        } else {
          result = await fetch(`${url}`, {
            method: `DELETE`,
            headers: {
              ...defaultHeaders,
              'Content-Type': `application/json`,
              ...headers,
            },
            body: JSON.stringify(body),
            signal: newAbortSignal(60 * 1000),
          });

          resultJson = await result.json();
          responseCode = result.status;
        }

        const { current_date_time, data, message } = resultJson;

        if (responseCode === 200) {
          resolve({ code: responseCode, data, message, current_date_time });
        } else {
          reject({
            code: responseCode,
            title: `Oops...`,
            message,
            data,
          });
        }
      } catch (error) {
        const status = 999;

        reject({
          code: status,
          title: `Oops...`,
          message: `unknown error`,
        });
      }
    }, 1000);
  }).finally(() => {});
};

export { get, post, put, patch, deletion };
