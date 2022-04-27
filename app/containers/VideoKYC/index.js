/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import { RNCamera } from 'react-native-camera';

const VideoKYC = props => {
    const [Image_data, setImage_data] = useState('');

    useEffect(() => {
        console.log('This will run every dashjkjcjkxcjkxjckjxkcj>>>>>>!');
    }, []);

    const cameraRef = useRef(null);

    const videoRecord = async () => {
        if (cameraRef && cameraRef.current) {
            cameraRef.current.open({ maxLength: 30 }, (data) => {
                console.log('captured data', data); // data.uri is the file path
                setImage_data(data.uri);
            });
        }
    }

    return (
        <>
            <VideoRecorder ref={cameraRef} />
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>


                <View style={styles.toolbar}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.goBack();


                        }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Text style={styles.Title}>Video KYC</Text>
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


                        <View style={{
                            borderWidth: 1,
                            borderStyle: 'dashed',
                            borderColor: colors.Gray_COLOR,
                            height: s(140),
                            flex: 1,
                            backgroundColor: colors.Thine_Gray,
                            justifyContent: 'center',
                            marginTop: s(50),
                            marginLeft: s(30),
                            marginRight: s(30)

                        }}>
                            {Image_data != '' && Image_data != null ?
                                <Image
                                    source={{
                                        uri: Image_data
                                    }}
                                    style={{ backgroundColor: colors.Gray_COLOR, flex: 1, resizeMode: 'cover' }}
                                ></Image> :
                                <Image
                                    source={require('../../assets/images/video-camera.png')}
                                    style={{ tintColor: colors.Gray_COLOR, height: s(54), width: s(54), alignContent: 'center', alignSelf: 'center' }}
                                />}
                        </View>






                        {Image_data != '' && Image_data != null ?
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: s(20), marginRight: s(20), justifyContent: 'center', marginTop: s(30) }}>
                                <TouchableOpacity
                                    style={styles.preview_button}
                                    onPress={() => {
                                        console.log('only check');

                                    }}>
                                    <View style={[styles.preview_button, { backgroundColor: colors.WHITE_COLOR, borderColor: colors.PRIMARY_COLOR, borderWidth: s(1) }]}>

                                        <Text
                                            style={{
                                                color: colors.PRIMARY_COLOR,
                                                marginLeft: s(5),
                                                fontFamily: fonts('poppinsSemibold'),
                                                fontSize: s(10)
                                            }}>
                                            {'Cancel'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.preview_button}
                                    onPress={() => {
                                        console.log('only check');

                                    }}>
                                    <View style={styles.preview_button}>

                                        <Text
                                            style={{
                                                color: colors.WHITE_COLOR,
                                                marginLeft: s(5),
                                                fontFamily: fonts('poppinsSemibold'),
                                                fontSize: s(10)
                                            }}>
                                            {'Preview'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View> :
                            <View style={{ flexDirection: 'row', flex: 1, marginLeft: s(20), marginRight: s(20), justifyContent: 'center', marginTop: s(30) }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        videoRecord()
                                    }}>

                                    <View style={styles.short_button}>

                                        <Text
                                            style={{
                                                color: colors.WHITE_COLOR,
                                                marginLeft: s(5),
                                                fontFamily: fonts('poppinsSemibold'),
                                                fontSize: s(10)
                                            }}>
                                            {'Start Recoding'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }





                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: Image_data ? colors.BUTTON : colors.DARK_GRAY }]}
                    onPress={() => {
                        console.log('only check');
                    }}>


                    <Text
                        style={{
                            color: colors.WHITE_COLOR,
                            fontFamily: fonts('poppinsSemibold'),
                        }}>
                        {'Submit'}
                    </Text>


                </TouchableOpacity>
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
        backgroundColor: colors.DARK_GRAY,
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
        width: s(150),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.RED,
        borderRadius: s(20),
        fontSize: s(12),
        margin: s(10),
        alignSelf: 'center',
        fontFamily: fonts('poppinsSemibold'),
    },
    preview_button: {
        textAlign: 'center',
        alignContent: 'center',
        height: s(30),
        width: s(100),
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});



export default VideoKYC;
