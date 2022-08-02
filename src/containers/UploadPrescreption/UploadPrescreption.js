// import React, { useState, useEffect, useRef } from 'react'
// import { connect } from 'react-redux'
// import { Dimensions, Modal, Pressable, StyleSheet, Text, Touchable, View, Button, Linking, } from 'react-native'
// import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
// import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo';
// import { create } from '../../helpers/PlatformSpecificStyles';
// import UploadPrescreptionStyle from './UploadPrescreptionStyle';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DocumentPicker from 'react-native-document-picker'
// import Geolocation from "react-native-geolocation-service";
// import crashlytics from '@react-native-firebase/crashlytics';
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapInputField from './UploadPrescreptionSeearchInput';
// import Actions from './UploadPrescreptionAction'
// import { Screens, navigate } from '../../helpers/Screens';
// const { height, width } = Dimensions.get('screen');
// // import UpdatesMaps from './UploadPrescreptionMaps';
// import RNFS from 'react-native-fs';
// import axios from 'axios';
// import Constants from '../../staticData/Constants';

// import UpdatesMaps from './UploadPrescreptionSeearchInput';

// export const UploadPrescreption = (props) => {

//     const [location, setLocation] = useState(null)

//     const [mmitoken, setmmitoken] = useState("");
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalVisibles, setModalVisibles] = useState(false);
//     const [contactname, setcontactname] = useState()
//     const [contactnumber, setcontactnumber] = useState()
//     const [patientname, setpatientname] = useState();
//     const [age, setage] = useState();
//     const [pdf, setpdf] = useState()
//     const [testdetails, settestdetails] = useState('')
//     const [gender, setgender] = useState()
//     const [patientMapAddress, setpatientMapAddress] = useState()
//     const [show, setshow] = useState(false)
//     const [pdffile, setpdffile] = useState()
//     const [address, setaddress] = useState()
//     const [city, setcity] = useState()
//     const [response, setresponse] = useState(props.uploadresponse?.uploadprescreptionresponse)
//     const [autosuggestionlist, setautosuggestionlist] = useState()



//     const [Name, setName] = useState('');
//     const [errorName, setErrorName] = useState(null);
//     const [Names, setNames] = useState('');
//     const [errorNames, setErrorNames] = useState(null);
//     const [Number, setNumber] = useState('');
//     const [errorNumber, setErrorNumber] = useState(null);
//     const [Age, setAge] = useState('');
//     const [errorAge, setErrorAge] = useState(null);

//     const [check, setcheck] = useState(false)
//     console.log(props.uploadresponse?.uploadprescreptionresponse?.mobile, "response aa gya")

//     const _nameValidate = name => {
//         var nameRegex = /^[A-Za-z ]+$/;
//         if (name === '') {
//             setErrorName('*Please enter name.');
//         } else if (!nameRegex.test(name)) {
//             setErrorName('*Please enter valid name.');
//         } else {
//             setErrorName(null);
//         }
//     };
//     const _namesValidate = names => {
//         var namesRegex = /^[A-Za-z ]+$/;
//         if (names === '') {
//             setErrorNames('*Please enter name.');
//         } else if (!namesRegex.test(names)) {
//             setErrorNames('*Please enter valid name.');
//         } else {
//             setErrorNames(null);
//         }
//     };
//     const _numbervalidate = number => {
//         var numberRegex =
//             /^[0]?[6789]\d{9}$/;
//         if (number === '') {
//             setErrorNumber('');
//         } else if (/([A-Z]+)/g.test(number) && number.length < 8) {
//             setErrorNumber(
//                 '*Please enter a special character and length must be 8 digit.',
//             );
//         } else if (!numberRegex.test(number)) {
//             setErrorNumber('Enter A Valid Number');
//         } else {
//             setErrorNumber(null);
//         }
//     };
//     const _ageValidate = age => {
//         var ageRegex = /^100|[1-9]?\d$/;
//         if (age === '') {
//             setErrorAge('*Please enter age.');
//         } else if (!ageRegex.test(age)) {
//             setErrorAge('*Enter valid age.');
//         } else {
//             setErrorAge(null);
//         }
//     };
//     const validate = () => {
//         let flag = true;
//         if (Name === '') {
//             setErrorName('*Please enter name.');
//             flag = false;
//         }
//         if (Number === '') {
//             setErrorPassword('*Please enter number.');
//             flag = false;
//         }
//         if (Age === '') {
//             setErrorAge('*Please enter age.');
//             flag = false;
//         }
//         if (Names === '') {
//             setErrorNames('*Please enter name.');
//             flag = false;
//         }
//         return flag;
//     };
//     // error messages 

//     const [namemessage, setnamemessage] = useState()
//     const [phonemessage, setphonemessage] = useState()
//     const [agemessage, setagemessage] = useState()

//     console.log(contactname, contactnumber, patientname, age, testdetails)

//     const file = async () => {
//         try {
//             const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.allFiles],
//             });
//             console.log(res, "pdf details")

//             setpdf(res)
//             RNFS.readFile(res[0].uri, 'base64').then(respondsw => { setpdffile(`data:${res[0].type};base64,${respondsw}`, "<<<<<<<") })
//             // details()
//         } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//                 // User cancelled the picker, exit any dialogs or menus and move on
//             } else {
//                 throw err; SSSSSS
//             }
//         }
//     }

//     const details = () => {
//         console.log("guguggaga ale ale")

//     }


//     const handleLocationPermission = async () => { // 👈
//         let permissionCheck = '';
//         if (Platform.OS === 'ios') {
//             permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//             if (
//                 permissionCheck === RESULTS.BLOCKED ||
//                 permissionCheck === RESULTS.DENIED
//             ) {
//                 const permissionRequest = await request(
//                     PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
//                 );
//                 permissionRequest === RESULTS.GRANTED
//                     ? console.warn('Location permission granted.')
//                     : console.warn('location permission denied.');
//             }
//         }

//         if (Platform.OS === 'android') {
//             permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

