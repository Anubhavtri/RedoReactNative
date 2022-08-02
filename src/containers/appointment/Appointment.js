import React,{useState} from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentStyle from './AppointmentStyle'
import { create } from '../../helpers/PlatformSpecificStyles'
import { Image, View, Text , TouchableOpacity} from 'react-native'
import TextInput from '../../baseComponents/textInput/TextInput'
import Actions from './AppointmentAction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Appointment = (props) => {

    const [name, setName] = useState(props?.UserName)
    const [number, setNumber] = useState(props?.phoneNumber)
    const [city, setCity] = useState(props?.cityName)
    const [message , setmessage] = useState("")

    const item = props?.route?.params?.customParam

    const regx = /^[6-9]\d{9}$/;

    const car = /^[A-Za-z ]+$/;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.nav}>
                <MaterialCommunityIcons
                        onPress={(e) => { props.navigation.goBack() }}
                        style={{ fontSize: 25, marginRight: 10 }}
                        name="arrow-left"
                        backgroundColor="#3b5998"
                    />
                    <Text style={styles.text}>Book appointment</Text>
                </View>
            </View>
            
            <View style={styles.packdetail}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.packname}>{item?.name ? item?.name:'Get Connected'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.descri}>{item?.meta_description ? item?.meta_description : 'Free doctor consultation with best attention you need'}</Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <Text style={{fontSize:16, color:'#205072' , marginTop:'2%' , marginBottom:'4%' , fontWeight:'bold'}}>Enter details to book test</Text>
                    <TextInput value={name} onChangeText={(value)=>{
                        if(!car.test(value)){
                            setmessage("Invalid name")
                        }else{
                            setmessage("")
                        }
                        setName(value)}} placeholder="Name" style={styles.input}/>
                    <TextInput keyboardType="numeric" 
                    maxLength={10}
                    value={number} 
                    onChangeText={(value)=>{
                        if(!regx.test(value)){
                            setmessage("Enter A Valid Number")
                        }else{
                            setmessage("")
                        }
                        if(value.length == 0){
                            setmessage("")
                        }
                        setNumber(value)}} placeholder="Phone Number" style={styles.input}/>
                    <Text style={styles.error} >{message}</Text>
                    <TouchableOpacity 
                     style={styles.button}
                      onPress={()=>{
                        if( regx.test(number) && car.test(name) ){ 
                            props.leadGenrationt(name,number,city)
                         }else{
                            alert('Input Details are invalid')
                        }
                          }}>
                        <Text style={styles.buttontext}>BOOK</Text>
                    </TouchableOpacity> 
                </View>
            </View>
        </SafeAreaView>
    )
}
let styles = create(AppointmentStyle);

const mapStateToProps = (state) => ({
    UserName: state.userprofile?.userProfile?.fullname,
    phoneNumber: state.userprofile?.userProfile?.phonenumber,
    cityName:state.city?.cityObj?.name
})

const mapDispatchToProps = (dispatch) => {
    return {
        leadGenrationt: (name,number,city) => {
            dispatch(Actions.leadGenration(name,number,city))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appointment)
