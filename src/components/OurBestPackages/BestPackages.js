import React, {useState, useCallback, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import Actions from './BestPackageAction';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Screens, navigate} from '../../helpers/Screens';
import ShoppingCartWhite from '../../staticData/svg/shopping-cart_white.svg';
import ShoppingCartRed from '../../staticData/svg/shopping-cart_red.svg';
import Configs from '../../Configs';
import AllpackageActions from '../Packages/PackageActions'

import Constants from '../../staticData/Constants';
import DefaultPrimarySettings from '../../settings/styles/DefaultPrimarySettings';



const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


export const BestPackages = props => {
  const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const [selectedPackage, setSelectedPackage] = useState([])
  const disableSpinner = () => setSpinnerVisibilty(false);
  const [selectedPackageId,setSelectedPackageId] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef(null);

  const getSelPackID = () => {
    let array =[]
    selectedPackage.forEach(item => {
      array.push(item?.package?.id)
    });
    setSelectedPackageId(array)
  }
  
  useEffect(() => {
    getSelPackID()
  }, [selectedPackage])

  useEffect(() => {
    setSelectedPackage(props?.PackageCart)
  }, [props?.PackageCart])

  useEffect(() => {
    setSpinnerVisibilty(true);
    props.getCart(props?.cityId?.cityid,props?.token)
    props.fetchBestPackages(props?.token, disableSpinner, props?.cityObj?.id);
  }, []);



  const Item = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        navigate(Screens.PLAN_DETAIL, item);
      }}
      key={index}
      style={styles.item}>
      <View style={styles.heading}>
        <Text
          style={[
            {
              fontSize: 14,
              color: DefaultPrimarySettings.textColor.tertiaryHeaderTextColor,
            },
            Constants.fontType.jBold,
          ]}>
          {item?.name}
        </Text>
        <TouchableOpacity onPress={() => { 
          props.postPackageToCart(item?.id,props?.token)
          setTimeout(() => {
            props.getCart(props?.cityId?.cityid,props?.token)
          }, 700);
          
          }}>
          {selectedPackageId.includes(item.id) ? <ShoppingCartRed/> : <ShoppingCartWhite/> }
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.inclusions}>
        <Text
          style={[
            {color: '#707070', fontSize: 12, paddingBottom: 5},
            Constants.fontType.jSemi_bold,
          ]}>
          Inclusion : {item?.parameter} Tests
        </Text>
        <Text
          style={[{color: '#707070', fontSize: 12}, Constants.fontType.jRegular]}>
          {item?.description}
        </Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.priceing}>
        <View style={styles.leftpriceing}>
          <Text
            style={[
              {
                fontSize: 12,
                color: '#E5184E',
                textDecorationLine: 'line-through',
              },
              Constants.fontType.jRegular,
            ]}>
            Rs{' '}
            {item?.package_city_prices
              ? item?.package_city_prices?.package_price
              : item?.package_price}
          </Text>
          <Text
            style={[
              {
                fontSize: 14,
                color: '#205072',
                marginLeft: '5%',
              },
              Constants.fontType.jSemi_bold,
            ]}>
            Rs{' '}
            {item?.package_city_prices
              ? item?.package_city_prices?.offer_price
              : item?.offer_price}
            /-
          </Text> 
        </View>
        <View style={styles.rightpriceing}>
          <Text style={[styles.off, Constants.fontType.jMedium]}>
            Get{' '}
            {Math.floor(
              (((item.package_city_prices
                ? item.package_city_prices.package_price
                : item.package_price) -
                (item.package_city_prices
                  ? item.package_city_prices.offer_price
                  : item.offer_price)) /
                (item.package_city_prices
                  ? item.package_city_prices.package_price
                  : item.package_price)) *
                100,
            )}{' '}
            % OFF
          </Text>
          <Pressable
            onPress={() => {
              props.postPackageToCart(item.id,props.token),
              setTimeout(() => {
                props.getCart(props.cityId?.cityid,props.token)
              }, 700);
              navigate(Screens.MY_CART, item);
            }}
            style={styles.button}>
            <Text style={[styles.booktext, Constants.fontType.jSemi_bold]}>
              BOOK
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  const renderItem = ({item}) => {
    return <Item item={item} />;
  };
  
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={{}}
        data={props?.packageList}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        horizontal={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  item: {
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderColor: '#A2A2A2',
    
    marginVertical: 15,
    
    flex: 1,
    width: Configs.phoneWidth - 40,
    height: 200,
    borderRadius: 5,
    marginHorizontal: 20,

    
  },
  title: {
    fontSize: 32,
  },
  heading: {
    flexDirection: 'row',
    
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 16,
  },
  priceing: {
    flexDirection: 'row',
    
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  inclusions: {
    height: 100,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    marginHorizontal: 16,
  },
  leftpriceing: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rightpriceing: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    minHeight: 30,
    alignItems: 'center',
  },
  off: {
    fontSize: 10,
    color: '#707070',
    backgroundColor: '#FFEFE9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#E5184E',
    minHeight: 30,
    justifyContent: 'center',
    borderRadius: 5,
  },
  booktext: {
    color: '#FBFBFB',
    fontSize: 14,
    paddingHorizontal: 15,
  },
  separator: {
    backgroundColor: '#A2A2A2',
    height: 0.5,
  },
});

const mapStateToProps = state => ({
  token: state.user?.userData?.token,
  packageList: state.bestpackage?.bestPackages,
  PackageCart : state?.packageData?.cartpackages,
  cityId: state.city?.cityObj,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchBestPackages: (token, disableSpinner, cityId) => {
      dispatch(Actions.fetchBestPackages(token, disableSpinner, cityId));
    },
    postPackageToCart: (packID,token) => {
      dispatch(Actions.postPackageToCart(packID,token));
    },
    getCart: (cityId,token)=>{
      dispatch(AllpackageActions.getCart(cityId,token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BestPackages);
