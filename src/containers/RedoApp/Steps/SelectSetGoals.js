import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');

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
                <View style={styles.chartSpace}>
                    <View style={styles.chartCon}>
                    </View>
                </View>
                <View style={styles.queCon}>
                    <Text style={styles.queTxt}>What Are You Trying To Achieve</Text>
                </View>
                <View style={styles.bxSpace}>
                    <TouchableOpacity style={styles.bxCon}>
                        <Text style={styles.bxTxt}>Maintain Weight</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bxSpace}>
                    <TouchableOpacity style={styles.bxCon}>
                        <Text style={styles.bxTxt}>Loose Weight</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bxSpace}>
                    <TouchableOpacity style={styles.bxCon}>
                        <Text style={styles.bxTxt}>Gain Weight</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.spaceCon}>
                    <TouchableOpacity style={styles.btnCon}>
                        <Text style={styles.btnTxt}>Next</Text>
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

    spaceCon: {
        height: height / 2.8,
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
    },
    chartSpace: {
        height: height / 15,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chartCon: {
        height: height / 90,
        width: width / 1.15,
        backgroundColor: 'red',
        borderRadius: 25
    },
    queCon: {
        height: height / 7,
        width: width / 1.15,
        // backgroundColor: 'blue',
        alignSelf: 'center'
    },
    queTxt: {
        color: '#272727',
        fontSize: 16,
        fontFamily: 'Jost-Medium',
    },
    bxSpace: {
        height: height / 13,
        width: width / 1,
        // backgroundColor: 'blue',
        alignItems: 'center'
    },
    bxCon: {
        height: height / 17,
        width: width / 1.15,
        // backgroundColor: 'red',
        borderWidth: 0.5,
        borderColor: '#707070',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bxCons: {
        height: height / 17,
        width: width / 1.15,
        backgroundColor: '#FB5951',
        borderWidth: 0.5,
        borderColor: '#707070',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bxTxt: {
        color: '#C9C9C9',
        fontSize: 14,
        fontFamily: 'Jost-Medium',
    }
})
