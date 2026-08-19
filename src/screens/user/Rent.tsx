import {StyleSheet, View} from 'react-native';
import React from 'react';
import MainLayout from '@layouts/MainLayout';
import AppText from '@components/common/Text';
import {Colors, Dim} from '@constants';
import Animated, {FadeInDown} from 'react-native-reanimated';

const rentRecords = [
  {name: 'Anik', rent: '৳4,250 due', advance: '৳4,250 due'},
  {name: 'Maruf', rent: '৳4,250 due', advance: '৳4,250 due'},
  {name: 'Fahim', rent: '৳4,400 due', advance: '৳4,400 due'},
  {name: 'Nishad', rent: '৳4,400 due', advance: '৳4,400 due'},
];

export default function Rent() {
  return (
    <MainLayout noScroll={false}>
      <View style={styles.hero}><AppText styles={styles.eyebrow}>AUGUST HOUSEHOLD</AppText><AppText styles={styles.title}>Rent overview</AppText><AppText styles={styles.description}>Track rent, advance, and service-charge commitments separately from the meal ledger.</AppText><View style={styles.chip}><AppText styles={styles.chipText}>4 recorded rent entries</AppText></View></View>
      <AppText styles={styles.section}>RECORDED PAYMENTS</AppText>
      {rentRecords.map((item, index) => <Animated.View key={item.name} entering={FadeInDown.delay(100 + index * 85).duration(330)} style={styles.card}><View style={styles.avatar}><AppText styles={styles.initial}>{item.name[0]}</AppText></View><View style={styles.details}><AppText styles={styles.name}>{item.name}</AppText><AppText styles={styles.advance}>Advance · {item.advance}</AppText></View><AppText styles={styles.rent}>{item.rent}</AppText></Animated.View>)}
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  hero: {width: Dim.width * 0.85, alignSelf: 'center', padding: 22, borderRadius: 24, backgroundColor: '#202E28', borderWidth: 1, borderColor: '#334838'}, eyebrow: {fontSize: 10, color: '#9FCF80', letterSpacing: 1.2, fontFamily: 'Poppins-SemiBold'}, title: {fontSize: 30, fontFamily: 'Poppins-Bold', marginTop: 3}, description: {fontSize: 12, color: '#B5C5B8', marginTop: 5, lineHeight: 18}, chip: {alignSelf: 'flex-start', marginTop: 19, backgroundColor: '#314937', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10}, chipText: {fontSize: 11, color: Colors.lime, fontFamily: 'Poppins-SemiBold'}, section: {width: Dim.width * 0.85, alignSelf: 'center', color: Colors.lighterGray, fontSize: 11, letterSpacing: 1, fontFamily: 'Poppins-SemiBold', marginTop: 28, marginBottom: 10}, card: {width: Dim.width * 0.85, minHeight: 78, alignSelf: 'center', paddingHorizontal: 14, marginBottom: 10, borderRadius: 18, backgroundColor: Colors.socialBlack, borderWidth: 1, borderColor: Colors.cardBorder, flexDirection: 'row', alignItems: 'center'}, avatar: {height: 42, width: 42, borderRadius: 14, backgroundColor: '#303D31', alignItems: 'center', justifyContent: 'center'}, initial: {fontFamily: 'Poppins-Bold', color: Colors.lime}, details: {flex: 1, marginLeft: 12}, name: {fontFamily: 'Poppins-SemiBold', fontSize: 14}, advance: {fontSize: 10, color: Colors.lighterGray, marginTop: 2}, rent: {fontFamily: 'Poppins-SemiBold', fontSize: 11, color: Colors.danger},
});
