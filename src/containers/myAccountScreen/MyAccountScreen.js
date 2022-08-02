import { View, TouchableOpacity, Image, ScrollView, PermissionsAndroid, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import Text from '../../baseComponents/text/Text';
import { create } from '../../helpers/PlatformSpecificStyles';
import MyAccountStyles from './MyAccountStyles';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistIcon from 'react-native-vector-icons/Fontisto';
import { connect, useDispatch } from 'react-redux';
import { resetScreen, Screens } from '../../helpers/Screens';
import MyAccountActions from './MyAccountActions';
import { useNavigation } from '@react-navigation/native';


const MyAccountScreen = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [attendance,setAttendance] =useState(false);

    const dispatch = useDispatch()
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    

   
    const renderNameAndEmail = () => {
        return (
            <View style={styles.headerSection}>
                <Image
                    style={styles.icon_head}
                    source={require('../../staticData/assests/icon_redcliffe.png')}
                />

                <View style={styles.nameSection}>
                    <Text style={styles.headerNameText}>{props.name}</Text>
                    <Text style={styles.headerEmailText}>{props.email}</Text>
                </View>
            </View>
        );
    }

    const renderRowSection = (keyIcon, keyText, bodyIcon, bodyText, handleClick) => {
        return (
            <TouchableOpacity onPress={() => { handleClick() }}>
                <View style={styles.VersionBodySection}>
                    <View style={styles.bodySectionKey}>
                        <FontistIcon name={keyIcon}
                            style={styles.body_icon}
                            size={20} />
                        <View style={styles.bodyIconTextContainer}>
                            <Text style={styles.bodyIconText}>{keyText}</Text>
                        </View>
                    </View>
                    {!!bodyIcon &&
                        <View style={styles.pickerStyle}>
                            <AntIcon name={bodyIcon}
                                style={styles.body_icon}
                                size={20} />
                        </View>
                    }
                    {!!bodyText &&
                        <View style={styles.bodySectionValueConatiner}>
                            <Text style={styles.bodySectionValue}>{bodyText}</Text>
                        </View>}
                </View>
            </TouchableOpacity>
        )

    };

    useEffect(()=>{
        props.getUserData(props.token)
    },[])
   
    const handleLogout = () => {
        dispatch({ type: "CLEAR_DATA" });
        resetScreen(Screens.LOGIN_SCREEN);
    }
    const navigation = useNavigation();

    const handleDashboard = () =>{
        navigation.navigate(Screens.DASHBOARD_SCREEN)
    }
    return (
        <SafeAreaView>
            <ScrollView>
                {renderNameAndEmail()}
                <View style={styles.actionsAndVersion}>
                    {renderRowSection('mobile-alt', 'Mobile', '', props.phoneNumber)}
                    
                </View>
                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.logoutSection}>
                        <Text style={styles.logoutText}>Log out</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

let styles = create(MyAccountStyles);

const mapStateToProps = (state) => ({
    name: state.user.name,
    phoneNumber: state.user.phoneNumber,
    username: state.user.userName,
    email: state.user.email,
    token: state.user.token,
    address: state.user.address,
    isLoggedIn: state.user.isLoggedIn,
    
    
})

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: token => dispatch(MyAccountActions.getUserData(token)),
       

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountScreen);