import axios,{type Method} from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (
  method : Method,
  url:string,
  bodyData?:unknown,
  headers?:any , 
  params?:any
) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
