import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { create } from 'lodash';
import { Dimensions, TouchableOpacity, Text, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RedCashStyle from './RedCashStyle';
import Actions from './RedCashAction'
import moment from 'moment';

const { height, width } = Dimensions.get('screen')

export const RedCash = (props) => {

    const [Redcash, setRedcash] = useState(props?.Redcash?.redCash)
    const [redcashdetails , setredcashdetails] = useState(props?.Redcash?.redCashDetails?.results)

    console.log(props?.Redcash?.redCashDetails?.results, "Red cash details 86868686987679676")

    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <View style={styles.secCon}>
                    <TouchableOpacity >
                        <View style={styles.arrowCon}>
                            <MaterialCommunityIcons
                                onPress={(e) => { props.navigation.goBack() }}
                                style={{ fontSize: 24, color: '#707070' }}
                                name="arrow-left"
                                backgroundColor="#3b5998"
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.headCon}>
                        <Text style={styles.txtHead}>My Redcash</Text>
                    </View>
                </View>
                <View style={styles.redCashCon}>
                    <View style={styles.txtDirect}>
                        <Text style={styles.fontSize}>RedCash</Text>
                        <View style={styles.priceCon}>
                            <Text style={styles.fontSize}>Balance:</Text>
                            { props?.Redcash?.redCash && props?.Redcash?.redCash?.map((item) => {
                                return (
                                    <Text style={styles.txtPrice}>{item?.coins}</Text>
                                )
                            })}
                        </View>
                    </View>
                </View>
                <View style={styles.boxSpace}>
                    <View style={styles.boxCon}>
                        <View style={styles.headDirect}>
                            <View style={styles.titleCon}>
                                <Text style={styles.headTxt}>Status</Text>
                            </View>
                            <View style={styles.titleCon}>
                                <Text style={styles.headTxt}>Earned Value</Text>
                            </View>
                            <View style={styles.titleCon}>
                                <Text style={styles.headTxt}>Used Value</Text>
                            </View>
                            <View style={styles.titleCon}>
                                <Text style={styles.headTxt}>Used Date</Text>
                            </View>
                            <View style={styles.titleCon}>
                                <Text style={styles.headTxt}>Used With</Text>
                            </View>
                        </View>
                        <ScrollView style={styles.scollCon}>
                            <View style={styles.boxDown}>
                                {props?.Redcash?.redCashDetails?.results && props?.Redcash?.redCashDetails?.results?.map((item) => {
                                    const date = item?.updated_at
                                    const updateddate = date.split(':')
                                    // console.log(updateddate[0] , "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                                    return (
                                        <View style={styles.headDirects}>

                                            <View style={styles.titleCons}>
                                                <Text style={styles.headTxts}>{item?.is_active ? 'Confirmed' : 'pending'}</Text>
                                            </View>

                                            <View style={styles.titleCons}>
                                                <Text style={styles.headTxts}>{item?.earn_coins}</Text>
                                            </View>
                                            <View style={styles.titleCons}>
                                                <Text style={styles.headTxts}>{item?.redeam_coins}</Text>

                                            </View>
                                            <View style={styles.titleCons}>
                                                <Text style={styles.headTxts}>{moment(new Date(item?.updated_at)).format("DD/MM/YYYY ")}</Text>
                                                {/* <Text style={styles.headTxts}>  {}</Text> */}
                                            </View>
                                            <View style={styles.titleCons}>
                                                <Text style={styles.headTxts}>{item?.booking?.id}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                                {/*  */}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = create(RedCashStyle)

const mapStateToProps = (state) => ({
    UserDetails: state.userprofile?.userProfile,
    token: state.user.userData?.token,
    Redcash: state.MyRedCashDetailsReducer
})

const mapDispatchToProps = (dispatch) => {
    return {
        getRedCash: (token) => dispatch(Actions.getRedCash(token)),
        getRedCashDetails: (token) => dispatch(Actions.getRedCashDetails(token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RedCash)