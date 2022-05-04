/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import DashedLine from 'react-native-dashed-line';
import SignatureCapture from 'react-native-signature-capture';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import loggedInClient from '../../utility/apiAuth/loggedInClient';
import APIName from '../../utility/api/apiName';
import Spinner from 'react-native-loading-spinner-overlay';

const Signature = props => {
    const sign = useRef();
    const [Image_data, setImage_data] = useState('');
    const [getloader, setloader] = useState(false);
    const [touch, settouch] = useState(false);

    useEffect(() => {
        console.log('This will run every dashjkjcjkxcjkxjckjxkcj>>>>>>!');



    }, []);
    const onSave = function (result) {
        console.log("ldkfldkfk>>>>>>>", result);
        setImage_data('data:image/png;base64,' + result.encoded);
        setloader(true);
        UploadSignature('data:image/png;base64,' + result.encoded);
        // setData(`data:image/png;base64,${result.encoded}`);
        // signatureView.current.show(false);
    };
    const UploadSignature = async (database64) => {
        const client = await loggedInClient();
        const data = {
            client_user: '1',
            sign_image: database64,

        };
        console.log('cancel_Request', '' + JSON.stringify(data));
        client.post(APIName.create_signature, data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        ToastAndroid.show("Signature Updated successfully!", ToastAndroid.SHORT);

                        props.navigation.goBack();
                        // setresponse(response.data);

                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                    setloader(false);
                } else if (response.status == 201) {
                    let data = response.data;
                    try {

                        ToastAndroid.show("Signature Updated successfully!", ToastAndroid.SHORT);
                        // setresponse(response.data);
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
                ToastAndroid.show("getting error!", ToastAndroid.SHORT);

                setloader(false);
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

                            <Text style={styles.Title}>Signature</Text>
                            <Image
                                source={require('../../assets/images/left.png')}
                                style={{ tintColor: colors.PRIMARY_COLOR, height: s(24), width: s(24), position: 'absolute', top: 0, left: 0 }}
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: s(10) }}>PPMC Report for (Harmind Arora)</Text>



                <ScrollView>
                    <View style={styles.container}>

                        <Pressable
                            onPress={() => {
                                console.log('only check');
                                settouch(true);
                            }}>
                            <View style={{
                                borderWidth: 1,
                                borderStyle: 'dashed',
                                borderColor: colors.Gray_COLOR,
                                flex: 1,
                                height: s(400),
                                justifyContent: 'flex-end',
                                marginTop: s(20),
                                marginLeft: s(30),
                                marginRight: s(30)

                            }}>

                                <SignatureCapture
                                    style={styles.signature}
                                    ref={sign}
                                    // onSaveEvent={this._onSaveEvent}
                                    // onDragEvent={this._onDragEvent}
                                    saveImageFileInExtStorage={false}
                                    showNativeButtons={false}
                                    showTitleLabel={false}
                                    backgroundColor={colors.WHITE_COLOR}
                                    strokeColor={colors.PRIMARY_TEXT_COLOR}
                                    minStrokeWidth={4}
                                    maxStrokeWidth={4}
                                    viewMode={"portrait"}
                                    onSaveEvent={onSave} />

                                <TouchableOpacity
                                    style={styles.short_button}
                                    onPress={() => {
                                        console.log('only check');
                                        sign.current.resetImage();
                                    }}>

                                    <View style={{ flexDirection: 'row' }}>

                                        <Text
                                            style={{
                                                color: colors.WHITE_COLOR,
                                                marginLeft: s(5),
                                                fontFamily: fonts('poppinsSemibold'),
                                                fontSize: s(10)
                                            }}>
                                            {'Clear all'}
                                        </Text>
                                    </View>


                                </TouchableOpacity>

                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
                <View style={{}}>


                </View>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:(touch != '' && touch != '') ?colors.BUTTON:colors.DARK_GRAY}]}
                    disabled={(touch != '' && touch != '') ? false : true}
                    onPress={() => {
                        console.log('only check');
                        sign.current.saveImage()
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
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
        height: '100%'
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
        height: s(25),
        width: s(100),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: s(20),
        fontSize: s(12),
        margin: s(10),
        alignSelf: 'flex-end',
        fontFamily: fonts('poppinsSemibold'),
        position: 'absolute',
        bottom: 0,
        right: 0
    },
});



export default Signature;
