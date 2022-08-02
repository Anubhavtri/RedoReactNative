import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import { resetScreen, Screens } from '../../helpers/Screens';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './PlanDetailConstant'

const getPlandetail = (packagename , cityId) => {

    const location = `${Locations.PLAN_DETAIL}${packagename}/`
    const cityname = {
        city:`${cityId}`
    }
    return function (dispatch) {
        // dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
            // console.log(response , "action call ho gya h")
            // dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.PLAN_DETAIL,
                data: response
            });
        };
        const errorCall = (errorResponse) => {
            // dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse)
            alert('Something went wrong')
        }
        Api.doGet(location, cityname, successCall, errorCall);
    }
}

const getPackParams = ( packageId ) => {

    return function (dispatch) {
        console.log(packageId)
        const queryParam = {
            code: `${dispatch}`,
        }

        const successCall = (response) => {
            // disableSpinner();
            console.log(response , "all package details ")
            dispatch({
                type: Constants.ACTIONS.PARAMETER,
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
        Api.doGet(Locations.PARAMETERS, queryParam, successCall, errorCall);
    }
}




export default {
    getPlandetail,
    getPackParams
}