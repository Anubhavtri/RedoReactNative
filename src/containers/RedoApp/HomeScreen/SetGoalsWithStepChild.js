import React, { useState,useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View ,TextInput,FlatList,BackHandler} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');
import { ProgressBar, Colors} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import locations from "../../../helpers/locations";
import Step from '../../../staticData/svg/Step.svg'
import { connect } from 'react-redux';
import { resetScreen, Screens,navigate } from "../../../helpers/Screens";
import { GETApi, POSTApi, PUTApi } from "../../../app/ApiCall.js";
import Rwalking from '../../../staticData/svg/Rwalking.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
function getFormated(item) {
    var  tolal = 0;
    tolal= (Math.round(item * 100) / 100).toFixed(2);;
    return tolal;
  }
  function checkHealthCondition(getArray,typeGet){
    let index = getArray.indexOf(typeGet);
    return index;
} 
function getArrayData(minValue,maxValue){
    var newArrayWeight =[]
    for(let i=minValue; i<=maxValue; i= i+1){
        newArrayWeight.push({
            name : i,
            select: false,
        })
    }
    return newArrayWeight;
} 
export const SetGoalsWithStepChild = (props) => {
    const item = props?.route?.params?.customParam;
    const [parentId, setParentId] = useState(item?.parentId)
    const [userId, setUserId] = useState(item?.userId)
    const [userDetails, setUserDetails] = useState('')
    const [weight, setWeight] = useState(0)
    const [spinnerShow, setSpinnerShow] = useState(false)
    const [stepLevel, setStepLevel] = useState('one')
    const [activityLevel, setActivityLevel] = useState(0)
    const [healthConditions, sethealthConditions] = useState([])
    const [otherHealth, setotherHealth] = useState('')
    const [type, setType] = useState('')
    const [progressLevel, setProgressLevel] = useState(0)
    const [dailyStep, setDailyStep] = useState(7000)
    const [kg, setkg] = useState(false)
    const [lbs, setlbs] = useState(false)
    const [goalWeight, setGoalWeight] = useState('0.50Kg')
    const [goalCal, setGoalCal] = useState('500 cal/day')
    const [goalWeight2, setGoalWeight2] = useState(0.5)
    const [arrayData, setArrayData] = useState([])
    const [arrayDataWeight, setArrayDataWeight] = useState([])
    const [arrayDataWeightCurrent, setArrayDataWeightCurrent] = useState([])
    const [recWeightMin, setRecWeightMin] = useState('')
    const [recWeightMax, setRecWeightMax] = useState('')
    const [protein, setProtein] = useState(0)
    const [fat, setFat] = useState(0)
   
    const [carbohydrate, setCarbohydrate] = useState(0)
    const [estimateDate, setEstimateDate] = useState(moment(new Date()).format("DD-MMM-YY"))
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
         setArrayDataWeightCurrent(getArrayData(30,150))
    var newArrayWeight =[]
    for(let i=40; i<=80; i= i+1){
        newArrayWeight.push({
            name : i,
            select: false,
        })
    }

    setArrayDataWeight(newArrayWeight)
        var newArray =[]
        newArray.push({
            name : "0.25Kg",
            value : 0.25,
            value2 : "250 cal/day",
            select: false,
        })
        newArray.push({
            name : "0.50Kg",
            value2 : "500 cal/day",
            value : 0.5,
            select: true,
        })
        newArray.push({
            name : "0.75Kg",
            value2 : "750 cal/day",
            value : 0.75,
            select: true,
        })
        newArray.push({
            name : "1.0Kg",
            value2 : "1000 cal/day",
            value : 1.0,
            select: false,
        })
        setArrayData(newArray)
    }, [])
    const callApiDetails = async(url)=>{
        setSpinnerShow(true)
        var getResult = await GETApi(url,props?.token)
        if(getResult.error){
         setSpinnerShow(false)
         alert(getResult.message)
        }else {
         setSpinnerShow(false)
         setUserDetails(getResult.data)
         setWeight(getResult?.data.last_weight?.last_weight)
        }
    }
    const setUserGoal = async () => {
        if (weight == null || weight == '') {
          alert('Select your weight');
        }else {
            
              setSpinnerShow(true)
              var getResult = ""
                const body = {
                    weight: parseFloat(weight),
                  };
                getResult = await PUTApi("/redoapp/unique-user/"+userId+"/",body,props?.token)
              
              if(getResult.error){
               setSpinnerShow(false)
               alert(getResult.message)
              }else {
               setSpinnerShow(false)
               setUserDetails(getResult.data)
               setWeight(getResult?.data.last_weight?.last_weight)
               if(type == 'Maintain Weight'){
                props.navigation.goBack()
               }else{
                changeStepLevel(true)
               }
              }
        }
      }
      
      const setUserGainLoseGoal = async () => {
        if (weight == null || weight == '') {
            alert('Select your weight');
          }else {
             
                setSpinnerShow(true)
                var getResult = ""
            
                    const body = {
                        weight_target: parseFloat(weight),
                        parent : parentId,
                        };
                        getResult = await PUTApi("/redoapp/unique-user/"+userId+"/",body,props?.token)
            
                if(getResult.error){
                 setSpinnerShow(false)
                 alert(getResult.message)
                }else {
                 setSpinnerShow(false)
                 setUserDetails(getResult.data)
                 changeStepLevel(true)
                }
          }
      }
      const getRecomnededCalery= async()=>{
          setSpinnerShow(true)
          var getResult = await GETApi(locations.GET_REC_PRECENT,props?.token)
          if(getResult.error){
           setSpinnerShow(false)
           alert(getResult.message)
          }else {
           setSpinnerShow(false)
          console.log("result : "+getResult?.data)
          setDailyStep(userDetails?.daily_target_steps)
          setProtein(getResult?.data?.protein)
          setFat(getResult?.data?.fat)
          setCarbohydrate(getResult?.data?.carbohydrate)
          }
      } 
    const  setNewWeight =(name,value,calName)=>{
        setGoalWeight(name)
        setGoalCal(calName)
        if(value == 1){
            setGoalWeight2((value.toFixed(1)))
        }else{
            setGoalWeight2(value)
        }
       
      }
      const setUserGoalWeight = async() => {
            const body = {
                weight_loss_target: goalWeight2,
              };
                setSpinnerShow(true)
                var getResult = ""
    
                getResult = await PUTApi("/redoapp/unique-user/"+userId+"/",body,props?.token)
                if(getResult.error){
                 setSpinnerShow(false)
                 alert(getResult.message)
                }else {
                 setSpinnerShow(false)
                 setUserDetails(getResult.data)
                 changeStepLevel(true)
                }
      }
      const setUserActivityLevel = async() => {
          const body = {
            activity_level: activityLevel,
            };
            setSpinnerShow(true)
            var getResult = ""
            getResult = await PUTApi("/redoapp/unique-user/"+userId+"/",body,props?.token)
                if(getResult.error){
                 setSpinnerShow(false)
                 alert(getResult.message)
                }else {
                 setSpinnerShow(false)
                 setUserDetails(getResult.data)
                 changeStepLevel(true)
                }
    }
    const setUserHealthConditions = async() => {
        var health_conditions1 = []
        if(healthConditions.indexOf('Others') != -1){
            health_conditions1= healthConditions
            health_conditions1.push(otherHealth)
        }else {
            health_conditions1= healthConditions
        }
        var newString = ''
        for(let i=0; i<health_conditions1.length; i++){
            newString = newString + ","+health_conditions1[i]
        }
        const body = {
            health_conditions: newString
          };

          setSpinnerShow(true)
          var getResult = ""
          getResult = await PUTApi("/redoapp/unique-user/"+userId+"/",body,props?.token)
          if(getResult.error){
           setSpinnerShow(false)
           alert(getResult.message)
          }else {
           setSpinnerShow(false)
           setUserDetails(getResult.data)
           changeStepLevel(true)
           getRecomnededCalery()
           getEstimatedDate()
          }
        
  }
  const setFinalGoal = async() => {
    const body = {
        manual_steps: dailyStep,
      };
      setSpinnerShow(true)
      var getResult = ""
      getResult = await PUTApi("/redoapp/unique-user/"+userId+"/",body,props?.token)
      if(getResult.error){
       setSpinnerShow(false)
       alert(getResult.message)
      }else {
       setSpinnerShow(false)
       props.navigation.goBack()
      }
    
}
      const changeStepLevel = (changeStatus)=>{

          if(changeStatus){
              if(stepLevel == 'one'){
                  setStepLevel("two")
                  setProgressLevel(.20)
              }else if(stepLevel == 'two'){
                setStepLevel("three")
                setProgressLevel(.40)
              }else if(stepLevel == 'three'){
                setStepLevel("four")
                setProgressLevel(.60)
              }else if(stepLevel == 'four'){
                setStepLevel("five")
                setProgressLevel(.80)
              }else if(stepLevel == 'five'){
                setStepLevel("six")
                setProgressLevel(.90)
              }else if(stepLevel == 'six'){
                setStepLevel("seven")
                setProgressLevel(.90)
              }else if(stepLevel == 'seven'){
                setStepLevel("eight")
                setProgressLevel(1)
              }
          }else {
            if(stepLevel == 'one'){
                props.navigation.goBack()
            }else if(stepLevel == 'two'){
              setStepLevel("one")
               setProgressLevel(0)
            }else if(stepLevel == 'three'){
              setStepLevel("two")
              setProgressLevel(.20)
            }else if(stepLevel == 'four'){
              setStepLevel("three")
              setProgressLevel(.40)
            }else if(stepLevel == 'five'){
                setStepLevel("four")
                setProgressLevel(.60)
            }else if(stepLevel == 'six'){
                setStepLevel("five")
                setProgressLevel(.80)
            }else if(stepLevel == 'seven'){
                setStepLevel("six")
                setProgressLevel(.90)
            }else if(stepLevel == 'eight'){
                setStepLevel("seven")
                setProgressLevel(1)
            }

        }
      }
      const  setTypeAndKgs = (type)=>{
        setlbs(false)
        setkg(true)
        setType(type)
      }
      const checkHealthCandition = ()=>{
        if(healthConditions.length == 0){
            alert('Select your health condition');
        }else if(healthConditions.indexOf('Others') != -1 && otherHealth == ''){
            alert('enter your health condition');
        }else {
            setUserHealthConditions()
        }
      }
      const setYourDailySteps=(statusGet)=>{
          if(statusGet){
              var ddailyStep = dailyStep + 50
              setDailyStep(ddailyStep)
          }else {
            var ddailyStep = dailyStep - 50
              if(dailyStep<50){
                 ddailyStep = 0
              }else {
                ddailyStep = dailyStep - 50
              }
            setDailyStep(ddailyStep)
          }
      }
      const getRecomneded= async()=>{
        changeStepLevel(true)
          setSpinnerShow(true)
          var getResult = await GETApi(locations.GET_REC_WEIGHT+"height="+userDetails?.height+"&weight="+userDetails?.last_weight?.last_weight,props?.token)
          if(getResult.error){
           setSpinnerShow(false)
           alert(getResult.message)
          }else {
           setSpinnerShow(false)
           setRecWeightMin(getResult.data.weight_range[0])
        setRecWeightMax(getResult.data.weight_range[1])
         var minValue = 0
         var maxValue =0
         if(type == 'Lose Weight'){
            minValue = 30
            maxValue = parseInt(userDetails?.last_weight?.last_weight )
         }else {
            minValue =  parseInt(userDetails?.last_weight?.last_weight )
            maxValue = 200
         }
        console.log("minValue : "+minValue)
         console.log("maxValue : "+maxValue)
        setArrayDataWeight(getArrayData(minValue,maxValue))
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
    const updateHealthCondition = (typeGet)=>{
        let index = healthConditions.indexOf(typeGet);
        var newArray = [...healthConditions]
        if(index == -1){
            newArray.push(typeGet)
        }else {
            newArray.pop(typeGet)
        }
        sethealthConditions(newArray)
    } 
    
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
             <Spinner visible={spinnerShow}></Spinner>
                <View style={styles.secCon}>
                    <View style={styles.arrowCon}>
                        <MaterialCommunityIcons
                            onPress={(e) => { changeStepLevel(false) }}
                            style={{ fontSize: 24, color: '#707070' }}
                            name="arrow-left"
                        />
                    </View>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>Set Goals</Text>
                    </View>
                   
                </View>
                <ScrollView >
                <View style={{flexDirection : 'column'}}>
                
                {stepLevel == 'one'&& (<View style={{flexDirection : 'column'}}>
                <View style={styles.imgCon}>
                    <Step height='125' />
                </View>
                <View style={styles.textCon}>
                    <Text style={styles.hiTxt}>Hi {userDetails?.name}, let's set you up for success</Text>
                </View>
                <View style={styles.detailCon}>
                    <Text style={styles.detailTxt}>Goal targeting ensures that you are aware of how much progress you have made and how much is left to achieve!</Text>
                </View>
                <View style={styles.spaceCon}>
                    <TouchableOpacity onPress={() => { changeStepLevel(true) }}
                        style={styles.btnCon}>
                        <Text style={styles.btnTxt}>Start Setting Goals</Text>
                    </TouchableOpacity>
                </View>
                </View>)}
                {stepLevel == 'two'&& (<View style={{flexDirection : 'column'}}>
               
                <View style={{flexDirection : 'column',width :"80%",marginLeft :25,marginTop :20}}>
                     <ProgressBar style={{height :7,borderRadius :5}} progress={progressLevel} color={Colors.red800} />
                              
                </View>
                <View style={styles.queCon}>
                    <Text style={styles.queTxt}>What Are You Trying To Achieve</Text>
                </View>
                <View style={styles.bxSpace}>
                    <TouchableOpacity style={type == 'Maintain Weight'? styles.bxCons:styles.bxCon} onPress={() => {setTypeAndKgs( "Maintain Weight") }}>
                        <Text style={type == 'Maintain Weight'? styles.bxTxts:styles.bxTxt} >Maintain Weight</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bxSpace}>
                    <TouchableOpacity style={type == 'Lose Weight'? styles.bxCons:styles.bxCon} onPress={() => {setTypeAndKgs( "Lose Weight") }}>
                        <Text style={type == 'Lose Weight'? styles.bxTxts:styles.bxTxt}>Lose Weight</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bxSpace}>
                    <TouchableOpacity style={type == 'Gain Weight'? styles.bxCons:styles.bxCon} onPress={() => {setTypeAndKgs( "Gain Weight") }}>
                        <Text style={type == 'Gain Weight'? styles.bxTxts:styles.bxTxt}>Gain Weight</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.spaceCon2}>
                    <TouchableOpacity style={styles.btnCon} onPress={() => { type == ''? alert('Select your weight') :  getRecomneded() }}>
                        <Text style={styles.btnTxt}>Next</Text>
                    </TouchableOpacity>
                </View>
                </View>)}
                {stepLevel == 'three'&& (<View style={{flexDirection : 'column'}}>
                <View style={{flexDirection : 'column',width :"80%",marginLeft :25,marginTop :20}}>
                     <ProgressBar style={{height :7,borderRadius :5}} progress={progressLevel} color={Colors.red800} />
                              
                </View>
                <View style={styles.queCon}>
                    <Text style={styles.queTxt}>What Is Your Current Weight?</Text>
                </View>
                <View style={styles.heightCon}>
                    <View style={styles.smallCon}>
                        <TouchableOpacity onPress={() => {
                            setlbs(false)
                            setkg(true)
                        }}
                            style={kg ? styles.smallCot : styles.smallCons}>
                            <Text style={kg ? styles.ftTxts : styles.ftTxt}>kgs</Text>
                        </TouchableOpacity>
                        <View style={lbs ? styles.smallConses : styles.smallConse}>
                            <TouchableOpacity onPress={() => {
                                setkg(false)
                                setlbs(true)
                            }}>
                                <Text style={lbs ? styles.ftTxts : styles.ftTxt}>lbs</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={arrayDataWeightCurrent}
                    style={{marginTop :20,width :"90%",alignSelf : 'center'}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity onPress={() => { setWeight(item.name) }} style={{flexDirection : 'column',width : 50,height :50,paddingLeft :20,justifyContent : 'center'}}>
                        <Text style={item.name == weight? styles.weightTxt2 : styles.weightTxt1 }>{item.name}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                <View style={styles.spaceCon3}>
                <TouchableOpacity style={styles.btnCon} onPress={() => {setUserGoal()}}>
                        <Text style={styles.btnTxt}>Next</Text>
                    </TouchableOpacity>
                </View>
                </View>)}
                {(stepLevel == 'four'&& (type == 'Lose Weight' || type == 'Gain Weight') )&& (<View style={{flexDirection : 'column'}}>
                <View style={{flexDirection : 'column',width :"80%",marginLeft :25,marginTop :20}}>
                     <ProgressBar style={{height :7,borderRadius :5}} progress={progressLevel} color={Colors.red800} />
                              
                </View>
                <View style={styles.queCon}>
                    <Text style={styles.queTxt}>What Are You Trying To Achieve</Text>
                </View>
                <View style={styles.heightCon}>
                    <View style={styles.smallCon}>
                        <TouchableOpacity onPress={() => {
                            setlbs(false)
                            setkg(true)
                        }}
                            style={kg ? styles.smallCot : styles.smallCons}>
                            <Text style={kg ? styles.ftTxts : styles.ftTxt}>kgs</Text>
                        </TouchableOpacity>
                        <View style={lbs ? styles.smallConses : styles.smallConse}>
                            <TouchableOpacity onPress={() => {
                                setkg(false)
                                setlbs(true)
                            }}>
                                <Text style={lbs ? styles.ftTxts : styles.ftTxt}>lbs</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={arrayDataWeight}
                    style={{marginTop :20,width :"90%",alignSelf : 'center'}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity onPress={() => { setWeight(item.name) }} style={{flexDirection : 'column',width : 50,height :50,paddingLeft :20,justifyContent : 'center'}}>
                        <Text style={item.name == weight? styles.weightTxt2 : styles.weightTxt1 }>{item.name}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                <View style={{flexDirection : 'column',width : "40%",alignItems : 'center',marginTop :10,alignSelf :'center'}}>
                    <Text style={{ color: '#3AAA41',  fontSize: 13, fontFamily: 'Jost-Medium',textAlign : 'center'}}>Recommended weight goal is between {getFormated(recWeightMin)} kg - {getFormated(recWeightMax)} kg</Text>
                </View>
                <View style={styles.spaceCon3}>
                <TouchableOpacity style={styles.btnCon} onPress={() => {setUserGainLoseGoal()}}>
                        <Text style={styles.btnTxt}>Next</Text>
                    </TouchableOpacity>
                </View>
                </View>)}
                {(stepLevel == 'five'&& (type == 'Lose Weight' || type == 'Gain Weight') )&& (<View style={{flexDirection : 'column'}}>
                <View style={{flexDirection : 'column',width :"80%",marginLeft :25,marginTop :20}}>
                     <ProgressBar style={{height :7,borderRadius :5}} progress={progressLevel} color={Colors.red800} />
                              
                </View>
                <View style={styles.queCon}>
                {type == 'Lose Weight' && (<Text style={styles.queTxt}>How Much Weight Do You Plan To Lose In A Week?</Text>)}
                {type == 'Gain Weight' && (<Text style={styles.queTxt}>How Much Weight Do You Plan To Gain In A Week?</Text>)}
                </View>
                <View style={styles.heightCon}>
                    <View style={styles.smallCon}>
                        <TouchableOpacity onPress={() => {
                            setlbs(false)
                            setkg(true)
                        }}
                            style={kg ? styles.smallCot : styles.smallCons}>
                            <Text style={kg ? styles.ftTxts : styles.ftTxt}>kgs</Text>
                        </TouchableOpacity>
                        <View style={lbs ? styles.smallConses : styles.smallConse}>
                            <TouchableOpacity onPress={() => {
                                setkg(false)
                                setlbs(true)
                            }}>
                                <Text style={lbs ? styles.ftTxts : styles.ftTxt}>lbs</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={arrayData}
                    style={{marginTop :20,width :"90%",alignSelf : 'center'}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity onPress={() => { setNewWeight(item.name,item.value,item.value2) }} style={{flexDirection : 'column',width : 150,height :50,paddingLeft :20,justifyContent : 'center'}}>
                        <Text style={item.name == goalWeight? styles.weightTxt2 : styles.weightTxt1 }>{item.name}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                <View style={{flexDirection : 'column',width : "75%",alignItems : 'center',marginTop :10,alignSelf :'center'}}>
                {type == 'Lose Weight' && (<Text style={{ color: '#707070',  fontSize: 13, fontFamily: 'Jost-Medium',textAlign : 'center'}}>Easy pace to sustain, you will be trying to losse {goalCal}</Text>)}
                {type == 'Gain Weight' && (<Text style={{ color: '#707070',  fontSize: 13, fontFamily: 'Jost-Medium',textAlign : 'center'}}>Easy pace to sustain, you will be trying to gain {goalCal}</Text>)}
                </View>
                <View style={styles.spaceCon3}>
                <TouchableOpacity style={styles.btnCon} onPress={() => { goalWeight == '' ? alert('Enter your weight') :  setUserGoalWeight()   }}>
                        <Text style={styles.btnTxt}>Next</Text>
                    </TouchableOpacity>
                </View>
                </View>)}
                {(stepLevel == 'six'&& (type == 'Lose Weight' || type == 'Gain Weight') )&& (<View style={{flexDirection : 'column'}}>
                <View style={{flexDirection : 'column',width :"80%",marginLeft :25,marginTop :20}}>
                     <ProgressBar style={{height :7,borderRadius :5}} progress={progressLevel} color={Colors.red800} />
                              
                </View>
                <View style={styles.queCon}>
                <Text style={styles.queTxt}>How active are you?</Text>
                </View>
                    <TouchableOpacity style={activityLevel == 1.2 ? styles.bxSeleted:styles.bxUnSeleted} onPress={() => {setActivityLevel(1.2) }}>
                        <Text style={activityLevel == 1.2 ? styles.bxTxts:styles.bxTxt} >Sedentary (Little To No Exercise)</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={activityLevel == 1.375 ? styles.bxSeleted:styles.bxUnSeleted} onPress={() => {setActivityLevel(1.375) }}>
                        <Text style={activityLevel == 1.375 ? styles.bxTxts:styles.bxTxt} >Light Exercise (1-3 Days Per Week)</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={activityLevel == 1.550 ? styles.bxSeleted:styles.bxUnSeleted} onPress={() => {setActivityLevel(1.550) }}>
                        <Text style={activityLevel == 1.550 ? styles.bxTxts:styles.bxTxt} >Moderate Exercise (3-5 Days Per Week)</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={activityLevel == 1.725 ? styles.bxSeleted:styles.bxUnSeleted} onPress={() => {setActivityLevel(1.725) }}>
                        <Text style={activityLevel == 1.725 ? styles.bxTxts:styles.bxTxt} >Heavy Exercise (6-7 Days Per Week)</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={activityLevel == 1.900 ? styles.bxSeleted:styles.bxUnSeleted} onPress={() => {setActivityLevel(1.900) }}>
                        <Text style={activityLevel == 1.900 ? styles.bxTxts:styles.bxTxt} >Very Heavy Exercise (Twice Per Day)</Text>
                    </TouchableOpacity>
                <View style={styles.spaceCon4}>
                <TouchableOpacity style={styles.btnCon} onPress={() => {activityLevel == 0 ? alert('Select activity level') : setUserActivityLevel()  }}>
                        <Text style={styles.btnTxt}>Next</Text>
                    </TouchableOpacity>
                </View>
                </View>)}
                {(stepLevel == 'seven'&& (type == 'Lose Weight' || type == 'Gain Weight') )&& (<View style={{flexDirection : 'column',paddingBottom :220}}>
                <View style={{flexDirection : 'column',width :"90%",marginLeft :20,marginTop :20}}>
                     <ProgressBar style={{height :7,borderRadius :5}} progress={progressLevel} color={Colors.red800} />
                              
                </View>
                <Text style={{ color: '#272727',fontSize: 16,marginLeft :20,marginTop :10,marginBottom :10, fontFamily: 'Jost-Medium',}}>Please specify if you have any of the following health conditions?</Text>
                    <TouchableOpacity style={checkHealthCondition(healthConditions,'Diabetes') != -1 ? styles.bxSeleted2:styles.bxUnSeleted} onPress={() => {  updateHealthCondition('Diabetes') }}>
                        <Text style={checkHealthCondition(healthConditions,'Diabetes') != -1? styles.bxTxts2:styles.bxTxt} >Diabetes</Text>
                        <AntDesign   name={checkHealthCondition(healthConditions,'Diabetes') != -1 ? 'checksquare' : 'checksquareo'} color= {checkHealthCondition(healthConditions,'Diabetes') != -1 ? "#E5184E":"#C9C9C9"} style={{position : 'absolute',right :10}} size={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={checkHealthCondition(healthConditions,'Hypertension') != -1 ? styles.bxSeleted2:styles.bxUnSeleted} onPress={() => {updateHealthCondition('Hypertension') }}>
                        <Text style={checkHealthCondition(healthConditions,'Hypertension') != -1 ? styles.bxTxts2:styles.bxTxt} >Hypertension</Text>
                        <AntDesign   name={checkHealthCondition(healthConditions,'Hypertension') != -1 ? 'checksquare' : 'checksquareo'} color= {checkHealthCondition(healthConditions,'Hypertension') != -1 ? "#E5184E":"#C9C9C9"} style={{position : 'absolute',right :10}} size={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={checkHealthCondition(healthConditions,'Overweight/Obesity') != -1 ? styles.bxSeleted2:styles.bxUnSeleted} onPress={() => {updateHealthCondition('Overweight/Obesity') }}>
                        <Text style={checkHealthCondition(healthConditions,'Overweight/Obesity') != -1 ? styles.bxTxts2:styles.bxTxt} >Overweight/Obesity</Text>
                        <AntDesign   name={checkHealthCondition(healthConditions,'Overweight/Obesity') != -1 ? 'checksquare' : 'checksquareo'} color= {checkHealthCondition(healthConditions,'Overweight/Obesity') != -1 ? "#E5184E":"#C9C9C9"} style={{position : 'absolute',right :10}} size={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={checkHealthCondition(healthConditions,'PCOD') != -1 ? styles.bxSeleted2:styles.bxUnSeleted} onPress={() => {updateHealthCondition('PCOD') }}>
                        <Text style={checkHealthCondition(healthConditions,'PCOD') != -1? styles.bxTxts2:styles.bxTxt} >PCOD</Text>
                        <AntDesign   name={checkHealthCondition(healthConditions,'PCOD') != -1 ? 'checksquare' : 'checksquareo'} color= {checkHealthCondition(healthConditions,'PCOD') != -1 ? "#E5184E":"#C9C9C9"} style={{position : 'absolute',right :10}} size={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={checkHealthCondition(healthConditions,'Thyroid') != -1 ? styles.bxSeleted2:styles.bxUnSeleted} onPress={() => {updateHealthCondition('Thyroid') }}>
                        <Text style={checkHealthCondition(healthConditions,'Thyroid') != -1 ? styles.bxTxts2:styles.bxTxt} >Thyroid</Text>
                        <AntDesign   name={checkHealthCondition(healthConditions,'Thyroid') != -1 ? 'checksquare' : 'checksquareo'} color= {checkHealthCondition(healthConditions,'Thyroid') != -1 ? "#E5184E":"#C9C9C9"} style={{position : 'absolute',right :10}} size={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={checkHealthCondition(healthConditions,'None') != -1 ? styles.bxSeleted2:styles.bxUnSeleted} onPress={() => {updateHealthCondition('None') }}>
                        <Text style={checkHealthCondition(healthConditions,'None') != -1? styles.bxTxts2:styles.bxTxt} >None</Text>
                        <AntDesign   name={checkHealthCondition(healthConditions,'None') != -1 ? 'checksquare' : 'checksquareo'} color= {checkHealthCondition(healthConditions,'None') != -1 ? "#E5184E":"#C9C9C9"} style={{position : 'absolute',right :10}} size={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={checkHealthCondition(healthConditions,'Others') != -1 ? styles.bxSeleted2:styles.bxUnSeleted} onPress={() => {updateHealthCondition('Others') }}>
                        <Text style={checkHealthCondition(healthConditions,'Others') != -1? styles.bxTxts2:styles.bxTxt} >Others</Text>
                        <AntDesign   name={checkHealthCondition(healthConditions,'Others') != -1 ? 'checksquare' : 'checksquareo'} color= {checkHealthCondition(healthConditions,'Others') != -1 ? "#E5184E":"#C9C9C9"} style={{position : 'absolute',right :10}} size={18}/>
                    </TouchableOpacity>
                  {checkHealthCondition(healthConditions,'Others') != -1 && ( 
                      <TextInput
                      onChangeText={value => {
                        setotherHealth(value);
                      }}
                      value={otherHealth}
                      style={styles.editSelect}
                      placeholder="Enter here"
                      placeholderTextColor={'#A2A2A2'}
                      keyboardType='numeric'
                    />
                     )}
                
                <TouchableOpacity style={{height: 50, width: width / 1.13,   backgroundColor: '#E5184E',  alignSelf: 'center',
        justifyContent: 'center',alignItems: 'center',marginTop :100,
        borderRadius: 7,}} onPress={() => { checkHealthCandition()}}>
                        <Text style={styles.btnTxt}>Next</Text>
                    </TouchableOpacity>
                </View>)}
                {stepLevel == 'eight' && (<View style={{flexDirection : 'column',paddingBottom :220}}>
                <View style={{flexDirection : 'column',width :"90%",marginLeft :20,marginTop :20}}>
                     <ProgressBar style={{height :7,borderRadius :5}} progress={progressLevel} color={Colors.red800} />
                              
                </View>
                <View style={styles.queCon2}>
                    <View style={styles.percentCon}>
                        <Text style={styles.buletCol}>{'\u2B24'}<Text style={styles.queTxts}> Protein</Text></Text>
                        <Text style={styles.queTxt}>{protein}%</Text>
                    </View>
                    <View style={styles.percentCon}>
                        <Text style={styles.buletCol}>{'\u2B24'}<Text style={styles.queTxts}> Fat</Text></Text>
                        <Text style={styles.queTxt}>{fat}%</Text>
                    </View>
                    <View style={styles.percentCon}>
                        <Text style={styles.buletCol}>{'\u2B24'}<Text style={styles.queTxts}> Carbs</Text></Text>
                        <Text style={styles.queTxt}>{carbohydrate}%</Text>
                    </View>
                </View>
                <View style={styles.boxCon}>
                    <View style={styles.stepCon}>
                        <Rwalking />
                    </View>
                    <View style={styles.stepCons}>
                        <AntDesign style={styles.antStyle} onPress={() => {  setYourDailySteps(false) }}
                            name='minus' />
                        <Text style={styles.countTxt}>{dailyStep}</Text>
                        <AntDesign style={styles.antStyle} onPress={() => {  setYourDailySteps(true) }}
                            name='plus' />
                    </View>
                    <View style={styles.stepCon}>
                        <Text style={styles.countTxt}>Daily steps goal</Text>
                    </View>
                </View>

                <View style={styles.goalCon}>
                    <Text style={styles.goalTxt}>Your recommended goals are based on your age and weight</Text>
                </View>
                <View style={styles.nutCon}>
                    <Text style={styles.nutTxt}>Recommended nutrition goals</Text>
                </View>

                <View style={styles.btmCon}>
                    <Text style={styles.vitTxt}>Protein</Text>
                    <Text style={styles.vitTxt}>{protein}%</Text>
                </View>
                <View style={styles.btmCon}>
                    <Text style={styles.vitTxt}>Fats</Text>
                    <Text style={styles.vitTxt}>{fat}%</Text>
                </View>
                <View style={styles.btmCon}>
                    <Text style={styles.vitTxt}>Carbohydrates</Text>
                    <Text style={styles.vitTxt}>{carbohydrate}%</Text>
                </View>

                <View style={styles.goalCons}>
                    <Text style={styles.goalTxts}>You'll achieve your goal by {moment(new Date(estimateDate)).format("DD-MMM-YY")}</Text>
                </View>

                
                <TouchableOpacity style={{height: 50, width: width / 1.13,   backgroundColor: '#E5184E',  alignSelf: 'center',
        justifyContent: 'center',alignItems: 'center',marginTop :100,
        borderRadius: 7,}} onPress={() => {setFinalGoal() }}>
                        <Text style={styles.btnTxt}>Next</Text>
                    </TouchableOpacity>
                </View>)}
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SetGoalsWithStepChild);

const styles = StyleSheet.create({
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF',
    },
    weightTxt1 :{
     color: 'grey',  fontSize: 16, fontFamily: 'Jost-Medium'
    },
    weightTxt2 :{
        color: '#E5184E',  fontSize: 16, fontFamily: 'Jost-Medium'
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
        width: width / 1.4,
        // backgroundColor: 'blue',
        justifyContent: 'center',
    },
    txtHead: {
        color: '#707070',
        fontSize: 20,
        fontFamily: 'Jost-Medium',
    },
    imgCon: {
        height: height / 5,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCon: {
        height: height / 15,
        width: width / 1.13,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    hiTxt: {
        color: '#272727',
        fontSize: 16,
        fontFamily: 'Jost-Medium'
    },
    detailCon: {
        height: height / 10,
        width: width / 1.13,
        // backgroundColor: 'blue',
        alignSelf: 'center',
    },
    detailTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Regular'
    },
    spaceCon: {
        height: height / 2.3,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    spaceCon2: {
        height: height / 2.8,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    spaceCon3: {
        height: height / 2.8,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    spaceCon4: {
        height: 50,
        marginTop :170,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    btnCon: {
        height: height / 16,
        width: width / 1.13,
        backgroundColor: '#E5184E',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    chartSpace: {
        height: height / 15,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chartCon: {
        height: height / 90,
        width: width / 1.15,
        backgroundColor: 'red',
        borderRadius: 25
    },
    queCon: {
        height: height / 7,
        width: width / 1.15,
        marginTop :15,
        // backgroundColor: 'blue',
        alignSelf: 'center'
    },
    queTxt: {
        color: '#272727',
        fontSize: 16,
        fontFamily: 'Jost-Medium',
    },
    bxSpace: {
        height: height / 13,
        width: width / 1,
        // backgroundColor: 'blue',
        alignItems: 'center'
    },
    bxCon: {
        height: height / 17,
        width: width / 1.15,
        // backgroundColor: 'red',
        borderWidth: 0.5,
        borderColor: '#707070',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bxCons: {
        height: height / 17,
        width: width / 1.15,
        backgroundColor: '#E5184E',
        borderWidth: 0.5,
        borderColor: '#707070',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bxUnSeleted: {
        height: 45,
        alignSelf : 'center',
        width: width / 1.15,
        // backgroundColor: 'red',
        borderWidth: 0.5,
        marginTop :10,
        borderColor: '#707070',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editSelect: {
        height: 45,
        alignSelf : 'center',
        width: width / 1.15,
        borderWidth: 0.5,
        marginTop :10,
        paddingLeft :15,
        borderColor: '#707070',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bxSeleted: {
        height: 45,
        alignSelf : 'center',
        width: width / 1.15,
        backgroundColor: '#E5184E',
        borderWidth: 0.5,
        marginTop :10,
        borderColor: '#E5184E',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bxSeleted2: {
        height: 45,
        alignSelf : 'center',
        width: width / 1.15,
        borderWidth: 0.5,
        marginTop :10,
        borderColor: '#E5184E',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCons: {
        height: height / 20,
        width: width / 2.5,
        backgroundColor: '#FFFFFF',

        borderRadius: 5,
        textAlign : 'center',
        justifyContent: 'center',
        alignItems: 'center'

    },
    btnSpace: {
        height: height / 15,
        width: width / 1.15,
        // backgroundColor: 'blue',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end'

    },
    btnTxt: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'Jost-Medium'
    },
    bxTxt: {
        color: '#C9C9C9',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },bxTxts: {
        color: '#ffffff',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    bxTxts2: {
        color: '#E5184E',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    heightCon: {
        height: height / 12,
        width: width / 1.15,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    smallCon: {
        height: height / 23,
        width: width / 5,
        // backgroundColor: 'pink',
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#707070'
    },
    smallCons: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: '#707070'

    },
    smallCot: {
        height: height / 23,
        width: width / 10,
        backgroundColor: '#47CACC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: '#707070',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    smallConse: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallConses: {
        height: height / 23,
        width: width / 10,
        backgroundColor: '#47CACC',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    ftTxt: {
        color: '#707070',
        fontFamily: 'Jost-Regular',
        fontSize: 14
    },
    ftTxts: {
        color: '#FFFFFF',
        fontFamily: 'Jost-Regular',
        fontSize: 14
    },
    graphCon: {
        height: height / 5.5,
        width: width / 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chartSpace: {
        height: height / 15,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chartCon: {
        height: height / 90,
        width: width / 1.15,
        backgroundColor: 'red',
        borderRadius: 25
    },
    queCon2: {
        height: height / 15,
        width: width / 1.15,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        marginTop :20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    queTxt: {
        color: '#272727',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
        paddingHorizontal: 15
    },
    percentCon: {
        height: height / 20,
        width: width / 5,
        // backgroundColor: 'cyan',

    },
    queTxts: {
        color: '#707070',
        fontSize: 16,
        fontFamily: 'Jost-Regluar',

    },
    vitTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Regluar',

    },
    buletCol: {
        color: '#F1974A',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    boxCon: {
        height: height / 6,
        width: width / 2.5,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#00000029',
        shadowOpacity: 5,
        borderRadius: 5
    },
    stepCon: {
        height: height / 18,
        width: width / 2.5,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    stepCons: {
        height: height / 20,
        width: width / 2.8,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    antStyle: {
        fontSize: 20,
        color: '#E5184E'
    },
    countTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    goalCon: {
        height: height / 15,
        width: width / 1.5,
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    goalCons: {
        height: height / 15,
        width: width / 1.8,
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    goalTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Regular',
        textAlign: 'center'
    },
    goalTxts: {
        color: '#E5184E',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
        textAlign: 'center'
    },
    nutCon: {
        height: height / 20,
        width: width / 1.15,
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    nutTxt: {
        color: '#272727',
        fontSize: 16,
        fontFamily: 'Jost-Medium',
    },
    btmCon: {
        height: height / 17,
        width: width / 1.15,
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#707070'

    },
})
