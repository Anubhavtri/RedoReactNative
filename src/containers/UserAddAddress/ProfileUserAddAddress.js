import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput, Button, ScrollView, Pressable } from 'react-native';
import UserAddAddressStyles from './UserAddAddressStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import { Screens, navigate } from '../../helpers/Screens'
import Actions from "./UserAddAddressAction";
import AddaddressActions from '../AddAddress/AddAddressAction'
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


export const ProfileUserAddAddress = (props) => {

    const totalamount = props?.route?.params?.customParam

    const [name, setName] = useState()
    const [number, setNumber] = useState()
    const [House, setHouse] = useState()
    const [Stname, setStname] = useState()
    const [Bookingfor, setBookingfor] = useState()
    const [namemessage, setnamemessage] = useState("")
    const [phonemessage, setphonemessage] = useState("")
    const [bookingerrmsg , setbookingerrmsg] = useState("")
    const [land, setland] = useState('')

    const regx = /^[0-9]\d{1}$/;

    const car = /^[A-Za-z ]+$/;

    // console.log(male)
    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.TopNav}>
                <MaterialCommunityIcons
                    onPress={(e) => { props.navigation.goBack() }}
                    style={{ fontSize: 25, marginRight: 10 }}
                    name="arrow-left"
                    backgroundColor="#3b5998"
                />
                <Text style={styles.topnavtext}>Add Address </Text>
            </View>

            <ScrollView>
                <View style={[styles.Body, styles.paddingClass]}>
                    {/* <View style={[styles.BodyComponentfirst, styles.paddingClass]}>
                    <View style={[styles.FlexViewRow]}>
                        <Icon style={{ marginRight: 4 }} name="infocirlce" size={15.5} color="#F75010" />
                        <Text style={[styles.alertText, styles.TextBold]}>
                            Sample will be picked from the below address</Text>
                    </View>
                </View> */}
                    <View style={[styles.BodyComponentSecond]}>
                        <View style={[styles.Bodyformbox, styles.paddingClass]}>
                            <View style={[styles.Bodyform]}>
                                {/* <Pressable>
                                    <AntDesign
                                        style={{ fontSize: 25, marginRight: 10, color: "#A2A2A2" }}
                                        name="delete"
                                        backgroundColor="#3b5998"
                                    />
                                </Pressable> */}
                                <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                    NAME</Text>
                                <TextInput
                                    value={name}
                                    style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                    onChangeText={(value) => {
                                        if (!car.test(value)) {
                                            setnamemessage("Invalid name")
                                        } else {
                                            setnamemessage("")
                                        }
                                        setName(value); console.log(value)
                                    }}
                                    placeholder='Enter Name'></TextInput>
                                   {namemessage ? 
                                <Text style={styles.errormesasge}>{namemessage}</Text> : null }
                                {/* <Text style={[styles.TextHeading, styles.marginTopBottonClass,]}>
                                MOBILE NUMBER</Text> */}
                                {/* <TextInput
                                value={number}
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                onChangeText={(value) => { 
                                    if (!regx.test(value)) {
                                        setphonemessage("Invalid phone number")
                                    } else {
                                        setphonemessage("")
                                    }
                                    setNumber(value); console.log(value) }}
                                placeholder='Enter Mobile Number'></TextInput> */}
                                <Text style={styles.errormesasge}>{phonemessage}</Text>
                                <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                    HOUSE/FLAT NUMBER & BUILDING</Text>
                                <TextInput
                                    value={House}
                                    style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                    onChangeText={(value) => { setHouse(value); console.log(value) }}
                                    placeholder='Enter House And Building'></TextInput>
                                <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                    Landmark</Text>
                                <TextInput
                                    value={Stname}
                                    onChangeText={(value) => { setStname(value); console.log(value) }}
                                    style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                    placeholder='Enter Street Name Or Landmark'></TextInput>
                                <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                    BOOKING FOR</Text>
                                <TextInput
                                    value={Bookingfor}
                                    onChangeText={(value) => {
                                        if (!car.test(value)) {
                                            setbookingerrmsg("Invalid name")
                                        } else {
                                            setbookingerrmsg("")
                                        }
                                        setBookingfor(value); console.log(value)
                                    }}
                                    style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                    placeholder='Eg. Self, Parents, Children'></TextInput>
                                    {bookingerrmsg ?
                                <Text style={styles.errormesasge}>{bookingerrmsg}</Text> : null}
                            </View>
                        </View>
                        {namemessage || bookingerrmsg ? null : 
                        <View style={[styles.SaveButton, styles.paddingTopandBottom]}>
                            <Button
                                onPress={() => {
                                    const body = {
                                        name,
                                        'mobile': number,
                                        'house_number': House,
                                        'street_name': Stname,
                                        'booking_for': Bookingfor
                                    }
                                    if (name && House && Stname && Bookingfor) {
                                        props.postAddress(body, props?.token)
                                        setTimeout(() => {
                                            props.getaddress(props?.token)
                                        }, 700)

                                        navigate(Screens.PROFILE_ADDRESS, totalamount)
                                    } else {
                                        alert("Fill all details")
                                    }
                                }}
                                title="SAVE ADDRESS"
                                color="#47CACC" />
                        </View> }
                    </View>
                </View>
                {/* <View style={[styles.Bottom, styles.BorderTop, styles.paddingClass, styles.FlexViewRow]}>
                <View style={[styles.bottomViewContainer]}>
                    <Text style={[styles.TextSubHeading]}>
                        Total Amount</Text>
                </View>
                <View style={[styles.bottomViewContainer]}>
                    <Button
                        onPress={() => {
                            navigate(Screens.ADD_SLOT);
                        }}
                        title="NEXT"
                        color="#E5184E" />
                </View>
            </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}
let styles = create(UserAddAddressStyles);

const mapStateToProps = (state) => ({
    token: state?.user?.userData?.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getaddress: (token) => { dispatch(AddaddressActions.fetchAddress(token)) },
        postAddress: (body, token) => dispatch(Actions.postAddress(body, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserAddAddress)
