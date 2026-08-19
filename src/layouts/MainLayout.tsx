import {Colors, Dim} from '@constants';
import {MainLayoutProps} from '@interfaces/*';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {FadeInDown} from 'react-native-reanimated';

export default function MainLayout({
  children,
  noScroll,
  floatingButton,
  floatingButtonComponent,
  floatingButtonOnPress,
  stickyHeader,
}: MainLayoutProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.pureBlack,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.pureBlack} />
      {noScroll ? (
          <Animated.View entering={FadeInDown.duration(350)} style={styles.mainLayout}>
          {children}
          </Animated.View>
      ) : (
        <>
          {stickyHeader && <View style={styles.stickyHeader}>{stickyHeader}</View>}
          <ScrollView
            contentContainerStyle={[styles.scrollview, stickyHeader && styles.scrollviewWithStickyHeader]}
            showsVerticalScrollIndicator={false}>
            <Animated.View entering={FadeInDown.duration(350)}>{children}</Animated.View>
          </ScrollView>
        </>
      )}

      {floatingButton && (
        <View style={styles.floatingButtonWrapper}>
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
            }}
            onPress={() => {
              if (floatingButtonOnPress) {
                floatingButtonOnPress();
              }
            }}>
            <LinearGradient
              colors={Colors.gradient}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              locations={[0, 0.25, 0.6]}
              style={styles.gradient}>
              <View style={styles.floatingButtonInnerWrapper}>
                <MaskedView
                  maskElement={
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {floatingButtonComponent}
                    </View>
                  }>
                  <LinearGradient
                    colors={Colors.gradient}
                    start={{x: 0, y: 0.6}}
                    end={{x: 0.6, y: 0}}
                    locations={[0, 0.25, 0.6]}
                    style={{height: 30, width: 30}}
                  />
                </MaskedView>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    paddingTop: 30,
    width: Dim.width,
    backgroundColor: Colors.pureBlack,
  },
  noScrollWrapper: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlack,
  },
  scrollview: {
    paddingTop: 30,
    // alignItems: 'center',
    backgroundColor: Colors.pureBlack,
    width: Dim.width,
    paddingBottom: Dim.height * 0.2,
  },
  scrollviewWithStickyHeader: {
    paddingTop: 96,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dim.width,
    height: 96,
    paddingTop: 30,
    backgroundColor: Colors.pureBlack,
    zIndex: 10,
    elevation: 10,
  },
  floatingButtonWrapper: {
    height: 60,
    width: Dim.width,
    position: 'absolute',
    // backgroundColor: 'green',
    bottom: 28,
    justifyContent: 'center',
    paddingRight: 24,
    alignItems: 'flex-end',
  },
  gradient: {
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonInnerWrapper: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 45,
    borderRadius: 50,
  },
});
