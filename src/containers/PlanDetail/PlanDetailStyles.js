// import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
// import { Dimensions, StatusBar } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const { height, width } = Dimensions.get('screen');
// export default {
//   MainContainer: {
//     width: windowWidth,
//     // minHeight:windowHeight,
//     minHeight: '100%',
//     backgroundColor: DefaultSetting.body.bg,
//   },
//   TopNav: {
//     flex: 1,
//     flexGrow: 10,
//     // borderWidth:1,
//     maxHeight: DefaultSetting.topNav.maxHeight,
//     flexDirection: 'row',
//     backgroundColor: '#F5F5F5',
//     alignItems: 'center',
//     padding: 13,
//   },
//   topnavtext: {
//     color: '#707070',
//     fontSize: 20,
//   },
//   Options: {
//     flex: 1,
//     flexGrow: 5,
//     borderColor: '#70707052',
//     borderWidth: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     // backgroundColor:'red'
//   },
//   option: {
//     color: '#E5184E',
//     borderBottomColor: '#E5184E',
//     borderBottomWidth: 1,
//     paddingVertical: 5,
//     minHeight: 20,
//   },
//   Body: {
//     flex: 1,
//     flexGrow: 80,
//     backgroundColor: DefaultSetting.body.bg,
//   },
//   Bottom: {
//     flex: 1,
//     flexGrow: 5,
//     borderColor: '#0000000D',
//     backgroundColor: DefaultSetting.body.bg,
//     // backgroundColor:'red'
//     // borderWidth:1,
//   },
//   intro: {
//     minHeight: 260,
//     // borderColor:'red',
//     // borderWidth:2,
//     // backgroundColor:'green',
//     marginBottom: 13,
//   },
//   introheading: {
//     // backgroundColor:'yellow',
//     justifyContent: 'center',
//     borderBottomColor: '#70707052',
//     borderBottomWidth: 0.8,
//     paddingBottom: 10,
//   },
//   packname: {
//     fontSize: 24,
//     color: '#E5184E',
//     paddingTop: 20,
//   },
//   param: {
//     minHeight: 100,
//     //   backgroundColor:'blue',
//     justifyContent: 'center',
//   },
//   suggestrow: {
//     flexDirection: 'row',
//     paddingBottom: 12,
//     // backgroundColor:'blue',
//     // minHeight: 80,
//   },
//   suggestcard: {
//     // backgroundColor:'yellow',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // marginTop: 13,
//     // marginBottom: 13,
//     paddingHorizontal: 13,
//     borderColor: '#70707052',
//     borderWidth: 1,
//     borderRadius: 5,
//     minWidth: '40%',
//     maxWidth: '55%',
//     marginRight: 15,
//   },
//   innertext: {
//     color: '#E5184E',
//     paddingVertical: 11,
//   },
//   inclusionText: {
//     fontSize: 14,
//     paddingTop: 10,
//   },
//   paramtext: {
//     fontSize: 12,
//     color: '#707070',
//     paddingTop: 6,
//     paddingBottom: 7,
//   },
//   suggest: {
//     minHeight: 100,
//     // backgroundColor:'yellow',
//     justifyContent: 'center',
//   },
//   subheading: {
//     top:3,
//     fontSize: 14,
//     color: '#E5184E',
//     marginBottom: 7,
//     // backgroundColor: 'lightblue',

