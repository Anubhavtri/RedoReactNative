import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { create } from '../../helpers/PlatformSpecificStyles';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import MainScreenStyle from './MainScreenStyle';
import Actions from '../../components/Packages/PackageActions';
import { TextInput } from 'react-native-gesture-handler';
import { Screens, navigate, resetScreen } from '../../helpers/Screens';
import ProfileAction from '../ProfileScreen/ProfileAction';
import BestPackages from '../../components/OurBestPackages/BestPackages';
import { Dimensions, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import BestPackActions from '../../components/OurBestPackages/BestPackageAction';
import CustomCarousel from '../../components/Carousel/Carousel';
import Constants from '../../staticData/Constants';
import Cart from '../../staticData/svg/Maincart.svg';
import Kidney from '../../staticData/svg/kidney.svg'
import PRESCRIPTION from '../../staticData/svg/prescription.svg'
import Covid from '../../staticData/svg/covid.svg'
import Heart from '../../staticData/svg/heart.svg'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info';
import CityAction from '../City/CityAction'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('screen')

export const MainScreen = props => {
  const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [RiskArea, setRiskArea] = useState(props?.riskarea)
  const disableSpinner = () => setSpinnerVisibilty(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [appversion , setappversion] = useState(props?.UserDetails?.app_version)

  useEffect(() => {
    props.getProfileDetails(props.token);
    props.fetchBestPackages(props.token, disableSpinner, props.cityId?.cityid);
    props.getRiskArea(props.token);
     AsyncStorage.getItem("fcmToken").then((value) => {
      console.log('fcmToken 222:' + value)
      if (value != null) {
      var body = {
        token :value
      }
        props.updateUserFcmToken(props.token,body);
      }

    });
   
  }, []);
  useEffect(() => {
    if (searchText === '') {
      setSearchList([]);
    } else if (searchText !== '') {
      setSearchList(props?.searchList);
    }
  }, [props.searchList]);

  // console.log(RiskArea, "risk araeas")

  // console.log(props?.PackageCart.length, "all package in cart in mainscreen")

  // console.log(props.cityId , "1111222223333344444999999999999999999999999")

  // console.log(searchList , "search list")
  let buildNumber = DeviceInfo.getBuildNumber();//25
  let version = DeviceInfo.getVersion();//2.9
  console.log("buildnumber&version", buildNumber, version)
 
  // let text = appversion ? appversion.toString() : null; 
 
  useEffect(() => {
    // if (props?.UserDetails?.app_version && buildNumber < props?.UserDetails?.app_version) {
    //   // console.log(buildNumber ,props?.UserDetails?.app_version , "main if screen kkk" )
    //   setModalVisible(true)
      
    // }
  }, [
    // props?.UserDetails?.app_version
  ])


  let noofcounts = props?.PackageCart.length

  useEffect(() => {
    if(!props?.cityId?.pincode){
      resetScreen(Screens.CITY)
    }
  } , [!props?.cityId?.pincode])

  return (
    <View style={{ marginTop: StatusBar.currentHeight || 0 }}>
      <View style={styles.maindiv}>
        <View style={styles.topnav}>
          <View style={styles.head}>
            <Image
              style={styles.logo}
              source={require('../../staticData/assests/logo.png')}
            />
            <TouchableOpacity
              onPress={() => {
                setTimeout(() => {
                  props.getCart(props?.cityId?.cityId, props?.token)
                }, 700);
                navigate(Screens.MY_CART);
              }}
            // style={{backgroundColor:'yellow'}}
            >
              <View style={{ backgroundColor: 'red', borderRadius: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 2, marginLeft: 26, minWidth: 20 }}>
                <Text style={{ color: 'white', fontSize: 15 }}>{noofcounts}</Text>
              </View>
              <View style={{ marginTop: 5, marginRight: 15 }}>
                <Cart />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollsection}>
            <View style={styles.searchsection}>
              <View style={styles.searchinputsection}>
                <View style={styles.searchiconfield}>
                  <Feather
                    style={styles.searchicon}
                    name="search"
                    backgroundColor="#3b5998"
                  />
                </View>
                <View style={styles.searchinputfield}>
                  <TextInput
                    style={styles.search}
                    value={searchText}
                    onChangeText={value => {
                      setSearchText(value);
                      if (searchText.length > 2) {
                        props.fetchPackages(
                          props?.token,
                          disableSpinner,
                          props.cityId?.cityid,
                          value,
                        );
                      }
                    }}
                    placeholder="Search Tests, Package, Body Areas.."
                  />
                </View>
              </View>
              <View style={{ minWidth: '95%', minHeight: 20, }}>
                <Pressable
                  onPress={() => {
                    // props.clearCityObj()
                    resetScreen(Screens.CITY)
                  }}
                  style={{ maxWidth: '30%' }}
                >
                  <Text style={{ fontSize: 12, color: '#C7C7C7', marginTop: 5 }}>Location <Text style={{ color: '#47CACC' }}> {props?.cityId?.pincode} </Text>
                    <Feather
                      name="chevron-down"
                      backgroundColor="#3b5998"
                    />
                  </Text>
                </Pressable>
              </View>
            </View>
            {searchText ? (
              <View
                style={{
                  minHeight: '18%',
                  backgroundColor: 'white',
                  padding: '5%',
                  position: 'absolute',
                  zIndex: 5,
                  marginTop: '17%',
                  width: '100%',
                }}>
                {searchList?.map((item, index) => {
                  if (index < 4) {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigate(Screens.PLAN_DETAIL, item);
                          setSearchList([]);
                          setSearchText('');
                        }}
                        style={{
                          color: '#0E3F6C',
                          fontSize: '14',
                          paddingVertical: '4%',
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
            ) : null}
            <View style={styles.section}>
              <CustomCarousel />
            </View>
            {/* <View style={styles.section}>
              <Pressable 
              onPress={()=>{
                navigate(Screens.IMAGANING_PACKAGES)
              }}
              >
                <Text>Radiology</Text>
              </Pressable>
            </View> */}
            <View style={styles.rowsection}>
              <Pressable
                onPress={() => {
                  navigate(Screens.ALLPACKAGE, {
                    search: '',
                    from: 'mainpageTabs',
                    best: true,
                    packageIndex: 1
                  });
                }}
                style={styles.press}>
                <Text style={[styles.topic, Constants.fontType.jMedium]}>
                  Our Best Packages
                </Text>
                <Text style={[styles.seeall, Constants.fontType.jSemi_bold]}>
                  {'See All'}
                  <AntDesign
                    name='right'
                    style={{
                      color: '#E5184E',
                      fontSize: 10,
                      fontWeight: 'bold',
                      padding: 3
                    }}
                  />
                </Text>

              </Pressable>
            </View>
            <View style={styles.section}>
              <BestPackages />
            </View>
            <View style={{
              bottom: 5,
              height: height / 8,
              width: width / 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                height: height / 7.5,
                width: width / 1.11,
                backgroundColor: '#FFFFFF',
                borderWidth: 0.5,
                flexDirection: 'row',
                alignSelf: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderColor: '#A2A2A2'
              }}>
                <View style={{
                  height: height / 10,
                  width: width / 6,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <PRESCRIPTION />
                </View>
                <View style={{
                  height: height / 10,
                  width: width / 2.3,
                  justifyContent: 'space-evenly'
                }}>
                  <Text style={{
                    fontSize: height / 55,
                    color: '#707070',
                    fontWeight: 'bold'
                  }}>Upload Prescription</Text>
                  <Text style={{
                    fontSize: height / 70,
                    color: '#707070',

                  }}>choose from 3500+ health test and get same day reports</Text>
                </View>
                <View style={{
                  height: height / 10,
                  width: width / 3.7,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigate(Screens.UPLOAD_PRESCREPTION)
                    }}
                    style={{
                      height: height / 25,
                      width: width / 4.5,
                      borderWidth: 0.5,
                      backgroundColor: '#47CACC',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#A2A2A2',
                      borderRadius: 5
                    }}>
                    <Text style={{
                      color: '#FFFFFF',
                      fontWeight: 'bold',
                    }}>UPLOAD</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.card}>
                <View style={styles.cardleft}>
                  <Image
                    style={styles.cardimage}
                    source={require('../../staticData/assests/preception.png')}
                  />
                </View>
                <View style={styles.cardright}>
                  <View style={styles.row}>
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Book Test
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={{ color: '#707070', fontSize: 12 }}>
                      Get all the medical attention you desire
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={{ color: '#47CACC', fontSize: 12 }}>
                      FREE Doctor Consultation
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Pressable
                      style={{}}
                      onPress={() => {
                        navigate(Screens.APPOINTMENT);
                      }}>
                      <Text style={styles.book}>BOOK</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rowsection}>
              <Pressable
                onPress={() => {
                  navigate(Screens.ALLPACKAGE, {
                    search: '',
                    from: 'mainpageTabs',
                    best: false,
                    packageIndex: 0
                  });
                }}
                style={styles.press}>
                <Text style={[styles.topic, Constants.fontType.jMedium]}>
                  Top Categories
                </Text>
                <Text style={[styles.seeall, Constants.fontType.jSemi_bold]}>
                  {'See All'}
                  <AntDesign
                    name='right'
                    style={{
                      color: '#E5184E',
                      fontSize: 10,
                      fontWeight: 'bold',
                      padding: 3
                    }}
                  />
                </Text>

              </Pressable>
            </View>
            <View style={styles.section}>
              <View style={styles.categoryrow}>
                <TouchableOpacity
                  onPress={() => {
                    navigate(Screens.ALLPACKAGE, {
                      search: 'covid 19',
                      from: 'mainpageTabs',
                      best: false,
                      packageIndex: 2,
                    });
                  }}
                  style={styles.touch}>
                  <View style={styles.categoryicon}>
                    <Covid />
                  </View>
                  <View style={styles.cardtextfield}>
                    <Text>Covid-19</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate(Screens.ALLPACKAGE, {
                      search: 'heart',
                      from: 'mainpageTabs',
                      best: false,
                      packageIndex: 0,
                    });
                  }}
                  style={styles.touch}>
                  <View style={styles.categoryicon}>
                    <Heart />
                  </View>
                  <View style={styles.cardtextfield}>
                    <Text>Heart</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigate(Screens.ALLPACKAGE, {
                      search: 'kidney',
                      from: 'mainpageTabs',
                      best: false,
                      packageIndex: 0,
                    });
                  }}
                  style={styles.touch}>
                  <View style={styles.categoryicon}>
                    <Kidney />
                  </View>
                  <View style={styles.cardtextfield}>
                    <Text>Kidney</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.updateCon}>
                  <Text style={styles.modalText}>Please update the app </Text>
                </View>
                <Pressable
                  style={styles.btnCons}
                  onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.redcliffelabs')}
                >
                  <Text style={styles.btnTxt}>update</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </View>
  );
};
let styles = create(MainScreenStyle);

const mapStateToProps = state => ({
  UserDetails: state.userprofile?.userProfile,
  token: state.user.userData?.token,
  packageList: state.bestpackage?.bestPackages,
  searchList: state.bestpackage?.allPackageMain,
  cityId: state.city?.cityObj,
  PackageCart: state?.packageData?.cartpackages,
  riskarea: state?.userprofile
});

const mapDispatchToProps = dispatch => {
  return {
    getProfileDetails: token => {
      dispatch(ProfileAction.getProfileDetails(token));
    },
    getRiskArea: () => {
      dispatch(ProfileAction.getRiskArea());
    },
    fetchBestPackages: (token, disableSpinner, cityId) => {
      dispatch(
        BestPackActions.fetchBestPackages(token, disableSpinner, cityId),
      );
    },
    getCart: (cityId, token) => {
      dispatch(Actions.getCart(cityId, token))
    },
    updateUserFcmToken: (token,body) => {
      dispatch(ProfileAction.updateUserFcmToken(token,body))
    },
    clearCityObj: () => {
      dispatch(CityAction.clearCityObj())
    },
    fetchPackages: (token, disableSpinner, cityId, searchText) => {
      console.log(cityId, "kkkkk")
      dispatch(
        BestPackActions.fetchPackages(
          token,
          disableSpinner,
          cityId,
          searchText,
        ),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);