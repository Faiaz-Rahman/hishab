import {View, Text} from 'react-native';
import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Login() {
  return (
    <View>
      <Text style={{color: '#000', fontFamily: 'Poppins-Medium'}}>Login</Text>

      <AntDesign name="downcircleo" color={'#000'} size={25} />
    </View>
  );
}
