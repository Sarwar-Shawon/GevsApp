import React, {useState} from 'react';
import {Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors} from '../utils';
//
// constituencyItems={constituencyItems}
//             constituency_id={constituency_id}
//             setConstituency={(val: string) => {
//               setConstituency_id(val);
//             }}
interface Props {
  constituencyItems: {label: string; value: string}[];
  constituency_id: string;
  setConstituency: (val: string) => void;
}
const Dropdown = ({
  constituencyItems,
  constituency_id,
  setConstituency,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  return (
    <DropDownPicker
      showArrowIcon={true}
      open={open}
      value={value}
      items={constituencyItems}
      setOpen={setOpen}
      setValue={setValue}
      onChangeValue={value => {
        setConstituency(value || '');
      }}
      // setItems={setItems}
      placeholder="Select Constituency"
      // theme="DARK"
      textStyle={{
        fontSize: 15,
        color: Colors.text_color,
      }}
      style={{
        marginTop: 5,
        minHeight: 40,
        backgroundColor: Colors.background,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
      }}
      dropDownContainerStyle={{
        backgroundColor: Colors.background,
      }}
      containerStyle={{
        backgroundColor: Colors.background,
        zIndex: 5000,
      }}
      placeholderStyle={{
        color: Colors.placeholder_text,
        fontWeight: 'bold',
      }}
      ArrowDownIconComponent={() => (
        <Image
          source={
            Colors.isDarkMode
              ? require('../assets/img/down_arrow_gray.png')
              : require('../assets/img/down_arrow.png')
          }
          style={{
            width: 20,
            height: 20,
          }}
        />
      )}
      TickIconComponent={() => (
        <Image
          source={
            Colors.isDarkMode
              ? require('../assets/img/check_mark.png')
              : require('../assets/img/check_mark.png')
          }
          style={{
            width: 10,
            height: 10,
          }}
        />
      )}
      //
    />
  );
};
export default Dropdown;
