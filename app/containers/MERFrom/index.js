/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useState } from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import DashedLine from 'react-native-dashed-line';
import ImagePicker from 'react-native-image-crop-picker';
import loggedInClient from '../../utility/apiAuth/loggedInClient';
import APIName from '../../utility/api/apiName';
import Spinner from 'react-native-loading-spinner-overlay';

const MERFrom = props => {
    const [Front_Image_data, setFront_Image_data] = useState('');
    const [Front_Image_path, setFront_Image_path] = useState('');

    const [getloader, setloader] = useState(false);

    useEffect(() => {
        console.log('This will run every dashjkjcjkxcjkxjckjxkcj>>>>>>!');



    }, []);
    const getFileExtention = fileUrl => {
        // To get the file extension
        return /[.]/.exec(fileUrl) ?
          /[^.]+$/.exec(fileUrl) : undefined;
      };
    const UploadMER = async () => {
        const client = await loggedInClient();
        const data = {
            client_user: '1',
            scan_uploaded: "data:image/"+getFileExtention(Front_Image_path)+";base64,"+Front_Image_data,

        };
        console.log('cancel_Request', '' + JSON.stringify(data));
        client.post(APIName.create_mer_form, data)
            .then(response => {
                if (response.status == 200) {
                    let data = response.data;
                    try {
                        ToastAndroid.show("MER Form Updated successfully!", ToastAndroid.SHORT);

                        props.navigation.goBack();
                        // setresponse(response.data);

                    } catch (error) {
                        console.log('Exception' + error.test);
                    }

                    setloader(false);
                } else if (response.status == 201) {
                    let data = response.data;
                    try {

                        ToastAndroid.show("MER Form Updated successfully!", ToastAndroid.SHORT);
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

                            <Text style={styles.Title}>MER Form</Text>
                            <Image
                                source={require('../../assets/images/left.png')}
                                style={{ tintColor: colors.PRIMARY_COLOR, height: s(24), width: s(24), position: 'absolute', top: 0, left: 0 }}
                            />
                        </View>
                    </TouchableOpacity>

                </View>

                <View style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.Gray_COLOR,
                    flex: 1,
                    height: s(400),
                    justifyContent: 'flex-end',
                    marginTop: s(20),
                    marginLeft: s(5),
                    marginRight: s(5),
                    marginBottom:s(60)

                }}>



                    <Image
                        source={{
                            uri: `data:image/jpeg;base64,${Front_Image_data}`
                        }}
                        style={{ backgroundColor: colors.Gray_COLOR, flex: 1, resizeMode: 'cover' }}
                    />

                </View>
                {Front_Image_data?
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        console.log('only check');
                        setloader(true);
                        UploadMER();
                    }}>


                    <Text
                        style={{
                            color: colors.WHITE_COLOR,
                            fontFamily: fonts('poppinsSemibold'),
                        }}>
                        {'Submit'}
                    </Text>


                </TouchableOpacity> :
                <View style={{
                    flexDirection: 'row', flex: 1, position: 'absolute',
                    bottom: 0, width: '100%', alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity

                        onPress={() => {
                            console.log('only check');
                            ImagePicker.openCamera({
                                width: 300,
                                height: 400,
                                cropping: true,
                                includeBase64: true
                            }).then(image => {
                                console.log(image.path);
                                setFront_Image_path(image.path);
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
                        </View></TouchableOpacity>
                    <TouchableOpacity

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
                                setFront_Image_path(image?.path);
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
                </View>}


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
        position: 'absolute',
        bottom: 0,
        fontFamily: fonts('poppinsSemibold'),

    },
    short_button: {
        textAlign: 'center',
        alignContent: 'center',
        height: s(35),
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.PRIMARY_COLOR,
        borderRadius: s(20),
        fontSize: s(12),
        margin: s(10),
        paddingLeft: s(10),
        paddingRight: s(10),
        alignSelf: 'flex-end',
        fontFamily: fonts('poppinsSemibold'),
    },
});



export default MERFrom;
