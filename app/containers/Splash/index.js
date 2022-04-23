/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
const Splash = props => {
  useEffect(() => {
    console.log('This will run every seconddfdfsdfdsfdsfsf!');
    setTimeout(async () => {
      //this.setState({timePassed: true});
      console.log('This will run every seconddfdfsdfdsfdsfsf!');
      // props1.navigation.navigate('Login', { name: 'Jane 123456789' })
      try {
        props.navigation.replace('Authorized', { name: 'Jane 123456789' });

      } catch (e) {
        console.log('Exception>>' + e);
        // error reading value
      }
    }, (Platform.OS === 'ios') ? 0 : 2000);
   

  }, []);
  
  

  return (
    <>
      {/*  <StatusBar barStyle="dark-content" /> */}
      <StatusBar backgroundColor={colors.PRIMARY_COLOR} barStyle="light-content" />
      <View style={styles.container}>
        {(Platform.OS === 'ios') ? null :

          <Text
            style={{
              alignContent: 'center',
              alignSelf: 'center',
              color:colors.WHITE_COLOR,
              fontSize:s(15)
             
            }}
           > KYC APP</Text>}


      </View>
    </>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY_COLOR
  },
  text_input: {
    fontSize: s(20),
    color: colors.WHITE_COLOR,
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: fonts('poppinsSemibold'),
  },
});



export default Splash;
