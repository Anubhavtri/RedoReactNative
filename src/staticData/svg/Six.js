import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Calendar from '../../staticData/svg/Calendar.svg'
import Girl from '../../staticData/svg/Girl.svg'
import Boy from '../../staticData/svg/Boy.svg'
import { Checkbox } from 'react-native-paper';
import Male from '../../staticData/svg/Male.svg'
import Female from '../../staticData/svg/Female.svg'

const { height, width } = Dimensions.get('window')

const PersonalDetails = () => {
    const [change, setChange] = useState(false)
    const [show, setShow] = useState(false)
    const [verify, setverify] = useState(false)
    const [inch, setinch] = useState(false)
    const [checked, setChecked] = React.useState(false);
    const [kg, setkg] = useState(false)
    const [lbs, setlbs] = useState(false)
    const [male, setmale] = useState(false)
    const [female, setfemale] = useState(false)
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <View style={styles.secCon}>
                    <TouchableOpacity>
                        <View style={styles.arrowCon}>
                            <MaterialCommunityIcons
                                onPress={(e) => { props.navigation.goBack() }}
                                style={{ fontSize: 24, color: '#707070' }}
                                name="arrow-left"
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>Personal Details</Text>
                    </View>
                </View>
                <View style={styles.scrollCon}>
                    <ScrollView>
                        <View style={styles.namCon}>
                            <Text style={styles.namTxt}>What's your name</Text>
                        </View>
                        <View style={styles.regSp}>
                            <TextInput
                                style={styles.txtIp}
                                placeholder="enter name"
                                placeholderTextColor={'#A2A2A2'}
                            />

                        </View>
                        <View style={styles.namCon}>
                            <Text style={styles.namTxt}>What's your date of birth</Text>
                        </View>
                        <View style={styles.regSp}>
                            <TextInput
                                style={styles.txtIp}
                                placeholder="dd/mm/yyyy"
                                placeholderTextColor={'#A2A2A2'}
                            />
                            <View style={styles.calCon}>
                                <Calendar />
                            </View>
                        </View>
                        <View style={styles.namCon}>
                            <Text style={styles.namTxt}>Select your gender</Text>
                        </View>
                        <View style={styles.regSp}>
                            <View style={styles.genCon}>
                                {male ? <Male  /> : <Girl />}
                                {female ? <Female /> : <Boy />}
                            </View>
                        </View>
                        <View style={styles.genBox}>
                            <TouchableOpacity onPress={() => {
                                setChange(false)
                                setShow(true)
                                setmale(false)
                                setfemale(true)
                            }}
                                style={show ? styles.femaleCon : styles.maleCon} >

                                <Text style={styles.maleTxt}>Male</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                setChange(true)
                                setShow(false)
                                setmale(true)
                                setfemale(false)

                            }}
                                style={change ? styles.femaleCon : styles.maleCon} >
                                <Text style={styles.maleTxts}>Female</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.heightCon}>
                            <Text style={styles.heiTxt}>Select your height</Text>
                            <View style={styles.smallCon}>
                                <TouchableOpacity onPress={() => {
                                    setinch(false)
                                    setverify(true)
                                }}
                                    style={verify ? styles.smallCot : styles.smallCons}>
                                    <Text style={styles.ftTxt}>ft</Text>
                                </TouchableOpacity>
                                <View
                                    style={inch ? styles.smallConses : styles.smallConse}>
                                    <TouchableOpacity onPress={() => {
                                        setverify(false)
                                        setinch(true)
                                    }}>
                                        <Text style={styles.ftTxt}>cm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dirCon}>
                            <TextInput
                                style={styles.txtInput}
                                keyboardType='numeric'
                            />
                            <View style={styles.sizeCon}>
                                <Text style={styles.sizeTxt}>ft</Text>
                            </View>
                            <TextInput
                                style={styles.txtInput}
                                keyboardType='numeric'
                            />
                            <View style={styles.sizeCon}>
                                <Text style={styles.sizeTxt}>in</Text>
                            </View>
                        </View>

                        <View style={styles.heightCon}>
                            <Text style={styles.heiTxt}>Select your weight</Text>
                            <View style={styles.smallCon}>
                                <TouchableOpacity onPress={() => {
                                    setlbs(false)
                                    setkg(true)
                                }}
                                    style={kg ? styles.smallCot : styles.smallCons}>
                                    <Text style={styles.ftTxt}>kg</Text>
                                </TouchableOpacity>
                                <View
                                    style={lbs ? styles.smallConses : styles.smallConse}>
                                    <TouchableOpacity onPress={() => {

                                        setkg(false)
                                        setlbs(true)
                                    }}>
                                        <Text style={styles.ftTxt}>lbs</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dirCon}>
                            <TextInput
                                style={styles.txtInput}
                                keyboardType='numeric'
                            />
                            <View style={styles.sizeCon}>
                                <Text style={styles.sizeTxt}>kg</Text>
                            </View>
                        </View>

                        <View style={styles.agreeCon}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                            />
                            <Text style={styles.agreeTxt}>I agree to T&C</Text>
                        </View>

                        <View style={styles.btnCon}>
                            <TouchableOpacity activeOpacity={0.5}
                                style={styles.btnBox}>
                                <Text style={styles.btnTxt}>Update Information</Text>

                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PersonalDetails

