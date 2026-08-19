import {StyleSheet, View} from 'react-native';
import React from 'react';
import MainLayout from '@layouts/MainLayout';
import AppText from '@components/common/Text';
import {Colors, Dim} from '@constants';
import Animated, {FadeInDown} from 'react-native-reanimated';

const utilityBreakdown = [
  {label: 'Bua & household help', amount: 500},
  {label: 'Shared utilities', amount: 3330},
  {label: 'Bath, kitchen & keys', amount: 320},
];

export default function Utilities() {
  return (
    <MainLayout noScroll={false}>
      <View style={styles.hero}>
        <AppText styles={styles.eyebrow}>AUGUST HOUSEHOLD</AppText>
        <AppText styles={styles.title}>Utilities</AppText>
        <AppText styles={styles.description}>A clear view of non-meal shared costs for the flat.</AppText>
        <View style={styles.total}><AppText styles={styles.totalLabel}>TOTAL UTILITY COST</AppText><AppText styles={styles.totalValue}>৳4,150</AppText></View>
      </View>
      <AppText styles={styles.section}>COST BREAKDOWN</AppText>
      {utilityBreakdown.map((item, index) => (
        <Animated.View key={item.label} entering={FadeInDown.delay(120 + index * 90).duration(350)} style={styles.row}>
          <View style={styles.dot} /><AppText styles={styles.rowLabel}>{item.label}</AppText><AppText styles={styles.amount}>৳{item.amount.toLocaleString()}</AppText>
        </Animated.View>
      ))}
      <View style={styles.note}><AppText styles={styles.noteText}>These costs are included in each member’s final take/give settlement.</AppText></View>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  hero: {width: Dim.width * 0.85, alignSelf: 'center', padding: 22, borderRadius: 24, backgroundColor: '#262438'},
  eyebrow: {fontSize: 10, color: '#B4A8ED', letterSpacing: 1.2, fontFamily: 'Poppins-SemiBold'},
  title: {fontSize: 30, fontFamily: 'Poppins-Bold', marginTop: 3},
  description: {fontSize: 12, color: Colors.muted, marginTop: 5, lineHeight: 18},
  total: {marginTop: 24, borderTopWidth: 1, borderTopColor: '#3D3855', paddingTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  totalLabel: {fontSize: 10, color: '#B4A8ED', fontFamily: 'Poppins-SemiBold'}, totalValue: {fontSize: 22, fontFamily: 'Poppins-Bold', color: Colors.lime},
  section: {width: Dim.width * 0.85, alignSelf: 'center', color: Colors.lighterGray, fontSize: 11, letterSpacing: 1, fontFamily: 'Poppins-SemiBold', marginTop: 28, marginBottom: 10},
  row: {width: Dim.width * 0.85, minHeight: 68, alignSelf: 'center', paddingHorizontal: 16, marginBottom: 10, borderRadius: 18, backgroundColor: Colors.socialBlack, borderWidth: 1, borderColor: Colors.cardBorder, flexDirection: 'row', alignItems: 'center'},
  dot: {height: 8, width: 8, borderRadius: 4, backgroundColor: Colors.lime, marginRight: 12}, rowLabel: {fontSize: 13, flex: 1, color: Colors.socialWhite}, amount: {fontFamily: 'Poppins-SemiBold', fontSize: 15},
  note: {width: Dim.width * 0.85, alignSelf: 'center', padding: 16, marginTop: 8, borderRadius: 16, backgroundColor: '#1D2530'}, noteText: {fontSize: 11, color: '#AABFD7', lineHeight: 17},
});
