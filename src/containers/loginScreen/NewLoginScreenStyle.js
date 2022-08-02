import $_ from './LoginSettings';
import $primary from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions } from 'react-native';
const {height, width}=Dimensions.get('screen')
export default {
  
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF'
    },
    rows: {
        height: height / 4.3,
        width: width / 1.1,
        alignSelf: 'center',
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end'
    },
    
    text: {
        fontSize: 14,
        color: '#A2A2A2',
        fontFamily: 'Jost-Regular',
        textAlign: 'center'
    },

    terms: {
        fontSize: 14,
        color: '#484848',
        textDecorationLine: 'underline',
        fontFamily: 'Jost-Regular',
        textAlign: 'center'
        // marginTop:1,
    },
    sections: {
        // backgroundColor:'blue',
        height: height / 12,
        width: width / 1,
        justifyContent: 'flex-end'

    },
    row: {
        height: height / 15,
        width: width / 1.1,
        alignSelf: 'center',

    }, buttonActive: {
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
        fontFamily: 'Jost-Medium'
    },
    secCon: {
        height: height / 13,
        width: width / 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        // backgroundColor: 'green'
    },
    arrowCon: {
        height: height / 13,
        width: width / 7,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
    },
    arrowTxt: {
        fontSize: height / 25,
        color: '#707070',
        fontWeight: 'bold',
        // backgroundColor:'red',
    },
    fgtCon: {
        height: height / 40,
        width: width / 1.1,
        // backgroundColor: 'yellow',
        alignSelf: 'center',
        alignItems: 'flex-end'
    },
    fgtTxt: {
        fontSize: 14,
        fontFamily: 'Jost-Regular',
        color: '#659AC9',
        textDecorationLine: 'underline'
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
    headCon: {
        height: height / 13,
        width: width / 2,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },

    lbtnCon: {
        backgroundColor: '#FFFFFF',
        height: height / 20,
        width: width / 1.1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#47CACC',
        borderRadius: 5
    },
    lbtnTxt: {
        fontSize: 17,
        color: '#47CACC',
        fontFamily: 'Jost-Medium'
    },
    txtHead: {
        color: '#707070',
        // backgroundColor: '#707070',
        fontSize: height / 45,
        fontWeight: 'bold',
        width: width / 2.1
    },
    orCon: {
        // backgroundColor: 'red',
        height: height / 17,
        width: width / 1.1,
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    orTxt: {
        fontSize: 17,
        color: '#A2A2A2',
        fontFamily: 'Jost-Medium',
        marginTop: 5
    },
    spaceCon: {
        height: height / 7.5,
        width: width / 1,
        // backgroundColor: 'cyan',
    },
    enterCon: {
        height: height / 17,
        width: width / 1.1,
        // backgroundColor: 'cyan',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    signupCon: {
        flexDirection: 'row',
        height: height / 10,
        width: width / 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterTxt: {
        color: '#707070',
        fontFamily: 'Jost-Medium',
        fontSize: 17,
        marginTop: 5,
    },
    inputField: {
        height: height / 18,
        width: width / 1.1,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 0.2,
        borderColor: '#A2A2A2'
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

    countCon: {
        height: height / 25,
        width: width / 7,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.2,
        borderColor: '#707070'
    },
    countTxt: {
        color: '#313450',
        fontSize: 14,
        fontFamily: 'Jost-SemiBold'
    },
    txtInput: {
        paddingHorizontal: 12,
        height: height / 18,
        width: width / 1.45,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Jost-Regular',
        fontSize: 14,
        color: '#A2A2A2',

    },

    ipCon: {
        height: height / 8.5,
        width: width / 1,
        // backgroundColor: 'red',

    },
    txtCons: {

        height: height / 22,
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
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#A2A2A2',
    },
    ipField: {
        height: height / 18,
        width: width / 1.25,
        backgroundColor: '#FFFFFF',
        fontSize: 14,
        color: '#A2A2A2',
        fontFamily: 'Jost-Regular',
        borderWidth: 0,
        paddingHorizontal: 12
    },

  }