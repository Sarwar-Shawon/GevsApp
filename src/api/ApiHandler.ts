import axios, {AxiosError} from 'axios';
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
  try {
    const response = await axios.post(url, arg);
    if (response.data.status === 'success') {
      return {
        status: response.data.status,
        data: response.data.data,
        message: response.data.message,
      };
    } else {
      return {
        status: response.data.status,
        message: response.data.message,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      return {
        status: 'error',
        message: axiosError.message,
      };
    }
    return {
      status: 'error',
      message: 'An error occurred',
    };
  }
};
// Get method
export const Get: GetFnType = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response?.data.status == 'success')
      return {
        status: response?.data.status,
        data: response?.data?.data,
        message: response?.data?.message,
      };
    else
      return {status: response?.data.status, message: response?.data?.message};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log('axiosError', axiosError.message);
      return {
        status: 'error',
        message: axiosError.message,
      };
    }
    return {
      status: 'error',
      message: 'An error occurred',
    };
  }
};
