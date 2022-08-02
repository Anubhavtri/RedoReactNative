import PrimarySettings from "../../settings/styles/DefaultPrimarySettings"

export default {
    keyBox: {
        color: PrimarySettings.grayColors._300,
        paddingBottom: 3,
        marginHorizontal:15
    },
    coveredBorder: {
        borderWidth: 1,
        borderRadius: PrimarySettings.borderRadius,
        borderColor: PrimarySettings.grayColors._200,
        padding: 8
    },
    rowDirection: {
        flexDirection: 'row',
        marginLeft: 5
    },
    addtext:{
        color: PrimarySettings.primaryColor,
        fontSize: PrimarySettings.baseFontSize + 2,
        fontWeight: PrimarySettings.fontWeight.bold,
    },
    textWithLabelContainer:{
        marginVertical: 10,
        marginHorizontal:15
    },
    searchBox: {
        marginVertical: 10
    },
    checkboxContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: PrimarySettings.grayColors._800,
        borderRadius: PrimarySettings.borderRadius,
        padding: 10,
        marginVertical: 5,
    },
    packageTextContainer:{
        justifyContent: 'center',
        marginLeft: 5,
        maxWidth: '90%'
    },
    listContainer:{
        padding: 10
    }
}