//             if (
//                 permissionCheck === RESULTS.BLOCKED ||
//                 permissionCheck === RESULTS.DENIED
//             ) {
//                 const permissionRequest = await request(
//                     PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//                 );
//                 permissionRequest === RESULTS.GRANTED
//                     ? console.warn('Location permission granted.')
//                     : console.warn('location permission denied.');
//             }
//         }
//     };

//     useEffect(() => {
//         handleLocationPermission()
//     }, [])


//     const regx = /^[6-9]\d{9}$/;

//     const ageregx = /^[0-9]\d{1}$/;

//     const car = /^[A-Za-z ]+$/;

//     const eid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;


//     const Render = () => {
//         return (
//             <View style={styles.txtDirection}>
//                 {pdf?.map((item) => {
//                     return (
//                         <View>
//                             {item?.size <= 500000 ?
//                                 <Text style={styles.txtFile} numberOfLines={1} >{item.name}</Text>
//                                 : alert("File size should be less then 5Mb")}
//                         </View>
//                     )
//                 })}
//             </View>
//         )
//     }

//     const handelUpload = () => {
//         setcheck(false)
//         // alert("working every time")
//         const body = {
//             "name": Name,
//             "age": age,
//             "testname": testdetails,
//             "mobile": Number,
//             "gender": gender,
//             "parent_name": Names,
//             "base64file": pdffile,
//             "address": `${address}${city}`,
//             "city": city,
//             "source": 'mobile app'
//         };
//         console.log(body, props.token, "Upload Prescreption");
//         props.uploadprescreption(body, props.token)
//         setNames('')
//         setNumber('')
//         settestdetails('')
//         setage('')
//         setpdf()
//         setcity()
//         setgender()
//         settestdetails()
//         setaddress('')
//         console.log(response, "response i want")
//         // setTimeout(() => {
//         if (props.uploadresponse?.uploadprescreptionresponse?.mobile) {
//             // alert("Your Form is Submitted")
//             setModalVisibles(true)

//         }
//         setTimeout(() => {
//             setModalVisibles(true)
//         }, 500);
//         // }, 200);
//     }
//     console.log(location, "the current location")

//     // const [pin, setPin] = React.useState({
//     //     latitude: 37.78825,
//     //     longitude: -122.4324
//     // })
//     // const [region, setRegion] = React.useState({
//     //     latitude: 37.78825,
//     //     longitude: -122.4324,
//     //     latitudeDelta: 0.0922,
//     //     longitudeDelta: 0.0421
//     // })

//     // map updates

//     const [pin, setPin] = React.useState({
//         latitude: 28.601296309799093,
//         longitude: 77.36977127782859
//     })
//     const [region, setRegion] = React.useState({
//         latitude: 28.601296309799093,
//         longitude: 77.36977127782859,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//     })
//     var _mapView = MapView;
//     const [state, setstate] = useState(null)
//     const mapRef = useRef(null);
//     const gotoPlace = (lat, lng) => {
//         const SearchedRegion = {
//             latitude: lat,
//             longitude: lng,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//         };
//         mapRef.current.animateToRegion(SearchedRegion, 3 * 1000);
//     }

//     // map my india logic for address search

//     useEffect(() => {
//         // if (trackPhlebo == true) {
//         getmmitoken();
//         // }
//     }, [])

//     const getmmitoken = () => {
//         console.log("entererd token")
//         const params = new URLSearchParams()
//         params.append('grant_type', 'client_credentials')
//         params.append('client_id', '33OkryzDZsKamfiPiKFdn3JedW3I1sO_efflBdDslqsmTSZmsD2SPw4DU3SPC459TYVRlA4DUCLLpIoO5jAOJQ==')
//         params.append('client_secret', 'lrFxI-iSEg8wS11NUoDEndR2zcztS6p73mr5dC4bfgeS1SSbfOhj2SKP-Vh0gbPinqh-w3f66JbgvjrDuq5OdXMZYOVLEuEG')

//         const config = {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }

//         axios.post('https://outpost.mapmyindia.com/api/security/oauth/token', params, config)

//             .then(({ data }) => {
//                 // console.log("mmi data", data.access_token);
//                 setmmitoken(data.access_token)
//             })
//             .catch(function (error) {
//                 console.log("error", error);
//             });
//     }

//     console.log(mmitoken, "myindiatoken in upload prescreption")

//     const autosugestions = (val) => {
//         axios.get(`https://atlas.mapmyindia.com/api/places/search/json?query=${val}&access_token=${mmitoken}&tokenizeAddress=true`).then((data) => {
//             console.log(data?.data?.suggestedLocations, "autosearch data")
//             setautosuggestionlist(data?.data?.suggestedLocations)
//         }).catch((error) => {
//             console.log(error, "error")
//         })
//     }

//     console.log(autosuggestionlist, "suggestion from map my india")

//     console.log(address , "shubham")
    

//     return (
//         <SafeAreaView>
//             <View style={styles.mainContainer}>
//                 <ScrollView 
//                 showsVerticalScrollIndicator={false}
//                 style={styles.scrollStyle}>
//                     {/* <Pressable
//                     onPress={()=>{
//                         setshow(false)
//                     }}
//                     > */}
//                     <View style={styles.secCon}>
//                         <TouchableOpacity >
//                             <View style={styles.arrowCon}>
//                                 <MaterialCommunityIcons
//                                     onPress={(e) => { props.navigation.goBack() }}
//                                     style={{ fontSize: 25 }}
//                                     name="arrow-left"
//                                     backgroundColor="#3b5998"
//                                 />
//                             </View>
//                         </TouchableOpacity>
//                         <View style={styles.headCon}>
//                             <Text style={styles.txtHead}>Upload Prescription</Text>
//                         </View>
//                     </View>

//                     <View
//                         style={styles.testingCon}
//                     >
//                         <Text style={styles.testingTxt}>
//                             Testing from home in 60 minutes across, for 2200+ tests Following NABL, ISO, ICMR standards | Rated 4.7/5 by 1600+ customers
//                         </Text>
//                     </View>