const styles = StyleSheet.create({
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF'
    },
    scrollCon: {
        height: height / 1.13
    },
    secCon: {
        height: height / 13,
        width: width / 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        // backgroundColor: 'green'
    },
    arrowCon: {
        height: height / 13,
        width: width / 7,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
    },
    headCon: {
        height: height / 13,
        width: width / 2,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        // alignItems: 'center',
    },

    txtHead: {
        color: '#707070',
        // backgroundColor: '#707070',
        fontSize: height / 45,
        fontFamily: 'Jost-Medium',
    },
    namCon: {
        height: height / 13,
        width: width / 1.15,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    namTxt: {
        color: '#707070',
        fontFamily: 'Jost-Medium',
        fontSize: 16,
        marginTop: 10
    },
    regSp: {
        height: height / 12,
        width: width / 1.15,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        flexDirection: 'row',
    },

    txtIp: {
        height: height / 16,
        width: width / 2.5,
        // backgroundColor: 'lightblue',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#707070',
        color: '#A2A2A2',
        fontFamily: 'Jost-Medium',
        fontSize: 14,
        paddingHorizontal: 10
    },
    calCon: {
        height: height / 15,
        // backgroundColor: 'cyan',
        width: width / 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    genCon: {
        height: height / 16,
        width: width / 3,
        // backgroundColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    genBox: {
        height: height / 12,
        width: width / 1.6,
        // backgroundColor: 'blue',
        // alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    maleCon: {
        height: height / 16,
        width: width / 4.5,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center'
    },
    femaleCon: {
        height: height / 16,
        width: width / 4.5,
        backgroundColor: '#47CACC',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center'
    },
    maleTxt: {
        color: '#A2A2A2',
        fontFamily: 'Jost-Medium',
        fontSize: 14,
    },
    maleTxts: {
        color: '#707070',
        fontFamily: 'Jost-Medium',
        fontSize: 14,
    },
    heightCon: {
        height: height / 12,
        width: width / 1.15,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    heiTxt: {
        color: '#707070',
        fontFamily: 'Jost-Medium',
        fontSize: 16
    },
    smallCon: {
        height: height / 23,
        width: width / 5,
        // backgroundColor: 'pink',
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#707070'
    },
    smallCons: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: '#707070'

    },
    smallCot: {
        height: height / 23,
        width: width / 10,
        backgroundColor: '#47CACC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: '#707070',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5


    },
    smallConse: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallConses: {
        height: height / 23,
        width: width / 10,
        backgroundColor: '#47CACC',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    dirCon: {
        height: height / 12,
        width: width / 1.15,
        // backgroundColor: 'lightblue',
        alignSelf: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtInput: {
        // backgroundColor: 'yellow',
        height: height / 20,
        width: width / 6.5,
        borderBottomWidth: 0.5,
        borderColor: '#000000',
        fontFamily: 'Jost-SemiBold',
        justifyContent: 'flex-end',
        fontSize: 16
    },
    sizeCon: {
        height: height / 25,
        width: width / 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'cyan'
    },
    ftTxt: {
        color: '#707070',
        fontFamily: 'Jost-Regular',
        fontSize: 14
    },
    sizeTxt: {
        color: '#707070',
        fontFamily: 'Jost-Regular',
        fontSize: 16
    },
    agreeCon: {
        height: height / 13,
        width: width / 1.15,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreeTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Medium'
    },
    btnCon: {
        height: height / 4,
        width: width / 1.15,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        // flexDirection: 'row',
        alignItems: 'center'
    },
    btnBox: {
        height: height / 15,
        width: width / 1.15,
        backgroundColor: '#E5184E',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    btnTxt: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'Jost-Medium'
    }
})