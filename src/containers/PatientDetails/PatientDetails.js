import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Dimensions, Text, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, ScrollView } from 'react-native';
import PatientDetailsStyles from './PatientDetailsStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import { Screens, navigate } from '../../helpers/Screens';
import Actions from "./PatientDetailsActions";
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { height, width } = Dimensions.get('screen');
const CELL_COUNT = 6;

export const PatientDetails = (props) => {

    let totalamount = props?.route?.params?.customParam

    console.log(props?.token, "asdfghjkl")

    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)
    // const [gender, setGender] = useState(null)
    const [name, setName] = useState();
    const [age, setage] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [namemessage, setnamemessage] = useState("")
    const [phonemessage, setphonemessage] = useState("")
    const [emailmessage, setemailmessaage] = useState("")
    const [agemessage, setagemessage] = useState("")
    const [show, setshow] = useState(false)
    const [gender, setgender] = useState()

    useEffect(() => {
        if (male) {
            setGender('male')
        } else if (female) {
            setGender('female')
        }
    }, [male, female])

    const regx = /^[6-9]\d{9}$/;

    const ageregx = /^[0-9]\d{1}$/;

    const car = /^[A-Za-z ]+$/;

    const eid = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.TopNav}>
                    <MaterialCommunityIcons
                        onPress={(e) => { props.navigation.goBack() }}
                        style={{ fontSize: 25, marginRight: 10 }}
                        name="arrow-left"
                        backgroundColor="#3b5998"
                    />
                    <Text style={styles.topnavtext}>Patient Details</Text>
                </View>
                <ScrollView>
                    <View style={[styles.Body, styles.paddingClass]}>
                        <View style={[styles.BodyComponentfirst, styles.paddingClass]}>
                            <View style={[styles.FlexViewRow]}>
                                <Icon style={{ marginRight: 4 }} name="infocirlce" size={15.5} color="#F75010" />
                                <Text style={[styles.alertText, styles.TextBold]}>
                                    These details will appear on your final test reports</Text>
                            </View>
                        </View>
                        <View style={[styles.BodyComponentSecond]}>
                            <View style={[styles.Bodyformbox, styles.paddingClass]}>
                                <View style={[styles.Bodyform]}>
                                    <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                        PATIENT'S NAME</Text>
                                    <TextInput value={name} onChangeText={(value) => {
                                        if (!car.test(value)) {
                                            setnamemessage("Invalid name")
                                        } else {
                                            setnamemessage("")
                                        }
                                        setName(value)
                                    }} placeholder="Enter Name" style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]} />
                                    {namemessage ? <Text style={styles.errormesasge}>{namemessage}</Text> : null}
                                    <Text style={[styles.TextHeading, styles.marginTopBottonClass,]}>
                                        MOBILE NUMBER</Text>
                                    <View style={styles.TextInput}>
                                        {/* // style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading,  styles.BorderColorNormal, ]}> */}
                                        <View style={styles.numCon}>
                                            <Text style={styles.indTxt}>+91</Text>
                                        </View>
                                        <TextInput
                                        style={styles.ipField}
                                        placeholder='Enter Mobile Number'
                                        keyboardType="numeric"
                                        maxLength={10}
                                        onChangeText={(value) => {
                                            if (!regx.test(value)) {
                                                setphonemessage("Enter A Valid Number")
                                            } 
                                            else {
                                                setphonemessage("")
                                            }
                                            if(value.length == 0) {
                                                setphonemessage("")
                                            }
                                            setphone(value)
                                            // setphonemessage("")
                                        }}
                                    ></TextInput>
                                        {/* <TextInput
                                            style={styles.ipField}
                                            placeholder='Enter Mobile Number'
                                            keyboardType="numeric"
                                            maxLength={10}
                                            onChangeText={(value) => {
                                                if (!regx.test(value)) {
                                                    setphonemessage("Invalid phone number")
                                                } else {
                                                    setphonemessage("")
                                                }
                                                setphone(value)
                                            }}
                                        > </TextInput> */}
                                    </View>
                                    {phonemessage ? <Text style={styles.errormesasge}>{phonemessage}</Text> : null}
                                    <View style={[styles.FlexViewRow]}>
                                        <View style={[styles.BodyComponentfirstAge, styles.marginTopBottonClass]}>
                                            <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                                AGE</Text>
                                            <TextInput
                                                value={age}
                                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, { width: '50%' }]}
                                                placeholder='Age'
                                                keyboardType="numeric"
                                                maxLength={3}
                                                onChangeText={(value) => {
                                                    // if (!isNaN(value) && value < 110 )
                                                    //     setage(value)
                                                    if (/^[0-9\b]+$/.test(value) || value === '') {
                                                        if( value < 110){
                                                        setage(value)
                                                        }
                                                      }
                                                }}
                                            />
                                        </View>
                                        <View style={[styles.BodyComponentfirstAge, styles.paddingClass]}>
                                            <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                                GENDER</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setshow(true)
                                                }}
                                            >
                                                <View style={styles.genderCon}>
                                                    <Text style={{ color: '#707070', fontSize: 12 }}>
                                                        {gender ? gender : "Gender"}
                                                    </Text>
                                                    <AntDesign
                                                        style={{ fontSize: 10, color: '#707070' }}
                                                        name="down"
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                            <View style={{ height: 10, }}>
                                                {show ?
                                                    <View style={styles.gender}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setshow(false)
                                                                setgender("male")
                                                            }}>
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

                                        </View>
                                    </View>
                                    <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                        EMAIL ID</Text>
                                    <TextInput value={email} onChangeText={(value) => {
                                        if (!eid.test(value)) {
                                            setemailmessaage("Invalid email name")
                                        } else {
                                            setemailmessaage("")
                                        }
                                        setemail(value)
                                    }} style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                        placeholder='Enter Email ID' />
                                    {emailmessage ?
                                        <Text style={styles.errormesasge}>{emailmessage}</Text> : null}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#ffffff', marginBottom: '40%' }}>
                    </View>
                </ScrollView>
                {name && age && email && phone && gender ?
                    <View style={[styles.Bottom, styles.BorderTop, styles.paddingClass, styles.FlexViewRow]}>
                        <View style={[styles.bottomViewContainer]}>
                            <Text style={[styles.TextSubHeadingmedium]}>Total Amount</Text>
                            <Text style={[styles.TextSubHeadingmedium, { fontSize: 16 }]}>₹{totalamount}</Text>
                        </View>
                        <View style={[styles.bottomViewContainer]}>
                            <Button
                                onPress={() => {
                                    if (car.test(name) && regx.test(phone) && eid.test(email) && gender) {
                                        props.Patientdata(name, age, email, phone, gender);
                                        navigate(Screens.ADD_ADDRESS, totalamount)
                                    } else {
                                        alert('Input Details are invalid')
                                    }
                                }}
                                title="NEXT"
                                color="#E5184E" />
                        </View>
                    </View> : null}
            </ScrollView>
        </SafeAreaView>
    )
}
let styles = create(PatientDetailsStyles);

const mapStateToProps = (state) => ({
    cityList: state.city?.cityArray,
    selectedCity: state.city?.cityId,
    UserDetails: state.userprofile?.userProfile,
    token: state.user?.userData?.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
        Patientdata: (name, age, email, phone, gender) => {
            const body = {
                customer_name: name,
                customer_age: age,
                customer_email: email,
                customer_phonenumber: phone,
                customer_gender: gender
            }
            dispatch(Actions.Patientdata(body))
        },
        getProfileDetails: (token) => {
            dispatch(ProfileAction.getProfileDetails(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails)