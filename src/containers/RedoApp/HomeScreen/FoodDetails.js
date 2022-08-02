import React, { useState,useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View ,FlatList,BackHandler} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';
import {TextInput} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import locations from "../../../helpers/locations";
import { connect } from 'react-redux';
import { navigate, resetScreen, Screens } from '../../../helpers/Screens';
import { GETApi, POSTApi } from "../../../app/ApiCall.js";
import Constants from '../../../staticData/Constants';
import moment from 'moment';
import Pie from 'react-native-pie'
function getFormated(item) {
    var  tolal = 0;
    tolal= (Math.round(item * 100) / 100).toFixed(2);;
    return tolal;
  }
  function getIndex(arrayList, value) {
      console.log("arrayList :"+JSON.stringify(arrayList))
      console.log("value :"+value)
    return arrayList.findIndex(obj => obj.measurement_description === value);
  }
export const FoodDetails = (props) => {
      const item = props?.route?.params?.customParam;
    const [title, setTitle] = useState(item?.tags)
    const [userId, setUserId] = useState(item?.userId)
    const [itemId, setItemId] = useState(item?.idd)
    const [DateSelect, setDateSelect] = useState(item?.cureentDate);
    const [spinnerShow, setSpinnerShow] = useState(false)
    const [foodDetails, setFoodDetails] = useState('')
    const [foodUnits, setFoodUnits] = useState([])
    const [selectUnit, setSelectUnit] = useState('')
    const [searchText, setSearchText] = useState('');
    const [totalCal, setTotalCal] = useState('');
    const [newIndex, setNewIndex] = useState(-1);
    const [protein, setProtein] = useState(0)
    const [fat, setFat] = useState(0)
    const [carbohydrate, setCarbohydrate] = useState(0)
    const [sectionData, setSectionData] = useState([])
    const [mealtype, setMealtypes] = useState(item?.mealtypes)
   
    const backAction = () => {
        resetScreen(Screens.ADDNUTRITION)
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
      useEffect(() => {
        getItemFromStorage()
        callFoodDetails()
        var newArray = []
        newArray.push({
            percentage: 20,
            color: '#46CFFB',
        })
        newArray.push({
            percentage: 30,
            color: '#F85851',
        })
        newArray.push({
            percentage: 50,
            color: '#F89651',
        })
       setSectionData(newArray)
        }, [])

      const getItemFromStorage = async () => {
        try {
             await AsyncStorage.getItem('userId', (error, result) => {
               if (result) {
                 console.log("check food details :"+result);
                 setUserId(userId)
               }else{
                 console.log(JSON.stringfy(error));
               }
             });
           } catch (error) {
             console.log(error);
           }
      }
    const callFoodDetails = async()=>{
        setSpinnerShow(true)
        var getResult = await GETApi(locations.SEARCH_FOOD_DETAILS+itemId,props?.token)
        if(getResult.error){
         setSpinnerShow(false)
         alert(getResult.message)
        }else {
         setSpinnerShow(false)
         setFoodDetails(getResult?.data?.food)
         getUnitList(getResult?.data?.food)
        }
        
    }
    const getUnitList = async(list)=>{
        setSpinnerShow(true)
        var getResult = await GETApi(locations.FOOD_UNITS+itemId,props?.token)
        if(getResult.error){
         setSpinnerShow(false)
         alert(getResult.message)
        }else {
         setSpinnerShow(false)
          console.log("food units : "+getResult?.data?.[0])
         setFoodUnits(getResult?.data)
         setSelectUnit(getResult?.data?.[0])
         var newIndex = getIndex(list.servings?.serving,getResult?.data?.[0])
         console.log("newIndex : "+newIndex)
         setNewIndex(newIndex)
         if(newIndex != -1){
            setTotalCal(list.servings?.serving[newIndex].calories)
         }
         console.log("newIndex : "+newIndex)
        
        }
    }
    const addCalories = async()=>{
        if(totalCal == 0){
            alert("Cal should not be 0")
        }else  if(searchText == ""){
            alert("Please enter unit")
        }else {

      
        const body = {
            "meal_date": moment(DateSelect).format('YYYY-MM-DD'),
    "food_name": title,
    "measurement_description": foodDetails?.servings?.serving[newIndex].measurement_description,
    "serving_description":foodDetails?.servings?.serving[newIndex].serving_description,
    "calories":(totalCal* searchText).toString(),
    "calories_float":(totalCal* searchText),
    "number_of_units":searchText,
    "food_id":itemId,
    "meal_type_key":mealtype,
    "protien": protein,
    "fat":fat,
    "carb":carbohydrate
          };
          
        setSpinnerShow(true)
        var getResult = await POSTApi(locations.ADD_FOOD+"?uc_id="+userId,body,props?.token)
        if(getResult.error){
         setSpinnerShow(false)
         alert(getResult.message)
        }else {
         setSpinnerShow(false)
         console.log("check Food detaisl1 :"+userId);

         resetScreen(Screens.ADDNUTRITION,{userId : userId})
        }
    }
    }
    const setUnitToCalculate = async(value)=>{
        setSelectUnit(value)
        var newIndex = getIndex(foodDetails?.servings?.serving,value)
        setNewIndex(newIndex)
        if(newIndex != -1){
           setTotalCal(foodDetails?.servings?.serving[newIndex].calories)
        }
        if(searchText != ''){
            calCulateCalories(searchText)
        }
        console.log("newIndex : "+newIndex)
    }
    const calCulateCalories = async(value)=>{
        setSearchText(value)
        console.log("value : "+value)
        var proteinCount = foodDetails?.servings?.serving[newIndex].protein*4/totalCal
        var fatCount = foodDetails?.servings?.serving[newIndex].fat*9/totalCal
        var carbohydrateCount = foodDetails?.servings?.serving[newIndex].carbohydrate*4/totalCal
        setProtein(proteinCount*100)
        setFat(fatCount*100)
        setCarbohydrate(carbohydrateCount*100)
        var newArray = []
        newArray.push({
            percentage: carbohydrateCount*100,
            color: '#46CFFB',
        })
        newArray.push({
            percentage: fatCount*100,
            color: '#F85851',
        })
        newArray.push({
            percentage: proteinCount*100,
            color: '#F89651',
        })
       setSectionData(newArray)
    }
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
             <Spinner visible={spinnerShow}></Spinner>
                <View style={styles.secCon}>
                    <View style={styles.arrowCon}>
                        <MaterialCommunityIcons
                            onPress={(e) => {resetScreen(Screens.ADDNUTRITION) }}
                            style={{ fontSize: 24, color: '#707070' }}
                            name="arrow-left"
                        />
                    </View>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>{title}</Text>
                    </View>
                   
                </View>
                <View style={{flexDirection : 'column',paddingBottom:200}}>
                <View style={styles.topCon}>
                    <View style={styles.quesCons}>
                        <Text style={styles.txtHead}>{title}</Text>
                    </View>
                    <View style={styles.quesCon}>
                        <AntDesign
                            name='questioncircleo'
                            style={{ fontSize: 20, color: '#A2A2A2' }}
                        />
                        <Text style={styles.regTxt}>Need help with quantity?</Text>
                    </View>
                </View>
                <View style={styles.calCon}>
                    <View style={styles.gCon}>
                        <Text style={styles.regTxts}>{selectUnit}</Text>
                    </View>
                    <Text style={styles.regTxt}>{totalCal} cal</Text>
                </View>
                <FlatList
                    data={foodUnits}
                    style={{marginTop :15,width :"85%",marginLeft :15}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity  onPress={(e) => {setUnitToCalculate(item) }} style={item == selectUnit ? styles.selectBox2 : styles.selectBox1}>
                        <Text style={item == selectUnit ? styles.saveTxt2 : styles.saveTxt1}>{item}</Text>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
 <View style={{flexDirection : 'row',width :"90%",height : 50,alignSelf : 'center',marginTop :10, justifyContent: 'center',
              flexDirection: 'row',
              borderColor: '#A2A2A2',
              borderWidth: 0.2,
              borderRadius: 5,}}>
                
                <View style={{width :"100%",height :"100%", justifyContent: 'center'}}>
              <TextInput
                style={{width :"100%",height :"100%",paddingLeft :10}}
                value={searchText}
                onChangeText={value => {
                    calCulateCalories(value)
                }}
                maxLength={3}
                keyboardType={'numeric'}
                placeholder="Enter here"
              />
            </View>
                     </View>  
                <View style={styles.hereCon}>
                    <Text style={styles.hereTxt}>Here is what it contains</Text>
                </View>
                <View style={styles.otCon}>
                    <View style={styles.chartCon}>
                    <Pie
              radius={80}
              innerRadius={50}
              sections={sectionData}
              strokeCap={'butt'}
            />
             <Text style={{position : 'absolute',top :65,left :70,textAlign : 'center'}}>{totalCal* searchText}{"\n"}Calories</Text>
                    </View>
                    <View style={styles.dataCon}>
                        <View style={styles.dataCons}>
                            <View style={styles.colCon}></View>
                            <View style={styles.detailCon}>
                                <Text style={styles.regTxt}>Carbs</Text>
                            </View>
                            <Text style={styles.regTxt}>{getFormated(carbohydrate)}%</Text>
                        </View>
                        <View style={styles.dataCons}>
                            <View style={styles.redCon}></View>
                            <View style={styles.detailCon}>
                                <Text style={styles.regTxt}>Fat</Text>
                            </View>
                            <Text style={styles.regTxt}>{getFormated(fat)}%</Text>
                        </View>
                        <View style={styles.dataCons}>
                            <View style={styles.orgCon}></View>
                            <View style={styles.detailCon}>
                                <Text style={styles.regTxt}>Protein</Text>
                            </View>
                            <Text style={styles.regTxt}>{getFormated(protein)}%</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.botmCon}>
                    <Text style={styles.proTxts}>Carbs</Text>
                    <Text style={styles.regTxts}>{getFormated((foodDetails?.servings?.serving[newIndex]?.carbohydrate)* searchText)} gm</Text>
                </View>
                <View style={styles.botmCon}>
                    <Text style={styles.proTxts}>Fat</Text>
                    <Text style={styles.regTxts}>{getFormated((foodDetails?.servings?.serving[newIndex]?.fat)* searchText)} gm</Text>
                </View>
                <View style={styles.botmCon}>
                    <Text style={styles.proTxts}>Protein</Text>
                    <Text style={styles.regTxts}>{getFormated((foodDetails?.servings?.serving[newIndex]?.protein)* searchText)} gm</Text>
                </View>
                <View style={styles.spbtnCon}>
                    <TouchableOpacity style={styles.btnCon} onPress={(e) => {addCalories() }}>
                        <Text style={styles.saveTxt}>Save</Text>
                    </TouchableOpacity>
                </View>
                </View>
               
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);

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
        width: width / 1.4,
        // backgroundColor: 'blue',
        justifyContent: 'center',
    },
    txtHead: {
        color: '#707070',
        fontSize: 20,
        fontFamily: 'Jost-Medium',
    },
    topCon: {
        height: height / 15,
        width: width / 1.1,
        // backgroundColor: 'blue',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'flex-end'

    },
    medTxt: {
        color: '#272727',
        fontSize: 14,
        fontFamily: 'Jost-Medium'
    },
    regTxt: {
        color: '#A2A2A2',
        fontSize: 12,
        fontFamily: 'Jost-Regular',
        paddingHorizontal: 10
    },
    quesCon: {
        height: height / 25,
        width: width / 2,
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    quesCons: {
        height: height / 25,
        width: width / 3,
        // backgroundColor: 'red',
        justifyContent: 'center'
    },
    calCon: {
        height: height / 30,
        width: width / 1.1,
        // backgroundColor: 'red',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    gCon: {
        height: height / 40,
        width: width / 12,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderColor: '#A2A2A2'
    },
    regTxts: {
        color: '#A2A2A2',
        fontSize: 12,
        textTransform: 'capitalize',
        fontFamily: 'Jost-Regular',
    },
    otCon: {
        height: height / 5,
        width: width / 1.1,
        // backgroundColor: 'red',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hereCon: {
        height: height / 20,
        width: width / 1.1,
        // backgroundColor: 'red',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    hereTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Medium',

    },
    chartCon: {
        height: height / 5.5,
        width: width / 2.12,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataCon: {
        height: height / 5.5,
        width: width / 2.3,
        // backgroundColor: 'pink',
        justifyContent: 'center'
    },
    dataCons: {
        height: height / 22,
        width: width / 2.3,
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        alignItems: 'center'
    },
    colCon: {
        height: 20,
        width: 20,
        backgroundColor: '#46CEFA',
        borderRadius: 5
    },
    redCon: {
        height: 20,
        width: 20,
        backgroundColor: '#F85851',
        borderRadius: 5
    },
    orgCon: {
        height: 20,
        width: 20,
        backgroundColor: '#F89651',
        borderRadius: 5
    },


    detailCon: {
        height: height / 20,
        width: width / 5,
        // backgroundColor: 'green',
        justifyContent: 'center'
    },
    botmCon: {
        height: height / 17,
        width: width / 1.1,
        // backgroundColor: 'yellow',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#707070',
        borderBottomWidth: 0.5
    },
    proTxts: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    spbtnCon: {
        height: height / 7,
        width: width / 1,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnCon: {
        height: height / 20,
        width: width / 4,
        backgroundColor: '#E5184E',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectBox1: {
        height : 45,
        minWidth : 60,
        borderColor: 'black',
        borderWidth:1,
        margin :5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectBox2: {
        height : 45,
        minWidth : 60,
        borderColor: '#E5184E',
        backgroundColor: '#E5184E',
        borderRadius: 5,
        margin :5,
        justifyContent: 'center',
        borderWidth:1,
        alignItems: 'center'
    },
    saveTxt: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    saveTxt2: {
        color: 'white',
        fontSize: 16,
        padding :10,
        fontWeight : 'bold',
        fontFamily: 'Jost-Medium',
    },
    saveTxt1: {
        color: 'black',
        fontSize: 16,
        padding :10,
        fontWeight : 'bold',
        fontFamily: 'Jost-Medium',
    },
})
