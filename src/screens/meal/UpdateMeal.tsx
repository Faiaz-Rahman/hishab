import {View, Text, Pressable, ToastAndroid, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';

import MainLayout from '@layouts/MainLayout';
import {Calendar, DateData} from 'react-native-calendars';
import {Colors, Dim} from '@constants';

import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import AppText from '@components/common/Text';
import RedirectButton from '@components/common/RedirectButton';
import Animated from 'react-native-reanimated';
import CheckBox from '@react-native-community/checkbox';
import Button from '@components/common/Button';

type DateWithMealType = {
  date: string;
  lunch: boolean;
  dinner: boolean;
};

export default function UpdateMeal() {
  const [selected, setSelected] = useState<string>('');
  const navigation = useNavigation();
  const [selectedSecond, setSelectedSecond] = useState<string>('');

  const [objOfDates, setObjOfDates] = useState({});
  const [toggleShowAllDates, setToggleShowAllDates] = useState(false);
  const [arrayOfDates, setArrayOfDates] = useState<Array<DateWithMealType>>([]);
  const [dinner, setDinner] = useState<boolean>(true);
  const [lunch, setLunch] = useState<boolean>(true);

  const generateDateObj = (
    year: string,
    month: string,
    sDay: number,
    eDay: number,
  ) => {
    const dateObj: any = {};

    for (let i = sDay; i <= eDay; ++i) {
      if (i === sDay) {
        dateObj[`${year}-${month}-${i}`] = {
          startingDay: true,
          selected: true,
          selectedColor: Colors.socialBlue,
          marked: true,
        };
      } else if (i === eDay) {
        dateObj[`${year}-${month}-${i}`] = {
          endingDay: true,
          selected: true,
          selectedColor: Colors.socialBlue,
          marked: true,
        };
      } else {
        dateObj[`${year}-${month}-${i}`] = {
          selected: true,
          selectedColor: Colors.socialPink,
        };
      }
    }
    return dateObj;
  };

  const generateArrayForDates = (
    year: string,
    month: string,
    sDay: number,
    eDay: number,
  ): Array<any> => {
    const dateArray: DateWithMealType[] = [];
    for (let i = sDay; i <= eDay; ++i) {
      dateArray.push({
        date: `${year}-${month}-${i}`,
        lunch: true,
        dinner: true,
      });
    }

    return dateArray;
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
            marked: true,
          };
          setObjOfDates(obj);
          const dateArray = [{date: day.dateString, lunch: true, dinner: true}];
          setArrayOfDates(dateArray);
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
            const returnArray = generateArrayForDates(year, month, sDay, eDay);

            setArrayOfDates(returnArray);
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
          const returnArray = generateArrayForDates(year, month, sDay, eDay);

          setArrayOfDates(returnArray);
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

  const handleLunch = (
    item: DateWithMealType,
    index: number,
    val: boolean,
  ) => {};

  React.useEffect(() => {
    console.log(arrayOfDates);
  }, [arrayOfDates]);

  return (
    <MainLayout noScroll={false}>
      <View
        style={{
          height: 50,
          //   backgroundColor: 'red',
          width: Dim.width,
          paddingLeft: Dim.width * 0.075 - 15,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backbutton}>
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
        markingType="dot"
        onDayPress={handleDayPress}
        markedDates={objOfDates}
        enableSwipeMonths={true}
      />

      {selected && (
        <View style={styles.formattedDateWrapper}>
          <AppText
            styles={{
              color: Colors.socialWhite,
              fontSize: 13,
              fontFamily: 'Roboto-Medium',
            }}>
            {formatDate()}
          </AppText>
        </View>
      )}

      <RedirectButton
        onPress={() => {
          setToggleShowAllDates(prev => !prev);
        }}
        animated={true}
        title="Modify Meals for Specific Dates"
        animatedValue={toggleShowAllDates ? 1 : 0}
        extraStyle={{marginTop: 25}}
      />

      {toggleShowAllDates &&
        arrayOfDates.map((item: DateWithMealType, index) => {
          return (
            <View
              key={`dateDeltailsSelector${index}`}
              style={[
                styles.dateDetailsSelector,
                {marginTop: index === 0 ? 25 : 0},
              ]}>
              <AppText
                styles={{
                  fontSize: 12,
                  fontFamily: 'Roboto-Medium',
                }}>
                {moment(item.date).format('ll')}
              </AppText>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppText>Lunch</AppText>
                <CheckBox
                  value={item.lunch}
                  tintColors={{false: Colors.lighterGray, true: Colors.lime}}
                  onValueChange={val => {
                    console.log(val);
                    setArrayOfDates(prev =>
                      prev.map((eachDate, index) => {
                        return eachDate.date === item.date
                          ? {...eachDate, lunch: val}
                          : eachDate;
                      }),
                    );
                  }}
                />
                <AppText
                  styles={{
                    marginLeft: 5,
                  }}>
                  Dinner
                </AppText>
                <CheckBox
                  value={item.dinner}
                  tintColors={{false: Colors.lighterGray, true: Colors.lime}}
                  onValueChange={val => {
                    setArrayOfDates(prev =>
                      prev.map((eachDate, index) => {
                        return eachDate.date === item.date
                          ? {...eachDate, dinner: val}
                          : eachDate;
                      }),
                    );
                  }}
                />
              </View>
            </View>
          );
        })}

      <Button
        title="Save Changes"
        width={Dim.width * 0.85}
        buttonStyle={{
          height: 70,
          alignSelf: 'center',
          borderRadius: 15,
          marginTop: toggleShowAllDates && arrayOfDates.length > 0 ? 0 : 25,
        }}
        onPress={() => {}}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  calendar: {
    flex: 1,
    width: Dim.width * 0.85,
    alignSelf: 'center',
    height: Dim.height * 0.55,
    borderRadius: 5,
  },
  formattedDateWrapper: {
    height: 70,
    width: Dim.width * 0.85,
    alignSelf: 'center',
    backgroundColor: Colors.socialBlack,
    borderRadius: 15,
    paddingLeft: 15,
    justifyContent: 'center',
    marginTop: 25,
  },
  backbutton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDetailsSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dim.width * 0.85,
    height: 70,
    borderRadius: 15,
    backgroundColor: Colors.socialBlack,
    alignSelf: 'center',
    marginBottom: 25,
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 20,
  },
});
