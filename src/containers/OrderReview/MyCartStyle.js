

import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { height, width } = Dimensions.get('screen')
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
    padding: 13
  },
  topnavtext: {
    color: '#707070',
    fontSize: 20,
    fontWeight: DefaultSetting.fontWeight.bold
  },
  cutprice: {
    fontSize: 12, color: '#E5184E', fontWeight: '500', textDecorationLine: 'line-through', marginLeft: 15
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
    // backgroundColor:'red'
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
    fontSize: 14, color: '#205072', fontWeight: DefaultSetting.fontWeight.bold,
    marginHorizontal: 10, 
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
    borderBottomWidth: 1, borderColor: '#A2A2A2', borderTopWidth: 1, paddingVertical: 8, marginVertical: 8
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
  AddTest: {
    borderColor: '#A2A2A2',
    borderWidth: 1,
    minHeight: 40,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    paddingVertical: 13,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  package: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10
  },
  couponsection: {
    // backgroundColor:'cyan',
    borderColor: '#A2A2A2',
    borderWidth: 1,
    minHeight: 50,
    maxHeight: 70,
    borderRadius: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8

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

  // modal view styling
  centeredView: {
    height: height / 1,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000014'
  },
  modalView: {
    height: height / 3.3,
    width: width / 1.3,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  modalCon: {
    height: height / 17,
    width: width / 1.5,
    //  backgroundColor: 'cyan',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  txtDirect: {
    height: height / 22,
    width: width / 2.7,
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  txt: {
    color: '#E5184E',
    fontSize: width / 30,
    fontWeight: '500'
  },
  txts: {
    color: '#707070',
  },
  txtPrice: {
    height: height / 30,
    width: width / 1.3,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fix: {
    color: '#707070',
    fontWeight: '700'
  },
  savingCon: {
    height: height / 25,
    width: width / 1.3,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center'
  },
  savingTxt: {
    color: '#707070',
    fontSize: 12,
    fontWeight: '500'
  },
  redCon: {
    height: height / 28,
    width: width / 2.5,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  redTxt: {
    color: '#707070',
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  applyCon: {
    height: height / 12,
    width: width / 1.1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  applyTxt: {
    color: '#47CACC',
    fontSize: 15,
    fontWeight: '500'
  },
  inputCon: {
    height: height / 9,
    width: width / 1,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green'
  },
  inputCons: {
    height: height / 20,
    width: width / 1.2,
    borderWidth: 0.3,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#707070',
    alignItems: 'center',
    // backgroundColor:'green',
    marginRight: '8%'
  },
  inputField: {
    height: height / 20,
    width: width / 1.5,
    // backgroundColor: 'cyan',
    color: '#707070'
  },
  inputTxt: {
    color: '#E5184E',
    fontSize: 14,
    // fontFamily: "Cochin"
  },
  listCon: {
    // backgroundColor:  'blue',
    height: height / 12,
    width: width / 1.1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  listTxt: {
    color: '#707070',
    fontSize: 14,
  },
  discountCon: {
    // height: height / 8,
    // width: width / 1.1,
    width: '100%',
    borderBottomWidth: 0.1,
    borderTopWidth: 0.2,
    borderColor: '#707070',
    alignSelf: 'center',
    // backgroundColor:'pink',
  },
  discountContan: {
    height: height / 8,
    width: width / 1.1,
    borderBottomWidth: 0.1,
    borderTopWidth: 0.2,
    borderColor: '#707070',
    alignSelf: 'center',
    // backgroundColor:'green',
    marginTop: 10,
    marginBottom: 10
  },
  discountCons: {
    height: height / 15,
    width: width / 1.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 10,
    alignItems: 'center',
    // backgroundColor:'red'
  },
  discountTxt: {
    color: '#707070',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
  },
  appTxt: {
    color: '#E5184E',
    fontSize: 15,
    fontWeight: '500',

  },
  codeCon: {
    height: height / 15,
    width: width / 1.1,
    padding: 10,

  },
  codeTxt: {
    color: '#707070',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // testing
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },



  //Delete View

  centeredViews: {
    height: height / 1.1,
    width: width / 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00000014'
  },
  modalsCon: {
    height: height / 3.2,
    width: width / 1.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  pointCon: {
    // backgroundColor: 'cyan',
    height: height / 15,
    width: width / 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.2
  },


  reportCon: {
    height: height / 25,
    width: width / 1.6,
    // backgroundColor: '#FFEFE9',
    flexDirection: 'row',
    alignItems: 'center',

  },
  reportTxt: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Jost-Medium',
    paddingHorizontal: 5
  },
  packCon: {
    //  backgroundColor: 'cyan',
    height: height / 20,
    width: width / 1.2,
    justifyContent: 'center',
    //  alignItems: 'center',
    paddingHorizontal: 30,
  },
  packTxt: {
    color: '#707070',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
  packCons: {
    // backgroundColor: 'cyan',
    height: height / 25,
    width: width / 1.2,
    // justifyContent: 'center',
    //  alignItems: 'center',
    paddingHorizontal: 30,
    borderBottomWidth: 0.2

  },
  packTxts: {
    color: '#0E3F6C',
    fontSize: 12,
    fontFamily: 'Jost-SemiBold',
  },
  quesCon: {
    // backgroundColor: 'cyan',
    height: height / 15,
    width: width / 1.2,
    justifyContent: 'center',
    //  alignItems: 'center',
    paddingHorizontal: 30,
  },
  quesTxt: {
    color: '#000000',
    fontFamily: 'Jost-Medium',
    fontSize: 14
  },
  btnCon: {
    // backgroundColor: 'cyan',
    height: height / 15,
    width: width / 1.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  }
}