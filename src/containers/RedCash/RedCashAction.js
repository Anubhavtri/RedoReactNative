import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './RedCashConstants'

const getRedCash = (token) => {
    console.log(token)
    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.GET_REDCASH,
                data: response.results
            });
           console.log(response , "red cash response")
        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse)
            dispatch(SpinnerActions.hideSpinner());
        }
        Api.doGet(Locations.REDCASH, {}, successCall, errorCall,token);
    }
}

const getRedCashDetails = (token) => {
    console.log(token)
    return function (dispatch) {
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.GET_REDCASH_DETAILS,
                data: response
            });
           console.log(response , "red cash details response")
           setTimeout(() => {
            navigate(Screens.MY_REDCASH)    
           }, 20);
           
        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse)
            dispatch(SpinnerActions.hideSpinner());
        }
        Api.doGet(Locations.REDCASHDETAILS, {}, successCall, errorCall,token);
    }
}

export default {
    getRedCash,
    getRedCashDetails
}