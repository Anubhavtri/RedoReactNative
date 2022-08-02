// import analytics from '@react-native-firebase/analytics';
// import crashlytics from '@react-native-firebase/crashlytics';


// class FirebaseActions {

//     async trackEvent(eventName, data) {
//         crashlytics().log('Event Fired ', eventName);
//         await analytics().logEvent(eventName, data);
//     }

//     async trackScreenView(screen) {

//         crashlytics().log('screen rendered ', screen);
        
//         await analytics().logScreenView({
//             screen_name: screen
//         });
//     }
//     async trackGoBack(goBackToScreen) {
//         crashlytics().log('Screen Back ', goBackToScreen);
//         await analytics().logEvent('Back - ', goBackToScreen);

//     }
// }

// export default new FirebaseActions();