import { StyleSheet, Text, View,BackHandler,Image, TextInput as ReactTextInput,Modal, TouchableOpacity,Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { create } from '../../../../helpers/PlatformSpecificStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
const WaterReminder = (props) => {
  const item = props?.route?.params?.customParam;
  const [userId, setUserId] = useState(item?.userId)
    const [WaterVolume, setWaterVolume] = useState('')
    const [ReminderValue, setReminderValue] = useState('')
    const [CustomVolume, setCustomVolume] = useState('')
    const [ReminderUnit, setReminderUnit] = useState('min')
    const [TimeDate, setTimeDate] = useState([])
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [timeMode, setTimeMode] = useState('Sleep')
    const [sleepTime, setSleepTime] = useState('')
    const [wakeTime, setWakeTime] = useState('')
    const [visibility, setVisibility] = useState(false)

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
        if(timeMode == 'Sleep'){
         setSleepTime(`${hours}:${minutes} ${period}`)
        }else if(timeMode == 'Wake'){
          setWakeTime(`${hours}:${minutes} ${period}`)
         }
       
    }
   

    const CreateWaterReminder = () => {
         if (WaterVolume == '') {
             alert('Please select water volume');
          }else if (WaterVolume == 'Customised' && CustomVolume == '') {
            alert('Please enter custom water volume');
          }else if (ReminderValue == '') {
            alert('Please select reminde time');
          }else if (sleepTime == '') {
            alert('Please add sleeping time');
          }else if (wakeTime == '') {
            alert('Please add wake up time');
          }else{
            var newReminderValue = 0
          if(ReminderUnit == 'hour'){
            newReminderValue =ReminderValue*60
          }else {
            newReminderValue =ReminderValue
          }
        
        
        const body = {
            "medicine_name": '',
            "reminder_type": 3,
            "medicine_type": '',
            "meal_type":"",
            "reading_type": "",
            "water_type": WaterVolume,
            "dosage_volume": '',
            "customised_water": CustomVolume,
            "is_active": true,
            "sleeping_time": sleepTime,
            "wakeing_time": wakeTime,
            "unique_customer": userId,
            "water_reminder_time": newReminderValue,
            "reminder_time": []
        }
        props.postCustomerBooking(body, props?.token , userId )
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
                    <Text style={styles.topnavtext}>Water</Text>
                </View>
                <ScrollView>
                <View style={{  paddingTop: 20,paddingLeft :20,paddingRight :20,paddingBottom :80 , height: "100%",flexDirection : 'column',
        width: "100%",
        backgroundColor:'white'}}>
                 
                    <Text style={styles.keyBox}>Select Volume</Text>
                    <View style={{flexDirection : 'row',marginTop :10}}>
                    <TouchableOpacity  onPress={() => { setWaterVolume('glass_250') }}style={WaterVolume == 'glass_250'? styles.typeSelect1 : styles.typeSelect2}>
                    <Image
                        style={{ width: 40, height: 60,marginTop :5 ,alignSelf :'center'}}
                        source={require('../../../../staticData/assests/glass.png')}
                      />
                    <Text style={WaterVolume == 'glass_250'? styles.typeText1 : styles.typeText2}>Glass - 250 ml</Text>
                    {WaterVolume == 'glass_250'&& ( <MaterialCommunityIcons
                          style={ styles.checkBox1}
                          name={"checkbox-marked"}
                        />
                       )}
                      </TouchableOpacity>
                      <TouchableOpacity  onPress={() => { setWaterVolume('bottle_500') }}style={WaterVolume == 'bottle_500'? styles.typeSelect1 : styles.typeSelect2}>
                    <Image
                        style={{ width: 40, height: 60,marginTop :5 ,alignSelf :'center'}}
                        source={require('../../../../staticData/assests/glass.png')}
                      />
                    <Text style={WaterVolume == 'bottle_500'? styles.typeText1 : styles.typeText2}>Bottle - 500 ml</Text>
                    {WaterVolume == 'bottle_500'&& ( <MaterialCommunityIcons
                          style={ styles.checkBox1}
                          name={"checkbox-marked"}
                        />
                       )}
                      </TouchableOpacity>
                      <TouchableOpacity  onPress={() => { setWaterVolume('sipper_750') }} style={WaterVolume == 'sipper_750'? styles.typeSelect1 : styles.typeSelect2}>
                    <Image
                        style={{ width: 40, height: 60,marginTop :5 ,alignSelf :'center'}}
                        source={require('../../../../staticData/assests/glass.png')}
                      />
                    <Text style={WaterVolume == 'sipper_750'? styles.typeText1 : styles.typeText2}>Sipper - 750 ml</Text>
                    {WaterVolume == 'sipper_750'&& ( <MaterialCommunityIcons
                          style={ styles.checkBox1}
                          name={"checkbox-marked"}
                        />
                       )}
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection : 'row',marginTop :10}}>
                    <TouchableOpacity  onPress={() => { 
                      setWaterVolume('customised') 
                      setVisibility(true)
                      }} style={WaterVolume == 'customised'? styles.typeSelect1 : styles.typeSelect2}>
                    <Image
                        style={{ width: 40, height: 60,marginTop :5 ,alignSelf :'center'}}
                        source={require('../../../../staticData/assests/glass.png')}
                      />
                    <Text style={WaterVolume == 'customised'? styles.typeText1 : styles.typeText2}>Customised</Text>
                    {WaterVolume == 'customised'&& ( <MaterialCommunityIcons
                          style={ styles.checkBox1}
                          name={"checkbox-marked"}
                        />
                       )}
                      </TouchableOpacity>
                      
                    </View>
                    <View style={styles.boxConType} >
                    <View style={{flexDirection : 'row',height :100}}>
                    <Text style={styles.keyBox}>Reminds after every</Text>
                    <View style={{flexDirection : 'column',position : 'absolute',right :15}}>
                    <NumericInput
                                type='up-down'
                                onChange={value => setReminderValue(value)}
                                iconSize={16}
                                totalWidth={80}
                                minValue={1}
                                maxValue={60}
                                totalHeight={40} />
                  <View style={styles.smallCon}>
                <TouchableOpacity
                  onPress={() => {
                    setReminderUnit('hour');
                  }}
                  style={ReminderUnit == 'hour' ? styles.smallCot : styles.smallCons}>
                  <Text style={ReminderUnit == 'hour' ? styles.ftTxt2 : styles.ftTxt}>Hr(s)</Text>
                </TouchableOpacity>
                <View style={ReminderUnit == 'min' ? styles.smallConses : styles.smallConse}>
                  <TouchableOpacity
                    onPress={() => {
                      setReminderUnit('min')
                    }}>
                    <Text style={ReminderUnit == 'min' ? styles.ftTxt2 : styles.ftTxt}>Min(s)</Text>
                  </TouchableOpacity>
                </View>
              </View>
                    </View>
                       
                    </View>
                    </View>
                    <View style={styles.boxConType} >
                    <View style={{flexDirection : 'row',height :30,alignItems  :'center'}}>
                    <Text style={styles.keyBox}>Sleeping Time</Text>
                    <View style={{flexDirection : 'row',position : 'absolute',right :5}}>
                     <TouchableOpacity style={{  height: 30,flexDirection : 'row', width: 100, justifyContent: 'center',
        alignItems: 'center'}}
                            onPress={() => { 
                              setOpen(true)
                               setTimeMode('Sleep')}}>
                            <Text style={{ color: '#47CACC',textDecorationLine: 'underline' }}>{sleepTime != ''? sleepTime :'Add Time'}</Text>
                            <MaterialIcons
                                style={{color:"#47CACC",alignSelf : 'center',marginLeft:2,marginRight :2}}
                                name={"mode-edit"}
                                size={15}
                            />
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            open={open}
                            mode="time"
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                TimeAndDateArray(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                 
                    </View>
                       
                    </View>
                    </View>
                    <View style={styles.boxConType} >
                    <View style={{flexDirection : 'row',height :30,alignItems  :'center'}}>
                    <Text style={styles.keyBox}>Wake Up Time</Text>
                    <View style={{flexDirection : 'row',position : 'absolute',right :5}}>
                     <TouchableOpacity style={{  height: 30,flexDirection : 'row', width: 100, justifyContent: 'center',
        alignItems: 'center'}}
        onPress={() => { 
          setOpen(true)
           setTimeMode('Wake')}}>
                            <Text style={{ color: '#47CACC',textDecorationLine: 'underline' }}>{wakeTime != ''? wakeTime :'Add Time'}</Text>
                            <MaterialIcons
                                style={{color:"#47CACC",alignSelf : 'center',marginLeft:2,marginRight :2}}
                                name={"mode-edit"}
                                size={15}
                            />
                        </TouchableOpacity>
                    </View>
                       
                    </View>
                    </View>
                    {/* <View style={{flexDirection :'row',width :"90%",alignSelf : 'center',marginTop : 20,marginBottom :10}}>
                            <MaterialCommunityIcons
                                    style={{ fontSize: 25,color : "#F75010" }}
                                    name="information"
                                />
                                   <Text style={{ color: '#F75010', fontSize: 11 , marginLeft: 5}}>Your other reminder has been scheduled at selected time. There should be at least 15 minutes gap between two reminders.</Text>
                         
                                </View> */}
                    
                    
                    <View style={{ marginTop: 30 }} />
                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={() => { CreateWaterReminder() }}
                    >
                        <Text style={{ color: 'white' }}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
      <Modal
        visible={visibility}
        animationType={'slide'}
        transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              height: 200,
              width: '70%',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 7,
              elevation: 10,
            }}>
           
              <Text style={{fontSize: 18, marginTop: 20}}>Customize</Text>
              <MaterialCommunityIcons
                        onPress={(e) => { 
                          setCustomVolume('') 
                          setVisibility(false)
                        }}
                        style={{ fontSize: 25, position :'absolute',right :10,top :10,color :'red' }}
                        name="close-thick"
                    />
              <View style={{alignSelf : 'center',flexDirection : 'row',marginTop :30}}>
                    <NumericInput
                                type='up-down'
                                onChange={value => setCustomVolume(value)}
                                iconSize={16}
                                totalWidth={150}
                                minValue={1}
                                maxValue={10000}
                                totalHeight={40} />
                                 <Text style={{fontSize: 15,alignSelf  :'center',marginLeft:10}}>ml</Text>
                                </View>
              <TouchableOpacity style={styles.buttonStyle2}
                        onPress={() => {  setVisibility(false) }}
                    >
                        <Text style={{ color: 'white' }}>SAVE</Text>
                    </TouchableOpacity>
          </View>
        </View>
      </Modal>
            </View>
           
        </SafeAreaView>
    )
}


const mapStateToProps = (state) => ({

    token: state.user.userData?.token,

})

const mapDispatchToProps = (dispatch) => {
    return {
        postCustomerBooking: (body, token, userId ) => dispatch(ReminderAction.postCustomerBooking(body, token, userId )),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WaterReminder);
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
    checkBox1 :{ fontSize: 25,alignSelf : 'center',color :"red",position : 'absolute',top :-10,right :-10 },
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

    typeSelect1 : {  width: "30%", backgroundColor: 'white', flexDirection : 'column',alignSelf : 'center',
    borderWidth: 1, padding : 5,borderColor: 'red',  borderRadius: 5,margin :5},
    typeSelect2 : {  width: "30%", backgroundColor: 'white', flexDirection : 'column',alignSelf : 'center',
    borderWidth: 1, padding : 5,borderColor: 'grey',  borderRadius: 5,margin :5},
    typeText1 : { color: 'red', fontSize: 14, marginTop: 7,alignSelf :'center'},
    typeText2 : { color: '#000', fontSize: 14, marginTop: 7,alignSelf :'center'},
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
    buttonStyle2: {
      justifyContent: "center",
      alignItems: 'center',
      alignSelf: "center",position : 'absolute',bottom :10,
      backgroundColor: '#E5184E',
      alignSelf: 'center',
      alignItems: 'center',
      height :40,
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
        fontSize: 12,
      },
      ftTxt2: {
        color: 'white',
        fontFamily: 'Jost-Regular',
        fontSize: 12,
      },
    
  });