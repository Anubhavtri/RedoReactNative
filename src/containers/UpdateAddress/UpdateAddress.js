import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput, Button } from 'react-native';
import UpdateAddressStyles from './UpdateAddressStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import { Screens, navigate } from '../../helpers/Screens'
import Actions from "./UpdateAddressActions";
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const PatientDetails = (props) => {

    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)
    const [name, setName] = useState();
    const [land, setland] = useState();
    const [phone , setphone] = useState();
    const [address, setaddress] = useState();
    const [message , setmessage] = useState("")
    const [person , setperson] = useState() 

    console.log(name , land , phone , address , person)

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
                <Text style={styles.topnavtext}>Add New Address</Text>
            </View>
            <View style={[styles.Body, styles.paddingClass]}>
                <View style={[styles.BodyComponentfirst, styles.paddingClass]}>
                    <View style={[styles.FlexViewRow]}>
                        <Icon style={{ marginRight: 4 }} name="infocirlce" size={15.5} color="#F75010" />
                        <Text style={[styles.alertText, styles.TextBold]}>
                            Sample will be picked from the below address</Text>
                    </View>
                </View>
                <View style={[styles.BodyComponentSecond]}>
                    <View style={[styles.Bodyformbox, styles.paddingClass]}>
                        <View style={[styles.Bodyform]}>
                            <View style={{minHeight:50}}>
                            <AntDesign
                                onPress={(e) => { props.navigation.goBack() }}
                                style={{ fontSize: 25, marginRight: 10 , color:"#A2A2A2" }}
                                name="delete"
                                backgroundColor="#3b5998"
                            />
                            </View>
                            <Text style={[styles.TextHeading, styles.marginBottomClass]}>
                                NAME</Text>
                            {/* <TextInput                                   
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                                placeholder='Enter Name'></TextInput> */}
                            <TextInput  value={name} onChangeText={(value)=>{
                            if(!car.test(value)){
                                setmessage("Invalid name")
                            }else{
                                setmessage("")
                            }
                            setName(value)
                            }} style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal]}
                            placeholder='Enter Name' />
                            <Text style={[styles.TextHeading, styles.marginTopBottonClass,]}>
                                MOBILE NUMBER</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                placeholder='Enter Mobile Number'
                                onChangeText={(value)=>{
                                    setphone(value)
                                }}
                                ></TextInput>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                HOUSE/FLAT NUMBER & BUILDING*</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                placeholder='Enter House And Building'
                                required
                                onChangeText={(value)=>{
                                    setaddress(value)
                                }}
                                ></TextInput>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                STREET NAME</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                placeholder='Enter Street Name Or Landmark'
                                required
                                onChangeText={(value)=>{
                                    setland(value)
                                }}
                                ></TextInput>
                            <Text style={[styles.TextHeading, styles.marginBottomClass,]}>
                                BOOKING FOR</Text>
                            <TextInput
                                style={[styles.TextInput, styles.paddingClass, styles.TextSubHeading, styles.BorderColorNormal, styles.marginBottomClass]}
                                placeholder='Eg. Self, Parents, Children'
                                onChangeText={(value)=>{
                                    setperson(value)
                                }}
                                ></TextInput>
                        </View>
                    </View>
                    <View style={[styles.SaveButton,styles.paddingTopandBottom]}>
                        <Button
                            title="SAVE ADDRESS"
                            color="#47CACC" />
                    </View>
                </View>
            </View>
            <View style={[styles.Bottom, styles.BorderTop, styles.paddingClass, styles.FlexViewRow]}>
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
            </View>
        </SafeAreaView>
    )
}
let styles = create(UpdateAddressStyles);

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails)
