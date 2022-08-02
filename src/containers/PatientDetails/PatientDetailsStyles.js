
// import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
// import { Dimensions,StatusBar } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
// const { height, width } = Dimensions.get('screen');

// export default {

//   MainContainer: {
//     width:windowWidth,
//     // minHeight:windowHeight,
//     minHeight: '100%',
//     backgroundColor:DefaultSetting.body.bg,
//   },
//   TopNav:{
//     flex:1,
//     flexGrow:10,
//     // borderWidth:1,
//     minHeight:DefaultSetting.topNav.maxHeight,
//     maxHeight:DefaultSetting.topNav.maxHeight,
//     flexDirection:'row',
//     backgroundColor:'#F5F5F5',
//     alignItems:'center',
//     padding:13
//   },
//   topnavtext:{
//       color:'#707070',
//       fontSize:20
//   },
//   Body:{
//     flex:1,
//     flexGrow:0.80,
//     backgroundColor:DefaultSetting.body.bg,
//   },
//   Bottom:{
//     flex:1,
//     flexGrow:0.10,
//     borderColor:'#FFFFFF',
//     backgroundColor:DefaultSetting.body.bg,
//     // borderWidth:1,
//   },
//   paddingClass:{
//     padding:DefaultSetting.defaultPadding.pd,
    
//   },
//   paddingClasses:{
//     paddingTop:10,
//     paddingottom:10,
//     paddingLeft:9,
//   },
//   marginBottomClass:{
//     marginBottom:DefaultSetting.defaultPadding.pd
//   },
//   marginTopBottonClass:{
//     marginTop:DefaultSetting.defaultPadding.pd,
//     marginBottom:DefaultSetting.defaultPadding.pd
//   },
//   TextBold:{
//     fontWeight:DefaultSetting.fontWeight.bold
//   },
//   alertText:{
//     color:DefaultSetting.alert.alertText,
//     fontSize:DefaultSetting.textfontheight.primary
//   },
//   TextHeading:{
//     color:DefaultSetting.textColor.heading,
//     fontSize:DefaultSetting.textfontheight.secondary,
//     fontWeight:DefaultSetting.fontWeight.bold,
//   },
//   TextSubHeading:{
//     color:DefaultSetting.textColor.textplaceholder,
//     fontSize:DefaultSetting.textfontheight.primary
//   },
//   SelectedText:{
//     borderColor:DefaultSetting.textColor.selectedText,
//     color:DefaultSetting.textColor.selectedText
//   },
//   ValidText:{
//     borderColor:DefaultSetting.textColor.selectedText
//   },
//   InvalidTextBorder:{
//     borderColor:DefaultSetting.buttonColor.primary
//   },
//   BorderColorNormal:{
//     borderColor: DefaultSetting.textColor.textplaceholder 
//   },
//   BodyComponentfirst:{
//     flex: 1,
//     flexGrow:0.10,
//     justifyContent:'center',
//     maxHeight:DefaultSetting.defaultHeight.primary,
//     marginBottom:DefaultSetting.defaultPadding.pd,
//     backgroundColor:DefaultSetting.alert.alertBg,
//   },
//   BodyComponentfirstAge:{
//     flex: 1,
//     flexGrow:1,
//   },
//   FlexViewRow:{
//     flexDirection: 'row',
//   },
//   TextInput:{
//     borderWidth:0.15,
//     backgroundColor:DefaultSetting.textColor.textInputbg,
//     maxHeight:DefaultSetting.defaultHeight.primary,
//   },
//   BodyComponentSecond:{
//     flex:1,
//     flexGrow:0.90,
//     // borderWidth:1,
//   },
//   Bodyformbox:{
//     flex:1,
//     flexGrow:0.70,
//     borderWidth:0.15,
//     borderColor: DefaultSetting.textColor.textplaceholder 
//   },
//   Bodyform:{
//     flex:1,
//     flexGrow:0.70,
//   },
//   BorderTop:{
//     borderTopWidth:4,
//   },
//   bottomViewContainer:{
//     flex:1,
//     flexGrow:1,
//     // borderWidth:1,
//   },
//   Button:{
//     maxHeight:DefaultSetting.defaultHeight.primary,
//   },
//   TextSubHeadingmedium: {
//     color: DefaultSetting.textColor.heading,
//     fontSize: 12,
//     fontWeight: DefaultSetting.fontWeight.medium,
//   },
//   errormesasge:{
//     color: "#E5184E",
//   },
//   gender: {
//     bottom: 70,
//     height: height / 10,
//     backgroundColor: '#FFFFFF',
//     width: width / 3,
//     alignSelf: 'flex-end',
//     right: 30,
//     borderWidth: 0.5,
//     borderColor: '#707070',
//     justifyContent: 'space-evenly',
//     paddingHorizontal: 10
    
// },
// genTxt:{
//   fontSize: 18,
//   color: '#707070'
// },

