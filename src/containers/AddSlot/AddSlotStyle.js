import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import {Dimensions, StatusBar} from 'react-native';
import Constants from '../../staticData/Constants';

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
    // paddingVertical: ,
  },
  appointmentContainerStyle: {
    height: 200,
    backgroundColor: DefaultSetting.body.bg,
    borderWidth: 0.5,
    borderColor: '#A2A2A2',
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 5,
  },
  selectedDateItem: {
    flexDirection: 'row',
    backgroundColor: '#47CACC',
    height: 35,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 6,
    paddingHorizontal: 2,
    marginVertical: 5,
  },
  unSelectedDateItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 35,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginHorizontal: 6,
    paddingHorizontal: 2,
    borderColor: '#A2A2A2',
    borderWidth: 0.2,
    marginVertical: 5,
  },

  selectedDateText: [
    {
      flexDirection: 'row',
    },

    Constants.fontType.jMedium,
  ],

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
  intro: {
    minHeight: 260,
    // borderColor:'red',
    // borderWidth:2,
    // backgroundColor:'green',
    marginBottom: 13,
  },
  introheading: {
    minHeight: 50,
    // backgroundColor:'yellow',
    justifyContent: 'center',
    borderBottomColor: '#70707052',
    borderBottomWidth: 0.8,
  },
  packname: {
    fontSize: 24,
    color: '#E5184E',
    fontWeight: 'bold',
  },
  param: {
    minHeight: 100,
    //   backgroundColor:'blue',
    justifyContent: 'center',
  },
  suggestrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'blue',
    minHeight: 80,
  },
  suggestcard: {
    // backgroundColor:'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 60,
    marginTop: 13,
    marginBottom: 13,
    paddingHorizontal: 13,
    borderColor: '#70707052',
    borderWidth: 1,
    borderRadius: 5,
    minWidth: 170,
    maxWidth: 180,
  },
  innertext: {
    color: '#E5184E',
  },
  paramtext: {
    fontSize: 12,
    color: '#707070',
    paddingTop: 13,
    paddingBottom: 7,
  },
  suggest: {
    minHeight: 100,
    // backgroundColor:'yellow',
    justifyContent: 'center',
  },
  subheading: {
    fontSize: 14,
    color: '#E5184E',
    marginBottom: 7,
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
    justifyContent: 'space-evenly',
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
    // flexDirection:'row',
    justifyContent: 'space-evenly',
    // borderWidth:1,
  },
  Button: {
    maxHeight: DefaultSetting.defaultHeight.primary,
  },

  // testing

  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    // borderColor:'red',
    // borderWidth:1,
    minHeight: 100,
  },
  cardContainer: {
    flexGrow: 1,
    // borderColor:'blue',
    // borderWidth:1,
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
    minHeight: 30,
    fontWeight: 'bold',
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
  },

  //   new styling
  first: {
    borderColor: '#A2A2A2',
    borderWidth: 0.8,
    minHeight: 120,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    // justifyContent:'space-evenly',
    padding: 13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  package: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    minHeight: 180,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    padding: 13,
  },
  couponsection: {
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    minHeight: 50,
    maxHeight: 70,
    borderRadius: 5,
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    minWidth: 150,
    maxWidth: 250,
    // backgroundColor:'yellow',
    minHeight: 80,
    paddingVertical: 13,
  },
  editsection: {
    flexDirection: 'column-reverse',
    minHeight: 80,
    paddingVertical: 13,
  },
  timeslotsheading: {
    minHeight: 30,
  },
  timeslotes: {
    minHeight: 50,
    flexDirection: 'row',
    // backgroundColor:'yellow',
    borderBottomColor: '#A2A2A2',
    borderBottomWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeslot: {
    fontSize: 14,
    color: '#A2A2A2',
  },
};

