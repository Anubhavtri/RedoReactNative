// import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
// import { Dimensions } from 'react-native';
// import Constants from '../../staticData/Constants';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const { height, width } = Dimensions.get('window')
// export default {
//   MainContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   TopContainer: {
//     padding: DefaultSetting.defaultPadding.pd,

//   },
//   Body: {
//     flex: 1,
//     flexGrow: 0.8,
//     // borderColor: 'red',
//     // borderWidth: 1,

//   },
//   BodyContainer: {
//     flex: 1,
//     flexGrow: 1,
//     borderWidth: 1,
//     backgroundColor: 'green'
//   },
//   TextHeading: {
//     fontSize: DefaultSetting.textfontheight.primaryHeader,
//     color: DefaultSetting.textColor.primaryTextColor,
//   },
//   cityHeading: {
//     paddingTop: 48,
//     fontSize: DefaultSetting.textfontheight.primaryHeader,
//     color: DefaultSetting.textColor.heading,
//     paddingBottom: 2,
//   },
//   currentLocationStyle: [
//     {
//       fontSize: DefaultSetting.textfontheight.primaryHeader,
//     },
//     Constants.fontType.jMedium,
//   ],
//   marginBottomClass: {
//     marginBottom: DefaultSetting.defaultPadding.pd,
//   },
//   marginTopBottomClass: {
//     marginBottom: DefaultSetting.defaultPadding.pd,
//     marginTop: DefaultSetting.defaultPadding.pd,
//   },
//   TextSubHeading: {
//     fontSize: DefaultSetting.textfontheight._14,
//     color: DefaultSetting.textColor.heading,
//   },
//   SelectedText: {
//     color: DefaultSetting.textColor.selectedText,
//   },
//   flexViewRowsEnterPin: {
//     flex: 1,
//     flexGrow: 1,
//     flexDirection: 'row',
//     borderWidth: 0.5,
//     borderRadius: 5,
//     borderColor: '#A2A2A2',
//     justifyContent: 'space-between',
//   },
//   flexViewRows: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   InputText: {
//     flex: 1,
//     flexGrow: 1,
//   },
//   EnterPincode: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   MaxHeightBox: {
//     maxHeight: 50,
//   },
//   borderColorNormal: {
//     borderColor: DefaultSetting.textColor.textplaceholder,
//   },
//   proceedText: {
//     flex: 1,
//     flexGrow: 0.2,
//     minWidth: 28,
//     color: DefaultSetting.alert.alertText,
//   },
//   fontWeightBold: {
//     fontWeight: DefaultSetting.fontWeight.bold,
//   },
//   BodyContainerBottom: {
//     flex: 1,
//     flexGrow: 0.93,
//     // borderWidth:1,
//     // borderColor:'green'
//   },
//   BodyContainerTop: {
//     flex: 1,
//     flexGrow: 0.07,
//     // borderWidth:1,
//     // borderColor:'red',
//     justifycontent: 'center',
//     alignItems: 'center',
//   },
//   ImageCss: {
//     flex: 1,
//     flexGrow: 0.1,
//     // width: '64%',
//     resizeMode: 'stretch',
//     minHeight: 38,
//     maxHeight: 36,
//     // borderWidth:1,
//     // borderColor:'pink',
//   },
//   UseCurrentLocations: {
//     flex: 1,
//     flexGrow: 0.9,
//     // borderWidth:1,
//     // borderColor:'pink',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   paddingAll: {
//     padding: DefaultSetting.defaultPadding.pd,
//   },
//   paddingTopandBottom: {
//     paddingTop: DefaultSetting.defaultPadding.pd,
//     paddingBottom: DefaultSetting.defaultPadding.pd,
//   },
//   CityList: {
//     flex: 1,
//     // borderWidth: 0.5,
//     borderColor: '#A2A2A2',
//     marginHorizontal: 1,
//   },
//   citytext: {
//     color: '#659AC9'
//   },
//   locCon: {
//     height: height / 20,
//     // backgroundColor: 'cyan'
//   },
//   dirLoc:{
//     height: height/20,
//     width: width/1.1,
//     // backgroundColor: 'red',
//     alignSelf: 'center',
//     flexDirection: 'row',
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   btnCons: {
//     backgroundColor: '#E5184E',
//     height: height / 25,
//     width: width / 3.8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     shadowOpacity: 5
//   },
//   btnTxt: {
//     color: '#FFFFFF',
//     fontFamily: 'Jost-Medium',
//     fontSize: 12
//   }
// };


import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions } from 'react-native';
import Constants from '../../staticData/Constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { height, width } = Dimensions.get('window')
export default {
  MainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  TopContainer: {
    padding: DefaultSetting.defaultPadding.pd,

  },
  Body: {
    flex: 1,
    flexGrow: 0.8,
    // borderColor: 'red',
    // borderWidth: 1,

  },
  BodyContainer: {
    flex: 1,
    flexGrow: 1,
    borderWidth: 1,
    backgroundColor: 'green'
  },
  TextHeading: {
    fontSize: DefaultSetting.textfontheight.primaryHeader,
    color: DefaultSetting.textColor.primaryTextColor,
  },
  cityHeading: {
    paddingTop: 48,
    fontSize: DefaultSetting.textfontheight.primaryHeader,
    color: DefaultSetting.textColor.heading,
    paddingBottom: 2,
  },
  currentLocationStyle: [
    {
      fontSize: DefaultSetting.textfontheight.primaryHeader,
    },
    Constants.fontType.jMedium,
  ],
  marginBottomClass: {
    marginBottom: DefaultSetting.defaultPadding.pd,
  },
  marginTopBottomClass: {
    marginBottom: DefaultSetting.defaultPadding.pd,
    marginTop: DefaultSetting.defaultPadding.pd,
  },
  TextSubHeading: {
    fontSize: DefaultSetting.textfontheight._14,
    color: DefaultSetting.textColor.heading,
  },
  SelectedText: {
    color: DefaultSetting.textColor.selectedText,
  },
  flexViewRowsEnterPin: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#A2A2A2',
    justifyContent: 'space-between',
  },
  flexViewRows: {
    flex: 1,
    flexDirection: 'row',
  },
  InputText: {
    flex: 1,
    flexGrow: 1,
  },
  EnterPincode: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MaxHeightBox: {
    maxHeight: 50,
  },
  borderColorNormal: {
    borderColor: DefaultSetting.textColor.textplaceholder,
  },
  proceedText: {
    flex: 1,
    flexGrow: 0.2,
    minWidth: 28,
    color: DefaultSetting.alert.alertText,
  },
  fontWeightBold: {
    fontWeight: DefaultSetting.fontWeight.bold,
  },
  BodyContainerBottom: {
    flex: 1,
    flexGrow: 0.93,
    // borderWidth:1,
    // borderColor:'green'
  },
  BodyContainerTop: {
    flex: 1,
    flexGrow: 0.07,
    // borderWidth:1,
    // borderColor:'red',
    justifycontent: 'center',
    alignItems: 'center',
  },
  ImageCss: {
    flex: 1,
    flexGrow: 0.1,
    // width: '64%',
    resizeMode: 'stretch',
    minHeight: 38,
    maxHeight: 36,
    // borderWidth:1,
    // borderColor:'pink',
  },
  UseCurrentLocations: {
    flex: 1,
    flexGrow: 0.9,
    // borderWidth:1,
    // borderColor:'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingAll: {
    padding: DefaultSetting.defaultPadding.pd,
  },
  paddingTopandBottom: {
    paddingTop: DefaultSetting.defaultPadding.pd,
    paddingBottom: DefaultSetting.defaultPadding.pd,
  },
  CityList: {
    flex: 1,
    // borderWidth: 0.5,
    borderColor: '#A2A2A2',
    marginHorizontal: 1,
  },
  citytext: {
    color: '#659AC9'
  },
  locCon: {
    height: height / 20,
    // backgroundColor: 'cyan'
  },
  dirLoc:{
    height: height/20,
    width: width/1.1,
    // backgroundColor: 'red',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnCons: {
    backgroundColor: '#E5184E',
    height: height / 25,
    width: width / 3.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOpacity: 5
  },
  btnTxt: {
    color: '#FFFFFF',
    fontFamily: 'Jost-Medium',
    fontSize: 12
  },
  locStyle:{
    // color: '#A2A2A2',
    fontSize: 16,
    fontFamily: 'Jost-Medium',
    paddingHorizontal: 10
  },
  ctCon:{
    flexDirection: 'row',
    alignItems: 'center',
    width: width/2,
    // backgroundColor: 'cyan'
  }
};