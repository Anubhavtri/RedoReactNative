import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import Actions from './NewUserPasswordAction'
import { create } from 'lodash'
import NewUserPasswordStyle from './NewUserPasswordStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Eye from '../../staticData/svg/Eye.svg';
import { navigate } from '../../helpers/Screens';

export const NewUserPassword = (props) => {

    console.log(props.UserDetails?.resetpass?.phone_number, "new user password")

    const [oldpassowrd, setoldpassowrd] = useState('01pass1234')
    const [hide, setHide] = useState(false)
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [isError, setisError] = useState("")
    const [isSecure, setisSecure] = useState(true)
    const [pass, setPass] = useState(true)
    const [Password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);
    const _passwordValidate = password => {
        var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (password.length == 0) {
            setErrorPassword('');
        } else if (!passwordRegex.test(password)) {
            setErrorPassword('*Please enter valid password.');
        } else {
            setErrorPassword(null);
        }
    };

    const [ConfirmerrorPassword, setConfirmerrorPassword] = useState(null);
    const _passwordValidatee = password => {
        var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (password.length == 0) {
            setConfirmerrorPassword('');
        } else if (!passwordRegex.test(password)) {
            setConfirmerrorPassword('*Please enter valid password.');
        } else {
            setConfirmerrorPassword(null);
        }
    };

    const checkValidation = (e) => {
        setConfirmPassword(e.target.value)
        if (Password != ConfirmPassword) {
            setisError("Confirm password should match with password")
        }
        else {
            setisError("Confirm password match")
        }
    };

    const newpass = (passone, passtow) => {
        if (passone == passtow) {
            // alert("lets do it")
            props.NewUserPassword(oldpassowrd, passone, passtow, props.token)
        } else {
            alert("password is not same as confirmpassword")
        }
    }


    return (

        <SafeAreaView>
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.headerCon}>
                        <MaterialCommunityIcons
                            onPress={(e) => { props.navigation.goBack() }}
                            style={{ fontSize: 25, }}
                            name="arrow-left"
                            backgroundColor="#3b5998"
                        />
                        <Text style={styles.loginTxt}>Set Password</Text>
                    </View>
                </View>
                <View style={styles.ipCon}>
                    <View style={styles.txtCon}>
                        <Text style={styles.txtPass}>New Password</Text>
                    </View>
                    <View style={styles.fieldCon}>
                        <TextInput
                            style={styles.ipField}
                            placeholder='Enter Password'
                            secureTextEntry={pass}
                            value={Password}
                            enablesReturnKeyAutomatically
                            maxLength={50}
                            onChange={(e) => setPassword(e.target.value)}
                            onChangeText={e => {
                                setPassword(e), _passwordValidate(e);
                            }}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setPass((prev) => !prev)}>
                            <Eye />
                        </TouchableOpacity>
                    </View>
                    {errorPassword != null ? (
                        <View style={styles.redCon}>
                            <Text style={styles.redTxt}>
                                {errorPassword}
                            </Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.ipCon}>
                    <View style={styles.txtCons}>
                        <Text style={styles.txtPass}>Confirm Password</Text>
                    </View>
                    <View style={styles.fieldCon}>
                        <TextInput
                            style={styles.ipField}
                            placeholder='Enter Password'
                            secureTextEntry={isSecure}
                            value={ConfirmPassword}
                            maxLength={50}
                            enablesReturnKeyAutomatically
                            // onChange={(e) => checkValidation(e)}
                            onChangeText={e => {
                                setConfirmPassword(e);
                                _passwordValidatee(e)
                            }}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={() => setisSecure((prev) => !prev)}>
                            <Eye />
                        </TouchableOpacity>
                    </View>
                    {ConfirmerrorPassword != null ? (
                        <View style={styles.redCon}>
                            <Text style={styles.redTxt}>
                                {ConfirmerrorPassword}
                            </Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.spaceCon}>
                    <TouchableOpacity onPress={() => {
                        setHide(false)
                        newpass(Password, ConfirmPassword)
                    }
                    }
                        style={styles.btnCon}>
                        <Text style={styles.btnTxt}>Continue</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = create(NewUserPasswordStyle)


const mapStateToProps = (state) => ({
    UserDetails: state?.user,
    token: state?.user?.userData?.token,
    phoneNumber: state?.userLogin,
})

const mapDispatchToProps = (dispatch) => {
    return {
        NewUserPassword: (oldpass, pass, passtwo, token) => {
            dispatch(Actions.NewUserPassword(oldpass, pass, passtwo, token));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserPassword);