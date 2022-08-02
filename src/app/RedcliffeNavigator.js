import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PrimarySettings from '../settings/styles/DefaultPrimarySettings';
import AppLevelSpinner from './AppLevelSpinner';
import { navigationRef, Screens, navigate } from '../helpers/Screens';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  StatusBar,
  BackHandler,
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../containers/loginScreen/LoginScreen';
//import FirebaseActions from './FirebaseActions';
import MyAccountScreen from '../containers/myAccountScreen/MyAccountScreen';
import PendingScreen from '../containers/pendingPackage/PendingPackage';
import sampleHandover from '../containers/sampleHandover/sampleHandover';
import Otpverification from '../containers/otpverification/Otpverification';
import Allpackage from '../containers/Allpackage/Allpackage';
import Onboarding from '../containers/OnboardingScreen/Onboarding';
import PlanDetail from '../containers/PlanDetail/PlanDetail';
import ProfileScreen from '../containers/ProfileScreen/ProfileScreen';
import Appointment from '../containers/appointment/Appointment';
import Help from '../containers/Help/Help';
import City from '../containers/City/City';
import MainScreen from '../containers/HomeScreen/MainScreen';
import EditProfile from '../containers/EditProfile/EditProfile';
import Booking from '../containers/Booking/Booking/';
import { connect } from 'react-redux';
import PatientDetails from '../containers/PatientDetails/PatientDetails';
import UpdateAddress from '../containers/UpdateAddress/UpdateAddress';
import AddAddress from '../containers/AddAddress/AddAddress';
import OrderReview from '../containers/OrderReview/OrderReview';
import AddSlot from '../containers/AddSlot/AddSlot';
import MyCart from '../containers/OrderReview/MyCart';
import PersonalInfo from '../containers/PersonalInfo/PersonalInfo';
import EditPersonalinfo from '../containers/EditPersonalInfo/EditPersonalinfo';
import MyOrder from '../containers/MyOrder/MyOrder';
import MyFamilyFriends from '../containers/MyFamily&Friends/MyFamily&Friends';
import MyAddress from '../containers/MyAddresses/MyAddress';
import UserAddAddress from '../containers/UserAddAddress/UserAddAddress';
import EditAddress from '../containers/EditAddress/EditAddress';
import TermsAndCondition from '../containers/TermsAndCondition/TermsAndCondition';
import TrackingAnimationActivity from '../containers/Tracking/Tracking';
import PhleboDetails from '../containers/Booking/PhleboDetails';
import OrderConfirmed from '../containers/OrderConfirmed/OrderConfirmed';
import UploadPrescreption from '../containers/UploadPrescreption/UploadPrescreption';
import ProfileAddress from '../containers/AddAddress/ProfileAddress';
import ProfileUserAddAddress from '../containers/UserAddAddress/ProfileUserAddAddress';
import ProfileEditAddress from '../containers/EditAddress/ProfileEditAddress';
import BlueHome from '../staticData/svg/home.svg'
import BlueHeart from '../staticData/svg/cardiogram.svg'
import GrayHeart from '../staticData/svg/GrayHeart.svg'
import BlueUser from '../staticData/svg/user.svg'
import GreyUser from '../staticData/svg/GrayUser.svg'
import GrayHome from '../staticData/svg/GrayHome.svg'
import RedCash from '../containers/RedCash/RedCash';
import OrderAddress from '../containers/AddAddress/OrderAddress';
import Myprescreption from '../containers/MyPrescreption/Myprescreption';
import NewLoginScreen from '../containers/loginScreen/NewLoginScreen';
import Password from '../containers/Password/Password';
import NewUserPassword from '../containers/NewUserPassword/NewUserPassword';
import Imaganingpackage from '../containers/Imaganingpackage/Imaganingpackage';
////////////////REDO
import ReminderMainScreen from '../containers/RedoApp/ProfileScreen/reminderScreen/ReminderMainScreen';
import MedicineReminder from '../containers/RedoApp/ProfileScreen/reminderScreen/MedicineReminder';
import BloodSugarReminder from '../containers/RedoApp/ProfileScreen/reminderScreen/BloodSugarReminder';
import WaterReminder from '../containers/RedoApp/ProfileScreen/reminderScreen/WaterReminder';
import ManualMonitoring from '../containers/RedoApp/LogScreen/BloodSugar/ManualMonitoring';
import BloodGlucoseInsights from '../containers/RedoApp/ProfileScreen/reminderScreen/BloodGlucoseInsights';
import HomeRedoScreen from '../containers/RedoApp/HomeScreen/HomeRedoScreen';
import LearnRedoScreen from '../containers/RedoApp/LearnScreen/LearnRedoScreen';
import LogRedoScreen from '../containers/RedoApp/LogScreen/LogRedoScreen';
import ProfileRedoScreen from '../containers/RedoApp/ProfileScreen/ProfileRedoScreen';
import ShopRedoScreen from '../containers/RedoApp/ShopScreen/ShopRedoScreen';
import BloodSugarTracker from '../containers/RedoApp/ProfileScreen/DiaryAndTracker/BloodSugarTracker';
import RedoMeal from '../containers/RedoApp/LogScreen/RedoMeal/RedoMeal';
import Splash from '../containers/RedoApp/Splash&OnboardingScreen/Splash';
import Onboard from '../containers/RedoApp/Splash&OnboardingScreen/Onboard';
import PersonalDetails from '../containers/RedoApp/Splash&OnboardingScreen/PersonalDetails';
import ConnectGoogleFit from '../containers/RedoApp/HomeScreen/ConnectGoogleFit';
import StepTrackerScreen from '../containers/RedoApp/HomeScreen/StepTrackerScreen';
import AddWeight from '../containers/RedoApp/HomeScreen/AddWeight';
import SetGoalsWithStep from '../containers/RedoApp/HomeScreen/SetGoalsWithStep';
import AddNutrition from '../containers/RedoApp/HomeScreen/AddNutrition';
import LogFood from '../containers/RedoApp/HomeScreen/LogFood';
import FoodDetails from '../containers/RedoApp/HomeScreen/FoodDetails';
import EditFoodDetails from '../containers/RedoApp/HomeScreen/EditFoodDetails';
import CalriTrackerScreen from '../containers/RedoApp/HomeScreen/CalriTrackerScreen';
import TrendScreen from '../containers/RedoApp/HomeScreen/TrendScreen';
import UpadteDetails from '../containers/RedoApp/HomeScreen/UpadteDetails';
import GoalDetails from '../containers/RedoApp/HomeScreen/GoalDetails';
import EditMedicineReminder from '../containers/RedoApp/ProfileScreen/reminderScreen/EditMedicineReminder';
import EditBloodSugarReminder from '../containers/RedoApp/ProfileScreen/reminderScreen/EditBloodSugarReminder';
import EditWaterReminder from '../containers/RedoApp/ProfileScreen/reminderScreen/EditWaterReminder';
import DetailsReminder from '../containers/RedoApp/ProfileScreen/reminderScreen/DetailsReminder';
import SetGoalsWithStepChild from '../containers/RedoApp/HomeScreen/SetGoalsWithStepChild';

