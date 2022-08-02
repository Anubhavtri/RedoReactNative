import $primary from '../../../../settings/styles/DefaultPrimarySettings';
import DefaultSetting from '../../../../settings/styles/DefaultPrimarySettings';
import { Dimensions, StatusBar } from 'react-native';
import $_ from '../../../../baseComponents/textInput/TextInputSettings'

const { height, width } = Dimensions.get('window')
export default {
    MainContainer: {
        height: "100%",
        width: "100%",
        paddingBottom:50,
        backgroundColor: DefaultSetting.white,
    },
    TopNav: {
        height: 55,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        padding: 13
    },
    boxConType : {  
    width: "100%",
    backgroundColor: 'white',
    flexDirection : 'column',
    alignSelf : 'center',
    marginTop :10,
    borderWidth: 1,
    padding : 10,
    borderColor: 'grey',
             shadowOpacity: 0.1,
             shadowRadius: 4,
            elevation: 5,
            shadowColor : 'grey',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            borderRadius: 5,},
    typeSelect1 : { color:"#47CACC",alignSelf : 'center',position : 'absolute',right : 10},
    typeSelect2 : { color:"#707070",alignSelf : 'center',position : 'absolute',right : 10},
    typeText1 : { color: '#47CACC', fontSize: 15, marginLeft: 15,alignSelf :'center'},
    typeText2 : { color: '#707070', fontSize: 15, marginLeft: 15,alignSelf :'center'},
    topnavtext: {
        color: '#707070',
        fontSize: 20,
        marginLeft :15,
        justifyContent: 'space-between',
        fontWeight: DefaultSetting.fontWeight.bold
    },
    pageCenter: {
        alignItems: 'center',
        marginTop :70,
        flexDirection : 'column',
        alignSelf : 'center',
        width: "100%",
        justifyContent: "center",
    },

    image: {
        marginTop: 150,
        marginBottom: 10,
        width: '40%',
        height: 100,
    },
    text: {
        fontSize: 24,
        marginBottom: 30,
        padding: 40,
    },
    checkboxContainer: {
        width :80,
        marginHorizontal: 1, padding: 0, borderWidth: 0, backgroundColor: '#FFFFFF'
    },
    checkboxContainer3: {
        marginHorizontal: 1, padding: 0, borderWidth: 0, backgroundColor: '#FFFFFF'
    },
    checkboxContainer2: {
         padding: 0, borderWidth: 0, backgroundColor: '#FFFFFF'
    },
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    cutCon: {
        height: "60%",
        width: "100%",
      },
    centeredView: {
        width: "100%",
        height :"100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection : 'column',
        backgroundColor: '#707070A6',
        justifyContent: 'flex-end'
      },
      modalView: {
        height: "40%",
        width: "100%",
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
      },
    modalStyle: {
        width: "100%",
        height :"100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection : 'column',
        backgroundColor: '#707070A6',
        justifyContent: 'flex-end'
    },
    horizontalScrollBarBTn: { marginHorizontal: 5,marginVertical:10, backgroundColor: 'white', padding: 10, borderRadius: 15, borderColor: 'black',height:40 },
    horizontalScrollBarOnBTn: {backgroundColor: '#00FFFF', marginHorizontal: 5,marginVertical:10, padding: 10, borderRadius: 15, borderColor: 'black',height:40 },
    animatedContainer: {
        backgroundColor: 'white',
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
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
    addressfield: {
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: DefaultSetting.borderRadius,
        borderColor: DefaultSetting.grayColors._400,
    },
    textipstyle: {
        flexWrap: 'wrap',
        fontSize: 16,
        paddingRight: $_.textInputPaddingRight,
        paddingLeft: $_.textInputPaddingRight,
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,
    },
    covertext: {
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,
        fontSize: 15,
        fontWeight: DefaultSetting.fontWeight.medium,
    },
    keyBox: {
        // color: PrimarySettings.grayColors._300,
        paddingBottom: 3,
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,
        fontWeight: "bold",

    },
    keyBox2: {
        // color: PrimarySettings.grayColors._300,
        paddingBottom: 5,
        paddingTop: 5,
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,
        fontWeight: "bold",

    },
    keyBox3: {
        // color: PrimarySettings.grayColors._300,
        paddingBottom: 5,
        paddingTop: 5,
        textTransform : 'capitalize',
        position : 'absolute',right : 10,
        color: $_.textInputColor,
        fontFamily: $_.textInputFontWeight,
        fontWeight: "bold",

    },
    checkBox1 :{ fontSize: 25,alignSelf : 'center',color :"#47CACC" },
    checkBox2 :{ fontSize: 25,alignSelf : 'center',color :"#707070" },
    uncheckcircle: {
        height: 28,
        width: 28,
        borderRadius: 1000,
        borderWidth: 1,
        backgroundColor : 'white',
        borderColor : '#707070',
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 12
    },
    checkcircle: {
        height: 28,
        width: 28,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor : '#47CACC',
        backgroundColor: '#47CACC',
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 12
    },
    buttonStyle: {
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        backgroundColor: '#E5184E',
        alignSelf: 'center',
        alignItems: 'center',
        height :45,
        marginTop :30,
        justifyContent: 'center',
        borderRadius: 7, padding: 5,
        width:"30%",
    },
    buttonStyle2: {
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: "center",
        borderColor: '#E5184E',
        borderWidth :1,
        alignSelf: 'center',
        alignItems: 'center',
        height :45,
        marginTop :30,
        justifyContent: 'center',
        borderRadius: 7, padding: 5,
        width:"30%",
    },
    ////////////////////////////////////////////////////////////////
    boxCon: {
        height:50,
        width: "100%",
        // backgroundColor: 'blue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxCons: {
        height: 50,
        width: 200,
        backgroundColor: 'red',
        borderWidth: 1,
    },
    boxCont: {
        height: 50,
        width: 200,
        backgroundColor: 'yellow',
        borderWidth: 1,
    },
    boxCont: {
        height: 50,
        width: 200,
        backgroundColor: 'yellow',
        borderWidth: 1,
    },
    boxContainer: {
        height: 50,
        width: 200,
        backgroundColor: 'green',
        borderWidth: 1,
    },
    pointCon: {
        height: 50,
        width: 200,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    ptCon: {
        height: 50,
        width: 200,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    rtCon: {
        height: 50,
        width: 200,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    txtTop: {
        fontWeight: 'bold',
        fontFamily: 'Jost-SemiBold',
        fontSize: 15
    },
    txtTops: {
        fontWeight: 'bold',
        fontFamily: 'Jost-SemiBold',
        fontSize: 15,
        top: 50,
        paddingHorizontal: 180

    },
    ltCon: {
        height: 50,
        width: 200,
        // backgroundColor: 'yellow',
        // borderWidth: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    secCon: {
        height: 50,
        width: 200,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'flex-end',
        // backgroundColor: 'cyan'
    },
    locationCon: {

        height: 50,
        width: 200,
        // backgroundColor: 'cyan',
        justifyContent: 'flex-end'
    },
    pinSty: {
        top: 45,
        paddingHorizontal: 175
    },
   
    smallCon: {
        height: height / 23,
        width: width / 5,
        // backgroundColor: 'pink',
        borderRadius: 5,
        marginTop :10,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#707070',
      },
      smallCons: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: '#707070',
      },
      smallCot: {
        height: height / 23,
        width: width / 10,
        backgroundColor: '#47CACC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 0.5,
        borderColor: '#707070',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
      },
      smallConse: {
        height: height / 23,
        width: width / 10,
        // backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
      },
      smallConses: {
        height: height / 23,
        width: width / 10,
        backgroundColor: '#47CACC',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
      },
      ftTxt: {
        color: '#707070',
        fontFamily: 'Jost-Regular',
        fontSize: 14,
      },
      ftTxt2: {
        color: 'white',
        fontFamily: 'Jost-Regular',
        fontSize: 14,
      },

}