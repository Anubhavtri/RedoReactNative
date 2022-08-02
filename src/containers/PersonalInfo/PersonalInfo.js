
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput, Button, ImageBackground } from 'react-native';
import PersonalInfoStyle from './PersonalInfoStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import { Screens, navigate } from '../../helpers/Screens'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Actions from "./PersonalInfoAction";
import Icon from 'react-native-vector-icons/AntDesign';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileAction from '../ProfileScreen/ProfileAction'
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';

const CELL_COUNT = 6;

export const PersonalInfo = (props) => {

    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)
    const [image, setimage] = useState();
    const [name, setName] = useState(props?.UserDetails?.fullname);
    const [age, setage] = useState(props?.UserDetails?.age);
    const [email, setemail] = useState(props?.UserDetails?.email);
    const [address, setaddress] = useState();
    const [message, setmessage] = useState("")
    const [namemessage, setnamemessage] = useState("")
    const [agemessage, setagemessage] = useState("")
    const [phonemessage, setphonemessage] = useState("")
    const [emailmessage, setemailmessaage] = useState("")
    const [allimagedata , setallimagedata] = useState()
    // const [gender, setGender] = useState(null)

    const [show, setshow] = useState(false)
    const [gender, setgender] = useState()


    useEffect(() => {
        if (male) {
            setGender('male')
        } else if (female) {
            setGender('female')
        }
    }, [male, female])

    const openImagePicker = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            quality: 0.5,
            includeBase64: true,
        }).then(image => {
            // props.postPaymentImage(booking.pk, image, token)
            console.log(image)
            setallimagedata(image)
            setimage(image.data)
            // setpath(image.path)
        }).catch((error) => { console.log(error) })
    }

    useEffect(() => {
        props.getProfileDetails(props.token)
    }, [])

    const regx = /^[0-9]\d{1}$/;

    const car = /^[A-Za-z ]+$/;

    const eid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    const bg = props?.UserDetails?.age

    const ageregx = /^[0-9]\d$/;

    console.log(props?.UserDetails?.age, "personal info ")

    let imagesssss = props?.UserDetails?.image
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
                    <Text style={styles.topnavtext}>Edit Personal Info</Text>
                </View>
                <View style={[styles.Body, styles.paddingClass]}>
                    <View style={[styles.BodyComponentSecond]}>
                        <View style={[styles.Bodyformbox, styles.paddingClass]}>
                            <View style={[styles.Bodyform]}>
                                <View style={[styles.FlexViewRow]}>
                                    <View style={[styles.BodyComponentfirstAge, styles.marginTopBottonClass]}>
                                        <View style={[styles.TextHeading, styles.marginBottomClass, styles.imagesection]}>
                                            <TouchableOpacity onPress={() => { openImagePicker() }} >
                                                {imagesssss != "" ?
                                                    <ImageBackground
                                                        style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: 'black', }}
                                                        imageStyle={{ borderRadius: 50 }}
                                                        source={{ uri: `${allimagedata ? allimagedata?.path : props.UserDetails.image}` }}
                                                    >
                                                        <View style={{
                                                            width: 60,
                                                            alignItems: 'flex-end'
                                                        }}>
                                                            <Entypo
                                                                style={{
                                                                    fontSize: 18,
                                                                    color: '#A7A7A7'
                                                                }}
                                                                name='squared-plus'
                                                            />
                                                        </View>
                                                    </ImageBackground>
                                                    :
                                                    <ImageBackground
                                                        style={{ width: 60, height: 60, borderRadius: 50, backgroundColor: 'black', }}
                                                        imageStyle={{ borderRadius: 50 }}
                                                        source={require('../../staticData/assests/head_icon.png')}
                                                        >
                                                        <View style={{
                                                            width: 60,
                                                            alignItems: 'flex-end'
                                                        }}>
                                                            <Entypo
                                                                style={{
                                                                    fontSize: 18,
                                                                    color: '#A7A7A7'
                                                                }}
                                                                name='squared-plus'
                                                            />
                                                        </View>
                                                    </ImageBackground>
                                                }

                                            </TouchableOpacity>
                                        </View>
                                        <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                            PATIENT'S NAME</Text>
                                        {/* <TextInput
                                        style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                        placeholder='Enter Name'></TextInput> */}
                                        <TextInput value={name} onChangeText={(value) => {
                                            if (!car.test(value)) {
                                                setnamemessage("Invalid name")
                                            } else {
                                                setnamemessage("")
                                            }
                                            setName(value)
                                        }} placeholder="Enter Name" style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]} />
                                        {namemessage ? <Text style={styles.errormesasge}>{namemessage}</Text> : null}
                                    </View>
                                    {/* <View style={[styles.BodyComponentfirstAge, styles.paddingClass]}>
                                    <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                        LAST NAME</Text>
                                    <TextInput
                                        style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                        placeholder='Enter Name'></TextInput>

                                </View> */}
                                </View>
                                {/* <Text style={[styles.TextHeading, styles.marginTopBottonClass,]}>
                                MOBILE NUMBER</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                placeholder='Enter Mobile Number'></TextInput> */}
                                <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                    EMAIL ID</Text>
                                <TextInput value={email} onChangeText={(value) => {
                                    if (!eid.test(value)) {
                                        setemailmessaage("Invalid email address")
                                    } else {
                                        setemailmessaage("")
                                    }
                                    setemail(value)
                                }} style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                    placeholder='Enter Email ID' />
                                {emailmessage ? <Text style={styles.errormesasge}>{emailmessage}</Text> : null}
                                <View style={[styles.FlexViewRow]}>
                                    <View style={[styles.BodyComponentfirstAge, styles.marginTopBottonClass]}>
                                        <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                            Age</Text>
                                            <TextInput
                                                value={age}
                                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, { width: '50%' }]}
                                                placeholder='Age'
                                                keyboardType="numeric"
                                                onChangeText={(value) => {
                                                    if (!isNaN(value) && value < 110)
                                                        setage(value)
                                                }}
                                            />
                                        {/* <TextInput
                                            value={parseInt(props?.UserDetails?.age)}
                                            style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                            placeholder='Age '
                                            maxLength={3}
                                            keyboardType="numeric"
                                            onChangeText={(value) => {
                                                if (!isNaN(value) && value < 110)
                                                    setage(value)
                                            }}
                                        ></TextInput> */}
                                        {agemessage ? <Text style={styles.errormesasge}>{agemessage}</Text> : null}
                                    </View>
                                </View>
                                {/* <View style={[styles.FlexViewRow]}>
                                    <View style={[styles.BodyComponentfirstAge, styles.paddingClass]}>
                                        <View style={styles.Con}>
                                            <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                                GENDER</Text>
                                        </View>
                                    </View>
                                </View> */}
                                <View style={styles.txtCons}>
                                    <Text style={styles.headTxt}>
                                        GENDER</Text>
                                    <TouchableOpacity

                                        onPress={() => {
                                            setshow(true)
                                        }}
                                    >
                                        <View style={styles.genderCon}>
                                            {gender ?
                                                <Text style={{ color: '#707070', fontSize: 14 }}>
                                                    {gender}
                                                </Text>
                                                :
                                                <Text style={{ color: '#707070', fontSize: 14 }}>
                                                    {props?.UserDetails?.gender ? props?.UserDetails?.gender : "Gender*"}
                                                </Text>}
                                            <AntDesign
                                                style={{ fontSize: 14, color: '#707070' }}
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
                        </View>
                    </View>
                </View>
                <View style={[styles.Bottom, styles.BorderTop, styles.paddingClass, styles.FlexViewRow]}>
                    <View style={[styles.bottomViewContainer]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigate(Screens.TAB)
                            }}
                            style={{ margin: 10, borderColor: '#E5184E', borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', minHeight: 50 }}
                        >
                            <Text style={{ color: '#E5184E', fontWeight: '500', fontSize: 14 }}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.bottomViewContainer]}>
                        <TouchableOpacity
                            onPress={() => {
                                if (car.test(name) && regx.test(age) && eid.test(email)) {
                                    props.doEdit(name, age, email, props?.UserDetails?.username, image, gender, props?.token); navigate(Screens.PROFILESCREEN)
                                    console.log(name, age, email, gender, props?.token, "personal ifon which i sent")
                                } else {
                                    alert('Input Details are invalid')
                                }
                            }}
                            style={{ margin: 10, backgroundColor: '#E5184E', borderRadius: 5, justifyContent: 'center', alignItems: 'center', minHeight: 50 }}
                        >
                            <Text style={{ color: '#FFFFFF', fontWeight: '500', fontSize: 14 }}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
let styles = create(PersonalInfoStyle);

const mapStateToProps = (state) => ({
    cityList: state.city?.cityArray,
    selectedCity: state.city?.cityId,
    UserDetails: state.userprofile?.userProfile,
    token: state.user?.userData?.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
        doEdit: (name, age, email, userName, image, gender, token) => {
            dispatch(Actions.doEdit(name, age, email, userName, image, gender, token))
        },
        getProfileDetails: (token) => {
            dispatch(ProfileAction.getProfileDetails(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)