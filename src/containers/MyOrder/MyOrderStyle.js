// import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
// import { Dimensions, StatusBar } from 'react-native';

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
  
//   const {height, width}=Dimensions.get('window')
// export default {

//   MainContainer: {
//     height: height/1,
//     width: width/1,
//     backgroundColor: DefaultSetting.body.bg,
//   },
//   TopNav: {
//     height: height/10,
//     width: width/1,
//     flexDirection: 'row',
//     backgroundColor: '#F5F5F5',
//     alignItems: 'center',
//     padding: 13
//   },
//   topnavtext: {
//     color: '#707070',
//     fontSize: 20,
//     fontWeight: DefaultSetting.fontWeight.bold
//   },
//   cutprice: {
//     fontSize: 12, 
//     color: '#E5184E', 
//     fontWeight: '500',
//     textDecorationLine:'line-through', 
//     marginLeft: 15
//   },
//   offerPrice: {
//     fontSize: 14, color: '#205072', marginLeft: '5%',
//     fontWeight: DefaultSetting.fontWeight.bold, marginLeft: 8
//   },
//   offerpercent: {
//     backgroundColor: '#47CACC', borderRadius: 5, paddingHorizontal: 8,
//     marginRight: 15, paddingVertical: 6
//   },
//   Body: {
//     flex: 1,
//     flexGrow: 80,
//     backgroundColor: DefaultSetting.body.bg,
//   },
//   Bottom: {
//     flex: 1,
//     flexGrow: 5,
//     borderColor: '#FFFFFF',
//     backgroundColor: DefaultSetting.body.bg,
//     backgroundColor:'red'
//     // borderWidth:1,
//   },

//   paddingClass: {
//     padding: DefaultSetting.defaultPadding.pd
//   },


//   alertText: {
//     color: DefaultSetting.alert.alertText,
//     fontSize: DefaultSetting.textfontheight.primary
//   },
//   alertTextone: {
//     color: '#659AC9',
//     fontSize: DefaultSetting.textfontheight.primary
//   },
//   TextHeading: {
//     color: DefaultSetting.textColor.heading,
//     fontSize: 14,
//     fontWeight: DefaultSetting.fontWeight.medium,
//   },
//   TextSubHeading: {
//     color: DefaultSetting.textColor.heading,
//     fontSize: 12,
//     fontWeight: DefaultSetting.fontWeight.regular,
//   },
//   TextSubHeadingmedium: {
//     color: DefaultSetting.textColor.heading,
//     fontSize: 12,
//     fontWeight: DefaultSetting.fontWeight.medium,
//   },
//   LightText: {
//     color: '#A2A2A2',
//     fontSize: 12,
//   },
//   SelectedText: {
//     color: DefaultSetting.textColor.selectedText
//   },
//   ValidText: {
//     borderColor: DefaultSetting.textColor.selectedText
//   },
//   InvalidTextBorder: {
//     borderColor: DefaultSetting.buttonColor.primary
//   },
//   BorderColorNormal: {
//     borderColor: DefaultSetting.textColor.textplaceholder
//   },
//   TimeblueText: {
//     color: "#47CACC",
//     fontSize: 14,
//     fontWeight: DefaultSetting.fontWeight.medium,
//   },
//   packageNameCard: {
//     fontSize: 14, 
//     color: '#205072', 
//     fontWeight: DefaultSetting.fontWeight.bold,
//     marginHorizontal: 15,
//     maxWidth: '70%'
//   },
//   BodyComponentfirst: {
//     flex: 1,
//     flexGrow: 0.10,
//     justifyContent: 'center',
//     maxHeight: DefaultSetting.defaultHeight.primary,
//     marginBottom: DefaultSetting.defaultPadding.pd,
//     backgroundColor: DefaultSetting.alert.alertBg,
//   },
//   BodyComponentfirstone: {
//     flex: 1,
//     flexGrow: 0.10,
//     justifyContent: 'center',
//     maxHeight: DefaultSetting.defaultHeight.primary,
//     marginBottom: DefaultSetting.defaultPadding.pd,
//     backgroundColor: "#ECF6FF",
//   },
//   BodyComponentfirstAge: {
//     flex: 1,
//     flexGrow: 1,
//   },
//   pckgBorderline: {
//     borderBottomWidth: 1, borderColor: '#A2A2A2', borderTopWidth: 1,paddingVertical:8,marginVertical:8
//   },
//   FlexViewRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly'
//   },
//   TextInput: {
//     borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
//     backgroundColor: DefaultSetting.textColor.textInputbg,
//     maxHeight: DefaultSetting.defaultHeight.primary,
//   },
//   BodyComponentSecond: {
//     flex: 1,
//     flexGrow: 0.90,
//     // borderWidth:1,
//   },
//   Bodyformbox: {
//     flex: 1,
//     flexGrow: 0.70,
//     borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
//     borderColor: DefaultSetting.textColor.textplaceholder
//   },
//   Bodyform: {
//     flex: 1,
//     flexGrow: 0.70,
//   },
//   BorderTop: {
//     borderTopWidth: 4,
//   },
//   bottomViewContainer: {
//     flex: 1,
//     flexGrow: 1,
//     // flexDirection:'row',
//     // justifyContent: 'space-evenly'
//     // borderWidth:1,
//   },
//   // testing

