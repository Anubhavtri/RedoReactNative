/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
const Dashboard = props => {
  useEffect(() => {
    console.log('This will run every dashjkjcjkxcjkxjckjxkcj>>>>>>!');



  }, []);



  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>


        <View style={styles.toolbar}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();


            }}>
            <View style={{ flexDirection: 'row' }}>

              <Text style={styles.Title}>Vitals</Text>
              <Image
                source={require('../../assets/images/left.png')}
                style={{ tintColor: colors.PRIMARY_COLOR, height: s(24), width: s(24), position: 'absolute', top: 0, left: 0 }}
              />
            </View>
          </TouchableOpacity>

        </View>
        <Text style={{ justifyContent: 'center', alignSelf: 'center', color: colors.PRIMARY_TEXT_COLOR }}>Harmind Arora</Text>
        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: s(10) }}>25 Year/Male</Text>


        <ScrollView>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log('only check');
                props.navigation.navigate('KYCDocuments');
                              }}>
              <View style={styles.card_container}>
                <View style={{ flex: 1 }}>
                  <View style={styles.circle_main}>
                    <Image
                      source={require('../../assets/images/accepted.png')}
                      style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                    />
                  </View>
                </View>
                <Text style={styles.card_title}>KYC Documents</Text>
                <View style={styles.check_mark_container}>
                  <Image
                    source={require('../../assets/images/check-mark.png')}
                    style={styles.check_mark}
                  />
                  <Image
                    source={require('../../assets/images/cancel.png')}
                    style={styles.cancel_mark}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                console.log('only check VideoKYC');
                props.navigation.navigate('VideoKYC');
                              }}>
            <View style={styles.card_container}>
              <View style={{ flex: 1 }}>
                <View style={styles.circle_main}>
                  <Image
                    source={require('../../assets/images/accepted.png')}
                    style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                  />
                </View>
              </View>
              <Text style={styles.card_title}>KYC Video</Text>
              <View style={styles.check_mark_container}>
                <Image
                  source={require('../../assets/images/check-mark.png')}
                  style={styles.check_mark}
                />
                <Image
                  source={require('../../assets/images/cancel.png')}
                  style={styles.cancel_mark}
                />
              </View>
            </View>
            </TouchableOpacity>

            <View style={styles.card_container}>
              <View style={{ flex: 1 }}>
                <View style={styles.circle_main}>
                  <Image
                    source={require('../../assets/images/accepted.png')}
                    style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                  />
                </View>
              </View>
              <Text style={styles.card_title}>Health Monitor</Text>
              <View style={styles.check_mark_container}>
                <Image
                  source={require('../../assets/images/check-mark.png')}
                  style={styles.check_mark}
                />
                <Image
                  source={require('../../assets/images/cancel.png')}
                  style={styles.cancel_mark}
                />
              </View>
            </View>

            <View style={styles.card_container}>
              <View style={{ flex: 1 }}>
                <View style={styles.circle_main}>
                  <Image
                    source={require('../../assets/images/accepted.png')}
                    style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                  />
                </View>
              </View>
              <Text style={styles.card_title}>Weight Machine</Text>
              <View style={styles.check_mark_container}>
                <Image
                  source={require('../../assets/images/check-mark.png')}
                  style={styles.check_mark}
                />
                <Image
                  source={require('../../assets/images/cancel.png')}
                  style={styles.cancel_mark}
                />
              </View>
            </View>

            <View style={styles.card_container}>
              <View style={{ flex: 1 }}>
                <View style={styles.circle_main}>
                  <Image
                    source={require('../../assets/images/accepted.png')}
                    style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                  />
                </View>
              </View>
              <Text style={styles.card_title}>Height Karma</Text>
              <View style={styles.check_mark_container}>
                <Image
                  source={require('../../assets/images/check-mark.png')}
                  style={styles.check_mark}
                />
                <Image
                  source={require('../../assets/images/cancel.png')}
                  style={styles.cancel_mark}
                />
              </View>
            </View>

            <View style={styles.card_container}>
              <View style={{ flex: 1 }}>
                <View style={styles.circle_main}>
                  <Image
                    source={require('../../assets/images/accepted.png')}
                    style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                  />
                </View>
              </View>
              <Text style={styles.card_title}>Lab Test</Text>
              <View style={styles.check_mark_container}>
                <Image
                  source={require('../../assets/images/check-mark.png')}
                  style={styles.check_mark}
                />
                <Image
                  source={require('../../assets/images/cancel.png')}
                  style={styles.cancel_mark}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log('only check VideoKYC');
                props.navigation.navigate('MERFrom');
                              }}>
            <View style={styles.card_container}>
              <View style={{ flex: 1 }}>
                <View style={styles.circle_main}>
                  <Image
                    source={require('../../assets/images/accepted.png')}
                    style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                  />
                </View>
              </View>
              <Text style={styles.card_title}>MER Form</Text>
              <View style={styles.check_mark_container}>
                <Image
                  source={require('../../assets/images/check-mark.png')}
                  style={styles.check_mark}
                />
                <Image
                  source={require('../../assets/images/cancel.png')}
                  style={styles.cancel_mark}
                />
              </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('only check VideoKYC');
                props.navigation.navigate('Signature');
                              }}>
            <View style={styles.card_container}>
              <View style={{ flex: 1 }}>
                <View style={styles.circle_main}>
                  <Image
                    source={require('../../assets/images/accepted.png')}
                    style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                  />
                </View>
              </View>
              <Text style={styles.card_title}>Signature</Text>
              <View style={styles.check_mark_container}>
                <Image
                  source={require('../../assets/images/check-mark.png')}
                  style={styles.check_mark}
                />
                <Image
                  source={require('../../assets/images/cancel.png')}
                  style={styles.cancel_mark}
                />
              </View>
            </View>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                console.log('only check');



              }}>


              <Text
                style={{
                  color: colors.WHITE_COLOR,
                  fontFamily: fonts('poppinsSemibold'),
                }}>
                {'Submit'}
              </Text>


            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_COLOR
  },
  toolbar: {
    backgroundColor: 'transparent',
    height: s(50),
    padding: s(10),
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: s(20)
  },
  circle_main: {
    height: s(30), width: s(30), borderRadius: s(15), backgroundColor: colors.PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
  }
  ,
  check_mark_container: {
    flexDirection: 'row', justifyContent: 'center', flex: 1
  },
  check_mark: { tintColor: colors.GREEN, height: s(15), width: s(15), alignSelf: 'center', margin: s(2) },
  cancel_mark: { tintColor: colors.RED, height: s(15), width: s(15), alignSelf: 'center', margin: s(2) },

  card_title: {
    justifyContent: 'center', alignSelf: 'center', color: colors.PRIMARY_COLOR, flex: 4, fontFamily: fonts('poppinsSemibold')
  },
  text_input: {
    fontSize: s(20),
    color: colors.PRIMARY_COLOR,
    alignSelf: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: fonts('poppinsSemibold'),
  },
  Title: {
    fontSize: s(15),
    color: colors.PRIMARY_COLOR,
    fontFamily: fonts('poppinsSemibold'),
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%'



  },
  button: {
    textAlign: 'center',
    alignContent: 'center',
    height: s(40),
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BUTTON,
    borderRadius: s(20),
    fontSize: s(12),
    marginTop: s(10),
    alignSelf: 'center',
    fontFamily: fonts('poppinsSemibold'),
  },
});



export default Dashboard;
