import React, { useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput, Button, ScrollView, Pressable } from 'react-native';
import MyFamilyFriendsStyle from './MyFamily&FriendsStyle';
import { create } from '../../helpers/PlatformSpecificStyles'
import Actions from "./MyFamily&FriendsAction";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const MyFamilyFriends = (props) => {

    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)
    const [name, setName] = useState();
    const [age, setage] = useState();
    const [email, setemail] = useState();
    const [phone, setphone] = useState();
    const [namemessage, setnamemessage] = useState("")
    const [phonemessage, setphonemessage] = useState("")
    const [emailmessage, setemailmessaage] = useState("")

    const regx = /^[0-9]\d{1}$/;

    const car = /^[A-Za-z ]+$/;

    const eid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.TopNav}>
                <MaterialCommunityIcons
                    onPress={(e) => { props.navigation.goBack() }}
                    style={{ fontSize: 25, marginRight: 10 }}
                    name="arrow-left"
                    backgroundColor="#3b5998"
                />
                <Text style={styles.topnavtext}>My Family & Friends</Text>
            </View>
            <View style={[styles.Body, styles.paddingClass]}>
                <View style={[styles.BodyComponentSecond]}>
                    <View style={[styles.Bodyformbox, styles.paddingClass]}>
                        <View style={[styles.Bodyform]}>
                            <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                PATIENT'S NAME</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                placeholder='Enter Name'
                                onChangeText={(value) => {
                                    if (!car.test(value)) {
                                        setnamemessage("Invalid name")
                                    } else {
                                        setnamemessage("")
                                    }
                                    setName(value)
                                }}
                            ></TextInput>
                            <Text>{namemessage}</Text>
                            <Text style={[styles.TextHeading, styles.marginTopBottonClass,]}>
                                MOBILE NUMBER</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                placeholder='Enter Mobile Number'
                                onChangeText={(value) => {
                                    if (!regx.test(value)) {
                                        setphonemessage("Invalid phone number")
                                    } else {
                                        setphonemessage("")
                                    }
                                    setphone(value)
                                }}
                            ></TextInput>
                            <Text>{phonemessage}</Text>
                            <View style={[styles.FlexViewRow]}>
                                <View style={[styles.BodyComponentfirstAge, styles.marginTopBottonClass]}>
                                    <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                        AGE</Text>
                                    <TextInput
                                        style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, { width: '50%' }]}
                                        placeholder='in Years'></TextInput>
                                </View>
                                <View style={[styles.BodyComponentfirstAge, styles.paddingClass]}>
                                    <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                        GENDER</Text>
                                    <View style={[styles.FlexViewRow, { justifyContent: 'space-between' }]}>
                                        <Text
                                            onPress={() => {
                                                setMale(true)
                                                setFemale(false)
                                            }}
                                            style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, male ? styles.SelectedText : styles.BorderColorNormal, { width: '40%' }]}>Male</Text>
                                        <Text
                                            onPress={() => {
                                                setMale(false)
                                                setFemale(true)
                                            }}
                                            style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, female ? styles.SelectedText : styles.BorderColorNormal, { width: '40%' }]}>Female</Text>
                                    </View>
                                </View>
                            </View>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                EMAIL ID</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                placeholder='Enter Email ID'
                                onChangeText={(value) => {
                                    if (!eid.test(value)) {
                                        setemailmessaage("Invalid email name")
                                    } else {
                                        setemailmessaage("")
                                    }
                                    setemail(value)
                                }}
                            ></TextInput>
                            <Text>{emailmessage}</Text>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                BOOKING FOR</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                placeholder='eg. Self , Father'></TextInput>

                            <View style={styles.addmember}>
                                <Text style={{ fontSize: 14, color: '#47CACC' }}>Add Member</Text>
                                <Pressable>
                                    <Ionicons
                                        onPress={(e) => { props.navigation.goBack() }}
                                        style={{ fontSize: 25, marginRight: 10 }}
                                        name="add-circle-outline"
                                        backgroundColor="#47CACC"
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
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
                            navigate(Screens.ADD_ADDRESS);
                        }}
                        title="NEXT"
                        color="#E5184E" />
                </View>
            </View> */}
        </SafeAreaView>
    )
}

let styles = create(MyFamilyFriendsStyle);

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyFamilyFriends)
