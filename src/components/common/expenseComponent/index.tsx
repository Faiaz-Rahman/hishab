import {View, Text, StyleSheet, Pressable} from 'react-native';
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
  updateFirstTextInput: (value: string) => void;
  updatePrice: (value: string) => void;
  updateQuantity: (value: string) => void;
  itemNameErrorMessage: string | undefined;
  itemQuantityErrorMessage: string | undefined;
  priceErrorMessage: string | undefined;
}
export default function ExpenseComponent({
  no,
  onDelete,
  updateFirstTextInput,
  updateQuantity,
  updatePrice,
  itemNameErrorMessage,
  itemQuantityErrorMessage,
  priceErrorMessage,
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
            updateFirstTextInput(text);
          }}
          style={{
            width: Dim.width * 0.8,
            height: 70,
            borderRadius: 10,
          }}
          onBlur={() => {}}
          onFocus={() => {}}
        />
        <View style={styles.errorMessageWrapper}>
          {itemNameErrorMessage && (
            <Text style={{color: '#fff', fontSize: 8, fontWeight: '400'}}>
              {itemNameErrorMessage}
            </Text>
          )}
        </View>

        <TextInput
          showPassword
          placeholder="Item Quantity? (kg./pcs./g.)"
          keyboardType="numeric"
          placeholderTextColor={Colors.lighterGray}
          onChangeText={text => {
            updateQuantity(text);
          }}
          style={{
            width: Dim.width * 0.8,
            height: 70,
            borderRadius: 10,
          }}
          onBlur={() => {}}
          onFocus={() => {}}
        />

        <View style={styles.errorMessageWrapper}>
          {itemQuantityErrorMessage && (
            <Text style={{color: '#fff', fontSize: 8, fontWeight: '400'}}>
              {itemQuantityErrorMessage}
            </Text>
          )}
        </View>

        <TextInput
          showPassword
          placeholder="Price? (BDT)"
          keyboardType="numeric"
          placeholderTextColor={Colors.lighterGray}
          onChangeText={text => {
            updatePrice(text);
          }}
          style={{
            width: Dim.width * 0.8,
            height: 70,
            borderRadius: 10,
          }}
          onBlur={() => {}}
          onFocus={() => {}}
        />

        <View style={styles.errorMessageWrapper}>
          {priceErrorMessage && (
            <Text style={{color: '#fff', fontSize: 8, fontWeight: '400'}}>
              {priceErrorMessage}
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    width: Dim.width,
    paddingBottom: 2,
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
    marginBottom: 15,
  },
  errorMessageWrapper: {
    // backgroundColor: 'orange',
    height: 15,
    width: Dim.width * 0.8,
    alignSelf: 'center',
    paddingLeft: 10,
    justifyContent: 'center',
  },
});
