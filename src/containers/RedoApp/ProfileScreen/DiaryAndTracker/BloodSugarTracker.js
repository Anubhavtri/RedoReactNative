import { StyleSheet, Text, View, TextInput as ReactTextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { create } from '../../../../helpers/PlatformSpecificStyles'
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox, Icon, ButtonGroup } from 'react-native-elements';
import DatePicker from 'react-native-date-picker'
import reminderStyles from '../reminderScreen/reminderStyles';
import ReminderAction from '../reminderScreen/ReminderAction';

const BloodSugarTracker = (props) => {

    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const [filterMeal_type, setFilterMeal_type] = useState('')
    const [fastingFilter, setfastingFilter] = useState(false)
    const [postBreakfastFilter, setPostBreakfastFilter] = useState(false)
    const [preLunchFilter, setPreLunchFilter] = useState(false)
    const [postLunchFilter, setPostLunchFilter] = useState(false)
    const [preDinnerFilter, setPreDinnerFilter] = useState(false)
    const [postDinnerFilter, setPostDinnerFilter] = useState(false)

    useEffect(() => {
        props.getAllManualBookings(filterMeal_type,props.token)
        return
    }, [filterMeal_type])
    const fasting = () => {setFilterMeal_type('fasting'),
        setfastingFilter(!fastingFilter), setPostBreakfastFilter(false), setPreLunchFilter(false), setPostLunchFilter(false), setPreDinnerFilter(false), setPostDinnerFilter(false)
    }
    const postBreakfast = () => {setFilterMeal_type('post_breakfast')
        setfastingFilter(false), setPostBreakfastFilter(!postBreakfastFilter), setPreLunchFilter(false), setPostLunchFilter(false), setPreDinnerFilter(false), setPostDinnerFilter(false)
    }
    const preLunch = () => {setFilterMeal_type('pre_meal')
        setfastingFilter(false), setPostBreakfastFilter(false), setPreLunchFilter(!preLunchFilter), setPostLunchFilter(false), setPreDinnerFilter(false), setPostDinnerFilter(false)
    }
    const postLunch = () => {setFilterMeal_type('post_meal')
        setfastingFilter(false), setPostBreakfastFilter(false), setPreLunchFilter(false), setPostLunchFilter(!postLunchFilter), setPreDinnerFilter(false), setPostDinnerFilter(false)
    }
    const preDinner = () => {setFilterMeal_type('pre_dinner')
        setfastingFilter(false), setPostBreakfastFilter(false), setPreLunchFilter(false), setPostLunchFilter(false), setPreDinnerFilter(!preDinnerFilter), setPostDinnerFilter(false)
    }
    const postDinner = () => {setFilterMeal_type('post_dinner')
        setfastingFilter(false), setPostBreakfastFilter(false), setPreLunchFilter(false), setPostLunchFilter(false), setPreDinnerFilter(), setPostDinnerFilter(!postDinnerFilter)
    }
    return (
        <SafeAreaView>

            <View style={styles.TopNav}>
                <MaterialCommunityIcons
                    onPress={(e) => { props.navigation.goBack() }}
                    style={{ fontSize: 25, marginRight: 10 }}
                    name="arrow-left"
                    backgroundColor="#3b5998"
                />
                <Text style={styles.topnavtext}>Blood Sugar Tracker Screen</Text>
            </View>
            <ScrollView style={{ marginTop: 10 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}>
                {fastingFilter ?
                    <TouchableOpacity style={styles.horizontalScrollBarOnBTn}
                        onPress={fasting}>
                        <Text>Fasting</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.horizontalScrollBarBTn}
                        onPress={fasting}>
                        <Text>Fasting</Text>
                    </TouchableOpacity>
                }
                {postBreakfastFilter ?
                    <TouchableOpacity style={styles.horizontalScrollBarOnBTn}
                        onPress={postBreakfast}>
                        <Text>Post Breakfast</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.horizontalScrollBarBTn}
                        onPress={postBreakfast}>
                        <Text>Post Breakfast</Text>
                    </TouchableOpacity>
                }
                {preLunchFilter ?
                    <TouchableOpacity style={styles.horizontalScrollBarOnBTn}
                        onPress={preLunch}>
                        <Text>Pre Lunch</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.horizontalScrollBarBTn}
                        onPress={preLunch}>
                        <Text>Pre Lunch</Text>
                    </TouchableOpacity>
                }
                {postLunchFilter ?
                    <TouchableOpacity style={styles.horizontalScrollBarOnBTn}
                        onPress={postLunch}>
                        <Text>Post Lunch</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.horizontalScrollBarBTn}
                        onPress={postLunch}>
                        <Text>Post Lunch</Text>
                    </TouchableOpacity>
                }
                {preDinnerFilter ?
                    <TouchableOpacity style={styles.horizontalScrollBarOnBTn}
                        onPress={preDinner}>
                        <Text>Pre Dinner</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.horizontalScrollBarBTn}
                        onPress={preDinner}>
                        <Text>Pre Dinner</Text>
                    </TouchableOpacity>
                }
                {postDinnerFilter ?
                    <TouchableOpacity style={styles.horizontalScrollBarOnBTn}
                        onPress={postDinner}>
                        <Text>Post Dinner</Text>
                    </TouchableOpacity> 
                    :
                    <TouchableOpacity style={styles.horizontalScrollBarBTn}
                        onPress={postDinner}>
                        <Text>Post Dinner</Text>
                    </TouchableOpacity>
                }
                
            </ScrollView>
            <TouchableOpacity style={{ padding: 5, alignItems: 'flex-end', marginHorizontal: 10 }}
                onPress={() => { setOpen(true) }}>
                <MaterialCommunityIcons
                    onPress={(e) => { setOpen(true) }}
                    style={{ marginRight: 10 }}
                    name="calendar-month"
                    size={35}
                    backgroundColor="#3b5998"
                />
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                mode="date"
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                    setShowTimestamp(true)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            {props.allManualBookings?.length > 0?
            <ScrollView style={{ marginBottom: 60 }}>
                {props.allManualBookings?.map((data) => {
                    return (
                        <View key={data.id} style={[styles.rowDirection, {
                            justifyContent: "space-between", marginVertical: 15, marginHorizontal: 20, borderWidth: 1,
                            borderRadius: 10, backgroundColor: '#CFD5DF', paddingVertical: 15, paddingHorizontal: 15
                        }]}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={styles.keyBox}>{data?.meal_type}</Text>
                                <Text style={styles.keyBox}>{data?.rule?.volume} {data?.data_type}</Text>
                                <Text style={styles.keyBox}>{data?.daytime}</Text>
                            </View>
                        </View>

                    )
                })}
            </ScrollView>
            : 
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <Text>No Data Available</Text>
            </View>
}
        </SafeAreaView>
    )
}

const styles = create(reminderStyles)
const mapStateToProps = (state) => ({

    token: state.user.userData?.token,
    allManualBookings: state.reminder?.allManualBookings,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getAllManualBookings: (queryParam, token) => dispatch(ReminderAction.getAllManualBookings(queryParam, token)),
        dispatch
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BloodSugarTracker);