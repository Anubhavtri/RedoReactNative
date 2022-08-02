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
function getReminderType (type){
  var reminder_type = "Medicine Reminder"
  if(type == 1){
      reminder_type = "Medicine Reminder"
  }else if(type == 2){
      reminder_type = "Blood Sugar Reminder"
  }else if(type == 3){
      reminder_type = "Water Reminder"
  }
  return reminder_type
}
function getFormatedVolume (type,custom){
  var water_type = "Glass 250 ml"
  if(type == 'glass_250'){
    water_type = "Glass 250 ml"
  }else if(type == 'bottle_500'){
    water_type = "Bottle 500 ml"
  }else if(type == 'sipper_750'){
    water_type = "Sipper 750"
  }else if(type == 'Customised'){
    water_type = custom +" ml"
  }
  return water_type
}
function checkDaySelection(array, type){
  var newStatus = false
   for(let i=0; i<array.length; i++){
      if(array[i].days[0] == type){
          newStatus = true
      }
   }
  return newStatus
}
function getFormatedTime(getTime){
  console.log("getTime  :"+getTime)
  var time12 = ""
  if(getTime != undefined){
      const [sHours, minutes] = getTime.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
      const period = +sHours < 12 ? 'am' : 'pm';
      const hours = +sHours % 12 || 12;
       time12 = `${hours}:${minutes} ${period}`
      console.log("time12  :"+time12)
  }
 
 return time12
}
const DetailsReminder = (props) => {
  const item = props?.route?.params?.customParam;
    console.log("item : "+JSON.stringify(item))
    const [id, setId] = useState(item?.remiderData.id)
  const [selectedIndex, setSelectedIndex] = useState(item?.remiderData.meal_type == 'pre_meal'? 1 : 2);
  const [allDayCheck, setAllDayCheck] = useState(item?.remiderData.reminder_time.length == 7? true :false)
    const [date, setDate] = useState(new Date())
    const [selectedTime, setSelectedTime] = useState(item?.remiderData.reminder_time.length != 0 ? item?.remiderData.reminder_time[0].time_n : '')
   const [TimeDate, setTimeDate] = useState([])
  const [open, setOpen] = useState(false)
  const [MealType, setMealType] = useState(item?.remiderData.meal_type)
  const [MealMode, setMealMode] = useState(item?.remiderData.reading_type)
  const [showTimestamp, setShowTimestamp] = useState(item?.remiderData.reminder_time.length != 0? true :false)
  const [sunDayCheck, setSunDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "SUN"))
  const [monDayCheck, setmonDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "MON"))
  const [tueDayCheck, settueDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "TUE"))
  const [wedDayCheck, setwedDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "WED"))
  const [thuDayCheck, setthuDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "THU"))
  const [friDayCheck, setfriDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "FRI"))
  const [satDayCheck, setsatDayCheck] = useState(checkDaySelection(item?.remiderData.reminder_time, "SAT"))

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
  const CreateBloodSugarReminder = () => {
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
   const backAction = () => {
    props.navigation.goBack()
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
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
          <Text style={styles.topnavtext}>{getReminderType(item?.remiderData.reminder_type)}</Text>
          
        </View>
        <ScrollView>
                <View style={{ paddingTop: 20,paddingLeft :20,paddingRight :20,paddingBottom :80 , height: "100%",flexDirection : 'column',
        width: "100%",
        backgroundColor:'white'}}>
      
       
        <View style={styles.boxConType} >
                 {item?.remiderData.reminder_type ==1 &&(   <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Medicine Name</Text>
                    <Text style={styles.keyBox3}>{item?.remiderData.medicine_name}</Text>
                    </View>) }
                    {item?.remiderData.reminder_type ==2 &&(   <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Meal Type</Text>
                    <Text style={styles.keyBox3}>{item?.remiderData.meal_type == 'pre_meal'? "Pre Meal":"Post Meal"}</Text>
                    </View>) }
                    {item?.remiderData.reminder_type ==3 &&(   <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Volume</Text>
                    <Text style={styles.keyBox3}>{getFormatedVolume(item?.remiderData.water_type,item?.remiderData.customised_water)}</Text>
                    </View>) }
                    {item?.remiderData.reminder_type ==1 &&( <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Type</Text>
                    <Text style={styles.keyBox3}>{item?.remiderData.medicine_type}</Text>
                    </View>)}
                    {item?.remiderData.reminder_type ==2 &&( <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Meal</Text>
                    <Text style={styles.keyBox3}>{item?.remiderData.reading_type}</Text>
                    </View>)}
                    {item?.remiderData.reminder_type ==3 &&( <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Reminder Interval</Text>
                    <Text style={styles.keyBox3}>After {item?.remiderData.water_reminder_time} minutes</Text>
                    </View>)}
                    {item?.remiderData.reminder_type ==1 &&( <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Dosage</Text>
                    <Text style={styles.keyBox3}>{item?.remiderData.dosage_volume} Unit(s)</Text>
                    </View>)}
                    {(item?.remiderData.reminder_type ==1 || item?.remiderData.reminder_type ==2) &&(    <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>Time</Text>
                    <Text style={styles.keyBox3}>{getFormatedTime(item?.remiderData.reminder_time[0]?.time_n)}</Text>
                    </View>)}
                    </View>
                    <View style={{height :10}}/>
                    {(item?.remiderData.reminder_type ==1 || item?.remiderData.reminder_type ==2) &&(   <View style={styles.boxConType} >
                    <View style={{flexDirection : 'row',height :30}}>
                    <Text style={styles.keyBox}>All Day(s)</Text>
                  
                    </View>
                    <View style={{flexDirection : 'row',marginTop :10}}>
                        {sunDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setSunDayCheck(!sunDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>S</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setSunDayCheck(!sunDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>S</Text>
                            </TouchableOpacity>
                        }
                        {monDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setmonDayCheck(!monDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>M</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setmonDayCheck(!monDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>M</Text>
                            </TouchableOpacity>
                        }

                        {tueDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { settueDayCheck(!tueDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>T</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { settueDayCheck(!tueDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>T</Text>
                            </TouchableOpacity>
                        }
                        {wedDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setwedDayCheck(!wedDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>W</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setwedDayCheck(!wedDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>W</Text>
                            </TouchableOpacity>
                        }
                        {thuDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setthuDayCheck(!thuDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Th</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setthuDayCheck(!thuDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>Th</Text>
                            </TouchableOpacity>
                        }
                        {friDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setfriDayCheck(!friDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>F</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setfriDayCheck(!friDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>F</Text>
                            </TouchableOpacity>
                        }
                        {satDayCheck ?
                            <TouchableOpacity style={styles.checkcircle}
                                onPress={() => { setsatDayCheck(!satDayCheck) }}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Sa</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.uncheckcircle}
                                onPress={() => { setsatDayCheck(!satDayCheck) }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>Sa</Text>
                            </TouchableOpacity>
                        }
                    </View>
                     </View>)}
                    
        <View style={{ marginVertical: 10 }} />
        <TouchableOpacity style={styles.buttonStyle}
        >
          <Text style={{ color: 'white' }}>Done</Text>
        </TouchableOpacity>
        <View style={{ marginVertical: 10 }} />
        <TouchableOpacity style={styles.buttonStyle2}
        >
          <Text style={{ color: 'red' }}>Snooze</Text>
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
    postEditReminder: (url,body, token) => dispatch(ReminderAction.postEditReminder(url,body, token)),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsReminder);