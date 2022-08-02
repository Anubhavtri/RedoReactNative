import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput, Button, ScrollView, Pressable } from 'react-native';
import AddAddressStyles from './AddAddressStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import { RadioButton } from 'react-native-paper';
import { Screens, navigate } from '../../helpers/Screens'
import Actions from "./AddAddressAction";
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeleteAdress from '../EditAddress/EditAddressAction'

export const ProfileAddress = (props) => {

    const [totalamount, settotalamount] = useState(props?.route?.params?.customParam)

    // console.log(props.route, "fvfgjmgkturythgdfgk")


    const [checked, setChecked] = useState()
    const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);
    const [gender, setgender] = useState("")
    const disableSpinner = () => setSpinnerVisibilty(false);
    const [next, setnext] = useState(false)
    const [isactive, setisactive] = useState(false)

    const [Addressstate, setAddressstate] = useState([])
    const [Selected, setSelected] = useState({})
    // console.log(Selected, "selected")

    useEffect(() => {
        props.fetchAddress(props?.token)
    }, []);

    useEffect(() => {
        setAddressstate(props?.addressList)
    }, [props?.addressList]);


    // console.log(props.addressList, "address data ")
    const Address = ({ Addressstate }) => {

        return (
            Addressstate.map((item) => {

                return (
                    <View style={styles.package}>
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <Text style={styles.packageNameCard}>{item?.name}</Text>
                            </View>
                            <View style={styles.row}>
                                <RadioButton
                                    value={item}
                                    status={item === Selected ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        // console.log(item, "Item"),
                                            setSelected(item ? item : {})
                                        props?.SelectedAddress(item)
                                        setnext(true)
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.address}>
                                <Text style={[styles.TextHeading, { marginHorizontal: 15 }]}>{item?.house_number} , {item?.street_name}</Text>
                            </View>
                            <View style={styles.row}>
                                <View >
                                    <Pressable
                                        onPress={() => {
                                            navigate(Screens.PROFILE_EDIT_ADDADDRESS, item, totalamount)
                                        }}
                                        style={{ flexDirection: 'row', marginRight: 10 }}
                                    >
                                        <Feather
                                            style={{ fontSize: 15, marginRight: 10 }}
                                            name="edit"
                                            backgroundColor="#3b5998"
                                        />
                                        <Text>Edit</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => {
                                            const body = {
                                                'is_active': isactive,
                                            }
                                            props.deleteAddress(body, props?.token, item?.id)
                                            setTimeout(() => {
                                                props.fetchAddress(props?.token)
                                            }, 500);
                                        }}
                                        style={{ marginTop:20 , flexDirection:'row-reverse'}}
                                    >
                                        <AntDesign
                                            style={{ fontSize: 25, marginRight: 10 }}
                                            name="delete"
                                            backgroundColor="#3b5998"
                                        />
                                    </Pressable>
                                </View>
                            </View>

                        </View>

                    </View>

                )
            })
        )

    }

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.TopNav}>
                <MaterialCommunityIcons
                    onPress={(e) => { props.navigation.goBack() }}
                    style={{ fontSize: 25, marginRight: 10 }}
                    name="arrow-left"
                    backgroundColor="#3b5998"
                />
                <Text style={styles.topnavtext}> Address</Text>
            </View>
            <View style={[styles.Body, styles.paddingClass]}>
                <View style={[styles.BodyComponentfirst, styles.paddingClass]}>
                    <View style={[styles.FlexViewRow]}>
                        <Icon style={{ marginRight: 4 }} name="infocirlce" size={15.5} color="#F75010" />
                        <Text style={[styles.alertText, styles.TextBold]}>
                            Sample will be picked from the below address</Text>
                    </View>
                </View>
                <View style={[styles.Body, styles.paddingClass]}>
                    <ScrollView>
                        <Address Addressstate={Addressstate} />
                        <View style={{ borderColor: '#47CACC', borderWidth: 1, minHeight: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 12 }}>
                            <Pressable
                                onPress={() => {
                                    navigate(Screens.PROFILE_USER_ADDADDRESS, totalamount)
                                }}
                            >
                                <Text style={{ color: '#47CACC' }}>ADD NEW ADDRESS</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </View>
            {/* {next ?
                <View style={[styles.Bottom, styles.BorderTop, styles.paddingClass, styles.FlexViewRow]}>
                    <View style={[styles.bottomViewContainer]}>
                        <Text style={[styles.TextSubHeading]}>
                            Total Amount</Text>
                        <Text style={[styles.TextSubHeadingmedium, { fontSize: 16 }]}>₹{totalamount}</Text>
                    </View>
                    <View style={[styles.bottomViewContainer]}>
                        <Button
                            onPress={() => {
                                navigate(Screens.ADD_SLOT, totalamount);
                            }}
                            title="NEXT"
                            color="#E5184E" />
                    </View>
                </View>
                : null} */}
        </SafeAreaView>
    )
}
let styles = create(AddAddressStyles);

const mapStateToProps = (state) => ({
    token: state.user?.userData?.token,
    addressList: state?.customerAddres?.Address,
    cityId: state.city?.cityObj
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddress: (token) => {
            dispatch(Actions.fetchAddress(token));
        },
        SelectedAddress: (item) => {
            dispatch(Actions.SelectedAddress(item));
        },
        deleteAddress: (body, token, id) => dispatch(DeleteAdress.deleteAddress(body, token, id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAddress)
