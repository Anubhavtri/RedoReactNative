


import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { height, width } = Dimensions.get('screen')
export default {

  MainContainer: {
    width: windowWidth,
    minHeight: '100%',
    backgroundColor: DefaultSetting.body.bg,
  },
  TopNav: {
    flex: 1,
    flexGrow: 10,
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
  },
  paddingClass: {
    padding: DefaultSetting.defaultPadding.pd
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
    borderWidth: 0.15,
    backgroundColor: DefaultSetting.textColor.textInputbg,
    maxHeight: DefaultSetting.defaultHeight.primary,
  },
  BodyComponentSecond: {
    flex: 1,
    flexGrow: 0.90,
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
  },
  Button: {
    maxHeight: DefaultSetting.defaultHeight.primary,
  },
  imagesection: {
    justifyContentL: 'center',
    alignItems: 'center',
  },
  errormesasge: {
    color: "#E5184E",
  },
  Con: {
    right: 13,
  },

  genderCon: {
    flexDirection: 'row',
    height: height / 20,
    width: width / 3.5,
    backgroundColor: '#FAFAFA',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7,
    top: 7
  },
  txtCons: {
    height: height / 9,
    width: width / 2,
    justifyContent: 'space-evenly',

  },
  headTxt: {
    // color:'#707070',
    fontSize: 10,
    fontWeight: '500'
  },
  gender: {
    bottom: 70,
    height: height / 10,
    backgroundColor: '#FFFFFF',
    width: width / 3,
    alignSelf: 'flex-end',
    right: 70,
    borderWidth: 0.5,
    borderColor: '#707070',
    justifyContent: 'space-evenly'
  },
  genTxt: {
    fontSize: 18,
    color: '#707070',
    paddingHorizontal: 10
  },
}