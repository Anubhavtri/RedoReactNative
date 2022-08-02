import $primary from '../../settings/styles/DefaultPrimarySettings';
import DefaultSetting from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default {

    icon_head: {
        width: 60,
        resizeMode: 'contain',
        height: 60,
    },
    modalStyle: {
        color: "#fff",justifyContent: 'flex-end', 
    },
    MainContainer: {
        width: windowWidth,
        // minHeight:windowHeight,
        minHeight: '100%',
        backgroundColor: DefaultSetting.body.bg,
      },
    TopNav: {
        flex: 1,
        flexGrow: 10,
        // borderWidth:1,
        maxHeight: DefaultSetting.topNav.maxHeight,
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        padding: 0
      },
      topnavtext: {
        color: '#707070',
        fontSize: 20,
        fontWeight: DefaultSetting.fontWeight.bold
      },
    nameSection: {
        paddingLeft: 30,
        paddingTop: 10,
    },
    headerSection: {
        backgroundColor: $primary.white,
        paddingVertical: 30,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    headerNameText: {
        paddingTop: 10,
        fontSize: 18,
        flexWrap: 'wrap'
    },
    headerEmailText: {
        fontSize: 16,
        flexWrap: 'wrap',
        color: $primary.grayColors._800
    },
    actionsAndVersion: {
        marginTop: 20,
        backgroundColor: $primary.white,
    },
    VersionBodySection: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 25,
        borderColor: $primary.grayColors._900
    },
    bodySectionKey: {
        flexDirection: 'row',
        width: '50%',
        paddingLeft: 10,
    },
    body_icon: {
        color: $primary.primaryColor
    },
    bodyIconTextContainer: {
        paddingLeft: 10,
    },
    bodyIconText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    bodySectionValueConatiner: {
        width: '50%',
    },
    bodySectionValue: {
        textAlign: 'right',
        paddingRight: 20,
        fontSize: 16
    },
    pickerStyle: {
        paddingLeft: '40%',
    },
    logoutSection: {
        marginTop: 10,
        paddingVertical: 20,
        backgroundColor: $primary.white,
    },
    logoutText: {
        fontSize: 16,
        textAlign: 'center',
    },
    popuptext: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 30,
    },
    popuptextHeader: {
        color: "#924a91",
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 20,
        marginTop: 40,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#924a91",
        borderRadius: 10,
        marginTop: 30,
        marginHorizontal: 80,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    rowDirection: {
        flexDirection: 'row',
        marginBottom: 20,
        // borderBottomWidth: 1,
        marginTop: 10,
    },

    distributeFields: {
        justifyContent: 'space-between',
        marginBottom: 5
    },
    container: { 
        flex: 1, 
        padding: 16,
         paddingTop: 30, 
         backgroundColor: '#fff'
     },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' }
}