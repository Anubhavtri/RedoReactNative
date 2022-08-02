import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, BackHandler, Dimensions, Modal, Image ,FlatList} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Rcross from '../../../staticData/svg/Rcross.svg'
import Rcrossb from '../../../staticData/svg/Rcrossb.svg'
import Rplus from '../../../staticData/svg/Rplus.svg'
import Rwalking from '../../../staticData/svg/Rwalking.svg'
import Rweight from '../../../staticData/svg/Rweight.svg'
import Rkcal from '../../../staticData/svg/Rkcal.svg'
import Dinner from '../../../staticData/svg/Dinner.svg'
import { connect } from 'react-redux';
import locations from "../../../helpers/locations";
import moment from 'moment';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { navigate, resetScreen, Screens } from '../../../helpers/Screens';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { height, width } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';
import { GETApi } from "../../../app/ApiCall.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
function getCalculateCalries(itemArray) {
  var  total = 0;
  if(itemArray !=undefined){
    for (let i=0; i<itemArray.length; i++){
      total = total+ itemArray[i].calories_float
  }
  }
  var totalAll = 0
  totalAll= (Math.round(total * 100) / 100).toFixed(2);;
  return totalAll;
}
function getFormated(item) {
  var  tolal = 0;
  if(item != undefined){
    tolal= (Math.round(item * 100) / 100).toFixed(2);;
  }else {
    tolal= (Math.round(0 * 100) / 100).toFixed(2);;
  }
  return tolal;
}
const HomeRedoScreen = (props) => {
  const [modalVisibles, setModalVisibles] = useState(false);
  var [dailySteps, setdailySteps] = useState(0);
  var [calories, setCalories] = useState(0);
  const [isGFitActive, setisGFitActive] = useState(false)
  const [userDetails, setUserDetails] = useState('')
  const [gfit, setgfit] = useState(false)
  const [spinnerShow, setSpinnerShow] = useState(false)
  const [allList, setAllList] = useState([])
  const [userList, setUserList] = useState([])
  const [selectedUser, setSelectedUser] = useState('')
  const [parentId, setParentId] = useState(null)
  useEffect(() => {
    signinWithGFit()
    getItemFromStorage()
    callApiUserList("redoapp/get-unique-users-child/")
    // getNutritionList()
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
             getNutritionList(result)
           }else{
            callApiDetails("/redoapp/get-unique-customer")
            getNutritionList("")
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
   //  setdailySteps(getResult?.data?.manual_steps)
     setCalories(getResult?.data?.cal)
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
   console.log("user list : "+JSON.stringify(getResult.data))
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
  const signinWithGFit = async () => {
    GoogleFit.authorize(options)
    .then(authResult => {
      if (authResult.success) {
        console.log('AUTH_SUCCESS', authResult);
        googleFitSteps();
        googleCalries();
        setisGFitActive(true)
      } else {
        console.log('AUTH_DENIED ' + authResult.message);
        setisGFitActive(false)
      }
    })
    .catch(() => {
    });
  }

  const googleFitSteps = async() => {
    let today = new Date();
    console.log('today', today);
    await GoogleFit.getDailySteps(today.toISOString()).then(res => {
      console.log("res :" , res)
     if (res.length !== 0) {
       for (var i = 0; i < res.length; i++) {
         if (res[i].source === 'com.google.android.gms:estimated_steps') {
           // console.log('Daily steps### >>>0 ', res[i])
           let data = res[i].steps.reverse();
           // console.log(data, "FIRST DATA")
           // let dailyStepCount = res[i].steps;
           // console.log(dailyStepCount, "DAILY STEP COUNT")
           setdailySteps(data[0].value);
           setdailySteps(data.length ? data[0].value : 0)
           // console.log('SET DAILY STEPS', data[0].value);
         }
       }
     } else {
       console.log('Not Found');
     }
   })
    .then((result) => {
        if (result) {
            console.log('DAYIL STEP RESULT ANDROID:', result[0]);
            setdailySteps(result[0].steps.length ? result[0].steps[0].value : 0)
        }

    }).catch((error) => {
        console.log('daily step count error', error);
        Alert.alert('daily step android failed', error.toString());
    })
  }
  const googleCalries = async() => {
    let today = new Date();
    console.log('today', today);
    await GoogleFit.getDailyCalorieSamples(today.toISOString()).then((result) => {
      console.log(result);
      console.log("cal "+result[0].calorie);
      setCalories(result.length ? result[0].calorie : 0)
    });
  }

  const GoogleSign = () => {
    if (!isGFitActive) {
      navigate(Screens.CONNECT_GOOGLE_FIT)
    }
    else {
      if(userDetails?.weight_target == undefined || userDetails?.weight_target == 0){
        navigate(Screens.STEPS_TRACKER,{showStatus: true})
      }else {
        navigate(Screens.STEPS_TRACKER,{showStatus: false})
      }
    }
  }
  const GoogleSign2 = () => {
    console.log("GoogleSign2 : "+isGFitActive)
    if (!isGFitActive) {
      navigate(Screens.CONNECT_GOOGLE_FIT)
    }
    else {
      navigate(Screens.CAL_TRACKER)
    }
  }
  const backAction = () => {
    resetScreen(Screens.TAB)
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  const getNutritionList = async(userId) => {
    setSpinnerShow(true)
    var getResult = await GETApi(locations.GET_FOOD+ moment(new Date()).format('YYYY-MM-DD')+"&uc_id="+userId,props?.token)
    if(getResult.error){
     setSpinnerShow(false)
     alert(getResult.message)
    }else {
     setSpinnerShow(false)
  
      setAllList(getResult?.data?.results)
    }
    
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
  getNutritionList(item.id)
  console.log("item.id : "+item.id)
  console.log("item.parentId : "+item.parent)
  await AsyncStorage.setItem("userId",item.id+"")
  await AsyncStorage.setItem("parentId",item.parent+"")
}
  return (
    
    <SafeAreaView>
      <View style={styles.mainContainer}>
      <Spinner visible={spinnerShow}></Spinner>
        <View style={styles.secCon}>
          <View style={styles.arrowCon}>
            <View style={styles.circleCon}>
             {(userDetails?.name != undefined && userDetails?.name != null) && ( <Text style={styles.cirTxt}>{ userDetails?.name.charAt(0)}</Text>)}
            </View>
          </View>
          <View style={styles.headCons}>
            <View style={styles.headCon}>
              <Text style={styles.txtHead} numberOfLines={1}>{userDetails?.name}</Text>
            </View>
            <View style={styles.arrowCons}>
              <Rplus onPress={() => { setModalVisibles(!modalVisibles) }} />
            </View>
          </View>
          <View style={styles.croCon}>
            <Rcrossb onPress={() => resetScreen(Screens.TAB)} />
          </View>
        </View>
        {!isGFitActive ?
           <View style={styles.gapCon}>
              <View style={styles.boxCon}>
                <View style={styles.flexCon}>
                  <View style={styles.cirCon}>
                    <TouchableOpacity style={styles.blankCon}>
                      <Image style={styles.smallfitlogo} onPress={() => navigate(Screens.CONNECT_GOOGLE_FIT)}
                        source={require('../../../staticData/assests/google-fiticon.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.fitCon} onPress={() => navigate(Screens.CONNECT_GOOGLE_FIT)}>
                    <Text style={styles.gTxt}>Activate Google Fit</Text>
                  </TouchableOpacity>
                  <View style={styles.crosCon}>
                    <Rcross
                     onPress={() => setisGFitActive(true)}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.disCon} onPress={() => navigate(Screens.CONNECT_GOOGLE_FIT)}>
                  <Text style={styles.disTxt}>Tap here to sync data such as steps and calories from your google fit account</Text>
                </TouchableOpacity>
              </View>
            </View>
        
          : <View />}
        <View style={styles.gapCons}>
          <View style={styles.boxCons}>
            <View style={styles.flexCon}>
              <View style={styles.cirCon}>
                <Entypo
                  name='menu'
                  style={{ fontSize: 20, color: '#707070' }}
                />
              </View>
              <View style={styles.fitCon}>
                <Text style={styles.gTxt}>Daily Activity</Text>
              </View>
            </View>
            <View style={styles.flCon}>
              <View style={styles.stepCon}>
                <View style={styles.walkCon}>
                  <Rwalking onPress={() => GoogleSign()
                  } />
                </View>
                {!isGFitActive ?
                  <Fontisto
                    name='minus-a'
                    style={{ color: '#707070', fontSize: 20 }}
                  />
                  :
                  <Text style={styles.disTxt}>{dailySteps}</Text>}
                <Text style={styles.disTxt}>Steps</Text>
              </View>
              <View style={styles.stepCons}>
                <View style={styles.walkCon}>
                  <Rkcal onPress={() => GoogleSign2()
                  }/>
                </View>
                {!isGFitActive ?
                  <Fontisto
                    name='minus-a'
                    style={{ color: '#707070', fontSize: 20 }}
                  /> :
                  <Text style={styles.disTxt}>{getFormated(calories)}</Text>}
                <Text style={styles.disTxt}>Kcal burnt</Text>
              </View>
            </View>
            <View style={{flexDirection : 'column',}}>
            <TouchableOpacity onPress={() => navigate(Screens.ADD_WEIGHT,{userId  : userDetails?.id,parentId : userDetails?.parent})} style={{position : 'absolute',right :10,top :10}}>
            <AntDesign   name='plus'
                                    style={{ color: '#E5184E', fontSize: 22, paddingHorizontal: 10 }}
                                />
            </TouchableOpacity> 
            <View style={styles.weightCon}>
                            <View style={styles.svgCon}>
                                <Rweight />
                                <Text style={styles.weiTxt}>Weight</Text>
                            </View>

                            <View style={styles.svgCon}>
                            {userDetails?.last_weight?.last_weight != undefined &&(   <Text style={styles.disTxt}>{moment(new Date(userDetails?.last_weight?.date)).format("DD, MMM HH:mm A")}</Text>)}
                               
                            </View>
                        </View>
                        
                        <View style={styles.weightCon1}>
                            <Text style={styles.hunTxt}>{userDetails?.last_weight?.last_weight}/{userDetails?.weight_target} Kg(s)</Text>
                               {(userDetails?.weight_target == undefined || userDetails?.weight_target == 0) &&(
                                 <TouchableOpacity  onPress={() => {
                                if(parentId == null){
                                  navigate(Screens.SETSELECTGOALS)
                                }else {
                                  navigate(Screens.SETSELECTGOALSCHILD,{userId  : userDetails?.id,parentId : userDetails?.parent})
                                }
                               }} style={styles.setCon}>
                                    <Text style={styles.setTxt}>Set goals</Text>
                                </TouchableOpacity>)}
                              
                        </View>
                        </View>
          </View>
         
        </View>
        <View style={styles.gapCons}>
          <View style={styles.boxCons}>
            <View style={styles.flexCon}>
              <View style={styles.cirCon}>
                <Entypo
                  name='menu'
                  style={{ fontSize: 20, color: '#707070' }}
                />
              </View>
              <View style={styles.fitCon}>
                <Text style={styles.gTxt}>Nutrition</Text>
              </View>
            </View>
            <View style={{flexDirection : 'column',}}>
            <TouchableOpacity onPress={() => navigate(Screens.ADDNUTRITION,{userId :selectedUser})} style={{position : 'absolute',right :10,top :10}}>
            <AntDesign   name='plus'
                                    style={{ color: '#E5184E', fontSize: 22, paddingHorizontal: 10 }}
                                />
            </TouchableOpacity> 
            <View style={styles.weightCon}>
                            <View style={styles.svgCon}>
                                <Dinner />
                                <Text style={styles.weiTxt}>Food</Text>
                            </View>
                        </View>
                        
                        <View style={styles.weightCon1}>
                            <Text style={styles.hunTxt}>{getCalculateCalries(allList)}/{getFormated(userDetails?.daily_target)} cal</Text>
                             {(userDetails?.weight_target == undefined|| userDetails?.weight_target == 0) &&( <TouchableOpacity  onPress={() => {
                                 if(parentId == null){
                                  navigate(Screens.SETSELECTGOALS)
                                }else {
                                  navigate(Screens.SETSELECTGOALSCHILD,{userId  : userDetails?.id,parentId : userDetails?.parent})
                                }
                               }} style={styles.setCon}>
                                    <Text style={styles.setTxt}>Set goals</Text>
                                </TouchableOpacity>)}
                        </View>
                        </View>
          </View>
         
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
   
 }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeRedoScreen);
const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',

  },
  secCon: {
    height: height / 13,
    width: width / 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    // backgroundColor: 'green'
  },
  arrowCon: {
    height: height / 13,
    width: width / 7,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // padding: 10,
  },
  arrowCons: {
    height: height / 13,
    width: width / 7,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headCon: {
    height: height / 13,
    // width: width / 3.5,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    // alignItems: '',
  },
  headCons: {
    height: height / 13,
    width: width / 1.4,
    // backgroundColor: 'blue',
    flexDirection: 'row'
  },
  txtHead: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    paddingHorizontal: 10,
    fontSize: 20
  },
  circleCon: {
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: '#E5184E',
    justifyContent: 'center',
    alignItems: 'center',

  },
  weightCon: {
    height: height / 20,
    marginTop :25,
    width: width / 1.25,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between'
},
weightCon1: {
  height: height / 20,
  width: width / 1.25,
  // backgroundColor: 'cyan',
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'space-between'
},
  blankCon: {
    height: 30,
    width: 30,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#707070'

  },
  cirTxt: {
    color: '#FFFFFF',
    fontFamily: 'Jost-SemiBold',
    fontSize: 12
  },
  croCon: {
    height: height / 13,
    width: width / 20,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  gapCon: {
    height: height / 7.5,
    width: width / 1,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center'
  },
  boxCon: {
    height: height / 9,
    width: width / 1.15,
    // backgroundColor: 'lightblue',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#707070'
  },
  flexCon: {

    height: height / 20,
    width: width / 1.15,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    // alignItems: 'flex-end'
  },
  cirCon: {
    height: height / 18,
    width: width / 7,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fitCon: {

    height: height / 18,
    width: width / 1.55,
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
  crosCon: {
    height: height / 25,
    width: width / 15,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gTxt: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 16
  },
  disCon: {

    height: height / 20,
    width: width / 1.38,
    // backgroundColor: 'blue',
    // justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  disTxt: {
    color: '#707070',
    fontFamily: 'Jost-Regular',
    fontSize: 14
  },
  gapCons: {
    width: width / 1,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center'
  },
  boxCons: {
    width: width / 1.15,
    marginTop : 20,
    // backgroundColor: 'lightblue',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#707070'
  },
  flCon: {
    height: height / 9,
    width: width / 1.25,
    // backgroundColor: 'yellow',
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#707070',
    flexDirection: 'row',
    // alignItems: 'center'
  },
  stepCon: {
    height: height / 10,
    width: width / 2.5,
    // backgroundColor: 'pink',
    borderRightWidth: 0.5,
    borderColor: '#707070',
    alignItems: 'center'
  },
  stepCons: {
    height: height / 10,
    width: width / 2.5,
    alignItems: 'center'
  },
  walkCon: {
    height: height / 20,
    width: width / 2.5,
    // backgroundColor: 'red',
    alignItems: 'center'
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