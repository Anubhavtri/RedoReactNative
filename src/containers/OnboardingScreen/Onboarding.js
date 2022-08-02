import React, { useRef, useState, useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import OnboardingStyle from './OnboardingStyle';
import {
  View,
  Text,
  Button,
  Dimensions,
  Image,
  Animated,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import Paginator from './Paginator';
import { Screens } from '../../helpers/Screens';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const DATA = [
  {
    id: 1,
    image: require('../../staticData/assests/Landing1.png'),
    title: 'Free Home Sample Pick-up',
    content:
      'With all tests under one roof',
  },
  {
    id: 2,
    image: require('../../staticData/assests/Landing2.png'),
    title: 'Quick Reports',
    content: 'Access accurate reports on time',
  },
  {
    id: 3,
    image: require('../../staticData/assests/Landing3.png'),
    title: 'Free Call Consultation',
    content: 'Have a doubt? Clear it out.',
  },
  
  
];

export const onboarding = props => {
  

  const bg_image = {
    uri: 'https://redcliffelabsbackend.s3.amazonaws.com/media/gallary-file/None/5889e59b-0bbe-4438-8e15-286a1dedf7e5.png',
  };
  const white_logo = {
    uri: 'https://redcliffelabsbackend.s3.amazonaws.com/media/gallary-file/None/e0654bd3-e2cc-45e7-a709-aa8113abfd63.png',
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const slidesRef = useRef(null);

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollto = () => {
    if (currentIndex < DATA?.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigate(Screens.LOGIN_SCREEN);
    }
  };

  useEffect(() => {
    if (props.token) {
      props.navigation?.navigate(Screens.TAB)
    }
  }, [props?.UserDetails])

  hideNavigationBar();

  let styles = create(OnboardingStyle);

  return (
    <View style={{ flex: DATA?.length }}>
      <StatusBar backgroundColor="#0E3F6C" />
      <View style={styles.TopDiv}>
    <SwiperFlatList
      autoplay
      autoplayDelay={3}
      autoplayLoop
      index={2}
      showPagination
      paginationStyleItem={{ width:8, height:8, borderRadius:5 }}
      data={DATA}
      renderItem={({ item }) => (
        
        <ImageBackground
        source={bg_image}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.Maincontainer}>
          <View style={styles.TopInnerDivLogo}>
            <Image source={white_logo} style={styles.ImageLogoCss} />
          </View>
          <View style={styles.TopInnerDivImgContainer}>
            <Image source={item.image} style={styles.ImageCss} />
          </View>
          <View style={styles.TopInnerDivTextConatiner}>
            <View style={styles.TopInnerDivTextConatinerTitle}>
              <View style={styles.TitleDiv}>
                <Text style={styles.Title}>{item.title}</Text>
              </View>
            </View>
            <View style={styles.TopInnerDivTextConatinerContent}>
              <View style={styles.ContentDiv}>
                <Text style={styles.Content}>{item.content}</Text>
              </View>
            </View>
          </View>
          <View style={styles.TopInnerDivTextConatinerInner}></View>
        </View>
      </ImageBackground>
      )}
    />
  </View>
      <View style={styles.BottomDiv}>
        <View style={styles.BottomDivTextContianer}>
          <View style={styles.BottomDivTextContianerLet}>
            <Text style={styles.BottomText}>
              Let's get started!
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation?.navigate(Screens.LOGIN_SCREEN)
              }}
              style={styles.BottomDivButtonInner}>
              <Text style={styles.NineOne}>+91</Text>
              <View style={styles.VerticleLine}></View>
              <Text style={styles.EnterMo}>Enter Mobile Number</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.BottomDivInput}></View>
      </View>
    </View>
  );
};  

const mapStateToProps = state => ({
  UserDetails: state?.user?.userData,
  token: state?.user?.userData?.token,
});

export default connect(mapStateToProps)(onboarding);