import axios from 'axios';
type ReturnValue<T = unknown> = {
  status?: string;
  data?: T;
  message?: string;
  error?: string;
};
type PostFnType = <ArgType, ResType>(
  url: string,
  arg: ArgType,
) => Promise<ReturnValue<ResType>>;

type GetFnType<T = unknown> = (url: string) => Promise<ReturnValue<T>>;
// Post method
export const Post: PostFnType = async (url, arg) => {
  const response = await axios.post(url, arg);
  // console.log('responseresponse', response);
  if (response?.data.status == 'success')
    return {
      status: response?.data.status,
      data: response?.data?.data,
      message: response?.data?.message,
    };
  else return {status: response?.data.status, message: response?.data?.message};
};
// Get method
export const Get: GetFnType = async (url: string) => {
  const response = await axios.get(url);
  if (response?.data.status == 'success')
    return {
      status: response?.data.status,
      data: response?.data?.data,
      message: response?.data?.message,
    };
  else return {status: response?.data.status, message: response?.data?.message};
};
