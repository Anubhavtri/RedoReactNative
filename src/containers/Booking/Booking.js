import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Package from "../../components/Packages/Package"
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import BookingStyle from './BookingStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import Actions from './BookingAction';
import { Screens, navigate } from '../../helpers/Screens';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native-gesture-handler';

export const Booking = (props) => {

    const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);
    const [searchText, setSearchText] = useState('');


    const disableSpinner = () => setSpinnerVisibilty(false);

    useEffect(() => {
        setSpinnerVisibilty(true);
        props.fetchBooking(props.token, disableSpinner)
    }, []);

    


    return (
        <View style={styles.container}>
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
                    <Text style={styles.text}>Booking Page</Text>
                </View>
            </View>
            {/* <View style={{ flex: 1, flexGrow: 1, minHeight: '10%', maxHeight: '10%' }}>
                <View style={{ borderColor: '#A2A2A2', backgroundColor: 'white', borderWidth: 0.5, flexGrow: 1, flex: 1, flexDirection: 'row', padding: '3%', borderRadius: 5 }}>
                    <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', flexDirection: 'row', borderColor: '#A2A2A2', borderWidth: 0.5, borderRadius: 5 }}>
                        <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Feather
                                onPress={(e) => {
                                    props.navigation.goBack()
                                }}
                                style={{ fontSize: 25, color: '#E5184E', fontWeight: '500' }}
                                name="search"
                                backgroundColor="#3b5998"
                            />
                        </View>
                        <View style={{ flex: 1, flexGrow: 6, justifyContent: 'center' }}>
                            <TextInput style={styles.search}
                                value={searchText}
                                onChangeText={(value) => {
                                    setSearchText(value);
                                    console.log(searchText)
                                }}
                                placeholder="Search Tests, Package, Body Areas.."
                            />
                        </View>
                    </View>
                </View>
            </View> */}
            {/* <View style={styles.filter}>
                <View style={{ borderBottomColor: '#205072', borderBottomWidth: 1, flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.filtertext}>All packages</Text>
                </View>
                <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.inactive}>Covid 19</Text>
                </View>
                <View style={{ flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.inactive}>full body checkup</Text>
                </View>
            </View> */}
            <ScrollView>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 200,
                    flexGrow: 1,
                }}>

                    {props?.bookings?.map((item) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                style={{
                                    width: '90%', height: '85%', backgroundColor: '#FFFFFF', shadowOffset: { width: 0, height: 5 },
                                    shadowColor: '#313450',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    flexGrow: 0.2,
                                    marginTop: '2%',
                                    marginBottom: '2%'
                                }}
                            >
                                <View style={{
                                    width: '95%', height: '100%', flex: 1,
                                    flexGrow: 1
                                }}>
                                    <View style={{
                                        borderBottomWidth: 0.5, borderBottomColor: '#00000014', height: '20%', justifyContent: "center", flex: 1,
                                        flexGrow: 1, paddingVertical: '1%', minHeight: 50
                                    }}>
                                        <Text style={{ fontSize: 14, color: '#205072', fontWeight: 'bold' }}>{item.customer_name} </Text>
                                    </View>
                                    <View style={{
                                        borderBottomWidth: 0.5, borderBottomColor: '#00000014', height: '50%', justifyContent: 'center', flex: 1,
                                        flexGrow: 1, paddingVertical: '1%'
                                    }}>
                                        <Text style={{ color: '#707070', fontSize: 12, }}>{item.booking_date}</Text>
                                    </View>
                                    <View style={{
                                        display: 'flex', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', height: '30%', flex: 1,
                                        flexGrow: 1, paddingVertical: '1.5%'
                                    }}>

                                        <View style={{ display: 'flex', flexDirection: 'row', width: '50%', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Pressable style={{ marginLeft: '6%' }}
                                                onPress={() => {
                                                    props.downloadreport(props.token,disableSpinner, item.pk)
                                                }}
                                            >
                                                <Text style={{ fontSize: 14, color: '#FBFBFB', paddingVertical: '6%', paddingHorizontal: '15%', backgroundColor: '#E5184E', borderRadius: 5 }}>DOWNLOAD</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

let styles = create(BookingStyle);

const mapStateToProps = (state) => ({
    token: state.user.userData?.token,
    packageList: state.packageData?.allPackages,
    cityId: state.city?.cityObj,
    bookings: state?.customerbooking?.booking
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooking: (token, disableSpinner) => {
            dispatch(Actions.fetchBooking(token, disableSpinner));
        },
        downloadreport: (token, disableSpinner , pk) => {
            dispatch(Actions.downloadReport(token, disableSpinner , pk));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking)