//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // justifyContent: 'center',
//     // borderColor:'red',
//     // borderWidth:1,
//     minHeight: 100
//   },

//   card: {
//     flexGrow: 1,
//     // alignItems: 'center',
//     // backgroundColor:'blue',
//     justifyContent: 'center',
//     minHeight: 30,
//   },
//   heading: {
//     fontSize: 14,
//     // fontWeight: '900',
//     // textTransform: 'uppercase',
//     // letterSpacing: -2,
//     color: '#707070',
//     minHeight: 30
//   },
//   body: {
//     fontSize: 12,
//     lineHeight: 20 * 1.5,
//     // textAlign: 'center',
//     color: '#707070'
//   },
//   subCategoriesList: {
//     // marginTop: 20,
//   },
//   suggestcardtext: {
//     fontSize: 12,
//     color: '#707070'
//   },



//   //   new styling 
//   first: {
//     borderColor: '#A2A2A2',
//     borderWidth: 1,
//     minHeight: 70,
//     marginTop: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     justifyContent: 'space-evenly',
//     padding: 13
//   },
//   AddTest:{
//     borderColor: '#A2A2A2',
//     borderWidth: 1,
//     minHeight: 40,
//     marginTop: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     justifyContent: 'space-evenly',
//     paddingVertical: 13
//   },
//   row: {
//     // flexDirection: 'row',
//     // justifyContent: 'space-between'
//   },
//   package: {
//     marginTop: 10,
//     marginBottom: 10,
//     borderColor: '#A2A2A2',
//     borderWidth: 1,
//     // minHeight:180,
//     borderRadius: 5,
//     // justifyContent:'space-evenly',
//     paddingVertical: 10
//   },
//   couponsection: {

//     borderColor: '#A2A2A2',
//     borderWidth: 1,
//     minHeight: 50,
//     maxHeight: 70,
//     borderRadius: 5,
//     paddingHorizontal: 15,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   address: {
//     minWidth: 150,
//     maxWidth: 250,
//     minHeight: 80,
//     paddingVertical: 10
//   },
//   editsection: {
//     flexDirection: 'column-reverse',
//     minHeight: 80,
//     paddingVertical: 13
//   },
//   Options:{
//     flex:1,
//     flexGrow:5,
//     borderColor:'#70707052',
//     borderWidth:1,
//     flexDirection:'row',
//     justifyContent:'space-evenly',
//     alignItems:'center',
//     // backgroundColor:'red'
//   },
//   option:{
//     color:'#E5184E',
//     borderBottomColor:'#E5184E',
//     borderBottomWidth:1,
//     paddingVertical:5,
//     minHeight:20
//   },
//   rowsection:{
//     height: height/20,
//     width: width/1.15,
//     alignSelf: 'center',
//     justifyContent:'center',
//     // alignItems:'center',
//     // backgroundColor: 'cyan'
//   },
//   btnStyle:{
//     width: width / 1.15,
//     // backgroundColor: 'cyan',
//     height: height/10,
//     flexDirection: 'row',
//     alignSelf: 'center',
//     justifyContent: 'space-evenly',
//     alignItems: 'center'
// },
//   trackbutton:{
//     backgroundColor:'#E5184E',
//     height: height/23,
//     width: width/4,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
    
