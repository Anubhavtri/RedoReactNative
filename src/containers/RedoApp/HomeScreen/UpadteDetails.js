import React, { useState } from 'react';
import {
  StyleSheet,
  Text,Alert,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Calendar from '../../../staticData/svg/Calendar.svg';
import { connect } from 'react-redux';
import Girl from '../../../staticData/svg/Girl.svg';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Boy from '../../../staticData/svg/Boy.svg';
import { Checkbox } from 'react-native-paper';
import Male from '../../../staticData/svg/Male.svg';
import Female from '../../../staticData/svg/Female.svg';
import Spinner from 'react-native-loading-spinner-overlay';
import locations from "../../../helpers/locations";
import { GETApi, POSTApi,DELETEApi, PUTApi } from "../../../app/ApiCall.js";
import { navigate, Screens } from '../../../helpers/Screens';
import Snackbar from 'react-native-snackbar';
const { height, width } = Dimensions.get('window');
 function validateHeight (height,type){
  var newType = false
    if(type){
      if(height < 4){
        newType =true
      }else {
        newType = false
      }
    }else {
      if(height < 121){
        newType =true
      }else {
        newType = false
      }
    }
    return  newType
 }
 function validateWeight (weight){
  console.log("weight :"+weight)
  var newType = false
  if(weight < 30){
    newType =true
  }else {
    newType = false
  }
    return  newType
 }
const UpadteDetails = props => {
  const item = props?.route?.params?.customParam;
  const [parentId, setParentId] = useState(item?.parentId)
  const [userId, setUserId] = useState(item?.userId)
  const [spinnerShow, setSpinnerShow] = useState(false)
  const [inch, setinch] = useState(false);
  const [ftinbutton, setftinbutton] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [kgbtn, setkgbtn] = useState(true);
  const [lbsbtn, setlbsbtn] = useState(false);
  const [DateModal, setDateModal] = useState(false);
  const [name, setName] = useState(item?.name);
  const [gender, setGender] = useState(item?.gender);
  const [DOB, setDOB] = useState(new Date(moment(new Date(item?.dob))));
  const [weight, setWeight] = useState(item?.weight+'');
  const [weightlbs, setWeightlbs] = useState();
  const [height, setHeight] = useState(item?.height+'');
  const [showDate, setshowDate] = useState(true)

  const [errorName, setErrorName] = useState(null);

  const _nameValidate = name => {
    var nameRegex = /^[A-Za-z ]+$/;
    if (name === '') {
      setErrorName('*Please enter name.');
    } else if (!nameRegex.test(name) || name === " ") {
      setErrorName('*Please enter valid name.');
    } else {
      setErrorName(null);
    }
  };

  const createUser = (typeCall) => {
    if (name == null) {
      alert('Enter Your name');
    } else if (gender == '') {
      alert('Select your gender');
    } else if (height == null) {
      alert('Enter your height');
    } else if (validateHeight(height,ftinbutton)) {
      alert('Height must be greater than 4 ft');
    }else if (weight == null) {
      alert('Enter your weight');
    } else if (validateWeight(weight)) {
      alert('Weight must be greater than 30 kg');
    }else if (checked == '') {
      alert('Click T&C');
    } else if (showDate == '') {
      alert('Enter your date of birth');
    } else if (errorName) {
      alert('Enter valid name.');
    } else {
      console.log("height : "+height)
      var newHight = 0
      if(ftinbutton){
        newHight = height *30.48
        if(inch != ''){
          newHight =newHight + inch * 2.54
        }
        newHight =  (newHight).toFixed(2)
      }else {
        newHight = height
      }
      console.log("newHight : "+newHight)
      const body = {
        id :userId,
        name: name,
        display_name: name,
        gender: gender,
        dob: moment(DOB).format('YYYY-MM-DD'),
        weight: parseFloat(weight),
        height: parseFloat(newHight),
        parent: parentId,
      };
      console.log("body : "+JSON.stringify(body))
      if(typeCall == 'delete'){
        deleteUser(body)
      }else{
        callAddApiDetails(body)
      }
    }
  };
  const callAddApiDetails= async(body)=>{
    setSpinnerShow(true)
    var getResult = await PUTApi("/redoapp/unique-user/"+userId+"/",body,props?.token)
    if(getResult.error){
     setSpinnerShow(false)
     alert(getResult.message)
    }else {
     setSpinnerShow(false)
      Snackbar.show({
        text: 'Details Updated Successfully',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor : 'green',
        textColor : 'white',
      });
      
      props.navigation.goBack()
  
    }
}
const callDeleteDialog = ()=>{
  Alert.alert(
      "Delete User?",
      "Are you sure, you want to delete this user",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            createUser("delete");
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
 }
 const deleteUser = async(body)=>{
  setSpinnerShow(true)
  var getResult = await DELETEApi("/redoapp/unique-user/"+userId+"/",body,props?.token)
  if(getResult.error){
   setSpinnerShow(false)
   alert(getResult.message)
  }else {
   setSpinnerShow(false)
   Snackbar.show({
      text: 'Deleted Successfully',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor : 'green',
      textColor : 'white',
    });
    props.navigation.goBack()
  }
}

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  return (
    <SafeAreaView>
        <Spinner visible={spinnerShow}></Spinner>
    
      <ScrollView style={styles.mainContainer}>
        <View style={styles.secCon}>
          <TouchableOpacity>
            <View style={styles.arrowCon}>
              <MaterialCommunityIcons
                onPress={e => {
                  props.navigation.goBack();
                }}
                style={{ fontSize: 24, color: '#707070' }}
                name="arrow-left"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headCon}>
            <Text style={styles.txtHead}>Personal Details</Text>
            <AntDesign
                     onPress={(e) => callDeleteDialog()}
                        style={{ fontSize: 20, color: '#E5184E',position :'absolute',right :10,top:20 }}
                        name='delete'
                    />
          </View>
        </View>
        <View style={styles.scrollCon}>
          <ScrollView>
            <View style={styles.namCon}>
              <Text style={styles.namTxt}>What's your name</Text>
            </View>
            <View style={styles.regSps}>
              <TextInput
                onChangeText={value => {
                  setName(value.replace(/  +/g, ' '))
                  _nameValidate(value.replace(/  +/g, ' '))
                }}
                value={name}
                style={styles.txtIp}
                placeholder="Enter Name"
                placeholderTextColor={'#A2A2A2'}
              />
              {errorName != null ? (
                <View style={styles.redCon}>
                  <Text style={styles.redTxt}>
                    {errorName}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.namCon}>
              <Text style={styles.namTxt}>What's your date of birth</Text>
            </View>
            <View style={styles.regSps}>
              <DismissKeyboard>
                <TextInput
                  style={styles.txtIp}
                  value={showDate ? JSON.stringify(moment(DOB).format('DD-MM-YYYY')).slice(1, 11) : null}
                  placeholder="dd-mm-yyyy"
                  placeholderTextColor={'#A2A2A2'}
                  maxLength={10}
                  onFocus={() => {
                    setDateModal(true)

                  }}
                />
              </DismissKeyboard>
            </View>
            <DatePicker
              modal
              open={DateModal}
              mode="date"
              date={DOB}
              maximumDate={new Date()}
              onConfirm={date => {
                setDateModal(false);
                setDOB(date);
                setshowDate(true)
              }}
              onCancel={() => {
                setDateModal(false);
              }}
            />
            <View style={styles.namCon}>
              <Text style={styles.namTxt}>Select your gender</Text>
            </View>
            <View style={styles.regSp}>
              <View style={styles.genCon}>
                {gender =='male' ? <Girl /> : <Male />}
                {gender =='male' ? <Female /> : <Boy />}
              </View>
            </View>
            <View style={styles.genBox}>
              <TouchableOpacity
                onPress={() => {
                  setGender('male');
                }}
                style={gender =='male' ? styles.femaleCon : styles.maleCon}>
                <Text style={gender =='male' ? styles.ftTxt2 : styles.ftTxt}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setGender('female');
                }}
                style={gender =='female' ? styles.femaleCon : styles.maleCon}>
                <Text style={gender =='female' ? styles.ftTxt2 : styles.ftTxt}>Female</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.heightCon}>
              <Text style={styles.heiTxt}>Select your height</Text>
              <View style={styles.smallCon}>
                <TouchableOpacity
                  onPress={() => {
                    setftinbutton(true);
                    setHeight('')
                    setinch('')
                  }}
                  style={ftinbutton ? styles.smallCot : styles.smallCons}>
                  <Text style={ftinbutton ? styles.ftTxt2 : styles.ftTxt}>ft</Text>
                </TouchableOpacity>
                <View style={!ftinbutton ? styles.smallConses : styles.smallConse}>
                  <TouchableOpacity
                    onPress={() => {
                      setftinbutton(false);
                      setHeight('')
                      setinch('')
                    }}>
                    <Text style={!ftinbutton ? styles.ftTxt2 : styles.ftTxt}>cm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {ftinbutton ?
              <View style={styles.dirCon}>
                <View style={styles.ftCon}>
                  <TextInput
                    onChangeText={value => {
                      setHeight(value);
                    }}
                    value={height}
                    style={styles.txtInput}
                    keyboardType="numeric"
                    maxLength={1}
                  />
                </View>
                <View style={styles.sizeCon}>
                  <Text style={styles.sizeTxt}>ft</Text>
                </View>
                <View style={styles.ftCon}>
                  <TextInput
                    onChangeText={(value) => {
                      if (!isNaN(value) && value < 12)
                        setinch(value)
                    }}
                    value={inch}
                    style={styles.txtInput}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.sizeCon}>
                  <Text style={styles.sizeTxt}>in</Text>
                </View>
              </View>
              :
              <View style={styles.dirCon}>
                <View style={styles.ftCon}>
                  <TextInput
                    onChangeText={value => {
                      if (!isNaN(value) && value < 230){
                        setHeight(value);
                      }
                    
                    }}
                    value={height}
                    style={styles.txtInput}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.sizeCon}>
                  <Text style={styles.sizeTxt}>cm</Text>
                </View>
              </View>
            }

            <View style={styles.heightCon}>
              <Text style={styles.heiTxt}>Select your weight</Text>
              <View style={styles.smallCon}>
                <TouchableOpacity
                  onPress={() => {
                    setlbsbtn(false);
                    setkgbtn(true);
                  }}
                  style={kgbtn ? styles.smallCot : styles.smallCons}>
                  <Text style={kgbtn ? styles.ftTxt2 : styles.ftTxt}>kg</Text>
                </TouchableOpacity>
                <View style={lbsbtn ? styles.smallConses : styles.smallConse}>
                  <TouchableOpacity
                    onPress={() => {
                      setkgbtn(false);
                      setlbsbtn(true);
                    }}>
                    <Text style={lbsbtn ? styles.ftTxt2 : styles.ftTxt}>lbs</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {kgbtn ?
              <View style={styles.dirCon}>
                <View style={styles.ftCon}>
                  <TextInput
                    onChangeText={(value) => {
                      if (!isNaN(value) && value < 1000 && value > 0) {
                        setWeight(value)
                      } else if (value == "") {
                        setWeight(value)
                      }
                    }}
                    value={weight}
                    style={styles.txtInput}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.sizeCon}>
                  <Text style={styles.sizeTxt}>kg</Text>
                </View>
              </View> :
              <View style={styles.dirCon}>
                <View style={styles.ftCon}>
                  <TextInput
                    onChangeText={value => {
                      if (!isNaN(value) && (value * 0.45359237) < 100 && (value * 0.45359237) > 0) {
                        setWeightlbs(value)
                        setWeight(value * 0.45359237)
                      } else if (value == "") {
                        setWeightlbs(value)
                        setWeight(0*0.45359237)
                      }
                    }}
                    value={weightlbs}
                    style={styles.txtInput}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.sizeCon}>
                  <Text style={styles.sizeTxt}>lbs</Text>
                </View>
              </View>}

            <View style={styles.agreeCon}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text style={styles.agreeTxt}>I agree to T&C</Text>
            </View>
            <View style={styles.btnCon}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnBox}
                onPress={() => {
                  createUser("edit");

                }}>
                <Text style={styles.btnTxt}>Update Information</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  token: state.user.userData?.token,
});

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpadteDetails);

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#FFFFFF',
  },
  scrollCon: {
    height: height / 1.13,
  },
  secCon: {
    height: height / 13,
    width: width / 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    // backgroundColor: 'green'
  },
  arrowCon: {
    height: height / 13,
    width: width / 7,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },
  headCon: {
    height: height / 13,
    width: width / 1.3,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    // alignItems: 'center',
  },

  txtHead: {
    color: '#707070',
    // backgroundColor: '#707070',
    fontSize: height / 45,
    fontFamily: 'Jost-Medium',
  },
  namCon: {
    height: height / 13,
    width: width / 1.15,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  namTxt: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 16,
    marginTop: 10,
  },
  regSp: {
    height: height / 12,
    width: width / 1.15,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  regSps: {
    height: height / 12,
    width: width / 1.15,
    // backgroundColor: 'blue',
    alignSelf: 'center',
  },
  txtIp: {
    height: height / 16,
    width: width / 1.15,
    // backgroundColor: 'lightblue',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  redCon: {
    height: height * 0.02,
    width: width / 1.15,
    alignSelf: 'center'
  },
  redTxt: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Jost-Regular'
  },

  txtIps: {
    height: height / 16,
    width: width / 1.35,
    // backgroundColor: 'lightblue',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  calCon: {
    height: height / 15,
    // backgroundColor: 'cyan',
    width: width / 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genCon: {
    height: height / 16,
    width: width / 3,
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genBox: {
    height: height / 12,
    width: width / 1.6,
    // backgroundColor: 'blue',
    // alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  maleCon: {
    height: height / 16,
    width: width / 4.5,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center',
  },
  femaleCon: {
    height: height / 16,
    width: width / 4.5,
    backgroundColor: '#47CACC',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maleTxt: {
    color: '#A2A2A2',
    fontFamily: 'Jost-Medium',
    fontSize: 14,
  },
  maleTxts: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 14,
  },
  heightCon: {
    height: height / 12,
    width: width / 1.15,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heiTxt: {
    color: '#707070',
    fontFamily: 'Jost-Medium',
    fontSize: 16,
  },
  smallCon: {
    height: height / 23,
    width: width / 5,
    // backgroundColor: 'pink',
    borderRadius: 5,
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
  dirCon: {
    height: height / 13,
    width: width / 1.15,
    // backgroundColor: 'lightblue',
    alignSelf: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  txtInput: {
    fontFamily: 'Jost-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    // backgroundColor: 'green',
    width: width / 6.5,
    paddingBottom: 8,
    height: height / 15,


  },
  ftCon: {
    // backgroundColor: 'yellow', 
    height: height / 20,
    width: width / 6.5,
    borderBottomWidth: 0.5,
    borderColor: '#000000',
    //  paddingTop: 10
  },
  sizeCon: {
    height: height / 20,
    width: width / 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'cyan'
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
  sizeTxt: {
    color: '#707070',
    fontFamily: 'Jost-Regular',
    fontSize: 16,
  },
  agreeCon: {
    height: height / 13,
    width: width / 1.15,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreeTxt: {
    color: '#707070',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
  btnCon: {
    marginTop: 20,
    height: height / 5,
    width: width / 1.15,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnBox: {
    height: height / 15,
    width: width / 1.15,
    backgroundColor: '#E5184E',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  btnTxt: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Jost-Medium',
  },
});