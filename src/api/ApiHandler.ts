import axios from 'axios';
type ReturnValue = {
  data: unknown;
  error?: undefined;
};
type PostFnType = <ArgType>(url: string, arg: ArgType) => Promise<ReturnValue>;
type GetFnType = (url: string) => Promise<ReturnValue>;
// Post method
export const Post: PostFnType = async (url, arg) => {
  try {
    const response = await axios.post(url, arg);
    return response.data;
  } catch (error) {
    return error;
  }
};
// Get method
export const Get: GetFnType = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};