//   },
//   trackbuttons:{
//     backgroundColor:'#FFFFFF',
//     height: height/22,
//     width: width/3,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     borderColor:'#707070',
//     borderWidth: 0.5
//   },
//   trackbuttones:{
//     backgroundColor:'#E5184E',
//     height: height/22,
//     width: width/3,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     borderColor:'#707070',
//     borderWidth: 0.5
//   },
//   txtBtn:{
//     fontSize: 14,
//     color: '#707070',
//     fontFamily: 'Jost-SemiBold'
// },
//   buttontext:{
//       fontSize:14,
//       color:'#ffffff',
//       fontFamily: 'Jost-SemiBold'
//   },
//   downloadbutton:{
//     height: height/23, 
//     // backgroundColor:'pink',
//     width: width/3,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor:'#E5184E',
//     borderWidth:1,
//     borderRadius:5,
//     bottom:15
//   },
//   downloadtext:{
//     color:'#E5184E',
//     fontSize: 13,
//     fontFamily: 'Jost-SemiBold'
//   },
//   txtStyle:{
//     fontSize: 12,
//     color:'#A2A2A2',
//     fontFamily: 'Jost-Regular'
// },
// txtStyles:{
//   fontSize: 12,
//   color:'#A2A2A2',
//   fontFamily: 'Jost-Regular',
//   paddingHorizontal: 10
// },
// txtValue:{
//   fontSize: 12,
//   color: '#707070',
//   fontFamily: 'Jost-SemiBold', 
//   paddingHorizontal: 7,
//   minWidth:10
// },
// secCons: {
//   height: height/28,
//   // minHeight:0,
//   width: width/1.15,
//   // backgroundColor: 'lightblue',
//   flexDirection: 'row',
//   alignItems: 'center',
//   alignSelf: 'center',
//   marginTop: 10
// },
// secCon: {
//   height: height/28,
//   width: width/1.15,
//   flexDirection: 'row',
//   alignItems: 'center',
//   alignSelf: 'center',
//   // backgroundColor:'cyan'
// },
// nameCon: {
//   // height: height/10,
//   width: width/1.15,
//   // flexDirection: 'row',
//   // alignItems: 'center',
//   alignSelf: 'center',
//   // backgroundColor:'cyan'
// },
// upcomingTxt:{
//   fontSize: 14,
//   color: '#0E3F6C',
//   fontWeight: '700'
// },
// box:{
//   // backgroundColor: 'blue',
//   marginBottom: 30,
//   borderWidth: 0.5,
//   borderColor: '#A7A7A7',
//   borderRadius: 5,
//   paddingBottom: 10

