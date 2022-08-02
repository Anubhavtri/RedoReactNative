import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Dimensions } from 'react-native'
import { create } from '../../helpers/PlatformSpecificStyles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ConfirmPasswordStyle from './PasswordStyle'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Actions from './PasswordAction';
import PasswordStyle from './PasswordStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Action from '../otpverification/OtpverificationActions'
import Eye from '../../staticData/svg/Eye.svg';
import validation from '../../Configs'

const { height, width } = Dimensions.get('screen')
const CELL_COUNT = 6;

export const Password = (props) => {

  const [pass, setPass] = useState(true)
  const [isSecure, setisSecure] = useState(true)
  const [isError, setisError] = useState("")
  const [newpassword, setnewpassword] = useState()
  const [confirmpassword, setconfirmpassword] = useState()
  const [value, setValue] = useState('');
  const [otpError, setOtpError] = useState()
  const [resetpassword, setresetpassword] = useState('reset_password')
  const [verify, setverify] = useState(false)
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [aloo, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [errorPassword, setErrorPassword] = useState(null);
  const _passwordValidate = password => {
    var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password.length == 0) {
      setErrorPassword('');
    }
    else if (!passwordRegex.test(password)) {
      setErrorPassword('*Please enter valid password. eg : gigiA@232');
    }
    else {
      setErrorPassword(null);
    }
  };

  const [errorConfPassword, seterrorConfPassword] = useState(null);
  const _passwordValidatee = password => {
    var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password.length == 0) {
      seterrorConfPassword('');
    }
    else if (!passwordRegex.test(password)) {
      seterrorConfPassword('*Please enter valid password. eg : gigiA@232');
    }
    else {
      seterrorConfPassword(null);
    }
  };

  console.log(props.UserDetails?.resetpass?.phone_number, props.phoneNumber, "password page");
  console.log(newpassword, confirmpassword, value, "all password data");

  const letsreset = () => {
    if (value && newpassword == confirmpassword) {
      props.NewPassword(props.UserDetails?.resetpass?.phone_number, newpassword, value);
    }else if(newpassword != confirmpassword){
      seterrorConfPassword('New Password and ConfirmPassword should be same');
    } 
    else {
      seterrorConfPassword('*Please Fill all Three Fields');
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
            <Text style={styles.loginTxt}>Forgot Password</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.scrollCon}>
            <View style={styles.otpCon}>
              <Text style={styles.subheading}>Enter the 6-digit Forgot Password OTP sent to</Text>
              <Text style={styles.subheading}>+91 {props.UserDetails?.resetpass?.phone_number}</Text>
            </View>
            <View style={styles.codeCon}>
              <View style={styles.otpCons}>
                <Text style={styles.subheading}>OTP</Text>
              </View>
              <CodeField
                ref={ref}
                {...aloo}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    required
                    key={index}
                    style={[[otpError ? styles.wrongcell : styles.cell], isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              <View style={styles.getotpCon}>
                <Text style={styles.text}>Didn't receive the code?  </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.ResetPassword(props.UserDetails?.resetpass?.phone_number, resetpassword)
                  }}
                >
                  <Text style={styles.terms}>Resend</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ipCon}>
              <View style={styles.txtCons}>
                <Text style={styles.txtPass}>New Password</Text>
              </View>
              <View style={styles.fieldCon}>

                <TextInput
                  style={styles.ipField}
                  secureTextEntry={pass}
                  placeholder='Enter Password'
                  onChangeText={(value) => {
                    setnewpassword(value),
                      _passwordValidate(value);
                  }}
                ></TextInput>
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
              <View style={styles.txtCon}>
                <Text style={styles.txtPass}>Confirm Password</Text>
              </View>
              <View style={styles.fieldCon}>
                <TextInput
                  style={styles.ipField}
                  secureTextEntry={isSecure}
                  placeholder='Enter Password'
                  onChangeText={(value) => {
                    setconfirmpassword(value)
                    _passwordValidatee(value);
                  }}
                ></TextInput>
                <TouchableOpacity onPress={() => setisSecure((prev) => !prev)}>
                  <Eye />
                </TouchableOpacity>
              </View>
              
              {errorConfPassword != null ? (
                <View style={styles.redCon}>
                  <Text style={styles.redTxt}>
                    {errorConfPassword}
                  </Text>
                </View>
              ) : null}
            </View>
            {value && newpassword && confirmpassword ? 
            <View style={styles.spaceCon}>
              {errorConfPassword && errorPassword ? null : 
              <TouchableOpacity
                style={styles.btnCons}
                onPress={() => {
                  letsreset()
                }}>
                <Text style={styles.btnTxt}>Continue</Text>
              </TouchableOpacity> }
            </View>  : null }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

let styles = create(PasswordStyle);

const mapStateToProps = (state) => ({
  UserDetails: state?.user,
  token: state?.user?.userData?.token,
  phoneNumber: state?.userLogin,
})

const mapDispatchToProps = (dispatch) => {
  return {
    NewPassword: (mobile, newpassword, otp) => {
      dispatch(Actions.NewPassword(mobile, newpassword, otp,));
    },
    ResetPassword: (phoneNumber, otp) => {
      dispatch(Action.ResetPassword(phoneNumber, otp));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);