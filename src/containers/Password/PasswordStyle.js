import $primary from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions } from 'react-native';
const {height, width}=Dimensions.get('screen')

export default {
    container:{
      
      minHeight:'100%',
    },
    mainContainer: {
      backgroundColor: '#FFFFFF',
      height: height / 1,
      width: width / 1,
  
    },
    maindiv:{
      backgroundColor:'white',
      // flex:1,
      height: height/1,
      width: width/1
    },
    topnav:{
      backgroundColor:'#F5F5F5',
      flex:1,
      minHeight:'10%',
      maxHeight:'10%',
      padding:'5%',
    },
    section:{
      // height:height/10,
      // width:width/1.2,
      // backgroundColor:'blue',
      flex:1,
      maxHeight:'35%',
      padding:'5%',
    },
    head:{
      // backgroundColor:'green',
      flex:1,
      flexDirection:'row',
      alignItems:'center',
    },
    otpCon:{
        height: height/15,
        width: width/1.1,
        // backgroundColor:'lightgreen',
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    row:{
      // backgroundColor:'green', 
      flex:1,
      flexGrow:1.2,
      // justifyContent:'center',
    },
    icon:{
      fontSize:24,
    },
    navheading:{
      fontSize:20,
      marginLeft:'5%',
    },
    subheading:{
      fontSize:17,
      color:'#707070',
      fontWeight: "bold",
    },
    inputsection:{
      flexDirection:'row',
      // backgroundColor:'red',
      flex:1,
      flexGrow:1.5,
      // alignItems:'center'
    },
    unputsubsection:{
      flexDirection:'row',
      // backgroundColor:'pink',
      flex:1,
      flexGrow:1,
      flexGrow:1.5,
      // alignItems:'center',
      // borderColor:'#A2A2A2',
      // borderWidth:0.2,
      borderRadius:5,
      maxHeight:45,
      
    },
    country:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      // backgroundColor:'yellow',
      maxHeight:45,
    },
    inputfield:{
      flex:1,
      flexGrow:5,
      maxHeight:45,
      justifyContent:'center',
    },
    input:{
      justifyContent:'center',
      fontSize:14,
      // color:'#A2A2A2',
      borderWidth:0,
      maxHeight:33,
      // backgroundColor:'green'
    },
    text:{
      fontSize:14,
      color:'#A2A2A2',
    },
    terms:{
      fontSize:14,
      color:'#484848',
      textDecorationLine: 'underline',
      fontWeight: "bold",
    },
    buttonActive:{
      backgroundColor:'#E5184E',
      flex:0.2,
      maxHeight:45,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
    },
    buttonInactive:{
      backgroundColor:'#A2A2A2',
      flex:0.2,
      maxHeight:45,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5,
    },
    buttontext:{
      color:'#FFFFFF', 
      fontSize:17,
    },
    error:{
      fontSize:14,
      color:'#E5184E',
    },
    condition:{
      // backgroundColor:'yellow',
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    borderStyleBase: {
      width: 30,
      height: 45,
    },
   
    borderStyleHighLighted: {
      borderColor: "#03DAC6",
    },
   
    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
    },
   
    underlineStyleHighLighted: {
      borderColor: "#03DAC6",
    },
    cell: {
      
      width: 50,
      height: 50,
      lineHeight: 50,
      fontSize: 24,
      borderWidth: 0.5,
      borderColor: '#A2A2A2',
      textAlign: 'center',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#F5F5F5',
      borderRadius:9,
    },
    wrongcell:{
      width: 50,
      height: 50,
      lineHeight: 42,
      fontSize: 24,
      borderWidth: 0.5,
      borderColor: '#E5184E',
      textAlign: 'center',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#F5F5F5',
      borderRadius:5,
    },
    focusCell: {
      borderColor: '#000',
    },
    newsection:{
      flexDirection:'row',
      justifyContent:"space-between",
      // backgroundColor:'green',
    },
    resendotp:{
      flex:1,
      flexDirection:'row',
      justifyContent:"space-between",
      // backgroundColor:'green',
      paddingLeft:'7%',

    },
    resend:{
      fontSize:14,
      color:'#659AC9',
    },
    codeCon: {
      height: height / 5,
      width: width / 1.1,
      // backgroundColor: 'green',
      alignSelf: 'center',
    },
    otpCons:{
      height: height / 15,
      justifyContent: 'center',
      // backgroundColor: 'cyan'
    },
    getotpCon:{
      height: height/18,
      width: width/1.1,
      // backgroundColor: 'cyan',
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    topContainer: {
      height: height / 12,
      width: width / 1,
      backgroundColor: '#F5F5F5',
      justifyContent: 'flex-end'
    },
    headerCon: {
      height: height / 12,
      width: width / 1.1,
      // backgroundColor: 'red',
      // justifyContent: 'space-evenly',
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center'
  
    },
    loginTxt: {
      fontSize: 18,
      // fontWeight: 'bold',
      fontFamily: 'Jost-Medium',
      paddingHorizontal: 15
    },
    ipCon: {
      height: height / 7.5,
      width: width / 1,
      // backgroundColor: 'red',
  
    },
    txtCon: {
      height: height / 25,
      width: width / 1.1,
      // backgroundColor: 'blue',
      alignSelf: 'center',
      
    },
    txtCons: {
      height: height / 25,
      width: width / 1.1,
      // backgroundColor: 'blue',
      alignSelf: 'center',
      // justifyContent: 'center'
    },
    txtPass: {
      fontSize: 17,
      color: '#707070',
      fontFamily: 'Jost-Medium'
    },
    fieldCon: {
      height: height / 19,
      width: width / 1.1,
      // backgroundColor: 'blue',
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 13,
      borderWidth: 0.5,
      borderRadius: 5,
      borderColor: '#A2A2A2',
  
  
    },
    ipField: {
      height: height / 20,
      width: width / 1.35,
      // backgroundColor: 'lightblue',
      fontSize: 15,
      color: '#A2A2A2',
      fontFamily: 'Jost-Regular'
    },
    spaceCon: {
      height: height / 12,
      width: width / 1,
      // backgroundColor: 'lightblue',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    btnCon: {
      height: height / 20,
      width: width / 1.1,
      backgroundColor: '#A2A2A2',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnCons: {
      height: height / 20,
      width: width / 1.1,
      backgroundColor: '#E5184E',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnTxt: {
  
  
      fontSize: 17,
      color: '#FFFFFF',
      fontFamily: 'Jost-Medium'
    },
    redCon: {
      height: height * 0.02,
      width: width / 1.15,
      // paddingHorizontal: 10
      // backgroundColor: 'cyan',
      alignSelf: 'center'
    },
    redTxt: {
      color: 'red',
      fontSize: 13,
    },
    scrollCon:{
      height: height/1,
      width:width/1,
    }
}