// genderCon :{
//   flexDirection: 'row', 
//   height: height/20,
//   width: width/3.5,
//   backgroundColor: '#FAFAFA',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   padding: 10
//   }

// }

import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';
import { color } from 'react-native-reanimated';

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
    minHeight: DefaultSetting.topNav.maxHeight,
    maxHeight: DefaultSetting.topNav.maxHeight,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 13
  },
  topnavtext: {
    color: '#707070',
    fontSize: 20
  },
  Body: {
    flex: 1,
    flexGrow: 0.80,
    backgroundColor: DefaultSetting.body.bg,
  },
  Bottom: {
    flex: 1,
    flexGrow: 0.10,
    borderColor: '#FFFFFF',
    backgroundColor: DefaultSetting.body.bg,
    // borderWidth:1,
  },
  paddingClass: {
    padding: DefaultSetting.defaultPadding.pd,

  },
  paddingClasses: {
    paddingTop: 10,
    paddingottom: 10,
    paddingLeft: 9,
  },
  marginBottomClass: {
    marginBottom: DefaultSetting.defaultPadding.pd
  },
  marginTopBottonClass: {
    marginTop: DefaultSetting.defaultPadding.pd,
    marginBottom: DefaultSetting.defaultPadding.pd
  },
  TextBold: {
    fontWeight: DefaultSetting.fontWeight.bold
  },
  alertText: {
    color: DefaultSetting.alert.alertText,
    fontSize: DefaultSetting.textfontheight.primary
  },
  TextHeading: {
    color: DefaultSetting.textColor.heading,
    fontSize: DefaultSetting.textfontheight.secondary,
    fontWeight: DefaultSetting.fontWeight.bold,
  },
  TextSubHeading: {
    color: DefaultSetting.textColor.textplaceholder,
    fontSize: DefaultSetting.textfontheight.primary
  },
  SelectedText: {
    borderColor: DefaultSetting.textColor.selectedText,
    color: DefaultSetting.textColor.selectedText
  },
  ValidText: {
    borderColor: DefaultSetting.textColor.selectedText
  },
  InvalidTextBorder: {
    borderColor: DefaultSetting.buttonColor.primary
  },
  BorderColorNormal: {
    borderColor: DefaultSetting.textColor.textplaceholder
  },
  BodyComponentfirst: {
    flex: 1,
    flexGrow: 0.10,
    justifyContent: 'center',
    maxHeight: DefaultSetting.defaultHeight.primary,
    marginBottom: DefaultSetting.defaultPadding.pd,
    backgroundColor: DefaultSetting.alert.alertBg,
  },
  BodyComponentfirstAge: {
    flex: 1,
    flexGrow: 1,
  },
  FlexViewRow: {
    flexDirection: 'row',
  },
  TextInput: {
    color: DefaultSetting.textColor.heading,
    fontSize: 12,
    fontWeight: DefaultSetting.fontWeight.medium,
    height: height / 20,
    width: width / 1.2,    
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.15,
    borderColor: '#707070',
    backgroundColor: DefaultSetting.textColor.textInputbg,
    // maxHeight:DefaultSetting.defaultHeight.primary,
  },
  ipField:{
    // backgroundColor: 'cyan',
    width: width / 1.4,
    paddingHorizontal: 10,
    color: "#707070",
    fontSize: 12,
    alignItems: 'center',
    justifyContent: 'center'
},
numCon:{
  height: height / 25,
  // backgroundColor: 'red',
  width: width / 8,
  alignItems: 'center',
  justifyContent: 'center',
  borderRightWidth: 0.5
},
  indTxt: {
    color: '#A2A2A2',
    fontFamily: 'Jost-SemiBold',
    fontSize: 12
    
  },
  BodyComponentSecond: {
    flex: 1,
    flexGrow: 0.90,
    // borderWidth:1,
  },
  Bodyformbox: {
    flex: 1,
    flexGrow: 0.70,
    borderWidth: 0.15,
    borderColor: DefaultSetting.textColor.textplaceholder
  },
  Bodyform: {
    flex: 1,
    flexGrow: 0.70,
  },
  BorderTop: {
    borderTopWidth: 4,
  },
  bottomViewContainer: {
    flex: 1,
    flexGrow: 1,
    // borderWidth:1,
  },
  Button: {
    maxHeight: DefaultSetting.defaultHeight.primary,
  },
  TextSubHeadingmedium: {
    color: DefaultSetting.textColor.heading,
    fontSize: 12,
    fontWeight: DefaultSetting.fontWeight.medium,
  },
  errormesasge: {
    color: "#E5184E",
  },
  gender: {
    bottom: 70,
    height: height / 10,
    backgroundColor: '#FFFFFF',
    width: width / 3,
    alignSelf: 'flex-end',
    right: 30,
    borderWidth: 0.5,
    borderColor: '#707070',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10

  },
  genTxt: {
    fontSize: 18,
    color: '#707070'
  },

  genderCon: {
    flexDirection: 'row',
    height: height / 20,
    width: width / 3.5,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  }

}