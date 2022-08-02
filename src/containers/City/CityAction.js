
import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './CityConstants'

const getPincode = (code) => {
    queryParam = {
        code
    }
    return function (dispatch) {

        // dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
            console.log(response.results.pincode)
            // dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.GET_CITY_PINCODELIST,
                data: response.results
            });
        };
        const errorCall = (errorResponse) => {
            // dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse)
            alert('Pincode not available')
        }
        Api.doGet(Locations.PINCODE, queryParam, successCall, errorCall);
    }
}

const getcityid = (code) => {
    queryParam = {
        code
    }
    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
            console.log(response , "city id action response ")
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.GET_CITY_ID,
                data: response.results
            });
        };
        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse)
            alert("Pincode not available. Please choose another")
            // alert('Pincode not available')
        }
        Api.doGet(Locations.CITY_ID, queryParam, successCall, errorCall);
    }
}

const setCityObj = (CityObj) => {
    // console.log(CityObj,"Her is action")
    return function (dispatch) { 
        dispatch({
            type: Constants.ACTIONS.SAVE_SEL_PINCODE,
            data: CityObj
        });
    }
}


const clearCityObj = () => {
    return function (dispatch) {
        dispatch({
            type: Constants.ACTIONS.CLEAR_CITY_OBJ,
            data: {}
        })
    }
}



export default {
    getPincode,
    getcityid,
    setCityObj,
    clearCityObj
}
