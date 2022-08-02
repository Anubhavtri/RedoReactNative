import $primary from '../../settings/styles/DefaultPrimarySettings';

let $_ = {
    textInputPlaceholderTextColor: $primary.placeHolderColor,
    textInputHeight: $primary.baseGridUnit*5,
    textInputPaddingRight: $primary.baseGridUnit*2,
    textInputContainerPaddingHorizontal: $primary.baseGridUnit*2,
    textInputContainerBorderColor: $primary.interfaceColors._4,
    textInputContainerBorderWidth: $primary.baseGridUnit/8,
    textInputContainerBackgroundColor: $primary.interfaceColors._7,
    textInputErrorColor: $primary.informationColors.error,
    textInputContainerErrorBorderColor: $primary.informationColors.error,
    textInputFontSize: $primary.baseFontSize+4,
    textInputFontWeight: $primary.fontFamily.regular,
    textInputFontWeightAndroid: $primary.fontFamilyAndroid.regular,
    textInputColor: $primary.black,
    textBorderColor: $primary.primaryColor,
    textBackgroundColor: $primary.white,
    textInputUnderlineColorInblur: $primary.interfaceColors._3,
    textInputUnderlineColorInFocus: $primary.primaryColor,
    textBorderRadius: $primary.borderRadius 
};
export default $_;
