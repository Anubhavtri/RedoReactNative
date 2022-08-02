

import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('screen');

export default {
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF',
        // justifyContent: 'center',

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
    headCon: {
        height: height / 13,
        width: width / 2,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtHead: {
        color: '#707070',
        // backgroundColor: '#707070',
        fontSize: height / 45,
       fontFamily: 'Jost-Medium',
        width: width / 2.1
    },
    boxSpace: {
        height: height / 1.38,
        width: width / 1,
        alignItems: 'center',
        // backgroundColor: 'cyan'
    },
    boxCon: {
        height: height /1.3,
        width: width / 1.08,
    },
    headDirect: {
        borderTopWidth: 1,
        borderBottomWidth: 0.4,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#707070',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        
        height: height / 17,
        width: width / 1.08,
        // backgroundColor: 'blue',
        flexDirection: 'row',
        
    },
    headDirects: {  
        // height: height / 25,
        width: width / 1.08,
        // backgroundColor: 'blue',
        flexDirection: 'row',

    },
    boxDown:{
        
        width: width / 1.08,
        // backgroundColor: 'blue',
        borderTopWidth: 0.4,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#707070',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        
        
    },
    titleCon: {
        height: height / 17,
        width: width / 5.42,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: '#707070',
    },
    titleCons: {
        height: height / 25,
        width: width / 5.42,
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.2,
        borderColor: '#707070'
    },
    headTxt: {
        fontSize: 12,
        color: '#707070',
        fontFamily: 'Jost-Medium'
    },
    headTxts: {
        fontSize: 10,
        color: '#707070',
        // fontFamily: 'Jost-SemiBold'
    },
    redCashCon: {
        height: height / 10,
        width: width / 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    txtDirect: {
        height: height / 18,
        width: width / 1.08,
        // backgroundColor: 'pink',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderColor: '#707070',
        shadowOpacity: 5,

    },
    priceCon: {
        height: height / 18,
        width: width / 3.5,
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fontSize: {
        fontSize: 16,
        color: '#0E3F6C',
        // fontWeight: 'bold'
        fontFamily: 'Jost-SemiBold'
    },
    txtPrice: {
        fontSize: 14,
        fontFamily: 'Jost-Medium',
        color: '#707070'
    },
    scollCon:{
        height: height/1.5,
        width: width / 1.08,
        // backgroundColor: 'cyan',
        
    }
  
}