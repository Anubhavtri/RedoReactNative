import { StyleSheet, Text, View,BackHandler, TouchableOpacity, FlatList,Modal, Image,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { create } from '../../../../helpers/PlatformSpecificStyles';
import Spinner from '../../../../components/spinner/Spinner'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Switch } from 'react-native-elements';
import moment  from 'moment';
import { connect } from 'react-redux';
import DefaultSetting from '../../../../settings/styles/DefaultPrimarySettings';
import $_ from '../../../../baseComponents/textInput/TextInputSettings'
import { navigate, resetScreen, Screens } from '../../../../helpers/Screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReminderAction from './ReminderAction';
import ToggleSwitch from 'toggle-switch-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
function getWaterVolume (type,custom){
    var reminder_type = "250 ml"
    if(type == 'glass_250'){
        reminder_type = "250 ml"
    }else if(type == 'bottle_500'){
        reminder_type = "500 ml"
    }else if(type == 'sipper_750'){
        reminder_type = "750 ml"
    }else {
        reminder_type = custom+ " ml"
    }
    return reminder_type
}
function getFormatedDay (day){
    var day_type = "S"
    if(day == "SUN"){
        day_type = "S"
    }else if(day == "MON"){
        day_type = "M"
    }else if(day == "TUE"){
        day_type = "T"
    }else if(day == "WED"){
        day_type = "W"
    }else if(day == "THU"){
        day_type = "Th"
    }else if(day == "FRI"){
        day_type = "F"
    }else if(day == "SAT"){
        day_type = "Sa"
    }
    return day_type
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
const ReminderMainScreen = (props) => {
    const item = props?.route?.params?.customParam;
    const [parentId, setParentId] = useState(item?.parentId)
    const [userId, setUserId] = useState(item?.userId)
    const [isModalVisible, setModalVisible] = useState(false);
    const [typeSelect, setTypeSelect] = useState('Medicine');

    const [reminder, setReminder] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

   
    const backAction = () => {
       // navigate(Screens.PROFILE_REDO)
      //props.navigation.goBack()
      console.log("userId cReminderMaiScreen: ")
      resetScreen(Screens.PROFILE_REDO)
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

    useEffect(() => {
        console.log("userId cReminderMaiScreen: "+userId)
       // props.getAllReminders(props.token,userId);
       getItemFromStorage()
       const willFocusSubscription = props.navigation.addListener('focus', () => {
       // callApiUserList("redoapp/get-unique-users-child/")
       props.getAllReminders(props.token,userId);
       
    });
    return willFocusSubscription;

       // getItemFromStorage()
    }, [])
    console.log("props?.update : "+props?.update)
  if(props?.update){
    console.log("userId cReminderMaiScreen  props?.update: "+userId)

    props.getAllReminders(props.token,userId);
  }

  const getItemFromStorage = async () => {
    try {
         await AsyncStorage.getItem('userId', (error, result) => {
            console.log("cReminderMaiScreen Upper :"+result);
           if (result) {
             console.log("cReminderMaiScreen :"+result);
             setUserId(result)
             props.getAllReminders(props.token,result);

           }else{
            props.getAllReminders(props.token,"");
           }
          
         });
       } catch (error) {
        props.getAllReminders(props.token,"");
         console.log(error);
       }
  }


    
const callEditScreen=(data)=>{
if(data.reminder_type == 1){
    navigate(Screens.EDIT_MEDICINE_REMINDER,{remiderData :data})
}else if(data.reminder_type == 2){
    navigate(Screens.EDIT_BLOOD_SUGAR_REM_SCREEN,{remiderData :data})
}else if(data.reminder_type == 3){
    navigate(Screens.EDIT_WATER_REMINDER_SCREEN,{remiderData :data})
}

}
const callDetailsScreen=(data)=>{
        navigate(Screens.DETAILS_REMINDER,{remiderData :data})
    }
const callCheckStatus = (status,idd,reminder_type)=>{
    const body = {
        "is_active": status
       
    }
    props.postEditReminder("/redoapp/edit-reminder/"+idd+"/", body, props?.token,userId)
}
    const ReminderList = () => {

        return (
            <ScrollView style={{marginBottom:100}}>
                {props.allReminders?.map((data, index) => {
                    const [checked, setChecked] = useState(true);
                    return (
                        <View key={data.id} style={styles.cellContainer}>
                                    <View style={{flexDirection : 'column',width :"100%"}}>
                                    <View style={{flexDirection : 'row',width :"100%"}}>
                                        <TouchableOpacity onPress={() => {
                                        callDetailsScreen(data)
                                    }}style={{flexDirection : 'column',width :"50%"}}>
                                       <Text style={styles.keyBox}>{getReminderType(data.reminder_type)}</Text>
                                       {(data.reminder_type ==1 || data.reminder_type ==2) && (  <Text style={styles.keyBox}>{getFormatedTime(data.reminder_time[0]?.time_n)}</Text>)}
                                       {data.reminder_type ==3 && (  <Text style={styles.keyBox}>After {data.water_reminder_time} minutes</Text>)}
                                       {data.reminder_type ==3 && (  <Text style={styles.keyBox}>{getWaterVolume(data.water_type,data.customised_water)}</Text>)}
                                     {data.reminder_type ==1 && ( <View style={{flexDirection : 'row'}}>
                                       <Text style={styles.keyBox}>{data.dosage_volume}</Text>
                                       <MaterialCommunityIcons
                                style={{color:"#000",alignSelf : 'center',marginLeft:2,marginRight :2}}
                                name={"close-thick"}
                                size={15}
                            />
                                       <Text style={styles.keyBox}>{data.medicine_name}</Text>
                                       </View>)} 
                                       {data.reminder_type ==2 && ( <View style={{flexDirection : 'row'}}>
                                       {data.meal_type == 'pre_meal' && (<Text style={styles.keyBox}>Pre Meal</Text>)} 
                                      {data.meal_type == 'post_meal'&& (<Text style={styles.keyBox}>Post Meal</Text>)} 
                                       </View>)} 
                          
                                      </TouchableOpacity>
                                      <View style={{flexDirection : 'column',width :"50%",alignItems : 'flex-end'}}>
                                      <ToggleSwitch
                                        isOn={data.is_active}
                                        onColor="#4CBFC1"
                                        offColor="#E8F5E9"
                                        label={false}
                                        size="medium"
                                        onToggle={(value) => callCheckStatus(value,data.id,data.reminder_type,index)}
                                        />
                                      <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                                        callEditScreen(data)
                                    }}  >
                                            <Text style={{ color: 'red' }}>Edit</Text>
                                        </TouchableOpacity>
                                      </View>

                                      </View>
                                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator = {false}
                        data={data.reminder_time}
                        style={{marginTop :7}}
                        renderItem={({ item, intex }) => (
                            <View style={styles.checkcircle}>
                            <Text style={{ color: 'white', fontSize: 12 }}>{getFormatedDay(item?.days)}</Text>
                        </View>
                        )}
                        keyExtractor={item => item._id}
                    />
                           
                                        </View> 
                        </View>)
                })}

            </ScrollView>
        );
    }
    return (
        <SafeAreaView>
            <View style={styles.MainContainer}>
                <View style={styles.TopNav}>
                    <MaterialCommunityIcons
                        onPress={(e) => {  props.navigation.goBack() }}
                        style={{ fontSize: 25,marginLeft :15 }}
                        name="arrow-left"
                        backgroundColor="#3b5998"
                    />
                    <Text style={styles.topnavtext}>Reminder</Text>
                    <MaterialCommunityIcons
                        onPress={toggleModal}
                        style={{ fontSize: 30,position : 'absolute',right : 15,top :15,color : 'red' }}
                        name="plus-circle"
                    />
                </View>
                <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}>
          <View style={styles.centeredView}>
          <TouchableOpacity onPress={() => { setModalVisible(!isModalVisible) }}
              style={styles.cutCon}></TouchableOpacity>
            <View style={styles.modalView}>
            <View style={ { alignItems: "center", marginTop: 30,flexDirection : 'column',width :"100%",alignItems : 'center',justifyContent : 'center' }}>
            <TouchableOpacity  onPress={() => {
                                        navigate(Screens.MEDICINE_REMINDER,{userId : userId})
                                    }} style={ { flexDirection : 'row' ,height :60 ,width :"85%",alignSelf : 'center'}}>
           <Image
              style={{ width: 30, height: 30 ,alignSelf :'center'}}
              source={require('../../../../staticData/assests/medicine.png')}
            />
              <Text style={typeSelect == 'Medicine' ? styles.typeText1 : styles.typeText2}>Medicine</Text>
              <MaterialCommunityIcons
                                style={typeSelect == 'Medicine' ? styles.typeSelect1 : styles.typeSelect2}
                                name={typeSelect == 'Medicine' ? "radiobox-marked" : "radiobox-blank"}
                                size={20}
                            />
             </TouchableOpacity>
             <TouchableOpacity  onPress={() => {
                                        navigate(Screens.BLOOD_SUGAR_REM_SCREEN,{userId : userId})
                                    }} style={ { flexDirection : 'row' ,height :60 ,width :"85%",alignSelf : 'center'}}>
           <Image
              style={{ width: 30, height: 30 ,alignSelf :'center'}}
              source={require('../../../../staticData/assests/sugarblood.png')}
            />
              <Text style={typeSelect == 'Blood Sugar' ? styles.typeText1 : styles.typeText2}>Blood Sugar</Text>
              <MaterialCommunityIcons
                                style={typeSelect == 'Blood Sugar' ? styles.typeSelect1 : styles.typeSelect2}
                                name={typeSelect == 'Blood Sugar' ? "radiobox-marked" : "radiobox-blank"}
                                size={20}
                            />
             </TouchableOpacity>
             <TouchableOpacity  onPress={() => {
                                        navigate(Screens.WATER_REMINDER_SCREEN,{userId : userId})
                                    }} style={ { flexDirection : 'row' ,height :60 ,width :"85%",alignSelf : 'center'}}>
           <Image
              style={{ width: 30, height: 30 ,alignSelf :'center'}}
              source={require('../../../../staticData/assests/glasswater.png')}
            />
              <Text style={typeSelect == 'Water' ? styles.typeText1 : styles.typeText2}>Water</Text>
              <MaterialCommunityIcons
                                style={typeSelect == 'Water' ? styles.typeSelect1 : styles.typeSelect2}
                                name={typeSelect == 'Water' ? "radiobox-marked" : "radiobox-blank"}
                                size={20}
                            />
             </TouchableOpacity>
                        </View>
          </View>
          </View>
        </Modal>
                <View>
                    {props.allReminders?.length == 0 ?
                        <View style={styles.pageCenter}>
                            <MaterialCommunityIcons
                                style={{ color:"#47CACC"}}
                                name="bell"
                                size={40}
                            />
                            <View style={{flexDirection :'row',width :"70%",alignSelf : 'center'}}>
                            <Text style={{ color: '#707070', fontSize: 15, }}>No reminders have been added. Click icon to add reminders.</Text>
                            <MaterialCommunityIcons
                                    style={{ fontSize: 25, marginLeft: 5,color : "#3AA941" }}
                                    name="plus-circle"
                                />
                                </View>
                            {/* <Spinner visible={true}></Spinner> */}
                           
                        </View> :
                        <ReminderList />

                    }
                </View>
            </View>
        </SafeAreaView>
    )
}
const mapStateToProps = (state) => ({

    token: state.user.userData?.token,
    allReminders: state.reminder?.allReminders,
    update: state.reminder?.update,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAllReminders: (token,userId) => dispatch(ReminderAction.getAllReminders(token,userId)),
        postEditReminder: (url,body, token,userId) => dispatch(ReminderAction.postUpdateStatusReminder(url,body, token,userId)),
        dispatch  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderMainScreen);


const styles = StyleSheet.create({
    MainContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: DefaultSetting.white,
    },
    buttonStyle: {
        justifyContent: "center",
        backgroundColor: 'white',
        borderColor : 'red',
        borderWidth :1,
        marginTop :10,
        alignItems: 'center',
        height :25,
        borderRadius: 2,
        width:70,
    },
    cellContainer : {
        width: "90%",
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
                borderRadius: 5,
    },
    TopNav: {
        height: 55,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        padding: 13
    },
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
        marginHorizontal: 1, padding: 0, borderWidth: 0, backgroundColor: '#FFFFFF'
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
        paddingTop :3,
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
  });
