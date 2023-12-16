import moment from 'moment';
//
export const formatDate = (val: Date): string => {
  if (!val) return '';
  const formattedDate = moment(val).format('DD-MM-YYYY');
  return formattedDate;
};
