import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { create } from '../../helpers/PlatformSpecificStyles';
import LoginStyles from './LoginStyles';
import TextInput from '../../baseComponents/textInput/TextInput';
import Actions from './LoginAction';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableOpacity, Pressable, BackHandler, Alert , Linking, } from 'react-native';
import Constants from './LoginConstants';
import { Screens, navigate } from '../../helpers/Screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Rightarrow from '../../staticData/svg/righttick.svg'
import Action from '../otpverification/OtpverificationActions'
import Actionss from '../otpverification/OtpverificationActions'
import Locations from '../../helpers/locations';
import axios from 'axios';
import links from '../../helpers/links';
import Api from '../../helpers/api';

const LoginScreen = (props) => {
    useEffect(() => {
        if (props?.token) {
            navigate(Screens.TAB)
        }
    }, [props?.UserDetails])

    useEffect(() => {
        const backAction = () => {
            if (props.navigation.isFocused()) {
                Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    { text: 'YES', onPress: () => BackHandler.exitApp() },
                ]);
                return true;
            }
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    // console.log(props,"sdfad fdasf dsa fdsa dsf sdfa ")

    const [mobileNumber, setmobileNumber] = useState('');
    const [onetime, setonetime] = useState(false)
    const [message, setmessage] = useState('')
    const [verify, setverify] = useState(false)

    const regx = /^[0-9\b]+$/;
    // /^[0-9]\d{9}$/;

    // useEffect(() => {
    //     if (props.token) {
    //         props.VerifyUser(props.phoneNumber?.phone_number);
    //     }
    // }, [props?.token])


    const otpsend = (mobileNumber) => {
        axios.get(`${links.baseApi}/auth/already/${mobileNumber}/`).then(({ data }) => {
            if (!data.already_exists) {
                setmobileNumber('')
                props.doLogin(mobileNumber, props?.navigation);
                setverify(false)
                setonetime(false)
            }
            else {
                // alert("This mobile number already exist")
                setmobileNumber('')
                props.doLogin(mobileNumber, props?.navigation);
                setverify(false)
                setonetime(false)
            }
        }).catch((error) => {
            console.log(error, "here is error")
        })
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.maindiv}>
                <View style={styles.topnav}>
                    <View style={styles.head}>
                        <MaterialCommunityIcons
                            onPress={(e) => { navigate(Screens.ONBOARD_SCREEN) }}
                            style={styles.icon}
                            name="arrow-left"
                            backgroundColor="#3b5998"
                        />
                        <Text style={styles.navheading}>Log In</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text style={styles.subheading}>Enter your mobile number</Text>
                        </View>
                        <View style={styles.inputsection}>
                            <View style={styles.unputsubsection}>
                                <View style={styles.country}>
                                    <Text style={styles.countrycode}>+91</Text>
                                </View>
                                <View style={styles.VerticleLine}>
                                </View>
                                <View style={styles.inputfield}>
                                    <TextInput
                                        require
                                        value={mobileNumber.toString()}
                                        placeholderTextColor="black"
                                        style={styles.input}
                                        autoFocus={true}
                                        onChangeText={(value) => {
                                            if (!regx.test(value) ) {
                                                setverify(false)
                                                // setmessage("Invalid phone number")
                                            } else {
                                                //     setmessage("")
                                                if(value.length == 10){
                                                setverify(true)
                                                }else{
                                                    setverify(false)
                                                }
                                            }
                                            props.clearUser()
                                            setmobileNumber(value);
                                            console.log(value)
                                        }
                                        }
                                        keyboardType="numeric"
                                        maxLength={10}
                                        placeholder={'Enter mobile number'}
                                    />
                                </View>
                                {verify ?
                                    <View style={styles.conditions}>
                                        <View style={styles.condition}>

                                            <Rightarrow />
                                        </View>
                                    </View> : null}
                            </View>
                        </View>
                    </View>
                    {/* <View style={styles.sections}>
                        <Text style={styles.text}>Already Have An Account? </Text>
                        <Pressable
                            onPress={() => {
                                navigate(Screens.NEW_LOGIN)
                            }}
                        >
                            <Text style={styles.terms}>SIGN IN</Text>
                        </Pressable>
                    </View> */}
                </View>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={verify ? styles.buttonActive : styles.buttonInactive}
                            disabled={onetime}
                            onPress={() => {
                                // props.VerifyUser(mobileNumber);
                                if (verify && mobileNumber.length == 10) {
                                    // otpsend(mobileNumber)
                                    setmobileNumber('')
                                    props.doLogin(mobileNumber, props?.navigation);
                                    setverify(false)
                                    setonetime(false)
                                } else {
                                    alert("Please fill mobile no")
                                    setonetime(false)
                                }
                            }}>
                            <Text style={styles.buttontext}>Continue</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                        style={verify ? styles.buttonActive : styles.buttonInactive}
                        onPress={() => Linking.openURL("truecallersdk://truesdk/web_verify?requestNonce=UNIQUE_REQUEST_ID&partnerKey=YOUR_PARTNER_KEY&partnerName=YOUR_APP_NAME&lang=LANGUAGE_LOCALE&title=TITLE_STRING_OPTION")}
                        >
                            <Text style={styles.buttontext}>TrueCaller</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>


                <View style={styles.sectionCon}>
                    <Text style={styles.text}>By continuing, you agree to our</Text>
                    <Pressable
                        onPress={() => {
                            navigate(Screens.TERMS_CONDITION)
                        }}
                    >
                        <Text style={styles.terms}>Terms & Conditions</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

let styles = create(LoginStyles);

const mapStateToProps = (state) => ({
    UserDetails: state?.user?.userData,
    Existuser: state?.user?.userExist,
    token: state?.user?.userData?.token,
    phoneNumber: state?.userLogin?.phoneNumber,
})

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (mobileNumber, pushTo) => {
            dispatch(Actions.doLogin(mobileNumber, pushTo));
        },
        VerifyUser: (mobileNumber) => {
            dispatch(Actions.VerifyUser(mobileNumber));
        },
        clearUser: () => {
            dispatch(Actionss.clearUser());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);