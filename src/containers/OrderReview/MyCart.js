import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, View, Text, ScrollView, Pressable, Button, Dimensions, TouchableOpacity, ToastAndroid, Animated, Alert, Modal } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import OrderReviewStyle from './OrderReviewStyle';
import { create } from '../../helpers/PlatformSpecificStyles'
import Svg, { Path, G, Circle, Rect, text } from 'react-native-svg';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-gesture-handler';
import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import MyCartStyle from './MyCartStyle';
import { Screens, navigate } from '../../helpers/Screens'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Actions from './MyCartAction'
import MycartShoping from '../../staticData/svg/MycartShoping-cart.svg';
import BestAction from '../../components/OurBestPackages/BestPackageAction'
import PackageAction from '../../components/Packages/PackageActions'
import Documentsvg from '../../staticData/svg/mycartdocument.svg'
import { toInteger } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwipeUpDown from 'react-native-swipe-up-down';
import Coupon from '../Coupon/Coupon';
import DISCOUNT from '../../staticData/svg/DISCOUNT.svg';
import GiftCard from '../../staticData/svg/gift-card.svg'
import Persent from '../../staticData/svg/DISCOUNTtwo.svg'
import RightTick from '../../staticData/svg/righttick.svg'
import RedActions from '../RedCash/RedCashAction'

// import Discounts from '../../staticData/svg/Discounts';

// for coupons 

const { height, width } = Dimensions.get('window')
const SCREEN_HEIGHT = Math.round(height)
const SCREEN_WIDTH = Math.round(width)
// Animation
const startValue = new Animated.Value(Math.round(height + height * 0.8))
const endValue = Math.round(height - height * 0.8)
const duration = 1000

const _showBottomView = (key) => {

    const toValue = key === 'HIDE' ? height : endValue

    Animated.timing(startValue, {
        toValue,
        duration: duration,
        useNativeDriver: true,
    }).start()
}

