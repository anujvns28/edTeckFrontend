import axios, { AxiosResponse, type Method } from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async <T>(
  method: Method,
  url: string,
  bodyData?: unknown,
  headers?: any,
  params?: any,
): Promise<AxiosResponse<T>> => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
