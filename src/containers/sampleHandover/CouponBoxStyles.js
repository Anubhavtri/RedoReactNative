import PrimarySettings from "../../settings/styles/DefaultPrimarySettings";

export default {
    rowDirection: {
        flexDirection: 'row'
        
    },
    searchBox: {
        marginVertical: 10,
        marginHorizontal:10
    },
    couponLabel: {
        width: '75%',
    },
    minimumAmount: {
        color: PrimarySettings.grayColors._300
    },
    couponCard: {
        marginVertical: 10,
        marginHorizontal:20
    },
    pincodetext: {
        fontSize: 16,
        textAlign:'center',
    },
    pincodeTextContainer:{
        justifyContent: 'center',
        marginHorizontal: 15,
        maxWidth: '90%',
        borderWidth: 1,
        borderColor: PrimarySettings.grayColors._800,
        borderRadius:PrimarySettings.borderRadius,
        padding: 10,
        marginVertical: 5,
    },
}