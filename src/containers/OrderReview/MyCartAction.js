import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens, navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './MyCartConstant';
import { ToastAndroid } from 'react-native'
import { validatePathConfig } from '@react-navigation/core';

const fetchcoupon = (token, cityId = "", value) => {

    return function (dispatch) {
        console.log(value)
        const queryParam = {
            code: `${value}`,
        }

        const successCall = (response) => {
            // disableSpinner();
            console.log(response, "all coupons ")
            dispatch({
                type: Constants.ACTIONS.GET_COUPON,
                data: response.results
            });
        };

        const errorCall = (errorResponse) => {
            disableSpinner();
            // resetScreen(Screens.LOGIN_SCREEN);
            // dispatch({
            //     type: Constants.ACTIONS.CLEAR_DATA,
            // });
        };
        Api.doGet(Locations.COUPON, queryParam, successCall, errorCall, token);
    }
}

const setPriceObj = (offer, Discount) => {
    const body = {
        offerPrice: offer,
        discount: Discount
    }
    return function (dispatch) {
        dispatch({
            type: Constants.ACTIONS.SET_PRICE_OBJ,
            data: body
        });
    }
}

const createBooking = (body, token) => {
    return function (dispatch) {
        const successCall = (response) => {
            console.log(response, "Here is the response")
            dispatch({
                type: Constants.ACTIONS.BOOKING_SUCCESS,
                data: response
            });
            if (response) {
                navigate(Screens.ORDER_CONFIRMED)
            }
        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse)
            alert(JSON.stringify(errorResponse?.error))
        };
        Api.doPost(Locations.CREATE_BOOKING, body, successCall, errorCall, token);
    }
}

const clearBooking = () => {
    return function (dispatch) {
        dispatch({
            type: Constants.ACTIONS.CLEAR_BOOKING_RESPONSE
        });
    }
}

const createBookingwithrazorpay = (body, token) => {
    return function (dispatch) {
        const successCall = (response) => {
            console.log(response, "Here is the response")
            dispatch({
                type: Constants.ACTIONS.RAZORPAY_SUCESS,
                data: response
            });

        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse)
            alert(JSON.stringify(errorResponse?.error))
        };
        Api.doPost(Locations.CREATE_BOOKING, body, successCall, errorCall, token);
    }
}



const removePackCart = (Id, token) => {
    console.log(Id, token, "PACKAGE ID   AND  TOKEN ")
    const location = `${Locations.CART}${Id}/`
    return function (dispatch) {
        const successCall = (response) => {
            console.log("succes", response)
        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse, "Cart error")
        };
        Api.doDel(location, {}, successCall, errorCall, token);
    }
}

const updatePaymentInfo = (body, token) => {

    console.log(body, token, "Payment info")

    return function (dispatch) {
        const successCall = (response) => {
            console.log(response, "Here is the response")
        };

        const errorCall = (errorResponse) => {

            console.log(errorResponse)

            // resetScreen(Screens.LOGIN_SCREEN);
            // dispatch({
            //     type: Constants.ACTIONS.CLEAR_DATA,
            // });
        };
        Api.doPost(Locations.PAYMENT, body, successCall, errorCall, token);
    }
}

const setCouponObj = (CouponObj) => {
    // console.log(CouponObj,"Her is action")
    return function (dispatch) {
        dispatch({
            type: Constants.ACTIONS.SAVE_COUPON_DETAIL,
            data: CouponObj
        });
    }
}

const clearcouponobj = () => {
    return function (dispatch) {
        dispatch({
            type: Constants.ACTIONS.CLEAR_COUPONOBJ_RESPONSE
        });
    }
}

const Redcashdata = (RedcashDetails) => {
    console.log(RedcashDetails, 'here')
    return function (dispatch) {
        dispatch({
            type: Constants.ACTIONS.SAVE_REDCASH_DETAILS,
            data: RedcashDetails
        });
    };
}

export default {
    fetchcoupon,
    setPriceObj,
    createBooking,
    createBookingwithrazorpay,
    removePackCart,
    updatePaymentInfo,
    clearBooking,
    setCouponObj,
    clearcouponobj,
    Redcashdata
}