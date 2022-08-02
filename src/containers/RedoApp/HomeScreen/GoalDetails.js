import React, { useState,useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View ,TextInput,FlatList,BackHandler} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');
import Spinner from '../../../components/spinner/Spinner'
import locations from "../../../helpers/locations";
import { connect } from 'react-redux';
import { navigate, resetScreen, Screens } from '../../../helpers/Screens';
import { GETApi, POSTApi } from "../../../app/ApiCall.js";
import moment from 'moment';
function getFormated(item) {
    var  tolal = 0;
    tolal= (Math.round(item * 100) / 100).toFixed(2);;
    return tolal;
  }
function getFormatedCheck(weight){
    if(weight>0){
        return "Gain Weight"
    }else if(weight<0){
        return "Lose Weight"
    }else {
        return "Maintaine Weight"
    }
}
function getFormatedCheck2(weight){
    if(weight>0){
        return "Pace of weight gain"
    }else if(weight<0){
        return "Pace of weight loose"
    }else {
        return "Pace of weight maintiane"
    }
}
function getFormatedCheck3(weight){
    if(weight>0){
        return "Calories to be gained"
    }else if(weight<0){
        return "Calories to be loosed"
    }else {
        return "Calories to be maintianed"
    }
}
export const GoalDetails = (props) => {
    const item = props?.route?.params?.customParam;
    const [parentId, setParentId] = useState(item?.parentId)
    const [userId, setUserId] = useState(item?.userId)
    const [spinnerShow, setSpinnerShow] = useState(true)
    const [userDetails, setUserDetails] = useState('')
    const [protein, setProtein] = useState(0)
    const [fat, setFat] = useState(0)
    const [carbohydrate, setCarbohydrate] = useState(0)
    const [estimateDate, setEstimateDate] = useState(moment(new Date()).format("DD, MMM YYYY"))
  const backAction = () => {
    props.navigation.goBack()
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
   useEffect(() => {
    callApiDetails("/redoapp/get-unique-customer?uc_id="+userId)
    getRecomnededCalery()
    getEstimatedDate()
    const willFocusSubscription = props.navigation.addListener('focus', () => {
        callApiDetails("/redoapp/get-unique-customer?uc_id="+userId)
    getRecomnededCalery()
    getEstimatedDate()
    });
    return willFocusSubscription;
     }, [])
     const getRecomnededCalery= async()=>{
        setSpinnerShow(true)
        var getResult = await GETApi(locations.GET_REC_PRECENT,props?.token)
        if(getResult.error){
         setSpinnerShow(false)
         alert(getResult.message)
        }else {
         setSpinnerShow(false)
        console.log("result : "+JSON.stringify(getResult?.data))
        setProtein(getResult?.data?.protein)
        setFat(getResult?.data?.fat)
        setCarbohydrate(getResult?.data?.carbohydrate)
    
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
    
        }
    }
    const getEstimatedDate= async()=>{
        setSpinnerShow(true)
        var getResult = await GETApi(locations.GET_ESTIMATED_DATE,props?.token)
        if(getResult.error){
         setSpinnerShow(false)
         alert(getResult.message)
        }else {
         setSpinnerShow(false)
         console.log("getResult?.data : "+JSON.stringify(getResult?.data.estimated_date))
         var getCount = parseInt(getResult?.data.estimated_date)
         console.log("getCount : "+getCount)
         var  currentDate = new Date()
         var tomorrow = new Date(currentDate)
         tomorrow.setDate(tomorrow.getDate() + getCount)
         setEstimateDate(tomorrow)
        }
    } 
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
            <Spinner visible={spinnerShow}></Spinner>
                <View style={styles.secCon}>
                    <View style={styles.arrowCon}>
                        <MaterialCommunityIcons
                            onPress={(e) => {props.navigation.goBack() }}
                            style={{ fontSize: 24, color: '#707070' }}
                            name="arrow-left"
                        />
                    </View>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>My Goals</Text>
                    </View>
                    <TouchableOpacity  onPress={(e) => {
                     if(parentId == null){
                        navigate(Screens.SETSELECTGOALS)
                      }else {
                        navigate(Screens.SETSELECTGOALSCHILD,{userId  : userDetails?.id,parentId : userDetails?.parent})
                      }
                      }} style={{width :100 ,height : 60,alignItems : 'center',justifyContent : 'center'}}>
                        <Text style={styles.txtHead2}>Edit Goals</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView >
                <View style={{flexDirection : 'column',paddingBottom:200}}>
                <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>My Goals</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{getFormatedCheck(userDetails?.weight_loss_target)}</Text>
                    </View>
                    </View>
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>Target date</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{moment(estimateDate).format('DD, MMM YYYY')}</Text>
                    </View>
                    </View>
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>Target weight</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{ userDetails?.weight_target} kg</Text>
                    </View>
                    </View>
                    
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{getFormatedCheck2(userDetails?.weight_loss_target)}</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{userDetails?.weight_loss_target} kg/week</Text>
                    </View>
                    </View>
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{getFormatedCheck3(userDetails?.weight_loss_target)}</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{(userDetails?.weight_loss_target*1000)} cal/day</Text>
                    </View>
                    </View>
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>Calorie intake</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{getFormated(userDetails?.daily_target)} cal/day</Text>
                    </View>
                    </View>
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>Protein</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{protein}%</Text>
                    </View>
                    </View>
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>Fat</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{fat}%</Text>
                    </View>
                    </View>
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>Carbohydrates</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{carbohydrate}%</Text>
                    </View>
                    </View>
                    <View  style={{flexDirection : 'row',alignItems : 'center',width :"90%",height : 50,alignSelf : 'center',borderBottomColor : 'grey',borderBottomWidth :1}}>
                    <View style={{width : '50%',height :50,justifyContent : 'center'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>Steps goal</Text>
                    </View>
                    <View style={{width : '50%',height :50,justifyContent : 'center',alignItems : 'flex-end'}}>
                    <Text style={{ fontSize: 14, color: 'grey' }}>{userDetails?.manual_steps} steps</Text>
                    </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    token: state.user.userData?.token,
  });
  
  const mapDispatchToProps = dispatch => {
      return{}
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(GoalDetails);

const styles = StyleSheet.create({
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF',
    },

    secCon: {
        height: height / 13,
        width: width / 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        // backgroundColor: 'green',
        alignItems: 'center'
    },
    arrowCon: {
        height: height / 13,
        width: width / 7,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
    },
    headCon: {
        height: height / 13,
        width: width / 1.8,
        // backgroundColor: 'blue',
        justifyContent: 'center',
    },
    txtHead: {
        color: '#707070',
        fontSize: 20,
        fontFamily: 'Jost-Medium',
    },
    txtHead2: {
        color: '#47CACC',
        fontSize: 20,
        fontFamily: 'Jost-Medium',
    },
   
})
