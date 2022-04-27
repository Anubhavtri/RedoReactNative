/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect,useRef } from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import DashedLine from 'react-native-dashed-line';
import SignatureCapture from 'react-native-signature-capture';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Signature = props => {
    const sign=useRef();
    useEffect(() => {
        console.log('This will run every dashjkjcjkxcjkxjckjxkcj>>>>>>!');



    }, []);
    const onSave = function (result) {
        console.log("ldkfldkfk>>>>>>>",result);
        // setData(`data:image/png;base64,${result.encoded}`);
        // signatureView.current.show(false);
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
                                style={ styles.signature}
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
                                onSaveEvent={onSave}/>
                          
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

                    </View>
                </ScrollView>
                <View style={{}}>


                </View>
                <TouchableOpacity
                    style={styles.button}
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
        height:'100%'
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
        position:'absolute',
        bottom:0,
        right:0
    },
});



export default Signature;
