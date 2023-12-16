import React, {useEffect, useRef, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors} from '../utils';
//
const Dropdown = () => {
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
      items={items}
      setOpen={setOpen}
      setValue={setValue}
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
      }}
      placeholderStyle={{
        color: Colors.placeholder_text,
        fontWeight: 'bold',
      }}
      arrowIconStyle={{
        width: 20,
        height: 20,
        backgroundColor: Colors.placeholder_text,
      }}
    />
  );
};
export default Dropdown;
