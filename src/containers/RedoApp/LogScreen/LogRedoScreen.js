
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native-safe-area-context'
import { create } from '../../../helpers/PlatformSpecificStyles'
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontistIcon from 'react-native-vector-icons/Fontisto';
import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Screens, navigate, resetScreen } from '../../../helpers/Screens'
import RedoStyles from '../RedoStyles'
const LogRedoScreen = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);

  };

  const emptyfunction = () => {

  }
  return (
    <SafeAreaView style={{ alignItems: 'center', justifyContent: 'flex-end',flex:1 }}>
        <View style={{
         backgroundColor: "#fff",justifyContent:'flex-end',
        borderTopLeftRadius: 15, borderTopRightRadius: 15,
      }}>
        <View style={[styles.rowDirection, { alignItems: "center", marginTop: 30 }]}>
          <View>
            <MaterialCommunityIcons
              onPress={emptyfunction}
              style={{ marginRight: 15, marginLeft: 25 }}
              size={65}
              name="run"
              backgroundColor="#3b5998"
            />
            <Text style={{ marginRight: 15, marginLeft: 25 }}>Activity</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              onPress={() => navigate(Screens.MANUAL_BS_MONITORING_REM_SCREEN)}
              style={{ marginRight: 15, marginLeft: 25 }}
              size={65}
              name="blood-bag"
              backgroundColor="#3b5998"
            />
            <Text style={{ marginRight: 15, marginLeft: 25 }}>Blood Sugar</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              onPress={()=> navigate(Screens.MEAL)}
              style={{ marginRight: 15, marginLeft: 25 }}
              size={65}
              name="coffee"
              backgroundColor="#3b5998"
            />
            <Text style={{ marginRight: 15, marginLeft: 39 }}>Meal</Text>
          </View>
        </View>
        <View style={[styles.rowDirection, { alignItems: "center", marginTop: 30 }]}>
          <View>
            <MaterialCommunityIcons
              onPress={
                emptyfunction
              }
              style={{ marginRight: 15, marginLeft: 25 }}
              size={65}
              name="blood-bag"
              backgroundColor="#3b5998"
            />
            <Text style={{ marginRight: 7, marginLeft: 25 }}>Blood Pressure</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              onPress={emptyfunction}
              style={{ marginRight: 15, marginLeft: 25 }}
              size={65}
              name="thermostat-box"
              backgroundColor="#3b5998"
            />
            <Text style={{ marginRight: 15, marginLeft: 28 }}>Weight</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              onPress={emptyfunction}
              style={{ marginRight: 15, marginLeft: 25 }}
              size={65}
              name="cup-water"
              backgroundColor="#3b5998"
            />
            <Text style={{ marginRight: 15, marginLeft: 39 }}>Water</Text>
          </View>
        </View>
        </View>
    </SafeAreaView>
  )
}

export default LogRedoScreen

let styles = create(RedoStyles);