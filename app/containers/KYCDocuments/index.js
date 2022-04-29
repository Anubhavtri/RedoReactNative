/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Alert, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import DashedLine from 'react-native-dashed-line';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loggedInClient from '../../utility/apiAuth/loggedInClient';
import APIName from '../../utility/api/apiName';
import Spinner from 'react-native-loading-spinner-overlay';


const KYCDocuments = props => {
    const [aadharcard, setAadharcard] = useState(false);
    const [drivingLicense, setDrivingLicense] = useState(false);
    const [voterCard, setVoterCard] = useState(false);
    const [getloader, setloader] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            console.log("useFocusEffect is working>>")
            try {
                getSavedData();
            } catch (e) {
                console.error(e);
            }
        }, [])
    );


    const getSavedData = async () => {
        console.log('getSavedData is working ');
        try {
            const retrievedAadharItem = await AsyncStorage.getItem('@setAadharcar');
            const retrievedVoterIDItem = await AsyncStorage.getItem('@setVoterID');
            const retrievedLicenseItem = await AsyncStorage.getItem('@setLicense');

            if (retrievedAadharItem !== null) {
                setAadharcard(true);
            } else {
                setAadharcard(false)
            }

            if (retrievedVoterIDItem !== null) {
                setVoterCard(true)
            } else {
                setVoterCard(false)
            }

            if (retrievedLicenseItem !== null) {
                setDrivingLicense(true)
            }
            else {
                setDrivingLicense(false)
            }

        } catch (error) {
            console.log('getSavedData', JSON.stringify(error));
        }
    };
    const getFrontAadharcard = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@setFrontAadharcard');
            if (retrievedItem !== null) {
                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getBackAadharcard = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@setBackAadharcar');
            if (retrievedItem !== null) {
                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getFrontVoterID = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@setFrontVoterID');
            if (retrievedItem !== null) {
                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getBackVoterID = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@setBackVoterID');
            if (retrievedItem !== null) {
                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getFrontLicense = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@setFrontLicense');
            if (retrievedItem !== null) {
                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };
    const getBackLicense = async () => {
        try {
            const retrievedItem = await AsyncStorage.getItem('@setBackLicense');
            if (retrievedItem !== null) {
                return retrievedItem;
            }
            return null;
        } catch (error) {
            console.log('getAccessToken', 'Error retrieving data');
        }
    };


    const getCircleBackgroundColor = status => {
        let color = null;
        if (status) {
            color = colors.PRIMARY_COLOR;
        } else {
            color = colors.Gray_COLOR;
        }
        return color;
    };
    const getCircleImageColor = status => {
        let color = null;
        if (status) {
            color = colors.WHITE_COLOR;
        } else {
            color = colors.PRIMARY_COLOR;
        }
        return color;
    };
    const getTextColor = status => {
        let color = null;
        if (status) {
            color = colors.PRIMARY_COLOR;
        } else {
            color = colors.PRIMARY_TEXT_COLOR;
        }
        return color;
    };
    const getButtonColor = (b1, b2, b3) => {
        let color = null;
        if (b1 && b2 && b3) {
            color = colors.BUTTON;
        } else {
            color = colors.Gray_COLOR;
        }
        return color;
    };
    const clearAsyncStorage = async () => {
        console.log('clearAsyncStorage');

        try {
            console.log('try is working');
            // await AsyncStorage.clear();
            await AsyncStorage.removeItem('@setAadharcar');
            await AsyncStorage.removeItem('@setVoterID');
            await AsyncStorage.removeItem('@setLicense');
            await AsyncStorage.removeItem('@setFrontAadharcard');
            await AsyncStorage.removeItem('@setBackAadharcar');
            await AsyncStorage.removeItem('@setBackLicense');
            await AsyncStorage.removeItem('@setFrontLicense');
        } catch (e) {
            console.log('async clear error', e);
        }
    };

    const Update_profile = async () => {
        const client = await loggedInClient();
        const data = {
            client_user: '1',
            name: "Shorty",
            aadhar_card_front: await getFrontAadharcard(),
            aadhar_card_back: await getBackAadharcard(),
            driving_licence_front: await getFrontLicense(),
            driving_licence_back: await getBackLicense(),
            voter_card_front: await getFrontVoterID(),
            voter_card_back: await getBackVoterID(),
            aadhar_card_id: "4AAQSkZJRgABAQA",
            driving_licence_id: "ABAQAAAQABAAD",
            voter_card_id: "BAQAAAQABAAD",

        };
        console.log('cancel_Request', '' + JSON.stringify(data));
        client.post(APIName.create_kyc, data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        ToastAndroid.show("KYC Updated successfully!", ToastAndroid.SHORT);

                        clearAsyncStorage();
                        props.navigation.goBack();
                        // setresponse(response.data);

                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                    setloader(false);
                } else if (response.status == 201) {
                    let data = response.data;
                    try {

                        ToastAndroid.show("KYC Updated successfully!", ToastAndroid.SHORT);
                        // setresponse(response.data);
                        clearAsyncStorage();
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

                            <Text style={styles.Title}>KYC</Text>
                            <Image
                                source={require('../../assets/images/left.png')}
                                style={{ tintColor: colors.PRIMARY_COLOR, height: s(24), width: s(24), position: 'absolute', top: 0, left: 0 }}
                            />
                        </View>
                    </TouchableOpacity>

                </View>
                <Text style={{ justifyContent: 'center', alignSelf: 'center', color: colors.PRIMARY_TEXT_COLOR }}>PPMC Report for (Harmind Arora)</Text>
                <Image
                    source={require('../../assets/images/user.png')}
                    style={{ height: s(60), width: s(60), alignSelf: 'center', alignContent: 'center', marginTop: s(20) }}
                />
                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: s(10) }}>Update your photo</Text>
                <TouchableOpacity
                    style={styles.short_button}
                    onPress={() => {
                        console.log('only check');
                    }}>

                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={require('../../assets/images/camera.png')}
                            style={{ height: s(15), width: s(15), alignSelf: 'center', alignContent: 'center', tintColor: colors.WHITE_COLOR }}
                        />
                        <Text
                            style={{
                                color: colors.WHITE_COLOR,
                                marginLeft: s(5),
                                fontFamily: fonts('poppinsSemibold'),
                                fontSize: s(10)
                            }}>
                            {'Use mobile camera'}
                        </Text>
                    </View>


                </TouchableOpacity>
                <DashedLine style={{ margin: s(10), marginTop: s(20) }}
                    dashLength={5} dashColor={colors.PRIMARY_COLOR} dashThickness={1} />
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', color: colors.PRIMARY_TEXT_COLOR }}> Identity Proof</Text>

                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: s(10), marginTop: s(10) }}>Update your documents use mobile camera or gallery</Text>

                        <TouchableOpacity
                            onPress={() => {
                                console.log('only check');
                                props.navigation.navigate('AadharCard', { name: 'Aadhar Card' });

                            }}>
                            <View style={styles.card_container}>
                                <View style={{ flex: 1 }}>
                                    <View style={[styles.circle_main, { backgroundColor: getCircleBackgroundColor(aadharcard) }]}>
                                        <Image
                                            source={require('../../assets/images/accepted.png')}
                                            style={{ tintColor: getCircleImageColor(aadharcard), height: s(15), width: s(15), alignSelf: 'center' }}
                                        />
                                    </View>
                                </View>
                                <Text style={[styles.card_title, { color: getTextColor(aadharcard) }]}>Aadhar Card</Text>
                                {aadharcard ?
                                    <View style={styles.check_mark_container}>
                                        <Image
                                            source={require('../../assets/images/check-mark.png')}
                                            style={styles.check_mark}
                                        />
                                        {/* <Image
                                            source={require('../../assets/images/cancel.png')}
                                            style={styles.cancel_mark}
                                        /> */}
                                    </View> :
                                    <View style={styles.check_mark_container}>
                                        <Image
                                            source={require('../../assets/images/right-arrow.png')}
                                            style={[styles.check_mark, { tintColor: colors.PRIMARY_COLOR }]}
                                        />

                                    </View>}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('only check');
                                props.navigation.navigate('AadharCard', { name: 'Driving License' });
                            }}>
                            <View style={styles.card_container}>
                                <View style={{ flex: 1 }}>
                                    <View style={[styles.circle_main, { backgroundColor: getCircleBackgroundColor(drivingLicense) }]}>
                                        <Image
                                            source={require('../../assets/images/accepted.png')}
                                            style={{ tintColor: getCircleImageColor(drivingLicense), height: s(15), width: s(15), alignSelf: 'center' }}
                                        />
                                    </View>
                                </View>
                                <Text style={[styles.card_title, { color: getTextColor(drivingLicense) }]}>Driving License</Text>
                                {drivingLicense ?
                                    <View style={styles.check_mark_container}>
                                        <Image
                                            source={require('../../assets/images/check-mark.png')}
                                            style={styles.check_mark}
                                        />
                                        {/* <Image
                                            source={require('../../assets/images/cancel.png')}
                                            style={styles.cancel_mark}
                                        /> */}
                                    </View>
                                    : <View style={styles.check_mark_container}>
                                        <Image
                                            source={require('../../assets/images/right-arrow.png')}
                                            style={[styles.check_mark, { tintColor: colors.PRIMARY_COLOR }]}
                                        />

                                    </View>}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('only check');
                                props.navigation.navigate('AadharCard', { name: 'Voter ID Card' });
                            }}>
                            <View style={styles.card_container}>
                                <View style={{ flex: 1 }}>
                                    <View style={[styles.circle_main, { backgroundColor: getCircleBackgroundColor(voterCard) }]}>
                                        <Image
                                            source={require('../../assets/images/accepted.png')}
                                            style={{ tintColor: getCircleImageColor(voterCard), height: s(15), width: s(15), alignSelf: 'center' }}
                                        />
                                    </View>
                                </View>
                                <Text style={[styles.card_title, { color: getTextColor(voterCard) }]}>Voter ID Card</Text>
                                {voterCard ?
                                    <View style={styles.check_mark_container}>
                                        <Image
                                            source={require('../../assets/images/check-mark.png')}
                                            style={styles.check_mark}
                                        />
                                        {/* <Image
                                            source={require('../../assets/images/cancel.png')}
                                            style={styles.cancel_mark}
                                        /> */}
                                    </View>
                                    : <View style={styles.check_mark_container}>
                                        <Image
                                            source={require('../../assets/images/right-arrow.png')}
                                            style={[styles.check_mark, { tintColor: colors.PRIMARY_COLOR }]}
                                        />

                                    </View>}
                            </View>
                        </TouchableOpacity>
                        {/* <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ color: colors.PRIMARY_COLOR, alignSelf: 'center' }}> + add more KYC documents</Text>
                            <View style={{ backgroundColor: colors.PRIMARY_COLOR }}></View>
                        </View> */}





                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: getButtonColor(aadharcard, voterCard, drivingLicense) }]}
                    disabled={(aadharcard != '' && voterCard != ''&& drivingLicense != '') ? false : true}
                    onPress={() => {
                        console.log('only check');
                        setloader(true)
                        Update_profile();
                    }}>


                    <Text
                        style={{
                            color: colors.WHITE_COLOR,
                            fontFamily: fonts('poppinsSemibold'),
                        }}>
                        {'Submit'}
                    </Text>


                </TouchableOpacity>
                {getloader ?
                    <Spinner
                        visible={true}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    /> : null}
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
        marginTop: s(30)
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
        justifyContent: 'center',
        alignSelf: 'center',
        color: colors.PRIMARY_COLOR,
        flex: 4,
        fontFamily: fonts('poppinsSemibold'),
        fontSize: s(15)
    },
    spinnerTextStyle: {
        color: colors.PRIMARY_TEXT_COLOR,
    },
    text_input: {
        fontSize: s(20),
        color: colors.PRIMARY_COLOR,
        alignSelf: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontFamily: fonts('poppinsSemibold'),
    },
    Title: {
        fontSize: s(15),
        color: colors.PRIMARY_COLOR,
        fontFamily: fonts('poppinsSemibold'),
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%'



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
        marginTop: s(10),
        marginBottom: s(10),
        alignSelf: 'center',
        marginTop: s(20),
        fontFamily: fonts('poppinsSemibold'),

    },
    short_button: {
        textAlign: 'center',
        alignContent: 'center',
        height: s(30),
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: s(20),
        fontSize: s(12),
        marginTop: s(10),
        alignSelf: 'center',
        fontFamily: fonts('poppinsSemibold'),
    },
});



export default KYCDocuments;
