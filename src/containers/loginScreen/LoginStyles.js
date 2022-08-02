import $_ from './LoginSettings';
import $primary from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen')
export default {

  container: {
    // backgroundColor:"red",
    minHeight: '100%',
  },
  maindiv: {
    backgroundColor: 'white',
    height: height / 1,
    width: width / 1
  },
  topnav: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    minHeight: 60,
    maxHeight: 70,
    padding: 13,
  },
  section: {
    // backgroundColor:'blue',
    flex: 1,
    maxHeight: '30%',
    padding: '5%',
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
    flexGrow: 0.8,
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
    fontSize: 17,
    color: '#707070',
    fontWeight: "bold",
  },
  inputsection: {
    flexDirection: 'row',
    // backgroundColor:'red',
    flex: 1,
    flexGrow: 1.6,
    // alignItems:'center'
  },
  unputsubsection: {
    flexDirection: 'row',
    // backgroundColor:'pink',
    flex: 1,
    flexGrow: 1,
    // alignItems:'center',
    borderColor: '#A2A2A2',
    borderWidth: 0.2,
    borderRadius: 5,
    maxHeight: 45,
    // justifyContent:'center',
  },
  country: {
    height: height / 28,
    width: width / 7.8,
    alignItems: 'center',
    // backgroundColor:'yellow',
    paddingTop: 2,
    maxHeight: 40,
    marginLeft: 4,
    marginTop: 9,

  },
  countrycode: {
    fontSize: 15,
    // backgroundColor:'cyan',
    marginLeft: 7,
    fontFamily: 'Jost-SemiBold',
    color: '#313450'
  },
  inputfield: {
    height: height / 18,
    width: width / 1.5,
    justifyContent: 'center',
    // backgroundColor:'cyan', 
    // alignSelf:'center', 
    // borderLeftColor:'#A2A2A2',
    // borderLeftWidth:0.5,
  },
  input: {
    justifyContent: 'center',
    fontSize: 15,
    // color:'#A2A2A2',
    borderWidth: 0,
    maxHeight: 33,
    // backgroundColor:'green',
    minWidth: '75%',
    maxWidth: '90%',
    fontFamily: 'Jost-SemiBold',
    color: '#313450'
  },
  text: {
    fontSize: 14,
    color: '#A2A2A2',
  },
  VerticleLine: {
    alignSelf: 'center',
    height: "80%",
    borderWidth: 0.5,
    borderColor: '#A2A2A2',
    marginLeft: 20,
  },
  terms: {
    fontSize: 14,
    color: '#707070',
    textDecorationLine: 'underline',
    fontWeight: "bold",
    marginTop: 1,
  },
  buttonActive: {
    backgroundColor: '#E5184E',
    flex: 0.3,
    minHeight: 40,
    maxHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonInactive: {
    backgroundColor: '#A2A2A2',
    flex: 0.3,
    minHeight: 40,
    maxHeight: 40,
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
    height: height / 18,
    width: width / 8.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -30,
  },
  sections: {
    // backgroundColor: 'blue',
    height: height / 25,
    width: width / 1.1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 14,
    color: '#A2A2A2',
    fontFamily: 'Jost-Regular',
    textAlign: 'center'
  },
  terms: {
    fontSize: 14,
    fontFamily: 'Jost-Regular',
    color: '#707070',
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  sectionCon: {
    height: height / 5,
    width: width / 1,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end'
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
    backgroundColor: 'red',
    // justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center'
  },

  loginTxt: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: 'Jost-Medium',
    paddingHorizontal: 15,
    color: '#707070'
  },
}