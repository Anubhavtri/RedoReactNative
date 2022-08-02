import { Dimensions } from "react-native"

const { height, width } = Dimensions.get('screen')

export default {
  mainContainer: {
    backgroundColor: '#FFFFFF',
    height: height / 1,
    width: width / 1,

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
    fontSize: 19,
    // fontWeight: 'bold',
    fontFamily: 'Jost-Medium',
    paddingHorizontal: 15
  },
  ipCon: {
    height: height / 7,
    width: width / 1,
    // backgroundColor: 'white',

  },
  txtCon: {
    height: height / 15,
    width: width / 1.1,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  txtCons: {
    height: height / 20,
    width: width / 1.1,
    // backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  txtPass: {
    fontSize: 17,
    color: '#707070',
    fontFamily: 'Jost-Medium'
  },
  fieldCon: {
    height: height / 17,
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
    height: height / 17,
    width: width / 1.35,
    // backgroundColor: 'lightblue',
    fontSize: 14,
    color: '#A2A2A2',
    fontFamily: 'Jost-Regular'
  },
  spaceCon: {


    height: height / 7,
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

}