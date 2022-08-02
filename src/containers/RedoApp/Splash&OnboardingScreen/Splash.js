import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { navigate, Screens } from '../../../helpers/Screens';
const { height, width } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';
import { GETApi } from "../../../app/ApiCall.js";
const Splash = (props) => {
    const [spinnerShow, setSpinnerShow] = useState(false)
    useEffect(() => {
        callApiDetails("/redoapp/get-unique-customer")
    }, [])
    const callApiDetails = async(url)=>{
        setSpinnerShow(true)
        var getResult = await GETApi(url,props?.token)
        if(getResult.error){
         setSpinnerShow(false)
         alert(getResult.message)
         navigate(Screens.REDO_TAB)
        }else {
         setSpinnerShow(false)
         if (getResult.data?.name != null && getResult.data?.height != null) {
            navigate(Screens.REDO_TAB)
        } else {
            navigate(Screens.REDO_ONBOARD)
        }
        }
  }
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
            <Spinner visible={spinnerShow}></Spinner>
                <ImageBackground style={styles.styCon}
                    resizeMode='cover'
                    source={require('../../../staticData/assests/Splash.png')} >
                    <Image source={require('../../../staticData/assests/RedO.png')} />
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
};

const mapStateToProps = state => ({
    userDetails: state?.redoOnboardingReducer?.userDetails,
    token: state?.user?.userData?.token,
});
const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
const styles = StyleSheet.create({
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#174c7d'
    },
    styCon: {
        height: height / 1,
        width: width / 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});