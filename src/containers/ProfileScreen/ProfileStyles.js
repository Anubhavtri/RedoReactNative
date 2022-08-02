import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    fontSize: 12, color: '#E5184E', fontWeight: '500',textDecorationLine:'line-through', marginLeft: 15
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
    marginHorizontal: 15
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
  //   new styling 
  userdetail:{
    // minHeight: 70,
    // marginBottom: 10,
    // marginBottom: 60,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    paddingHorizontal:13,
    // backgroundColor:'red'
  },
  first: {
    borderColor: '#A2A2A2',
    borderWidth: 1,
    minHeight: 70,
    marginTop: 10,
    // marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    // paddingHorizontal: 13,
    // backgroundColor: 'green'
  },
  rowsection:{
    // height:height/25,
    // marginBottom:35,
    flexDirection:'row',
    // backgroundColor:'yellow',
    // minHeight:70,
    // flex:1,
    alignItems:'center',
    padding:10,
  },
  row:{
    flexDirection:'row',
    minHeight:40,
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#A2A2A2',
    padding:13,
  },
  logoutsection:{
    flexDirection:'row',
    minHeight:40,
    alignItems:'center',
    padding:13,
    marginTop:'25%'
  },
  firstsection:{
    minWidth:'20%',
    // backgroundColor:'green',
  },
  secondsection:{
    minWidth:'60%',
    // backgroundColor:'pink',
  },
  thirdsection:{
    minWidth:'20%',
    // backgroundColor:'red',
    // flexDirection:'row-reverse'
    justifyContent:'center',
    alignItems:'center'
  },
  logout:{
    backgroundColor:'#E5184E',
    justifyContent:'center',
    alignItems:'center',
    minHeight:40,
    borderRadius:5
  },
  logtext:{
    color:'#ffffff',
    fontSize:20
  },
  text:{
    color:'#A2A2A2',
    fontSize:17
  },
  optiontext:{
    color:'#6E6E6E',
    fontSize:17
  }
}
