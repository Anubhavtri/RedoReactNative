/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Spinner from 'react-native-loading-spinner-overlay';
import loggedInClient from '../../utility/apiAuth/loggedInClient';
import APIName from '../../utility/api/apiName';
const HealthMonitor = props => {

    const [ecgSelected, setecgSelection] = useState(false);
    const [lowbp, setlowbp] = useState('');
    const [highbp, sethighbp] = useState('');
    const [pulserate, setpulserate] = useState('');
    const [height, setheight] = useState('');
    const [weight, setweight] = useState('');
    const [audiometry, setaudiometry] = useState(false);
    const [pft, setpft] = useState(false);
    const [eye_side, seteye_side] = useState(false);
    const [bmi, setbmi] = useState('');
    const [getloader, setloader] = useState(false);



    useEffect(() => {
        console.log('This will run every dashjkjcjkxcjkxjckjxkcj>>>>>>!');
    }, []);

    const getButtonColor = (b1, b2,b3,b4,b5,b6) => {
        let color = null;
        if (b1 != null && b1 != '' && b2 != null && b2 != ''&& b3 != null && b3 != ''&& b4 != null && b4 != ''&& b5 != null && b5 != ''&& b6 != null && b6 != '') {
            color = colors.BUTTON;
        } else {
            color = colors.Gray_COLOR;
        }
        return color;
    };
    const storeAadharCardData = async (value, front, back) => {
        try {
            await AsyncStorage.setItem('@setAadharcar', value);
            await AsyncStorage.setItem('@setFrontAadharcard', front);
            await AsyncStorage.setItem('@setBackAadharcar', back);

        } catch (e) {
            // saving error
        }
    };
    const storeHealthMonitore = async (value) => {
        try {
            await AsyncStorage.setItem('@setHealthMonitore', value);
        } catch (e) {
            // saving error
        }
    };
    
   
    const Update_data = async () => {
        const client = await loggedInClient();
        const data = {
            client_user: '1',
            ecg: ecgSelected,
            bp_low: lowbp,
            bp_high: highbp,
            pulse_rate: pulserate,
            height: height,
            weight: weight,
            audiomerty: audiometry,
            pft: pft,
            eye_sight: eye_side,
            bmi: bmi,
        };
        console.log('Update_data_Request', '' + JSON.stringify(data));
        client.post(APIName.create_health_monitor, data)
            .then(response => {
                setloader(false);
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        ToastAndroid.show("Health Monitor Updated successfully!", ToastAndroid.SHORT);
                        storeHealthMonitore('true');
                        props.navigation.goBack();
                        // setresponse(response.data);

                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                    
                } else if (response.status == 201) {
                    let data = response.data;
                    try {

                        ToastAndroid.show("Health Monitor Updated successfully!", ToastAndroid.SHORT);
                        // setresponse(response.data);
                        storeHealthMonitore('true');
                        props.navigation.goBack();
                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                    setloader(false);
                }
                setloader(false);
            })
            .catch(error => {
                console.log('error>>>>>' + error);
                setloader(false);
                ToastAndroid.show("getting error!", ToastAndroid.SHORT);

            });
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>


                <View style={styles.toolbar}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.goBack();


                        }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={styles.Title}>{props?.route?.params?.name}</Text>
                            <Image
                                source={require('../../assets/images/left.png')}
                                style={{ tintColor: colors.PRIMARY_COLOR, height: s(24), width: s(24), position: 'absolute', top: 0, left: 0 }}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{ margin: s(10), marginLeft: s(15), marginRight: s(15) }}>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1 }}>ECG</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <CheckBox
                                value={ecgSelected}
                                onValueChange={setecgSelection}
                                style={styles.checkbox}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>Low BP</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <TextInput
                                style={styles.input_type}
                                placeholder="Enter Digit"
                                placeholderTextColor={colors.TEXT_COLOR}
                                keyboardType='numeric'
                                underlineColorAndroid={colors.WHITE_COLOR}
                                returnKeyType={'done'}
                                autoFocus={false}
                                onChangeText={text => {
                                    setlowbp(text);
                                }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>High BP</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <TextInput
                                style={styles.input_type}
                                placeholder="Enter Digit"
                                placeholderTextColor={colors.TEXT_COLOR}
                                keyboardType='numeric'
                                underlineColorAndroid={colors.WHITE_COLOR}
                                returnKeyType={'done'}
                                autoFocus={false}
                                onChangeText={text => {
                                    sethighbp(text);
                                }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>Pulse Rate</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <TextInput
                                style={styles.input_type}
                                placeholder="Enter Digit"
                                placeholderTextColor={colors.TEXT_COLOR}
                                keyboardType='numeric'
                                underlineColorAndroid={colors.WHITE_COLOR}
                                returnKeyType={'done'}
                                autoFocus={false}
                                onChangeText={text => {
                                    setpulserate(text);
                                }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>Height</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <TextInput
                                style={styles.input_type}
                                placeholder="Enter Digit"
                                placeholderTextColor={colors.TEXT_COLOR}
                                keyboardType='numeric'
                                underlineColorAndroid={colors.WHITE_COLOR}
                                returnKeyType={'done'}
                                autoFocus={false}
                                onChangeText={text => {
                                    setheight(text);
                                }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>Weight</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <TextInput
                                style={styles.input_type}
                                placeholder="Enter Digit"
                                placeholderTextColor={colors.TEXT_COLOR}
                                keyboardType='numeric'
                                underlineColorAndroid={colors.WHITE_COLOR}
                                returnKeyType={'done'}
                                autoFocus={false}
                                onChangeText={text => {
                                    setweight(text);
                                }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>Audiometry</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <CheckBox
                                value={audiometry}
                                onValueChange={setaudiometry}
                                style={styles.checkbox}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>PFT</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <CheckBox
                                value={pft}
                                onValueChange={setpft}
                                style={styles.checkbox}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>Eye Sight</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <CheckBox
                                value={eye_side}
                                onValueChange={seteye_side}
                                style={styles.checkbox}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', marginTop: s(10) }}>
                        <Text style={{ flex: 1 }}>BMI</Text>
                        <Text>: </Text>
                        <View style={{ flex: 5 }}>
                            <TextInput
                                style={styles.input_type}
                                placeholder="Enter Digit"
                                placeholderTextColor={colors.TEXT_COLOR}
                                keyboardType='numeric'
                                underlineColorAndroid={colors.WHITE_COLOR}
                                returnKeyType={'done'}
                                autoFocus={false}
                                onChangeText={text => {
                                    setbmi(text);
                                }} />
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.container}>




                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: getButtonColor(lowbp, highbp, pulserate,height,weight,bmi) }]}
                            disabled={(lowbp != null && lowbp != '' && highbp != null && highbp != ''&& pulserate != null && pulserate != ''&& height != null && height != ''&& weight != null && weight != ''&& bmi != null && bmi != '') ? false : true}

                            onPress={() => {
                                console.log('only check');
                                setloader(true);
                                Update_data();
                            }}>


                            <Text
                                style={{
                                    color: colors.WHITE_COLOR,
                                    fontFamily: fonts('poppinsSemibold'),
                                }}>
                                {'Upload'}
                            </Text>


                        </TouchableOpacity>

                        {getloader ?
                            <Spinner
                                visible={true}
                                textContent={'Loading...'}
                                textStyle={styles.spinnerTextStyle}
                            /> : null}

                    </View>
                </ScrollView>
            </View>
        </>
    );
};
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
    toolbar: {
        backgroundColor: 'transparent',
        height: s(50),
        padding: s(10),
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    card_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: s(20)
    },
    circle_main: {
        height: s(30), width: s(30), borderRadius: s(15), backgroundColor: colors.PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'
    }
    ,
    check_mark_container: {
        flexDirection: 'row', justifyContent: 'center', flex: 1
    },
    check_mark: { tintColor: colors.GREEN, height: s(15), width: s(15), alignSelf: 'center', margin: s(2) },
    cancel_mark: { tintColor: colors.RED, height: s(15), width: s(15), alignSelf: 'center', margin: s(2) },

    card_title: {
        justifyContent: 'center', alignSelf: 'center', color: colors.PRIMARY_COLOR, flex: 4, fontFamily: fonts('poppinsSemibold')
    },
    text_input: {
        fontSize: s(20),
        color: colors.PRIMARY_COLOR,
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontFamily: fonts('poppinsSemibold'),
    },
    checkbox: {
        alignSelf: 'flex-start',
    },
    Title: {
        fontSize: s(15),
        color: colors.PRIMARY_COLOR,
        fontFamily: fonts('poppinsSemibold'),
        fontStyle: '',
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%'



    },
    input_type: {
        color: colors.PRIMARY_COLOR,
        fontSize: s(12),
        alignContent: 'center',
        alignSelf: 'center',
        height: s(40),
        width: '100%',
        borderRadius: s(5),
        borderColor: colors.PRIMARY_TEXT_COLOR,
        borderWidth: s(1),
        fontFamily: fonts('poppinsMedium'),
        marginLeft: s(5),

    },
    button: {
        textAlign: 'center',
        alignContent: 'center',
        height: s(40),
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BUTTON,
        borderRadius: s(20),
        fontSize: s(12),
        margin: s(10),
        marginTop: s(50),
        alignSelf: 'center',
        fontFamily: fonts('poppinsSemibold'),

    },
    short_button: {
        textAlign: 'center',
        alignContent: 'center',
        height: s(30),
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: s(20),
        fontSize: s(12),
        margin: s(10),
        alignSelf: 'center',
        fontFamily: fonts('poppinsSemibold'),
    },
});



export default HealthMonitor;
