import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput, Button, Pressable , ScrollView } from 'react-native';
import EditAddressStyle from './EditAddressStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import { Screens, navigate } from '../../helpers/Screens'
import Actions from "./EditAddressAction";
import AddaddressActions from '../AddAddress/AddAddressAction'
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


export const EditAddress = (props) => {

    const totalamount =  props?.route?.params?.customParam

    let id = props.route?.params?.customParam


    const [name, setName] = useState(id.name)
    const [number, setNumber] = useState(id.mobile)
    const [House, setHouse] = useState(id.house_number)
    const [Stname, setStname] = useState(id.street_name)
    const [Bookingfor, setBookingfor] = useState(id.booking_for)
    const [namemessage, setnamemessage] = useState("")
    const [phonemessage , setphonemessage] = useState("")
    const [isactive , setisactive] = useState(false)

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
                <Text style={styles.topnavtext}>Edit Add Address</Text>
            </View>
            <ScrollView>
            <View style={[styles.Body, styles.paddingClass]}>
                
                <View style={[styles.BodyComponentSecond]}>
                    <View style={[styles.Bodyformbox, styles.paddingClass]}>
                        <View style={[styles.Bodyform]}>
                            <Pressable style={{flexDirection:'row-reverse'}}
                            onPress={() => {
                                const body = {
                                    'is_active': isactive,
                                }
                                props.deleteAddress( body , props?.token, id.id)
                                props.getaddress(props?.token)
                                navigate(Screens.ADD_ADDRESS)
                                // console.log("delete button clicked" , props?.token, id.id)
                            }}
                            >
                                <AntDesign
                                    style={{ fontSize: 25, marginRight: 10, color: "#A2A2A2" }}
                                    name="delete"
                                    backgroundColor="#3b5998"
                                />
                            </Pressable>
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
                                    setName(value); console.log(value) }}
                                placeholder='Enter Name'></TextInput>
                                <Text>{namemessage}</Text>
                            <Text style={[styles.TextHeading, styles.marginTopBottonClass,]}>
                                MOBILE NUMBER</Text>
                            <TextInput
                                value={number}
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                onChangeText={(value) => { 
                                    if (!regx.test(value)) {
                                        setphonemessage("Invalid phone number")
                                    } else {
                                        setphonemessage("")
                                    }
                                    setNumber(value); console.log(value) }}
                                placeholder='Enter Mobile Number'></TextInput>
                                <Text>{phonemessage}</Text>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                HOUSE/FLAT NUMBER & BUILDING*</Text>
                            <TextInput
                                value={House}
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                onChangeText={(value) => { setHouse(value); console.log(value) }}
                                placeholder='Enter House And Building'></TextInput>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                STREET NAME</Text>
                            <TextInput
                                value={Stname}
                                onChangeText={(value) => { setStname(value); console.log(value) }}
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                placeholder='Enter Street Name Or Landmark'></TextInput>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                BOOKING FOR</Text>
                            <TextInput
                                value={Bookingfor}
                                onChangeText={(value) => { setBookingfor(value); console.log(value) }}
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                placeholder='Eg. Self, Parents, Children'></TextInput>
                        </View>
                    </View>
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
                                props.editAddress(body, props?.token, id.id)
                                // props.getaddress(props?.token)
                                navigate(Screens.ADD_ADDRESS , totalamount)
                            }}
                            title="SAVE ADDRESS"
                            color="#47CACC" />
                    </View>
                </View>
            </View>
            
            </ScrollView>
        </SafeAreaView>
    )
}
let styles = create(EditAddressStyle);

const mapStateToProps = (state) => ({
    token: state?.user?.userData?.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getaddress: (token) => { dispatch(AddaddressActions.fetchAddress(token)) },
        editAddress: (body, token, id) => dispatch(Actions.editAddress(body, token, id)),
        deleteAddress: (body, token, id) => dispatch(Actions.deleteAddress(body, token, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAddress)
