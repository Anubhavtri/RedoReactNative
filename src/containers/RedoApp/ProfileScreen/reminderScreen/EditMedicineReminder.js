import { StyleSheet, Text, View,BackHandler, TextInput as ReactTextInput, TouchableOpacity,Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { create } from '../../../../helpers/PlatformSpecificStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { CheckBox, Icon } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import DatePicker from 'react-native-date-picker'
import ReminderAction from './ReminderAction';
import { resetScreen, Screens } from '../../../../helpers/Screens';
import DefaultSetting from '../../../../settings/styles/DefaultPrimarySettings';
import $_ from '../../../../baseComponents/textInput/TextInputSettings'
import { ScrollView } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');
function checkDaySelection(array, type){
    var newStatus = false
     for(let i=0; i<array.length; i++){
        if(array[i].days[0] == type){
            newStatus = true
        }
     }
    return newStatus
}
const EditMedicineReminder = (props) => {
    const item = props?.route?.params?.customParam;
    console.log("item : "+JSON.stringify(item))
    const [id, setId] = useState(item?.remiderData.id)
    const [MedicineName, setMedicineName] = useState(item?.remiderData.medicine_name)
    
    const [MedicineType, setMedicineType] = useState(item?.remiderData.medicine_type)
    const [MealCate, setMealCate] = useState(item?.remiderData.meal_type)
    const [DosageValue, setDosageValue] = useState(item?.remiderData.dosage_volume)
    const [DosageUnit, setDosageUnit] = useState('unit')
    const [TimeDate, setTimeDate] = useState([])
    const [allDayCheck, setAllDayCheck] = useState(item?.remiderData.reminder_time.length == 7? true :false)
    const [date, setDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState(item?.remiderData.reminder_time.length != 0 ? item?.remiderData.reminder_time[0].time_n : '')
    const [open, setOpen] = useState(false)
    const [showTimestamp, setShowTimestamp] = useState(item?.remiderData.reminder_time.length != 0? true :false)
    const [sunDayCheck, setSunDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "SUN"))
    const [monDayCheck, setmonDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "MON"))
    const [tueDayCheck, settueDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "TUE"))
    const [wedDayCheck, setwedDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "WED"))
    const [thuDayCheck, setthuDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "THU"))
    const [friDayCheck, setfriDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "FRI"))
    const [satDayCheck, setsatDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "SAT"))

    useEffect(() => {
    }, [])
    const backAction = () => {
        props.navigation.goBack()
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
    const TimeAndDateArray = (newDate) => {
        const singleTimeDateObject = {
            "time": time24,
            "days": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        }
        var dateTimevar = TimeDate
        dateTimevar.push(singleTimeDateObject)
        setTimeDate(dateTimevar)
        var s = newDate.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

        var datetimearray = s.split(" ")
        console.log(datetimearray[3])
        var time24 = datetimearray[3]
    
        const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
        const period = +sHours < 12 ? 'AM' : 'PM';
        const hours = +sHours % 12 || 12;
        setSelectedTime(`${hours}:${minutes} ${period}`)
    }
    const CreateMedicineReminder = () => {
        var newArray = []
        if(sunDayCheck){
            newArray.push({
                "time_n": selectedTime,
                "days": ["SUN"]
            })
        }
        if(monDayCheck){
            newArray.push({
                "time_n": selectedTime,
                "days": ["MON"]
            })
        }
        if(tueDayCheck){
            newArray.push({
                "time_n": selectedTime,
                "days": ["TUE"]
            })
        }
        if(wedDayCheck){
            newArray.push({
                "time_n": selectedTime,
                "days": ["WED"]
            })
        }
        if(thuDayCheck){
            newArray.push({
                "time_n": selectedTime,
                "days": ["THU"]
            })
        }
        if(friDayCheck){
            newArray.push({
                "time_n": selectedTime,
                "days": ["FRI"]
            })
        }
        if(satDayCheck){
            newArray.push({
                "time_n": selectedTime,
                "days": ["SAT"]
            })
        }
        if (MedicineName == '') {
            alert('Please enter medicine name');
          } else if (MedicineType == '') {
            alert('Please select medicine type');
          }else if (MealCate == '') {
            alert('Please select meal category');
          }else if (DosageValue == '') {
            alert('Please select dosage value');
          }else if (!showTimestamp) {
            alert('Please add time');
          }else if (newArray.length == 0) {
            alert('Please select days');
          }else{

        
        
        const body = {
            "medicine_name": MedicineName,
            "reminder_type": 1,
            "medicine_type": MedicineType,
            "meal_type":MealCate,
            "reading_type": "",
            "water_type": null,
            "dosage_volume": DosageValue,
            "sleep_time": null,
            "customised_water": null,
            "is_active": true,
            "sleeping_time": "1:30",
            "wakeing_time": "1:30",
            "water_reminder_time": 1,
            "reminder_time": newArray
        }
        props.postEditReminder("/redoapp/edit-reminder/"+id+"/", body, props?.token)
    }
    }
   const callAllDayCheck = (allDayCheck)=>{
    setAllDayCheck(allDayCheck)
    if (allDayCheck) {
        setSunDayCheck(true), setmonDayCheck(true), settueDayCheck(true), setwedDayCheck(true), setthuDayCheck(true), setfriDayCheck(true), setsatDayCheck(true)
    } else {
        setSunDayCheck(false), setmonDayCheck(false), settueDayCheck(false), setwedDayCheck(false), setthuDayCheck(false), setfriDayCheck(false), setsatDayCheck(false)
    }
   }


    return (
        <SafeAreaView>
          
            <View style={styles.MainContainer}>
                <View style={styles.TopNav}>
                    <MaterialCommunityIcons
                        onPress={(e) => {  props.navigation.goBack() }}
                        style={{ fontSize: 25, marginRight: 10 }}
                        name="arrow-left"
                        backgroundColor="#3b5998"
                    />
                    <Text style={styles.topnavtext}>Medicine</Text>
                </View>
                <ScrollView>
                <View style={{ paddingTop: 20,paddingLeft :20,paddingRight :20,paddingBottom :80 , height: "100%",flexDirection : 'column',
        width: "100%",
        backgroundColor:'white'}}>
                    <ReactTextInput
                        style={[styles.textipstyle, styles.addressfield]}
                        onChangeText={(value) => { setMedicineName(value) }}
                        backgroundColor='#FFFFFF'
                        value={MedicineName}
                        placeholder="Enter Medicine Name"
                        multiline={true}
                    />
                    <View style={styles.boxConType} >
                    <Text style={styles.keyBox}>Select Type</Text>
                    <View style={{flexDirection : 'row',marginTop :5}}>
                        <CheckBox
                            center
                            title="Tablet    "
                            checkedColor='#47CACC'
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            containerStyle={styles.checkboxContainer}
                            checked={ MedicineType == 'tablet'? true :false}
                            onPress={(e) => { setMedicineType('tablet')}}
                        />
                        <CheckBox
                            center
                            title="Capsule"
                            checkedColor='#47CACC'
                            checkedIcon="dot-circle-o"
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={ MedicineType == 'capsule'? true :false}
                            onPress={(e) => {  setMedicineType('capsule')}}
                        />
                        <CheckBox
                            center
                            title="Cream"
                            checkedColor='#47CACC'
                            checkedIcon="dot-circle-o"
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={ MedicineType == 'cream'? true :false}
                            onPress={(e) => { setMedicineType('cream')}}
                        />
                    </View>
                    <View style={{flexDirection : 'row',marginTop :5,marginBottom :5}}>
                        <CheckBox
                            center
                            title="Injection"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checkedColor='#47CACC'
                            containerStyle={styles.checkboxContainer}
                            checked={ MedicineType == 'injectible'? true :false}
                            onPress={(e) => { setMedicineType('injectible')}}
                        />
                        <CheckBox
                            center
                            title="Syrup    "
                            checkedIcon="dot-circle-o"
                            checkedColor='#47CACC'
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={ MedicineType == 'syrup'? true :false}
                            onPress={(e) => { setMedicineType('syrup')}}
                        />
                        <CheckBox
                            center
                            title="Inhaler"
                            checkedIcon="dot-circle-o"
                            checkedColor='#47CACC'
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={ MedicineType == 'inhaler'? true :false}
                            onPress={(e) => { setMedicineType('inhaler')}}
                        />
                    </View>
                    </View>
                    <View style={styles.boxConType} >
                    <Text style={styles.keyBox}>Meal Category</Text>
                    <View style={{flexDirection : 'row',marginTop :5}}>
                        <CheckBox
                            center
                            title="Pre Meal    "
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            checkedColor='#47CACC'
                            containerStyle={styles.checkboxContainer}
                            checked={ MealCate == 'pre_meal'? true :false}
                            onPress={(e) => { setMealCate('pre_meal')}}
                        />
                        <CheckBox
                            center
                            title="Post Meal"
                            checkedIcon="dot-circle-o"
                            checkedColor='#47CACC'
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={ MealCate == 'post_meal'? true :false}
                            onPress={(e) => { setMealCate('post_meal')}}
                        />
                       
                    </View>
                    </View>
                    <View style={styles.boxConType} >
                    <View style={{flexDirection : 'row',height :100}}>
                    <Text style={styles.keyBox}>Dosage Value</Text>
                    <View style={{flexDirection : 'column',position : 'absolute',right :15}}>
                    <NumericInput
                                type='up-down'
                                value={parseInt(DosageValue)}
                                onChange={value => setDosageValue(value)}
                                iconSize={16}
                                totalWidth={80}
                                minValue={1}
                                maxValue={10000}
                                totalHeight={40} />
                  <View style={styles.smallCon}>
                <TouchableOpacity
                  onPress={() => {
                    setDosageUnit('unit');
                  }}
                  style={DosageUnit == 'unit' ? styles.smallCot : styles.smallCons}>
                  <Text style={DosageUnit == 'unit' ? styles.ftTxt2 : styles.ftTxt}>Unit</Text>
                </TouchableOpacity>
                <View style={DosageUnit == 'ml' ? styles.smallConses : styles.smallConse}>
                  <TouchableOpacity
                    onPress={() => {
                      setDosageUnit('ml')
                    }}>
                    <Text style={DosageUnit == 'll' ? styles.ftTxt2 : styles.ftTxt}>ML</Text>
                  </TouchableOpacity>
                </View>
              </View>
                    </View>
                       
                    </View>
                    </View>
                    <View style={styles.boxConType} >
                    <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Add Time</Text>
                    <View style={{flexDirection : 'column',position : 'absolute',right :15}}>
                    <TouchableOpacity style={{  height: 30, width: 100, justifyContent: 'center',
        alignItems: 'center', borderWidth: 1,borderRadius :5,borderColor: '#47CACC',}}
                            onPress={() => { setOpen(true) }}>
                            <Text style={{ color: '#47CACC' }}>Add Time</Text>
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={open}
                            mode="time"
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                setShowTimestamp(true)
                                TimeAndDateArray(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                 
                    </View>
                       
                    </View>
                    {showTimestamp &&(
                       <Text style={{ color: 'black',fontWeight :'bold',fontSize :20 }}>{selectedTime}</Text>)}
                    </View>
                    {/* <View style={{flexDirection :'row',width :"90%",alignSelf : 'center',marginTop : 20,marginBottom :10}}>
                            <MaterialCommunityIcons
                                    style={{ fontSize: 25,color : "#F75010" }}
                                    name="information"
                                />
                                   <Text style={{ color: '#F75010', fontSize: 11 , marginLeft: 5}}>Your other reminder has been scheduled at selected time. There should be at least 15 minutes gap between two reminders.</Text>
                         
                                </View> */}
                    <View style={styles.boxConType} >
                    <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>All Day(s)</Text>
                    <View style={{flexDirection : 'column',position : 'absolute',right :15}}>
                    <CheckBox
                            center
                            // title="Click Here"
                            checkedColor='#47CACC'
                            containerStyle={styles.checkboxContainer2}
                            checked={allDayCheck}
                            onPress={(val) => {
                                callAllDayCheck(!allDayCheck)
                            }}
                        />
                    </View>
                    </View>
                    <View style={{flexDirection : 'row',marginTop :10}}>
                        {sunDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setSunDayCheck(!sunDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>S</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setSunDayCheck(!sunDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>S</Text>
                            </TouchableOpacity>
                        }
                        {monDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setmonDayCheck(!monDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>M</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setmonDayCheck(!monDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>M</Text>
                            </TouchableOpacity>
                        }

                        {tueDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { settueDayCheck(!tueDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>T</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { settueDayCheck(!tueDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>T</Text>
                            </TouchableOpacity>
                        }
                        {wedDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setwedDayCheck(!wedDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>W</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setwedDayCheck(!wedDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>W</Text>
                            </TouchableOpacity>
                        }
                        {thuDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setthuDayCheck(!thuDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>Th</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setthuDayCheck(!thuDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>Th</Text>
                            </TouchableOpacity>
                        }
                        {friDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setfriDayCheck(!friDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>F</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setfriDayCheck(!friDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>F</Text>
                            </TouchableOpacity>
                        }
                        {satDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setsatDayCheck(!satDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 12 }}>Sa</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setsatDayCheck(!satDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 12 }}>Sa</Text>
                            </TouchableOpacity>
                        }
                    </View>
                     </View>
                    
                    <View style={{ marginTop: 30 }} />
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={() => { CreateMedicineReminder() }}
                    >
                        <Text style={{ color: 'white' }}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
           
        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({

    token: state.user.userData?.token,

})

const mapDispatchToProps = (dispatch) => {
    return {
        postEditReminder: (url,body, token) => dispatch(ReminderAction.postEditReminder(url,body, token)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMedicineReminder);
const styles = StyleSheet.create({
    MainContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: DefaultSetting.white,
    },
    TopNav: {
        height: 55,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        padding: 13
    },
    boxConType : {  
    width: "100%",
    backgroundColor: 'white',
    flexDirection : 'column',
    alignSelf : 'center',
    marginTop :10,
    borderWidth: 1,
    padding : 10,
    borderColor: 'grey',
             shadowOpacity: 0.1,
             shadowRadius: 4,
            elevation: 5,
            shadowColor : 'grey',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            borderRadius: 5,},
    typeSelect1 : { color:"#47CACC",alignSelf : 'center',position : 'absolute',right : 10},
    typeSelect2 : { color:"#707070",alignSelf : 'center',position : 'absolute',right : 10},
    typeText1 : { color: '#47CACC', fontSize: 15, marginLeft: 15,alignSelf :'center'},
    typeText2 : { color: '#707070', fontSize: 15, marginLeft: 15,alignSelf :'center'},
    topnavtext: {
        color: '#707070',
        fontSize: 20,
        marginLeft :15,
        justifyContent: 'space-between',
        fontWeight: DefaultSetting.fontWeight.bold
    },
    pageCenter: {
        alignItems: 'center',
        marginTop :70,
        flexDirection : 'column',
        alignSelf : 'center',
        width: "100%",
        justifyContent: "center",
    },

    image: {
        marginTop: 150,
        marginBottom: 10,
        width: '40%',
        height: 100,
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    checkboxContainer: {
        width :80,
        marginHorizontal: 1, padding: 0, borderWidth: 0, backgroundColor: '#FFFFFF'
    },
    checkboxContainer3: {
        marginHorizontal: 1, padding: 0, borderWidth: 0, backgroundColor: '#FFFFFF'
    },
    checkboxContainer2: {
         padding: 0, borderWidth: 0, backgroundColor: '#FFFFFF'
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
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
    modalStyle: {
        width: "100%",
        height :"100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection : 'column',
        backgroundColor: '#707070A6',
        justifyContent: 'flex-end'
    },
    horizontalScrollBarBTn: { marginHorizontal: 5,marginVertical:10, backgroundColor: 'white', padding: 10, borderRadius: 15, borderColor: 'black',height:40 },
    horizontalScrollBarOnBTn: {backgroundColor: '#00FFFF', marginHorizontal: 5,marginVertical:10, padding: 10, borderRadius: 15, borderColor: 'black',height:40 },
    animatedContainer: {
        backgroundColor: 'white',
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#924a91",
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal: 80,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    addressfield: {
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: DefaultSetting.borderRadius,
        borderColor: DefaultSetting.grayColors._400,
    },
    textipstyle: {
        flexWrap: 'wrap',
        fontSize: 16,
        paddingRight: $_.textInputPaddingRight,
        paddingLeft: $_.textInputPaddingRight,
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,
    },
    covertext: {
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,
        fontSize: 15,
        fontWeight: DefaultSetting.fontWeight.medium,
    },
    keyBox: {
        // color: PrimarySettings.grayColors._300,
        paddingBottom: 3,
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,
        fontWeight: "bold",

    },
    uncheckcircle: {
        height: 28,
        width: 28,
        borderRadius: 1000,
        borderWidth: 1,
        backgroundColor : 'white',
        borderColor : '#707070',
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 12
    },
    checkcircle: {
        height: 28,
        width: 28,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor : '#47CACC',
        backgroundColor: '#47CACC',
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 12
    },
    buttonStyle: {
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: '#E5184E',
        alignSelf: 'center',
        alignItems: 'center',
        height :45,
        justifyContent: 'center',
        borderRadius: 7, padding: 5,
        width:"30%",
    },
    ////////////////////////////////////////////////////////////////
    boxCon: {
        height:50,
        width: "100%",
        // backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxCons: {
        height: 50,
        width: 200,
        backgroundColor: 'red',
        borderWidth: 1,
    },
    boxCont: {
        height: 50,
        width: 200,
        backgroundColor: 'yellow',
        borderWidth: 1,
    },
    boxCont: {
        height: 50,
        width: 200,
        backgroundColor: 'yellow',
        borderWidth: 1,
    },
    boxContainer: {
        height: 50,
        width: 200,
        backgroundColor: 'green',
        borderWidth: 1,
    },
    pointCon: {
        height: 50,
        width: 200,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    ptCon: {
        height: 50,
        width: 200,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    rtCon: {
        height: 50,
        width: 200,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    txtTop: {
        fontWeight: 'bold',
        fontFamily: 'Jost-SemiBold',
        fontSize: 15
    },
    txtTops: {
        fontWeight: 'bold',
        fontFamily: 'Jost-SemiBold',
        fontSize: 15,
        top: 50,
        paddingHorizontal: 180

    },
    ltCon: {
        height: 50,
        width: 200,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    secCon: {
        height: 50,
        width: 200,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'flex-end',
        // backgroundColor: 'cyan'
    },
    locationCon: {

        height: 50,
        width: 200,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end'
    },
    pinSty: {
        top: 45,
        paddingHorizontal: 175
    },
   
    smallCon: {
        height: height / 23,
        width: width / 5,
        // backgroundColor: 'pink',
        borderRadius: 5,
        marginTop :10,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#707070',
      },
      smallCons: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: '#707070',
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
        borderBottomLeftRadius: 5,
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
        borderBottomRightRadius: 5,
      },
      ftTxt: {
        color: '#707070',
        fontFamily: 'Jost-Regular',
        fontSize: 14,
      },
      ftTxt2: {
        color: 'white',
        fontFamily: 'Jost-Regular',
        fontSize: 14,
      },
    
  });