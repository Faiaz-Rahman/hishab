import {View, Text, Modal, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import AppText from '@components/common/Text';
import {Colors} from '@constants';

import Feather from 'react-native-vector-icons/Feather';

interface CustomModalType {
  visible?: boolean;
  onRequestClose?: () => void;
  headerText?: string;
  headerIcon?: React.ReactNode;
  title: string;
  onPressNo?: () => void;
  onPressYes?: () => void;
}

export default function CustomModal({
  visible = false,
  onRequestClose,
  headerText = '',
  headerIcon,
  title,
  onPressNo,
  onPressYes,
}: CustomModalType) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        if (onRequestClose) {
          onRequestClose();
        }
      }}>
      <View style={styles.modalOuterWrapper}>
        <View style={styles.modalActualWrapper}>
          {/* modal header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerIconWrapper}>
              {headerIcon}
              <AppText styles={{fontSize: 14, fontFamily: 'Roboto-Medium'}}>
                {headerText}
              </AppText>
            </View>

            {/* modal close button */}
            <Pressable
              onPress={onRequestClose}
              style={styles.closeButtonWrapper}>
              <Feather name="x" size={20} color={Colors.socialWhite} />
            </Pressable>
          </View>

          <View style={styles.modalBody}>
            <AppText
              styles={{
                fontSize: 16,
                fontFamily: 'Poppins-Bold',
              }}>
              {title}
            </AppText>

            <AppText
              styles={{
                fontSize: 13,
                fontFamily: 'Roboto-Regular',
              }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
              faci hasina?!
            </AppText>
          </View>

          <View
            style={{
              width: '100%',
              //   backgroundColor: 'green',
              height: 60,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Pressable onPress={onPressNo} style={styles.noButton}>
              <AppText
                styles={{color: Colors.lime, fontFamily: 'Poppins-Bold'}}>
                No
              </AppText>
            </Pressable>
            <Pressable onPress={onPressYes} style={styles.yesButton}>
              <AppText styles={{color: '#000', fontFamily: 'Poppins-Bold'}}>
                Yes
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalActualWrapper: {
    height: 280,
    width: 280,
    backgroundColor: Colors.socialBlack,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  modalOuterWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalHeader: {
    height: 40,
    width: '100%',
    // backgroundColor: 'red',
    paddingLeft: 25,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButtonWrapper: {
    height: 40,
    width: 40,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    gap: 10,
    alignItems: 'center',
  },
  modalBody: {
    paddingTop: 10,
    width: '100%',
    // backgroundColor: 'red',
    gap: 20,
    paddingLeft: 25,
    paddingRight: 15,
    height: '50%',
  },
  noButton: {
    height: 40,
    width: '35%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.lime,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    height: 40,
    width: '35%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.lime,
    backgroundColor: Colors.lime,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
