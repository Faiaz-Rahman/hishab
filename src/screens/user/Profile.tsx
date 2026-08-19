import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import MainLayout from '@layouts/MainLayout';
import {Colors, Dim} from '@constants';
import moment from 'moment';
import Button from '@components/common/Button';
import AppText from '@components/common/Text';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {persistor, RootState} from '@store/index';
import {logout} from '@store/slices/authSlice';
import {getAuth, onAuthStateChanged, signOut} from '@react-native-firebase/auth';
import type {User} from '@react-native-firebase/auth';

export default function Profile() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [firebaseUser, setFirebaseUser] = React.useState<User | null>(getAuth().currentUser);
  const {userInfo} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => onAuthStateChanged(getAuth(), setFirebaseUser), []);

  const onPressLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(getAuth());
      await persistor.purge();
      dispatch(logout({}));
    } finally {
      setIsLoading(false);
    }
  };

  const name = firebaseUser?.displayName || userInfo.displayName || 'Flat member';
  const email = firebaseUser?.email || userInfo.email || 'Email unavailable';
  const joinedAt = firebaseUser?.metadata.creationTime;
  const joinedDate = joinedAt && moment(joinedAt).isValid() ? moment(joinedAt).format('D MMMM, YYYY') : 'Not available';
  const photoURL = firebaseUser?.photoURL || userInfo.photoUrl;

  return (
    <MainLayout noScroll={false}>
      <View style={styles.content}>
        <View style={styles.profileHero}>
          <LinearGradient
            colors={['#E6FF8A', '#BFF24E', '#86D96B']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={styles.avatarFrame}>
            <Image source={photoURL ? {uri: photoURL} : require('@assets/images/user.png')} style={styles.avatar} />
          </LinearGradient>
          <View style={styles.identity}>
            <AppText styles={styles.eyebrow}>MY ACCOUNT</AppText>
            <AppText styles={styles.name}>{name}</AppText>
            <AppText styles={styles.email}>{email}</AppText>
          </View>
        </View>

        <AppText styles={styles.sectionLabel}>ACCOUNT DETAILS</AppText>
        <View style={styles.detailsCard}>
          <DetailRow label="Email address" value={email} />
          <View style={styles.divider} />
          <DetailRow label="Member since" value={joinedDate} />
          <View style={styles.divider} />
          <DetailRow label="Account status" value={firebaseUser?.emailVerified ? 'Email verified' : 'Active member'} accent />
        </View>

        <Button title="Log out" disabled={isLoading} width={Dim.width * 0.85} useGradient={false} buttonStyle={styles.logoutButton} titleStyle={styles.logoutText} onPress={onPressLogout} />
      </View>
    </MainLayout>
  );
}

function DetailRow({label, value, accent = false}: {label: string; value: string; accent?: boolean}) {
  return <View style={styles.detailRow}><AppText styles={styles.detailLabel}>{label}</AppText><AppText styles={{...styles.detailValue, ...(accent ? styles.activeValue : {})}}>{value}</AppText></View>;
}

const styles = StyleSheet.create({
  content: {width: Dim.width * 0.85, alignSelf: 'center', paddingTop: 18},
  profileHero: {padding: 20, borderRadius: 24, backgroundColor: '#202E28', borderWidth: 1, borderColor: '#334838', flexDirection: 'row', alignItems: 'center'},
  avatarFrame: {height: 72, width: 72, borderRadius: 10, alignItems: 'center', justifyContent: 'center', transform: [{rotate: '45deg'}]},
  avatar: {height: 50, width: 50, borderRadius: 10, resizeMode: 'contain', transform: [{rotate: '-45deg'}]},
  identity: {flex: 1, marginLeft: 22},
  eyebrow: {fontSize: 10, color: '#A8D78C', letterSpacing: 1, fontFamily: 'Poppins-SemiBold'},
  name: {fontSize: 21, fontFamily: 'Poppins-Bold', marginTop: 3},
  email: {fontSize: 11, color: '#C6D6C8', marginTop: 3},
  sectionLabel: {fontSize: 11, color: Colors.lighterGray, letterSpacing: 1, fontFamily: 'Poppins-SemiBold', marginTop: 28, marginBottom: 10},
  detailsCard: {paddingHorizontal: 17, borderRadius: 18, backgroundColor: Colors.socialBlack, borderWidth: 1, borderColor: Colors.cardBorder},
  detailRow: {minHeight: 66, justifyContent: 'center'},
  detailLabel: {fontSize: 10, color: Colors.lighterGray, fontFamily: 'Poppins-Medium'},
  detailValue: {fontSize: 14, color: Colors.socialWhite, fontFamily: 'Poppins-SemiBold', marginTop: 3},
  activeValue: {color: Colors.success},
  divider: {height: 1, backgroundColor: Colors.cardBorder},
  logoutButton: {height: 52, marginTop: 22, backgroundColor: 'transparent', borderColor: '#614049', borderWidth: 2, alignItems: 'center', justifyContent: 'center'},
  logoutText: {color: Colors.danger},
});
