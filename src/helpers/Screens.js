import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, param) {
  navigationRef.current?.navigate(name, { customParam: param });
}

export function resetScreen(screenName) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: screenName }],
  });
}

export const Screens = {
  MEAL:'MEAL',
  PENDING_SCREEN: 'PENDING_SCREEN',
  ONBOARD_SCREEN: 'ONBOARD_SCREEN',
  MYACCOUNT_SCREEN: 'MYACCOUNT_SCREEN',
  LOGIN_SCREEN: 'LOGIN_SCREEN',
  OTP_VERIFICATION: 'OTP_VERIFICATION',
  ALLPACKAGE: 'ALLPACKAGE',
  TABPACKAGES: 'TABPACKAGES',
  PLAN_DETAIL: 'PLAN_DETAIL',
  PROFILESCREEN: 'PROFILESCREEN',
  APPOINTMENT: 'APPOINTMENT',
  MAINSCREEN: 'MAINSCREEN',
  CITY: 'CITY',
  HELP: 'HELP',
  PATIENT_DETAILS: 'PATIENT_DETAILS',
  ADD_ADDRESS: 'ADD_ADDRESS',
  UPDATE_ADDRESS: 'UPDATE_ADDRESS',
  ADD_SLOT: 'ADD_SLOT',
  ORDER_REVIEW: 'ORDER_REVIEW',
  MY_CART: 'MY_CART',
  MYFAMILY_FRIENDS: 'MYFAMILY_FRIENDS',
  BOOKING: 'BOOKING',
  PERSONAL_INFO: 'PERSONAL_INFO',
  EditPERSONAL_INFO: 'EditPERSONAL_INFO',
  MY_ORDER: 'MY_ORDER',
  MY_ADDRESS: 'MY_ADDRESS',
  USERADD_ADDRESS: 'USERADD_ADDRESS',
  EDIT_ADDRESS: 'EDIT_ADDRESS',
  TERMS_CONDITION: 'TERMS_CONDITION',
  TAB: 'TAB',
  EDITPROFILE: 'EDITPROFILE',
  SAMPLE_HANDOVER_SCREEN: 'SAMPLE_HANDOVER_SCREEN',
  TRACKING: 'TRACKING',
  PHLEBODETAILS: 'PHLEBODETAILS',
  ORDER_CONFIRMED: 'ORDER_CONFIRMED',
  UPLOAD_PRESCREPTION: 'UPLOAD_PRESCREPTION',
  PROFILE_ADDRESS: 'PROFILE_ADDRESS',
  PROFILE_USER_ADDADDRESS: 'PROFILE_USER_ADDADDRESS',
  PROFILE_EDIT_ADDADDRESS: 'PROFILE_EDIT_ADDADDRESS',
  MY_REDCASH: 'MY_REDCASH',
  ORDER_ADDRESS: 'ORDER_ADDRESS',
  MY_PRESCREPTION: 'MY_PRESCREPTION',
  NEW_LOGIN: 'NEW_LOGIN',
  PASSWORD: 'PASSWORD',
  NEW_PASSWORD: 'NEW_PASSWORD',
  IMAGANING_PACKAGES: 'IMAGANING_PACKAGES',
  ////////////////////////////////
  REDO_SPLASH:'REDO_SPLASH',
  REDO_ONBOARD: 'REDO_ONBOARD',
  REDO_PERSONAL_DETAILS: 'REDO_PERSONAL_DETAILS',
  UPDATE_DETAILS: 'UPDATE_DETAILS',
  GOAL_DETAILS: 'GOAL_DETAILS',
  REMINDER: 'REMINDER',
  MEDICINE_REMINDER: "MEDICINE_REMINDER",
  EDIT_MEDICINE_REMINDER: "EDIT_MEDICINE_REMINDER",
  BLOOD_SUGAR_REM_SCREEN: "BLOOD_SUGAR_REM_SCREEN",
  EDIT_BLOOD_SUGAR_REM_SCREEN: "EDIT_BLOOD_SUGAR_REM_SCREEN",
  DETAILS_REMINDER: "DETAILS_REMINDER",
  BLOOD_SUGAR_TRACKING_SCREEN:'BLOOD_SUGAR_TRACKING_SCREEN',
  WATER_REMINDER_SCREEN: "WATER_REMINDER_SCREEN",
  EDIT_WATER_REMINDER_SCREEN: "EDIT_WATER_REMINDER_SCREEN",
  MANUAL_BS_MONITORING_REM_SCREEN: "MANUAL_BS_MONITORING_REM_SCREEN",
  BLOOD_GLUCOSE_INSIGHTS: "BLOOD_GLUCOSE_INSIGHTS",
  REDO_TAB: "REDO_TAB",
  HOME_REDO: "HOME_REDO",
  LEARN_REDO: "LEARN_REDO",
  LOG_REDO: "LOG_REDO",
  PROFILE_REDO: "PROFILE_REDO",
  SHOP_REDO: "SHOP_REDO",
  CONNECT_GOOGLE_FIT: "CONNECT_GOOGLE_FIT",
  ADD_WEIGHT: "ADD_WEIGHT",
  STEPS_TRACKER: "STEPS_TRACKER",
  CAL_TRACKER: "CAL_TRACKER",
  SETSELECTGOALS : 'SETSELECTGOALS',
  SETSELECTGOALSCHILD : 'SETSELECTGOALSCHILD',
  ADDNUTRITION : 'ADDNUTRITION',
  LOGFOOD : 'LOGFOOD',
  FOODDETAILS : 'FOODDETAILS',
  EDITFOODDETAILS : 'EDITFOODDETAILS',
  TREND_SCREEN : 'TREND_SCREEN',
};