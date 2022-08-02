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
    minHeight: 120,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    padding: 13
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


  // modal styling 

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    // backgroundColor: "#2196F3",
    marginLeft:'80%'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop:10,
    marginBottom: 15,
    textAlign: "center",
    color:'#47CACC',
    fontSize:20

  },
  paylatercontainer:{
    // backgroundColor:'yellow',
    alignItems:'center',
  }

}
