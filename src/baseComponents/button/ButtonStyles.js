import $_ from './ButtonSettings';

export let PropStyles = {
  buttonPrimaryPressedColor: $_.buttonPrimaryShadowColor,
  x: $_.buttonSecondaryShadowColor,
  buttonQuaternaryPressedColor: $_.buttonQuaternaryShadowColor
};

export default {
  buttonPrimaryWrapper: {
    backgroundColor: $_.buttonPrimaryBackgroundColor,
    margin: $_.buttonWrapperMargin,
    borderRadius: 7,
    borderColor: $_.buttonPrimaryBackgroundColor,
    borderWidth:1,

  },
  buttonPrimaryContainer: {
    backgroundColor: $_.buttonPrimaryBackgroundColor,
    borderBottomColor: $_.buttonPrimaryShadowColor,
    borderBottomWidth: $_.buttonShadowWidth,
    paddingTop: $_.buttonPaddingTop,
    paddingBottom: $_.buttonPaddingBottom,
    borderRadius: 5,
    borderColor: $_.buttonPrimaryBackgroundColor,
    

    android: {
      paddingTop: $_.buttonPaddingTopAndroid,
      paddingBottom: $_.buttonPaddingBottomAndroid
    },
    
  },
  buttonPrimaryContainerPressedStyle: {
    backgroundColor: $_.buttonPrimaryShadowColor,
    borderBottomColor: $_.buttonPrimaryShadowColor,
    borderBottomWidth: $_.buttonShadowWidth,
    paddingTop: $_.buttonPaddingTop,
    paddingBottom: $_.buttonPaddingBottom,
    borderRadius: 5,
    android: {
      paddingTop: $_.buttonPaddingTopAndroid,
      paddingBottom: $_.buttonPaddingBottomAndroid
    },
  },
  buttonPrimary: {
    color: $_.buttonSecondaryBackgroundColor,
    fontSize: $_.buttonPrimaryFontSize,
    textAlign: 'center',
    borderColor: $_.buttonPrimaryBackgroundColor,

  },
  buttonPrimaryContainerDisabled: {
    borderBottomWidth: 0,
    borderBottomColor: $_.buttonPrimaryDisabled,
    backgroundColor: $_.buttonPrimaryDisabled,
  },
  buttonSecondaryWrapper: {
    backgroundColor: $_.buttonSecondaryBackgroundColor,
    borderColor: $_.buttonSecondaryBorderColor,
    borderWidth: 1
  },
  buttonSecondaryContainer: {
    backgroundColor: $_.buttonSecondaryBackgroundColor,
    borderBottomColor: $_.buttonSecondaryShadowColor,
    paddingTop: $_.buttonSecondaryPaddingTop,
    paddingBottom: $_.buttonSecondaryPaddingBottom,
    android: {
      paddingTop: $_.buttonSecondaryPaddingTopAndroid,
      paddingBottom: $_.buttonSecondaryPaddingBottomAndroid
    },
  },
  buttonSecondaryPressedStyle: {
    backgroundColor: $_.buttonSecondaryBackgroundColor,
    borderBottomColor: $_.buttonSecondaryBackgroundColor,
    paddingTop: $_.buttonSecondaryPaddingTop,
    paddingBottom: $_.buttonSecondaryPaddingBottom,
    android: {
      paddingTop: $_.buttonSecondaryPaddingTopAndroid,
      paddingBottom: $_.buttonSecondaryPaddingBottomAndroid
    }
  },
  buttonSecondary: {
    color: $_.buttonSecondaryColor,
  },
  
  buttonTertiaryWrapper: {
    borderColor: $_.buttonTertiaryBorderColor,
    backgroundColor: $_.buttonTertiaryBackgroundColor,
    borderWidth: 1,
    alignSelf: 'stretch'
  },
  buttonTertiaryContainer: {
    borderBottomWidth: 0,
    backgroundColor: $_.buttonTertiaryBackgroundColor,
    paddingTop: $_.buttonTertiaryPaddingTop,
    paddingBottom: $_.buttonTertiaryPaddingBottom,
    android: {
      paddingTop: $_.buttonTertiaryPaddingAndroid,
    },
  },
  buttonTertiary: {
    fontSize: $_.buttonTertiaryFontSize,
    color: $_.buttonTertiaryColor,
    android: {
      fontFamily: $_.buttonTertiaryTextFontWeightAndroid,
    },
    ios: {
      fontFamily: $_.buttonTertiaryTextFontFamilyIOS
    }
  },
  buttonQuaternaryWrapper: {
      backgroundColor: $_.buttonQuaternaryBackgroundColor,
  },
  buttonQuaternaryContainer: {
      backgroundColor: $_.buttonQuaternaryBackgroundColor,
      borderBottomColor: $_.buttonQuaternaryShadowColor,
  },
  buttonQuaternaryPressed: {
      backgroundColor: $_.buttonQuaternaryShadowColor,
      borderBottomColor: $_.buttonQuaternaryShadowColor,
  },
  buttonQuaternary: {
    color: $_.buttonQuaternaryColor,
  },
  flatButtonWrapper : {
    alignSelf: 'center',
    padding: $_.flatButtonPadding
  },
  flatButton: {
    color: $_.flatButtonColor,
    fontSize: $_.flatButtonFontSize,
    textDecorationLine: 'underline'
  },
  flatButtonDisabled:{
    color: $_.buttonPrimaryDisabled
  }
};