//                     <View style={styles.popularCon}>
//                         <Text style={styles.popularTxt}>
//                             <Text style={{ fontWeight: 'bold', color: '#E5184E' }}>Popular tests:</Text> Full Body Checkup, Prescription tests, Covid RT PCR, CBC, Hba1c, Lipid, Thyroid, Blood glucose, Vitamin D, Vitamin B12, Urine, CRP, Covid antibody, LFT, KFT
//                         </Text>
//                     </View>

//                     <View style={styles.popularCons}>
//                         <View style={styles.whatsappCon}>
//                             <Text style={{ fontWeight: 'bold', color: '#E5184E', fontFamily: 'Jost-Regular', }}
//                             >You can also upload your prescription through whatsapp.</Text>
//                         </View>
//                         <View style={styles.whatsCon}>
//                             <MaterialCommunityIcons
//                                 onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=918988988787&amp;text=Hi, I am looking to book my health checkup. Please assist me with the diagnostic test details.')}
//                                 style={{ fontSize: 25, color: 'white', }}
//                                 name="whatsapp"
//                                 backgroundColor="#3b5998"
//                             />
//                         </View>

//                     </View>
//                     <View style={styles.InputCon}>
//                         <View style={styles.informCon}>
//                             <Text style={styles.informTxt}>What is your contact information?</Text>
//                         </View>
//                         <View style={styles.inputField}>
//                             <TextInput value={Name}
//                                 placeholder="Enter Name*"
//                                 style={styles.txtInput}
//                                 onChangeText={txt => {
//                                     setName(txt), _nameValidate(txt);
//                                 }}
//                                 autoCapitalize="none"
//                             />
//                             {errorName != null ? (
//                                 <View
//                                     style={styles.redCon}>
//                                     <Text
//                                         style={styles.redTxt}>
//                                         {errorName}
//                                     </Text>
//                                 </View>
//                             ) : null}
//                         </View>

//                         {namemessage ? <Text style={{ color: 'red' }}>{namemessage}</Text> : null}
//                         <View style={styles.inputField}>
//                             <View style={styles.txtIps}>
//                                 <View style={styles.numCon}>
//                                     <Text style={styles.indTxt}>+91</Text>
//                                 </View>
//                                 <TextInput
//                                     style={styles.txtIp}
//                                     value={Number}
//                                     placeholder='Enter Mobile Number*'
//                                     maxLength={10}
//                                     keyboardType={'numeric'}
//                                     onChangeText={txt => {
//                                         setNumber(txt), _numbervalidate(txt);
//                                     }}
//                                     autoCapitalize="none"
//                                 />
//                             </View>
//                             {errorNumber != null ? (
//                                 <View
//                                     style={styles.redCon}>
//                                     <Text
//                                         style={styles.redTxt}>
//                                         {errorNumber}
//                                     </Text>
//                                 </View>
//                             ) : null}
//                         </View>
//                         {phonemessage ? <Text style={{ color: 'red' }}>{phonemessage}</Text> : null}
//                     </View>
//                     <View style={styles.spaceGaping}>
//                         <View style={styles.InputContainer}>
//                             <View style={styles.informCon}>
//                                 <Text style={styles.informTxt}>Address for collection?</Text>
//                             </View>
//                             <View style={styles.inputField}>
//                                 <View style={styles.txtStyle}>
//                                     {city ?

//                                         <View style={styles.flexLoc}>
//                                             <View style={{ width: width / 1.48, }}>
//                                                 <Text style={[styles.citytext, Constants.fontType.jRegular,]}>{city}</Text>
//                                             </View>
//                                             <Pressable style={styles.cutTxt}
//                                                 onPress={() => {
//                                                     setcity('')
//                                                     setcheck(false)
//                                                 }}>
//                                                 <Entypo
//                                                     name="circle-with-cross"
//                                                     style={{
//                                                         fontSize: 15
//                                                     }}
//                                                 />
//                                             </Pressable>

//                                         </View>

//                                         :
//                                         <TextInput
//                                             placeholder="Search Places Here"
//                                             style={styles.txtCon}
//                                             onChangeText={(e) => {
//                                                 autosugestions(e)
//                                                 setcheck(true)
//                                             }}>
//                                         </TextInput>

//                                     }
//                                 </View>
//                                 {check ?
//                                     <View>
//                                         {city ? null :
//                                             <View style={styles.cityCon}>
//                                                 <ScrollView>
//                                                     {autosuggestionlist && autosuggestionlist.map((item, val) => {
//                                                         // if (val < 5) {
//                                                         return (

//                                                             <View
//                                                                 style={{ minHeight: 40, zIndex: 10 }}>
//                                                                 <Pressable
//                                                                     style={styles.locationCon}
//                                                                     onPress={() => {
//                                                                         setcity(item?.placeAddress)
//                                                                     }}
//                                                                 >
//                                                                     <Text style={{ paddingHorizontal: 10, }}>{item?.placeAddress} </Text>
//                                                                 </Pressable>
//                                                             </View>

//                                                         )
//                                                         // }
//                                                     })}
//                                                 </ScrollView>
//                                             </View>
//                                         }
//                                     </View>
//                                     : null}
//                             </View>
//                             <View style={styles.inputField}>
//                                 <View style={styles.txtStyle}>

//                                     <TextInput
//                                         value={address}
//                                         placeholder='Ex: 32, Raj Nagar, Ghaziabad '
//                                         style={styles.txtInputCon}
//                                         onChangeText={(value) => {
//                                             setaddress(value)
//                                         }}
//                                     />

//                                 </View>

//                             </View>

