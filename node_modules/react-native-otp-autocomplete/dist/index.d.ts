interface OtpAutocomplete {
    getOtp: () => Promise<boolean>;
    getHash: () => Promise<string[]>;
    addListener: (handler: (value: string) => any) => import('react-native').EmitterSubscription;
    removeListener: () => void;
}
declare const OtpAutocomplete: OtpAutocomplete;
export default OtpAutocomplete;
