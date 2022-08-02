import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import EditPersonalInfoStyle from './EditPersonalInfoStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import { Screens, navigate } from '../../helpers/Screens'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Actions from "./EditPersonalInfoAction";
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EditPersonalInfoAction from './EditPersonalInfoAction';
import ProfileAction from '../ProfileScreen/ProfileAction';

const CELL_COUNT = 6;

export const EditPersonalinfo = (props) => {

    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)
    const [name, setName] = useState(props?.UserDetails?.fullname);
    const [age, setage] = useState(props?.UserDetails?.age?.toString());
    const [email, setemail] = useState(props?.UserDetails?.email);
    const [address, setaddress] = useState(props?.UserDetails?.address);
    const [gender, setgender] = useState(props?.UserDetails?.gender);

    console.log(props?.UserDetails.gender, "userdetails")

    useEffect(() => {
        props.getProfileDetails(props?.token)
    }, [])

    const ageregx = /^[0-9]\d$/;

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
                <Text style={styles.topnavtext}>Personal Info</Text>
            </View>

            <View style={[styles.Body, styles.paddingClass]}>
                {/* <View style={[styles.BodyComponentfirst, styles.paddingClass]}>
                    <View style={[styles.FlexViewRow]}>
                    <Icon style={{marginRight:4}} name="infocirlce" size={15.5} color="#F75010" />
                    <Text style={[styles.alertText, styles.TextBold]}>
                        These details will appear on your final test reports</Text>
                    </View>
                </View> */}
                <View style={[styles.BodyComponentSecond]}>
                    <View style={[styles.Bodyformbox, styles.paddingClass]}>
                        <View style={[styles.Bodyform]}>
                            <View style={[styles.FlexViewRow]}>
                                <View style={[styles.BodyComponentfirstAge, styles.marginTopBottonClass]}>
                                    <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                        PATIENT'S NAME</Text>
                                    <Text
                                        style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                    >{name}</Text>
                                </View>
                                {/* <View style={[styles.BodyComponentfirstAge, styles.paddingClass]}>
                                    <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                        LAST NAME</Text>
                                    <Text
                                        style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                        >Tandon</Text>

                                </View> */}
                            </View>
                            <Text style={[styles.TextHeading, styles.marginTopBottonClass,]}>
                                MOBILE NUMBER</Text>
                            <Text
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                            >{props?.UserDetails?.phonenumber}</Text>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                EMAIL ID</Text>
                            <Text
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                            >{email}</Text>
                            <View style={[styles.FlexViewRow]}>
                                <View style={[styles.BodyComponentfirstAge, styles.marginTopBottonClass]}>
                                    <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                        Age</Text>
                                    <Text
                                        style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                    >{age}</Text>
                                </View>
                            </View>
                            <View style={[styles.FlexViewRow]}>
                                <View style={[styles.BodyComponentfirstAge, styles.paddingClass]}>
                                    <View style={styles.gender}>
                                        <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                            GENDER</Text>
                                        <View style={[styles.FlexViewRow, { justifyContent: 'space-between' }]}>
                                            <Text
                                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, male ? styles.SelectedText : styles.BorderColorNormal, { width: '40%' }]}>{gender}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.edit}>
                                <View style={[styles.FlexViewRow]}>
                                    <View style={[styles.BodyComponentfirstAge, styles.paddingClass]}>
                                        <Button
                                            onPress={() => {
                                                navigate(Screens.PERSONAL_INFO)
                                                // props.doEdit()
                                            }}
                                            title='Edit info'
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
let styles = create(EditPersonalInfoStyle);

const mapStateToProps = (state) => ({
    cityList: state.city?.cityArray,
    selectedCity: state.city?.cityObj,
    UserDetails: state.userprofile?.userProfile,
    token: state.user?.userData?.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
        doEdit: (name, age, email, address, userName, image, token) => {
            dispatch(Actions.doEdit(name, age, email, address, userName, image, token))
        },
        getProfileDetails: (token) => {
            dispatch(ProfileAction.getProfileDetails(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalinfo)