// },
// boxCon:{
//   height: height / 2.5,
//   width: width / 1.05,
//   //  backgroundColor: 'yellow',
//   //  justifyContent: 'center',
//   borderBottomWidth: 0.5,
//   color: '#A7A7A7'
// },
// allCon:{
//   height: height / 20,
//   width: width / 1.15,
//   // backgroundColor: 'yellow',
//   alignSelf: 'center',
//   justifyContent: 'space-between',
//   flexDirection: 'row',
//   alignItems: 'center'
// },
// allTxt:{
//   color: '#31CCB0',
//   fontSize: 14,
//   fontFamily: 'Jost-Medium',
// },
// packCon:{
//   height: height / 9.5,
//   width: width / 1.1,
//   // backgroundColor: 'blue',
//   marginTop: 7,
//   alignSelf: 'center',
//   borderWidth: 0.5,
//   borderRadius: 5,
//   borderColor: '#A7A7A7',
//   flexDirection: 'row',
//   // justifyContent: 'center'
//   alignItems: 'center'
// },
// packsCon:{
//   height: height / 20,
//   width: width / 1.65,
//   // backgroundColor: 'cyan',
//   justifyContent: 'center'
// },
// packTxt:{
//   fontSize: 14,
//   color: '#205072',
//   fontFamily: 'Jost-Bold',
//   paddingHorizontal: 10
// },
// bookCon:{
//   height: height / 30,
//   width: width / 1.65,
//   // backgroundColor: 'cyan',
//   flexDirection: 'row',
//   alignItems: 'center'
// },
// headCon:{
//   // height: height/1,
//   marginBottom: 30,
//   borderWidth: 0.5,
//   borderColor: '#A7A7A7',
//   borderRadius: 5,
//   // backgroundColor: 'cyan',
//   paddingBottom: 10
// },
// headsCon:{
//   height: height / 2.5,
//   width: width / 1.05,
//   // backgroundColor: 'yellow',
//   //  justifyContent: 'center',
//   borderBottomWidth: 0.5,
//   borderColor: '#A7A7A7'
// },
// paidTxt:{
//   fontSize: 17,
//   color: '#31CCB0',
//   fontFamily: 'Jost-SemiBold',
//   paddingHorizontal: 10
// },
// unpaidTxt:{
//   fontSize: 17,
//   color: '#E5184E',
//   fontFamily: 'Jost-SemiBold',
//   paddingHorizontal: 10
// },
// Other:{
//   height: height / 20,
//   width: width / 1.15,
//   // backgroundColor: 'yellow',
//   alignSelf: 'center',
//   justifyContent: 'space-between',
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginTop: 5
// },
// otherTxt:{
//   color: '#31CCB0',
//   fontSize: 14,
//   fontFamily: 'Jost-Medium',
// },
// pdCon:{
//   height: height / 9.5,
//   width: width / 1.15,
//   // backgroundColor: 'blue',
//   marginTop: 7,
//   alignSelf: 'center',
//   borderWidth: 0.5,
//   borderRadius: 5,
//   borderColor: '#A7A7A7',
//   flexDirection: 'row',
//   // justifyContent: 'center'
//   alignItems: 'center'
// },
// pdHead:{
//   height: height / 20,
//   width: width / 1.7,
//   // backgroundColor: 'cyan',
//   justifyContent: 'center'
// },
// pdTxt:{
//   fontSize: 14,
//   color: '#205072',
//   fontFamily: 'Jost-Bold',
//   paddingHorizontal: 10
// },
// idBook:{
//   height: height / 30,
//   width: width / 1.7,
//   // backgroundColor: 'cyan',
//   flexDirection: 'row',
//   alignItems: 'center'
// },
// txtValues:{
//     height: height/20,
//     width: width/1.55,
//     fontSize: 12,
//     color: '#707070',
//     fontFamily: 'Jost-SemiBold', 
//     padding: 10,
//     // backgroundColor: 'lightblue'
//   },

// nameCons:{
//   flexDirection: 'row',
//   backgroundColor: 'yellow',
//   width: width/1.15,
//   height: height/20,
//   alignItems: 'center'

// },
// arrowSty:{
//   fontSize:15,
//   color: '#31CCB0'
// }
// }


import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  
  const {height, width}=Dimensions.get('window')
