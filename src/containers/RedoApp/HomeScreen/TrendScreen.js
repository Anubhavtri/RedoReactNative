import React, { useState,useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View ,TextInput,FlatList,BackHandler} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';
import locations from "../../../helpers/locations";
import { connect } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import { ProgressBar, Colors} from 'react-native-paper';
import moment from 'moment';
import { navigate, resetScreen, Screens } from '../../../helpers/Screens';
import { GETApi, POSTApi } from "../../../app/ApiCall.js";
function getFormated(item) {
    var  tolal = 0;
    tolal= (Math.round(item * 100) / 100).toFixed(2);;
    return tolal;
  }
  function getCalculateCalries(itemArray) {
    var  total = 0;
    for (let i=0; i<itemArray.length; i++){
        total = total+ itemArray[i].calories_float
    }
    var totalAll = 0
    totalAll= (Math.round(total * 100) / 100).toFixed(2);;
    return totalAll;
  }
  function getCalculateProtien(itemArray,totalCal) {
    var  total = 0;
    for (let i=0; i<itemArray.length; i++){
        total = total+ itemArray[i].protien
    } 
    var totalAll = (total/totalCal)*100
    totalAll= (Math.round(totalAll * 100) / 100).toFixed(2);;
    return totalAll;
  }
  function getCalculateProtien2(itemArray,totalCal) {
    var  total = 0;
    for (let i=0; i<itemArray.length; i++){
        total = total+ itemArray[i].protien
    } 
    var totalAll = (total/totalCal)*100
    totalAll= (Math.round(totalAll * 100) / 100).toFixed(2);;
    return totalAll/100;
  }
  function getCalculateFat(itemArray,totalCal) {
    var  total = 0;
    for (let i=0; i<itemArray.length; i++){
        total = total+ itemArray[i].fat
    } 
    var totalAll = (total/totalCal)*100
    totalAll= (Math.round(totalAll * 100) / 100).toFixed(2);;
    return totalAll;
  }
  function getCalculateFat2(itemArray,totalCal) {
    var  total = 0;
    for (let i=0; i<itemArray.length; i++){
        total = total+ itemArray[i].fat
    } 
    var totalAll = (total/totalCal)*100
    totalAll= (Math.round(totalAll * 100) / 100).toFixed(2);;
    return totalAll/100;
  }
  function getCalculateCarbohydrate(itemArray,totalCal) {
    var  total = 0;
    for (let i=0; i<itemArray.length; i++){
        total = total+ itemArray[i].carb
    } 
    var totalAll = (total/totalCal)*100
    totalAll= (Math.round(totalAll * 100) / 100).toFixed(2);;
    return totalAll;
  }
  function getCalculateCarbohydrate2(itemArray,totalCal) {
    var  total = 0;
    for (let i=0; i<itemArray.length; i++){
        total = total+ itemArray[i].carb
    } 
    var totalAll = (total/totalCal)*100
    totalAll= (Math.round(totalAll * 100) / 100).toFixed(2);;
    return totalAll/100;
  }
