import Constants from './ReminderConstants';

let initialState = {
    allReminders: [],
    allManualBookings: []
};

export default function ReminderReducer(state = initialState, action) {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case Constants.ACTIONS.ALL_REMINDERS:
            newState.allReminders = action.data;
            break;
        case Constants.ACTIONS.EDIT_REMINDER:
            newState.update = action.update;
            break;
        case Constants.ACTIONS.ALL_MANUAL_BOOKINGS:
            newState.allManualBookings = action.data;
            break;
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;

        default:
            break;
    }
    return newState;
}


