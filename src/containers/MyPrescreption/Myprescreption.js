import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { Dimensions, Text, PermissionsAndroid, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Eyes from '../../staticData/svg/Eyes.svg';
import Myprescreptionstyle from './Myprescreptionstyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import Actions from './MyprescreptionAction'
import { ScrollView } from 'react-native-gesture-handler';
import fetch_blob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Screens, navigate } from '../../helpers/Screens';
import moment from 'moment';
const { height, width } = Dimensions.get('screen')



export const Myprescreption = (props) => {

  const [tine , settine] = useState()

  // useEffect(() => {
  //   props.getPrescreption(props.token)
  // }, [])

  const [prescreption, setprescreption] = useState(props?.Myprescreption?.prescreptiondetails)

  console.log(props?.Myprescreption, "my prescreption page")

  
  

  return (
    <SafeAreaView style={styles.safeCon}>

      <View style={styles.mainContainer}>

        <View style={styles.topContainer}>

          <MaterialCommunityIcons
            onPress={(e) => { props.navigation.goBack() }}
            style={{
              fontSize: 25, color: '#707070',
              paddingHorizontal: 18
            }}
            name="arrow-left"
            backgroundColor="#3b5998"
          />
          <Text style={styles.loginTxts}>My Prescription</Text>

        </View>
        <ScrollView>
          {props?.Myprescreption ?
            <View style={{}}>
              {props?.Myprescreption && props?.Myprescreption?.prescreptiondetails?.map((item, val) => {
                console.log( moment(new Date(item?.updated_at)).format("DD/MM/YYYY HH:MM:SS"),"<<<")
                return (
                  <View style={styles.desCon}>
                    <View style={styles.desCons}>
                      <View style={styles.conTainer}>
                        <Text style={styles.presTxt}>Prescription {val + 1}</Text>
                      </View>
                      <View style={styles.conTainers}>
                        <Text style={styles.presTxt}>PDF</Text>
                      </View>
                      <View style={styles.conTainerss}>
                        {/* <View style={styles.boxCon}>

                          </View> */}
                      </View>
                      <View style={styles.conTain}>
                        {item?.base64file ?
                          <View style={styles.boxCon}>
                            <AntDesign
                              onPress={() => {
                                try {
                                  if (item?.base64file) {

                                    const fullBase64string = item?.base64file
                                    const fullBase64stringarray = fullBase64string.split(',')
                                    const base64str = fullBase64stringarray[1]
                                    console.log("alllllllllllllllllllllllllllllll", base64str)
                                    // const source = { uri: `data:application/pdf;base64,${Base64string}` }
                                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                                    const fs = fetch_blob.fs
                                    const dirs = fetch_blob.fs.dirs
                                    const file_path = dirs.DownloadDir + `/${item.name}.pdf`
                                    fetch_blob.android.addCompleteDownload({
                                      title: `${item.name}.pdf`,
                                      description: 'Download complete',
                                      mime: 'application/pdf',
                                      path: file_path,
                                      showNotification: true,
                                    }
                                    )
                                    RNFS.writeFile(file_path, base64str, 'base64').then(res => {
                                      alert(`Downloaded at ${file_path}`)
                                    }).catch(error => {
                                      alert("error hhhhhhhhhhhhh", error)
                                      console.log(error, "ALLLLLLLLEEEEEEEEEEEEEEEE")
                                    })
                                    // console.log(`Downloaded at ${file_path}`)
                                    console.log("entered")
                                    // .catch((error) => { 
                                    //   alert((error)); 
                                    // }); 
                                  } else if (item?.base64file) {
                                    alert(item?.base64file, "not working")
                                  } else if (data.message) {
                                    alert("Report is not available")
                                    // alert(data.message)
                                  }
                                } catch (err) {
                                  console.log("8776", err)
                                }
                              }}
                              name="arrowdown"
                              style={styles.loginTxt}
                            />
                          </View> : null}
                      </View>
                    </View>
                    <View style={styles.dateCon}>
                      <Text style={styles.dateTxt}>Last Updated on : { moment(new Date(item?.updated_at)).format("DD/MM/YYYY HH:MM:SS")}</Text>
                    </View>
                  </View>
                )
              })}
            </View> : null
          }
          {/* {props?.Myprescreption && prescreption?.map((item,val) => {
          return (
          )
        })} */}

          <View style={styles.upload}>
            <TouchableOpacity style={styles.uploadCon}
              onPress={() => {
                navigate(Screens.UPLOAD_PRESCREPTION)
              }}
            >
              <Text style={styles.uploadTxt}>Upload Prescription</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
};

const styles = create(Myprescreptionstyle)

const mapStateToProps = (state) => ({
  token: state.user.userData?.token,
  Myprescreption: state.MyPrescreptionDetailsReducer
})

const mapDispatchToProps = (dispatch) => {
  return {
    getPrescreption: (token) => dispatch(Actions.getPrescreption(token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Myprescreption);

