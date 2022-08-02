import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens,navigate } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './MyprescreptionConstant'

const getPrescreption = (token) => {
    console.log(token)
    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.GET_PRESCREPTION_DETAILS,
                data: response.results
            });
            console.log(response , "fffffffffffffffffffffffffffffffff")
            navigate(Screens.MY_PRESCREPTION)
        };
        const errorCall = (errorResponse) => {
            console.log(errorResponse)
            dispatch(SpinnerActions.hideSpinner());
        }
        Api.doGet(Locations.MYPRESCREPTION, {}, successCall, errorCall,token);
    }
}

export default {
    getPrescreption,
}