//                         </View>
//                     </View>
//                     <View style={styles.spaceGap}>
//                         <View style={styles.InputCons}>
//                             <View style={styles.informCon}>
//                                 <Text style={styles.informTxt}>Add patient & test details</Text>
//                             </View>
//                             <View style={styles.inputField}>
//                                 <TextInput
//                                     value={Names}
//                                     placeholder="Enter Name*"
//                                     style={styles.txtInput}
//                                     onChangeText={txt => {
//                                         setNames(txt), _namesValidate(txt);
//                                     }}
//                                     autoCapitalize="none"
//                                 />
//                                 {errorNames != null ? (
//                                     <View
//                                         style={styles.redCon}>
//                                         <Text
//                                             style={styles.redTxt}>
//                                             {errorNames}
//                                         </Text>
//                                     </View>
//                                 ) : null}
//                             </View>
//                             <View style={styles.scroll}>
//                                 {namemessage ? <Text style={{ color: 'red' }}>{namemessage}</Text> : null}
//                                 <View style={styles.inputFields}>
//                                     <View style={styles.valid}>
//                                         <TextInput
//                                             value={age}
//                                             style={styles.txtInputs}
//                                             placeholder='Age*'
//                                             keyboardType="numeric"
//                                             onChangeText={(value) => {
//                                                 if (!isNaN(value) && value < 110)
//                                                     setage(value)
//                                             }}
//                                         ></TextInput>
//                                         {errorAge != null ? (
//                                             <View
//                                                 style={styles.redCons}>
//                                                 <Text
//                                                     style={styles.redTxt}>
//                                                     {errorAge}
//                                                 </Text>
//                                             </View>
//                                         ) : null}
//                                     </View>
//                                     {agemessage ? <Text style={{ color: 'red' }}>{agemessage}</Text> : null}
//                                     <TouchableOpacity
//                                         onPress={() => {
//                                             setshow(true)
//                                         }}
//                                         style={styles.genderCon}
//                                     >
//                                         <Text style={styles.iconSize}>
//                                             {gender ? gender : "Gender*"}
//                                         </Text>
//                                         <AntDesign
//                                             style={styles.iconSize}
//                                             name="down"
//                                         />
//                                     </TouchableOpacity>
//                                 </View>
//                                 {show ?
//                                     <View style={styles.gender}>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 setshow(false)
//                                                 setgender("male")
//                                             }}
//                                         >
//                                             <Text style={styles.genTxt}>
//                                                 Male
//                                             </Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 setshow(false)
//                                                 setgender("female")
//                                             }}
//                                         >
//                                             <Text style={styles.genTxt}>
//                                                 Female
//                                             </Text>
//                                         </TouchableOpacity>
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 setshow(false)
//                                                 setgender("Other")
//                                             }}
//                                         >
//                                             <Text style={styles.genTxt}>
//                                                 Others
//                                             </Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                     :
//                                     null}
//                             </View>
//                             <View style={styles.inputFieldCon}>
//                                 <View style={styles.txtInputStyles}>
//                                     <TextInput style={styles.txts}
//                                         value={testdetails}
//                                         multiline={true}
//                                         numberOfLines={50}
//                                         onChangeText={(value) => {
//                                             settestdetails(value)
//                                         }}
//                                         placeholder='Enter Test Details like: RTPCR, Vitamin D, CBC, B12..'
//                                     />
//                                 </View>
//                                 <View style={styles.conatiner}>
//                                     {/* <Pressable>
//                                         <View style={styles.arrowContainer}>
//                                             <AntDesign
//                                                 style={styles.iconSizes}
//                                                 name="up"
//                                             />
//                                         </View>
//                                     </Pressable>
//                                     <Pressable>
//                                         <View style={styles.arrowContainer}>
//                                             <AntDesign
//                                                 style={styles.iconSizes}
//                                                 name="down"
//                                             />
//                                         </View>
//                                     </Pressable>qq */}
//                                 </View>
//                             </View>

//                             <View style={styles.inputUpload}>
//                                 <View style={styles.txtUpload}>
//                                     {pdf ?
//                                         <Render /> :
//                                         <View style={styles.txtDirection}>
//                                             <View>
//                                                 <Text style={styles.iconSize}>Upload prescreption</Text>
//                                             </View>
//                                         </View>
//                                     }
//                                     <Pressable
//                                         style={styles.buttonStyle}
//                                         onPress={() =>
//                                             file()
//                                             // setModalVisible(true)
//                                         }>
//                                         <Text style={styles.textStyle}>Browse file </Text>
//                                         <View style={styles.plusBox}>
//                                             <Text style={styles.plusTxt}>+</Text>
//                                         </View>
//                                     </Pressable>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>

//                     <View style={styles.spaceGaping}>
//                         <TouchableOpacity
//                             onPress={() => {
//                                 {
//                                     Name && Number && age && address && gender
//                                         ? handelUpload() : alert("Fill all mandatory feilds")
//                                 }
//                             }}
//                         >
//                             <View style={styles.btnCon}>
//                                 <Text style={styles.btnTxt}>
//                                     Book Slot
//                                 </Text>
//                                 <View style={styles.rightArrow}>
//                                     <AntDesign
//                                         style={styles.icons}
//                                         name="right"
//                                     />
//                                     <AntDesign
//                                         style={styles.icons}
//                                         name="right"
//                                     />
//                                     <AntDesign
//                                         style={styles.icons}
//                                         name="right"
//                                     />
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                     {/* </Pressable> */}
//                 </ScrollView>
//                 <View style={styles.centeredView}>
//                     <Modal
//                         animationType="slide"
//                         transparent={true}
//                         visible={modalVisibles}
//                         onRequestClose={() => {
//                             Alert.alert("Modal has been closed.");
//                             setModalVisibles(!modalVisibles);
//                         }}
//                     >
//                         <View style={styles.centeredView}>
//                             <View style={styles.modalView}>
//                                 <AntDesign
//                                     onPress={() => {
//                                         setModalVisibles(!modalVisibles),
//                                             setName('')
//                                     }
//                                     }
//                                     style={{
//                                         fontSize: 25,
//                                         marginLeft: "90%",
//                                         color: "#707070",
//                                         fontWeight: "900",
//                                         margin: 10,
//                                     }}
//                                     name="close"
//                                     backgroundColor="#3b5998"
//                                 />
//                                 <View style={styles.modalCon}>
//                                     <Text style={styles.modalText}>Hi {Name}, we have received your request for test sample collection. We shall call you in few minutes to confirm the details. For any queries please call us at
//                                         <Pressable
//                                             onPress={() => {
//                                                 Linking.openURL(`tel:8988980303`);
//                                             }}>
//                                             <Text style={styles.numTxt}> 8988980303</Text>
//                                         </Pressable>
//                                         <Text style={styles.teamTxt}>  - Team Redcliffe Labs </Text></Text>
//                                 </View>
//                                 {/* <View style={{
//                                     // backgroundColor: 'lightblue',
//                                     width: width / 1.3,
//                                     height: height / 8,
//                                     alignSelf: 'center', 
//                                     // justifyContent: 'center'
//                                     alignItems: 'center'
//                                 }}>
//                                     <Text style={styles.modalText}>Hi {Name}, we have received your request for test sample collection. We shall call you in few minutes to confirm the details. For any queries please call us at
//                                         <TouchableOpacity
//                                             onPress={() => {
//                                                 Linking.openURL(`tel:8988980303`);
//                                             }}
//                                             // style={{ marginTop:5}}
//                                         >
//                                             <Text style={{ color: '#E5184E', fontSize: 10, fontFamily: 'Jost-Bold'  }}> 8988980303 <Text style={{color: '#707070'}}>- Team Redcliffe Labs </Text></Text>
//                                         </TouchableOpacity>
//                                         {/* <Text style={{bottom: 5}}> */}

