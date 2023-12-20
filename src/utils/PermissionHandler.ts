import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

interface Props {
  permission_name: any;
}
//check camera permisison
export const checkPermission = async ({permission_name}: Props) => {
  const result = await check(permission_name);
  if (result === RESULTS.GRANTED) {
    return true;
  } else {
    return false;
  }
};
//request camera permission
export const requestPermission = async ({permission_name}: Props) => {
  const result = await request(permission_name);
  return result;
};