function RenderIcon(props) {
  let customColor = props.navigation.focused
    ? PrimarySettings.primaryColor
    : PrimarySettings.grayColors._500;
  return (
    <FontAwesome name={props.iconName} style={{ color: customColor }} size={25} />
  );
}

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

const pendingStack = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: PrimarySettings.primaryColor,
      },
      headerTitleStyle: {
        color: PrimarySettings.white,
      },
    }}>
    <Stack.Screen
      name={'PendingHome'}
      component={PendingScreen}
      options={{
        headerTitle: 'Profile Screen',
      }}
    />
  </Stack.Navigator>
);

const Tabs = props => {
  useEffect(() => {
    const backAction = () => {
      if (props.navigation.isFocused()) {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <BottomTabs.Navigator
      screenOptions={{
        showIcon: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: PrimarySettings.primaryColor,
        tabBarInactiveTintColor: PrimarySettings.grayColors._700,
        style: {
          borderRadius: 5,
          height: 50,
        },
      }}
    >


      <BottomTabs.Screen
        name={Screens.MAINSCREEN}
        component={MainScreen}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ focused }) => (
              <View>
                {focused ? (
                  <View>
                    <BlueHome />
                  </View>
                ) : (
                  <View>
                    <GrayHome />
                  </View>
                )}
              </View>
            ),
            tabBarLabel: 'Home',
            headerShown: false,
          };
        }}
      />

      <BottomTabs.Screen
        name={Screens.ALLPACKAGE}
        component={Allpackage}
        listeners={{
          tabPress: e => {
            navigate(Screens.ALLPACKAGE, {
              search: '',
              from: 'notmainpage',
              best: false,
            });
          },
        }}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ focused }) => (
              <View>
                {focused ? (
                  <View>
                    <BlueHeart />
                  </View>
                ) : (
                  <View>
                    <GrayHeart />
                  </View>
                )}
              </View>
            ),
            tabBarLabel: 'All Packages',
            headerShown: false,
          };
        }}
      />
      <BottomTabs.Screen
        name={Screens.PROFILESCREEN}
        component={ProfileScreen}
        options={({ navigation }) => {
          return {
            tabBarIcon: ({ focused }) => (
              <View>
                {focused ? (
                  <View>
                    <BlueUser />
                  </View>
                ) : (
                  <View>
                    <GreyUser />
                  </View>
                )}
              </View>
            ),
            tabBarLabel: 'My Profile',
            headerShown: false,
          };
        }}
      />

    </BottomTabs.Navigator>
  );
};


