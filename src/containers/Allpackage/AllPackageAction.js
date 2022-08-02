import Constants from './AllPackageConstants';

const setAllSearchTxt = text => {
  return function (dispatch) {
    dispatch({
      type: Constants.ACTIONS.ALL_PACKAGE_TXT_SRCH,
      data: text,
    });
  };
};

export default {
  setAllSearchTxt,
};