export const MyCart = (props) => {

    const [selectedPackage, setselectedPackage] = useState([])
    const [offer, setoffer] = useState(0)
    const [pack, setpack] = useState(0)
    const [discount, setdiscount] = useState({})
    const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);
    const [Discount, setDiscount] = useState(0)
    const [apply, setapply] = useState(false)
    const [coupon, setcoupon] = useState()
    const [priceing, setpriceing] = useState()
    const [couponname, setcouponname] = useState()
    const [discountedprice, setdiscountedprice] = useState()
    const [couponid, setcouponid] = useState()
    const [show, setshow] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibles, setModalVisibles] = useState(false);
    const [discountname, setdiscountname] = useState()
    const [noofcoupons, setnoofcoupons] = useState()
    const [PackagePrice, setPackagePrice] = useState()
    const [modalVisibleee, setModalVisibleee] = useState(false);
    const [redcashdiscount, setredcashdiscount] = useState('')
    const [couponpercentage, setcouponpercentage] = useState()
    const [couponpersentcal, setcouponpersentcal] = useState()
    const [redmodalVisible, setredmodalVisible] = useState(false);
    const [forcoupon, setforcoupon] = useState(false)
    const [forredcash, setforredcash] = useState(false)
    const [tick, settick] = useState(false)
    const [modal, setModal] = useState(false);
    const [removeitem, setremoveitem] = useState()
    const [cityvisepackage, setcityvisepackage] = useState()
    const [modalVisibless, setModalVisibless] = useState(false);
    const [removepacname, setremovepacname] = useState('')

    const previouspackages = useRef(props?.PackageCart);

    useEffect(() => {
        props.getCart(props?.cityId?.cityid, props?.token)
    }, [])

    // console.log(couponid, "discount ")

    let minusvalue = discount?.discount

    // const storeData = async () => {
    //     try {
    //         const newvalue = JSON.stringify(couponpersentcal)
    //         console.log("cou id and disc after stringify", jsonValue, discou)
    //         await AsyncStorage.setItem('calculated', newvalue)
    //     } catch (e) {
    //         console.log(e, "set item error")
    //     }
    // }

    const totalpriceing = () => {
        if (discount?.minimum_price < offer) {
            setDiscount(discount?.discount)
            setdiscountedprice(offer - minusvalue)
            setpriceing(discountedprice ? discountedprice : offer < selectedPackage[0]?.package?.min_booking_amount_for_phlebo ? offer + 200 : offer)
            // console.log(couponid, "offer price")
        }
    }

    useEffect(() => {
        setselectedPackage(props?.PackageCart)
        Couponlogicremove()
    }, [props?.PackageCart])
    const disableSpinner = () => setSpinnerVisibilty(false);
    useEffect(() => {
        setSpinnerVisibilty(true);
    }, []);
    useEffect(() => {
        props.fetchcoupon(props?.token, '', '')
        props.getRedCash(props.token)
    }, [])

    var offeramount = 0
    var packamount = 0

    const Couponlogic = (item) => {
        setforredcash(true)
        props?.setCouponObj(item)
        if (item?.minimum_price > offer) {
            alert("total price is less then minimun price ", item?.minimum_price)
        } else {
            if (item?.is_red_cash == true) {
                setcouponid(item?.id)
                setdiscountname(item?.name)
                setModalVisible(true)
                setModalVisibles(!modalVisibles)
                setredcashdiscount(item?.discount)  
                setcouponpercentage(item?.discount_type)
                // if (item?.id && item?.discount != 0) {
                //     storeData(item)
                // }
            } else {
                console.log(item, ">>>>>>>>>>>><<<<<<<<<1111111111111111")
                setDiscount(item?.discount)
                setcouponid(item?.id)
                setdiscountname(item?.name)
                setModalVisible(true)
                setcouponpercentage(item?.discount_type)
                setModalVisibles(!modalVisibles)
                if (item?.discount_type == "amount") {
                    setdiscountedprice(Math.round( offer - item?.discount))
                } else {
                    const percentageintoamount = item?.discount / 100
                    const multipliedvalue = offer * percentageintoamount
                    setcouponpersentcal(Math.ceil(multipliedvalue))
                    setdiscountedprice(Math.round(offer - multipliedvalue))
                }
            }
        }
    }

    const redcashlogic = () => {
        const totdiscount = (offer * 10) / 100
        if (props?.Redcash?.redCash[0]?.coins > totdiscount) {
            setforcoupon(true)
            settick(true)
            props.Redcashdata()
            setdiscountedprice(Math.ceil(offer - totdiscount))
            setredmodalVisible(true)
        } else {
            alert("You dont have enough redcash")
        }
    }

    const checkNormalPackage = (packages) => {
        let isNormalPackage = false;
        packages && packages.length > 0 &&
            packages.map((item) => {
                if (!item.is_addon) {
                    isNormalPackage = true;
                }
            })
        return isNormalPackage;
    }

    const Couponlogicremove = () => {
        props?.clearcouponobj()
        setdiscountedprice()
        setDiscount(0)
        setdiscountname()
        setredcashdiscount()
        settick(false)
        setforcoupon(false)
        setforredcash(false)
    }

    const addonlogic = selectedPackage.filter((data) => {
        // console.log(data?.package?.is_addon,"Each Package")
        return (data?.package?.is_addon === false)
    })

    // console.log(offer)
    const Update = () => {

        return (
            selectedPackage?.map((item) => {
                return (
                    <View>
                        {item?.package?.available ?
                            null
                            :
                            <View>
                                <Text>Updates in your cart</Text>
                                <Text>{item?.package?.name}</Text>
                                <Text>The package {item?.package?.name} is not available for this Pin-code</Text>
                                <Text>1 item in your cart is not available for selected Pin-code</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisibless(true)
                                        setremovepacname(item?.package)
                                    }}
                                >
                                    <Text>View Items</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                )
            })
        )
    }

    var ne = 0
    const PackageDetail = () => {
        selectedPackage?.map((item) => {
            if (addonlogic.length > 0 && item?.package?.is_addon === true) {
                setoffer(offeramount += item?.package?.addon_price)
                setpack(packamount += item?.package?.package_city_prices ? item?.package?.package_city_prices?.package_price : item?.package?.package_price)
            } else {
                setpack(packamount += item?.package?.package_city_prices ? item?.package?.package_city_prices?.package_price : item?.package?.package_price)
                setoffer(offeramount += item?.package?.package_city_prices ? item?.package?.package_city_prices?.offer_price : item?.package?.offer_price)
                setpriceing(discountedprice ? discountedprice : offer < selectedPackage[0]?.package?.min_booking_amount_for_phlebo ? offer + 200 : offer)
            }
        }
        )

        console.log(selectedPackage, ">>>>>>>>asdfghjkl;>><<<<<<<<")


        return (
            selectedPackage?.map((item) => {
                return (
                    <TouchableOpacity
                        style={styles.package}
                    >
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{width: width/1.2}}>
                            <Text style={styles.packageNameCard}>{item?.package?.name}</Text>
                            </View>
                            <AntDesign
                                onPress={() => {
                                    // alert("let do popup")
                                    setremoveitem(item)
                                    setModal(true)
                                    // props.removePackCart(item?.id, props?.token),
                                    //     // console.log("delete api click", item?.id, props?.token)
                                    //     setTimeout(() => {
                                    //         props.getCart(props?.cityId?.cityid, props?.token)
                                    //         ToastAndroid.show("Removed", ToastAndroid.SHORT);
                                    //     }, 700);
                                }}
                                style={{ fontSize: 25, marginRight: 10, color: "#A2A2A2" }}
                                name="delete"
                                backgroundColor="#3b5998"
                            />
                        </View>

                        <View style={styles.pckgBorderline}>
                            <Text style={[styles.TextHeading, { marginHorizontal: 15, fontWeight: '700', }]}>Inclusion : {item?.package?.parameter == 1 ? `${item?.package?.parameter} Test` : `${item?.package?.parameter} Tests`}</Text>
                            <Text style={[styles.TextSubHeading, { marginHorizontal: 15 }]}>{item?.package?.description}</Text>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.row}>
                                <Text style={[styles.cutprice]}>Rs {item?.package?.package_city_prices ? item?.package?.package_city_prices?.package_price : item?.package?.package_price}/-</Text>
                                {/* {addOnObj.length > 0 && item?.package?.is_addon === true ?
                                    <Text>{item?.package?.addon_price}</Text> :
                                    <Text style={[styles.offerPrice]}>Rs {item?.package?.package_city_prices ? item?.package?.package_city_prices?.offer_price : item?.package?.offer_price}/-</Text>
                                } */}
                                {/* addOnObj.length > 0 && packageDetails.is_addon === true */}
                                {addonlogic.length > 0 && item?.package?.is_addon === true ?
                                    // <Text>{item?.package?.addon_price}</Text>
                                    <Text style={[styles.offerPrice]}>Rs {item?.package?.addon_price}/-</Text>
                                    :
                                    // <Text>bendi</Text>
                                    <Text style={[styles.offerPrice]}>Rs {item?.package?.package_city_prices ? item?.package?.package_city_prices?.offer_price : item?.package?.offer_price}/-</Text>
                                }
                                {/* <Text style={[styles.offerPrice]}>Rs {item?.package?.package_city_prices ? item?.package?.package_city_prices?.offer_price : item?.package?.offer_price}/-</Text> */}
                            </View>
                            <View style={styles.offerpercent}>
                                <Text style={{ fontSize: 10, color: 'white' }}>Get {Math.floor(((((item?.package.package_city_prices ? item?.package.package_city_prices?.package_price : item?.package.package_price) - (item?.package.package_city_prices ? item?.package.package_city_prices?.offer_price : item?.package.offer_price)) / (item?.package.package_city_prices ? item?.package.package_city_prices?.package_price : item?.package.package_price)) * 100))} % OFF</Text>
                            </View>
                        </View>
                        {previouspackages ?
                            <View>
                                { previouspackages?.current.map((itemtwo)=>{
                                    return(
                                        <View>
                                            {item?.id == itemtwo?.id ?
                                            <View>
                                                {item?.package.package_city_prices?.offer_price != itemtwo?.package.package_city_prices?.offer_price ?
                                            <Text>Price is different{item?.package.package_city_prices?.offer_price} to {itemtwo?.package.package_city_prices?.offer_price}</Text> : null   
                                            }
                                            </View>
                                            :
                                            null
                                            }
                                        </View>
                                    )
                                })}
                            </View>
                            :
                            <View>
                                <Text>Not working</Text>
                            </View>
                        }
                        {item?.package?.available ? null :
                            <View>
                                <Text>This Item is not available for this Pin-code</Text>
                            </View>}
                    </TouchableOpacity>
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
                <Text style={styles.topnavtext}>My Cart</Text>
            </View>
            <View style={[styles.Body, styles.paddingClass]}>
                {selectedPackage.length == 0 ?
                    <ScrollView>
                        <View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                            <View style={{ minHeight: 300, justifyContent: 'center', alignItems: 'center' }}>
                                <MycartShoping />
                                <Text style={{ fontSize: 20, color: '#707070', minHeight: 50, paddingTop: 10 }}>Your Cart is Empty!</Text>
                                <Text style={{ fontSize: 16, color: '#707070' }}>There are no items in your cart.</Text>
                                <Text style={{ fontSize: 16, color: '#707070' }}>Explore and add packages!</Text>
                            </View>
                            <View>
                                <TouchableOpacity
                                    style={{ borderRadius: 5, marginTop: 30, backgroundColor: '#E5184E', minWidth: '90%', minHeight: 40, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        navigate(Screens.ALLPACKAGE)
                                    }}
                                >
                                    <Text style={{ color: '#FFFFFF', fontSize: 17 }}>Explore Packages</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    :
                    <ScrollView>
                        <Update />
                        <PackageDetail />
                        <Pressable style={[styles.AddTest, styles.row]}
                            onPress={() => {
                                navigate(Screens.ALLPACKAGE, {
                                    search: '',
                                    from: 'mainpageTabs',
                                    best: false,
                                    packageIndex: 0,
                                });
                            }}
                        >
                            <Text style={[styles.packageNameCard, { color: '#47CACC' }]}>Add More Test</Text>
                            <Ionicons
                                onPress={(e) => { navigate(Screens.ALLPACKAGE) }}
                                style={{ fontSize: 25, marginRight: 10, backgroundColor: '#47CACC', borderRadius: 20, fontWeight: '900', color: "white" }}
                                name="add"
                                backgroundColor="#ffffff"
                            />
                        </Pressable>
                        <View style={[styles.BodyComponentfirstone, styles.paddingClass]}>
                            <View style={[styles.FlexViewRow]}>
                                <Documentsvg />
                                <Text style={[styles.alertTextone, styles.TextBold]}>
                                    FREE E-Report will be sent to your registered email ID</Text>
                            </View>
                        </View>
                        {discountname ?
                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={() => { }}>
                                <View style={styles.couponsection}>
                                    <DISCOUNT />
                                    <View
                                        style={{
                                            width: '85%',
                                            justifyContent: 'center',
                                            minHeight: 50,
                                        }}>
                                        <Text style={{ color: '#47CACC', fontSize: 14 }}>
                                            {discountname}
                                        </Text>
                                        <Text style={{ color: '#707070', fontSize: 12 }}>
                                            Offer applied on the bill
                                        </Text>
                                    </View>
                                    <AntDesign
                                        // onPress={() => setModalVisibles(!modalVisibles)}
                                        // style={{ fontSize: 25, marginLeft: "50%", color: "#E5184E", fontWeight: "900" }}
                                        onPress={() => {
                                            Couponlogicremove()
                                        }}
                                        style={{ color: '#E5184E', fontSize: 19, fontWeight: '900' }}
                                        name="close"
                                        backgroundColor="#3b5998"
                                    />
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                activeOpacity={0.85}
                                // onPress={() => {
                                //     _showBottomView(),
                                //         setshow(true)
                                // }}
                                disabled={forcoupon}
                                onPress={() => setModalVisibles(true)}
                            >
                                <View style={styles.couponsection}>
                                    <DISCOUNT />
                                    <View
                                        style={{
                                            width: '85%',
                                            justifyContent: 'center',
                                            minHeight: 50,
                                        }}>
                                        <Text style={{ color: '#47CACC', fontSize: 14 }}>
                                            Apply Coupon
                                        </Text>
                                    </View>
                                    <AntDesign
                                        name='right'
                                        color={'#707070'}
                                    />
                                </View>
                            </TouchableOpacity>
                        }
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisibles}
                            onRequestClose={() => {
                                setModalVisibles(!modalVisibles);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={{
                                        height: SCREEN_HEIGHT * 1,
                                        width: '100%',
                                        // backgroundColor: 'cyan'
                                    }}>
                                        <AntDesign
                                            onPress={() => setModalVisibles(!modalVisibles)}
                                            style={{ fontSize: 25, marginLeft: "50%", color: "#E5184E", fontWeight: "900" }}
                                            name="close"
                                            backgroundColor="#3b5998"
                                        />
                                        <ScrollView style={{ marginBottom: 50 }}>
                                            <View style={styles.applyCon}>
                                                <Text style={styles.applyTxt}>Apply coupon</Text>
                                            </View>
                                            <View style={styles.inputCon}>
                                                <View style={styles.inputCons}>
                                                    <TextInput
                                                        style={styles.inputField}
                                                        value={couponname}
                                                        placeholder="Enter Coupon Code"
                                                        onChangeText={(value) => {
                                                            props.fetchcoupon(props?.token, '', value)
                                                            setcouponname(value)
                                                        }}
                                                    />
                                                    {/* <TouchableOpacity
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.inputTxt}>Apply</Text>
                                </TouchableOpacity> */}
                                                </View>
                                            </View>
                                            {props?.couponslist?.coupons?.length != 0 ?
                                                <View style={styles.listCon}>
                                                    <Text style={styles.listTxt}>Select coupons from the list</Text>
                                                </View> : <View style={styles.listCon}>
                                                    <Text style={styles.listTxt}>Coupon are not available</Text>
                                                </View>}
                                            {props?.couponslist?.coupons ?
                                                <View>
                                                    {props?.couponslist?.coupons?.map((item, index) => {
                                                        // console.log(item, "coupon item")

                                                        if (index < 15) {
                                                            return (
                                                                <View
                                                                    key={index}
                                                                    style={styles.discountCon}>
                                                                    {item?.org_type == "homedx" && item?.minimum_price < offer ?
                                                                        <View style={styles.discountContan}>
                                                                            <View style={styles.discountCons}>
                                                                                <View style={{ minWidth: '40%', flexDirection: 'row' }}>
                                                                                    <GiftCard />
                                                                                    <Text style={styles.discountTxt}> {item?.name}</Text>
                                                                                </View>
                                                                                <TouchableOpacity
                                                                                    onPress={() => {
                                                                                        _showBottomView('HIDE')
                                                                                        setshow(false)
                                                                                        // setdiscount(item)
                                                                                        // setcouponname(item.code)
                                                                                        // setcouponid(item?.id)
                                                                                        // totalpriceing(item)
                                                                                        // setTimeout(() => {
                                                                                        // }, 995);
                                                                                        Couponlogic(item)
                                                                                    }}
                                                                                >
                                                                                    <Text style={styles.appTxt}> Apply </Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                            {item?.tnc ?
                                                                                // <ScrollView>
                                                                                //     <Text style={styles.codeTxt}>{item?.tnc}</Text>
                                                                                // </ScrollView>
                                                                                <View style={styles.codeCon}>
                                                                                    <Pressable
                                                                                        // style={[styles.button, styles.buttonOpen]}
                                                                                        onPress={() => setModalVisibleee(true)}
                                                                                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                                                                    >
                                                                                        {item?.discount_type == "amount" ?
                                                                                            <Text style={styles.codeTxt}>
                                                                                                Get {item.discount} Rs  Off
                                                                                            </Text> :
                                                                                            <Text style={styles.codeTxt}>
                                                                                                Get {item.discount} % Off
                                                                                            </Text>
                                                                                        }
                                                                                        <Text style={styles.appTxt}>T&C</Text>
                                                                                    </Pressable>
                                                                                    <Modal
                                                                                        animationType="slide"
                                                                                        transparent={true}
                                                                                        visible={modalVisibleee}
                                                                                        onRequestClose={() => {
                                                                                            Alert.alert("Modal has been closed.");
                                                                                            setModalVisibleee(!modalVisibleee);
                                                                                        }}
                                                                                    >
                                                                                        <Pressable onPress={() => setModalVisibleee(!modalVisibleee)}>
                                                                                            <View style={styles.centeredView}>
                                                                                                <View

                                                                                                    style={{ backgroundColor: 'white', minHeight: 150, justifyContent: 'center', borderRadius: 5, alignItems: 'center', padding: 10, justifyContent: 'space-evenly' }}
                                                                                                // style={styles.modalView}
                                                                                                >
                                                                                                    <Text style={styles.codeTxt}>{item?.tnc}</Text>
                                                                                                    <Pressable
                                                                                                        // style={[styles.button, styles.buttonClose]}
                                                                                                        onPress={() => setModalVisibleee(!modalVisibleee)}
                                                                                                    >
                                                                                                        <Text style={styles.appTxt}>Close</Text>
                                                                                                    </Pressable>
                                                                                                </View>
                                                                                            </View>
                                                                                        </Pressable>
                                                                                    </Modal>
                                                                                </View>
                                                                                :
                                                                                <View style={styles.codeCon}>
                                                                                    {item?.discount_type == "amount" ?
                                                                                        <Text style={styles.codeTxt}>
                                                                                            Get {item.discount} Rs Off
                                                                                        </Text> :
                                                                                        <Text style={styles.codeTxt}>
                                                                                            Get {item.discount} % Off
                                                                                        </Text>
                                                                                    }
                                                                                </View>
                                                                            }
                                                                        </View>
                                                                        : null}
                                                                </View>
                                                            )
                                                        }
                                                    })}
                                                </View>
                                                : null}
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        {/* <TouchableOpacity
                            activeOpacity={0.85}
                            disabled={forredcash}
                            onPress={() => {
                                redcashlogic()
                                
                            }}
                        >
                            <View style={styles.couponsection}>
                                <DISCOUNT />
                                <View
                                    style={{
                                        width: '78%',
                                        justifyContent: 'center',
                                        minHeight: 50,
                                    }}>
                                    <Text style={{ color: '#E5184E', fontSize: 14 }}>
                                        
                                        PAY VIA REDCASH
                                    </Text>
                                </View>
                                <View style={{ minWidth: '5%', minHeight: '10%' }}>
                                    {tick ?   
                                    <RightTick 
                                    onPress={() => {
                                        Couponlogicremove()
                                    }}
                                    /> : null }
                                </View>
                            </View>
                        </TouchableOpacity> */}

                        <View style={[styles.package, { paddingHorizontal: 15 }]}>
                            <View>
                                <View style={[styles.row, { marginVertical: 10 }]}>
                                    <Text style={[styles.TextSubHeading]}>Items Total</Text>
                                    <Text> <Text style={[styles.LightText, { textDecorationLine: 'line-through' }]}>₹ {pack} </Text><Text style={[styles.TextSubHeading]}>₹ {offer}</Text></Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={[styles.TextSubHeading]}>Home Collection Charges</Text>
                                    {offer < selectedPackage[0]?.package?.min_booking_amount_for_phlebo ?
                                        <Text> <Text style={[styles.TextSubHeadingmedium,]}> ₹ 200  </Text></Text>
                                        :
                                        <Text> <Text style={[styles.LightText, { textDecorationLine: 'line-through' }]}>₹ 200  </Text> <Text style={[styles.TextSubHeading, { color: '#47CACC' }]}>FREE</Text></Text>
                                    }
                                </View>
                            </View>
                            <View>
                                <View style={[styles.row, { marginVertical: 10 }]}>
                                    <Text style={[styles.TextSubHeadingmedium]}>MRP Total</Text>
                                    <Text style={[styles.TextSubHeadingmedium]}>₹ {offer < selectedPackage[0]?.package?.min_booking_amount_for_phlebo ? offer + 200 : offer}</Text>
                                </View>
                                <View style={[styles.row, { marginVertical: 10 }]}>
                                    <Text style={[styles.TextSubHeadingmedium]}>Discount</Text>
                                    {!Discount ?
                                        <Text style={[styles.TextSubHeadingmedium]}>₹ {Discount}</Text>
                                        :
                                        <Text style={[styles.TextSubHeadingmedium]}>{couponpercentage == "amount" ?
                                            <Text> ₹ {Discount} </Text>
                                            :
                                            <Text>₹ {couponpersentcal}  </Text>
                                        }</Text>
                                    }

                                </View>
                                <View style={{ borderBottomWidth: 1, borderColor: '#A2A2A2', marginVertical: 1 }}></View>
                                <View style={[styles.row, { marginVertical: 10 }]}>
                                    <Text style={[styles.TextSubHeadingmedium, { fontWeight: DefaultSetting.fontWeight.bold }]}>Total Amount</Text>
                                    {discountedprice ?
                                        <Text style={[styles.TextSubHeadingmedium, { fontWeight: DefaultSetting.fontWeight.bold }]}>₹ {discountedprice}</Text>
                                        :
                                        <Text style={[styles.TextSubHeadingmedium, { fontWeight: DefaultSetting.fontWeight.bold }]}>₹ {offer < selectedPackage[0]?.package?.min_booking_amount_for_phlebo ? offer + 200 : offer}</Text>}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>
            {selectedPackage.length == 0 ? null :
                <View style={[styles.Bottom, styles.BorderTop, styles.paddingClass, styles.FlexViewRow]}>
                    <View style={[styles.bottomViewContainer]}>
                        <Text style={[styles.TextSubHeadingmedium]}>Total Amount</Text>
                        {discountedprice ?
                            <Text style={[styles.TextSubHeadingmedium, { fontSize: 16, fontWeight: DefaultSetting.fontWeight.bold }]}>₹
                                {discountedprice}
                            </Text>
                            :
                            <Text style={[styles.TextSubHeadingmedium, { fontSize: 16, fontWeight: DefaultSetting.fontWeight.bold }]}>₹
                                {offer < selectedPackage[0]?.package?.min_booking_amount_for_phlebo ? offer + 200 : offer}
                            </Text>}
                    </View>
                    <View style={[styles.bottomViewContainer]}>
                        <Button
                            onPress={() => {
                                props?.setPriceObj(offer, Discount)
                                navigate(Screens.PATIENT_DETAILS, priceing, couponid);
                            }}
                            title="PROCEED"
                            color="#E5184E"
                            borderRadius='5'
                            paddingHorizontal='10'
                        />
                    </View>
                </View>
            }
            {show ?
                <Animated.View
                    style={[
                        {
                            // marginTop: '20%',
                            position: 'absolute',
                            minHeight: height * 1,
                            maxHeight: height,
                            width: width,
                            backgroundColor: '#FFFFFF',
                            borderWidth: 0.2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopRightRadius: 5,
                            borderTopLeftRadius: 5,
                            shadowOpacity: 5,
                            borderColor: '#707070',
                            transform: [
                                {
                                    translateY: startValue
                                },
                            ],
                        },
                    ]} >
                    <View style={{
                        height: SCREEN_HEIGHT * 1,
                        width: '100%',
                        // backgroundColor: 'cyan'
                    }}>
                        <AntDesign
                            onPress={() => {
                                setshow(false)
                            }}
                            style={{ fontSize: 25, marginLeft: "50%", color: "#E5184E", fontWeight: "900" }}
                            name="close"
                            backgroundColor="#3b5998"
                        />
                        <ScrollView>
                            <View style={styles.applyCon}>
                                <Text style={styles.applyTxt}>Apply coupon</Text>
                            </View>
                            <View style={styles.inputCon}>
                                <View style={styles.inputCons}>
                                    <TextInput
                                        style={styles.inputField}
                                        value={couponname}
                                        placeholder="Enter Coupon Code"
                                        onChangeText={(value) => {
                                            props.fetchcoupon(props?.token, '', value)
                                            setcouponname(value)
                                        }}
                                    />
                                    {/* <TouchableOpacity
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.inputTxt}>Apply</Text>
                                </TouchableOpacity> */}
                                </View>
                            </View>

                            <View style={styles.listCon}>
                                <Text style={styles.listTxt}>Select coupons from the select list</Text>
                            </View>
                            {props?.couponslist?.coupons ?
                                <View>
                                    {props?.couponslist?.coupons?.map((item, index) => {
                                        // console.log(item, "coupon item")

                                        if (index < 3) {
                                            return (
                                                <View
                                                    key={index}
                                                    style={styles.discountCon}>
                                                    <View style={styles.discountContan}>
                                                        <View style={styles.discountCons}>
                                                            <View style={{ minWidth: '40%', flexDirection: 'row' }}>
                                                                <GiftCard />
                                                                <Text style={styles.discountTxt}> {item?.name}</Text>
                                                            </View>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    _showBottomView('HIDE')
                                                                    setshow(false)
                                                                    // setdiscount(item)
                                                                    // setcouponname(item.code)
                                                                    // setcouponid(item?.id)
                                                                    // totalpriceing(item)
                                                                    // setTimeout(() => {
                                                                    // }, 995);
                                                                    Couponlogic(item)
                                                                }}
                                                            >
                                                                <Text style={styles.appTxt}> Apply </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View style={styles.codeCon}>
                                                            <Text style={styles.codeTxt}>
                                                                Get {item.discount} % Off
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        }
                                    })}
                                </View>
                                : null}
                        </ScrollView>
                    </View>
                </Animated.View> : null}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalCon}>
                                <Persent />
                            </View>
                            <View style={styles.txtDirect}>
                                <Text style={styles.txt}> '{discountname}'  <Text style={styles.txts}>applied</Text></Text>
                            </View>
                            <View style={styles.txtPrice}>
                                <Text style={styles.fix}> {couponpercentage == "amount" ? <Text> ₹</Text> : null} {redcashdiscount ? <Text>{redcashdiscount}</Text> : <Text>
                                    {couponpercentage == "percentage" ?
                                        <Text>{Discount}</Text>
                                        :
                                        <Text>{Discount}.0</Text>
                                    }

                                </Text>} {couponpercentage == "percentage" ? <Text> %</Text> : null}</Text>
                            </View>
                            {redcashdiscount ?
                                <View style={styles.savingCon}>
                                    <Text style={styles.savingTxt}>Cashback</Text>
                                </View>
                                :
                                <View style={styles.savingCon}>
                                    <Text style={styles.savingTxt}>savings with this coupon</Text>
                                </View>}

                        </View>
                    </View>
                </Pressable>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={redmodalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setredmodalVisible(!redmodalVisible);
                }}
            >
                <Pressable onPress={() => setredmodalVisible(!redmodalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalCon}>
                                <Persent />
                            </View>
                            <View style={styles.txtDirect}>
                                <Text style={styles.txt}> 'Redcash'  <Text style={styles.txts}>applied</Text></Text>
                            </View>
                            <View style={styles.txtPrice}>
                                <Text style={styles.fix}> 10 %</Text>
                            </View>
                            <View style={styles.savingCon}>
                                <Text style={styles.savingTxt}>savings with this coupon</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
            {removeitem ?
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModal(!modal);
                    }}
                >
                    <View style={styles.centeredViews}>

                        <View style={styles.modalsCon}>
                            <View style={styles.pointCon}>
                                <View style={styles.reportCon}>
                                    {/* <Icon style={{ marginRight: 4 }} name="infocirlce" size={15.5} color="#F75010" /> */}
                                    {/* <Text style={styles.reportTxt}>1 Item not available</Text> */}
                                </View>
                                <Entypo
                                    onPress={() => setModal(!modal)}
                                    name='cross'
                                    style={{
                                        fontSize: 27,
                                        color: 'red',
                                    }} />
                            </View>
                            <View style={styles.packCon}>
                                <Text style={styles.packTxt}>{removeitem?.package?.name}</Text>
                            </View>

                            {/* <View style={styles.packCons}>
                                <Text style={styles.packTxts}>Product Unavailable</Text>
                            </View> */}

                            <View style={styles.quesCon}>
                                <Text style={styles.quesTxt}>Are you sure want to remove this item?</Text>
                            </View>

                            <View style={styles.btnCon}>
                                <Pressable style={styles.btnCons}
                                    // style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModal(!modal)}
                                >
                                    <Text style={styles.btnTxt}>Cancel</Text>
                                </Pressable>
                                <Pressable style={styles.btnCons}
                                    // style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        setModal(!modal)
                                        props.removePackCart(removeitem?.id, props?.token),
                                            // console.log("delete api click", item?.id, props?.token)
                                            setTimeout(() => {
                                                props.getCart(props?.cityId?.cityid, props?.token)
                                                ToastAndroid.show("Removed", ToastAndroid.SHORT);
                                            }, 700);
                                    }
                                    }
                                >
                                    <Text style={styles.btnTxt}>Remove Item</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                :
                null}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibless}
                onRequestClose={() => {
                    setmodalVisibless(!modalVisibless);
                }}
            >
                <View style={styles.centeredViews}>

                    <View style={styles.modalsCon}>
                        <View style={styles.pointCon}>
                            <View style={styles.reportCon}>

                                <Text style={styles.reportTxt}> {removepacname?.name}</Text>
                            </View>
                        </View>
                        <View style={styles.packCon}>
                            {/* <Text style={styles.packTxt}>{removeitem?.package?.name}</Text> */}
                        </View>

                        <View style={styles.packCons}>
                            <Text style={styles.packTxts}>Product Unavailable</Text>
                        </View>

                        <View style={styles.quesCon}>
                            <Text style={styles.quesTxt}>Are you sure you want to remove this item?</Text>
                        </View>

                        <View style={styles.btnCon}>
                            <Pressable style={styles.btnCons}
                                // style={[styles.button, styles.buttonClose]}
                                onPress={() => { setModalVisibless(!modalVisibless) }}
                            >
                                <Text style={styles.btnTxt}>No</Text>
                            </Pressable>
                            <Pressable style={styles.btnCons}
                                // style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisibless(!modalVisibless)
                                    props.removePackCart(item?.id, props?.token),
                                        // console.log("delete api click", item?.id, props?.token)
                                        setTimeout(() => {
                                            props.getCart(props?.cityId?.cityid, props?.token)
                                            ToastAndroid.show("Removed", ToastAndroid.SHORT);
                                        }, 700);
                                }}
                            >
                                <Text style={styles.btnTxt}>Yes</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

let styles = create(MyCartStyle);

const mapStateToProps = (state) => ({
    token: state.user?.userData?.token,
    couponslist: state.MycartReducer,
    cityId: state.city?.cityObj,
    PackageCart: state?.packageData?.cartpackages,
    Redcash: state.MyRedCashDetailsReducer
})

const mapDispatchToProps = (dispatch) => {
    return {
        Redcashdata: () => {
            const body = {
                Red_cash: 'true',
            }
            dispatch(Actions.Redcashdata(body))
        },
        fetchcoupon: (token, cityId, value) => {
            dispatch(Actions.fetchcoupon(token, cityId, value));
        },
        setPriceObj: (offer, Discount) => {
            dispatch(Actions.setPriceObj(offer, Discount))
        },
        getCart: (cityId, token) => {
            dispatch(PackageAction.getCart(cityId, token))
        },
        removePackCart: (packIdCart, token) => {
            dispatch(Actions.removePackCart(packIdCart, token))
        },
        clearcouponobj: () => {
            dispatch(Actions.clearcouponobj());
        },
        setCouponObj: cityObj => dispatch(Actions.setCouponObj(cityObj)),
        getRedCash: (token) => dispatch(RedActions.getRedCash(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCart)