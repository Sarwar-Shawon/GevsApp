import moment from 'moment';
//
export const formatDateToString = (val: Date): string => {
  if (!val) return '';
  const formattedDate = moment(val).format('DD-MM-YYYY');
  return formattedDate;
};
//
export const formatStringToStringDate = (val: string): string => {
  if (!val) return '';
  const formattedDate = moment(val).format('DD-MM-YYYY');
  return formattedDate;
};
