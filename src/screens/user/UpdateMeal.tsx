import {View, Text, Pressable, ToastAndroid, StyleSheet} from 'react-native';
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

  // React.useEffect(() => {
  //   console.log(objOfDates, selected, selectedSecond);
  // }, [objOfDates, selected, selectedSecond]);

  const generateDateObj = (
    year: string,
    month: string,
    sDay: number,
    eDay: number,
  ) => {
    const dateObj: any = {};

    for (let i = sDay; i <= eDay; ++i) {
      dateObj[`${year}-${month}-${i}`] = {
        selected: true,
        selectedColor: Colors.socialBlue,
        marked: true,
      };
    }
    return dateObj;
  };

  const handleDayPress = useCallback(
    (day: DateData) => {
      let obj: any = {};
      if (!selected) {
        // console.log(1);
        if (day.day >= parseInt(moment().format('DD'))) {
          setSelected(day.dateString);
          // console.log(2);

          obj[`${day.dateString}`] = {
            selected: true,
            selectedColor: Colors.socialBlue,
            selectedDotColor: 'red',
          };
          setObjOfDates(obj);
        } else {
          // console.log(3);

          ToastAndroid.showWithGravity(
            'Cannot select a day from past!',
            1500,
            2,
          );
        }
      } else {
        // console.log(4);

        if (day.day <= parseInt(moment(selected).format('DD'))) {
          // console.log(5);
          if (day.day < parseInt(moment().format('DD'))) {
            // console.log(6);

            ToastAndroid.showWithGravity(
              'Cannot select a day from past!',
              1500,
              2,
            );
          } else {
            // console.log(7);
            let first = selected;

            setSelectedSecond(first);
            setSelected(day.dateString);

            const year = moment(first).format('YYYY');
            const month = moment(first).format('MM');

            const sDay = parseInt(moment(day.dateString).format('DD'));
            const eDay = parseInt(moment(first).format('DD'));

            const returnObj = generateDateObj(year, month, sDay, eDay);

            setObjOfDates(returnObj);
          }
        } else {
          // console.log(8);
          setSelectedSecond(day.dateString);

          const year = moment(selected).format('YYYY');
          const month = moment(selected).format('MM');
          const sDay = parseInt(moment(selected).format('DD'));
          const eDay = parseInt(moment(day.dateString).format('DD'));

          const returnObj = generateDateObj(year, month, sDay, eDay);

          setObjOfDates(returnObj);
        }
      }
    },
    [selected, selectedSecond, objOfDates],
  );

  const formatDate = (): string => {
    if (selected && !selectedSecond) {
      return moment(selected).format('LL');
    } else if (selected && selectedSecond) {
      if (selected === selectedSecond) {
        let selectedFDate = moment(selected).format('LL');

        return selectedFDate;
      }
      let selectedFDate = moment(selected).format('LL');
      let selectedFSecondDate = moment(selectedSecond).format('LL');

      return selectedFDate + ' - ' + selectedFSecondDate;
    } else {
      return '';
    }
  };

  return (
    <MainLayout noScroll={false}>
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
        style={styles.calendar}
        theme={{
          calendarBackground: Colors.socialBlack,
          selectedDayTextColor: '#fff',
          monthTextColor: '#fff',
          todayTextColor: Colors.socialBlue,
          dayTextColor: '#fff',
          arrowColor: Colors.socialPink,
        }}
        hideExtraDays={true}
        hideArrows={true}
        markingType="custom"
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
          <AppText
            styles={{
              color: Colors.socialWhite,
              fontSize: 14,
              fontFamily: 'Roboto-Regular',
            }}>
            {formatDate()}
          </AppText>
        </View>
      )}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  calendar: {
    width: Dim.width * 0.9,
    alignSelf: 'center',
    height: Dim.height * 0.55,
    borderRadius: 5,
  },
});
