import Api from '../../helpers/api';
import Locations from '../../helpers/locations';
import SpinnerActions from '../../components/spinner/SpinnerActions';
import Constants from './AddSlotsConstants';

const getAppointmentSlots = (date,zoneDate, token) => {
  let queryParam = {
    collection_date: date,
    customer_zone: zoneDate,
  };

  return function (dispatch) {
    dispatch(SpinnerActions.showSpinner());
    const successCall = response => {
      dispatch(SpinnerActions.hideSpinner());
      dispatch({
        type: Constants.ACTIONS.GET_APPOINTMENT_SLOT,
        data: response.results,
      });
    };
    const errorCall = errorResponse => {
      dispatch(SpinnerActions.hideSpinner());
      alert('Something went wrong');
    };

    Api.doGet(
      Locations.BOOKING_SLOT_COLLECTION_DATE,
      queryParam,
      successCall,
      errorCall,
      token,
    );
  };
};

const setTimeSlotGlobal = (SelectedTimeSlot,appointmentDate) => {

  const body = { 
    Time:SelectedTimeSlot,
    Date:appointmentDate
  }
 console.log(body)
  return function (dispatch) {

    dispatch({
      type: Constants.ACTIONS.SET_TIME_SLOT_GLOBAL,
      data: body,
    });
    console.log(body)
  };
};

export default {
  getAppointmentSlots,
  setTimeSlotGlobal
};
