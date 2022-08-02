import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image ,BackHandler} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { resetScreen, Screens } from '../../../helpers/Screens';

const { height, width } = Dimensions.get('screen');

const ConnectGoogleFit = (props) => {
    var [dailySteps, setdailySteps] = useState(0);
    var [heartRate, setHeartRate] = useState(0);
    var [calories, setCalories] = useState(0);
    var [hydration, setHydration] = useState(0);
    var [sleep, setSleep] = useState(0);
    var [weight, setWeight] = useState(0);
    var [bloodPressure, setBloodPressure] = useState({});
    var [loading, setLoading] = useState(true);
    const backAction = () => {
        props.navigation.goBack()
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
    const options = {
        scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
            Scopes.FITNESS_BLOOD_PRESSURE_READ,
            Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
            Scopes.FITNESS_BLOOD_GLUCOSE_READ,
            Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
            Scopes.FITNESS_NUTRITION_WRITE,
            Scopes.FITNESS_SLEEP_READ,
        ],
    };
    const signinWithGFit = () => {
        GoogleFit.checkIsAuthorized().then(() => {
            var authorized = GoogleFit.isAuthorized;
            console.log("authorisss", authorized);
            if (authorized) {
                // if already authorized, fetch data
                googleFitSteps();

            } else {
                // Authentication if already not authorized for a particular device
                GoogleFit.authorize(options)
                    .then(authResult => {
                        if (authResult.success) {
                            console.log('AUTH_SUCCESS', authResult);
                            googleFitSteps();

                        } else {
                            console.log('AUTH_DENIED ' + authResult.message);
                        }
                    })
                    .catch(() => {
                        dispatch('AUTH_ERROR');
                    });
            }
        });
    }
    const googleFitSteps = () => {
        console.log("entererd")
        var today = new Date();
        var lastWeekDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 8,
        );
        const opt = {
            // startDate: "2022-01-01T00:00:17.971Z", // required ISO8601Timestamp
            startDate: lastWeekDate.toISOString(),
            endDate: today.toISOString(), // required ISO8601Timestamp
            bucketUnit: 'DAY', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
            bucketInterval: 1, // optional - default 1. 
        };
        GoogleFit.getDailyStepCountSamples(opt)
            .then((res) => {
                console.log('Daily steps### >>>0 ', res[2])
            })
            .catch((err) => {
                console.log('Daily steps error>>> ', err)
            });
        // or with async/await syntax
        async function fetchData() {
            const res = await GoogleFit.getDailyStepCountSamples(opt)
            console.log(res[2], "FETCHHHH DAADATAT");
        }
        fetchData();
        props.navigation.goBack()
        // shortcut functions, 
        // return weekly or daily steps of given date
        // all params are optional, using new Date() without given date,
        // adjustment is 0 by default, determine the first day of week, 0 == Sunday, 1==Monday, etc.
        GoogleFit.getDailySteps(date).then().catch()
        GoogleFit.getWeeklySteps(date, adjustment).then().catch()
    }
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
                        <Text style={styles.txtHead}>Connect to Google Fit</Text>
                    </View>
                </View>
                <View style={styles.cirCons}>
                    <View style={styles.blankCons}>
                        <Image
                            style={styles.logo}
                            source={require('../../../staticData/assests/google-fiticon.png')}
                        />
                    </View>
                </View>
                <View style={styles.txtCon}>
                    <Text style={styles.gTxt}>Google Fit</Text>
                </View>
                <View style={styles.rgmTxt}>
                    <Text style={styles.loremTxt}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut.</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    signinWithGFit()
                }}>
                    <View style={styles.btmCon}>
                        <View style={styles.cirCon}>
                            <View style={styles.blankCon}>
                                <Image
                                    style={styles.smallfitlogo}
                                    source={require('../../../staticData/assests/google-fiticon.png')}
                                />
                            </View>
                        </View>
                        <Text style={styles.btmTxt}>Sign in with Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default ConnectGoogleFit

const styles = StyleSheet.create({
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF',
        // justifyContent: 'center',

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
        alignItems: 'flex-end',
        padding: 10,
    },
    headCon: {
        height: height / 13,
        width: width / 1.2,
        // backgroundColor: 'blue',
        justifyContent: 'center',

    },
    txtHead: {
        color: '#707070',
        fontSize: 20,
        fontFamily: 'Jost-Medium',

    },
    cirCons: {
        height: height / 10,
        width: width / 1,
        // backgroundColor: 'red',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    blankCons: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#707070'

    },
    txtCon: {
        height: height / 15,
        width: width / 1,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gTxt: {
        color: '#707070',
        fontSize: 16,
        fontFamily: 'Jost-Medium',

    },
    rgmTxt: {
        height: height / 10,
        width: width / 1.35,
        // backgroundColor: 'pink',
        alignSelf: 'center'
    },
    loremTxt: {
        color: '#707070',
        fontSize: 14,
        fontFamily: 'Jost-Regular',

    },
    btmCon: {
        height: height / 17,
        width: width / 1.3,
        backgroundColor: '#E5184E',
        alignSelf: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center'

    },
    btmTxt: {
        color: '#FFFFFF',
        fontSize: 17,
        fontFamily: 'Jost-Medium',

    },
    cirCon: {
        height: height / 18,
        width: width / 4.5,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blankCon: {
        height: 30,
        width: 30,
        borderRadius: 25,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.5,
        borderColor: '#707070'

    },
    logo: {
        width: 40,
        height: 40,
        minHeight: 30,
        maxHeight: 40,
    },
    smallfitlogo: {
        width: 28,
        height: 28,
        marginTop: 2
    }
})