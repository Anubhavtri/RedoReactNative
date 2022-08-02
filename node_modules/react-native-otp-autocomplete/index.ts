import { DeviceEventEmitter, NativeModules } from 'react-native';

const RNOtpAutocomplete = NativeModules?.RNOtpAutocomplete || undefined;

interface OtpAutocomplete {
    getOtp: () => Promise<boolean>;
    getHash: () => Promise<string[]>;
    addListener: (handler: (value: string) => any) => import('react-native').EmitterSubscription;
    removeListener: () => void;
}

const OtpAutocomplete: OtpAutocomplete = {
    getOtp: RNOtpAutocomplete ? RNOtpAutocomplete.getOtp : () => new Promise((res: (arg0: null) => any) => res(null)),
    getHash: RNOtpAutocomplete ? RNOtpAutocomplete.getHash : () => new Promise((res: (arg0: null) => any) => res(null)),

    addListener: (handler) =>
        DeviceEventEmitter
            .addListener('com.jmlavoier.otpAutocomplete:otpReceived', handler),

    removeListener: () => DeviceEventEmitter.removeAllListeners('com.jmlavoier.otpAutocomplete:otpReceived'),
};

export default OtpAutocomplete;
