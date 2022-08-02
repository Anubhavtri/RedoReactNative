import { StyleSheet, Dimensions, Text, View, TextInput as ReactTextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { create } from '../../../../helpers/PlatformSpecificStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from "react-native-modal";
import reminderStyles from '../../ProfileScreen/reminderScreen/reminderStyles';
import { connect, useDispatch } from 'react-redux';
import DatePicker from 'react-native-date-picker'
import { CheckBox, Icon, ButtonGroup } from 'react-native-elements';
import ReminderAction from '../../ProfileScreen/reminderScreen/ReminderAction';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Api from '../../../../helpers/api';
import locations from '../../../../helpers/locations';
import LogAction from '../LogAction';
import SpinnerActions from '../../../../components/spinner/SpinnerActions';

const { height, width } = Dimensions.get('screen')

const ManualMonitoring = (props) => {
    const [glucoMeterReading, setGlucoMeterReading] = useState()

    const [firstBtnGrp, setFirstBtnGrp] = useState('')
    const [secondBtnGrp, setSecondBtnGrp] = useState('')
    const [negativeFeedModal, setNegativeFeedModal] = useState(false)
    const [createLeadModal, setcreateLeadModal] = useState(false)
    const [open, setOpen] = useState(false)
    const [tabletCheck, setTabletCheck] = useState(false)
    const [date, setDate] = useState(new Date())
    const [dataType, setDataType] = useState('')
    const [capsuleCheck, setCapsuleCheck] = useState(false)
    const [creamCheck, setcreamCheck] = useState(false)
    const [injectionCheck, setinjectionCheck] = useState(false)
    const [syrupCheck, setsyrupCheck] = useState(false)
    const [inhalerCheck, setinhalerCheck] = useState(false)
    const [MedicineType, setMedicineType] = useState('')
    const [LogScreen, setLogScre] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [DetailsInput, setDetailsInput] = useState('')
    const [sugarLevelRangeText, setSugarLevelRangeText] = useState('')
    const [addDetailsBtn, setAddDetailsBtn] = useState(false)
    const [exp1stcheck, setExp1stcheck] = useState(false)
    const [exp2ndcheck, setExp2ndcheck] = useState(false)
    const [exp3rdcheck, setExp3rdcheck] = useState(false)
    const [createLogresponse, setcreateLogresponse] = useState({})
    const [negFedComment, setnegFedComment] = useState('')
    const [LeadName, setLeadName] = useState('')
    const [LeadEmail, setLeadEmail] = useState('')
    const [LeadPhno, setLeadPhno] = useState('')
    const dispatch = useDispatch();
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    useEffect(() => {
        if (glucoMeterReading < 80) {
            setSugarLevelRangeText('Low')
        } else if (glucoMeterReading >= 80 && glucoMeterReading <= 180) {
            setSugarLevelRangeText('Normal')
        } else if (glucoMeterReading > 180) {
            setSugarLevelRangeText('High')
        }
        return
    }, [glucoMeterReading])

    const tablet = () => {
        setTabletCheck(true); setCapsuleCheck(false); setcreamCheck(false); setinjectionCheck(false); setsyrupCheck(false); setinhalerCheck(false);
    }
    const capsule = () => {
        setTabletCheck(false); setCapsuleCheck(true); setcreamCheck(false); setinjectionCheck(false); setsyrupCheck(false); setinhalerCheck(false);
    }
    const cream = () => {
        setTabletCheck(false); setCapsuleCheck(false); setcreamCheck(true); setinjectionCheck(false); setsyrupCheck(false); setinhalerCheck(false);
    }
    const injection = () => {
        setTabletCheck(false); setCapsuleCheck(false); setcreamCheck(false); setinjectionCheck(true); setsyrupCheck(false); setinhalerCheck(false);
    }
    const syrup = () => {
        setTabletCheck(false); setCapsuleCheck(false); setcreamCheck(false); setinjectionCheck(false); setsyrupCheck(true); setinhalerCheck(false);
    }
    const inhaler = () => {
        setTabletCheck(false); setCapsuleCheck(false); setcreamCheck(false); setinjectionCheck(false); setsyrupCheck(false); setinhalerCheck(true);
    }

    useEffect(() => {
        checkMedicineType();
    }, [tabletCheck, creamCheck, capsuleCheck, injectionCheck, syrupCheck, inhalerCheck])

    const checkMedicineType = () => {
        if (tabletCheck) {
            setMedicineType('fasting')
        } else if (capsuleCheck) {
            setMedicineType('pre_meal')
        } else if (creamCheck) {
            setMedicineType('post_meal')
        } else if (injectionCheck) {
            setMedicineType('3a.m')
        } else if (inhalerCheck) {
            setMedicineType('random')
        }
    }
    function dateGMT(value) {
        if (value == 0) {
            setDate(new Date())
            console.log("Today", date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }))
        } else if (value == 1) {
            setDate(new Date(Date.now() - 86400000))
            console.log("Yesterday", new Date(Date.now() - 86400000))
        } else if (value == 2) {
            setDate(new Date(Date.now() - 2 * 86400000))
            console.log("day Before", new Date(Date.now() - 2 * 86400000))
        }
    }
    const CreateManualMonitoring = () => {
        const body = {
            "monitoring_type": 2,
            "daytime": `${date.toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}`,
            "meal_type": MedicineType,
            "time": `${date.toLocaleTimeString()}`,
            "data_type": dataType,
            "volume": parseFloat(glucoMeterReading)
        }
        const successCall = (response) => {
            console.log("reminder create success", response);
            setcreateLogresponse(response)
            dispatch(SpinnerActions.hideSpinner());
            setLogScre(true)
        };

        const errorCall = (errorResponse) => {
            dispatch(SpinnerActions.hideSpinner());
            console.log(errorResponse, "ERRR) Manual booking")
            alert(JSON.stringify(errorResponse?.error))
        }
        // props.createmanualbloodglucose(body, props?.token)
        Api.doPost(locations.CREATE_MANUAL, body, successCall, errorCall, props?.token);
    }
    const onLogButtonClick = () => {
        if (MedicineType == '') {
            alert('Select One Meal type')
        } else if (dataType == '') {
            alert('Select unit type')
        } else if (glucoMeterReading == '') {
            alert('Enter some Reading Value')
        } else {
            CreateManualMonitoring()
        }
    }
    const createbloodglucoseLead = () => {
        const body = {
            "name": LeadName,
            "email": LeadEmail,
            "phone_no": LeadPhno,
            "source": "Redoapp",
            "comment": DetailsInput
        }
        props.createbloodglucoseLead(body, props?.token)
    }
    const FeedbackofUserInBloodsugar = (status) => {
        const body = {
            "manual_monitoring": createLogresponse.id,
            "feed_status": status,
            "dis_reading_accuracy": exp1stcheck,
            "dis_complex_jourrny": exp2ndcheck,
            "other": exp3rdcheck,
            "description": negFedComment
        }
        props.FeedbackofUserInBloodsugar(body, props?.token)
    }

    return (
        <SafeAreaView>
            {!LogScreen ?
                <View style={[styles.MainContainer]}>
                    <View style={styles.TopNav}>
                        <MaterialCommunityIcons
                            onPress={(e) => { props.navigation.goBack() }}
                            style={{ fontSize: 25, marginRight: 10 }}
                            name="arrow-left"
                            backgroundColor="#3b5998"
                        />
                        <Text style={styles.topnavtext}>Manual Monitoring</Text>
                    </View>
                    <ButtonGroup
                        buttons={['Today', 'Yesterday', 'day Before']}
                        selectedIndex={firstBtnGrp}
                        onPress={(value) => {
                            setFirstBtnGrp(value);
                            dateGMT(value);
                        }}
                        containerStyle={{ marginBottom: 20, marginHorizontal: 40, borderRadius: 15 }}
                    />
                    <TouchableOpacity style={{ padding: 5, alignItems: 'flex-end', marginHorizontal: 10 }}
                        onPress={() => { setOpen(true) }}>
                        <MaterialCommunityIcons
                            onPress={(e) => { setOpen(true) }}
                            style={{ marginRight: 10 }}
                            name="calendar-month"
                            size={35}
                            backgroundColor="#3b5998"
                        />
                    </TouchableOpacity>
                    <DatePicker
                        modal
                        open={open}
                        mode="datetime"
                        date={date}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            console.log("Today", date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <Text style={[styles.keyBox, { marginLeft: 30 }]}>Meal Type</Text>
                    <View style={[styles.rowDirection, { justifyContent: "space-between", marginHorizontal: 20 }]}>
                        <CheckBox
                            center
                            title="Fasting"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            containerStyle={styles.checkboxContainer}
                            checked={tabletCheck}
                            onPress={tablet}
                        />
                        <CheckBox
                            center
                            title="Pre Meal"
                            checkedIcon="dot-circle-o"
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={capsuleCheck}
                            onPress={capsule}
                        />
                        <CheckBox
                            center
                            title="Post Meal"
                            checkedIcon="dot-circle-o"
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={creamCheck}
                            onPress={cream}
                        />
                    </View>
                    <View style={[styles.rowDirection, { marginHorizontal: 20 }]}>
                        <CheckBox
                            center
                            title="3 A.M"
                            checkedIcon="dot-circle-o"
                            uncheckedIcon="circle-o"
                            containerStyle={styles.checkboxContainer}
                            checked={injectionCheck}
                            onPress={injection}
                        />
                        {/* <CheckBox
                            center
                            title="5 A.M"
                            checkedIcon="dot-circle-o"
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={syrupCheck}
                            onPress={syrup}
                        /> */}
                        <CheckBox
                            center
                            title="Random"
                            checkedIcon="dot-circle-o"
                            containerStyle={styles.checkboxContainer}
                            uncheckedIcon="circle-o"
                            checked={inhalerCheck}
                            onPress={inhaler}
                        />
                    </View>
                    <ButtonGroup
                        buttons={['mg/dL', 'mmol/dL']}
                        selectedIndex={secondBtnGrp}
                        onPress={(value) => {
                            setSecondBtnGrp(value);
                            if (value == 0) {
                                setDataType('mg_dl')
                            } else if (value == 1) {
                                setDataType('mmol_l')
                                setGlucoMeterReading()
                            }
                            // if(value ==1 && glucoMeterReading!=''){
                            //     var reading=parseFloat(glucoMeterReading)
                            //     console.log(reading,"after float")
                            //     var convertedReading=reading/0.0555
                            //     console.log(convertedReading,"after convert")
                            //     setGlucoMeterReading(convertedReading)
                            //     setTimeout(() => {
                            //         console.log(glucoMeterReading,"state value")   
                            //     }, 1200);

                            // }
                        }}
                        containerStyle={{ marginBottom: 20, marginHorizontal: 40, borderRadius: 15 }}
                    />
                    <ReactTextInput
                        style={[styles.textipstyle, styles.addressfield, { marginHorizontal: 30 }]}
                        onChangeText={(value) => { setGlucoMeterReading(value) }}
                        keyboardType='numeric'
                        backgroundColor='#FFFFFF'
                        value={glucoMeterReading}
                        placeholder="Enter Your Value"
                    // multiline={true}
                    />
                    <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                        onPress={(e) => {
                            onLogButtonClick();
                        }}>
                        <Text style={{ color: 'white' }}>Log</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={[styles.MainContainer]}>
                    <View style={styles.TopNav}>
                        <MaterialCommunityIcons
                            onPress={(e) => { setLogScre(false) }}
                            style={{ fontSize: 25, marginRight: 10 }}
                            name="arrow-left"
                            backgroundColor="#3b5998"
                        />
                        <Text style={styles.topnavtext}>Blood Sugar Reminder</Text>
                    </View>
                    <Text style={{ fontSize: 24, textAlign: 'center' }}>{glucoMeterReading}</Text>
                    <ButtonGroup
                        buttons={['mg/dL', 'mmol/L',]}
                        selectedIndex={secondBtnGrp}
                        onPress={(value) => {
                            setSecondBtnGrp(value);
                        }}
                        containerStyle={{ marginBottom: 20, marginHorizontal: 40, borderRadius: 15 }}
                    />
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>Your Sugar Level in {sugarLevelRangeText} Range</Text>
                    <View style={{ marginTop: 10 }} >
                        {/* <View style={styles.locationCon}>
                            <Text style={styles.txtTops}>12</Text>
                            <Entypo
                                name='location-pin'
                                size={30}
                                style={styles.pinSty}
                            />
                        </View> */}
                        <View style={styles.secCon}>
                            <View style={styles.pointCon}>
                                <Text style={styles.txtTop}>80</Text>
                                <Ionicons
                                    name='pin'
                                    size={20}
                                />
                            </View>
                            <View style={styles.ptCon}>
                                <Text style={styles.txtTop}>90</Text>
                                <Ionicons
                                    name='pin'
                                    size={20}
                                />
                            </View>
                            <View style={styles.rtCon}>
                                <Text style={styles.txtTop}>160</Text>
                                <Ionicons
                                    name='pin'
                                    size={20}
                                />
                            </View>
                            <View style={styles.ltCon}>
                                <Text style={styles.txtTop}>180</Text>
                                <Ionicons
                                    name='pin'
                                    size={20}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.boxCon}>
                        <View style={styles.boxCons}></View>
                        <View style={styles.boxCont}></View>
                        <View style={styles.boxContainer}></View>
                        <View style={styles.boxCont}></View>
                        <View style={styles.boxCons}></View>

                    </View>
                    <View style={[styles.rowDirection, { justifyContent: "space-between", marginHorizontal: 20 }]}>
                        <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                            onPress={() => setAddDetailsBtn(!addDetailsBtn)}
                        >
                            <Text style={{ color: 'white' }}>+Add Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                            onPress={toggleModal}
                        >
                            <Text style={{ color: 'white' }}>Change Meal Type</Text>
                        </TouchableOpacity>
                    </View>
                    {addDetailsBtn ?
                        <ReactTextInput
                            style={[styles.textipstyle, styles.addressfield, { marginHorizontal: 30 }]}
                            onChangeText={(value) => { setDetailsInput(value) }}
                            backgroundColor='#FFFFFF'
                            value={DetailsInput}
                            placeholder="Add Details Here"
                            multiline={true}
                        /> : <View />}
                    <Modal
                        isVisible={isModalVisible}
                        style={[styles.modalStyle, { justifyContent: 'center' }]}>
                        <View style={{
                            flex: 0.2, backgroundColor: "#fff",
                            borderRadius: 10
                        }}>
                            <View style={[styles.rowDirection, { justifyContent: "space-between", marginHorizontal: 5 }]}>
                                <CheckBox
                                    center
                                    title="Fasting"
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    containerStyle={styles.checkboxContainer}
                                    checked={tabletCheck}
                                    onPress={tablet}
                                />
                                <CheckBox
                                    center
                                    title="Pre Meal"
                                    checkedIcon="dot-circle-o"
                                    containerStyle={styles.checkboxContainer}
                                    uncheckedIcon="circle-o"
                                    checked={capsuleCheck}
                                    onPress={capsule}
                                />
                                <CheckBox
                                    center
                                    title="Post Meal"
                                    checkedIcon="dot-circle-o"
                                    containerStyle={styles.checkboxContainer}
                                    uncheckedIcon="circle-o"
                                    checked={creamCheck}
                                    onPress={cream}
                                />
                            </View>
                            <View style={[styles.rowDirection, { justifyContent: "space-between", marginHorizontal: 10 }]}>
                                <CheckBox
                                    center
                                    title="3 A.M"
                                    checkedIcon="dot-circle-o"
                                    uncheckedIcon="circle-o"
                                    containerStyle={styles.checkboxContainer}
                                    checked={injectionCheck}
                                    onPress={injection}
                                />
                                {/* <CheckBox
                                    center
                                    title="5 A.M"
                                    checkedIcon="dot-circle-o"
                                    containerStyle={styles.checkboxContainer}
                                    uncheckedIcon="circle-o"
                                    checked={syrupCheck}
                                    onPress={syrup}
                                /> */}
                                <CheckBox
                                    center
                                    title="Random"
                                    checkedIcon="dot-circle-o"
                                    containerStyle={styles.checkboxContainer}
                                    uncheckedIcon="circle-o"
                                    checked={inhalerCheck}
                                    onPress={inhaler}
                                />
                            </View>
                            <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                                onPress={toggleModal}>
                                <Text style={{ color: 'white' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <View style={{ borderWidth: 2, marginHorizontal: 22, marginVertical: 15, padding: 25 }}>
                        <Text style={{}}>Book Your 1st Free Consultation with Health Coach</Text>
                        <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                            onPress={(e) => {
                                setcreateLeadModal(true);
                            }}>
                            <Text style={{ color: 'white' }}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', }}>How easy was to monitor your Blood Glucose level with Redo </Text>
                    <View style={[styles.rowDirection, { justifyContent: "space-between", marginHorizontal: 80 }]}>
                        <MaterialCommunityIcons
                            style={{ marginRight: 10 }}
                            name="emoticon-happy-outline"
                            size={39}
                            onPress={() => { FeedbackofUserInBloodsugar("Pos") }}
                            backgroundColor="#3b5998"
                        />
                        <MaterialCommunityIcons
                            style={{ marginRight: 10 }}
                            size={39}
                            onPress={() => setNegativeFeedModal(true)}
                            name="emoticon-sad-outline"
                            backgroundColor="#3b5998"
                        />
                    </View>
                    <Modal
                        isVisible={negativeFeedModal}
                        style={[styles.modalStyle, { justifyContent: 'center' }]}>
                        <View style={{
                            flex: 0.6, backgroundColor: "#fff",
                            borderRadius: 10, padding: 20
                        }}>
                            <Text style={{}}>{`Please tell us what made your experience \n disappointing while monitoring with us?`}</Text>

                            <CheckBox
                                center={false}
                                title="Disappointment with reading accuracy"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={styles.checkboxContainer}
                                checked={exp1stcheck}
                                onPress={() => setExp1stcheck(!exp1stcheck)}
                            />
                            <CheckBox
                                center={false}
                                title="Disappointment with complex monitoring journey"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={styles.checkboxContainer}
                                checked={exp2ndcheck}
                                onPress={() => setExp2ndcheck(!exp2ndcheck)}
                            />
                            <CheckBox
                                center={false}
                                title="Other"
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={styles.checkboxContainer}
                                checked={exp3rdcheck}
                                onPress={() => setExp3rdcheck(!exp3rdcheck)}
                            />
                            <Text>Tell us how can make your experience better in next time</Text>
                            <ReactTextInput
                                style={[styles.textipstyle, styles.addressfield, { marginHorizontal: 5 }]}
                                onChangeText={(value) => { setnegFedComment(value) }}
                                backgroundColor='#FFFFFF'
                                value={negFedComment}
                                placeholder="Enter Your feedback here"
                                multiline={true}
                            />
                            <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                                onPress={(e) => {
                                    setNegativeFeedModal(false)
                                    FeedbackofUserInBloodsugar("Neg");
                                }}>
                                <Text style={{ color: 'white' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal
                        isVisible={createLeadModal}
                        style={[styles.modalStyle, { justifyContent: 'center' }]}>
                        <View style={{
                            flex: 0.5, backgroundColor: "#fff",
                            borderRadius: 10, padding: 20
                        }}>
                            <Text style={{}}>Name</Text>
                            <ReactTextInput
                                style={[styles.textipstyle, styles.addressfield,]}
                                onChangeText={(value) => { setLeadName(value) }}
                                backgroundColor='#FFFFFF'
                                value={LeadName}
                                placeholder="Enter Your Name here"
                                multiline={true}
                            />
                            <Text>PhoneNumber</Text>
                            <ReactTextInput
                                style={[styles.textipstyle, styles.addressfield,]}
                                onChangeText={(value) => { setLeadEmail(value) }}
                                backgroundColor='#FFFFFF'
                                value={LeadEmail}
                                placeholder="Enter Your Phone Number here"
                                multiline={true}
                            />
                            <Text>Email</Text>
                            <ReactTextInput
                                style={[styles.textipstyle, styles.addressfield,]}
                                onChangeText={(value) => { setLeadPhno(value) }}
                                backgroundColor='#FFFFFF'
                                value={LeadPhno}
                                placeholder="Enter Your email here"
                                multiline={true}
                            />
                            <TouchableOpacity style={[styles.buttonStyle, { marginVertical: 15 }]}
                                onPress={(e) => {
                                    setcreateLeadModal(false);
                                    createbloodglucoseLead();
                                }}>
                                <Text style={{ color: 'white' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>}
        </SafeAreaView>
    )
}

const styles = create(reminderStyles)

const mapStateToProps = (state) => ({
    token: state.user.userData?.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
        createmanualbloodglucose: (body, token) => dispatch(ReminderAction.createmanualbloodglucose(body, token)),
        createbloodglucoseLead: (body, token) => dispatch(LogAction.createbloodglucoseLead(body, token)),
        FeedbackofUserInBloodsugar: (body, token) => dispatch(LogAction.FeedbackofUserInBloodsugar(body, token)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManualMonitoring);