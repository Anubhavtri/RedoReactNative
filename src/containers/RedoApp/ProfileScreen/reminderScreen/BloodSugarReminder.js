import { ScrollView, Text, View,BackHandler, TextInput as ReactTextInput, TouchableOpacity,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { create } from '../../../../helpers/PlatformSpecificStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import reminderStyles from './reminderStyles';
import { connect } from 'react-redux';
import { CheckBox, Icon, ButtonGroup } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input';
import DatePicker from 'react-native-date-picker'
import { navigate, resetScreen, Screens } from '../../../../helpers/Screens';
import ReminderAction from './ReminderAction';

const BloodSugarReminder = (props) => {
  const item = props?.route?.params?.customParam;
  const [userId, setUserId] = useState(item?.userId)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allDayCheck, setAllDayCheck] = useState(false)
  const [date, setDate] = useState(new Date())
  const [TimeDate, setTimeDate] = useState([])
  const [open, setOpen] = useState(false)
  const [MealType, setMealType] = useState('pre_meal')
  const [MealMode, setMealMode] = useState('')
  const [showTimestamp, setShowTimestamp] = useState(false)
  const [sunDayCheck, setSunDayCheck] = useState(false)
  const [monDayCheck, setmonDayCheck] = useState(false)
  const [tueDayCheck, settueDayCheck] = useState(false)
  const [wedDayCheck, setwedDayCheck] = useState(false)
  const [thuDayCheck, setthuDayCheck] = useState(false)
  const [friDayCheck, setfriDayCheck] = useState(false)
  const [satDayCheck, setsatDayCheck] = useState(false)

  var s = date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
  var datetimearray = s.split(" ")
  console.log(datetimearray[3])
  var time24 = datetimearray[3]

  const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
  const period = +sHours < 12 ? 'AM' : 'PM';
  const hours = +sHours % 12 || 12;
  var time12 = `${hours}:${minutes} ${period}`
  const TimeAndDateArray = () => {

    const singleTimeDateObject = {
      "time": time24,
      "days": ["Sat", "Mon", "WED"]
    }
    var dateTimevar = TimeDate
    dateTimevar.push(singleTimeDateObject)
    setTimeDate(dateTimevar)
    console.log(TimeDate, "Date Time Array")
  }
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
    if (allDayCheck) {
        setSunDayCheck(true), setmonDayCheck(true), settueDayCheck(true), setwedDayCheck(true), setthuDayCheck(true), setfriDayCheck(true), setsatDayCheck(true)
    } else {
        setSunDayCheck(false), setmonDayCheck(false), settueDayCheck(false), setwedDayCheck(false), setthuDayCheck(false), setfriDayCheck(false), setsatDayCheck(false)
    }

    return
}, [allDayCheck])

  const CreateBloodSugarReminder = () => {
    var newArray = []
    if(sunDayCheck){
        newArray.push({
            "time_n": time12,
            "days": ["SUN"]
        })
    }
    if(monDayCheck){
        newArray.push({
            "time_n": time12,
            "days": ["MON"]
        })
    }
    if(tueDayCheck){
        newArray.push({
            "time_n": time12,
            "days": ["TUE"]
        })
    }
    if(wedDayCheck){
        newArray.push({
            "time_n": time12,
            "days": ["WED"]
        })
    }
    if(thuDayCheck){
        newArray.push({
            "time_n": time12,
            "days": ["THU"]
        })
    }
    if(friDayCheck){
        newArray.push({
            "time_n": time12,
            "days": ["FRI"]
        })
    }
    if(satDayCheck){
        newArray.push({
            "time_n": time12,
            "days": ["SAT"]
        })
    }
     if (MealType == '') {
        alert('Please select meal type');
      }else if (MealMode == '') {
        alert('Please select meal mode');
      }else if (!showTimestamp) {
        alert('Please add time');
      }else if (newArray.length == 0) {
        alert('Please select days');
      }else{

      
        const body = {
          "medicine_name": "",
          "reminder_type": 2,
          "medicine_type": "",
          "meal_type":MealType,
          "reading_type":MealMode,
          "water_type": null,
          "dosage_volume": 0,
          "sleep_time": null,
          "customised_water": null,
          "is_active": true,
          "sleeping_time": "1:30",
          "wakeing_time": "1:30",
          "water_reminder_time": 1,
          "unique_customer": userId,
          "reminder_time": newArray
      }
    props.postCustomerBooking(body,props?.token ,userId )
      }
  }

  return (
    <SafeAreaView>
            <View style={[styles.MainContainer]}>
        <View style={styles.TopNav}>
          <MaterialCommunityIcons
            onPress={() => {  props.navigation.goBack() }}
            style={{ fontSize: 25, marginRight: 10 }}
            name="arrow-left"
            backgroundColor="#3b5998"
          />
          <Text style={styles.topnavtext}>Blood Sugar</Text>
          
        </View>
        <ScrollView>
                <View style={{ paddingTop: 20,paddingLeft :20,paddingRight :20,paddingBottom :80 , height: "100%",flexDirection : 'column',
        width: "100%",
        backgroundColor:'white'}}>
        <ButtonGroup
          buttons={['Pre Meal', 'Post Meal',]}
          selectedIndex={selectedIndex}
          buttonStyle={{backgroundColor : 'white'}}
          selectedButtonStyle={{backgroundColor : '#47CACC'}}
          onPress={(value) => {
            if (value == 0) {
              setMealType('pre_meal')
            } else if (value == 1) {
              setMealType('post_meal')
            }
            setSelectedIndex(value);
          }}
          containerStyle={{ marginTop : 20, width :200,height :40,alignSelf : 'center', borderRadius: 5 }}
        />
         <View style={{ flexDirection : 'row',justifyContent: "space-between", width :"80%",alignSelf : 'center',marginTop:20,marginBottom :10 }}>
     {MealType == 'pre_meal'&& (   <TouchableOpacity  onPress={() => {  setMealMode('fasting')
          }}style={{ flexDirection : 'column',justifyContent: "center", alignItems: 'center' }}>
        <Image
              style={{ width: 30, height: 30 }}
              source={require('../../../../staticData/assests/fasting.png')}
            />
            <Text style={styles.keyBox2}>Fasting</Text>
            <MaterialCommunityIcons
            style={MealMode == 'fasting'? styles.checkBox1 :styles.checkBox2}
            name={MealMode == 'fasting'?"checkbox-marked":"checkbox-blank-outline"}
          />
          </TouchableOpacity>)}
          {MealType == 'post_meal'&& (   <TouchableOpacity  onPress={() => {  setMealMode('breakfast')
          }}style={{ flexDirection : 'column',justifyContent: "center", alignItems: 'center' }}>
        <Image
              style={{ width: 30, height: 30 }}
              source={require('../../../../staticData/assests/fasting.png')}
            />
            <Text style={styles.keyBox2}>Breakfast</Text>
            <MaterialCommunityIcons
            style={MealMode == 'breakfast'? styles.checkBox1 :styles.checkBox2}
            name={MealMode == 'breakfast'?"checkbox-marked":"checkbox-blank-outline"}
          />
          </TouchableOpacity>)}
          <TouchableOpacity  onPress={() => {  setMealMode('lunch')
          }} style={{ flexDirection : 'column',justifyContent: "center", alignItems: 'center' }}>
        <Image
              style={{ width: 30, height: 30 }}
              source={require('../../../../staticData/assests/lunch-time.png')}
            />
            <Text style={styles.keyBox2}>Lunch</Text>
            <MaterialCommunityIcons
            style={MealMode == 'lunch'? styles.checkBox1 :styles.checkBox2}
            name={MealMode == 'lunch'?"checkbox-marked":"checkbox-blank-outline"}
          />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => {  setMealMode('dinner')
          }} style={{ flexDirection : 'column',justifyContent: "center", alignItems: 'center' }}>
        <Image
              style={{ width: 30, height: 30 }}
              source={require('../../../../staticData/assests/dinner.png')}
            />
            <Text style={styles.keyBox2}>Dinner</Text>
            <MaterialCommunityIcons
            style={MealMode == 'dinner'? styles.checkBox1 :styles.checkBox2}
            name={MealMode == 'dinner'?"checkbox-marked":"checkbox-blank-outline"}
          />
          </TouchableOpacity>
          
        </View>
       
        <View style={styles.boxConType} >
                    <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Reminder Time</Text>
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
                                TimeAndDateArray()
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                 
                    </View>
                       
                    </View>
                    {showTimestamp &&(
                       <Text style={{ color: 'black',fontWeight :'bold',fontSize :20 }}>{time12}</Text>)}
                    </View>
                    <View style={{height :10}}/>
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
                                setAllDayCheck(!allDayCheck)
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
                    
        <View style={{ marginVertical: 10 }} />
        <TouchableOpacity style={styles.buttonStyle}
          onPress={(e) => { CreateBloodSugarReminder() }}
        >
          <Text style={{ color: 'white' }}>SAVE</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
     
    </SafeAreaView>
  )
}



const styles = create(reminderStyles)

const mapStateToProps = (state) => ({

  token: state.user.userData?.token,

})

const mapDispatchToProps = (dispatch) => {
  return {
    postCustomerBooking: (body, token, userId ) => dispatch(ReminderAction.postCustomerBooking(body, token, userId )),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BloodSugarReminder);