import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {formatDateToString} from '../utils';
//
interface Props {
  date?: string;
  setDate?: (date: string) => void;
}
//
const RnCalendar = ({date, setDate}: Props) => {
  //
  return (
    <View>
      <Calendar
        onDayPress={day => setDate?.(day.dateString)}
        // onMonthChange={month => {
        //   console.log('selected day', month);
        //   //   setSelected(day.dateString);
        // }}
        style={{
          justifyContent: 'center',
          borderRadius: 10,
          margin: 20,
        }}
        markedDates={{
          [date ? date : '']: {
            selected: true,
            disableTouchEvent: true,
          },
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
        }}
      />
    </View>
  );
};
//
export default RnCalendar;
//
