import React, { useState, useEffect } from 'react'
import { getConfiguredStore, getConfiguredPersistorStore } from './app/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import RedcliffeNavigator from './app/RedcliffeNavigator';
import SplashScreen from 'react-native-splash-screen'
import firebase from 'react-native-firebase';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreAllLogs()
const persistor = getConfiguredPersistorStore();
const store = getConfiguredStore();
const App = () => {
  const [fcm, setfcm] = useState("")
  
  useEffect(() => {
    SplashScreen.hide();
checkPermission();
    // Register all listener for notification 
 createNotificationListeners();
  }, []);
  const  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    // If Premission granted proceed towards token fetch
    if (enabled) {
      getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method. 
    requestPermission();
    }
  }

  const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log("TAG", " fcmToken : "+fcmToken)
      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken",fcmToken)
    
      }
    }
  }

  const requestPermission= async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

   createNotificationListeners= async()=> {

    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
    .setDescription('My apps test channel');

// Create the channel
firebase.notifications().android.createChannel(channel);

firebase.messaging().subscribeToTopic('news1');

 const notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
    // Process your notification as required
    // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
});

    // This listener triggered when notification has been received in foreground

    notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.log('get Message');
      console.log(notification);
      notification
          .android.setChannelId('test-channel')
          .android.setSmallIcon('ic_launcher');
      firebase.notifications()
          .displayNotification(notification);
          var getCount = 0
          AsyncStorage.getItem("NotificationCount").then((value) => {
           //console.log('NotificationCount :'+value)
           if(value!=null){
                getCount = (parseInt(value)+1)
               // console.log("update 11getCount : "+getCount)
           AsyncStorage.setItem("NotificationCount",getCount.toString())
           const dataSend = {
               countSend : getCount.toString()
           }
           EventRegister.emit('NotificationCount', dataSend)
           }else {
               getCount = 1
              // console.log("update 222getCount : "+getCount)
           AsyncStorage.setItem("NotificationCount",getCount.toString())
           const dataSend = {
               countSend : getCount.toString()
           }
           EventRegister.emit('NotificationCount', dataSend)
           }
           
       });
  });

    // notificationListener = firebase.notifications().onNotification((notification) => {
    //     console.log("notification : "+notification)
    //     notification
    //     .android.setChannelId('test-channel')
    //     .android.setSmallIcon('ic_launcher');
    //    firebase.notifications()
    //     .displayNotification(notification);
       
       
    // //   const { title, body } = notification;
    // //   displayNotification(title, body);
    // });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    });

    // This listener triggered when app is closed and we click,tapped and opened notification 
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
    
    }
  
  }
 
  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}>
        <RedcliffeNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