//   },
//   qncard: {
//     borderColor: '#70707052',
//     borderWidth: 1,
//     padding: 13,
//     borderRadius: 5,
//     marginTop: 13,
//     marginTop: 7,
//     marginBottom: 7,
//   },
//   q: {
//     fontSize: 14,
//     color: '#707070',
//     marginTop: 7,
//     marginBottom: 7,
//   },
//   a: {
//     fontSize: 12,
//     color: '#707070',
//     marginTop: 7,
//     marginBottom: 7,
//   },
//   paddingClass: {
//     padding: DefaultSetting.defaultPadding.pd,
//   },
//   marginBottomClass: {
//     marginBottom: DefaultSetting.defaultPadding.pd,
//   },
//   marginTopBottonClass: {
//     marginTop: DefaultSetting.defaultPadding.pd,
//     marginBottom: DefaultSetting.defaultPadding.pd,
//   },
//   TextBold: {
//     fontWeight: DefaultSetting.fontWeight.bold,
//   },
//   alertText: {
//     color: DefaultSetting.alert.alertText,
//     fontSize: DefaultSetting.textfontheight.primary,
//   },
//   alertTextone: {
//     color: '#659AC9',
//     fontSize: DefaultSetting.textfontheight.primary,
//   },
//   TextHeading: {
//     color: DefaultSetting.textColor.heading,
//     fontSize: DefaultSetting.textfontheight.secondary,
//     fontWeight: DefaultSetting.fontWeight.bold,
//   },
//   TextSubHeading: {
//     color: DefaultSetting.textColor.textplaceholder,
//     fontSize: DefaultSetting.textfontheight.primary,
//   },
//   SelectedText: {
//     color: DefaultSetting.textColor.selectedText,
//   },
//   ValidText: {
//     borderColor: DefaultSetting.textColor.selectedText,
//   },
//   InvalidTextBorder: {
//     borderColor: DefaultSetting.buttonColor.primary,
//   },
//   BorderColorNormal: {
//     borderColor: DefaultSetting.textColor.textplaceholder,
//   },
//   BodyComponentfirst: {
//     flex: 1,
//     flexGrow: 0.1,
//     justifyContent: 'center',
//     maxHeight: DefaultSetting.defaultHeight.primary,
//     marginBottom: DefaultSetting.defaultPadding.pd,
//     backgroundColor: DefaultSetting.alert.alertBg,
//   },
//   BodyComponentfirstone: {
//     flex: 1,
//     flexGrow: 0.1,
//     justifyContent: 'center',
//     maxHeight: DefaultSetting.defaultHeight.primary,
//     marginBottom: DefaultSetting.defaultPadding.pd,
//     backgroundColor: '#ECF6FF',
//   },
//   BodyComponentfirstAge: {
//     flex: 1,
//     flexGrow: 1,
//   },
//   FlexViewRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   TextInput: {
//     borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
//     backgroundColor: DefaultSetting.textColor.textInputbg,
//     maxHeight: DefaultSetting.defaultHeight.primary,
//   },
//   BodyComponentSecond: {
//     flex: 1,
//     flexGrow: 0.9,
//     // borderWidth:1,
//   },
//   Bodyformbox: {
//     flex: 1,
//     flexGrow: 0.7,
//     marginBottom: 20,
//     borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
//     borderColor: DefaultSetting.textColor.textplaceholder,
    
//   },
//   Bodyform: {
//     flex: 1,
//     flexGrow: 0.7,
//   },
//   BorderTop: {
//     borderTopWidth: 4,
//   },
//   bottomViewContainer: {
//     flex: 1,
//     flexGrow: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
   
//   },
//   Button: {
//     maxHeight: DefaultSetting.defaultHeight.primary,
//   },

//   // testing

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     minHeight: 100,
//   },
//   cardContainer: {
//     flexGrow: 1,
   
//   },
//   card: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     minHeight: 30,
//   },
//   heading: {
//     fontSize: 14,
//     color: '#707070',
//     minHeight: 30,
//   },
//   body: {
//     fontSize: 12,
//     lineHeight: 20 * 1.5,
//     // textAlign: 'center',
//     color: '#707070',
//   },
//   subCategoriesList: {
//     // marginTop: 20,
//   },
//   suggestcardtext: {
//     fontSize: 12,
//     color: '#707070',
//     paddingVertical: 11,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   Bodyformboxs: {
//     flex: 1,
//     flexGrow: 0.7,
//     // borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
//     borderColor: DefaultSetting.textColor.textplaceholder,
//     borderTopWidth: 0.5,
//     borderBottomWidth: 0.5,
    
