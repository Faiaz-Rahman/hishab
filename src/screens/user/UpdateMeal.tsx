import {View, Text, Pressable, ToastAndroid} from 'react-native';
import React, {useCallback, useState} from 'react';

import MainLayout from '@layouts/MainLayout';
import {Calendar, DateData} from 'react-native-calendars';
import {Colors, Dim} from '@constants';

import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import AppText from '@components/common/Text';

export default function UpdateMeal() {
  const [selected, setSelected] = useState<string>('');
  const navigation = useNavigation();
  const [selectedSecond, setSelectedSecond] = useState<string>('');

  const [objOfDates, setObjOfDates] = useState({});

  React.useEffect(() => {
    console.log(objOfDates, selected, selectedSecond);
  }, [objOfDates, selected, selectedSecond]);

  const updateDateObj = useCallback(() => {
    let obj: any = {};
    if (selected && !selectedSecond) {
      let timestamp = moment(selected).format('YYYY-MM-DD');
      Object.assign(obj, {
        selected: true,
        backgroundColor: '#fff',
        selectedDotColor: 'red',
      });

      setObjOfDates(obj);
    } else if (selected && selectedSecond) {
      let startingDate: number = Number.parseInt(moment(selected).format('DD'));
      let endingDate: number = Number.parseInt(
        moment(selectedSecond).format('DD'),
      );

      let startingMonth: number = Number.parseInt(
        moment(selected).format('MM'),
      );

      let startingYear: number = Number.parseInt(
        moment(selected).format('YYYY'),
      );

      let currentDate = new Date(selected);
      let endDate = new Date(selectedSecond);
      while (currentDate <= endDate) {
        let currentFormattedDate = moment(currentDate).format('YYYY-MM-DD');
        obj[currentFormattedDate] = {
          selected: true,
          backgroundColor: 'red',
          selectedDotColor: 'red',
        };

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }, [selected, selectedSecond]);

  const handleDayPress = (day: DateData) => {
    // console.log('selected day =>', day)
    if (!selected) {
      setSelected(day.dateString);
    } else {
      if (day.day <= parseInt(moment(selected).format('DD'))) {
        if (day.day < new Date().getDate()) {
          ToastAndroid.showWithGravity(
            'Cannot select a day from past!',
            1500,
            2,
          );
        } else {
          if (day.day === parseInt(moment(selected).format('DD'))) {
            setSelectedSecond(day.dateString);
          }
          setSelected(day.dateString);
        }
      } else {
        setSelectedSecond(day.dateString);
      }
    }
    updateDateObj();
  };

  const formatDate = (): string => {
    if (selected && !selectedSecond) {
      return moment(selected).format('LL');
    } else if (selected && selectedSecond) {
      let selectedFDate = moment(selected).format('LL');
      let selectedFSecondDate = moment(selectedSecond).format('LL');

      return selectedFDate + ' - ' + selectedFSecondDate;
    } else {
      return '';
    }
  };

  return (
    <MainLayout noScroll={true}>
      <View
        style={{
          height: 50,
          //   backgroundColor: 'red',
          width: Dim.width * 0.9,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Entypo name="chevron-thin-left" size={20} color={'#fff'} />
        </Pressable>
      </View>

      <Calendar
        style={{
          width: Dim.width * 0.9,
          alignSelf: 'center',
          borderRadius: 5,
        }}
        theme={{
          calendarBackground: Colors.socialBlack,
          selectedDayTextColor: '#fff',
          monthTextColor: '#fff',
          todayTextColor: Colors.socialBlue,
          dayTextColor: '#fff',
          arrowColor: Colors.socialPink,
          selectedDayBackgroundColor: Colors.socialBlue,
        }}
        hideExtraDays={true}
        hideArrows={true}
        markingType="period"
        onDayPress={handleDayPress}
        markedDates={objOfDates}
      />

      {selected && (
        <View
          style={{
            height: 70,
            width: Dim.width * 0.9,
            alignSelf: 'center',
            backgroundColor: Colors.socialBlack,
            borderRadius: 15,
            paddingLeft: 15,
            justifyContent: 'center',
            marginTop: 25,
          }}>
          <AppText styles={{color: Colors.socialWhite}}>{formatDate()}</AppText>
        </View>
      )}
    </MainLayout>
  );
}
