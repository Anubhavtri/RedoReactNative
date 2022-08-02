import $primary from '../../settings/styles/DefaultPrimarySettings';

import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
export default {
    webContainerModalNavTextWrap: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    headerTitleStyles: {
        color: $primary.white,
        fontWeight: 'bold',
        android: {
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
            alignSelf: 'center',
        },
        ios: {
            fontFamily: 'Avenir-Medium',
            fontSize: 16,
            alignSelf: 'center',
            flexWrap: 'wrap',
            textAlign:'center',
            maxWidth:'62%',
            lineHeight:18,
        },
    },
    titleLeftMargin: {
        android: {
            marginLeft: 15
        }
    },
    webContainerModallNavIcon: {
        width: 8,
    },
    webContainerModalNavText: {
        fontSize: 12,
        fontFamily: 'Avenir-Roman',
        color: $primary.interfaceColors._7
    },
    singleModalCloseButtonStyle: {
        position: 'absolute',
        left: 15,
        height: 70,
        width: 70,
        justifyContent: 'center',
    },
    singleModalCloseText: {
        fontSize: 16,
        fontFamily: 'Avenir-Roman',
        color: $primary.white
    },
    singleModalSaveButtonStyle: {
        position: 'absolute',
        right: 0,
        height: 70,
        width: 70,
        justifyContent: 'center',
    },
    singleModalSaveText: {
        fontSize: 18,
        fontFamily: 'Avenir-Roman',
        color: $primary.white
    },
    navigationBarForModal: {
        backgroundColor: $primary.primaryColor,
        borderBottomWidth: 0,
        paddingTop: Platform.OS === 'android' ? 0 : (DeviceInfo.hasNotch() ? 40 : 20),
        paddingBottom: (DeviceInfo.hasNotch() ? 10 : 5),
        height: Platform.OS === 'android' ? $primary.baseGridUnit * 7 : (DeviceInfo.hasNotch() ? 85 : 70),
        textAlign: 'center'
    },
    navigationBarTitleView: {
        flex: 1,
        justifyContent: 'center',
    }
};