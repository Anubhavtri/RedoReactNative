 import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistCombineReducers} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import spinner from '../components/spinner/SpinnerReducer';
import userLogin from '../containers/loginScreen/LoginReducer';
import pending from '../containers/pendingPackage/PendingPackageReducer';
import profile from '../containers/myAccountScreen/MyAccountReducer';
import samplehandover from '../containers/sampleHandover/sampleHandoverReducer';
import user from '../containers/otpverification/OtpverificationReducer';
import city from '../containers/City/CityReducer';
import userprofile from '../containers/ProfileScreen/ProfileReducer';
import packageData from '../components/Packages/PackageReducer';
import bestpackage from '../components/OurBestPackages/BestPackageReducer';
import banner from '../components/Carousel/CarouselReducer';
import customerbooking from '../containers/Booking/BookingReducer';
import Addresslistreducer from '../containers/AddAddress/AddAddressReducer';
import MycartReducer from '../containers/OrderReview/MyCartReducer';
import customerAddres from '../containers/AddAddress/AddAddressReducer';
import addSlots from '../containers/AddSlot/AddSlotsReducer';
import patientDetails from '../containers/PatientDetails/PatientDetailsReducer'
import plandetails from '../containers/PlanDetail/PlanDetailReducer'
import UploadPrescreptionReducer from '../containers/UploadPrescreption/UploadPrescreptionReducer';
import MyRedCashDetailsReducer from '../containers/RedCash/RedCashReducer';
import MyPrescreptionDetailsReducer from '../containers/MyPrescreption/MyprescreptionReducer';
import MyPasswordReducer from '../containers/Password/PasswordReducer';
import reminder from '../containers/RedoApp/ProfileScreen/reminderScreen/ReminderReducer';
import redoOnboardingReducer from '../containers/RedoApp/Splash&OnboardingScreen/Splash&OnboardingReducer'

function getStore() {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 0,
  };

  const rootReducer = persistCombineReducers(persistConfig, {
    spinner,
    bestpackage,
    city,
    user,
    userprofile,
    userLogin,
    profile,
    pending,
    samplehandover,
    packageData,
    banner,
    customerbooking,
    Addresslistreducer,
    MycartReducer,
    customerAddres,
    addSlots,
    patientDetails,
    plandetails,
    UploadPrescreptionReducer,
    MyRedCashDetailsReducer,
    MyPrescreptionDetailsReducer,
    MyPasswordReducer,
    reminder,redoOnboardingReducer
  });

  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return {store, persistor};
}

let {store, persistor} = getStore();

export function getConfiguredStore() {
  return store;
}

export function getConfiguredPersistorStore() {
  return persistor;
}
