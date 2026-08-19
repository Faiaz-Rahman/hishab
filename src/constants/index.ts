import {Dimensions} from 'react-native';

export const Dim = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  standardWidth: Dimensions.get('window').width * 0.85,
};

export const Colors = {
  darkBlack: '#15171D',
  pureBlack: '#090A0F',
  socialBlue: '#2E8AF6',
  socialPink: '#F62E8E',
  socialWhite: '#ECEBED',
  white: '#fff',
  darkGray: '#292C35',
  lighterGray: '#9499A8',
  gradient: ['#B7F52C', '#86D90B', '#42B64A'],
  socialBlack: '#1A1D25',
  lime: '#C8F542',
  cardBorder: '#303541',
  muted: '#B8BDC9',
  success: '#8DE65B',
  danger: '#FF7A8B',
  purple: '#9D7BFF',
};
