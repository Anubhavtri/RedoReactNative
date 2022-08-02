

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import OtpStyles from './OtpStyles';
import { create,  } from '../../helpers/PlatformSpecificStyles';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Actions from "./OtpverificationActions";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Action from '../loginScreen/LoginAction'
import RNOtpVerify from 'react-native-otp-verify';
// import { TextInput } from 'react-native-gesture-handler';
import {  Screens, navigate } from '../../helpers/Screens';

const CELL_COUNT = 6;

export const Otpverification = (props) => {

    const [seconds, setSeconds] = useState(30)

    const [value, setValue] = useState('');
    const [otpError, setOtpError] = useState()
    const [verify, setverify] = useState(false)
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [aloo, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [message, setmessage] = useState('Enter code')
    const [remessage, setremessage] = useState('We have sent you an SMS on')
    const [changemobileno, setchangemobileno] = useState('')

    useEffect(() => {
        console.log("usseffect call")
        RNOtpVerify.getHash()
            .then(console.log)
            .catch(console.log);
        RNOtpVerify.getOtp()
            .then(p =>
                RNOtpVerify.addListener(otpHandler))
            .catch(p => console.log(p , "erroe hu "));
        return () => {
            RNOtpVerify.removeListener();
        }
    }, [])
    const otpHandler = (message) => {
        console.log("entered")
        console.log("full message", message);
        const otp = /(\d{6})/g.exec(message)[1];
        console.log("OTP is", otp)
        setValue(otp)
        setTimeout(() => {
            props.getUserData(props.phoneNumber?.phone_number, otp);    
        }, 500);
        
        RNOtpVerify.removeListener();
    }
    useEffect(() => {

        // if (props?.UserDetails?.password_change) {
        //     props.navigation.replace(Screens.CITY)
        // }else{
        //     props.navigation.replace(Screens.NEW_PASSWORD)
        // }
        if (props?.token) {
            props.navigation.replace(Screens.CITY)
        }
    }, [props?.token])

    useEffect(() => {
        if (props?.error) {
            setOtpError(true)
        }
    }, [props?.error])

    const regx = /^[0-9]\d{5}$/;

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setverify(true)
            setSeconds('00');
        }
    });


    // useEffect(() => {
    //     RNOtpVerify.getOtp()
    //         .then((p) => {
    //             RNOtpVerify.addListener((message) => {
    //                 try {
    //                     if (message && message !== 'Timeout Error') {
    //                         const otp = /(\d{6})/g.exec(message)[1];
    //                         if (otp.length === 6) {
    //                             setOtpArray(otp.split(''));
    //                         }
    //                     } else {
    //                         console.log('OTPVerification: RNOtpVerify.getOtp - message=>', message);
    //                     }
    //                 } catch (error) {
    //                     console.log('OTPVerification: RNOtpVerify.getOtp error=>', error);
    //                 }
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    //     return () => {
    //         // removeOtpListener();
    //         alert('not working')
    //     };
    // }, []);

    // const getHash = () =>
    //     OtpAutocomplete.getHash()
    //         .then(console.log)
    //         .catch(console.log);

    // const startListeningForOtp = () =>
    //     OtpAutocomplete.getOtp()
    //         .then(p => {
    //           OtpAutocomplete.addListener(otpHandler)
    //             }
    //           )
    //         .catch(p => console.log(p , "LLLLLLLLLLL"));

    // const otpHandler = (message) => {
    //     const otp = /(\d{6})/g.exec(message)[1];
    //     this.setState({ otp });
    //     OtpAutocomplete.removeListener();
    //     Keyboard.dismiss();
    // }

    // useEffect(() => {
    //     getHash()
    //     startListeningForOtp();
    //     return () => OtpAutocomplete.removeListener();
    // }, [startListeningForOtp]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.maindiv}>
                <View style={styles.topnav}>
                    <View style={styles.head}>
                        <MaterialCommunityIcons
                            onPress={(e) => { setOtpError(), props.navigation.goBack() }}
                            style={styles.icon}
                            name="arrow-left"
                            backgroundColor="#3b5998"
                        />
                        <Text style={styles.navheading}>OTP Verification</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text style={styles.subheading}>Enter 6-digit OTP sent to +91 - {props.phoneNumber?.phone_number}</Text>
                            {/* <Text style={styles.subheading}>+91 {props.phoneNumber?.phone_number}</Text> */}
                        </View>
                        <View style={styles.inputsection}>
                            <View style={styles.unputsubsection}>
                                <View style={styles.inputfield}>
                                    <CodeField
                                        ref={ref}
                                        {...aloo}
                                        value={value}
                                        onChangeText={setValue}
                                        cellCount={CELL_COUNT}
                                        rootStyle={styles.codeFiledRoot}
                                        keyboardType="number-pad"
                                        renderCell={({ index, symbol, isFocused }) => (
                                            <Text
                                                required
                                                key={index}
                                                style={[[otpError ? styles.wrongcell : styles.cell], isFocused && styles.focusCell]}
                                                onLayout={getCellOnLayoutHandler(index)}>
                                                {symbol || (isFocused ? <Cursor /> : null)}
                                            </Text>
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.newsection}>
                                <View>
                                    <Text style={styles.text}>Didn't receive the code?</Text>
                                    {/* <Text style={styles.terms}>Get OTP on call</Text> */}
                                </View>
                                <View style={styles.resendotp}>

                                    <TouchableOpacity onPress={() => { setOtpError(false); props.reSendOtp(props.phoneNumber?.phone_number); setmessage("Re-Enter code"); setremessage('We have again sent you an SMS on'); setSeconds(30); setverify(false) }}>
                                        {verify ?
                                            <Text style={styles.resend}>Resend</Text>
                                            : null}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setOtpError(false); props.reSendOtp(props.phoneNumber?.phone_number); setmessage("Re-Enter code"); setremessage('We have again sent you an SMS on') }}>
                                        <Text style={styles.resend}>00:{seconds}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>

                        <View style={styles.heading}>
                            <Text style={styles.subhead}>Change Mobile Number</Text>
                        </View>
                        <View style={styles.unputsub}>
                            {/* <Text style={styles.ipfields}>Number</Text> */}
                        <View style={styles.ipfields}>
                        <Text style={styles.subheading}>+91 - {props.phoneNumber?.phone_number}</Text>
                        
                        </View>
                        <TouchableOpacity onPress={()=>{
                            navigate(Screens.LOGIN_SCREEN)
                        }}
                            style={styles.btnCons}>
                                <Text style={styles.btnTxt}>Change</Text>
                </TouchableOpacity>
                        </View>
                    </View>

                </View>



                <View style={styles.section}>
                    <View style={styles.row}>
                        {changemobileno ?
                            <TouchableOpacity
                                style={styles.buttonActive}
                                onPress={() => {
                                    if (changemobileno) {
                                        props.doLogin(changemobileno, props?.navigation);
                                        setValue('')
                                        setchangemobileno('')
                                    }
                                    //  else {
                                    // alert("Please Enter Otp")
                                    // }
                                }}>

                                <Text style={styles.buttontext}>Change </Text>

                            </TouchableOpacity> :

                            <TouchableOpacity
                                style={value.length == 6 ? styles.buttonActive : styles.buttonInactive}
                                onPress={() => {
                                    if (value) {
                                        props.getUserData(props.phoneNumber?.phone_number, value);
                                        setValue('')
                                    } else {
                                        alert("Please Enter Otp")
                                    }
                                }}>
                                <Text style={styles.buttontext}>Continue</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
let styles = create(OtpStyles);

const mapStateToProps = (state) => ({
    UserDetails: state.user?.userData,
    token: state.user?.userData?.token,
    username: state.user?.userData?.username,
    phoneNumber: state?.userLogin?.phoneNumber,
    error: state.user?.errorOtp
})

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: (phoneNumber, otp) => {
            dispatch(Actions.getUserData(phoneNumber, otp));
        },
        reSendOtp: (mobileNumber) => {
            dispatch(Actions.reSendOtp(mobileNumber));
        },
        doLogin: (mobileNumber, pushTo) => {
            dispatch(Action.doLogin(mobileNumber, pushTo));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Otpverification)