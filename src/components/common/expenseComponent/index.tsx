import {View, Text, StyleSheet, Pressable, LayoutAnimation} from 'react-native';
import React from 'react';
import TextInput from '../AppTextInput';
import {Colors, Dim} from '@constants';
import AppText from '../Text';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  LightSpeedInLeft,
  LightSpeedOutRight,
} from 'react-native-reanimated';

interface ExpenseComponentProps {
  no: number;
  onDelete: () => void;
  updateFirstTextInput: (index: number, value: string) => void;
  updatePrice: (index: number, value: number) => void;
  updateQuantity: (index: number, value: number) => void;
}
export default function ExpenseComponent({
  no,
  onDelete,
  updateFirstTextInput,
  updateQuantity,
  updatePrice,
}: ExpenseComponentProps) {
  return (
    <Animated.View
      style={[]}
      entering={LightSpeedInLeft}
      exiting={LightSpeedOutRight}>
      <View style={styles.inputWrapper}>
        <View style={styles.headerWrapper}>
          <AppText
            styles={{
              marginLeft: Dim.width * 0.075 + 5,
              fontFamily: 'Poppins-Bold',
            }}>
            Item No. {no + 1}
          </AppText>

          <Pressable
            onPress={() => {
              onDelete();
            }}>
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
            updateFirstTextInput(no, text);
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
            updateQuantity(no, parseInt(text));
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
          placeholder="Price? (BDT)"
          keyboardType="numeric"
          placeholderTextColor={Colors.lighterGray}
          onChangeText={text => {
            updatePrice(no, parseInt(text));
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: Dim.width,
    // backgroundColor: 'red',
    gap: 10,
    height: Dim.height * 0.45,
  },
  extraTextInputStyle: {
    width: Dim.width * 0.8,
    height: 70,
    borderRadius: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'green',
    paddingRight: Dim.width * 0.1,
  },
});
