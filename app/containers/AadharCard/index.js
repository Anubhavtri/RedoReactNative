/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import DashedLine from 'react-native-dashed-line';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AadharCard = props => {
    const [DefultImage, setDefultImage] = useState('');
    const [Front_Image_data, setFront_Image_data] = useState('');
    const [Back_Image_data, setBack_Image_data] = useState('');


    useEffect(() => {
        console.log('This will run every dashjkjcjkxcjkxjckjxkcj>>>>>>!');



    }, []);

    const getButtonColor = (b1, b2) => {
        let color = null;
        if (b1 != null && b1 != '' && b2 != null && b2 != '') {
            color = colors.BUTTON;
        } else {
            color = colors.Gray_COLOR;
        }
        return color;
    };
    const storeAadharCardData = async (value,front,back) => {
        try {
            await AsyncStorage.setItem('@setAadharcar', value);
            await AsyncStorage.setItem('@setFrontAadharcard', front);
            await AsyncStorage.setItem('@setBackAadharcar', back);

        } catch (e) {
            // saving error
        }
    };
    const storeVoterIDData = async (value,front,back) => {
        try {
            await AsyncStorage.setItem('@setVoterID', value);
            await AsyncStorage.setItem('@setFrontVoterID', front);
            await AsyncStorage.setItem('@setBackVoterID', back);
        } catch (e) {
            // saving error
        }
    };
    const storeLicenseData = async (value,front,back) => {
        try {
            await AsyncStorage.setItem('@setLicense', value);
            await AsyncStorage.setItem('@setFrontLicense', front);
            await AsyncStorage.setItem('@setBackLicense', back);
        } catch (e) {
            // saving error
        }
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

                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: s(10) }}>Update your aadhar card use mobile camera or gallery</Text>



                <ScrollView>
                    <View style={styles.container}>

                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: s(10), marginTop: s(25) }}>Front Image</Text>

                        <View style={{
                            borderWidth: 1,
                            borderStyle: 'dashed',
                            borderColor: colors.Gray_COLOR,
                            height: s(120),
                            flex: 1,
                            marginTop: s(10),
                            marginLeft: s(30),
                            marginRight: s(30)

                        }}>
                            {Front_Image_data != '' && Front_Image_data != null ?
                                <View style={{
                                    borderColor: colors.Gray_COLOR,
                                    borderWidth: 0.5,
                                    height: s(50),
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginTop: s(20),
                                    marginLeft: s(50),
                                    marginRight: s(50),
                                    marginBottom: s(20)
                                }}>
                                    <Image
                                        source={{
                                            uri: `data:image/jpeg;base64,${Front_Image_data}`
                                        }}
                                        style={{ backgroundColor: colors.Gray_COLOR, flex: 1, resizeMode: 'cover' }}
                                    ></Image>
                                </View>
                                :
                                <View style={{
                                    borderColor: colors.Gray_COLOR,
                                    borderWidth: 0.5,
                                    height: s(50),
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginTop: s(20),
                                    marginLeft: s(50),
                                    marginRight: s(50),
                                    marginBottom: s(20)
                                }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Image
                                            source={require('../../assets/images/defult_user.png')}
                                            style={{ tintColor: colors.Gray_COLOR, height: s(35), width: s(35), justifyContent: 'center', alignContent: 'center' }}
                                        />
                                        <View style={{ marginLeft: s(10) }}>
                                            <View style={{ width: s(80), backgroundColor: colors.Gray_COLOR, height: s(1) }} />
                                            <View style={{ width: s(80), backgroundColor: colors.Gray_COLOR, height: s(1), marginTop: s(10) }} />
                                            <View style={{ width: s(80), backgroundColor: colors.Gray_COLOR, height: s(1), marginTop: s(10) }} />

                                            <View style={{ flexDirection: 'row', marginTop: s(10) }}>
                                                <View style={{ width: s(10), backgroundColor: colors.Gray_COLOR, height: s(1) }} />
                                                <View style={{ width: s(40), backgroundColor: colors.Gray_COLOR, height: s(1), marginLeft: s(10) }} />
                                                <View style={{ width: s(10), backgroundColor: colors.Gray_COLOR, height: s(1), marginLeft: s(10) }} />
                                            </View>

                                        </View>

                                    </View>

                                </View>}

                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginLeft: s(20), marginRight: s(20) }}>
                            <TouchableOpacity
                                style={styles.short_button}
                                onPress={() => {
                                    console.log('only check');
                                    ImagePicker.openCamera({
                                        width: 300,
                                        height: 400,
                                        cropping: true,
                                        includeBase64: true
                                    }).then(image => {
                                        console.log(image);
                                        setDefultImage(image?.path)
                                        setFront_Image_data(image?.data)

                                    });
                                }}>
                                <View style={styles.short_button}>
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
                            <TouchableOpacity
                                style={styles.short_button}
                                onPress={() => {
                                    console.log('only check');
                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 400,
                                        cropping: true,
                                        includeBase64: true
                                    }).then(image => {
                                        // console.log("image>>", image);
                                        console.log("image>>", image?.path);
                                        setDefultImage(image?.path)
                                        setFront_Image_data(image?.data)
                                        // { render_image() }
                                    });
                                }}>
                                <View style={styles.short_button}>
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
                                        {'Your photo gallery'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: s(10), marginTop: s(25) }}>Back Image</Text>

                        <View style={{
                            borderWidth: 1,
                            borderStyle: 'dashed',
                            borderColor: colors.Gray_COLOR,
                            height: s(120),
                            flex: 1,
                            marginTop: s(10),
                            marginLeft: s(30),
                            marginRight: s(30)

                        }}>
                            {Back_Image_data != '' && Back_Image_data != null ?
                                <View style={{
                                    borderColor: colors.Gray_COLOR,
                                    borderWidth: 0.5,
                                    height: s(50),
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginTop: s(20),
                                    marginLeft: s(50),
                                    marginRight: s(50),
                                    marginBottom: s(20)
                                }}>
                                    <Image
                                        source={{
                                            uri: `data:image/jpeg;base64,${Back_Image_data}`
                                        }}
                                        style={{ backgroundColor: colors.Gray_COLOR, flex: 1, resizeMode: 'cover' }}
                                    ></Image>
                                </View>
                                :
                                <View style={{
                                    borderColor: colors.Gray_COLOR,
                                    borderWidth: 0.5,
                                    height: s(50),
                                    flex: 1,
                                    justifyContent: 'center',
                                    marginTop: s(20),
                                    marginLeft: s(50),
                                    marginRight: s(50),
                                    marginBottom: s(20)
                                }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Image
                                            source={require('../../assets/images/defult_user.png')}
                                            style={{ tintColor: colors.Gray_COLOR, height: s(35), width: s(35), justifyContent: 'center', alignContent: 'center' }}
                                        />
                                        <View style={{ marginLeft: s(10) }}>
                                            <View style={{ width: s(80), backgroundColor: colors.Gray_COLOR, height: s(1) }} />
                                            <View style={{ width: s(80), backgroundColor: colors.Gray_COLOR, height: s(1), marginTop: s(10) }} />
                                            <View style={{ width: s(80), backgroundColor: colors.Gray_COLOR, height: s(1), marginTop: s(10) }} />

                                            <View style={{ flexDirection: 'row', marginTop: s(10) }}>
                                                <View style={{ width: s(10), backgroundColor: colors.Gray_COLOR, height: s(1) }} />
                                                <View style={{ width: s(40), backgroundColor: colors.Gray_COLOR, height: s(1), marginLeft: s(10) }} />
                                                <View style={{ width: s(10), backgroundColor: colors.Gray_COLOR, height: s(1), marginLeft: s(10) }} />
                                            </View>

                                        </View>

                                    </View>

                                </View>}
                        </View>
                        <View style={{ flexDirection: 'row', flex: 1, marginLeft: s(20), marginRight: s(20) }}>
                            <TouchableOpacity
                                style={styles.short_button}
                                onPress={() => {
                                    console.log('only check');
                                    ImagePicker.openCamera({
                                        width: 300,
                                        height: 400,
                                        cropping: true,
                                        includeBase64: true
                                    }).then(image => {
                                        console.log(image);
                                        setDefultImage(image?.path)
                                        setBack_Image_data(image?.data)
                                    });
                                }}>
                                <View style={styles.short_button}>
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
                                </View></TouchableOpacity>
                            <TouchableOpacity
                                style={styles.short_button}
                                onPress={() => {
                                    console.log('only check');
                                    ImagePicker.openPicker({
                                        width: 300,
                                        height: 400,
                                        cropping: true,
                                        includeBase64: true
                                    }).then(image => {
                                        // console.log("image>>", image);
                                        console.log("image>>", image?.path);
                                        setDefultImage(image?.path)
                                        setBack_Image_data(image?.data)
                                        // { render_image() }
                                    });
                                }}>
                                <View style={styles.short_button}>
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
                                        {'Your photo gallery'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>




                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: getButtonColor(Front_Image_data, Back_Image_data) }]}
                            disabled={(Front_Image_data != '' && Back_Image_data != '') ? false : true}
                            onPress={() => {
                                console.log('only check');
                                if (props?.route?.params?.name == 'Aadhar Card') {
                                    storeAadharCardData('true',Front_Image_data,Back_Image_data);
                                }else if (props?.route?.params?.name == 'Driving License') {
                                    storeLicenseData('true',Front_Image_data,Back_Image_data);
                                }else if (props?.route?.params?.name == 'Voter ID Card') {
                                    storeVoterIDData('true',Front_Image_data,Back_Image_data);
                                }
                                props.navigation.goBack();
                            }}>


                            <Text
                                style={{
                                    color: colors.WHITE_COLOR,
                                    fontFamily: fonts('poppinsSemibold'),
                                }}>
                                {'Upload'}
                            </Text>


                        </TouchableOpacity>



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



export default AadharCard;
