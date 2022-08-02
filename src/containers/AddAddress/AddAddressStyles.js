import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions,StatusBar } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {

  MainContainer: {
    width:windowWidth,
    // minHeight:windowHeight,
    minHeight: '100%',
    backgroundColor:DefaultSetting.body.bg,
  },
  TopNav:{
    flex:1,
    flexGrow:10,
    // borderWidth:1,
    maxHeight:DefaultSetting.topNav.maxHeight,
    flexDirection:'row',
    backgroundColor:'#F5F5F5',
    alignItems:'center',
    padding:13
  },
  topnavtext:{
      color:'#707070',
      fontSize:20
  },
  Body:{
    flex:1,
    flexGrow:0.80,
    backgroundColor:DefaultSetting.body.bg,
  },
  Bottom:{
    flex:1,
    flexGrow:0.10,
    borderColor:'#FFFFFF',
    backgroundColor:DefaultSetting.body.bg,
    // borderWidth:1,
  },
  paddingClass:{
    padding:DefaultSetting.defaultPadding.pd
  },
  marginBottomClass:{
    marginBottom:DefaultSetting.defaultPadding.pd
  },
  marginTopBottonClass:{
    marginTop:DefaultSetting.defaultPadding.pd,
    marginBottom:DefaultSetting.defaultPadding.pd
  },
  TextBold:{
    fontWeight:DefaultSetting.fontWeight.bold
  },
  alertText:{
    color:DefaultSetting.alert.alertText,
    fontSize:DefaultSetting.textfontheight.primary
  },
  TextHeading:{
    color:DefaultSetting.textColor.heading,
    fontSize:DefaultSetting.textfontheight.secondary,
    fontWeight:DefaultSetting.fontWeight.bold,
  },
  TextSubHeading:{
    color:DefaultSetting.textColor.textplaceholder,
    fontSize:DefaultSetting.textfontheight.primary
  },
  SelectedText:{
    borderColor:DefaultSetting.textColor.selectedText,
    color:DefaultSetting.textColor.selectedText
  },
  ValidText:{
    borderColor:DefaultSetting.textColor.selectedText
  },
  InvalidTextBorder:{
    borderColor:DefaultSetting.buttonColor.primary
  },
  BorderColorNormal:{
    borderColor: DefaultSetting.textColor.textplaceholder 
  },
  BodyComponentfirst:{
    flex: 1,
    flexGrow:0.10,
    justifyContent:'center',
    maxHeight:DefaultSetting.defaultHeight.primary,
    marginBottom:DefaultSetting.defaultPadding.pd,
    backgroundColor:DefaultSetting.alert.alertBg,
  },
  BodyComponentfirstAge:{
    flex: 1,
    flexGrow:1,
  },
  FlexViewRow:{
    flexDirection: 'row',
  },
  TextInput:{
    borderWidth:0.15,
    backgroundColor:DefaultSetting.textColor.textInputbg,
    maxHeight:DefaultSetting.defaultHeight.primary,
  },
  BodyComponentSecond:{
    flex:1,
    flexGrow:0.90,
    // borderWidth:1,
  },
  Bodyformbox:{
    flex:1,
    flexGrow:0.90,
    borderWidth:0.15,
    borderColor: DefaultSetting.textColor.textplaceholder 
  },
  Bodyform:{
    flex:1,
    flexGrow:0.70,
  },
  BorderTop:{
    borderTopWidth:4,
  },
  bottomViewContainer:{
    flex:1,
    flexGrow:1,
  },
  SaveButton:{
    flex:1,
    flexGrow:0.10,
    justifyContent: 'center',
  },
  Button:{
    maxHeight:DefaultSetting.defaultHeight.primary,
  },
  paddingTopandBottom:{
    paddingTop:DefaultSetting.defaultPadding.pd,
    paddingBottom:DefaultSetting.defaultPadding.pd,
  },
  Checkbox:{
    maxHieght:DefaultSetting.defaultHeight.primary
  },
  AddressField:{
    flex:1,
    flexGrow:1,
    borderWidth:1,
  },
  CustomerName:{
    flex:1,
    flexGrow:1,
    borderWidth:1,
  },
  EditProfileButtonView:{
    flex:1,
    flexGrow:1,
    borderWidth:1,
  },
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
    marginTop:10,
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
    minHeight: 80,
    paddingVertical: 13,
    // backgroundColor:'yellow',
    minWidth:'30%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
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
      minWidth:'50%',
      maxWidth:'60%',
    //   borderWidth:1,
      // justifyContent:'center',
  },
  trackbutton:{
    backgroundColor:'#E5184E',
    maxWidth:'70%',
    marginLeft:'10%',
    // alignItems:'center',
    justifyContent:'center',
    alignItems:'center',
    minHeight:40,
    borderRadius:5,
  },
  buttontext:{
      fontSize:14,
      color:'#ffffff'
  },
  downloadbutton:{
    borderColor:'#E5184E',
    borderWidth:1,
    maxWidth:'80%',
    marginLeft:'30%',
    justifyContent:'center',
    alignItems:'center',
    minHeight:40,
    borderRadius:5,
  },
  downloadtext:{
    color:'#E5184E'
  },
  packageNameCard: {
    fontSize: 14, color: '#205072', fontWeight: DefaultSetting.fontWeight.bold,
    marginHorizontal: 15,
  },
}