//   },
//   txtVal: {
//     color: '#707070',
//     fontSize: 12,
//     // backgroundColor: 'red',
//     paddingBottom: 5
//   },
//   qStyle:{
//     color: '#707070', 
//     top: 5,
//      width: width/1.25,
//     //  backgroundColor: 'cyan'
//   },
//   arrowSty: {
//     top: 5,
//     fontSize: 18,
//     color: '#707070'
//   },
//   txtHead: {
//     height: height / 30,
//     // backgroundColor: 'green',
//     top: 5
//   },
//   hideContent:{ 
//     paddingTop: 10,
//     //  paddingBottom: 5
//      }
// };

import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { height, width } = Dimensions.get('screen');
export default {
  MainContainer: {
    width: windowWidth,
    // minHeight:windowHeight,
    minHeight: '100%',
    backgroundColor: DefaultSetting.body.bg,
  },
  TopNav: {
    flex: 1,
    flexGrow: 10,
    // borderWidth:1,
    maxHeight: DefaultSetting.topNav.maxHeight,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 13,
  },
  topnavtext: {
    color: '#707070',
    fontSize: 20,
  },
  Options: {
    flex: 1,
    flexGrow: 5,
    borderColor: '#70707052',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  option: {
    color: '#E5184E',
    borderBottomColor: '#E5184E',
    borderBottomWidth: 1,
    paddingVertical: 5,
    minHeight: 20,
  },
  Body: {
    flex: 1,
    flexGrow: 80,
    backgroundColor: DefaultSetting.body.bg,
  },
  Bottom: {
    flex: 1,
    flexGrow: 5,
    borderColor: '#0000000D',
    backgroundColor: DefaultSetting.body.bg,
    // backgroundColor:'red'
    // borderWidth:1,
  },
  intro: {
    minHeight: 260,
    // borderColor:'red',
    // borderWidth:2,
    // backgroundColor:'green',
    marginBottom: 13,
  },
  introheading: {
    // backgroundColor:'yellow',
    justifyContent: 'center',
    borderBottomColor: '#70707052',
    borderBottomWidth: 0.8,
    paddingBottom: 10,
  },
  packname: {
    fontSize: 24,
    color: '#E5184E',
    paddingTop: 20,
  },
  param: {
    minHeight: 100,
    //   backgroundColor:'blue',
    justifyContent: 'center',
  },
  suggestrow: {
    flexDirection: 'row',
    paddingBottom: 12,
    // backgroundColor:'blue',
    // minHeight: 80,
  },
  suggestcard: {
    // backgroundColor:'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 13,
    // marginBottom: 13,
    paddingHorizontal: 13,
    borderColor: '#70707052',
    borderWidth: 1,
    borderRadius: 5,
    minWidth: '40%',
    maxWidth: '55%',
    marginRight: 15,
  },
  innertext: {
    color: '#E5184E',
    paddingVertical: 11,
  },
  inclusionText: {
    fontSize: 14,
    paddingTop: 10,
  },
  paramtext: {
    fontSize: 12,
    color: '#707070',
    paddingTop: 6,
    paddingBottom: 7,
  },
  suggest: {
    minHeight: 100,
    // backgroundColor:'yellow',
    justifyContent: 'center',
  },
  subheading: {
    top:3,
    fontSize: 14,
    color: '#E5184E',
    marginBottom: 7,
    // backgroundColor: 'lightblue',

  },
  qncard: {
    borderColor: '#70707052',
    borderWidth: 1,
    padding: 13,
    borderRadius: 5,
    marginTop: 13,
    marginTop: 7,
    marginBottom: 7,
  },
  q: {
    fontSize: 14,
    color: '#707070',
    marginTop: 7,
    marginBottom: 7,
  },
  a: {
    fontSize: 12,
    color: '#707070',
    marginTop: 7,
    marginBottom: 7,
  },
  paddingClass: {
    padding: DefaultSetting.defaultPadding.pd,
  },
  marginBottomClass: {
    marginBottom: DefaultSetting.defaultPadding.pd,
  },
  marginTopBottonClass: {
    marginTop: DefaultSetting.defaultPadding.pd,
    marginBottom: DefaultSetting.defaultPadding.pd,
  },
  TextBold: {
    fontWeight: DefaultSetting.fontWeight.bold,
  },
  alertText: {
    color: DefaultSetting.alert.alertText,
    fontSize: DefaultSetting.textfontheight.primary,
  },
  alertTextone: {
    color: '#659AC9',
    fontSize: DefaultSetting.textfontheight.primary,
  },
  TextHeading: {
    color: DefaultSetting.textColor.heading,
    fontSize: DefaultSetting.textfontheight.secondary,
    fontWeight: DefaultSetting.fontWeight.bold,
  },
  TextSubHeading: {
    color: DefaultSetting.textColor.textplaceholder,
    fontSize: DefaultSetting.textfontheight.primary,
  },
  SelectedText: {
    color: DefaultSetting.textColor.selectedText,
  },
  ValidText: {
    borderColor: DefaultSetting.textColor.selectedText,
  },
  InvalidTextBorder: {
    borderColor: DefaultSetting.buttonColor.primary,
  },
  BorderColorNormal: {
    borderColor: DefaultSetting.textColor.textplaceholder,
  },
  BodyComponentfirst: {
    flex: 1,
    flexGrow: 0.1,
    justifyContent: 'center',
    maxHeight: DefaultSetting.defaultHeight.primary,
    marginBottom: DefaultSetting.defaultPadding.pd,
    backgroundColor: DefaultSetting.alert.alertBg,
  },
  BodyComponentfirstone: {
    flex: 1,
    flexGrow: 0.1,
    justifyContent: 'center',
    maxHeight: DefaultSetting.defaultHeight.primary,
    marginBottom: DefaultSetting.defaultPadding.pd,
    backgroundColor: '#ECF6FF',
  },
  BodyComponentfirstAge: {
    flex: 1,
    flexGrow: 1,
  },
  FlexViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  TextInput: {
    borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
    backgroundColor: DefaultSetting.textColor.textInputbg,
    maxHeight: DefaultSetting.defaultHeight.primary,
  },
  BodyComponentSecond: {
    flex: 1,
    flexGrow: 0.9,
    // borderWidth:1,
  },
  Bodyformbox: {
    flex: 1,
    flexGrow: 0.7,
    marginBottom: 20,
    borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
    borderColor: DefaultSetting.textColor.textplaceholder,
    
  },
  Bodyform: {
    flex: 1,
    flexGrow: 0.7,
  },
  BorderTop: {
    borderTopWidth: 4,
  },
  bottomViewContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
   
  },
  Button: {
    maxHeight: DefaultSetting.defaultHeight.primary,
  },

  // testing

  container: {
    flex: 1,
    backgroundColor: '#fff',
    minHeight: 100,
  },
  cardContainer: {
    flexGrow: 1,
   
  },
  card: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: 30,
  },
  heading: {
    fontSize: 14,
    color: '#707070',
    minHeight: 30,
  },
  body: {
    fontSize: 12,
    lineHeight: 20 * 1.5,
    // textAlign: 'center',
    color: '#707070',
  },
  subCategoriesList: {
    // marginTop: 20,
  },
  suggestcardtext: {
    fontSize: 12,
    color: '#707070',
    paddingVertical: 11,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Bodyformboxs: {
    flex: 1,
    flexGrow: 0.7,
    // borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
    borderColor: DefaultSetting.textColor.textplaceholder,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    
  },
  txtVal: {
    color: '#707070',
    fontSize: 12,
    // backgroundColor: 'red',
    paddingBottom: 5,
    paddingHorizontal:5 
  },
  txtVals: {
    color: '#707070',
    fontSize: 11,
  },
  qStyle:{
    color: '#707070', 
    top: 5,
     width: width/1.25,
    //  backgroundColor: 'cyan'
  },
  arrowSty: {
    top: 5,
    fontSize: 18,
    color: '#707070'
  },
  txtHead: {
    height: height / 30,
    // backgroundColor: 'green',
    top: 5
  },
  hideContent:{ 
    paddingTop: 10,
    //  paddingBottom: 5
     }
};