export default {

  MainContainer: {
    height: height/1,
    width: width/1,
    backgroundColor: DefaultSetting.body.bg,
  },
  TopNav: {
    height: height/10,
    width: width/1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 13
  },
  topnavtext: {
    color: '#707070',
    fontSize: 20,
    fontWeight: DefaultSetting.fontWeight.bold
  },
  cutprice: {
    fontSize: 12, 
    color: '#E5184E', 
    fontWeight: '500',
    textDecorationLine:'line-through', 
    marginLeft: 15
  },
  offerPrice: {
    fontSize: 14, color: '#205072', marginLeft: '5%',
    fontWeight: DefaultSetting.fontWeight.bold, marginLeft: 8
  },
  offerpercent: {
    backgroundColor: '#47CACC', borderRadius: 5, paddingHorizontal: 8,
    marginRight: 15, paddingVertical: 6
  },
  Body: {
    flex: 1,
    flexGrow: 80,
    backgroundColor: DefaultSetting.body.bg,
  },
  Bottom: {
    flex: 1,
    flexGrow: 5,
    borderColor: '#FFFFFF',
    backgroundColor: DefaultSetting.body.bg,
    backgroundColor:'red'
    // borderWidth:1,
  },

  paddingClass: {
    padding: DefaultSetting.defaultPadding.pd
  },


  alertText: {
    color: DefaultSetting.alert.alertText,
    fontSize: DefaultSetting.textfontheight.primary
  },
  alertTextone: {
    color: '#659AC9',
    fontSize: DefaultSetting.textfontheight.primary
  },
  TextHeading: {
    color: DefaultSetting.textColor.heading,
    fontSize: 14,
    fontWeight: DefaultSetting.fontWeight.medium,
  },
  TextSubHeading: {
    color: DefaultSetting.textColor.heading,
    fontSize: 12,
    fontWeight: DefaultSetting.fontWeight.regular,
  },
  TextSubHeadingmedium: {
    color: DefaultSetting.textColor.heading,
    fontSize: 12,
    fontWeight: DefaultSetting.fontWeight.medium,
  },
  LightText: {
    color: '#A2A2A2',
    fontSize: 12,
  },
  SelectedText: {
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
  TimeblueText: {
    color: "#47CACC",
    fontSize: 14,
    fontWeight: DefaultSetting.fontWeight.medium,
  },
  packageNameCard: {
    fontSize: 14, 
    color: '#205072', 
    fontWeight: DefaultSetting.fontWeight.bold,
    marginHorizontal: 15,
    maxWidth: '70%'
  },
  BodyComponentfirst: {
    flex: 1,
    flexGrow: 0.10,
    justifyContent: 'center',
    maxHeight: DefaultSetting.defaultHeight.primary,
    marginBottom: DefaultSetting.defaultPadding.pd,
    backgroundColor: DefaultSetting.alert.alertBg,
  },
  BodyComponentfirstone: {
    flex: 1,
    flexGrow: 0.10,
    justifyContent: 'center',
    maxHeight: DefaultSetting.defaultHeight.primary,
    marginBottom: DefaultSetting.defaultPadding.pd,
    backgroundColor: "#ECF6FF",
  },
  BodyComponentfirstAge: {
    flex: 1,
    flexGrow: 1,
  },
  pckgBorderline: {
    borderBottomWidth: 1, borderColor: '#A2A2A2', borderTopWidth: 1,paddingVertical:8,marginVertical:8
  },
  FlexViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  TextInput: {
    borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
    backgroundColor: DefaultSetting.textColor.textInputbg,
    maxHeight: DefaultSetting.defaultHeight.primary,
  },
  BodyComponentSecond: {
    flex: 1,
    flexGrow: 0.90,
    // borderWidth:1,
  },
  Bodyformbox: {
    flex: 1,
    flexGrow: 0.70,
    borderWidth: DefaultSetting.defaultBorderWidth.TextInputbrwidth,
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
    // flexDirection:'row',
    // justifyContent: 'space-evenly'
    // borderWidth:1,
  },
  // testing

  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // borderColor:'red',
    // borderWidth:1,
    minHeight: 100
  },

  card: {
    flexGrow: 1,
    // alignItems: 'center',
    // backgroundColor:'blue',
    justifyContent: 'center',
    minHeight: 30,
  },
  heading: {
    fontSize: 14,
    // fontWeight: '900',
    // textTransform: 'uppercase',
    // letterSpacing: -2,
    color: '#707070',
    minHeight: 30
  },
  body: {
    fontSize: 12,
    lineHeight: 20 * 1.5,
    // textAlign: 'center',
    color: '#707070'
  },
  subCategoriesList: {
    // marginTop: 20,
  },
  suggestcardtext: {
    fontSize: 12,
    color: '#707070'
  },



  //   new styling 
  first: {
    borderColor: '#A2A2A2',
    borderWidth: 1,
    minHeight: 70,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    padding: 13
  },
  AddTest:{
    borderColor: '#A2A2A2',
    borderWidth: 1,
    minHeight: 40,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    paddingVertical: 13
  },
  row: {
    // height: height/10,
    // backgroundColor: 'yellow'
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  package: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    // minHeight:180,
    borderRadius: 5,
    // justifyContent:'space-evenly',
    paddingVertical: 10
  },
  couponsection: {

    borderColor: '#A2A2A2',
    borderWidth: 1,
    minHeight: 50,
    maxHeight: 70,
    borderRadius: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  address: {
    minWidth: 150,
    maxWidth: 250,
    minHeight: 80,
    paddingVertical: 10
  },
  editsection: {
    flexDirection: 'column-reverse',
    minHeight: 80,
    paddingVertical: 13
  },
  Options:{
    flex:1,
    flexGrow:5,
    borderColor:'#70707052',
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    // backgroundColor:'red'
  },
  option:{
    color:'#E5184E',
    borderBottomColor:'#E5184E',
    borderBottomWidth:1,
    paddingVertical:5,
    minHeight:20
  },
  rowsection:{
    // height: height/17,
    // width: width/1.15,
    // alignSelf: 'center',
    justifyContent:'center',
    // alignItems:'center',
    // backgroundColor: 'cyan'
  },
  btnStyle:{
    width: width / 1.15,
    // backgroundColor: 'cyan',
    height: height/10,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center'
},
  trackbutton:{
    backgroundColor:'#E5184E',
    height: height/23,
    width: width/4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    
  },
  trackbuttons:{
    backgroundColor:'#FFFFFF',
    height: height/22,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor:'#707070',
    borderWidth: 0.5
  },
  trackbuttones:{
    backgroundColor:'#E5184E',
    height: height/22,
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor:'#707070',
    borderWidth: 0.5
  },
  txtBtn:{
    fontSize: 14,
    color: '#707070',
    fontFamily: 'Jost-SemiBold'
},
  buttontext:{
      fontSize:14,
      color:'#ffffff',
      fontFamily: 'Jost-SemiBold'
  },
  downloadbutton:{
    height: height/23, 
    // backgroundColor:'pink',
    width: width/3,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'#E5184E',
    borderWidth:1,
    borderRadius:5,
  },
  downloadtext:{
    color:'#E5184E',
    fontSize: 13,
    fontFamily: 'Jost-SemiBold'
  },
  txtStyle:{
    fontSize: 12,
    color:'#A2A2A2',
    fontFamily: 'Jost-Regular'
},
txtStyles:{
  fontSize: 12,
  color:'#A2A2A2',
  fontFamily: 'Jost-Regular',
  paddingHorizontal: 10
},
txtValue:{
  fontSize: 12,
  color: '#707070',
  fontFamily: 'Jost-SemiBold', 
  paddingHorizontal: 7,
  minWidth:10
},
secCons: {
  height: height/28,
  // minHeight:0,
  width: width/1.15,
  // backgroundColor: 'lightblue',
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 10
},
secCon: {
  height: height/28,
  width: width/1.15,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  // backgroundColor:'cyan'
},
nameCon: {
  height: height/10,
  width: width/1.15,
  // flexDirection: 'row',
  // alignItems: 'center',
  alignSelf: 'center',
  // backgroundColor:'lightblue'
},
upcomingTxt:{
  fontSize: 14,
  color: '#0E3F6C',
  fontWeight: '700'
},
box:{
  // backgroundColor: 'blue',
  marginBottom: 30,
  borderWidth: 0.5,
  borderColor: '#A7A7A7',
  borderRadius: 5,
  paddingBottom: 10

},
boxCon:{
  // height: height / 2.5,
  width: width / 1.05,
  //  backgroundColor: 'yellow',
  //  justifyContent: 'center',
  borderBottomWidth: 0.5,
  color: '#A7A7A7'
},
allCon:{
  height: height / 20,
  width: width / 1.15,
  // backgroundColor: 'yellow',
  alignSelf: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center'
},
allTxt:{
  color: '#31CCB0',
  fontSize: 14,
  fontFamily: 'Jost-Medium',
},
packCon:{
  height: height / 9.5,
  width: width / 1.1,
  // backgroundColor: 'blue',
  marginTop: 7,
  alignSelf: 'center',
  borderWidth: 0.5,
  borderRadius: 5,
  borderColor: '#A7A7A7',
  flexDirection: 'row',
  // justifyContent: 'center'
  alignItems: 'center'
},
packsCon:{
  height: height / 20,
  width: width / 1.65,
  // backgroundColor: 'cyan',
  justifyContent: 'center'
},
packTxt:{
  fontSize: 14,
  color: '#205072',
  fontFamily: 'Jost-Bold',
  paddingHorizontal: 10
},
bookCon:{
  height: height / 30,
  width: width / 1.65,
  // backgroundColor: 'cyan',
  flexDirection: 'row',
  alignItems: 'center'
},
headCon:{
  // height: height/1,
  marginBottom: 30,
  borderWidth: 0.5,
  borderColor: '#A7A7A7',
  borderRadius: 5,
  // backgroundColor: 'cyan',
  paddingBottom: 10
},
headsCon:{
  height: height / 2.5,
  width: width / 1.05,
  // backgroundColor: 'yellow',
  //  justifyContent: 'center',
  borderBottomWidth: 0.5,
  borderColor: '#A7A7A7'
},
paidTxt:{
  fontSize: 17,
  color: '#31CCB0',
  fontFamily: 'Jost-SemiBold',
  paddingHorizontal: 10
},
unpaidTxt:{
  fontSize: 17,
  color: '#E5184E',
  fontFamily: 'Jost-SemiBold',
  paddingHorizontal: 10
},
Other:{
  height: height / 20,
  width: width / 1.15,
  // backgroundColor: 'yellow',
  alignSelf: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5
},
otherTxt:{
  color: '#31CCB0',
  fontSize: 14,
  fontFamily: 'Jost-Medium',
},
pdCon:{
  height: height / 9.5,
  width: width / 1.15,
  // backgroundColor: 'blue',
  marginTop: 7,
  alignSelf: 'center',
  borderWidth: 0.5,
  borderRadius: 5,
  borderColor: '#A7A7A7',
  flexDirection: 'row',
  // justifyContent: 'center'
  alignItems: 'center'
},
pdHead:{
  height: height / 20,
  width: width / 1.7,
  // backgroundColor: 'cyan',
  justifyContent: 'center'
},
pdTxt:{
  fontSize: 14,
  color: '#205072',
  fontFamily: 'Jost-Bold',
  paddingHorizontal: 10
},
idBook:{
  height: height / 30,
  width: width / 1.7,
  // backgroundColor: 'cyan',
  flexDirection: 'row',
  alignItems: 'center'
},
txtValues:{
    height: height/20,
    width: width/1.55,
    fontSize: 12,
    color: '#707070',
    fontFamily: 'Jost-SemiBold', 
    padding: 10,
    // backgroundColor: 'lightblue'
  },

nameCons:{
  flexDirection: 'row',
  // backgroundColor: 'yellow',
  width: width/1.9,
  height: height/22,
  alignItems: 'center'

},
arrowSty:{
  fontSize:15,
  color: '#31CCB0'
}
}


