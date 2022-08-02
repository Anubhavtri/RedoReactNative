import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
  BackHandler, Alert
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { create } from '../../helpers/PlatformSpecificStyles';
import CityStyle from './CityStyle';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import { StatusBar } from 'react-native';
import Actions from './CityAction';
import { Screens, navigate } from '../../helpers/Screens';
import Constants from '../../staticData/Constants';
//import FirebaseActions from '../../app/FirebaseActions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

import Mapmyindia from 'mapmyindia-restapi-react-native-beta';
import RNLocation from 'react-native-location';
import LOC from '../../staticData/svg/LOC.svg'
import links from '../../helpers/links';

import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import SpinnerAction from '../../components/spinner/SpinnerActions';

// for user current location 

export const City = props => {

  const [city, setCity] = useState(false);
  const [pinCode, setPinCode] = useState();
  const [SelectedCity, setSelectedCity] = useState();
  const [lang, setlang] = useState()
  const [long, setlong] = useState()
  const [mmitoken, setmmitoken] = useState("");
  const [PhleboLatitude, setPhleboLatitude] = useState()
  const [PhleboLongitude, setPhleboLongitude] = useState()
  const [userdetailarray, setuserdetailarray] = useState()
  const [newaprochlat, setnewaprochlat] = useState()
  const [newaprochlong, setnewaprochlong] = useState()
  const [val, setval] = useState()
  const dispatch = useDispatch()

  const regx = /^[0-9]\d{5}$/;

  useEffect(() => {
    props.getPincode('');
  }, []);

  let styles = create(CityStyle);

  const location_icon = {
    uri: 'https://redcliffelabsbackend.s3.amazonaws.com/media/gallary-file/None/a6154098-61c0-4d49-8737-d6495d24a9b0.png',
  };

  useEffect(() => {
    const backAction = () => {
      if (props.navigation.isFocused()) {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    location()
  }, [])


  const location = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then((data) => {
            
          })
          .catch((err) => {
            alert("Turn on your location to continue")
          });

  }

  const hello = () => {
    Geolocation.getCurrentPosition(info => {
      console.log(info?.coords, "all location details")
      // setPhleboLatitude(`${info?.coords?.latitude}`)
      // setPhleboLongitude(`${info?.coords?.longitude}`)
      // console.log(PhleboLatitude , PhleboLongitude , "free code")
      Mapmyindia.rev_geocode({ lat: `${info?.coords?.latitude}`, lng: `${info?.coords?.longitude}` }, (response) => {
        // alert(JSON.stringify(response));
        console.log("hhhh", response)
        if (response?.results) {
          setuserdetailarray(response?.results)
        }
      });
    }
    );
  }


 

  // const mapmyindia = () => {

  // }


  // map my india logic  

  useEffect(() => {
    getmmitoken();
  }, [])

  const getmmitoken = () => {
    console.log("entererd token")
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_id', '33OkryzDZsKamfiPiKFdn3JedW3I1sO_efflBdDslqsmTSZmsD2SPw4DU3SPC459TYVRlA4DUCLLpIoO5jAOJQ==')
    params.append('client_secret', 'lrFxI-iSEg8wS11NUoDEndR2zcztS6p73mr5dC4bfgeS1SSbfOhj2SKP-Vh0gbPinqh-w3f66JbgvjrDuq5OdXMZYOVLEuEG')

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post('https://outpost.mapmyindia.com/api/security/oauth/token', params, config)

      .then(({ data }) => {
        // console.log("mmi data", data.access_token);
        setmmitoken(data.access_token)
      })
      .catch(function (error) {
        console.log("error", error);
      });

  }

  // const [lat , setlat] = useState()
  // const [log , setlog] = useState()



  const getlivelocation = () => {
    console.log("entererd live loc")
    let config = {
      headers: { 'Authorization': 'Bearer ' + mmitoken },
      // params: {
      //     name: ``
      // },
    }

    axios.get('https://intouch.mapmyindia.com/iot/api/device/', config)

      .then(function (responseeee) {
        console.log(responseeee, "myindia lat long ")
        Mapmyindia.rev_geocode({ lat: `${responseeee?.data?.data[0]?.location?.latitude}`, lng: `${responseeee?.data?.data[0]?.location?.longitude}` }, (response) => {
          // alert(JSON.stringify(response));
          console.log("hhhh", response)
          if (response?.results) {
            setuserdetailarray(response?.results)
          }
        });
        // console.log(response , "mp lat long")
        // setlat(`${response?.data?.data[0]?.location?.latitude}`)
        //   setlog(`${response?.data?.data[0]?.location?.longitude}`)
        //   if(lat && log){
        //     console.log(lat , log , "map lat long ")
        //   }
      })
      .catch(function (error) {
        console.log("live loc err", error);
      })

  }

  const [newaproch, setnewaproch] = useState([])
  // new approch 

  const currentlocation = () => {

    RNLocation.configure({
      distanceFilter: 5.0
    })

    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
      if (granted) {
        locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
          console.log(locations, "function call")
          Mapmyindia.rev_geocode({ lat: `${locations[0]?.latitude}`, lng: `${locations[0]?.longitude}` }, (response) => {
            // alert(JSON.stringify(response));
            console.log("hhhh", response)
            if (response?.results) {
              setuserdetailarray(response?.results)
            }
          });
        })
      }
    })
  }

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexGrow: 1 }}>
          <View style={[styles.TopContainer]}>
            <Text style={[styles.cityHeading, Constants.fontType.jMedium]}>
              Enter Pincode
            </Text>
            <Text
              style={[
                styles.TextSubHeading,
                styles.marginBottomClass,
                Constants.fontType.jRegular,
              ]}>
              Select pin code to see health package availability
            </Text>
          </View>

          <View
            style={{ backgroundColor: '#A2A2A2', height: 0.5, width: '100%' }}
          />
          <View
            style={[
              styles.BodyContainerTop,
              styles.flexViewRows,
              { paddingVertical: 2, marginHorizontal: 16 },
            ]}>
            <Text
              style={[
                styles.UseCurrentLocations,
                styles.TextHeading,
                styles.paddingAll,
                styles.citytext,
                Constants.fontType.jMedium,
                { minHeight: 50 }
              ]}>
              PINCODE
            </Text>
          </View>
          <View
            style={[
              styles.flexViewRowsEnterPin,
              styles.MaxHeightBox,
              { marginHorizontal: 16, justifyContent: 'space-between' },
            ]}>
            <TextInput
              style={[
                styles.EnterPincode,
                styles.MaxHeightBox,
                styles.paddingAll,
                Constants.fontType.jRegular,
              ]}
              maxLength={6}
              value={pinCode}
              // onChangeText={value => {
              // }}
              onChangeText={(value) => {
                if (value.length > 3 || value.length == 0) {
                  props.getPincode(value)
                  setCity(false)
                  if (!regx.test(value)) {
                    setCity(true)
                    // console.log(city, 'city error')
                  } else {
                    setPinCode(value)
                  }
                  setPinCode(value)
                } else {
                  setCity(false)
                  if (!regx.test(value)) {
                    setCity(true)
                    // console.log(city, 'city error')
                  } else {
                    setPinCode(value)
                  }
                  setPinCode(value)
                }
              }}
              keyboardType="numeric"
              placeholder="Enter Pincode"></TextInput>
          </View>
          <View style={[styles.paddingAll]}>
            <TouchableOpacity style={styles.ctCon}
              onPress={() => {
                // location()
                // getlivelocation()
                // if (mmitoken) {
                // getlivelocation()
                // if(PhleboLatitude && PhleboLongitude ){
                // locationwithfree()
                // }else{
                //   alert("there is no lat long ")
                // }
                // }
                // alert("working")
                // location()
                // if (PhleboLatitude && PhleboLongitude) {
                //   useraddress()
                // }
                // getlivelocation()
                // currentlocation()
                // location()
                // getlivelocation()
                hello()
              }}>
              <LOC />
              <Text style={styles.locStyle}> Use Current Location</Text>
            </TouchableOpacity>
          </View>

          {userdetailarray && userdetailarray.map((item) => {
            return (
              <View style={[styles.locCon]}>
                <View style={styles.dirLoc}>
                  <Text style={[styles.citytext, Constants.fontType.jRegular]}>{item?.city} {item?.pincode}</Text>
                  <TouchableOpacity onPress={() => {
                    // gotonext(item?.pincode)
                    // dispatch(SpinnerAction.showSpinner());
                  //  FirebaseActions.trackEvent("Go to Main Screen", null)
                    props.getcityid(item?.pincode)
                    setTimeout(() => {
                      if ( props?.cityId && props?.cityId?.cityId && props?.cityId?.cityId[0]) {
                        props?.setCityObj(props?.cityId?.cityId[0])
                        // dispatch(SpinnerAction.hideSpinner());
                        navigate(Screens.TAB)
                      }
                    }, 500);
                  }}
                    style={styles.btnCons}>
                    <Text style={styles.btnTxt}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })}
          <View style={[styles.Body, styles.paddingAll]}>
            <FlatList
              data={props?.cityPincodeList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                marginHorizontal: 10,
              }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    borderBottomColor: '#A2A2A2',
                    borderBottomWidth: 0.3,
                    width: '100%',
                  }}></View>
              )}
              ListHeaderComponent={
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      { fontSize: 16, color: '#404040' },
                      Constants.fontType.jMedium,
                    ]}
                  >
                    <Text style={{ color: '#E5184E' }}> Please Select Option From List Below  </Text>
                  </Text>
                </View>
              }
              renderItem={({ item, index }) => (
                <ScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      setPinCode(item?.pincode);
                      setSelectedCity(item?.city)
                      setCity(true)
                      props?.setCityObj(item)
                   //   FirebaseActions.trackEvent("Go to Main Screen", null)
                      navigate(Screens.TAB)
                    }}
                    style={[styles.CityList, styles.paddingTopandBottom]}>
                    <Text
                      style={[styles.citytext, Constants.fontType.jRegular]}>
                      {item?.city},{item?.area},{item?.pincode}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => ({
  cityPincodeList: state.city?.cityPincode,
  cityId: state.city
});

const mapDispatchToProps = dispatch => {
  return {
    getPincode: code => dispatch(Actions.getPincode(code)),
    getcityid: code => dispatch(Actions.getcityid(code)),
    setCityObj: cityObj => dispatch(Actions.setCityObj(cityObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(City);