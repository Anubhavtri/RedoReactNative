

import $primary from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen')

export default {
  container: {
    minHeight: '100%',
  },
  maindiv: {

    backgroundColor: 'white',
    // flex:1,
    height: height / 1,
    width: width / 1
  },
  topnav: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    minHeight: '10%',
    maxHeight: '10%',
    padding: '5%',
  },
  section: {
    height: height / 3,
    width: width / 1,
    maxHeight: '35%',
    padding: '5%',
    // backgroundColor: 'cyan'
  },
  sections: {
    bottom: 30,
    height: height / 3,
    width: width / 1,
    maxHeight: '35%',
    padding: '5%',
    // backgroundColor: 'red'
  },
  head: {

    // backgroundColor:'green',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {

    // backgroundColor:'green', 
    flex: 1,
    flexGrow: 1.2,
    // justifyContent:'center',
  },
  icon: {

    fontSize: 24,
  },
  navheading: {

    fontSize: 20,
    marginLeft: '5%',
  },
  subheading: {
    fontSize: 16,
    color: '#707070',
    fontWeight: "bold",
  },
  inputsection: {

    flexDirection: 'row',
    // backgroundColor:'red',
    flex: 1,
    flexGrow: 1.5,
    // alignItems:'center'
  },
  unputsubsection: {

    flexDirection: 'row',
    // backgroundColor:'pink',
    flex: 1,
    flexGrow: 1,
    flexGrow: 1.5,
    // alignItems:'center',
    // borderColor:'#A2A2A2',
    // borderWidth:0.2,
    borderRadius: 5,
    maxHeight: 45,

  },
  country: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'yellow',
    maxHeight: 45,
  },
  inputfield: {

    flex: 1,
    flexGrow: 5,
    maxHeight: 45,
    justifyContent: 'center',
  },
  input: {

    justifyContent: 'center',
    fontSize: 14,
    // color:'#A2A2A2',
    borderWidth: 0,
    maxHeight: 33,
    // backgroundColor:'green'
  },
  text: {

    fontSize: 14,
    color: '#A2A2A2',
  },
  terms: {

    fontSize: 14,
    color: '#484848',
    textDecorationLine: 'underline',
    fontWeight: "bold",
  },
  buttonActive: {

    backgroundColor: '#E5184E',
    flex: 0.2,
    maxHeight: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonInactive: {

    backgroundColor: '#A2A2A2',
    flex: 0.2,
    maxHeight: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttontext: {

    color: '#FFFFFF',
    fontSize: 17,
  },
  error: {

    fontSize: 14,
    color: '#E5184E',
  },
  condition: {

    // backgroundColor:'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 9,
  },
  wrongcell: {

    width: 50,
    height: 50,
    lineHeight: 42,
    fontSize: 24,
    borderWidth: 0.5,
    borderColor: '#E5184E',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  focusCell: {
    borderColor: '#000',
  },
  newsection: {

    flexDirection: 'row',
    justifyContent: "space-between",
    // backgroundColor:'green',
  },
  resendotp: {

    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    // backgroundColor:'green',
    // alignItems:'center',
    paddingLeft: '7%',

  },
  resend: {

    fontSize: 14,
    color: '#659AC9',
  },
  heading: {
width:width/1.1,
// backgroundColor: 'red'


  },
  subhead: {
    height: height / 30,
    width: width / 2,
    fontSize: 17,
    color: '#707070',
    fontFamily: 'Jost-SemiBold',
    //  backgroundColor:'cyan',
  },
  inputsec: {

    flexDirection: 'row',
    height: height / 20,
    backgroundColor: 'red',
    // flex:1,
    // flexGrow:1.6,
    // alignItems:'center'
  },
  unputsub: {
    height: height / 20,
    width: width / 1.1,
    flexDirection: 'row',
    // backgroundColor:'pink', 
    borderColor: '#A2A2A2',
    borderWidth: 0.5,
    borderRadius: 5,
    alignItems: 'center'

  },
  count: {
    height: height / 28,
    width: width / 7.8,
    alignItems: 'center',
    // backgroundColor:'yellow',
    borderRightWidth: 1,
    borderColor: '#A2A2A2',
    paddingTop: 3,
    maxHeight: 40,
    marginLeft: 4,
    marginTop: 9,
  },
  code: {
    color: '#313450',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
  ipField: {
    color: '#313450',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
    height: height / 28,
    width: width / 7.8,
    paddingHorizontal: 5
  },
  redCon:
  {
    height: height * 0.02,
    width: width / 1.15,
    // paddingHorizontal: 10
    alignSelf: 'center'
  },
  redTxt: {
    color: 'red',
    fontSize: 13,
  },
  ipfields: {
    // backgroundColor: 'red',
    height: height / 20,
    width: width / 1.6,
    paddingHorizontal: 10,
    color: '#313450',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
    justifyContent: 'center'
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