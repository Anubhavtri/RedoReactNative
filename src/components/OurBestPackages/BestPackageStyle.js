
import $primary from '../../settings/styles/DefaultPrimarySettings';

export default {

    // new style
    packagelist:{
        padding:'2%',
    },
    container: {
        backgroundColor: '#FFFFFF',
        minHeight: "100%",
        display: 'flex',
        flex: 1,
        justifycontent: "center",
        alignItems: "center"
    },
    maindev: {
        minHeight: "100%",
        minWidth: "100%",
        paddingRight: "4%",
        paddingLeft: "4%",
        // borderColor: "black",
        // borderWidth: 2,
    },
    topnav: {
        minHeight: "7%",
        // borderColor: "black",
        // borderWidth: 2,
        display: "flex",
        justifycontent: "center",
        padding: "4%",
        backgroundColor: "#F5F5F5",
    },
    filter: {
        minHeight: '7%',
        // borderColor: "green",
        // borderWidth: 2,
        display: "flex",
        flexDirection: "row",
        padding: "4%",
    },
    packagebox: {
        // borderColor: "pink",
        // borderWidth: 2,
        minHeight: "100%",
    },
    card: {
        display: "flex",
        // borderColor:"red",
        // borderWidth:1,
        marginTop: '5%',
        backgroundColor: "#FAFAFA",
        padding: "4%",
    },
    row: {
        display: 'flex',
        flexDirection: "row",
        
        justifyContent: "space-between",
        borderBottom: 1,
        borderColor: '#DCDCDC'
        // borderColor: "blue",
        // borderWidth: 2,
    },
    description: {
        maxheight: "20%",
        marginTop: "2%",
        marginBottom: '2%',
        fontSize: 12,
        color: "#707070",
    },
    price: {
        display: "flex",
        flexDirection: 'row',
        // borderColor: "green",
        // borderWidth: 2,
        minWidth: "50%"
    },
    discount: {
        display: "flex",
        flexDirection: 'row',
        // borderColor: "green",
        // borderWidth: 2,
        minWidth: "50%",
        justifyContent: 'space-evenly'
    },
    text: {
        fontSize: 14,
        color: '#205072',
        marginTop: '2%'

    },
    offerprice: {
        fontSize: 12,
        color: '#E5184E',
        marginTop: '4%'
    },
    discountedprice: {
        fontSize: 14,
        color: '#205072',
        marginTop: '3%',
        marginLeft: '7%',
    },
    save: {
        fontSize: 10,
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingHorizontal: '3%',
        backgroundColor: '#659AC9',
        color: '#FFFFFF',
        marginTop: '10%',
        borderRadius: 20
    },
    book: {
        fontSize: 14,
        paddingTop: "2%",
        paddingBottom: "2%",
        paddingHorizontal: '5%',
        backgroundColor: '#E5184E',
        color: '#FFFFFF',
        marginTop: '2%',
        borderRadius: 5

    }
}