//                                 {/* </Text> */}
//                                 {/* </Text>
//                             <Text></Text>
//                         </View>  */}
//                             </View>
//                         </View>
//                     </Modal>
//                 </View >
//             </View >

//         </SafeAreaView >
//     )
// }

// let styles = create(UploadPrescreptionStyle);

// const mapStateToProps = (state) => ({
//     token: state.user?.userData?.token,
//     uploadresponse: state.UploadPrescreptionReducer
// })

// const mapDispatchToProps = dispatch => {
//     return {
//         uploadprescreption: (body, token) => {
//             dispatch(Actions.uploadprescreption(body, token));
//         },
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UploadPrescreption)

import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Dimensions, Modal, Pressable, StyleSheet, Text, Touchable, View, Button, Linking, } from 'react-native'
import MapView, { Callout, Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { create } from '../../helpers/PlatformSpecificStyles';
import UploadPrescreptionStyle from './UploadPrescreptionStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker'
import Geolocation from "react-native-geolocation-service";
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapInputField from './UploadPrescreptionSeearchInput';
import Actions from './UploadPrescreptionAction'
import { Screens, navigate } from '../../helpers/Screens';
const { height, width } = Dimensions.get('screen');
// import UpdatesMaps from './UploadPrescreptionMaps';
import RNFS from 'react-native-fs';
import axios from 'axios';
import Constants from '../../staticData/Constants';

import UpdatesMaps from './UploadPrescreptionSeearchInput';

export const UploadPrescreption = (props) => {

    const [location, setLocation] = useState(null)

    const [mmitoken, setmmitoken] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibles, setModalVisibles] = useState(false);
    const [contactname, setcontactname] = useState()
    const [contactnumber, setcontactnumber] = useState()
    const [patientname, setpatientname] = useState();
    const [age, setage] = useState();
    const [pdf, setpdf] = useState()
    const [testdetails, settestdetails] = useState('')
    const [gender, setgender] = useState()
    const [patientMapAddress, setpatientMapAddress] = useState()
    const [show, setshow] = useState(false)
    const [pdffile, setpdffile] = useState()
    const [address, setaddress] = useState()
    const [city, setcity] = useState()
    const [response, setresponse] = useState(props.uploadresponse?.uploadprescreptionresponse)
    const [autosuggestionlist, setautosuggestionlist] = useState()



    const [Name, setName] = useState('');
    const [errorName, setErrorName] = useState(null);
    const [Names, setNames] = useState('');
    const [errorNames, setErrorNames] = useState(null);
    const [Number, setNumber] = useState('');
    const [errorNumber, setErrorNumber] = useState(null);
    const [Age, setAge] = useState('');
    const [errorAge, setErrorAge] = useState(null);

    const [check, setcheck] = useState(false)
    console.log(props.uploadresponse?.uploadprescreptionresponse?.mobile, "response aa gya")

    const _nameValidate = name => {
        var nameRegex = /^[A-Za-z ]+$/;
        if (name === '') {
            setErrorName('*Please enter name.');
        } else if (!nameRegex.test(name)) {
            setErrorName('*Please enter valid name.');
        } else {
            setErrorName(null);
        }
    };
    const _namesValidate = names => {
        var namesRegex = /^[A-Za-z ]+$/;
        if (names === '') {
            setErrorNames('*Please enter name.');
        } else if (!namesRegex.test(names)) {
            setErrorNames('*Please enter valid name.');
        } else {
            setErrorNames(null);
        }
    };
    const _numbervalidate = number => {
        var numberRegex =
            /^[0]?[6789]\d{9}$/;
        if (number === '') {
            setErrorNumber('');
        } else if (/([A-Z]+)/g.test(number) && number.length < 8) {
            setErrorNumber(
                '*Please enter a special character and length must be 8 digit.',
            );
        } else if (!numberRegex.test(number)) {
            setErrorNumber('Enter A Valid Number');
        } else {
            setErrorNumber(null);
        }
    };
    const _ageValidate = age => {
        var ageRegex = /^100|[1-9]?\d$/;
        if (age === '') {
            setErrorAge('*Please enter age.');
        } else if (!ageRegex.test(age)) {
            setErrorAge('*Enter valid age.');
        } else {
            setErrorAge(null);
        }
    };
    const validate = () => {
        let flag = true;
        if (Name === '') {
            setErrorName('*Please enter name.');
            flag = false;
        }
        if (Number === '') {
            setErrorPassword('*Please enter number.');
            flag = false;
        }
        if (Age === '') {
            setErrorAge('*Please enter age.');
            flag = false;
        }
        if (Names === '') {
            setErrorNames('*Please enter name.');
            flag = false;
        }
        return flag;
    };
    // error messages 

    const [namemessage, setnamemessage] = useState()
    const [phonemessage, setphonemessage] = useState()
    const [agemessage, setagemessage] = useState()

    console.log(contactname, contactnumber, patientname, age, testdetails)

    const file = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log(res, "pdf details")

            setpdf(res)
            RNFS.readFile(res[0].uri, 'base64').then(respondsw => { setpdffile(`data:${res[0].type};base64,${respondsw}`, "<<<<<<<") })
            // details()
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err; SSSSSS
            }
        }
    }

    const details = () => {
        console.log("guguggaga ale ale")

    }


    const handleLocationPermission = async () => { // 👈
        let permissionCheck = '';
        if (Platform.OS === 'ios') {
            permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }

        if (Platform.OS === 'android') {
            permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (
                permissionCheck === RESULTS.BLOCKED ||
                permissionCheck === RESULTS.DENIED
            ) {
                const permissionRequest = await request(
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                );
                permissionRequest === RESULTS.GRANTED
                    ? console.warn('Location permission granted.')
                    : console.warn('location permission denied.');
            }
        }
    };

    useEffect(() => {
        handleLocationPermission()
    }, [])


    const regx = /^[6-9]\d{9}$/;

    const ageregx = /^[0-9]\d{1}$/;

    const car = /^[A-Za-z ]+$/;

    const eid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;


    const Render = () => {
        return (
            <View style={styles.txtDirection}>
                {pdf?.map((item) => {
                    return (
                        <View>
                            {item?.size <= 500000 ?
                                <Text style={styles.txtFile} numberOfLines={1} >{item.name}</Text>
                                : alert("File size should be less then 5Mb")}
                        </View>
                    )
                })}
            </View>
        )
    }

    const handelUpload = () => {
        setcheck(false)
        // alert("working every time")
        const body = {
            "name": Name,
            "age": age,
            "testname": testdetails,
            "mobile": Number,
            "gender": gender,
            "parent_name": Names,
            "base64file": pdffile,
            "address": `${address}${city}`,
            "city": city,
            "source": 'mobile app'
        };
        console.log(body, props.token, "Upload Prescreption");
        props.uploadprescreption(body, props.token)
        setNames('')
        setNumber('')
        settestdetails('')
        setage('')
        setpdf()
        setcity()
        setgender()
        settestdetails()
        setaddress('')
        console.log(response, "response i want")
        // setTimeout(() => {
        if (props.uploadresponse?.uploadprescreptionresponse?.mobile) {
            // alert("Your Form is Submitted")
            setModalVisibles(true)

        }
        setTimeout(() => {
            setModalVisibles(true)
        }, 500);
        // }, 200);
    }
    console.log(location, "the current location")

    // const [pin, setPin] = React.useState({
    //     latitude: 37.78825,
    //     longitude: -122.4324
    // })
    // const [region, setRegion] = React.useState({
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421
    // })

    // map updates

    const [pin, setPin] = React.useState({
        latitude: 28.601296309799093,
        longitude: 77.36977127782859
    })
    const [region, setRegion] = React.useState({
        latitude: 28.601296309799093,
        longitude: 77.36977127782859,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    var _mapView = MapView;
    const [state, setstate] = useState(null)
    const mapRef = useRef(null);
    const gotoPlace = (lat, lng) => {
        const SearchedRegion = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        mapRef.current.animateToRegion(SearchedRegion, 3 * 1000);
    }

    // map my india logic for address search

    useEffect(() => {
        // if (trackPhlebo == true) {
        getmmitoken();
        // }
    }, [])

    const getmmitoken = () => {
        console.log("entererd token")
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
        params.append('client_id', '33OkryzDZsKamfiPiKFdn3JedW3I1sO_efflBdDslqsmTSZmsD2SPw4DU3SPC459TYVRlA4DUCLLpIoO5jAOJQ==')
        params.append('client_secret', 'lrFxI-iSEg8wS11NUoDEndR2zcztS6p73mr5dC4bfgeS1SSbfOhj2SKP-Vh0gbPinqh-w3f66JbgvjrDuq5OdXMZYOVLEuEG')

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post('https://outpost.mapmyindia.com/api/security/oauth/token', params, config)

            .then(({ data }) => {
                // console.log("mmi data", data.access_token);
                setmmitoken(data.access_token)
            })
            .catch(function (error) {
                console.log("error", error);
            });
    }

    console.log(mmitoken, "myindiatoken in upload prescreption")

    const autosugestions = (val) => {
        axios.get(`https://atlas.mapmyindia.com/api/places/search/json?query=${val}&access_token=${mmitoken}&tokenizeAddress=true`).then((data) => {
            console.log(data?.data?.suggestedLocations, "autosearch data")
            setautosuggestionlist(data?.data?.suggestedLocations)
        }).catch((error) => {
            console.log(error, "error")
        })
    }

    console.log(autosuggestionlist, "suggestion from map my india")

    console.log(address , "shubham")
    

    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.scrollStyle}>
                    {/* <Pressable
                    onPress={()=>{
                        setshow(false)
                    }}
                    > */}
                    <View style={styles.secCon}>
                        <TouchableOpacity >
                            <View style={styles.arrowCon}>
                                <MaterialCommunityIcons
                                    onPress={(e) => { props.navigation.goBack() }}
                                    style={{ fontSize: 25 }}
                                    name="arrow-left"
                                    backgroundColor="#3b5998"
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.headCon}>
                            <Text style={styles.txtHead}>Upload Prescription</Text>
                        </View>
                    </View>

                    <View
                        style={styles.testingCon}
                    >
                        <Text style={styles.testingTxt}>
                            Testing from home in 60 minutes across, for 2200+ tests Following NABL, ISO, ICMR standards | Rated 4.7/5 by 1600+ customers
                        </Text>
                    </View>

                    <View style={styles.popularCon}>
                        <Text style={styles.popularTxt}>
                            <Text style={{ fontWeight: 'bold', color: '#E5184E' }}>Popular tests:</Text> Full Body Checkup, Prescription tests, Covid RT PCR, CBC, Hba1c, Lipid, Thyroid, Blood glucose, Vitamin D, Vitamin B12, Urine, CRP, Covid antibody, LFT, KFT
                        </Text>
                    </View>

                    <View style={styles.popularCons}>
                        <View style={styles.whatsappCon}>
                            <Text style={{ fontWeight: 'bold', color: '#E5184E', fontFamily: 'Jost-Regular', }}>You can also upload your prescription through whatsapp.</Text>
                        </View>
                        <View style={styles.whatsCon}>
                            <MaterialCommunityIcons
                                onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=918988988787&amp;text=Hi, I am looking to book my health checkup. Please assist me with the diagnostic test details.')}
                                style={{ fontSize: 25, color: 'white', }}
                                name="whatsapp"
                                backgroundColor="#3b5998"
                            />
                        </View>

                    </View>
                    <View style={styles.InputCon}>
                        <View style={styles.informCon}>
                            <Text style={styles.informTxt}>What is your contact information?</Text>
                        </View>
                        <View style={styles.inputField}>
                            <TextInput value={Name}
                                placeholder="Enter Name*"
                                style={styles.txtInput}
                                onChangeText={txt => {
                                    setName(txt), _nameValidate(txt);
                                }}
                                autoCapitalize="none"
                            />
                            {errorName != null ? (
                                <View
                                    style={styles.redCon}>
                                    <Text
                                        style={styles.redTxt}>
                                        {errorName}
                                    </Text>
                                </View>
                            ) : null}
                        </View>

                        {namemessage ? <Text style={{ color: 'red' }}>{namemessage}</Text> : null}
                        <View style={styles.inputField}>
                            <View style={styles.txtIps}>
                                <View style={styles.numCon}>
                                    <Text style={styles.indTxt}>+91</Text>
                                </View>
                                <TextInput
                                    style={styles.txtIp}
                                    value={Number}
                                    placeholder='Enter Mobile Number*'
                                    maxLength={10}
                                    keyboardType={'numeric'}
                                    onChangeText={txt => {
                                        setNumber(txt), _numbervalidate(txt);
                                    }}
                                    autoCapitalize="none"
                                />
                            </View>
                            {errorNumber != null ? (
                                <View
                                    style={styles.redCon}>
                                    <Text
                                        style={styles.redTxt}>
                                        {errorNumber}
                                    </Text>
                                </View>
                            ) : null}
                        </View>
                        {phonemessage ? <Text style={{ color: 'red' }}>{phonemessage}</Text> : null}
                    </View>
                    <View style={styles.spaceGaping}>
                        <View style={styles.InputContainer}>
                            <View style={styles.informCon}>
                                <Text style={styles.informTxt}>Address for collection?</Text>
                            </View>
                            <View style={styles.inputField}>
                                <View style={styles.txtStyle}>
                                    {city ?
                                        <View style={styles.flexLoc}>
                                            <View style={{ width: width / 1.48, }}>
                                                <Text style={[styles.citytext, Constants.fontType.jRegular,]}>{city}</Text>
                                            </View>
                                            <Pressable style={styles.cutTxt}
                                                onPress={() => {
                                                    setcity('')
                                                    setcheck(false)
                                                }}>
                                                <Entypo
                                                    name="circle-with-cross"
                                                    style={{
                                                        fontSize: 15
                                                    }}
                                                />
                                            </Pressable>

                                        </View>

                                        :
                                        <TextInput
                                            placeholder="Search Places Here"
                                            style={styles.txtCon}
                                            onChangeText={(e) => {
                                                autosugestions(e)
                                                setcheck(true)
                                            }}>
                                        </TextInput>

                                    }
                                </View>
                                {check ?
                                    <View>
                                        {city ? null :
                                            <View style={styles.cityCon}>
                                                <ScrollView>
                                                    {autosuggestionlist && autosuggestionlist.map((item, val) => {
                                                        // if (val < 5) {
                                                        return (

                                                            <View
                                                                style={{ minHeight: 40, zIndex: 10 }}>
                                                                <Pressable
                                                                    style={styles.locationCon}
                                                                    onPress={() => {
                                                                        setcity(item?.placeAddress)
                                                                    }}
                                                                >
                                                                    <Text style={{ paddingHorizontal: 10, }}>{item?.placeAddress} </Text>
                                                                </Pressable>
                                                            </View>

                                                        )
                                                        // }
                                                    })}
                                                </ScrollView>
                                            </View>
                                        }
                                    </View>
                                    : null}
                            </View>
                            <View style={styles.inputField}>
                                <View style={styles.txtStyle}>

                                    <TextInput
                                        value={address}
                                        placeholder='Ex: 32, Raj Nagar, Ghaziabad '
                                        style={styles.txtInputCon}
                                        onChangeText={(value) => {
                                            setaddress(value)
                                        }}
                                    />

                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.spaceGap}>
                        <View style={styles.InputCons}>
                            <View style={styles.informCon}>
                                <Text style={styles.informTxt}>Add patient & test details</Text>
                            </View>
                            <View style={styles.inputField}>
                                <TextInput
                                    value={Names}
                                    placeholder="Enter Name*"
                                    style={styles.txtInput}
                                    onChangeText={txt => {
                                        setNames(txt), _namesValidate(txt);
                                    }}
                                    autoCapitalize="none"
                                />
                                {errorNames != null ? (
                                    <View
                                        style={styles.redCon}>
                                        <Text
                                            style={styles.redTxt}>
                                            {errorNames}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                            <View style={styles.scroll}>
                                {namemessage ? <Text style={{ color: 'red' }}>{namemessage}</Text> : null}
                                <View style={styles.inputFields}>
                                    <View style={styles.valid}>
                                        <TextInput
                                            value={age}
                                            style={styles.txtInputs}
                                            placeholder='Age*'
                                            keyboardType="numeric"
                                            onChangeText={(value) => {
                                                // if (!isNaN(value) && value < 110)
                                                //     setage(value)
                                                if (/^[0-9\b]+$/.test(value) || value === '') {
                                                    if( value < 110){
                                                        setage(value)
                                                    }
                                                  }
                                            }}
                                        ></TextInput>
                                        {errorAge != null ? (
                                            <View
                                                style={styles.redCons}>
                                                <Text
                                                    style={styles.redTxt}>
                                                    {errorAge}
                                                </Text>
                                            </View>
                                        ) : null}
                                    </View>
                                    {agemessage ? <Text style={{ color: 'red' }}>{agemessage}</Text> : null}
                                    <TouchableOpacity
                                        onPress={() => {
                                            setshow(true)
                                        }}
                                        style={styles.genderCon}
                                    >
                                        <Text style={styles.iconSize}>
                                            {gender ? gender : "Gender*"}
                                        </Text>
                                        <AntDesign
                                            style={styles.iconSize}
                                            name="down"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {show ?
                                    <View style={styles.gender}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setshow(false)
                                                setgender("male")
                                            }}
                                        >
                                            <Text style={styles.genTxt}>
                                                Male
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setshow(false)
                                                setgender("female")
                                            }}
                                        >
                                            <Text style={styles.genTxt}>
                                                Female
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setshow(false)
                                                setgender("Other")
                                            }}
                                        >
                                            <Text style={styles.genTxt}>
                                                Others
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    null}
                            </View>
                            <View style={styles.inputFieldCon}>
                                <View style={styles.txtInputStyles}>
                                    <TextInput style={styles.txts}
                                        value={testdetails}
                                        multiline={true}
                                        numberOfLines={50}
                                        onChangeText={(value) => {
                                            settestdetails(value)
                                        }}
                                        placeholder='Enter Test Details like: RTPCR, Vitamin D, CBC, B12..'
                                    />
                                </View>
                                <View style={styles.conatiner}>
                                    {/* <Pressable>
                                        <View style={styles.arrowContainer}>
                                            <AntDesign
                                                style={styles.iconSizes}
                                                name="up"
                                            />
                                        </View>
                                    </Pressable>
                                    <Pressable>
                                        <View style={styles.arrowContainer}>
                                            <AntDesign
                                                style={styles.iconSizes}
                                                name="down"
                                            />
                                        </View>
                                    </Pressable>qq */}
                                </View>
                            </View>

                            <View style={styles.inputUpload}>
                                <View style={styles.txtUpload}>
                                    {pdf ?
                                        <Render /> :
                                        <View style={styles.txtDirection}>
                                            <View>
                                                <Text style={styles.iconSize}>Upload prescreption</Text>
                                            </View>
                                        </View>
                                    }
                                    <Pressable
                                        style={styles.buttonStyle}
                                        onPress={() =>
                                            file()
                                            // setModalVisible(true)
                                        }>
                                        <Text style={styles.textStyle}>Browse file </Text>
                                        <View style={styles.plusBox}>
                                            <Text style={styles.plusTxt}>+</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.spaceGapings}>
                        <TouchableOpacity
                            onPress={() => {
                                {
                                    Name && Number && age && address && gender && city && address
                                        ? handelUpload() : alert("Fill all mandatory feilds")
                                }
                            }}
                        >
                            <View style={styles.btnCon}>
                                <Text style={styles.btnTxt}>
                                    Book Slot
                                </Text>
                                <View style={styles.rightArrow}>
                                    <AntDesign
                                        style={styles.icons}
                                        name="right"
                                    />
                                    <AntDesign
                                        style={styles.icons}
                                        name="right"
                                    />
                                    <AntDesign
                                        style={styles.icons}
                                        name="right"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* </Pressable> */}
                </ScrollView>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisibles}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisibles(!modalVisibles);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <AntDesign
                                    onPress={() => {
                                        setModalVisibles(!modalVisibles),
                                            setName('')
                                    }
                                    }
                                    style={{
                                        fontSize: 25,
                                        marginLeft: "90%",
                                        color: "#707070",
                                        fontWeight: "900",
                                        margin: 10,
                                    }}
                                    name="close"
                                    backgroundColor="#3b5998"
                                />
                                <View style={styles.modalCon}>
                                    <Text style={styles.modalText}>Hi {Name}, we have received your request for test sample collection. We shall call you in few minutes to confirm the details. For any queries please call us at
                                        <Pressable
                                            onPress={() => {
                                                Linking.openURL(`tel:8988980303`);
                                            }}>
                                            <Text style={styles.numTxt}> 8988980303</Text>
                                        </Pressable>
                                        <Text style={styles.teamTxt}>  - Team Redcliffe Labs </Text></Text>
                                </View>
                                {/* <View style={{
                                    // backgroundColor: 'lightblue',
                                    width: width / 1.3,
                                    height: height / 8,
                                    alignSelf: 'center', 
                                    // justifyContent: 'center'
                                    alignItems: 'center'
                                }}>
                                    <Text style={styles.modalText}>Hi {Name}, we have received your request for test sample collection. We shall call you in few minutes to confirm the details. For any queries please call us at
                                        <TouchableOpacity
                                            onPress={() => {
                                                Linking.openURL(`tel:8988980303`);
                                            }}
                                            // style={{ marginTop:5}}
                                        >
                                            <Text style={{ color: '#E5184E', fontSize: 10, fontFamily: 'Jost-Bold'  }}> 8988980303 <Text style={{color: '#707070'}}>- Team Redcliffe Labs </Text></Text>
                                        </TouchableOpacity>
                                        {/* <Text style={{bottom: 5}}> */}

                                {/* </Text> */}
                                {/* </Text>
                            <Text></Text>
                        </View>  */}
                            </View>
                        </View>
                    </Modal>
                </View >
            </View >
        </SafeAreaView >
    )
}

let styles = create(UploadPrescreptionStyle);

const mapStateToProps = (state) => ({
    token: state.user?.userData?.token,
    uploadresponse: state.UploadPrescreptionReducer
})

const mapDispatchToProps = dispatch => {
    return {
        uploadprescreption: (body, token) => {
            dispatch(Actions.uploadprescreption(body, token));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPrescreption)