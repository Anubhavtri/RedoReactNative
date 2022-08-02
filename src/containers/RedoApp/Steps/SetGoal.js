import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');
import Step from '../../../staticData/svg/Step.svg'
import { navigate, Screens } from '../../../helpers/Screens';
const Steps = (props) => {
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <View style={styles.secCon}>
                    <View style={styles.arrowCon}>
                        <MaterialCommunityIcons
                            onPress={(e) => { props.navigation.goBack() }}
                            style={{ fontSize: 24, color: '#707070' }}
                            name="arrow-left"
                        />
                    </View>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>Set Goals</Text>
                    </View>
                </View>
                <View style={styles.imgCon}>
                    <Step height='125' />
                </View>
                <View style={styles.textCon}>
                    <Text style={styles.hiTxt}>Hi Shubham, let's set you up for success</Text>
                </View>
                <View style={styles.detailCon}>
                    <Text style={styles.detailTxt}>Goal targeting ensures that you are aware of how much progress you have made and how much is left to achieve!</Text>
                </View>
                <View style={styles.spaceCon}>
                    <TouchableOpacity onPress={() => { navigate(Screens.SETSELECTGOALS) }}
                        style={styles.btnCon}>
                        <Text style={styles.btnTxt}>Start Setting Goals</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Steps

const styles = StyleSheet.create({
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF',
    },
    secCon: {
        height: height / 13,
        width: width / 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        // backgroundColor: 'green',
        alignItems: 'center'
    },
    arrowCon: {
        height: height / 13,
        width: width / 7,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
    },
    headCon: {
        height: height / 13,
        width: width / 1.4,
        // backgroundColor: 'blue',
        justifyContent: 'center',
    },
    txtHead: {
        color: '#707070',
        fontSize: 20,
        fontFamily: 'Jost-Medium',
    },
    imgCon: {
        height: height / 5,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCon: {
        height: height / 15,
        width: width / 1.13,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    hiTxt: {
        color: '#272727',
        fontSize: 16,
        fontFamily: 'Jost-Medium'
    },
    detailCon: {
        height: height / 10,
        width: width / 1.13,
        // backgroundColor: 'blue',
        alignSelf: 'center',
    },
    detailTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Regular'
    },
    spaceCon: {
        height: height / 2.3,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    btnCon: {
        height: height / 16,
        width: width / 1.13,
        backgroundColor: '#E5184E',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    btnTxt: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'Jost-Medium'
    }
})
