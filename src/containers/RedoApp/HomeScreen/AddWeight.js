import React, { useState,useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View ,TextInput,BackHandler} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { navigate, resetScreen, Screens } from '../../../helpers/Screens';
import { connect } from 'react-redux';
import Pie from 'react-native-pie'
import Spinner from 'react-native-loading-spinner-overlay';
import { GETApi ,POSTApi} from "../../../app/ApiCall.js";
import locations from "../../../helpers/locations";
export const AddWeight = (props) => {
    const item = props?.route?.params?.customParam;
    const [parentId, setParentId] = useState(item?.parentId)
    const [userId, setUserId] = useState(item?.userId)
    const [weight, setWeight] = useState('')
    const [DateModal, setDateModal] = useState(false);
    const [DateSelect, setDateSelect] = useState(new Date());
    const [sectionData, setSectionData] = useState([])
    const [spinnerShow, setSpinnerShow] = useState(false)
    const backAction = () => {
        navigate(Screens.REDO_TAB)
        return true;
      };
    useEffect(() => {
        callApiDetails("/redoapp/get-unique-customer?uc_id="+userId)
        var newArray = []
        newArray.push({
            percentage: 50,
            color: '#659AC9',
        })
        newArray.push({
            percentage: 50,
            color: '#707070',
        })
       setSectionData(newArray)
       BackHandler.addEventListener("hardwareBackPress", backAction);
    
       return () =>
         BackHandler.removeEventListener("hardwareBackPress", backAction);
     }, [])
    const callApiDetails = async(url)=>{
        setSpinnerShow(true)
        var getResult = await GETApi(url,props?.token)
        if(getResult.error){
         setSpinnerShow(false)
         alert(getResult.message)
        }else {
         setSpinnerShow(false)
         setWeight(getResult?.data?.last_weight?.last_weight+"")
        }
    }
    const addUSerWeight = async() => {
        if (DateSelect  == null) {
          alert('Select Date');
        }  else if (weight == "") {
          alert('Select your weight');
        } else if (weight <30) {
            alert('Weight must be greater than 30 kg');
          }else {
          const body = {
            "weight":weight,
             "date": moment(DateSelect).format('YYYY-MM-DD'),
          };
          setSpinnerShow(true)
          var getResult = await POSTApi(locations.ADD_WEIGHT+"?uc_id="+userId,body,props?.token)
          if(getResult.error){
           setSpinnerShow(false)
           alert(getResult.message)
          }else {
           setSpinnerShow(false)
           setWeight(getResult?.data?.last_weight?.last_weight+'')
           navigate(Screens.REDO_TAB)
          }
        }
      };
      const onWeight = (value)=>{
           setWeight(value)
           var newArray = []
           newArray.push({
               percentage: value/2,
               color: '#659AC9',
           })
           newArray.push({
               percentage: (200-value)/2,
               color: '#707070',
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
                            onPress={(e) => {  navigate(Screens.REDO_TAB) }}
                            style={{ fontSize: 24, color: '#707070' }}
                            name="arrow-left"
                        />
                    </View>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>Add Weight</Text>
                    </View>
                    <AntDesign
                     onPress={(e) => setDateModal(true)}
                        style={{ fontSize: 20, color: '#E5184E' }}
                        name='calendar'
                    />
                </View>
                

                <View style={styles.graphCon}>
                    <View style={styles.dateCon}>
                        <Text style={styles.ardTxt}>{JSON.stringify(moment(DateSelect).format('DD, MMM YYYY')).slice(1, 13)}</Text>
                    </View>
                    <View style={styles.chartCon}>
                       
                    <Pie
              radius={80}
              innerRadius={50}
              sections={sectionData}
              strokeCap={'butt'}
            />
            <View style={styles.oneTxt}>
         <Text style={{ color: '#47CACC',  fontSize: 25,textAlign : 'center', fontFamily: 'Jost-Medium',}}>{weight}</Text>
        <Text style={{ color: '#47CACC',  fontSize: 15,textAlign : 'center', fontFamily: 'Jost-Medium',}}>Kg(s)</Text>
            </View>
           
                       
                    </View>
                    <View style={styles.addCon}>
                        <Text style={styles.addTxt}>Add weight here</Text>
                    </View>
                    <View style={styles.btnSpace}>
                        <TextInput
                onChangeText={value => {
                    if (!isNaN(value) && value <= 200 && value > 0) {
                        onWeight(value);
                      } else if (value == "") {
                        onWeight(value);
                      }
                }}
                value={weight}
                maxLength={3}
                style={styles.btnCons}
                placeholder="Weight"
                placeholderTextColor={'#A2A2A2'}
                keyboardType='numeric'
              />
             
                        <TouchableOpacity style={styles.btnCon} onPress={() => {
                  addUSerWeight();

                }}>
                            <Text style={styles.wightTxt}>Add Weight</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <DatePicker
              modal
              open={DateModal}
              mode="date"
              date={DateSelect}
              maximumDate={new Date()}
              onConfirm={date => {
                setDateModal(false);
                setDateSelect(date);
              }}
              onCancel={() => {
                setDateModal(false);
              }}
            />
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    token: state.user.userData?.token,
    weight: state.user.userData?.weight,
  });
  
  const mapDispatchToProps = dispatch => {
    return {
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddWeight);

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
    directCon: {
        height: height / 20,
        width: width / 1,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F5F5F5'
    },
    ardTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    addTxt: {
        color: '#353333',
        fontSize: 16,
        fontFamily: 'Jost-Medium',
    },
    wightTxt: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    stepTxt: {
        color: '#C9C9C9',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    graphCon: {
        height: height / 2.3,
        width: width / 1,
        backgroundColor: '#F2F2F2',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    dateCon: {
        height: height / 17,
        width: width / 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',

    },
    addCon: {
        height: height / 25,
        width: width / 1.15,
        // backgroundColor: 'blue',
        justifyContent: 'flex-end',
    },
    btnSpace: {
        height: height / 15,
        width: width / 1.15,
        // backgroundColor: 'blue',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end'

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
    btnCon: {
        height: height / 20,
        width: width / 2.5,
        backgroundColor: '#E5184E',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    btmCon: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#E5184E'
    },
    btmCons: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'cyan',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtCols: {
        color: '#2E2E2E',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    },
    txtCol: {
        color: '#A2A2A2',
        fontSize: 14,
        fontFamily: 'Jost-Regular',
    },
    chartCon: {
        height: height / 4,
        width: width / 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    oneTxt: {
         position : 'absolute',top :80,left :180,
        flexDirection : 'column',
    },
    twoTxt: {
        color: '#707070',
        fontSize: 18,
        fontFamily: 'Jost-Regular',
    },


})
