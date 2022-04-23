/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ms, mvs, s, vs } from 'react-native-size-matters';
import colors from '../../templates/colors';
import fonts from '../../utility/fonts';
import DashedLine from 'react-native-dashed-line';
const KYCDocuments = props => {
    useEffect(() => {
        console.log('This will run every dashjkjcjkxcjkxjckjxkcj>>>>>>!');



    }, []);



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

                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: s(10), marginTop: s(5) }}>Update your documents use mobile camera or gallery</Text>

                        <TouchableOpacity
                            onPress={() => {
                                console.log('only check');
                                props.navigation.navigate('AadharCard');
                            }}>
                            <View style={styles.card_container}>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.circle_main}>
                                        <Image
                                            source={require('../../assets/images/accepted.png')}
                                            style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.card_title}>KYC Documents</Text>
                                <View style={styles.check_mark_container}>
                                    <Image
                                        source={require('../../assets/images/check-mark.png')}
                                        style={styles.check_mark}
                                    />
                                    <Image
                                        source={require('../../assets/images/cancel.png')}
                                        style={styles.cancel_mark}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.card_container}>
                            <View style={{ flex: 1 }}>
                                <View style={styles.circle_main}>
                                    <Image
                                        source={require('../../assets/images/accepted.png')}
                                        style={{ tintColor: colors.WHITE_COLOR, height: s(15), width: s(15), alignSelf: 'center' }}
                                    />
                                </View>
                            </View>
                            <Text style={styles.card_title}>KYC Video</Text>
                            <View style={styles.check_mark_container}>
                                <Image
                                    source={require('../../assets/images/check-mark.png')}
                                    style={styles.check_mark}
                                />
                                <Image
                                    source={require('../../assets/images/cancel.png')}
                                    style={styles.cancel_mark}
                                />
                            </View>
                        </View>

                        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ color: colors.PRIMARY_COLOR, alignSelf: 'center' }}> + add more KYC documents</Text>
                            <View style={{ backgroundColor: colors.PRIMARY_COLOR }}></View>
                        </View>




                        <TouchableOpacity
                            style={styles.button}
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
