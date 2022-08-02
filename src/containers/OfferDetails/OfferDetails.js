import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { create } from '../../helpers/PlatformSpecificStyles';
import OfferDetailsStyle from './OfferDetailsStyle';
import TextInput from '../../baseComponents/textInput/TextInput';
// import Actions from './LoginAction';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableOpacity } from 'react-native';
// import Constants from './LoginConstants';
import { Screens, navigate } from '../../helpers/Screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Path, G, Circle } from 'react-native-svg';

const Offerdetails = (props) => {

    useEffect(() => {
        if (props?.token) {
            navigate(Screens.TAB)
        }
    }, [props?.UserDetails])

    const [mobileNumber, setmobileNumber] = useState('');
    const [message, setmessage] = useState('')
    const [verify, setverify] = useState(false)

    const regx = /^[7-9]\d{9}$/;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.maindiv}>
                <View style={styles.topnav}>
                    <View style={styles.head}>
                        <MaterialCommunityIcons
                            onPress={(e) => { props.navigation.goBack() }}
                            style={styles.icon}
                            name="arrow-left"
                            backgroundColor="#3b5998"
                        />
                        <Text style={styles.navheading}>Offer Details</Text>
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
                                        onChangeText={(value) => {
                                            if (!regx.test(value)) {
                                                setverify(false)
                                                // setmessage("Invalid phone number")
                                            } else {
                                                //     setmessage("")
                                                setverify(true)
                                            }
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
                                    <View style={styles.condition}>
                                        <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
                                            <G id="Group_4479" data-name="Group 4479" transform="translate(-286 -268)">
                                                <Circle id="Ellipse_19" data-name="Ellipse 19" cx="11" cy="11" r="11" transform="translate(286 268)" fill="#27ae60" />
                                                <Path id="Path_142" data-name="Path 142" d="M2569.841,135.739l2.928,3.266,5.632-6.871" transform="translate(-2276.852 143.922)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="2" />
                                            </G>
                                        </Svg>
                                    </View> : null}
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>By continuing, you agree to our</Text>
                            <Text style={styles.terms}>Terms & Conditions</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={verify ? styles.buttonActive : styles.buttonInactive}
                            onPress={() => {
                                if (regx.test(mobileNumber)) {
                                    props.doLogin(mobileNumber, props?.navigation);
                                }
                                else {
                                    alert('Enter 10 Digit Mobile Number')
                                }
                            }}>
                            <Text style={styles.buttontext}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

let styles = create(OfferDetailsStyle);

const mapStateToProps = (state) => ({
    UserDetails: state?.user?.userData,
    token: state?.user?.userData?.token,
    phoneNumber: state?.userLogin?.phoneNumber,
})

const mapDispatchToProps = (dispatch) => {
    return {
        doLogin: (mobileNumber, pushTo) => {
            dispatch(Actions.doLogin(mobileNumber, pushTo));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Offerdetails);


