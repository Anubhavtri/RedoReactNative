import React, { useState, useEffect } from 'react';
import {
    View, Text, PermissionsAndroid,
    Platform,
    Linking
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import BookingAction from './BookingAction';
import { Screens, navigate } from '../../helpers/Screens';
import FlatButton from '../../baseComponents/button/FlatButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';
import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import BookingStyle from './BookingStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import Feather from 'react-native-vector-icons/Feather';


const PhleboDetails = (props) => {
    const [mmitoken, setmmitoken] = useState("");
    const [phleboLongitude, setPhleboLongitude] = useState("")
    const [phleboLatitude, setPhleboLatitude] = useState("")
    const PhleboName = props?.route?.params?.customParam?.phleboName;
    const [phleboContact, setphleboContact] = useState(props?.route?.params?.customParam?.phleboContact)
    // const phleboContact = props?.route?.params?.customParam?.phleboContact;
    const BookingId = props?.route?.params?.customParam?.bookingid;
    console.log(props.route.params, "Here")
    console.log("booking iiiiddddd", BookingId)
    console.log("mmi token", mmitoken);
    console.log("phlebo longitude", phleboLongitude);
    console.log("phlebo latitude", phleboLatitude);
    console.log(phleboContact, "contact no")

    const [currentLongitude, setCurrentLongitude] = useState('');
    const [currentLatitude, setCurrentLatitude] = useState('');
    const [locationStatus, setLocationStatus] = useState('');
    const [trackPhlebo, settrackPhlebo] = useState(false);

    useEffect(() => {
        // requestLocationPermission();
        getOneTimeLocation();
    }, []);
    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            getOneTimeLocation();

        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );
                if (granted === PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
                    //To Check, If Permission is granted
                    getOneTimeLocation();

                } else {
                    setLocationStatus('Permission Denied');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const getOneTimeLocation = () => {
        console.log('Getting Location ...')
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                //getting the Longitude from the location json
                const currentLong =
                    JSON.stringify(position.coords.longitude);
                //getting the Latitude from the location json
                const currentLat =
                    JSON.stringify(position.coords.latitude);
                console.log("positionnnnnnnnn long", currentLong);
                console.log("positionnnnnnnnn lat", currentLat)
                //Setting Longitude state
                setCurrentLongitude(currentLong);

                //Setting Longitude state
                setCurrentLatitude(currentLat);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };
    console.log("customer longitude", currentLongitude);
    console.log("customer latitude", currentLatitude);
    useEffect(() => {
        // if (trackPhlebo == true) {
        getmmitoken();
        // }
    }, [])

    const getmmitoken = () => {
        console.log("entererd token")
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
        params.append('client_id', '33OkryzDZsKamfiPiKFdn3JedW3I1sO_efflBdDslqsmTSZmsD2SPw4DU3SPC459TYVRlA4DUCLLpIoO5jAOJQ==')
        params.append('client_secret', 'lrFxI-iSEg8wS11NUoDEndR2zcztS6p73mr5dC4bfgeS1SSbfOhj2SKP-Vh0gbPinqh-w3f66JbgvjrDuq5OdXMZYOVLEuEG')

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post('https://outpost.mapmyindia.com/api/security/oauth/token', params, config)

            .then(({ data }) => {
                // console.log("mmi data", data.access_token);
                setmmitoken(data.access_token)
            })
            .catch(function (error) {
                console.log("error", error);
            });

    }
    useEffect(() => {
        // if (trackPhlebo == true) {
        getlivelocation();
        // }
    }, [mmitoken])

    useEffect(() => {
        const latlng = {
            Longitude: phleboLongitude,
            Latitude: phleboLatitude
        }
        props.setLatiLangPhlebo(latlng)
    }, [phleboLongitude, phleboLatitude])
    useEffect(() => {
        const latlng = {
            Longitude: currentLongitude,
            Latitude: currentLatitude
        }
        props.setLatiLangCustomer(latlng)
    }, [currentLongitude, currentLatitude])

    const getlivelocation = () => {
        console.log("entererd live loc")
        let config = {
            headers: { 'Authorization': 'Bearer ' + mmitoken },
            params: {
                name: `${PhleboName}`
            },
        }
        axios.get('https://intouch.mapmyindia.com/iot/api/device/', config)
            .then(function (response) {
                setPhleboLatitude(`${response?.data?.data[0]?.location?.latitude}`)
                setPhleboLongitude(`${response?.data?.data[0]?.location?.longitude}`)
            })
            .catch(function (error) {
                console.log("live loc err", error);
            })
    }
    useEffect(() => {
        getphleboloc();
    }, [])
    const getphleboloc = () => {
        const Token = props.token
        const params = {
            booking_id: `${BookingId}`
        }
        const successCall = (response) => {
            console.log(" phl loc response ", response.results);
            if (response.results.length > 0) {
                settrackPhlebo(true)
            }
        };

        const errorCall = (errorResponse) => {
            console.log("error get phl loc", errorResponse);
        };

        Api.doGet(Locations.PHLEBOLOC, params, successCall, errorCall, Token);
    }
    return (
        
        <View style={[styles.container]}>
            <View style={styles.header}>
                <View style={{ minHeight: '5%', flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons
                        onPress={(e) => {
                            props.navigation.goBack()
                        }}
                        style={{ fontSize: 25, marginRight: 10 }}
                        name="arrow-left"
                        backgroundColor="#3b5998"
                    />
                    <Text style={styles.text}>Phlebo Details</Text>
                </View>
            </View>
            
            <Text style={{ fontSize: 14, color: '#E71950', fontWeight: 'bold', textAlign: 'center' }}>Phlebo Details</Text>
            <Text style={{ fontSize: 14, color: '#205072', fontWeight: 'bold', textAlign: 'center', marginVertical: 5 }}>Name: {PhleboName} </Text>
            <Text onPress={() => {
                Linking.openURL(`tel:${phleboContact}`)
            }}
                style={{ fontSize: 14, color: '#205072', fontWeight: 'bold', textAlign: 'center', marginVertical: 5 }}>Contact Number: {phleboContact}
                {phleboContact != "Not available" ?
                    <Feather
                        onPress={() => {
                            Linking.openURL(`tel:${phleboContact}`)
                        }}
                        style={{ fontSize: 20, marginRight: 10 }}
                        name="phone-call"
                        backgroundColor="#3b5998"
                    /> : null}
            </Text> 
            {PhleboName == "Not available" ?
                <View />
                :
                <View>
                    {currentLatitude && currentLongitude ? 
                <FlatButton text={'Track Phlebo'}
                    onPress={() => {
                        if (currentLatitude == '' || currentLongitude == '') {
                            alert('Unable to fetch Your location')
                        } else if (phleboLatitude == '' || phleboLongitude == '') {
                            alert('Unable to fetch Phlebos location')
                        } else {
                            navigate(Screens.TRACKING)
                        }
                    }
                    }
                /> : null }
                </View>
            }

        </View>
    )
}
let styles = create(BookingStyle);

const mapStateToProps = (state) => ({
    latLang: state?.customerbooking?.latLng,
    token: state.user.userData?.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
        setLatiLangPhlebo: (latLang) => dispatch(BookingAction.setLatiLangPhlebo(latLang)),
        setLatiLangCustomer: (latLang) => dispatch(BookingAction.setLatiLangCustomer(latLang)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhleboDetails)
