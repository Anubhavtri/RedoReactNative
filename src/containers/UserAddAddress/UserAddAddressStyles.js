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
  errormesasge:{
    color: "#E5184E",
  }
}

