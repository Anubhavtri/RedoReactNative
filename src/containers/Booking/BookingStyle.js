
import $primary from '../../settings/styles/DefaultPrimarySettings';
import { Dimensions,StatusBar } from 'react-native';


export default {
    container:{
        flex:1,
        flexGrow:1,
        backgroundColor:"#F5F5F5",
        
        marginTop: StatusBar.currentHeight || 0
    },
    header:{
        
        minHeight:"10%",
        maxHeight:'10%',
        flex:1,
        flexGrow:1,
        padding:'5%',
        backgroundColor:'#F5F5F5'
    },
    text:{
        fontSize:20,
        color:'#707070',
        fontWeight:'500'
    },
    filter:{
        
        minHeight:"5%",
        maxHeight:'5%',
        flex:1,
        flexGrow:1,
        flexDirection:'row',
        marginBottom:'2%',
        backgroundColor:'#FFFFFF'

    },
    filtertext:{
        color:'#205072',
        fontSize:14,
        fontWeight:'500'
    },
    inactive:{
        fontSize:14,
        color:'#A2A2A2'
    }
}

