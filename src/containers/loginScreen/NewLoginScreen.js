
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, BackHandler, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Eye from '../../staticData/svg/Eye.svg';
import Action from './LoginAction';
import Actions from "../otpverification/OtpverificationActions";
import { Screens, navigate } from '../../helpers/Screens';
import { create } from 'lodash';
import NewLoginScreenStyle from './NewLoginScreenStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { height, width } = Dimensions.get('screen')
import axios from 'axios';
import links from '../../helpers/links';

export const NewLoginScreen = (props) => {

    // const [password, setpassword] = useState()
    const [resetpassword, setresetpassword] = useState('reset_password')
    const [pass, setPass] = useState(true)
    const [verify, setverify] = useState(false);
    const [error , seterror] = useState(props?.error)

    console.log(mobileNumber, Password, "asdfghjklqwertyuiop");

    const [Password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);

    const _passwordValidate = password => {
        var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        // /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (password.length == 0) {
            setErrorPassword('');
        }
        else if (!passwordRegex.test(password)) {
            setErrorPassword('*Please enter valid password.');
        }
        else {
            setErrorPassword(null);
        }
    };

    useEffect(() => {
        if (props.token) {
            props.navigation.replace(Screens.CITY)
        }
    }, [props?.token])



    const [mobileNumber, setmobileNumber] = useState()
    const [errorNumber, setErrorNumber] = useState(null);

    const _numbervalidate = number => {
        var numberRegex = /^[0]?[6789]\d{9}$/;
        if (number.length == 0) {
            setErrorNumber('');
        }
        else if (/([A-Z]+)/g.test(number) && number.length < 8) {
            setErrorNumber(
                '*Please enter a special character and length must be 8 digit.',
            );
        }
        else if (!numberRegex.test(number) &&  number.length == 10) {
            setErrorNumber('*Please enter valid number.');
        }
        else {
            setErrorNumber(null);
        }
    };

    const validate = () => {
        let flag = true;
        if (Password === '') {
            setErrorPassword('*Please enter password.');
            flag = false;
        }
        return flag;
    };

    
    console.log(props?.error , "HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")

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
    // alert(error)

    const otpsend = (mobileNumber) => {
        axios.get(`${links.baseApi}/auth/already/${mobileNumber}/`).then(({data})=>{
            if(data.already_exists){
            console.log(data,"here is data")
            setmobileNumber('')
            props.ResetPassword(mobileNumber, resetpassword)
            setverify(false)
            setonetime(false)}
            else{
                alert("You are a new user")
            }
        }).catch((error)=>{
            console.log(error,"here is error")
        })
    }


    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <View style={styles.secCon}>
                    <View style={styles.arrowCon}>
                        <MaterialCommunityIcons
                            onPress={(e) => { props.navigation.goBack() }}
                            style={{ fontSize: 25 }}
                            name="arrow-left"
                            backgroundColor="#3b5998"
                        />
                    </View>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>Login</Text>
                    </View>
                </View>


                <View style={styles.spaceCon}>
                    <View style={styles.enterCon}>
                        <Text style={styles.enterTxt}>Enter Your Mobile Number</Text>
                    </View>
                    <View style={styles.inputField}>
                        <View style={styles.countCon}>
                            <Text style={styles.countTxt}>+91</Text>
                        </View>
                        <TextInput
                            style={styles.txtInput}
                            value={mobileNumber}
                            placeholder='Enter Mobile Number'
                            maxLength={10}
                            keyboardType="numeric"
                            onChangeText={txt => {
                                setmobileNumber(txt), _numbervalidate(txt);
                                if(txt.length == 10){
                                setverify(true)
                                }else{
                                    setverify(false)
                                }
                                seterror("")
                            }}
                        />
                    </View>
                    {errorNumber != null ? (
                        <View style={styles.redCon}>
                            <Text
                                style={styles.redTxt}>
                                {errorNumber}
                            </Text>
                        </View>
                    ) : null}
                </View>
                <View style={styles.ipCon}>
                    <View style={styles.txtCons}>
                        <Text style={styles.txtPass}>Enter Your Password</Text>
                    </View>
                    <View style={styles.fieldCon}>
                        <TextInput
                            style={styles.ipField}
                            placeholder='Enter Password'
                            secureTextEntry={pass}
                            value={Password}
                            maxLength={25}
                            onChangeText={(txt) => {
                                setPassword(txt), _passwordValidate(txt);
                                // console.log(txt);

                            }}
                        />
                        <TouchableOpacity onPress={() => setPass((prev) => !prev)}>
                            <Eye />
                        </TouchableOpacity>
                    </View>
                    {errorPassword != null ? (
                        <View style={styles.redCon}>
                            <Text style={styles.redTxt}>
                                {errorPassword}
                            </Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.fgtCon}>
                    <TouchableOpacity onPress={() => {
                        if (mobileNumber.length == 10) {
                            otpsend(mobileNumber)
                        } else {
                            setErrorNumber('Enter mobile number for Forgot Password.');
                        }
                    }}>
                        <Text style={styles.fgtTxt}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {errorPassword ? null :
                    <View style={styles.sections}>
                        <View style={styles.row}>
                            <TouchableOpacity
                            style={verify ? styles.buttonActive : styles.buttonInactive}
                            onPress={() => {
                                if (mobileNumber && Password) {
                                    props.getUserDataByPassword(mobileNumber, Password);
                                    setverify(false)
                                    setmobileNumber('')
                                    setPassword('')
                                }else if (!Password || !mobileNumber){
                                    setErrorPassword('*Please enter password.');
                                    setErrorNumber('*Please enter valid number.');
                                }
                            }}          >
                            <Text style={styles.buttontext}>Continue</Text>
                        </TouchableOpacity>
                             {/* <TouchableOpacity
                                style={value.length == 6 ? styles.buttonActive : styles.buttonInactive}
                                onPress={() => {
                                    props.getUserDataByPassword(mobileNumber, Password);
                                    
                                }}>
                                <Text >Continue</Text>
                            </TouchableOpacity>  */}
                        </View>
                    </View>}
                <View style={styles.orCon}>
                    <Text style={styles.orTxt}>Or</Text>
                </View>


                <TouchableOpacity onPress={() => {
                    if (mobileNumber) {
                        props.doLogin(mobileNumber, props?.navigation);
                    } else if (!mobileNumber) {
                        setErrorNumber('*Please enter valid number.');
                    }
                }}>
                    <View style={styles.lbtnCon}>
                        <Text style={styles.lbtnTxt}>Login with OTP</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.signupCon}>

                    <Text style={styles.text}>Don’t Have An Account? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate(Screens.LOGIN_SCREEN)
                        }}
                    >
                        <Text style={styles.fgtTxt}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rows}>
                    <Text style={styles.text}>By continuing, you agree to our</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigate(Screens.TERMS_CONDITION)
                        }}>
                        <Text style={styles.terms}>Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

let styles = create(NewLoginScreenStyle);

const mapStateToProps = (state) => ({
    UserDetails: state.user?.userData,
    token: state.user?.userData?.token,
    username: state.user?.userData?.username,
    phoneNumber: state?.userLogin?.phoneNumber,
    error: state.user?.errorOtp
})

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (mobileNumber, pushTo) => {
            dispatch(Action.doLogin(mobileNumber, pushTo));
        },
        ResetPassword: (phoneNumber, otp) => {
            dispatch(Actions.ResetPassword(phoneNumber, otp));
        },
        getUserDataByPassword: (phoneNumber, otp) => {
            dispatch(Actions.getUserDataByPassword(phoneNumber, otp));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLoginScreen);