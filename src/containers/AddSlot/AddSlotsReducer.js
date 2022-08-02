import Constants from './AddSlotsConstants';

let initialState = {
  getAppointmentSlots: [],
  SelectedSlot:{}
};

export default function MyAddSlotsReducer(state = initialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case Constants.ACTIONS.GET_APPOINTMENT_SLOT:
      newState.getAppointmentSlots = action.data;
      break;
      case Constants.ACTIONS.CLEAR_APPOINTMENT_SLOT:
        newState.getAppointmentSlots = [];
        break;
    case Constants.ACTIONS.SET_TIME_SLOT_GLOBAL:
      newState.SelectedSlot = action.data;
      break;
    default:
      break;
  }
  return newState;
}
