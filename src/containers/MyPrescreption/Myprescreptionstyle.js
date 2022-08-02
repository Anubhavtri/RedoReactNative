

import $primary from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen')

export default {
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#FFFFFF',
  },
  safeCon: {
    height: height / 1,
    // backgroundColor: 'yellow',
    width: width / 1,
  },
  topContainer: {
    height: height / 12,
    width: width / 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerCon: {
    height: height / 10,
    width: width / 1,
    // backgroundColor: 'red',  
  },
  loginTxt: {
    fontSize: 23,
    color: '#707070',
    fontFamily: 'Jost-Medium',

  },
  loginTxts: {
    fontSize: 23,
    color: '#707070',
    fontFamily: 'Jost-Medium',
    // paddingHorizontal: 15
  },

  desCon: {
    height: height / 7.5,
    width: width / 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },

  desCons: {
    height: height / 10,
    width: width / 1.1,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    borderColor: '#707070',
    borderWidth: 0.5,
    // justifyContent: 'center',
    flexDirection: 'row'
    // alignSelf: 'center'
  },
  presTxt: {
    color: '#0E3F6C',
    fontSize: 16,
    fontFamily: 'Jost-Medium'
  },
  conTainer: {
    height: height / 10,
    width: width / 3,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center'

  },
  conTain: {
    height: height / 10,
    width: width / 7,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'

  },
  conTainers: {
    height: height / 10,
    width: width / 8,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'

  },
  conTainerss: {
    height: height / 10,
    width: width / 3.5,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'flex-end'

  },
  boxCon: {
    backgroundColor: '#FFFFFF',
    height: height / 25,
    width: width / 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#31CCB0',
    borderRadius: 5
  },
  dateCon: {
    height: height / 35,
    width: width / 1.1,
    // backgroundColor: 'green',
    alignSelf: 'center'
  },
  dateTxt: {
    color: '#A7A7A7',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
  upload: {
    height: height / 4,
    width: width / 1,
    borderRadius: 9,
    // backgroundColor:'cyan',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  uploadCon: {
    marginTop: 30,
    height: height / 16,
    width: width / 1.8, 
    borderRadius: 8,
    backgroundColor: '#31CCB0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadTxt: {
    fontSize: 18,
    color: '#707070',
    alignSelf: 'center',
    color: '#FFFFFF'
    // backgroundColor:'yellow'
  },
}