const RedoTAB = (props) => {

  useEffect(() => {
    const backAction = () => {
      if (props.navigation.isFocused()) {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (

    <BottomTabs.Navigator
      screenOptions={{
        showIcon: true,
        showLabel: true,
        activeTintColor: PrimarySettings.redcliffepink,
        inactiveTintColor: PrimarySettings.grayColors._700,
      }}
      initialRouteName={Screens.HOME_REDO}>

      <BottomTabs.Screen name={Screens.HOME_REDO}
        component={HomeRedoScreen}
        options={({ navigation }) => {
          return {
            tabBarIcon: (navigation) => (
              <RenderIcon navigation={navigation}
                iconName={'home'} />
            ),
            tabBarLabel: 'Home',
            headerShown: false,
          }
        }}
      />
      <BottomTabs.Screen name={Screens.TREND_SCREEN}
        component={TrendScreen}
        options={({ navigation }) => {
          return {
            tabBarIcon: (navigation) => (
              <RenderIcon navigation={navigation}
                iconName={'circle-o-notch'} />
            ),
            tabBarLabel: 'Trend',
            headerShown: false,
          }
        }}
      />
      <BottomTabs.Screen name={Screens.SHOP_REDO}
        component={LearnRedoScreen}
        options={({ navigation }) => {
          return {
            tabBarIcon: (navigation) => (
              <RenderIcon navigation={navigation}
                iconName={'graduation-cap'} />
            ),
            tabBarLabel: 'Learn',
            headerShown: false,
          }
        }}
      />

      <BottomTabs.Screen name={Screens.PROFILE_REDO}
        component={ProfileRedoScreen}
        options={({ navigation }) => {
          return {
            tabBarIcon: (navigation) => (
              <RenderIcon navigation={navigation}
                iconName={'user-circle-o'} />
            ),
            tabBarLabel: 'Profile',
            headerShown: false,
          }
        }}
      />
    </BottomTabs.Navigator>


  );
}
const style = StyleSheet.create({});

const RedCliffeStack = ({ token }) => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerBackTitleVisible: false,
    }}
    initialRouteName={token ? Screens.TAB : Screens.ONBOARD_SCREEN}
  >
    <Stack.Screen
      name={Screens.ONBOARD_SCREEN}
      component={Onboarding}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.LOGIN_SCREEN}
      component={LoginScreen}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.OTP_VERIFICATION}
      component={Otpverification}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.NEW_PASSWORD}
      component={NewUserPassword}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.CITY}
      component={City}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.TAB}
      component={Tabs}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.PERSONAL_INFO}
      component={PersonalInfo}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.MYFAMILY_FRIENDS}
      component={MyFamilyFriends}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.EditPERSONAL_INFO}
      component={EditPersonalinfo}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.MY_ORDER}
      component={MyOrder}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.EDITPROFILE}
      component={EditProfile}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.HELP}
      component={Help}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.APPOINTMENT}
      component={Appointment}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.PLAN_DETAIL}
      component={PlanDetail}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.MY_CART}
      component={MyCart}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.PATIENT_DETAILS}
      component={PatientDetails}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.ADD_ADDRESS}
      component={AddAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.UPDATE_ADDRESS}
      component={UpdateAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.ADD_SLOT}
      component={AddSlot}
      options={{ headerMode: 'none', headerShown: false }}
    />

    <Stack.Screen
      name={Screens.PASSWORD}
      component={Password}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.ORDER_REVIEW}
      component={OrderReview}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.ORDER_CONFIRMED}
      component={OrderConfirmed}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.BOOKING}
      component={Booking}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.MY_ADDRESS}
      component={MyAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.USERADD_ADDRESS}
      component={UserAddAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.EDIT_ADDRESS}
      component={EditAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.TERMS_CONDITION}
      component={TermsAndCondition}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.PHLEBODETAILS}
      component={PhleboDetails}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.TRACKING}
      component={TrackingAnimationActivity}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.UPLOAD_PRESCREPTION}
      component={UploadPrescreption}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.PROFILE_USER_ADDADDRESS}
      component={ProfileUserAddAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />

    <Stack.Screen
      name={Screens.PROFILE_EDIT_ADDADDRESS}
      component={ProfileEditAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.PROFILE_ADDRESS}
      component={ProfileAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />

    <Stack.Screen
      name={Screens.ORDER_ADDRESS}
      component={OrderAddress}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.NEW_LOGIN}
      component={NewLoginScreen}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.MY_PRESCREPTION}
      component={Myprescreption}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen
      name={Screens.MY_REDCASH}
      component={RedCash}
      options={{ headerMode: 'none', headerShown: false }}
    />

    {/* Imaganingpackage */}
    <Stack.Screen
      name={Screens.IMAGANING_PACKAGES}
      component={Imaganingpackage}
      options={{ headerMode: 'none', headerShown: false }}
    />
    {/* REDO */}
    <Stack.Screen
      name={Screens.REDO_SPLASH}
      component={Splash}
      options={{ headerMode: 'none', headerShown: false }}
    />
    <Stack.Screen name={Screens.REDO_ONBOARD}
      component={Onboard}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.REDO_PERSONAL_DETAILS}
      component={PersonalDetails}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.UPDATE_DETAILS}
      component={UpadteDetails}
      options={{ headerMode: 'none', headerShown: false }} />
     <Stack.Screen name={Screens.GOAL_DETAILS}
      component={GoalDetails}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.REMINDER}
      component={ReminderMainScreen}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.MEDICINE_REMINDER}
      component={MedicineReminder}
      options={{ headerMode: 'none', headerShown: false }} />
     <Stack.Screen name={Screens.EDIT_MEDICINE_REMINDER}
      component={EditMedicineReminder}
      options={{ headerMode: 'none', headerShown: false }} />
   <Stack.Screen name={Screens.BLOOD_SUGAR_REM_SCREEN}
      component={BloodSugarReminder}
      options={{ headerMode: 'none', headerShown: false }} />
   <Stack.Screen name={Screens.EDIT_BLOOD_SUGAR_REM_SCREEN}
      component={EditBloodSugarReminder}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.DETAILS_REMINDER}
      component={DetailsReminder}
      options={{ headerMode: 'none', headerShown: false }} />
      <Stack.Screen name={Screens.WATER_REMINDER_SCREEN}
      component={WaterReminder}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.EDIT_WATER_REMINDER_SCREEN}
      component={EditWaterReminder}
      options={{ headerMode: 'none', headerShown: false }} />
     <Stack.Screen name={Screens.MANUAL_BS_MONITORING_REM_SCREEN}
      component={ManualMonitoring}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.BLOOD_GLUCOSE_INSIGHTS}
      component={BloodGlucoseInsights}
      options={{ headerMode: 'none', headerShown: false }} />

    <Stack.Screen name={Screens.BLOOD_SUGAR_TRACKING_SCREEN}
      component={BloodSugarTracker}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.MEAL}
      component={RedoMeal}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.CONNECT_GOOGLE_FIT}
      component={ConnectGoogleFit}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.STEPS_TRACKER}
      component={StepTrackerScreen}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.CAL_TRACKER}
      component={CalriTrackerScreen}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.REDO_TAB}
      component={RedoTAB}
      options={{ headerMode: 'none', headerShown: false }} />
    <Stack.Screen name={Screens.HOME_REDO}
      component={HomeRedoScreen}
      options={{ headerMode: 'none', headerShown: false }} />
         <Stack.Screen name={Screens.ADD_WEIGHT}
      component={AddWeight}
      options={{ headerMode: 'none', headerShown: false }} />
       <Stack.Screen name={Screens.SETSELECTGOALS}
      component={SetGoalsWithStep}
      options={{ headerMode: 'none', headerShown: false }} />
       <Stack.Screen name={Screens.SETSELECTGOALSCHILD}
      component={SetGoalsWithStepChild}
      options={{ headerMode: 'none', headerShown: false }} />
       <Stack.Screen name={Screens.ADDNUTRITION}
      component={AddNutrition}
      options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen name={Screens.LOGFOOD}
      component={LogFood}
      options={{ headerMode: 'none', headerShown: false }} />
         <Stack.Screen name={Screens.FOODDETAILS}
      component={FoodDetails}
      options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen name={Screens.EDITFOODDETAILS}
      component={EditFoodDetails}
      options={{ headerMode: 'none', headerShown: false }} />
        <Stack.Screen name={Screens.TREND_SCREEN}
      component={TrendScreen}
      options={{ headerMode: 'none', headerShown: false }} />
  </Stack.Navigator>
);

const RedcliffeNavigator = props => {
  return (
    <>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
        translucent={true}
      />
      <NavigationContainer
        ref={navigationRef}>
        <RedCliffeStack token={props.token} />
      </NavigationContainer>
      <AppLevelSpinner />
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state?.user?.userData?.token,
});

export default connect(mapStateToProps)(RedcliffeNavigator);