export const TrendScreen = (props) => {
     const [spinnerShow, setSpinnerShow] = useState(false)
    // const [userDetails, setUserDetails] = useState('')
    // const [protein, setProtein] = useState(0)
    // const [fat, setFat] = useState(0)
    // const [carbohydrate, setCarbohydrate] = useState(0)
    // const [level1, setLevel1] = useState(.10)
    // const [level2, setLevel2] = useState(.10)
    // const [level3, setLevel3] = useState(.10)

    // const [breakfast, setBreakfast] = useState(0)
    // const [lunch, setLunch] = useState(0)
    // const [dinner, setDinner] = useState(0)
    // const [morning_snack, setMorning_snack] = useState(0)
    // const [evening_snack, setEvening_snack] = useState(0)
    // const [DateModal, setDateModal] = useState(false);
    // const [DateSelect, setDateSelect] = useState(new Date());
    // const [breakfastList, setBreakfastList] = useState([])
    // const [lunchList, setLunchList] = useState([])
    // const [dinnerList, setDinnerList] = useState([])
    // const [morning_snackList, setMorning_snackList] = useState([])
    // const [evening_snackList, setEvening_snackList] = useState([])
    // const [allList, setAllList] = useState([])

  const backAction = () => {
    navigate(Screens.REDO_TAB)
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
   useEffect(() => {
    // callApiDetails("/redoapp/get-unique-customer")
    // getRecomnededCalery()
    // getNutritionList()
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
        console.log("result : "+JSON.stringify(getResult?.data))
        setProtein(getResult?.data?.protein)
        setFat(getResult?.data?.fat)
        setCarbohydrate(getResult?.data?.carbohydrate)
        setBreakfast(getResult?.data?.breakfast)
        setLunch(getResult?.data?.lunch)
        setDinner(getResult?.data?.dinner)
        setMorning_snack(getResult?.data?.morning_snack)
        setEvening_snack(getResult?.data?.evening_snack)
        }
    }   
  const getNutritionList = async() => {
      setSpinnerShow(true)
      var getResult = await GETApi(locations.GET_FOOD+ moment(DateSelect).format('YYYY-MM-DD'),props?.token)
      if(getResult.error){
       setSpinnerShow(false)
       alert(getResult.message)
      }else {
       setSpinnerShow(false)
      var newArrayBreak = []
      var newArrayLaunch = []
      var newArrayDinner = []
      var newArrayMorning = []
      var newArrayEvening = []
      for(let i=0; i<getResult?.data?.results.length; i++){
        if(getResult?.data?.results[i].meal_type_key == 1){
            newArrayBreak.push(getResult?.data?.results[i])
        }else  if(getResult?.data?.results[i].meal_type_key == 2){
            newArrayMorning.push(getResult?.data?.results[i])
        }else  if(getResult?.data?.results[i].meal_type_key == 3){
            newArrayLaunch.push(getResult?.data?.results[i])
        }else  if(getResult?.data?.results[i].meal_type_key == 4){
            newArrayEvening.push(getResult?.data?.results[i])
        }else  if(getResult?.data?.results[i].meal_type_key == 5){
            newArrayDinner.push(getResult?.data?.results[i])
        }
        
        }
        setAllList(getResult?.data?.results)
        setBreakfastList(newArrayBreak)
        setMorning_snackList(newArrayMorning)
        setLunchList(newArrayLaunch)
        setEvening_snackList(newArrayEvening)
        setDinnerList(newArrayDinner)
      }
      
    
}
const updateDate = (status)=>{
    if(status){
     var currentDate = new Date(moment(new Date()).add(3,"M"))
     var selectDate = new Date(DateSelect);
     if(selectDate.getTime()< currentDate.getTime()){
        var  currentDate = new Date(DateSelect)
        var tomorrow = new Date(currentDate)
        tomorrow.setDate(tomorrow.getDate() + 1)
        setDateSelect(tomorrow)
      }
    }else {
        var currentDate = new Date();
        var selectDate = new Date(DateSelect);
        if(selectDate.getTime()> currentDate.getTime()){
           var  currentDate = new Date(DateSelect)
            var yesterday = new Date(currentDate)
            yesterday.setDate(yesterday.getDate() - 1)
            setDateSelect(yesterday)
        }
    }
}
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
             <Spinner visible={spinnerShow}></Spinner>
                <View style={styles.secCon}>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>Trend</Text>
                    </View>
                   
                </View>
                {/* <ScrollView >
                <View style={{flexDirection : 'column',paddingBottom:200}}>
                <View style={{flexDirection : 'row',alignSelf : 'center',marginTop :10}}>
                        <AntDesign style={styles.antStyle} onPress={() => {  updateDate(false) }}
                            name='left' />
                        <Text style={styles.countTxt}>{moment(DateSelect).format('DD, MMM YYYY')}</Text>
                        <AntDesign style={styles.antStyle} onPress={() => {  updateDate(true) }}
                            name='right' />
                    </View>
                <View style={styles.calCon}>
                    <Text style={styles.calTxt}>{getCalculateCalries(allList)} / {getFormated(userDetails?.daily_target)} cal</Text>
                </View>
                <View style={styles.calCon}>
                    <Text style={styles.dailyTxt}>YOUR DAILY CALORIE GAOL</Text>
                </View>
                <View style={styles.notCon}>
                    <View style={styles.smCon}>
                        <Text style={styles.proTxt}>Protein</Text>
                        <View style={styles.lineCon}>
                        <ProgressBar style={{height :7,borderRadius :5}} progress={level1} color={'#F89651'} />
                        </View>
                        <Text style={styles.proTxt}>{getCalculateProtien(allList,userDetails?.daily_target)}/{protein}%</Text>
                    </View>
                    <View style={styles.smCon}>
                        <Text style={styles.proTxt}>Fat</Text>
                        <View style={styles.lineCon}>
                        <ProgressBar style={{height :7,borderRadius :5}} progress={level2} color={'#F85851'} />
                        </View>
                        <Text style={styles.proTxt}>{getCalculateFat(allList,userDetails?.daily_target)}/{fat}%</Text>
                    </View>
                    <View style={styles.smCon}>
                        <Text style={styles.proTxt}>Carbs</Text>
                        <View style={styles.lineCon}>
                      <ProgressBar style={{height :7,borderRadius :5}} progress={level3} color={'#46CFFB'} />
                        </View>
                        <Text style={styles.proTxt}>{getCalculateCarbohydrate(allList,userDetails?.daily_target)}/{carbohydrate}%</Text>
                    </View>
                </View>
                <View style={styles.flexCon}>
                    <Text style={styles.logTxt}>Your Meal Log</Text>
                  
                </View>
                <View style={styles.gapCon}>
                    <View style={styles.boxCon}>
                        <View style={styles.topCon}>
                            <Text style={styles.dietTxt}>Breakfast</Text>
                        </View>
                        <View style={styles.calsCon}>
                            <Text style={styles.calsTxt}>{getCalculateCalries(breakfastList)} cal / {getFormated((breakfast/100)*userDetails?.daily_target)} cal</Text>
                            <AntDesign  onPress={() => navigate(Screens.LOGFOOD,{tags: 'Breakfast',cureentDate : DateSelect,mealtypes : 1})}
                                style={{ color: '#E5184E', fontSize: 20 }}
                                name='pluscircleo' />
                        </View>
                        <FlatList
                    data={breakfastList}
                    style={{width :"90%",alignSelf : 'center'}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity  onPress={(e) => navigate(Screens.EDITFOODDETAILS,{tags1: 'Breakfast',tags: item.food_name,cureentDate : DateSelect,mealtypes : 1,foodId: item.id,idd :item.food_id}) } style={{flexDirection : 'column',width :"100%"}}>
                            <View style={{flexDirection : 'row'}}>
                            <Text style={styles.saveTxt1}>{item.food_name}</Text>
                            <Text style={[styles.saveTxt1,{position : 'absolute',right :10}]}>{item.calories} cal</Text>
                            </View>
                        <Text style={styles.saveTxt1}>{item.number_of_units} {item.measurement_description}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                </View>


                <View style={styles.gapCon}>
                    <View style={styles.boxCon}>
                        <View style={styles.topCon}>
                            <Text style={styles.dietTxt}>Morning snack</Text>
                        </View>
                        <View style={styles.calsCon}>
                            <Text style={styles.calsTxt}>{getCalculateCalries(morning_snackList)} cal / {getFormated((morning_snack/100)*userDetails?.daily_target)} cal</Text>
                            <AntDesign  onPress={() => navigate(Screens.LOGFOOD,{tags: 'Morning snack',cureentDate : DateSelect,mealtypes : 2})}
                                style={{ color: '#E5184E', fontSize: 20 }}
                                name='pluscircleo' />
                        </View>
                        <FlatList
                    data={morning_snackList}
                    style={{marginTop :5,width :"90%",alignSelf : 'center'}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity  onPress={(e) => navigate(Screens.EDITFOODDETAILS,{tags1: 'Morning snack',tags: item.food_name,cureentDate : DateSelect,mealtypes : 2,foodId: item.id,idd :item.food_id}) } style={{flexDirection : 'column',width :"100%"}}>
                              <View style={{flexDirection : 'row'}}>
                            <Text style={styles.saveTxt1}>{item.food_name}</Text>
                            <Text style={[styles.saveTxt1,{position : 'absolute',right :10}]}>{item.calories} cal</Text>
                            </View>
                        <Text style={styles.saveTxt1}>{item.number_of_units} {item.measurement_description}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                </View>
                <View style={styles.gapCon}>
                    <View style={styles.boxCon}>
                        <View style={styles.topCon}>
                            <Text style={styles.dietTxt}>Lunch</Text>
                        </View>
                        <View style={styles.calsCon}>
                            <Text style={styles.calsTxt}>{getCalculateCalries(lunchList)} cal / {getFormated((lunch/100)*userDetails?.daily_target)} cal</Text>
                            <AntDesign  onPress={() => navigate(Screens.LOGFOOD,{tags: 'Lunch',cureentDate : DateSelect,mealtypes : 3})}
                                style={{ color: '#E5184E', fontSize: 20 }}
                                name='pluscircleo' />
                        </View>
                        <FlatList
                    data={lunchList}
                    style={{marginTop :5,width :"85%",alignSelf : 'center'}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity onPress={(e) => navigate(Screens.EDITFOODDETAILS,{tags1: 'Lunch',tags: item.food_name,cureentDate : DateSelect,mealtypes : 3,foodId: item.id,idd :item.food_id}) } style={{flexDirection : 'column',width :"100%"}}>
                            <View style={{flexDirection : 'row'}}>
                            <Text style={styles.saveTxt1}>{item.food_name}</Text>
                            <Text style={[styles.saveTxt1,{position : 'absolute',right :10}]}>{item.calories} cal</Text>
                            </View>
                        <Text style={styles.saveTxt1}>{item.number_of_units} {item.measurement_description}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                </View>

                <View style={styles.gapCon}>
                    <View style={styles.boxCon}>
                        <View style={styles.topCon}>
                            <Text style={styles.dietTxt}>Evening snack</Text>
                        </View>
                        <View style={styles.calsCon}>
                            <Text style={styles.calsTxt}>{getCalculateCalries(evening_snackList)} cal / {getFormated((evening_snack/100)*userDetails?.daily_target)} cal</Text>
                            <AntDesign  onPress={() => navigate(Screens.LOGFOOD,{tags: 'Evening snack',cureentDate : DateSelect,mealtypes : 4})}
                                style={{ color: '#E5184E', fontSize: 20 }}
                                name='pluscircleo' />
                        </View>
                        <FlatList
                    data={evening_snackList}
                    style={{marginTop :5,width :"85%",alignSelf : 'center'}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity  onPress={(e) => navigate(Screens.EDITFOODDETAILS,{tags1: 'Evening snack',tags: item.food_name,cureentDate : DateSelect,mealtypes : 4,foodId: item.id,idd :item.food_id}) } style={{flexDirection : 'column',width :"100%"}}>
                            <View style={{flexDirection : 'row'}}>
                            <Text style={styles.saveTxt1}>{item.food_name}</Text>
                            <Text style={[styles.saveTxt1,{position : 'absolute',right :10}]}>{item.calories} cal</Text>
                            </View>
                        <Text style={styles.saveTxt1}>{item.number_of_units} {item.measurement_description}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                </View>

                <View style={styles.gapCon}>
                    <View style={styles.boxCon}>
                        <View style={styles.topCon}>
                            <Text style={styles.dietTxt}>Dinner</Text>
                        </View>
                        <View style={styles.calsCon}>
                            <Text style={styles.calsTxt}>{getCalculateCalries(dinnerList)} cal / {getFormated((dinner/100)*userDetails?.daily_target)} cal</Text>
                            <AntDesign onPress={() => navigate(Screens.LOGFOOD,{tags: 'Dinner',cureentDate : DateSelect,mealtypes : 5})}
                                style={{ color: '#E5184E', fontSize: 20 }}
                                name='pluscircleo' />
                        </View>
                        <FlatList
                    data={dinnerList}
                    style={{marginTop :5,width :"85%",alignSelf : 'center'}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity  onPress={(e) => navigate(Screens.EDITFOODDETAILS,{tags1: 'Dinner',tags: item.food_name,cureentDate : DateSelect,mealtypes : 5,foodId: item.id,idd :item.food_id}) } style={{flexDirection : 'column',width :"100%"}}>
                             <View style={{flexDirection : 'row'}}>
                            <Text style={styles.saveTxt1}>{item.food_name}</Text>
                            <Text style={[styles.saveTxt1,{position : 'absolute',right :10}]}>{item.calories} cal</Text>
                            </View>
                        <Text style={styles.saveTxt1}>{item.number_of_units} {item.measurement_description}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </View>
                </View>
                </View>
                </ScrollView> */}
                {/* <DatePicker
              modal
              open={DateModal}
              mode="date"
              date={DateSelect}
              minimumDate={new Date()}
              maximumDate={new Date(moment(new Date()).add(3,"M"))}
              onConfirm={date => {
                setDateModal(false);
                setDateSelect(date);
              }}
              onCancel={() => {
                setDateModal(false);
              }}
            /> */}
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(TrendScreen);

const styles = StyleSheet.create({
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF',
    },
    antStyle: {
        fontSize: 20,
        margin :10,
        color: '#E5184E'
    },
    countTxt: {
        color: '#707070',
        fontSize: 14,
        alignSelf : 'center',
        fontFamily: 'Jost-Medium',
    },
    secCon: {
        height: height / 13,
        width: width / 1,
        paddingLeft:20,
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
    calCon: {
        height: height / 26,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'flex-end',
        alignItems: 'center'

    },
    calTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    dailyTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Regular',
    },
    notCon: {
        height: height / 12,
        width: width / 1.1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        alignSelf: 'center'

    },
    smCon: {
        height: height / 12,
        width: width / 3.3,
        // backgroundColor: 'red',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    lineCon: {
        height: 10,
        width: 100,
        },
    proTxt: {
        color: '#A2A2A2',
        fontSize: 14,
        fontFamily: 'Jost-Regular',
    },
    flexCon: {
        height: height / 17,
        width: width / 1.1,
        // backgroundColor: 'red',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    logTxt: {
        color: '#272727',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    planTxt: {
        color: '#E5184E',
        fontSize: 12,
        fontFamily: 'Jost-Regular',
    },
    gapCon: {
        marginTop :7,
        marginBottom :3,
        width: width / 1,
        // backgroundColor: 'red',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    boxCon: {
        minHeight: height / 7.5,
        width: width / 1.1,
        // backgroundColor: 'blue',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#0000008C'
    },
    topCon: {
        height: height / 25,
        width: width / 1.2,
        // backgroundColor: 'pink',
        justifyContent: 'flex-end',
        alignSelf: 'center'
    },
    dietTxt: {
        color: '#A2A2A2',
        fontSize: 12,
        fontFamily: 'Jost-Regular',
    },
    calsCon: {
        height: height / 17,
        width: width / 1.2,
        // backgroundColor: 'pink',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    calsTxt: {
        color: '#707070',
        fontSize: 12,
        fontFamily: 'Jost-Medium',
    },
    redCon: {
        height: height / 35,
        width: width / 1.2,
        // backgroundColor: 'pink',
        alignSelf: 'center'
    },
    saveTxt1: {
        color: 'black',
        fontSize: 12,
        padding :5,
        fontFamily: 'Jost-Medium',
    },
})
