
# react-native-otp-autocomplete
This library was forked from [react-native-otp-verify](https://github.com/faizalshap/react-native-otp-verify) that was deprecated.

It uses Automatic SMS Verification with the SMS Retriever API.
With the SMS Retriever API, you can perform SMS-based user verification in your Android app automatically, without requiring the user to manually type verification codes, and without requiring any extra app permissions.

 ## Message Format/Structure
 In order to detect the message, SMS message must include a hash that identifies your app. This hash can be obtained by using the getHash() method below.

 Please read the official documentation for the message structure at this
[Google developer guide](https://developers.google.com/identity/sms-retriever/verify)

## Getting started

`$ npm install react-native-otp-autocomplete --save`
 or
`$ yarn react-native-otp-autocomplete`

### Using React Native Link (React Native 0.59 and lower)
`$ react-native link react-native-otp-autocomplete`

### Manual installation (Android)

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.jmlavoier.OtpAutocomplete.RNOtpAutocompletePackage;` to the imports at the top of the file
  - Add `new RNOtpAutocompletePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```gradle
  	include ':react-native-otp-autocomplete'
  	project(':react-native-otp-autocomplete').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-otp-autocomplete/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```gradle
      compile project(':react-native-otp-autocomplete')
  	```

## Usage
```javascript
import OtpAutocomplete from 'react-native-otp-autocomplete';

const getHash = () =>
    OtpAutocomplete.getHash()
    .then(console.log)
    .catch(console.log);

const startListeningForOtp = () =>
    OtpAutocomplete.getOtp()
    .then(p => OtpAutocomplete.addListener(otpHandler))
    .catch(p => console.log(p));

const otpHandler = (message: string) => {
        const otp = /(\d{4})/g.exec(message)[1];
        this.setState({ otp });
        OtpAutocomplete.removeListener();
        Keyboard.dismiss();
}

useEffet(() => {
    startListeningForOtp();

    return () => OtpAutocomplete.removeListener();
}, [startListeningForOtp]);


```

#### Methods
---
### `getOtp():Promise<boolean>`

Start listening for OTP/SMS. Return true if listener starts else throws error.

---
### `getHash():Promise<string[]>`

Gets the hash code for the application which should be added at the end of message.
This is just a one time process.

---
### `addListener(handler:(message:string)=>any):Promise<boolean>`

Adds a javascript listener to the handler passed which is called when message is received.

---
### `removeListener():void`

Removes the listener.

---
