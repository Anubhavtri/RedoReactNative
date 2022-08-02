import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  View,
  Text,
  ScrollView,
  Pressable,
  Button,
  TouchableOpacity,
  Alert,
  BackHandler
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderConfirmedStyle from './OrderConfirmedStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import Actions from '../OrderReview/MyCartAction';
import { navigate, Screens } from '../../helpers/Screens';
import AllpackageActions from '../../components/Packages/PackageActions'
import { negate } from 'lodash';
import BlueTick from '../../staticData/svg/Orderconfirmedtick.svg'

export const OrderConfirmed = props => {

  console.log(props?.route?.params?.customParam, "order conforemd page props")
  const [bookingid , setbookingid] = useState(props?.route?.params?.customParam?.response?.pk)
  const [transectionid , settransectionid] = useState(props?.route?.params?.customParam?.response?.payment_source)

  useEffect(() => {
    const backAction = () => {
      if (props.navigation.isFocused()) {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // console.log(props?.booking, "booking response order confirmed screen");

  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.TopNav}>
        <MaterialCommunityIcons
          onPress={e => {
            navigate(Screens.TAB);
          }}
          style={{ fontSize: 25, marginRight: 10 }}
          name="arrow-left"
          backgroundColor="#3b5998"
        />
        <Text style={styles.topnavtext}>Order Confirmed</Text>
      </View>
      <View style={[styles.Body, styles.paddingClass]}>
        <ScrollView>
          <View style={styles.maindiv}>
            <View style={{backgroundColor:'#F5F5F5' , minHeight:280 , justifyContent:'center' , minWidth:300}}>
            <View style={styles.row}>
              <BlueTick />
            </View>
            <View style={styles.row}>
              <Text style={{color:'#47CACC' , fontSize:20 , marginTop:10}}>Your Booking is successful!</Text>
              {bookingid ?
              <Text style={{color:'#707070' , fontSize:16 , marginTop:10 }}>Booking ID : {bookingid}</Text>
              :
              <Text style={{color:'#707070' , fontSize:16 , marginTop:10 }}>Booking ID : {props?.route?.params?.customParam?.pk}</Text> }
              {props?.booking?.payment_source ? 
              <Text style={{color:'#707070' , fontSize:16 , marginTop:10 }}>Transaction ID : {transectionid ? transectionid : props?.route?.params?.customParam?.payment_source}</Text>
              : null }
            </View>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
              onPress={()=>{
                navigate(Screens.MY_ORDER)
              }}
              style={styles.orderbutton}
              >
                <Text style={{color:'#FFFFFF' , fontSize:16}}>Check Your Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => {
                navigate(Screens.MAINSCREEN);
              }}
              style={styles.home}
              >
                <Text style={{color:'#47CACC' , fontSize:16}}>Back To Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

let styles = create(OrderConfirmedStyle);

const mapStateToProps = state => ({
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
    createBooking: (body, token) => {
      dispatch(Actions.createBooking(body, token));
    },
    getCart: (cityId, token) => {
      dispatch(AllpackageActions.getCart(cityId, token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmed);
