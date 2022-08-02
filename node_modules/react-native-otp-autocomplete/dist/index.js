"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var RNOtpAutocomplete = (react_native_1.NativeModules === null || react_native_1.NativeModules === void 0 ? void 0 : react_native_1.NativeModules.RNOtpAutocomplete) || undefined;
var OtpAutocomplete = {
    getOtp: RNOtpAutocomplete ? RNOtpAutocomplete.getOtp : function () { return new Promise(function (res) { return res(null); }); },
    getHash: RNOtpAutocomplete ? RNOtpAutocomplete.getHash : function () { return new Promise(function (res) { return res(null); }); },
    addListener: function (handler) {
        return react_native_1.DeviceEventEmitter
            .addListener('com.jmlavoier.otpAutocomplete:otpReceived', handler);
    },
    removeListener: function () { return react_native_1.DeviceEventEmitter.removeAllListeners('com.jmlavoier.otpAutocomplete:otpReceived'); },
};
exports.default = OtpAutocomplete;
