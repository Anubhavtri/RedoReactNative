
import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import image1 from '../../staticData/assests/Banner1.png';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Actions from './CarouselAction';
import {connect} from 'react-redux';
import {Screens, navigate} from '../../helpers/Screens';
import Configs from '../../Configs';

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const exampleItems = [
  {
    image: '../../staticData/assests/Banner1.png',
  },
  {
    title: 'Item 2',
    text: 'Text 2',
  },
  {
    title: 'Item 3',
    text: 'Text 3',
  },
  {
    title: 'Item 4',
    text: 'Text 4',
  },
  {
    title: 'Item 5',
    text: 'Text 5',
  },
];



const CustomCarousel = props => {
  const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);

  const disableSpinner = () => setSpinnerVisibilty(false);

  useEffect(() => {
    props.getbannerdata(props.token, disableSpinner, props?.cityId?.cityId);
  }, []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(exampleItems);
  const ref = useRef(null);

  const exampleItems = props?.banner?.bannerData;
  const renderItem = useCallback(({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(Screens.PLAN_DETAIL, item.package_info);
        }}>
        <View
          style={{
            backgroundColor: 'floralwhite',
            borderRadius: 5,
            height: 160,
            minHeight: 120,
            justifyContent: 'center',
            backgroundColor: '#F5F5F5',
          }}>
          <Image
            style={{width: '100%', height: 162, resizeMode: 'stretch'}}
            source={{uri: `${item.images.image}`}}
          />
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SwiperFlatList
          paginationStyle={{
            height: 5, 
            width: 5, 
            backgroundColor: '#F5F5F5', 
            borderRadius: 5 , 
            marginTop:10, 
            marginBottom:5 , 
            // left:90
          }}
          paginationStyleItemActive={{height: 8, width: 8, backgroundColor: '#47CACC'  }}
          autoplay
          autoplayDelay={2}
          autoplayLoop
          paginationStyleItem={{ width:8, height:8, borderRadius:5,  }}
          showPagination
          >
          {props?.banner?.bannerData &&
            props?.banner?.bannerData.map(item  => (
              <TouchableOpacity  style={[styles.child]}
              onPress={()=>{
                {item?.youtube_link ? 
                  Linking.openURL(`${item?.youtube_link}`) :
                navigate(Screens.PLAN_DETAIL , item.package_info)
                 }
              }}
              >
                <Image style={styles.text} source={{uri: item.images.image}}
                />
              </TouchableOpacity>
            ))}
        </SwiperFlatList>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  token: state.user?.userData?.token,
  packageList: state.bestpackage?.bestPackages,
  cityId: state.city?.cityObj,
  banner: state?.banner,
});

const mapDispatchToProps = dispatch => {
  return {
    getbannerdata: (token, disableSpinner, cityId) => {
      dispatch(Actions.getbannerdata(token, disableSpinner, cityId));
    },
  };
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width: Configs.phoneWidth, justifyContent: 'center'},
  text: {
    width: Configs.phoneWidth - 40,
    height: 180,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius:5
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomCarousel);