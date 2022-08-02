import React, {useState} from 'react';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MyAddressStyle from './MyAddressStyle';
import {create} from '../../helpers/PlatformSpecificStyles';
import {RadioButton} from 'react-native-paper';
import {Screens, navigate} from '../../helpers/Screens';
import {FlatList} from 'react-native-gesture-handler';
import Constants from '../../staticData/Constants';

const data = [
  {name: 'Jatin Sharma', address: '007, Venice Beach, Omaha Estate, 42142'},
  {name: 'Viktor Krum', address: '412, Goa Beach, Omaha Estate, 42143'},
];

export const MyAddress = props => {
  const [checked, setChecked] = useState('first');

  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.TopNav}>
        <MaterialCommunityIcons
          onPress={e => {
            props.navigation.goBack();
          }}
          style={{fontSize: 25, marginRight: 10}}
          name="arrow-left"
          backgroundColor="#3b5998"
        />
        <Text style={styles.topnavtext}>My Address</Text>
      </View>
      <View style={[styles.Body, styles.paddingClass]}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.package}>
              <View style={[styles.row, {marginHorizontal: 16, marginTop: 20}]}>
                <Text
                  style={[styles.packageNameCard, Constants.fontType.jMedium]}>
                  {item.name}
                </Text>

                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
              </View>
              <View
                style={[
                  styles.row,
                  {marginHorizontal: 16, marginTop: 10, paddingBottom: 20},
                ]}>
                <View style={{flex: 0.5}}>
                  <Text
                    style={[styles.TextHeading, Constants.fontType.jRegular]}
                    numberOfLines={2}>
                    {item.address}
                  </Text>
                </View>
                <View style={{flex: 0.2}} />
                <View
                  style={{
                    flex: 0.3,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginRight: 10,
                  }}>
                  <TouchableOpacity
                    onPress={e => {
                      navigate(Screens.USERADD_ADDRESS);
                    }}
                    style={styles.editsection}>
                    <Feather
                      style={[{fontSize: 15, marginRight: 10}]}
                      name="edit"
                      backgroundColor="#3b5998"
                    />
                    <Text style={[Constants.fontType.jRegular]}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
        <ScrollView>
          {/* <View style={styles.package}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.packageNameCard}>jatin Sharma</Text>
              </View>
              <View style={styles.row}>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.address}>
                <Text style={[styles.TextHeading, {marginHorizontal: 15}]}>
                  007, Venice Beach, Omaha Estate, 42142
                </Text>
              </View>
              <View style={styles.row}>
                <Pressable style={styles.editsection}>
                  <Feather
                    onPress={e => {
                      props.navigation.goBack();
                    }}
                    style={{fontSize: 15, marginRight: 10}}
                    name="edit"
                    backgroundColor="#3b5998"
                  />
                  <Text>Edit</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={styles.package}>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={styles.packageNameCard}>Viktor krum</Text>
              </View>
              <View style={styles.row}>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.address}>
                <Text style={[styles.TextHeading, {marginHorizontal: 15}]}>
                  007, Venice Beach, Omaha Estate, 42142
                </Text>
              </View>
              <View style={styles.row}>
                <Pressable style={styles.editsection}>
                  <Feather
                    onPress={e => {
                      props.navigation.goBack();
                    }}
                    style={{fontSize: 15, marginRight: 10}}
                    name="edit"
                    backgroundColor="#3b5998"
                  />
                  <Text>Edit</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View
            style={{
              borderColor: '#47CACC',
              borderWidth: 1,
              minHeight: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              marginTop: 12,
            }}>
            <Pressable
              onPress={() => {
                navigate(Screens.USERADD_ADDRESS);
              }}>
              <Text style={{color: '#47CACC'}}>ADD NEW ADDRESS</Text>
            </Pressable>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

let styles = create(MyAddressStyle);

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress);
