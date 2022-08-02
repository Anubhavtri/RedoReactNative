import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Dimensions, Modal, ScrollView ,FlatList,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Rplus from '../../../staticData/svg/Rplus.svg'
import { connect } from 'react-redux';
import { navigate, resetScreen, Screens } from '../../../helpers/Screens';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { height, width } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';
import { GETApi } from "../../../app/ApiCall.js";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DefaultSetting from '../../../settings/styles/DefaultPrimarySettings';
import Actions from '../../../containers/ProfileScreen/ProfileAction'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileRedoScreen = (props) => {
  const [modalVisibles, setModalVisibles] = useState(false);
  const [userList, setUserList] = useState([])
  const [isGFitActive, setisGFitActive] = useState(false)
  const [userDetails, setUserDetails] = useState('')
  const [spinnerShow, setSpinnerShow] = useState(false)
  const [parentId, setParentId] = useState(null)
  const [selectedUser, setSelectedUser] = useState('')
  useEffect(() => {
    signinWithGFit()
    getItemFromStorage()
      callApiUserList("redoapp/get-unique-users-child/")
      if (!props?.token) {
        navigate(Screens.NEW_LOGIN)
    }
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      callApiUserList("redoapp/get-unique-users-child/")
      getItemFromStorage()
  });

  return willFocusSubscription;
  }, [])
  const getItemFromStorage = async () => {
    try {
         await AsyncStorage.getItem('userId', (error, result) => {
           if (result) {
             console.log("check :"+result);
             setSelectedUser(selectedUser)
             callApiDetails("/redoapp/get-unique-customer?uc_id="+result)
           }else{
            callApiDetails("/redoapp/get-unique-customer")
           }
         });
         await AsyncStorage.getItem('parentId', (error, result) => {
          if (result) {
            console.log("check :"+result);
            setParentId(result)
          }
        });
       } catch (error) {
        callApiDetails("/redoapp/get-unique-customer")
         console.log(error);
       }
  }
  const callApiDetails = async(url)=>{
    setSpinnerShow(true)
    var getResult = await GETApi(url,props?.token)
    if(getResult.error){
     setSpinnerShow(false)
     alert(getResult.message)
    }else {
     setSpinnerShow(false)
     setUserDetails(getResult.data)
     setSelectedUser(getResult?.data?.id)
    }
}
const callApiUserList = async(url)=>{
  setSpinnerShow(true)
  var getResult = await GETApi(url,props?.token)
  if(getResult.error){
   setSpinnerShow(false)
   alert(getResult.message)
  }else {
   setSpinnerShow(false)
   setUserList(getResult.data)
  }
}
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_BLOOD_GLUCOSE_READ,
      Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
      Scopes.FITNESS_NUTRITION_WRITE,
      Scopes.FITNESS_SLEEP_READ,
      
    ],
  };
  
  const backAction = () => {
    resetScreen(Screens.TAB)
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  const GoogleSign = () => {
    if (!isGFitActive) {
      signinWithGFit()
    }
    else {
      setisGFitActive(false)
    }
  }
  const signinWithGFit = async () => {
    GoogleFit.authorize(options)
    .then(authResult => {
      if (authResult.success) {
        console.log('AUTH_', authResult);
        setisGFitActive(true)
      } else {
        console.log('AUTH_ ' + authResult.message);
        setisGFitActive(false)
      }
    })
    .catch(() => {
    });
  }
  const callProfileDetailsScreen=(parentID)=>{
    setModalVisibles(!modalVisibles)
    navigate(Screens.REDO_PERSONAL_DETAILS,{parentId : parentID}) 
  }
  const callProfileEditScreen=(itemDetails)=>{
    setModalVisibles(!modalVisibles)
    navigate(Screens.UPDATE_DETAILS,{userId : itemDetails.id,parentId : itemDetails.parent,name : itemDetails.name,gender : itemDetails.gender,age : itemDetails.age,dob : itemDetails.dob,weight : itemDetails.weight,height : itemDetails.height}) 
  }
  const setNewUser = async(item)=>{
    setModalVisibles(!modalVisibles)
    setSelectedUser(item.id+"")
    setParentId(item.parent)
    callApiDetails("/redoapp/get-unique-customer?uc_id="+item.id)
    console.log("item.id : "+item.id)
    console.log("item.parentId : "+item.parent)
    await AsyncStorage.setItem("userId",item.id+"")
    await AsyncStorage.setItem("parentId",item.parent+"")
  }
  return (
    
    <SafeAreaView>
      <View style={styles.mainContainer}>
      <Spinner visible={spinnerShow}></Spinner>
          
      <View style={styles.TopNav}>
                <Text style={styles.topnavtext}>Profile</Text>
            </View>
            <View style={[styles.Body]}>
          
                <ScrollView>
                <View style={{flexDirection : "column",width :"100%"}}>
              
            
                    <View style={styles.userdetail}>
                      <View style={{flexDirection : 'row',alignItems : 'center',width :"90%"}}>
                      <View >
                                {userDetails?.image != undefined ?
                                    <Image
                                        style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#E5184E' }}
                                        source={{ uri: userDetails?.image }}
                                    />
                                    :
                                    <Image
                                        style={{ width:30, height: 30, borderRadius: 15, backgroundColor: 'black' }}
                                        source={require('../../../staticData/assests/head_icon.png')}
                                    />
                                }
                            </View>
                            <View>
                                <Text style={{ fontSize: 18, color: '#0E3F6C', fontWeight: 'bold', paddingHorizontal: '4%' }}> {userDetails?.name ? userDetails?.name : 'Guest'}</Text>
                            </View>
                      </View>
                      <View style={{flexDirection : 'row',alignItems : 'center',width :"10%"}}>
                                <TouchableOpacity
                                    onPress={() => {
                                      navigate(Screens.UPDATE_DETAILS,{userId : userDetails?.id,parentId : userDetails?.parent,name : userDetails?.name,gender : userDetails?.gender,age : userDetails?.age,dob : userDetails?.dob,weight : userDetails?.weight,height : userDetails?.height}) 
                                    }}
                                >
                                    <MaterialIcons name="mode-edit" size={25} color="#E5184E" />
                                </TouchableOpacity>
                            </View>
                    </View>
                    <View style={{flexDirection : 'row',alignItems : 'center',width :"90%",alignSelf : 'center',borderWidth :1,borderColor : 'grey',borderRadius :5,marginTop :10,marginBottom :15}}>
                    <View style={{flexDirection : 'column',alignItems : 'center',width :"25%",height :50,justifyContent : 'center',borderRightWidth :.5,borderRightColor : 'grey'}}>
                    <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold',paddingBottom :2.5 }}> {userDetails?.age} y/o</Text>
                    <Text style={{ fontSize: 11, color: 'grey',paddingTop :2.5 }}>Age (Y)</Text>
                       </View>
                       <View style={{flexDirection : 'column',alignItems : 'center',width :"25%",height :50,justifyContent : 'center',borderRightWidth :.5,borderRightColor : 'grey'}}>
                    <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold',paddingBottom :2.5 }}> {userDetails?.height}</Text>
                    <Text style={{ fontSize: 11, color: 'grey',paddingTop :2.5 }}>Height (CM)</Text>
                       </View>
                       <View style={{flexDirection : 'column',alignItems : 'center',width :"25%",height :50,justifyContent : 'center',borderRightWidth :.5,borderRightColor : 'grey'}}>
                    <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold',paddingBottom :2.5,textTransform :'capitalize' }}> {userDetails?.gender}</Text>
                    <Text style={{ fontSize: 11, color: 'grey',paddingTop :2.5 }}>Gender</Text>
                       </View>
                       <View style={{flexDirection : 'column',alignItems : 'center',width :"25%",height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold',paddingBottom :2.5 }}> {userDetails?.last_weight?.last_weight}</Text>
                    <Text style={{ fontSize: 11, color: 'grey',paddingTop :2.5 }}>Weight (Kg)</Text>
                       </View>
                    </View>
                    <TouchableOpacity onPress={() => {
                                        GoogleSign()
                                    }} style={{flexDirection : 'row',alignItems : 'center',width :"90%",marginTop :10,height : 50,alignSelf : 'center',justifyContent : 'center',borderTopColor : 'grey',borderTopWidth :1}}>
                    <View style={{width : '10%',height :50,justifyContent : 'center'}}>
                    <Image
                                        style={{ width:20, height: 20 }}
                                        source={require('../../../staticData/assests/google-fiticon.png')}
                                    />
                    </View>
                    <View style={{width : '80%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey',fontWeight :'bold' }}>Google Fit {isGFitActive}</Text>
                    {isGFitActive && (<Text style={{ fontSize: 10, color: 'red',position : 'absolute',right : 10,alignSelf : 'center' }}>Disconnect</Text>)}
                    {!isGFitActive && (<Text style={{ fontSize: 10, color: 'green',position : 'absolute',right : 10,alignSelf : 'center' }}>Connect</Text>)}
                   </View>
                    
                    <View style={{width : '10%',height :50,alignItems : 'flex-end',justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="chevron-right" size={25} color="#707070" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                                       setModalVisibles(!modalVisibles);
                                    }} style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderTopColor : 'grey',borderTopWidth :1}}>
                    <View style={{width : '10%',height :50,justifyContent : 'center'}}>
                    <FontAwesome name="user-o" size={20} color="#707070" />
                    </View>
                    <View style={{width : '80%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' ,fontWeight :'bold'}}>Other User Accounts</Text>
                    </View>
                    <View style={{width : '10%',height :50,alignItems : 'flex-end',justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="chevron-right" size={25} color="#707070" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderTopColor : 'grey',borderTopWidth :1}}>
                    <View style={{width : '10%',height :50,justifyContent : 'center'}}>
                    <MaterialIcons name="phone-android" size={20} color="#707070" />
                    </View>
                    <View style={{width : '80%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' ,fontWeight :'bold'}}>My Devices <Text style={{ fontSize: 11, color: 'red', paddingLeft :25 }}>(Coming soon*)</Text></Text>
                    </View>
                    <View style={{width : '10%',height :50,alignItems : 'flex-end',justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="chevron-right" size={25} color="#707070" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                                        navigate(Screens.GOAL_DETAILS,{userId : userDetails?.id,parentId : userDetails?.parent})
                                    }} style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderTopColor : 'grey',borderTopWidth :1}}>
                    <View style={{width : '10%',height :50,justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="target" size={20} color="#707070" />
                    </View>
                    <View style={{width : '80%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey',fontWeight :'bold' }}>My Goals</Text>
                    </View>
                    <View style={{width : '10%',height :50,alignItems : 'flex-end',justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="chevron-right" size={25} color="#707070" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                                        navigate(Screens.REMINDER,{userId : userDetails?.id,parentId : userDetails?.parent})
                                    }} style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderTopColor : 'grey',borderTopWidth :1}}>
                    <View style={{width : '10%',height :50,justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="bell-ring-outline" size={20} color="#707070" />
                    </View>
                    <View style={{width : '80%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey',fontWeight :'bold' }}>My Reminders</Text>
                    </View>
                    <View style={{width : '10%',height :50,alignItems : 'flex-end',justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="chevron-right" size={25} color="#707070" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderTopColor : 'grey',borderTopWidth :1}}>
                    <View style={{width : '10%',height :50,justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="whatsapp" size={20} color="#075E54" />
                    </View>
                    <View style={{width : '80%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey',fontWeight :'bold' }}>Request support on Whatsapp</Text>
                    </View>
                    <View style={{width : '10%',height :50,alignItems : 'flex-end',justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="chevron-right" size={25} color="#707070" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                                         props.logout()
                                    }} style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 70,alignSelf : 'center'}}>
                    <View style={{width : '10%',height :70,justifyContent : 'center'}}>
                    <SimpleLineIcons name="logout" size={20} color="#075E54" />
                    </View>
                    <View style={{width : '80%',height :70,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey',fontWeight :'bold' }}>Logout</Text>
                    </View>
                    <View style={{width : '10%',height :70,alignItems : 'flex-end',justifyContent : 'center'}}>
                    <MaterialCommunityIcons name="chevron-right" size={25} color="#707070" />
                    </View>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
               
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibles}
          onRequestClose={() => {
            setModalVisibles(!modalVisibles);
          }}>
          <View style={styles.centeredView}>
          <TouchableOpacity onPress={() => { setModalVisibles(!modalVisibles) }}
              style={styles.cutCon}></TouchableOpacity>
            <View style={styles.modalView}>
              <View style={styles.userCon}>
                <Text style={styles.userTxt}>User List</Text>
              </View>
              <View  style={{width :"90%",alignSelf : 'center',height :1,backgroundColor : 'grey',marginTop :15}}/>
              <FlatList
                    data={userList}
                    style={{width :"95%",alignSelf : 'center'}}
                    renderItem={({ item, intex }) => (
                      <View onPress={() => {
                        callProfileEditScreen(item)
                    }} style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
    <View style={{width : '10%',height :50,justifyContent : 'center'}}>
                  <View style={styles.circleCon}>
                  {(item?.name != undefined && item?.name != null) && ( <Text style={styles.cirTxt}>{item.name.charAt(0)}</Text>)}
                </View>
    </View>
    <View style={{width : '60%',height :50,justifyContent : 'center'}}>
    <Text style={{ fontSize: 14, color: 'grey',fontWeight :'bold' }}>{item.name}</Text>
    </View>
    <TouchableOpacity  onPress={() => {
                        callProfileEditScreen(item)
                    }}  style={{width : '15%',height :50,justifyContent : 'center'}}>
    <MaterialCommunityIcons name="account-edit" size={25} color="#707070" />
    </TouchableOpacity>
    <TouchableOpacity  onPress={() => {
                        setNewUser(item)
                    }} style={{width : '15%',height :50,justifyContent : 'center'}}>
 {selectedUser == item.id &&(  <MaterialCommunityIcons name="radiobox-marked" size={25} color="red" />)}
 {selectedUser != item.id &&(  <MaterialCommunityIcons name="radiobox-blank" size={25} color="#707070" />)}
    </TouchableOpacity>
    </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
              <TouchableOpacity onPress={() => {callProfileDetailsScreen(userDetails?.id)}}>
                <View style={styles.adCon}>
                  <Rplus />
                  <Text style={styles.adTxt}>Add a guest</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

    </SafeAreaView >
  )
}
const mapStateToProps = state => ({
  token: state?.user?.userData?.token,
});
const mapDispatchToProps = (dispatch) => {
 return{
  logout: () => dispatch(Actions.logout()),
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileRedoScreen);
const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',

  },
  TopNav: {
    flex: 1,
    flexGrow: 10,
    maxHeight: DefaultSetting.topNav.maxHeight,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 13
  },
  topnavtext: {
    color: '#707070',
    fontSize: 20,
    paddingLeft :20,
    fontWeight: DefaultSetting.fontWeight.bold
  },
  Body: {
    flex: 1,
    flexGrow: 80,
    backgroundColor: DefaultSetting.body.bg,
  },
  userdetail:{
    flexDirection : 'row',padding :15,  alignItems:'center',
  },
  circleCon: {
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: '#E5184E',
    justifyContent: 'center',
    alignItems: 'center',

  },
  cirTxt: {
    color: '#FFFFFF',
    fontFamily: 'Jost-SemiBold',
    fontSize: 12
  },

 
  userCon: {
    height: height / 20,
    width: width / 1.1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'cyan'

  },
  userTxt: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 16
  },
  propsCon: {
    height: height / 14,
    width: width / 1.1,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#707070'

  },
  onTxt: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 18
  },
  skCon: {
    height: height / 13,
    width: width / 10,
    // backgroundColor: 'red',
    justifyContent: 'center',
    // alignItems: 'flex-end',
    // padding: 10,
  },
  adCon: {
    height: height / 14,
    width: width / 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  adTxt: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 14,
    paddingHorizontal: 10

  },
  cutCon: {
    height: "60%",
    width: "100%",
  },
  centeredView: {
    width: "100%",
    height :"100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection : 'column',
    backgroundColor: '#707070A6',
    justifyContent: 'flex-end'
  },
  modalView: {
    height: "40%",
    width: "100%",
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  smallfitlogo: {
    width: 28,
    height: 28,
    marginTop: 2
  },
  weiTxt: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 14,
    paddingHorizontal: 10
},
hunTxt: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 14,
    
},
svgCon: {
    height: height / 20,
    width: width / 2.8,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center'
},
setCon: {
    height: height / 25,
    width: width / 4.2,
    backgroundColor: '#E5184E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
},
setTxt: {
    color: '#FFFFFF',
    fontFamily: 'Jost-Medium',
    fontSize: 12,
    
},
})