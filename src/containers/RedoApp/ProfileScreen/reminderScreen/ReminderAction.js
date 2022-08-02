import Api from '../../../../helpers/api';
import Locations from '../../../../helpers/locations';
import { resetScreen,navigate, Screens } from '../../../../helpers/Screens';
import SpinnerActions from '../../../../components/spinner/SpinnerActions';
import Constants from './ReminderConstants'

const postCustomerBooking = (body,token,userId) => {

    return function (dispatch) {
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
           console.log("reminder create success",response);
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.CREATE_REMINDER,
                data: response.results
            });
            navigate(Screens.REMINDER)
            alert('Reminder Created')
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse,"Cannot post")
            alert(JSON.stringify(errorResponse?.error))
        }
        console.log("errorResponse --userIdreminderAction---",userId )

        Api.doPost(Locations.CREATE_REMINDER+"?uc_id="+userId, body, successCall, errorCall,token);
    }
}
const postEditReminder = (url,body,token) => {

    return function (dispatch) {
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
           console.log("reminder create success--postEditReminder",response);
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.EDIT_REMINDER,
                data: response.results
            });
           // resetScreen(Screens.REMINDER)
            alert('Reminder Updated')
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse,"Cannot post")
            alert(JSON.stringify(errorResponse?.error))
        }
        Api.doPatch(url, body, successCall, errorCall,token);
    }
}
const postUpdateStatusReminder = (url,body,token,userId) => {

    return function (dispatch) {
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
           console.log("reminder create success--postUpdateSttausReminderrr",response);
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.EDIT_REMINDER,
                data: response.results
            });
            console.log("reminder create success--postUpdateSttausReminder---under",response);
            resetScreen(Screens.REMINDER)
          // getAllReminders(token,userId)
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse,"Cannot post")
            alert(JSON.stringify(errorResponse?.error))
        }
        Api.doPatch(url, body, successCall, errorCall,token);
    }
}
const getAllReminders = (token,userId) => {

    return function (dispatch) {

        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.ALL_REMINDERS,
                data: response.results
            });
           console.log("get reminder succ --",response)
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            // if (errorResponse.status === 401 || errorResponse.status === 403) {
            //     dispatch({
            //         type: Constants.ACTIONS.CLEAR_DATA
            //     });
            //     resetScreen(Screens.LOGIN_SCREEN)
            // }
            console.log("GEt Reminders error response",errorResponse)

        }

        console.log("errorResponse --userId---",userId)

        Api.doGetIt(Locations.GET_REMINDER+"?uc_id="+userId , successCall, errorCall, token);
    }
}
const createmanualbloodglucose=(body,token)=>{
    return function (dispatch) {
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {
           console.log("reminder create success",response);
            dispatch(SpinnerActions.hideSpinner());
            // resetScreen(Screens.REDO_TAB)
            alert('Thanks, our health coach will connect you shortly')
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse,"ERRR) Manual booking")
            alert(JSON.stringify(errorResponse?.error))
        }
        Api.doPost(Locations.CREATE_MANUAL, body, successCall, errorCall,token);
    }
}
const getAllManualBookings = (mealtype,token) => {

    const queryParam = {
        meal_type:mealtype
    }
    return function (dispatch) {
        dispatch(SpinnerActions.showSpinner());
        const successCall = (response) => {      
            dispatch(SpinnerActions.hideSpinner());
            dispatch({
                type: Constants.ACTIONS.ALL_MANUAL_BOOKINGS,
                data: response.results
            });
      
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            // if (errorResponse.status === 401 || errorResponse.status === 403) {
            //     dispatch({
            //         type: Constants.ACTIONS.CLEAR_DATA
            //     });
            //     resetScreen(Screens.LOGIN_SCREEN)
            // }
            console.log("GEt Reminders error response",errorResponse)

        }

        Api.doGet(Locations.GET_MANUAL,queryParam, successCall, errorCall, token);
    }
}
export default{
    postCustomerBooking,
    postEditReminder,
    postUpdateStatusReminder,
    getAllReminders,
    createmanualbloodglucose,
    getAllManualBookings,
}