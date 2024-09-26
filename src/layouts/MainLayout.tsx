import {Colors, Dim} from '@constants';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface MainLayoutProps {
  children: React.ReactNode;
  noScroll: boolean;
  floatingButton?: boolean;
  floatingButtonComponent?: React.ReactNode;
  floatingButtonOnPress?: () => void;
}

export default function MainLayout({
  children,
  noScroll,
  floatingButton,
  floatingButtonComponent,
  floatingButtonOnPress,
}: MainLayoutProps) {
  return (
    <View style={{flex: 1, backgroundColor: '#000', position: 'relative'}}>
      {noScroll ? (
        <View style={styles.mainLayout}>
          <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
          {children}
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollview}>
          <StatusBar barStyle={'light-content'} backgroundColor={'#000'} />
          {children}
        </ScrollView>
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
    backgroundColor: '#000',
  },
  noScrollWrapper: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlack,
  },
  scrollview: {
    paddingTop: 30,
    backgroundColor: '#000',
    paddingBottom: Dim.height * 0.2,
  },
  floatingButtonWrapper: {
    height: 60,
    width: Dim.width,
    position: 'absolute',
    // backgroundColor: 'green',
    top: '80%',
    justifyContent: 'center',
    paddingRight: 20,
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
