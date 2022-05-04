/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Button, Dimensions, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import VideoRecorder from 'react-native-beautiful-video-recorder';
import { RNCamera } from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loggedInClient from '../../utility/apiAuth/loggedInClient';
import APIName from '../../utility/api/apiName';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { useFocusEffect } from '@react-navigation/native';

const VideoKYC = props => {
    const sign = useRef();
    const [Image_data, setImage_data] = useState('');
    const [player, setPlayer] = useState('');
    const [preview, setPreview] = useState('');
    const [ImageBase64_data, setImageBase64_data] = useState('');
    const [getloader, setloader] = useState(false);

    const countInterval = useRef(null);
    const [count, setCount] = useState(10);
    const loaderValue = useRef(new Animated.Value(0)).current;
    const barWidth = Dimensions.get('screen').width - 30;



    useFocusEffect(
        React.useCallback(() => {
            if (getloader) {
                countInterval.current = setInterval(() => setCount((old) => old + 5), 1000);
                return () => {
                    clearInterval(countInterval); //when user exits, clear this interval.
                };
            }
        }, [getloader])
    );




    const cameraRef = useRef(null);

    const videoRecord = async () => {
        if (cameraRef && cameraRef.current) {
            cameraRef.current.open({ maxLength: 30, language: 'en/' }, (data) => {
                // console.log('captured data', data); // data.uri is the file path
                setImage_data(data.uri);


                try {
                    RNFS.readFile(data.uri, 'base64')
                        .then(res => {
                            setImageBase64_data(res);
                        });
                } catch (error) {

                }
            });
            //     const base64image = await RNFS.readFile(Image_data, 'base64');
            //    // const base64 = await FileSystem.readAsStringAsync(Image_data, { encoding: 'base64' });
            //     console.log("res>>>>",base64image);
        }
    }
    const UploadVideo = async () => {
        const client = await loggedInClient();
        const data = {
            client_user: '1',
            video: 'data:image/mp4;base64,' + ImageBase64_data,

        };
        console.log('cancel_Request', '' + JSON.stringify(data));
        client.post(APIName.create_video_kyc, data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        ToastAndroid.show("KYC Updated successfully!", ToastAndroid.SHORT);

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
    const progressCustomStyles = {
        backgroundColor: colors.PRIMARY_COLOR,
        borderWidth: 0,
        borderRadius: s(10),
        height: 20
    };
    return (
        <>
            {getloader ? <View style={styles.progress_container}>
                <Text >Loading....</Text>
                <View style={[styles.progressBar, { backgroundColor: count >= 100 ? 'transparent' : colors.DARK_GRAY }]}>
                    <ProgressBarAnimated
                        {...progressCustomStyles}
                        width={barWidth}
                        value={count}
                        maxValue={100}
                        onComplete={() => {
                            if (count >= 100) {
                                setCount(100);
                                clearInterval(countInterval);
                            }

                        }}
                    />


                </View>

                <Text style={{ marginTop: s(20), fontFamily: fonts('poppinsSemibold'), fontSize: s(20) }}>{count >= 100 ? 'Done' : count + '%'}</Text>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: count >= 100 ? colors.BUTTON : colors.DARK_GRAY, position: 'absolute', bottom: 0 }]}
                    disabled={count >= 100 ? false : true}
                    onPress={() => {
                        props.navigation.goBack();

                    }}>


                    <Text
                        style={{
                            color: colors.WHITE_COLOR,
                            fontFamily: fonts('poppinsSemibold'),
                        }}>
                        {'Confirm'}
                    </Text>


                </TouchableOpacity>
            </View> :
                <View style={styles.container}>
                    < VideoRecorder ref={cameraRef}
                    />

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
                                        preview != '' && preview != null ?
                                            // <Video source={{ uri: Image_data }}   // Can be a URL or a local file.
                                            //     ref={(ref) => {
                                            //         setPlayer(ref)
                                            //     }}                                      // Store reference
                                            //     // onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                            //     // onError={this.videoError}  
                                            //     isExternalPlaybackActive= {true}             // Callback when video cannot be loaded
                                            //     style={styles.backgroundVideo} /> 
                                            <VideoPlayer
                                                style={styles.backgroundVideo}
                                                source={{ uri: Image_data }}
                                            //navigator={this.props.navigator}
                                            />
                                            :
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

                                                setImage_data('');
                                                setPreview('');
                                                setImageBase64_data('');
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
                                                setPreview('true')
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
                            disabled={(Image_data != '') ? false : true}

                            onPress={() => {
                                console.log('only check');
                                setloader(true);
                                UploadVideo();
                            }}>


                            <Text
                                style={{
                                    color: colors.WHITE_COLOR,
                                    fontFamily: fonts('poppinsSemibold'),
                                }}>
                                {'Submit'}
                            </Text>


                        </TouchableOpacity>
                        {/* {getloader ?
                            <Spinner
                                visible={true}
                                textContent={'Loading...'}
                                textStyle={styles.spinnerTextStyle}
                            /> : null} */}
                    </View>
                </View>

            }
        </>
    );
};
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE_COLOR
    },
    progress_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: s(2),
        padding: 8,
    },
    toolbar: {
        backgroundColor: 'transparent',
        height: s(50),
        padding: s(10),
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bar: {
        borderRadius: 15,
        height: '100%',
    },
    progressBar: {
        height: 20,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: colors.DARK_GRAY,
        borderWidth: 0,
        borderRadius: s(10),
        marginTop: s(20)

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
    backgroundVideo: {
        backgroundColor: colors.Gray_COLOR, flex: 1, resizeMode: 'cover'
    },
});



export default VideoKYC;
