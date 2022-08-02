import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AllpackageStyles from './AllpackageStyles';
import {create} from '../../helpers/PlatformSpecificStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Actions from '../../components/Packages/PackageActions';
import {Screens, navigate} from '../../helpers/Screens';
import Feather from 'react-native-vector-icons/Feather';
import {TextInput} from 'react-native-gesture-handler';
import Constants from '../../staticData/Constants';
import PackageListItem from '../../components/OurBestPackages/PackagesListItem';
import Cart from '../../staticData/svg/Maincart.svg';

const packages = [
  {
    packageName: Constants.allPackage,
    packageType: '',
  },
  {
    packageName: Constants.bestPackage,
    packageType: true,
  },
  {
    packageName: Constants.covidPackage,
    packageType: 'covid',
  },
  {
    packageName: Constants.fullBodyPackage,
    packageType: 'full body',
  },
];

export const Allpackage = props => {
  const searchTextFromHomePage = props?.route?.params?.customParam?.search;
  const from = props?.route?.params?.customParam?.from;
  const best = props?.route?.params?.customParam?.best;
  const pkgIndex = props?.route?.params?.customParam?.packageIndex ?? 0;
  const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [bestPack, setBestPack] = useState(false);
  const [packageIndex, setPackageIndex] = useState(-1);
  const [SelectedPackage, setselectedPackage] = useState([])
  const [selectedPackageId,setSelectedPackageId] = useState([]);
  

  const disableSpinner = () => setSpinnerVisibilty(false);


 const getCartItem = () => {
  props.getCart(props?.cityId?.cityid,props?.token) 
}

const getSelPackID = () => {
  let array =[]
  SelectedPackage?.forEach(item => {
    array.push(item.package.id)
  });
  setSelectedPackageId(array)
}

useEffect(() => {
  getSelPackID()
}, [SelectedPackage])

  useEffect(() => {
    if (from == 'mainpageTabs') {
      setSearchText(searchTextFromHomePage); 
      setBestPack(best);
      setPackageIndex(pkgIndex);
  } else if (from == 'notmainpage') {
      setSearchText('');
      setBestPack(best);
      setPackageIndex(pkgIndex);
    }
  }, [searchTextFromHomePage, from, best, pkgIndex]);

  useEffect(() => {
    setSpinnerVisibilty(true);
    props.fetchPackages(
      props.token,
      disableSpinner,
      props?.cityId?.cityid,
      searchText,
      bestPack,
    );
  }, [searchText, bestPack]);

  useEffect(() => {
    setselectedPackage(props?.PackageCart)
  }, [props?.PackageCart])

  useEffect(() => {
    props.getCart(props?.cityId?.cityid,props?.token)
  },[])
  let noofcounts = props?.PackageCart.length

  return (
    <View style={styles.container}>
      <View
        style={{
          minHeight: 80,
          flexDirection: 'row',
          alignItems: 'center',
          padding:13,
        }}>
        <MaterialCommunityIcons
          onPress={e => {
            props.navigation.goBack();
          }}
          style={{fontSize: 25, marginRight: 10}}
          name="arrow-left"
          backgroundColor="#3b5998"
        />
        <Text style={[styles.text, Constants.fontType.jMedium]}>
          Popular Packages
        </Text>
        <TouchableOpacity
            style={{marginLeft:'30%'}}
            onPress={() => {
              setTimeout(() => {
                props.getCart(props?.cityId?.cityid,props?.token)
              }, 700);
              navigate(Screens.MY_CART);8750873038
              
            }}
            >
              <View style={{backgroundColor:'red' , borderRadius:50 , justifyContent:'center' , alignItems:'center' , position:'absolute' , zIndex:2 , marginLeft:26  , minWidth:20}}>
              <Text style={{color:'white' , fontSize:15}}>{noofcounts}</Text>
              </View>
              <View style={{marginTop:5 , marginRight:15}}>
              <Cart />
              </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexGrow: 1, minHeight: 70, maxHeight: 80}}>
        <View
          style={{
            backgroundColor: 'white',
            flexGrow: 1,
            flex: 1,
            flexDirection: 'row',
            padding: '3%',
            borderRadius: 5,
          }}>
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              borderColor: '#A2A2A2',
              borderWidth: 0.2,
              borderRadius: 5,
            }}>
            <View
              style={{
                flex: 1,
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather
                onPress={e => {
                  props.navigation.goBack();
                }}
                style={{fontSize: 25, color: '#E5184E', fontWeight: '500'}}
                name="search"
                backgroundColor="#3b5998"
              />
            </View>
            <View style={{flex: 1, flexGrow: 6, justifyContent: 'center'}}>
              <TextInput
                style={[styles.search, Constants.fontType.jRegular]}
                value={searchText}
                onChangeText={value => {
                  setSearchText(value);
                }}
                placeholder="Search Tests, Package, Body Areas.."
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.filter}>
        <FlatList
          data={packages}
          contentContainerStyle={{height: 40}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={{
                marginHorizontal: 20,
                borderBottomWidth: 2,
                borderBottomColor: packageIndex == index ? '#205072' : '#0000',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setPackageIndex(index);
                  if(index == 1){
                    props.fetchPackages(
                      props.token,
                      disableSpinner,
                      props?.cityId?.cityid,
                      '',
                      item.packageType
                    );
                  }else {
                    props.fetchPackages(
                      props.token,
                      disableSpinner,
                      props?.cityId?.cityid,
                      item?.packageType,
                    );
                  }
                 
                }}>
                <Text
                  style={[
                    {
                      fontSize: 14,
                      color: packageIndex == index ? '#205072' : '#A2A2A2',
                      marginTop: 10,
                    },
                    Constants.fontType.jMedium,
                  ]}>
                  {item.packageName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        data={props?.packageList}
        renderItem={({item}) => <PackageListItem SelectedPackage={SelectedPackage} getCart={getCartItem} selectedPackageId={selectedPackageId} item={item} />}
      />
    </View>
  );
};

let styles = create(AllpackageStyles);

const mapStateToProps = state => ({
  token: state.user?.userData?.token,
  packageList: state.packageData?.allPackages,
  cityId: state.city?.cityObj,
  PackageCart : state?.packageData?.cartpackages
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPackages: (token, disableSpinner, cityId, search, best) => {
      dispatch(
        Actions.fetchPackages(token, disableSpinner, cityId, search, best),
      );
    },
    getCart: (cityId,token)=>{
      dispatch(Actions.getCart(cityId,token))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Allpackage);
