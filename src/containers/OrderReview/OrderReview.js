import React, { useState, useEffect } from 'react';
import { connect,useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Button,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderReviewStyle from './OrderReviewStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import RazorpayCheckout from 'react-native-razorpay';
import Actions from './MyCartAction';
import { navigate, Screens } from '../../helpers/Screens';
import AllpackageActions from '../../components/Packages/PackageActions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Document from '../../staticData/svg/document.svg'
import axios from 'axios';
import links from '../../helpers/links'
import SpinnerAction from '../../components/spinner/SpinnerActions';

export const OrderReview = props => {
  const [selectedPackage, setselectedPackage] = useState([]);
  const [offer, setoffer] = useState(0);
  const [pack, setpack] = useState(0);
  const [Disable, setDisable] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [coupon, setcoupon] = useState(props?.couponslist?.couponObj)
  const [redcashdetail, setredcashdetail] = useState(props?.couponslist?.redcashData)
  const [Discount, setDiscount] = useState()
  // const [reddiscount , setreddiscount] = useState()
  // const [coupontype , setcoupontype] = useState()
  const [calculation, setcalculation] = useState()
  const [onebooking , setonebooking] = useState(false)
  const dispatch = useDispatch()
  const [bookingresponse, setbookingresponse] = useState(props?.booking)

  console.log(props?.couponslist, "order review screen")

  // console.log(props?.booking?.discounted_price?.final_total_price, "ghdgfhdsgfhgdshjgdfghdfjhgdfhjgf")

  useEffect(() => {
    setModalVisible(true)
  }, [bookingresponse])

  useEffect(() => {
    setselectedPackage(props?.route?.params?.customParam);
  }, [props?.route?.params?.customParam]);

  let totalamount = props?.route?.params?.customParam;

  let EditAddress = true

  var offeramount = 0;
  var packamount = 0;

  const PackageListAry = () => {
    let array = [];
    props?.PackageCart?.forEach(item => {
      array.push(item.package.id);
    });
    return array;
  };


  useEffect(() => {
    cal()
  }, [])

  const cal = () => {
    if (coupon?.discount_type == "amount") {
      setDiscount(coupon?.discount)
    } else {
      const percentageintoamount = coupon?.discount / 100
      const multipliedvalue = Math.ceil(props?.price?.offerPrice * percentageintoamount)
      // setcouponpersentcal(Math.ceil(multipliedvalue))
      setDiscount(multipliedvalue)
    }
  }



  const bookingPromise = () => {
    const body = {
      booking_date: props.Slot.Date.date,
      collection_slot: props.Slot.Time.id,
      collection_date: props.Slot.Date.date,
      customer_name: props.User.customer_name,
      customer_age: props.User.customer_age,
      is_redcash_applied: redcashdetail?.Red_cash,
      coupon_applied: coupon?.id,
      customer_email: props.User.customer_email,
      customer_gender: props.User.customer_gender,
      customer_phonenumber: props.User.customer_phonenumber,
      customer_altphonenumber: props.User.customer_phonenumber,
      customer_whatsapppnumber: props.User.customer_phonenumber,
      customer_landmark: props.Address.street_name,
      customer_areapincode: props?.cityId?.id,
      customer_address: `${props.Address.house_number}, ${props.Address.street_name}`,
      packages: PackageListAry(),
    };

    console.log(body, "body send")
    return new Promise((resolve, reject) => {
      const headers = {
        'Authorization': `Token ${props.token}`,
      };
      
      axios.post(`${links.baseApi}/booking/customer/create/`, body, { headers }).then((response) => {
        resolve(response.data)
        console.log(response.data, "post request >>>>")
      }).catch((error) => {
        console.log(error)
        dispatch(SpinnerAction.hideSpinner());
        alert(JSON.stringify(error.response.data.errors.toString()));
      })
    })
  }

  // console.log(props.token)

  const bookNowAndPayLater = () => {
    setonebooking(false)
    dispatch(SpinnerAction.showSpinner());
    bookingPromise().then((response) => {
      setTimeout(() => {
        props?.getCart(props?.cityId?.cityid, props?.token)
        props?.clearcouponobj()
        // removeData()
        dispatch(SpinnerAction.hideSpinner());
        navigate(Screens.ORDER_CONFIRMED, { response })
        
      }, 300);
    })
  }

  const razorpaybooking = () => {
    bookingPromise().then((response) => {
      var options = {
        description: `Credits towards ${response.customer_name}`,
        image:
          'https://redcliffelabsbackend.s3.amazonaws.com/media/gallary-file/None/442637fd-61f4-445b-9cb1-2df9254fe064.png',
        currency: 'INR',
        notes: { bookingid: response?.pk },
        // testing =  rzp_test_kBEHIT9OH5OYyo
        // live = rzp_live_sDovuuBgCu9dw3
        key: 'rzp_live_sDovuuBgCu9dw3', // Your api key
        amount: `${response.amount.receivable_amount * 100
          }`,
        name: 'Redcliffe Labs',
        prefill: {
          email: `${response.customer_email}`,
          contact: `${response.customer_phonenumber}`,
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
            bookingid: response?.pk,
          };
          props?.updatePaymentInfo(body, props?.token);
          setTimeout(() => {
            props?.getCart(props?.cityId?.cityid, props?.token)
            navigate(Screens.ORDER_CONFIRMED, { response })
          }, 200);
          setDisable(true)
        })
        .catch(error => {
          // handle failure
          // alert(`Booking success`);
          setTimeout(() => {
            props?.getCart(props?.cityId?.cityid, props?.token)
            props?.clearcouponobj()
            // removeData()
            navigate(Screens.ORDER_CONFIRMED, { response })
          }, 200);
        });
    })
  }



  const addonlogic = props?.PackageCart.filter((data) => {
    console.log(data?.package?.is_addon, "Each Package")
    return (data?.package?.is_addon === false)
  })

  const PackageDetail = () => {
    props?.PackageCart?.map((item) => {
      if (addonlogic.length > 0 && item?.package?.is_addon === true) {
        setoffer(offeramount += item?.package?.addon_price)
        setpack(packamount += item?.package?.package_city_prices ? item?.package?.package_city_prices?.package_price : item?.package?.package_price)
      } else {
        setpack(packamount += item?.package?.package_city_prices ? item?.package?.package_city_prices?.package_price : item?.package?.package_price)
        setoffer(offeramount += item?.package?.package_city_prices ? item?.package?.package_city_prices?.offer_price : item?.package?.offer_price)
      }
    }
    )

    console.log(props?.PackageCart[0]?.package?.min_booking_amount_for_phlebo, "cart and pack ")

    return props?.PackageCart.map(item => {
      return (
        <View style={styles.package}>
          <View>
            <Text style={styles.packageNameCard}>{item?.package?.name}</Text>
          </View>
          <View style={styles.pckgBorderline}>
            <Text style={[styles.TextHeading, { marginHorizontal: 15 }]}>
              Inclusion : {item?.package?.parameter} Tests
            </Text>
            <Text style={[styles.TextSubHeading, { marginHorizontal: 15 }]}>
              {item?.package?.description}
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={[styles.cutprice]}>
                Rs{' '}
                {item?.package?.package_city_prices ? item?.package?.package_city_prices?.package_price : item?.package?.package_price}
                /-
              </Text>
              {addonlogic.length > 0 && item?.package?.is_addon === true ?
                // <Text>{item?.package?.addon_price}</Text>
                <Text style={[styles.offerPrice]}>Rs {item?.package?.addon_price}/-</Text>
                :
                // <Text>bendi</Text>
                <Text style={[styles.offerPrice]}>
                  Rs{' '}
                  {item?.package?.package_city_prices
                    ? item?.package?.package_city_prices?.offer_price
                    : item?.package?.offer_price}
                  /-
                </Text>
              }

            </View>
            <View style={styles.offerpercent}>
              <Text style={{ fontSize: 10, color: 'white' }}>
                Get{' '}
                {Math.floor(
                  (((item?.package?.package_city_prices
                    ? item?.package?.package_city_prices.package_price
                    : item?.package?.package_price) -
                    (item?.package?.package_city_prices
                      ? item?.package?.package_city_prices.offer_price
                      : item?.package?.offer_price)) /
                    (item?.package?.package_city_prices
                      ? item?.package?.package_city_prices.package_price
                      : item?.package?.package_price)) *
                  100,
                )}{' '}
                % OFF
              </Text>
            </View>
          </View>
        </View>
      );
    });
  };

  // console.log(props.Address,props.Slot)
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.TopNav}>
        <MaterialCommunityIcons
          onPress={e => {
            navigate(Screens.TAB);
            props?.clearcouponobj()
            // removeData()
          }}
          style={{ fontSize: 25, marginRight: 10 }}
          name="arrow-left"
          backgroundColor="#3b5998"
        />
        <Text style={styles.topnavtext}>Order Review</Text>
      </View>
      <View style={[styles.Body, styles.paddingClass]}>
        <ScrollView>
          <View style={styles.first}>
            <Text style={styles.TextHeading}>Selected Time Slot</Text>
            {/* <Text style={styles.TextSubHeading}>Redcliffe labs Diagnostics Pvt. Ltd. Noida Sector-62</Text> */}
            <View style={styles.row}>
              <Text style={styles.TimeblueText}>
                {props?.Slot.Date?.formattedDate},{' '}
                {props?.Slot.Time?.start_time} - {props?.Slot.Time?.end_time}
              </Text>
              <Pressable
                onPress={() => {
                  navigate(Screens.ADD_SLOT, totalamount);
                }}>
                <Text style={styles.TextSubHeading}>Edit Slot</Text>
              </Pressable>
            </View>
          </View>
          <PackageDetail />
          <View style={styles.package}>
            <View>
              <Text style={[styles.TextHeading, { marginHorizontal: 15 }]}>
                Sample Pickup Address
              </Text>
            </View>
            <View style={styles.row}>
              <View style={[styles.address, { marginLeft: 15 }]}>
                <Text style={[styles.TextHeading, { marginBottom: 10 }]}>
                  {props.Address.name}
                </Text>
                <Text style={[styles.LightText, { fontWeight: '800' }]}>
                  {props.Address.house_number}, {props.Address.street_name}
                </Text>
              </View>
              <View style={[styles.editsection, { marginRight: 15 }]}>
                <Pressable
                  onPress={() => {
                    navigate(Screens.ADD_ADDRESS, props.Address, totalamount, EditAddress);
                  }}>
                  <Text style={[styles.LightText]}>Edit Address</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View style={[styles.BodyComponentfirstone, styles.paddingClass]}>
            <View style={[styles.FlexViewRow]}>
              <Document />
              <Text style={[styles.alertTextone, styles.TextBold]}>
                FREE E-Report will be sent to your registered email ID
              </Text>
            </View>
          </View>
          <View style={[styles.package, { paddingHorizontal: 15 }]}>
            <View>
              <View style={[styles.row, { marginVertical: 10 }]}>
                <Text style={[styles.TextSubHeading]}>Items Total</Text>
                <Text>
                  {' '}
                  <Text
                    style={[
                      styles.LightText,
                      { textDecorationLine: 'line-through' },
                    ]}>
                    ₹ {pack}{' '}
                  </Text>
                  <Text style={[styles.TextSubHeading]}>
                    ₹
                    {props?.price?.offerPrice}
                  </Text>
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.TextSubHeading]}>
                  Home Collection Charges
                </Text>
                {props?.price?.offerPrice < props?.PackageCart[0]?.package?.min_booking_amount_for_phlebo ?
                  <Text> <Text style={[styles.LightText,]}> ₹ 200  </Text></Text>
                  :
                  <Text> <Text style={[styles.LightText, { textDecorationLine: 'line-through' }]}>₹ 200  </Text> <Text style={[styles.TextSubHeading, { color: '#47CACC' }]}>FREE</Text></Text>
                }
              </View>
            </View>
            <View>
              <View style={[styles.row, { marginVertical: 10 }]}>
                <Text style={[styles.TextSubHeadingmedium]}>₹ MRP Total</Text>
                <Text style={[styles.TextSubHeadingmedium]}>

                  {totalamount}
                </Text>
              </View>
              {/* <View style={styles.row}>
                <Text style={[styles.TextSubHeadingmedium]}>
                  Delivery Charges
                </Text>
                <Text style={[styles.TextSubHeadingmedium]}>₹ 0</Text>
              </View> */}
              <View style={[styles.row, { marginVertical: 10 }]}>
                {coupon?.name ?
                  <Text style={[styles.TextSubHeadingmedium]}>Coupon Applied {coupon?.name}</Text>
                  :
                  null
                }
                {redcashdetail?.Red_cash ?
                  <Text>Redcash</Text>
                  : null
                }
                {coupon?.discount ?
                  <Text style={[styles.TextSubHeadingmedium]}>₹
                    {coupon?.is_red_cash === true ?
                      <Text>0</Text>
                      :
                      <Text>{Discount}</Text>
                    }
                  </Text>
                  :
                  null
                }
                
              </View>
              {/* <View style={[styles.row, { marginVertical: 10 }]}>
                <Text style={[styles.TextSubHeadingmedium]}>Discount</Text> */}
                {/* {coupon?.name ?
                  <Text style={{ marginRight: '50%' }}>{coupon?.name}</Text>
                  :
                  null
                }
                {redcashdetail?.Red_cash ?
                  <Text>Redcash</Text>
                  : null
                } */}
                {/* {coupon?.discount ?
                  <Text style={[styles.TextSubHeadingmedium]}>₹
                    {coupon?.is_red_cash === true ?
                      <Text>0</Text>
                      :
                      <Text>{Discount}</Text>
                    }
                  </Text>
                  :
                  <Text style={[styles.TextSubHeadingmedium]}> ₹ 0</Text>
                } */}
                {/* {Discount ? 
              
              : 
              
              } */}
                {/* {reddiscount ? 
                <Text style={[styles.TextSubHeadingmedium]}>₹ 0 </Text>
                :
                <Text style={[styles.TextSubHeadingmedium]}>
                  {coupontype == "percentage" ?
                <Text> %</Text> 
                :
                <Text>₹</Text> 
                }
                  
                  {Discount ? Discount : 0} </Text>
                } */}

              {/* </View> */}
              
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#A2A2A2',
                  marginVertical: 1,
                }}></View>
              <View style={[styles.row, { marginVertical: 10 }]}>
                <Text
                  style={[
                    styles.TextSubHeadingmedium,
                    { fontWeight: DefaultSetting.fontWeight.bold },
                  ]}>
                  Total Amount
                </Text>
                <Text style={[styles.TextSubHeadingmedium]}>
                  ₹
                  {totalamount}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.paylatercontainer}>
            <TouchableOpacity
              disabled={onebooking}
              onPress={() => {
                bookNowAndPayLater()
                setonebooking(true)
              }}
              style={{ minHeight: 50, alignItems: 'center', justifyContent: 'center', borderColor: '#47CACC', borderWidth: 2, padding: 15, borderRadius: 5 }}
            >
              <Text style={{ fontSize: 16, color: '#47CACC' }}>Book Now & Pay Later</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          styles.Bottom,
          styles.BorderTop,
          styles.paddingClass,
          styles.FlexViewRow,
        ]}>
        <View style={[styles.bottomViewContainer]}>
          <Text style={[styles.TextSubHeadingmedium]}>Total Amount</Text>
          <Text style={[styles.TextSubHeadingmedium, { fontSize: 16 }]}>
            ₹ {totalamount}
          </Text>
        </View>
        <View style={[styles.bottomViewContainer]}>
          <Button
            disabled={Disable}
            onPress={() => {
              razorpaybooking()
            }}
            title="PAY VIA RAZORPAY"
            color="#E5184E"
            borderRadius="5"
            paddingHorizontal="10"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

let styles = create(OrderReviewStyle);

const mapStateToProps = state => ({
  token: state.user?.userData?.token,
  couponslist: state.MycartReducer,
  cityId: state.city?.cityObj,
  packagelist: state?.bestpackage?.allPackageMain,
  Address: state?.Addresslistreducer?.SelAddress,
  Slot: state?.addSlots?.SelectedSlot,
  User: state?.patientDetails?.userData,
  price: state?.MycartReducer?.priceObj,
  PackageCart: state?.packageData?.cartpackages,
  booking: state?.MycartReducer?.bookingResponse,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchcoupon: (token, disableSpinner, cityId) => {
      dispatch(Actions.fetchcoupon(token, disableSpinner, cityId));
    },
    updatePaymentInfo: (body, token) => {
      dispatch(Actions.updatePaymentInfo(body, token));
    },
    // createBookingwithrazorpay
    createBookingwithrazorpay: (body, token) => {
      dispatch(Actions.createBookingwithrazorpay(body, token));
    },
    clearBooking: () => {
      dispatch(Actions.clearBooking());
    },
    clearcouponobj: () => {
      dispatch(Actions.clearcouponobj());
    },
    createBooking: (body, token) => {
      dispatch(Actions.createBooking(body, token));
    },
    getCart: (cityId, token) => {
      dispatch(AllpackageActions.getCart(cityId, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderReview);
