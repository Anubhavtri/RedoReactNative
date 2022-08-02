import React, { useState,useEffect } from 'react'
import { Dimensions, StyleSheet, Text, View ,FlatList,BackHandler} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('screen');
import Spinner from 'react-native-loading-spinner-overlay';
import {TextInput} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import locations from "../../../helpers/locations";
import { connect } from 'react-redux';
import { navigate, resetScreen, Screens } from '../../../helpers/Screens';
import { GETApi, POSTApi } from "../../../app/ApiCall.js";
import Constants from '../../../staticData/Constants';
function getFormated(item) {
    var  tolal = 0;
    tolal= (Math.round(item * 100) / 100).toFixed(2);;
    return tolal;
  }
export const LogFood = (props) => {
      const item = props?.route?.params?.customParam;
      console.log("item : "+JSON.stringify(item))
    const [title, setTitle] = useState(item?.tags)
    const [userId, setUserId] = useState(item?.userId)
    const [mealtype, setMealtypes] = useState(item?.mealtypes)
    const [DateSelect, setDateSelect] = useState(item?.cureentDate);
    const [spinnerShow, setSpinnerShow] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [foodList, setFoodList] = useState([]);
   useEffect(() => {
    }, [])
   

    const SearchFoodApi = async(value)=>{
        setSearchText(value)
        console.log("value : "+value)
        if(value.length >1){
            setSpinnerShow(true)
            var getResult = await GETApi(locations.SEARCH_FOOD+value,props?.token)
            if(getResult.error){
             setSpinnerShow(false)
              setFoodList([])
            }else {
             setSpinnerShow(false)
             setFoodList(getResult?.data.food)
            }
        }else {
            setSpinnerShow(false)
             setFoodList([])
        }
      
    }
    const backAction = () => {
        navigate(Screens.ADDNUTRITION)
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
             <Spinner visible={spinnerShow}></Spinner>
                <View style={styles.secCon}>
                    <View style={styles.arrowCon}>
                        <MaterialCommunityIcons
                            onPress={(e) => { navigate(Screens.ADDNUTRITION)}}
                            style={{ fontSize: 24, color: '#707070' }}
                            name="arrow-left"
                        />
                    </View>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>Log {title}</Text>
                    </View>
                   
                </View>
                <ScrollView >
                <View style={{flexDirection : 'column',paddingBottom:200}}>
                 <View style={{flexDirection : 'row',width :"90%",height : 50,alignSelf : 'center',marginTop :10, justifyContent: 'center',
              flexDirection: 'row',
              borderColor: '#A2A2A2',
              borderWidth: 0.2,
              borderRadius: 5,}}>
                   <View
          style={{
           width:"10%",height :"100%",alignItems : 'center',justifyContent : 'center'
          }}>
                      <Feather
                style={{fontSize: 18, color: '#E5184E', fontWeight: '500'}}
                name="search"
                backgroundColor="#3b5998"
              />
              </View>
                <View style={{width :"90%",height :"100%", justifyContent: 'center'}}>
              <TextInput
                style={{width :"100%",height :"100%"}}
                value={searchText}
                onChangeText={value => {
                    SearchFoodApi(value)
                }}
                placeholder="Search for a food"
              />
            </View>
                     </View>  
                     <View   style={{width :"85%",alignSelf : 'center'}}>
                        <Text style={{fontSize : 16,color : 'black',marginTop :15,marginBottom :15} }>Results</Text>
                        </View>
                 {searchText.length >1 && (   <FlatList
                    data={foodList}
                    style={{marginTop :20,width :"85%",alignSelf : 'center'}}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, intex }) => (
                        <TouchableOpacity onPress={() => navigate(Screens.FOODDETAILS,{tags: item.food_name,userId: userId ,idd :item.food_id,cureentDate : DateSelect,mealtypes : mealtype})} style={{flexDirection : 'column',width : "100%"}}>
                        <Text style={{fontSize : 16,color : 'black',marginTop :10,marginBottom :10} }>{item.food_name}</Text>
                        <View style={{height :1,width :"100%",backgroundColor : 'black',} }/>
                        </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    )} 
     
      
                </View>
                </ScrollView>
               
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    token: state.user.userData?.token,
  });
  
  const mapDispatchToProps = dispatch => {
      return{}
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LogFood);

const styles = StyleSheet.create({
    mainContainer: {
        height: height / 1,
        width: width / 1,
        backgroundColor: '#FFFFFF',
    },
    secCon: {
        height: height / 13,
        width: width / 1,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        // backgroundColor: 'green',
        alignItems: 'center'
    },
    arrowCon: {
        height: height / 13,
        width: width / 7,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
    },
    headCon: {
        height: height / 13,
        width: width / 1.4,
        // backgroundColor: 'blue',
        justifyContent: 'center',
    },
    txtHead: {
        color: '#707070',
        fontSize: 20,
        fontFamily: 'Jost-Medium',
    },
  
})
