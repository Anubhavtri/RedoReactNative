import { StyleSheet, Text, View, TextInput as ReactTextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { create } from '../../../../helpers/PlatformSpecificStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import reminderStyles from './reminderStyles';
import { CheckBox, Icon, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';

const BloodGlucoseInsights = (props) => {
    const [firstBtnGrp, setFirstBtnGrp] = useState('')
    return (
        <SafeAreaView>
            <View style={[styles.MainContainer]}>
                <View style={styles.TopNav}>
                    <MaterialCommunityIcons
                        onPress={(e) => { props.navigation.goBack() }}
                        style={{ fontSize: 25, marginRight: 10 }}
                        name="arrow-left"
                        backgroundColor="#3b5998"
                    />
                    <Text style={styles.topnavtext}>Blood Sugar Reminder</Text>
                </View>
                <Text style={{ fontSize: 24, textAlign: 'center' }}>105</Text>
                <ButtonGroup
                    buttons={['mg/dL', 'mmol/L',]}
                    selectedIndex={firstBtnGrp}
                    onPress={(value) => {
                        setFirstBtnGrp(value);
                    }}
                    containerStyle={{ marginBottom: 20, marginHorizontal: 40, borderRadius: 15 }}
                />
                <Text style={{ fontSize: 18, textAlign: 'center' }}>Your Sugar Level in Normal Range</Text>
                <View style={[styles.rowDirection, { justifyContent: "space-between", marginHorizontal: 20 }]}>
                    <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                        onPress={(e) => { props.navigation.goBack() }}>
                        <Text style={{ color: 'white' }}>+Add Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                        onPress={(e) => { props.navigation.goBack() }}>
                        <Text style={{ color: 'white' }}>Change Meal Type</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ borderWidth: 2, marginHorizontal: 22, marginVertical: 15, padding: 25 }}>
                    <Text style={{}}>Book Your 1st Free Consultation with Health Coach</Text>
                    <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                        onPress={(e) => { props.navigation.goBack() }}>
                        <Text style={{ color: 'white' }}>Book Now</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', }}>How easy was to monitor your Blood Glucose level with Redo </Text>
                <MaterialCommunityIcons
                    onPress={(e) => { props.navigation.goBack() }}
                    style={{ fontSize: 25, marginRight: 10 }}
                    name="arrow-left"
                    backgroundColor="#3b5998"
                />
                <MaterialCommunityIcons
                    onPress={(e) => { props.navigation.goBack() }}
                    style={{ fontSize: 25, marginRight: 10 }}
                    name="arrow-left"
                    backgroundColor="#3b5998"
                />
            </View>
        </SafeAreaView>
    )
}



const styles = create(reminderStyles)
const mapStateToProps = (state) => ({
    name: state.user.name,
    phoneNumber: state.user.phoneNumber,
    email: state.user.email,
    token: state.user.token,
    isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = (dispatch) => {
    return {
        getUserData: token => dispatch(MyAccountActions.getUserData(token)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BloodGlucoseInsights);