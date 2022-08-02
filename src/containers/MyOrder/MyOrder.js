import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity, TextInput, Button, ScrollView, Pressable, PermissionsAndroid, Alert, Dimensions, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyOrderStyle from './MyOrderStyle';
import { create } from '../../helpers/PlatformSpecificStyles'
import Actions from '../Booking/BookingAction';
import { Screens, navigate } from '../../helpers/Screens';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import fetch_blob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import axios from 'axios';
import links from '../../helpers/links'
import MycartShoping from '../../staticData/svg/MycartShoping-cart.svg';
import RazorpayCheckout from 'react-native-razorpay';
import { color } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CartAction from '../../components/OurBestPackages/BestPackageAction'
import Payment from '../../containers/OrderReview/MyCartAction'
import Getcart from "../../components/Packages/PackageActions"


const { height, width } = Dimensions.get('window')
export const MyOrder = (props) => {

    const [show, setshow] = useState(false)
    const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [bookingstatus, setbookingstatus] = useState()
    const [packages, setpackages] = useState(false)
    const [Disable, setDisable] = useState(false)
    const [visible, setVisible] = useState(false)
    const disableSpinner = () => setSpinnerVisibilty(false);
    const [usertoken, setusertoken] = useState(props.token)

    useEffect(() => {
        setSpinnerVisibilty(true);
        props.fetchBooking(props.token, disableSpinner)
    }, []);
    useEffect(() => {
        locationEnabler();
    }, [])


    const locationEnabler = () => {
        console.log("object ,jbhfekjhfklershljfh")
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })
            .then((data) => {
                console.log("location enabler", data)
            })
            .catch((err) => {
                console.log("locationenbl err", err)
            });
    }
    console.log(props?.bookings, "booking data")

    useEffect(() => {
        <View>
            {props?.bookings.map((item) => {
                setbookingstatus(item.booking_status)
            })}
        </View>
    }, [props?.bookings])

    console.log(props, "booking status")

    return (
        <SafeAreaView >
            <View style={styles.MainContainer}>
                <View style={styles.TopNav}>
                    <MaterialCommunityIcons
                        onPress={(e) => { props.navigation.goBack() }}
                        style={{ fontSize: 25, marginRight: 10 }}
                        name="arrow-left"
                        backgroundColor="#3b5998"
                    />
                    <Text style={styles.topnavtext}>My Order</Text>
                </View>
                <View style={styles.Options}>
                    <View style={show ? styles.nooption : styles.option}>
                        <Pressable
                            onPress={() => {
                                setshow(false)
                            }}
                        >
                            <Text style={styles.upcomingTxt}>Upcoming</Text>
                        </Pressable>
                    </View>
                    <View style={show ? styles.option : styles.nooption}>
                        <Pressable
                            onPress={() => {
                                setshow(true)
                            }}>
                            <Text style={styles.upcomingTxt}>Completed</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={[styles.Body, styles.paddingClass]}>
                    {props?.bookings ?
                        <ScrollView style={{ height: height / 1.1 }}
                            showsVerticalScrollIndicator={false}
                        >
                            {show ?
                                <View >
                                    {props?.bookings?.map((item) => {
                                        console.log(item, "all items i needs")
                                        return (
                                            <View >
                                                {item?.report_status != "none" ?
                                                    <View style={styles.box}>
                                                        <View style={styles.boxCon}>
                                                            <View style={styles.secCons}>
                                                                <Text style={styles.txtStyle}>Oty: {item?.packages.length}</Text>
                                                                {item?.amount?.receivable_amount <= 0 ?
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        color: '#31CCB0',
                                                                        fontFamily: 'Jost-SemiBold',
                                                                        paddingHorizontal: 10
                                                                    }}>Paid Rs. {item?.discounted_price?.final_total_price} /- </Text>
                                                                    :
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        color: '#E5184E',
                                                                        fontFamily: 'Jost-SemiBold',
                                                                        paddingHorizontal: 10
                                                                    }}>UnPaid {item?.discounted_price?.final_total_price} /-</Text>
                                                                }
                                                            </View>
                                                            <View style={styles.secCon}>
                                                                <Text style={styles.txtStyle}>Booking ID: </Text>
                                                                <Text style={styles.txtValue}>{item?.pk}</Text>
                                                            </View>
                                                            <View style={styles.secCon}>
                                                                <Text style={styles.txtStyle}>Booking Date :</Text>
                                                                <Text style={styles.txtValue}> {item?.booking_date}</Text>
                                                            </View>

                                                            {item?.amount?.receivable_amount <= 0 ?
                                                                <View style={styles.secCon}>
                                                                    <Text style={styles.txtStyle}>Payment: </Text>
                                                                    <Text style={styles.txtValue}>Completed </Text>
                                                                </View>
                                                                :
                                                                <View style={styles.secCon}>
                                                                    <Text style={styles.txtStyle}>Payment:</Text>
                                                                    <Text style={styles.txtValue}> N/A</Text>
                                                                </View>
                                                            }
                                                            <View style={styles.secCon}>
                                                                <Text style={styles.txtStyle}>Transaction ID :</Text><Text style={styles.txtValue}> {item?.payment_source}</Text>
                                                            </View>
                                                            {item?.report_status == 'consolidate' || item?.report_status == 'partial' || item?.report_status == 'completed' ?
                                                                <View style={styles.nameCon}>
                                                                    <View style={styles.nameCons}>
                                                                        <Text style={styles.txtStyle}>Patient Name : </Text><Text style={styles.txtValue}>{item?.customer_name}</Text>
                                                                    </View>
                                                                    <View style={styles.rowsection}>
                                                                        <Pressable onPress={() => {
                                                                            {
                                                                                const config = {
                                                                                    'headers': {
                                                                                        'Authorization': `Token ${props.token}`
                                                                                    }
                                                                                }
                                                                                axios.get(`${links.baseApi}/booking/report_status/${item.pk}/`, config)
                                                                                    .then(({ data }) => {
                                                                                        console.log("download data", data);
                                                                                        try {
                                                                                            if (data.allReportDetails && data.allReportDetails.reportDetails) {
                                                                                                const Base64string = data.allReportDetails.reportDetails
                                                                                                const source = { uri: `data:application/pdf;base64,${Base64string}` }
                                                                                                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                                                                                                const fs = fetch_blob.fs
                                                                                                const dirs = fetch_blob.fs.dirs
                                                                                                const file_path = dirs.DownloadDir + `/${item.customer_name}-${item.booking_date}.pdf`
                                                                                                fetch_blob.android.addCompleteDownload({
                                                                                                    title: `${item.customer_name}-${item.booking_date}.pdf`,
                                                                                                    description: 'Download complete',
                                                                                                    mime: 'application/pdf',
                                                                                                    path: file_path,
                                                                                                    showNotification: true,
                                                                                                })

                                                                                                RNFS.writeFile(file_path, Base64string, 'base64').then(() => {
                                                                                                    alert(`Downloaded at ${file_path}`)
                                                                                                })
                                                                                                console.log("entered")
                                                                                                // .catch((error) => {

                                                                                                //   alert((error));
                                                                                                // });

                                                                                            } else if (data.error) {

                                                                                                alert(data.error)
                                                                                            } else if (data.message) {
                                                                                                alert("Report is not available")
                                                                                                // alert(data.message)
                                                                                            }
                                                                                        } catch (err) {
                                                                                            console.log("8776", err)
                                                                                        }
                                                                                    })
                                                                            }
                                                                        }}
                                                                            style={styles.downloadbutton}>
                                                                            <Text style={styles.downloadtext}>Download Report</Text>
                                                                        </Pressable>
                                                                    </View>

                                                                </View>
                                                                : null}

                                                            <View style={styles.row}>

                                                                <View>
                                                                    {item?.additional_members.map((members) => {
                                                                        return (
                                                                            <View style={styles.nameCon}>
                                                                                <View style={styles.nameCons}>
                                                                                    <Text style={styles.txtStyle}>Patient Name :</Text><Text style={styles.txtValue}> {members?.customer_name}</Text>
                                                                                </View>
                                                                                <View>
                                                                                    {members?.report_status == 'consolidate' || members?.report_status == 'partial' || members?.report_status == 'completed' ?
                                                                                        <View style={styles.rowsection}>
                                                                                            <Pressable onPress={() => {
                                                                                                {
                                                                                                    const config = {
                                                                                                        'headers': {
                                                                                                            'Authorization': `Token ${props.token}`
                                                                                                        }
                                                                                                    }
                                                                                                    axios.get(`${links.baseApi}/booking/report_status/${members.pk}/`, config)
                                                                                                        .then(({ data }) => {
                                                                                                            console.log("download data", data);
                                                                                                            try {
                                                                                                                if (data.allReportDetails && data.allReportDetails.reportDetails) {
                                                                                                                    const Base64string = data.allReportDetails.reportDetails
                                                                                                                    const source = { uri: `data:application/pdf;base64,${Base64string}` }
                                                                                                                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                                                                                                                    const fs = fetch_blob.fs
                                                                                                                    const dirs = fetch_blob.fs.dirs
                                                                                                                    const file_path = dirs.DownloadDir + `/${members.customer_name}-${members.booking_date}.pdf`
                                                                                                                    fetch_blob.android.addCompleteDownload({
                                                                                                                        title: `${members.customer_name}-${members.booking_date}.pdf`,
                                                                                                                        description: 'Download complete',
                                                                                                                        mime: 'application/pdf',
                                                                                                                        path: file_path,
                                                                                                                        showNotification: true,
                                                                                                                    })

                                                                                                                    RNFS.writeFile(file_path, Base64string, 'base64').then(() => {
                                                                                                                        alert(`Downloaded at ${file_path}`)
                                                                                                                    })
                                                                                                                    console.log("entered")
                                                                                                                    // .catch((error) => {

                                                                                                                    //   alert((error));
                                                                                                                    // });

                                                                                                                } else if (data.error) {

                                                                                                                    alert(data.error)
                                                                                                                } else if (data.message) {
                                                                                                                    alert("Report is not available")
                                                                                                                    // alert(data.message)
                                                                                                                }
                                                                                                            } catch (err) {
                                                                                                                console.log("8776", err)
                                                                                                            }
                                                                                                        })
                                                                                                }
                                                                                            }}
                                                                                                style={styles.downloadbutton}>
                                                                                                <Text style={styles.downloadtext}>Download Report</Text>
                                                                                            </Pressable>
                                                                                        </View> : null}
                                                                                </View>
                                                                            </View>
                                                                        )
                                                                    })}
                                                                </View>
                                                            </View>

                                                        </View>
                                                        <Pressable onPress={() =>
                                                            setpackages(!packages)
                                                        }>
                                                            <View style={styles.Other}>
                                                                <Text style={styles.otherTxt}>All Inclusions in this booking</Text>
                                                                {!packages &&
                                                                    <AntDesign

                                                                        onPress={e => {
                                                                            setpackages(!packages)
                                                                        }}
                                                                        style={styles.arrowSty}
                                                                        name="down"
                                                                    />
                                                                }
                                                                {packages &&
                                                                    <AntDesign
                                                                        onPress={e => {
                                                                            setpackages(!packages)
                                                                        }}
                                                                        style={styles.arrowSty}
                                                                        name="up"
                                                                        backgroundColor="#3b5998"
                                                                    />
                                                                }
                                                            </View>
                                                        </Pressable>
                                                        {packages ?
                                                            <View>
                                                                {item?.packages.map((pack) => {
                                                                    return (
                                                                        <View style={styles.packCon}>
                                                                            <View>
                                                                                <View style={styles.packsCon}>
                                                                                    <Text style={styles.packTxt}>{pack?.name}</Text>
                                                                                </View>
                                                                                <View style={styles.bookCon}>
                                                                                    <Text style={styles.txtStyles}>Booking ID:</Text><Text style={styles.txtValue}> {item?.pk}</Text>
                                                                                </View>
                                                                            </View>
                                                                            <Pressable style={styles.trackbutton}
                                                                                // onPress={() => {
                                                                                //     navigate(Screens.PLAN_DETAIL, pack)
                                                                                // }}
                                                                                onPress={() => {
                                                                                    // console.log(,">>>>>>>>>>>>><<<<<<<<<<<<")
                                                                                    props.postPackageToCart(pack?.id, usertoken)
                                                                                    // console.log(props.cityId , "gu gu ga ag")
                                                                                    setTimeout(() => {
                                                                                        props.getCart(props.cityId, usertoken)
                                                                                        ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
                                                                                        navigate(Screens.MY_CART)
                                                                                    }, 700);
                                                                                }}
                                                                            >
                                                                                <Text style={styles.buttontext}>Book Again</Text>
                                                                            </Pressable>
                                                                        </View>
                                                                    )
                                                                })}
                                                            </View>
                                                            :
                                                            null
                                                        }
                                                    </View>
                                                    : null}
                                            </View>
                                        )
                                    })}
                                </View>
                                :
                                <View style={{
                                    // backgroundColor: 'blue',
                                    // marginBottom: 30,
                                    // borderWidth: 0.5,
                                    // borderColor: '#A7A7A7',
                                    // borderRadius: 5
                                    // backgroundColor: 'blue',

                                }}>

                                    {props?.bookings?.map((item) => {
                                        return (
                                            <View>
                                                {item?.report_status == 'none' || item?.report_status == 'pending' ?
                                                    <View style={styles.headCon}>

                                                        <View style={styles.headsCon}>
                                                            <View style={styles.secCons}>
                                                                <Text style={styles.txtStyle}>Oty: {item?.packages.length}</Text>
                                                                {item?.amount?.receivable_amount <= 0 ?
                                                                    <Text style={styles.paidTxt}>Paid Rs. {item?.discounted_price?.final_total_price} /- </Text>
                                                                    :
                                                                    <Text style={styles.unpaidTxt}>UnPaid  {item?.discounted_price?.final_total_price}  /-</Text>
                                                                }
                                                            </View>
                                                            <View style={styles.secCon}>
                                                                <Text style={styles.txtStyle}>Booking ID: </Text>
                                                                <Text style={styles.txtValue}>{item?.pk}</Text>
                                                            </View>
                                                            <View style={styles.secCon}>
                                                                <Text style={styles.txtStyle}>Booking Date :</Text>
                                                                <Text style={styles.txtValue}> {item?.booking_date}</Text>
                                                            </View>

                                                            {item?.amount?.receivable_amount <= 0 ?
                                                                <View style={styles.secCon}>
                                                                    <Text style={styles.txtStyle}>Payment: </Text>
                                                                    <Text style={styles.txtValue}>Completed </Text>
                                                                </View>
                                                                :
                                                                <View style={styles.secCon}>
                                                                    <Text style={styles.txtStyle}>Payment:</Text>
                                                                    <Text style={styles.txtValue}> N/A</Text>
                                                                </View>
                                                            }
                                                            <View style={styles.secCon}>
                                                                <Text style={styles.txtStyle}>Transaction ID :</Text><Text style={styles.txtValue}> {item?.payment_source}</Text>
                                                            </View>
                                                            <View style={styles.secCon}>
                                                                <Text style={styles.txtStyle}>Patient Name : </Text><Text style={styles.txtValue}>{item?.customer_name}</Text>
                                                            </View>

                                                            <View style={styles.secCon}>
                                                                <Text style={styles.txtStyle}>Scheduled Pickup on : </Text>
                                                                <Text style={styles.txtValue}>{item?.collection_date} , {item?.slot_time?.slot}</Text>
                                                            </View>
                                                            <View
                                                                // style={{flexDirection:'row' , paddingLeft:15 , paddingRight:15 , minHeight:50}}
                                                                style={styles.secCon}
                                                            >
                                                                <Text style={styles.txtStyle}>Pickup Address : </Text>

                                                                <Text style={styles.txtValues} numberOfLines={1}>{item?.customer_address}</Text>
                                                            </View>
                                                            {/* <View style={styles.secCon}>
                                                        <Text style={styles.txtStyle}>Agent's Name </Text>
                                                    </View>
                                                    <View style={styles.secCon}>
                                                        <Text style={styles.txtStyle}>+91 -</Text>
                                                    </View> */}

                                                            <View style={styles.btnStyle}>
                                                                {item?.amount?.receivable_amount <= 0 ? null :
                                                                    <Pressable
                                                                        disabled={Disable}
                                                                        onPress={() => {
                                                                            var options = {
                                                                                description: `Credits towards ${item?.customer_name}`,
                                                                                image:
                                                                                    'https://redcliffelabsbackend.s3.amazonaws.com/media/gallary-file/None/442637fd-61f4-445b-9cb1-2df9254fe064.png',
                                                                                currency: 'INR',
                                                                                notes: { bookingid: item?.pk },
                                                                                // testing =  rzp_test_kBEHIT9OH5OYyo
                                                                                // live = rzp_live_sDovuuBgCu9dw3
                                                                                key: 'rzp_test_kBEHIT9OH5OYyo', // Your api key
                                                                                amount: `${item?.discounted_price?.final_total_price * 100}`,
                                                                                name: 'Redcliffe Labs',
                                                                                prefill: {
                                                                                    email: `${item?.customer_email}`,
                                                                                    contact: `${item?.customer_phonenumber}`,
                                                                                    name: 'Razorpay Software',
                                                                                },
                                                                                theme: { color: '#09406b' },
                                                                            };
                                                                            RazorpayCheckout.open(options)
                                                                                .then(data => {
                                                                                    // handle success
                                                                                    // alert(`Payment done successfully`);
                                                                                    const body = {
                                                                                        paymentid: data?.razorpay_payment_id,
                                                                                        bookingid: item?.pk,
                                                                                    };
                                                                                    props?.updatePaymentInfo(body, props?.token);
                                                                                    setTimeout(() => {
                                                                                        props?.getCart(props?.cityId, props?.token)
                                                                                        navigate(Screens.ORDER_CONFIRMED, pack = item)
                                                                                    }, 200);
                                                                                    setDisable(true)
                                                                                })
                                                                                .catch(error => {
                                                                                    console.log(error, "<<<<<<<<<<<<<<<<<<<<<<<<<<")
                                                                                    // handle failure
                                                                                    alert(`Payment failure try again`);
                                                                                });
                                                                        }
                                                                        }
                                                                        style={styles.trackbuttons}>
                                                                        <Text style={styles.txtBtn}>Pay Now</Text>
                                                                    </Pressable>
                                                                }
                                                                <Pressable style={styles.trackbuttones}
                                                                    onPress={() => navigate(Screens.PHLEBODETAILS, { phleboName: item?.phlebo?.name ? item?.phlebo?.name : 'Not available', bookingid: item?.pk ? item?.pk : "", phleboContact: item?.phlebo?.phonenumber ? item?.phlebo?.phonenumber : 'Not available' })}>
                                                                    <Text style={styles.buttontext}>
                                                                        Track Phlebo</Text>
                                                                </Pressable>
                                                            </View>
                                                        </View>
                                                        <Pressable
                                                            onPress={() =>
                                                                setpackages(!packages)
                                                            }
                                                        >
                                                            <View style={styles.Other}>
                                                                <Text style={styles.otherTxt}>All Inclusions in this booking</Text>
                                                                {!packages &&
                                                                    <AntDesign

                                                                        onPress={e => {
                                                                            setpackages(!packages)
                                                                        }}
                                                                        style={styles.arrowSty}
                                                                        name="down"
                                                                        backgroundColor="#3b5998"
                                                                    />
                                                                }
                                                                {packages &&
                                                                    <AntDesign
                                                                        onPress={e => {
                                                                            setpackages(!packages)
                                                                        }}
                                                                        style={styles.arrowSty}
                                                                        name="up"
                                                                        backgroundColor="#3b5998"
                                                                    />
                                                                }
                                                            </View>
                                                        </Pressable>

                                                        {packages && item?.packages ?
                                                            <View >
                                                                {item?.packages && packages && item?.packages.map((pack) => {
                                                                    return (
                                                                        <View style={styles.pdCon}>
                                                                            <View>
                                                                                <View style={styles.pdHead}>
                                                                                    <Text style={styles.pdTxt}>{pack?.name}</Text>
                                                                                </View>
                                                                                <View style={styles.idBook}>
                                                                                    <Text style={styles.txtStyles}>Booking ID:</Text><Text style={styles.txtValue}> {item?.pk}</Text>
                                                                                </View>
                                                                            </View>
                                                                            <Pressable style={styles.trackbutton}
                                                                                // onPress={() => {
                                                                                //     navigate(Screens.PLAN_DETAIL, pack)
                                                                                // }}
                                                                                onPress={() => {
                                                                                    // console.log(,">>>>>>>>>>>>><<<<<<<<<<<<")
                                                                                    props.postPackageToCart(pack?.id, usertoken)
                                                                                    // console.log(props.cityId , "gu gu ga ag")
                                                                                    setTimeout(() => {
                                                                                        props.getCart(props.cityId, usertoken)
                                                                                        ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
                                                                                        navigate(Screens.MY_CART)
                                                                                    }, 700);
                                                                                }}
                                                                            >
                                                                                <Text style={styles.buttontext}>Book Again</Text>
                                                                            </Pressable>
                                                                        </View>
                                                                    )
                                                                })}
                                                            </View>
                                                            :
                                                            null
                                                        }

                                                    </View>
                                                    : null}
                                            </View>
                                        )
                                    })}
                                </View>
                            }
                        </ScrollView>
                        :
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center', minHeight: 400
                            }}>
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
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

let styles = create(MyOrderStyle);

const mapStateToProps = (state) => ({
    token: state.user.userData?.token,
    packageList: state.packageData?.allPackages,
    cityId: state.city?.cityObj?.cityid,
    bookings: state?.customerbooking?.booking
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBooking: (token, disableSpinner) => {
            dispatch(Actions.fetchBooking(token, disableSpinner));
        },
        downloadreport: (token, disableSpinner, pk) => {
            dispatch(Actions.downloadReport(token, disableSpinner, pk));
        },
        postPackageToCart: (packageId, token) => {
            dispatch(CartAction.postPackageToCart(packageId, token))
        },
        getCart: (cityId, token) => {
            dispatch(Getcart.getCart(cityId, token))
        },
        updatePaymentInfo: (body, token) => {
            dispatch(Payment.updatePaymentInfo(body, token));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)