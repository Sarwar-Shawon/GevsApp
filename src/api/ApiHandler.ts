import axios from 'axios';
type ReturnValue<T = unknown> = {
  status?: number;
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
  return response.data;
};
// Get method
export const Get: GetFnType = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
