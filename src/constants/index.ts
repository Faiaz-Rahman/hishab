import {Dimensions} from 'react-native';

export const Dim = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  standardWidth: Dimensions.get('window').width * 0.85,
};

export const Colors = {
  darkBlack: '#181A1C',
  pureBlack: '#000',
  socialBlue: '#2E8AF6',
  socialPink: '#F62E8E',
  socialWhite: '#ECEBED',
  white: '#fff',
  darkGray: '#323436',
  lighterGray: '#727477',
  gradient: ['#F62E8E', '#F62E8E', '#AC1AF0'],
  socialBlack: '#1c1a1b',
};
