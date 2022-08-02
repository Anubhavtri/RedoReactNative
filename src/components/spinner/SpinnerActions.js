import Constants from './SpinnerConstants';

export default {
    showSpinner: (text) => {
        return { type: Constants.ACTIONS.SHOW_SPINNER_MODAL, text: text };
    },
    hideSpinner: () => {
        return { type: Constants.ACTIONS.HIDE_SPINNER_MODAL };
    }
};