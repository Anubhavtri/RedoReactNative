import React ,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, View, Text, TouchableOpacity , ScrollView , Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PackageStyle from './PackageStyle';
import Actions from './PackageActions'
import { create } from '../../helpers/PlatformSpecificStyles';
import { Screens,navigate } from '../../helpers/Screens'

const Package = (props) => {
    const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);
   
    
    const disableSpinner = () => setSpinnerVisibilty(false);

    useEffect(() => {
        setSpinnerVisibilty(true);
        props.fetchPackages(props.token, disableSpinner, props.cityObj.id)
    }, [props.cityId]);

    return (
         <ScrollView style={styles.packagelist}>
             {props.packageList.map((item)=>
             {
             return (
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{item.name}</Text>
                        </View>
                        <View style={styles.description}>
                            <Text>Inclusions</Text>
                            <Text>
                                {item.description}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.price}>
                                <Text style={styles.offerprice}>Rs {item.package_city_prices ? item.package_city_prices.package_price : item.package_price}</Text>
                                <Text style={styles.discountedprice}>{item.package_city_prices ? item.package_city_prices.offer_price : item.offer_price}/-</Text>
                            </View>
                            <View style={styles.discount}>
                                <View>
                                    <Text style={styles.save}>save 20%</Text></View>
                                <View>
                                    <Text style={styles.book}>
                                        <Pressable 
                                        onPress={() => {
                                            navigate(Screens.APPOINTMENT);
                                        }}
                                        >
                                        <Text style={{color:'white'}}>BOOK</Text>
                                        </Pressable>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    )
             })}
     </ScrollView>
    )
}

let styles = create(PackageStyle);

const mapStateToProps = (state) => ({
    token: state.user.userData?.token,
    packageList: state.packageData?.allPackages,
    cityId:state.city?.cityObj
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPackages: ( token, disableSpinner,cityId) => {
            dispatch(Actions.fetchPackages(token, disableSpinner,cityId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Package)
