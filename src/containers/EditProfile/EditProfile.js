import React , {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import EditProfileStyle from './EditProfileStyle'
import { create } from '../../helpers/PlatformSpecificStyles'
import { Image, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import TextInput from '../../baseComponents/textInput/TextInput'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Actions from './EditAction';
import ProfileAction from '../ProfileScreen/ProfileAction';
import { Screens,navigate } from '../../helpers/Screens';

export const EditProfile = (props) => {

    const [image, setimage] = useState();
    const [name, setName] = useState(props?.UserDetails?.fullname);
    const [age, setage] = useState(props?.UserDetails?.age?.toString());
    const [email, setemail] = useState(props?.UserDetails?.email);
    const [address, setaddress] = useState(props?.UserDetails?.address);
    const [message , setmessage] = useState("")
    // console.log(name,age,email,address)

    console.log("the uploaded image ", image)

    const openImagePicker = () => {

        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            quality: 0.5,
            includeBase64: true,
        }).then(image => {
            // props.postPaymentImage(booking.pk, image, token)
            setimage(image.data)
            // setpath(image.path)
        }).catch((error) => { console.log(error) })
    }

    useEffect(() => {
        props.getProfileDetails(props.token)
    }, [])

    const regx = /^[0-9]\d{1}$/;

    const car = /^[A-Za-z ]+$/;

    const eid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.nav}>
                    <MaterialCommunityIcons
                        onPress={(e) => { props.navigation.goBack() }}
                        style={{ fontSize: 25, marginRight: 20 }}
                        name="arrow-left"
                        backgroundColor="#3b5998"
                    />
                    <Text style={styles.text}>Edit Profile Screen</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.packdetail}>
                    {/* <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.packname}>Package name</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.descri}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos….more</Text>
                    </View>
                </View> */}
                    <View style={styles.form}>
                        <Text style={{ fontSize: 16, color: '#205072', marginTop: '2%', marginBottom: '4%', fontWeight: 'bold' }}>Enter details to edit your profile</Text>
                        <TextInput  value={name} onChangeText={(value)=>{
                            if(!car.test(value)){
                                setmessage("Invalid name")
                            }else{
                                setmessage("")
                            }
                            setName(value)
                            }} placeholder="Name" style={styles.input} />
                        <TextInput  value={age} 
                        onChangeText={(value)=>
                        {if(!isNaN(value) && value < 110){setage(value.toString())}}} placeholder="Age" style={styles.input} />
                        <TextInput  value={email} onChangeText={(value)=>{
                            if(!eid.test(value)){
                                setmessage("Invalid email name")
                            }else{
                                setmessage("")
                            }
                            setemail(value)}} placeholder="Email" style={styles.input} />
                        <TextInput  value={address} onChangeText={(value)=>{setaddress(value)}} placeholder="Address" style={styles.input} />
                        <TouchableOpacity onPress={() => { openImagePicker() }}>
                            <Text style={{ paddingVertical: 10, paddingHorizontal: 15, backgroundColor: '#0E3F6C', color: 'white', maxWidth: '40%' }}>Select image</Text>
                        </TouchableOpacity>
                        <Text style={styles.error}>{message}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {    
                                if(car.test(name)  && regx.test(age) && eid.test(email)){ 
                                props.doEdit(name,age,email,address,props?.UserDetails?.username,image,props?.token); navigate(Screens.PROFILESCREEN)  
                            }else{
                                alert('Input Details are invalid')
                            }
                                }}>
                            <Text style={styles.buttontext}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
let styles = create(EditProfileStyle);

const mapStateToProps = (state) => ({
    cityList: state.city?.cityArray,
    selectedCity: state.city?.cityId,
    UserDetails: state.userprofile?.userProfile,
    token: state.user?.userData?.token,
 
})

const mapDispatchToProps = (dispatch) => {
    return {
        doEdit: (name,age,email,address,userName,image,token) => {
            dispatch(Actions.doEdit(name,age,email,address,userName,image,token))
        },
        getProfileDetails: (token) => {
            dispatch(ProfileAction.getProfileDetails(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
