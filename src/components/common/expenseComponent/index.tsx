import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import TextInput from '../AppTextInput';
import {Colors, Dim} from '@constants';
import AppText from '../Text';
import LinearGradient from 'react-native-linear-gradient';

interface ExpenseComponentProps {
  no: number;
  onDelete: () => void;
}

export default function ExpenseComponent({
  no,
  onDelete,
}: ExpenseComponentProps) {
  return (
    <View style={styles.inputWrapper}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: 'green',
          paddingRight: Dim.width * 0.1,
        }}>
        <AppText
          styles={{
            marginLeft: Dim.width * 0.075 + 5,
            fontFamily: 'Poppins-Bold',
          }}>
          Item No. {no}
        </AppText>

        <Pressable onPress={onDelete}>
          <LinearGradient
            colors={Colors.gradient}
            start={{x: 0, y: 0.6}}
            end={{x: 0.6, y: 0}}
            locations={[0, 0.25, 0.6]}
            style={{
              height: 30,
              width: 70,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AppText styles={{fontSize: 13, fontFamily: 'Roboto-Bold'}}>
              Delete
            </AppText>
          </LinearGradient>
        </Pressable>
      </View>
      <TextInput
        showPassword
        placeholder="Item Name?"
        placeholderTextColor={Colors.lighterGray}
        onChangeText={text => {
          console.log(text);
        }}
        style={{
          width: Dim.width * 0.8,
          height: 70,
          borderRadius: 10,
        }}
        onBlur={() => {}}
        onFocus={() => {}}
      />

      <TextInput
        showPassword
        placeholder="Item Quantity?"
        placeholderTextColor={Colors.lighterGray}
        onChangeText={text => {
          console.log(text);
        }}
        style={{
          width: Dim.width * 0.8,
          height: 70,
          borderRadius: 10,
        }}
        onBlur={() => {}}
        onFocus={() => {}}
      />

      <TextInput
        showPassword
        placeholder="Price?"
        placeholderTextColor={Colors.lighterGray}
        onChangeText={text => {
          console.log(text);
        }}
        style={{
          width: Dim.width * 0.8,
          height: 70,
          borderRadius: 10,
        }}
        onBlur={() => {}}
        onFocus={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: Dim.width,
    // backgroundColor: 'red',
    gap: 10,
  },
  extraTextInputStyle: {
    width: Dim.width * 0.8,
    height: 70,
    borderRadius: 10,
  },
});
