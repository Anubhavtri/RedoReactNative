
import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { create } from '../../../helpers/PlatformSpecificStyles';
import { navigate, resetScreen, Screens } from '../../../helpers/Screens';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { SafeAreaView } from 'react-native-safe-area-context';
import locations from '../../../helpers/locations';
import Api from '../../../helpers/api';

const { height, width } = Dimensions.get('window');

const DATA = [
  {
    id: 1,
    image: require('../../../staticData/assests/Group1.png'),
    title: 'Goals',
    content: 'Enter your basic medical details to set clinically recommended goals.',
  },
  {
    id: 2,
    image: require('../../../staticData/assests/Group2.png'),
    title: 'Health Data',
    content: 'Log & track all your medical data. Unlock personal insights towords better lifestyle.',
  },
  {
    id: 3,
    image: require('../../../staticData/assests/Group3.png'),
    title: 'Better You',
    content: 'Get all the help you need to stay on track towards a healthier, happier you.',
  },


];

export const onboarding = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.maincontainers}>

        <SwiperFlatList
          autoplay
          autoplayDelay={3}
          autoplayLoop
          index={2}
          showPagination
          paginationStyle={styles.upSet}
          paginationStyleItem={{ width: 8, height: 8, borderRadius: 5 }}
          data={DATA}
          renderItem={({ item }) => (
            <ImageBackground
              source={require('../../../staticData/assests/Splash.png')}
              resizeMode='stretch'
              style={styles.imageStyle}>
              <View style={styles.Maincontainer}>
                <View style={styles.logoCon}>
                  <Image source={require('../../../staticData/assests/RedO.png')} style={styles.ImageLogoCss} />
                </View>
                <View style={styles.innImage}>
                  <Image source={item.image} style={styles.ImageCss}
                    resizeMode='contain'
                  />
                </View>
                <View style={styles.TopInnerDivTextConatiner}>
                  <View style={styles.TopInnerDivTextConatinerTitle}>
                    <View style={styles.TitleDiv}>
                      <Text style={styles.Title}>{item.title}</Text>
                    </View>
                  </View>
                  <View style={styles.TopInnerDivTextConatinerContent}>
                    <View style={styles.contentCon}>
                      <Text style={styles.contentTxt}>{item.content}</Text>
                    </View>
                    <View style={styles.fixCon}>
                      <TouchableOpacity onPress={() => { resetScreen(Screens.REDO_TAB) }}>
                        <Text style={styles.skipTxt}>Skip</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { navigate(Screens.REDO_PERSONAL_DETAILS,{parentId : ""} ) }}>
                        <Text style={styles.nextTxt}>Next</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

              </View>
            </ImageBackground>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  UserDetails: state?.user?.userData,
  token: state?.user?.userData?.token,
});
const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(onboarding);

const styles = StyleSheet.create({
  Maincontainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#174c7d'

  },
  maincontainers: {
    height: height / 1,
    width: width / 1,


  },
  imageStyle: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#174C7D'
  },
  TopDiv: {
    height: height / 1,
    width: width / 1,
    // backgroundColor: 'cyan'
  },
  upSet: {
    height: height / 15,
    width: width / 1,
    // backgroundColor: 'yellow'
  },
  logoCon: {
    height: height / 8,
    width: width / 1,
    // backgroundColor: 'yellow',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  innImage: {
    height: height / 2.5,
    width: width / 1,
    // backgroundColor: 'cyan',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ImageCss: {
    height: height / 3,
    width: width / 1,

  },
  TitleDiv: {
    height: height / 12,
    width: width / 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan'
  },
  Title: {
    fontFamily: 'Jost-SemiBold',
    fontSize: 20,
    color: '#FFFFFF'
  },
  fixCon: {
    height: height / 5.2,
    width: width / 1.25,
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'center'
  },
  skipTxt: {
    color: '#A2A2A2',
    fontFamily: "Jost-Medium",
    fontSize: 17
  },
  nextTxt: {
    color: '#FFFFFF',
    fontFamily: "Jost-Medium",
    fontSize: 17
  },
  contentCon: {
    height: height / 7,
    width: width / 1.3,
    // backgroundColor: 'cyan',
    alignSelf: 'center',

  },
  contentTxt: {
    color: '#FFFFFF',
    fontFamily: "Jost-Regular",
    fontSize: 18,
    textAlign: 'center'
  }
}) 