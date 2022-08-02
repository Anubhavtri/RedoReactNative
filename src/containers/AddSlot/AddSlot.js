import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddSlotStyle from './AddSlotStyle';
import { create } from '../../helpers/PlatformSpecificStyles';
import { RadioButton } from 'react-native-paper';
import { Screens, navigate } from '../../helpers/Screens';
import Constants from '../../staticData/Constants';
import AddConst from './AddSlotsConstants'
import moment from 'moment';
import Actions from '../AddSlot/AddSlotsAction';
import { color } from 'react-native-reanimated';
export const AddSlot = (props) => {

  const totalamount = props?.route?.params?.customParam

  const [calenderDates, setCalenderDates] = useState([]);
  const [appointmentDateIndex, setAppointmentDateIndex] = useState(-1);
  const [appointmentTimeIndex, setAppointmentTimeIndex] = useState(-1);

  const [appointmentDate, setAppointmentDate] = useState(-1);
  const [SelectedTimeSlot, setSelectedTimeSlot] = useState()
  const [timeNow, setTimeNow] = useState(new Date().getHours())
  let [TimeSlotBack, setTimeSlotBack] = useState(props?.route?.params?.customParam?.slot)

  useEffect(() => setCalender(), []);
  const setCalender = () => {
    let tempCaldrDates = [];
    for (let index = 0; index < 4; index++) {
      let tempObj = {
        formattedDate: moment()
          .add(index, 'day')
          .format('DD MMM')
          .toUpperCase(),
        date: moment().add(index, 'day').format('YYYY-MM-DD'),
      };
      tempCaldrDates.push(tempObj);
    }
    setCalenderDates(tempCaldrDates);
  };
  const filterTimeSlot = () => {
    if (appointmentDate && appointmentDate.formattedDate && (parseInt((appointmentDate?.formattedDate?.split(' '))[0]) == new Date().getDate())) {
      let timeSlotAvail = TimeSlotBack.filter((item) => {
        return (
          parseInt((item?.start_time?.split(":"))[0]) > timeNow + 1 &&
          item?.available_slots > 0
        )
      })
      return timeSlotAvail
    }
    else {
      return TimeSlotBack
    }
  }

  useEffect(() => {
    setTimeSlotBack(props?.appointmentSlots[0] ? props?.appointmentSlots[0]?.zone_data?.time_slots : [])
  }, [props?.appointmentSlots])

  useEffect(() => {
    props.clrTimeSlotGlobal();
    setTimeSlotBack([])
    setAppointmentDateIndex(-1)
    setAppointmentDate(-1)
    setSelectedTimeSlot(null)
  }, [props?.route?.params?.customParam])

  console.log(filterTimeSlot(), TimeSlotBack, "time here")

  console.log(appointmentDate , "jjjjjjjj")

  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={[styles.TopNav]}>
        <MaterialCommunityIcons
          onPress={e => {
            props.clrTimeSlotGlobal();
            setTimeSlotBack([])
            setAppointmentDateIndex(-1)
            setAppointmentDate(-1)
            setSelectedTimeSlot(null)
            props.navigation.goBack();

          }}
          style={{ fontSize: 25, marginRight: 10 }}
          name="arrow-left"
          backgroundColor="#3b5998"
        />
        <Text style={[styles.topnavtext, Constants.fontType.jMedium]}>
          Add Slot
        </Text>
      </View>
      <View style={{ paddingBottom: 20 }} />
      <View style={[styles.appointmentContainerStyle]}>
        <Text
          style={[
            {
              fontSize: 14,
              paddingHorizontal: 5,
              paddingVertical: 5,
              color: '#707070',
            },
            Constants.fontType.jMedium,
          ]}>
          Select Appointment Date
        </Text>
        <View
          style={{
            flex: 0.1,
            // marginRight: 40,
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          {calenderDates ? calenderDates.map(function (obj, index) {
            if (index == appointmentDateIndex)
              return (
                <TouchableOpacity
                  disabled={true}
                  onPress={() => {
                    setAppointmentDateIndex(index);
                    setAppointmentDate(obj);
                    setSelectedTimeSlot()
                    props?.getAppointmentSlots(obj.date, props.token);

                  }}
                  style={[styles.selectedDateItem]}>
                  <Text
                    style={[
                      {
                        flexDirection: 'row',
                        color: '#FFFFFF',
                      },
                      Constants.fontType.jMedium,
                    ]}>
                    {obj.formattedDate}
                  </Text>
                </TouchableOpacity>
              );
            else
              return (
                <TouchableOpacity
                  onPress={() => {
                    setAppointmentDateIndex(index);
                    setAppointmentDate(obj);
                    setSelectedTimeSlot()
                    props.getAppointmentSlots(obj.date, props?.cityObj?.zone_data.id, props.token);
                  }}
                  style={[styles.unSelectedDateItem]}>
                  <Text
                    style={[
                      {
                        flexDirection: 'row',
                        color: '#A2A2A2',
                      },
                      Constants.fontType.jMedium,
                    ]}>
                    {obj.formattedDate}
                  </Text>
                </TouchableOpacity>
              );
          }) : null}
        </View>
      </View>
      <View style={[styles.first, { marginHorizontal: 16 }]}>
        <View style={[styles.timeslotsheading, { marginHorizontal: 4 }]}>
          <Text
            style={[
              { fontSize: 14, color: '#707070' },
              Constants.fontType.jMedium,
            ]}>
            Select Appointment Time
          </Text>
        </View>
        <View style={{ height: 250 }}>
          {appointmentTimeIndex && filterTimeSlot()?.length !== 0 ?
            <FlatList
              contentContainerStyle={{ flexGrow: 1, marginHorizontal: 4 }}
              data={filterTimeSlot()}
              renderItem={({ item, index }) => ( 
                  item?.available_slots > 0 ? 
                  <View >
                    <TouchableOpacity
                      onPress={() => setSelectedTimeSlot(item)}
                      style={styles.timeslotes}>
                      <Text
                        style={[
                          styles.timeslot,
                          {
                            color:
                              SelectedTimeSlot == item ? '#47CACC' : '#A2A2A2',
                          },
                          Constants.fontType.jRegular,
                        ]}>
                        {item.start_time}
                        {' - '}
                        {item.end_time}
                      </Text>
                      <RadioButton
                        value="first"
                        status={
                          SelectedTimeSlot == item ? 'checked' : 'unchecked'
                        }
                        onPress={() => { setSelectedTimeSlot(item) }}
                      />
                    </TouchableOpacity>
                  </View> : null 
              )}
            /> :
            <View>
              {appointmentDate != -1 ? 
              <Text style={{color:'#A2A2A2'}}>
                 No slot available please select diffrent date</Text> : null }
            </View> 
            // <Text style={{color:'#A2A2A2'}}>
            //   No slot available please select diffrent date</Text>
              }
        </View>
      </View>
      <View
        style={[
          styles.Bottom,
          styles.BorderTop,
          styles.paddingClass,
          styles.FlexViewRow,
        ]}>
        <View style={[styles.bottomViewContainer]}>
          <Text style={[styles.TextSubHeadingmedium]}>Total Amount</Text>
          <Text style={[styles.TextSubHeadingmedium, { fontSize: 16 }]}>₹{totalamount}</Text>
        </View>
        <View style={[styles.bottomViewContainer]}>

          {/* <Text style={{ backgroundColor: '#47CACC', color: '#FFFFFF', fontSize: 10, paddingVertical: '3%', paddingHorizontal: '6%', borderRadius: 5, marginVertical: '2%' }}>Get {Math.floor(((((item?.package_city_prices ? item?.package_city_prices?.package_price : item?.package_price) - (item?.package_city_prices ? item?.package_city_prices?.offer_price : item?.offer_price)) / (item?.package_city_prices ? item?.package_city_prices?.package_price : item?.package_price)) * 100))}% OFF</Text> */}
          {appointmentDate && SelectedTimeSlot ?
            <Button
              onPress={() => {
                navigate(Screens.ORDER_REVIEW, totalamount);
                props?.setTimeSlotGlobal(SelectedTimeSlot, appointmentDate)
              }}
              title="NEXT"
              color="#E5184E"
              borderRadius="5"
              paddingHorizontal="10"
            /> : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

let styles = create(AddSlotStyle);

const mapStateToProps = state => ({
  token: state.user.userData?.token,
  appointmentSlots: state.addSlots?.getAppointmentSlots,
  cityObj: state?.city?.cityObj
});

const mapDispatchToProps = dispatch => {
  return {
    getAppointmentSlots: (date, zone, token) =>
      dispatch(Actions.getAppointmentSlots(date, zone, token)),
    setTimeSlotGlobal: (SelectedTimeSlot, appointmentDate) =>
      dispatch(Actions.setTimeSlotGlobal(SelectedTimeSlot, appointmentDate)),
    clrTimeSlotGlobal: () =>
      dispatch({
        type: AddConst.ACTIONS.CLEAR_APPOINTMENT_SLOT
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSlot);

