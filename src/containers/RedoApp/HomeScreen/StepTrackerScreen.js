import { Dimensions, StyleSheet, Text, View, ScrollView,BackHandler } from 'react-native';
import React, { useState,useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Rcircle from '../../../staticData/svg/Rcircle.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { navigate, Screens } from '../../../helpers/Screens';
const { height, width } = Dimensions.get('screen');
function getLastSunday() {
  const date = new Date();
  const today = date.getDate();
  const dayOfTheWeek = date.getDay();
  const newDate = date.setDate(today - (dayOfTheWeek || 7));
  return new Date(newDate);
}

const StepTrackerScreen = props => {
  const item = props?.route?.params?.customParam;
  const [weekType, setWeekType] = useState("day");
  const [showGoals, setShowGoals] = useState(item?.showStatus);
  const [sunDaySteps, setSunDaySteps] = useState(0);
  const [monDaySteps, setmonDaySteps] = useState(0);
  const [tueDaySteps, settueDaySteps] = useState(0);
  const [wedDaySteps, setwedDaySteps] = useState(0);
  const [thuDaySteps, setthuDaySteps] = useState(0);
  const [friDaySteps, setfriDaySteps] = useState(0);
  const [satDaySteps, setsatDaySteps] = useState(0);
  var [dailySteps, setdailySteps] = useState(0);
  var [currentDate, setCurrentDate] = useState(new Date());
  var firstdayOfWeek = getLastSunday();
  var firstday =  new Date(firstdayOfWeek.setDate(firstdayOfWeek.getDate() + 1)).toUTCString();
  var monday = new Date(firstdayOfWeek.setDate(firstdayOfWeek.getDate() + 1)).toUTCString();
  var tueday = new Date(firstdayOfWeek.setDate(firstdayOfWeek.getDate() + 1)).toUTCString();
  var wedday = new Date(firstdayOfWeek.setDate(firstdayOfWeek.getDate() + 1)).toUTCString();
  var thuday = new Date(firstdayOfWeek.setDate(firstdayOfWeek.getDate() + 1)).toUTCString();
  var friday = new Date(firstdayOfWeek.setDate(firstdayOfWeek.getDate() + 1)).toUTCString();
  var lastday =new Date(firstdayOfWeek.setDate(firstdayOfWeek.getDate() + 1)).toUTCString();
  var weekTotalSteps =
    sunDaySteps +
    monDaySteps +
    tueDaySteps +
    wedDaySteps +
    thuDaySteps +
    friDaySteps +
    satDaySteps;
  var averageSteps = weekTotalSteps / 7;
  const opt = {
    // startDate: "2022-01-01T00:00:17.971Z", // required ISO8601Timestamp
    startDate: "",
    endDate: "", // required ISO8601Timestamp
    bucketUnit: 'MINUTES', // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'sat'],
    datasets: [
      {
        data: [
          sunDaySteps,
          monDaySteps,
          tueDaySteps,
          wedDaySteps,
          thuDaySteps,
          friDaySteps,
          satDaySteps,
        ],
      },
    ],
  };
  useEffect(() => {
   getDailyUserSetps()
   getWeeklyUserSetps()
  }, [])
console.log("showGoals :"+showGoals)
  const getDailyUserSetps = async ()=>{
  await  GoogleFit.getDailySteps(currentDate.toISOString())
    .then(res => {
       console.log("res :" , res)
      if (res.length !== 0) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].source === 'com.google.android.gms:estimated_steps') {
            // console.log('Daily steps### >>>0 ', res[i])
            let data = res[i].steps.reverse();
            // console.log(data, "FIRST DATA")
            // let dailyStepCount = res[i].steps;
            // console.log(dailyStepCount, "DAILY STEP COUNT")
            setdailySteps(data[0].value);
            // console.log('SET DAILY STEPS', data[0].value);
          }
        }
      } else {
        console.log('Not Found');
      }
    })
    .catch(err => {
      console.log('Daily steps error>>> ', err);
    });

  } 
  const getWeeklyUserSetps = async ()=>{
   await GoogleFit.getWeeklySteps(currentDate.toISOString(), 0)
    .then(res => {
         console.log('weekly steps@# ', res);
      if (res.length !== 0) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].source === 'com.google.android.gms:estimated_steps') {
            // console.log('Daily steps### >>>0 ', res[i])
            let data = res[i].steps;
            // console.log(data, "FIRST DATA")
            // let dailyStepCount = res[i].steps;
            // console.log(dailyStepCount, "DAILY STEP COUNT")
            // setdailySteps(data[0].value);
            // console.log('SET Weekly STEPS', data[0].value);
            setSunDaySteps(data[0]?.value ?? 0);
            setmonDaySteps(data[1]?.value ?? 0);
            settueDaySteps(data[2]?.value ?? 0);
            setwedDaySteps(data[3]?.value ?? 0);
            setthuDaySteps(data[4]?.value ?? 0);
            setfriDaySteps(data[5]?.value ?? 0);
            setsatDaySteps(data[6]?.value ?? 0);
          }
        }
      } else {
        console.log('Not Found');
      }
    })
    .catch(err => {
      console.log('Weekly steps error>>> ', err);
    });
  }
    const backAction = () => {
      props.navigation.goBack()
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
        <View style={styles.secCon}>
          <View style={styles.arrowCon}>
            <MaterialCommunityIcons
              onPress={e => { navigate(Screens.REDO_TAB) }}
              style={{ fontSize: 24, color: '#707070' }}
              name="arrow-left"
              backgroundColor="#3b5998"
            />
          </View>
          <View style={styles.headCon}>
            <Text style={styles.txtHead}>Steps</Text>
          </View>
          <AntDesign style={{ fontSize: 20, color: '#E5184E' }} name="calendar" />
        </View>
        <View style={styles.directCon}>
          <TouchableOpacity
            style={weekType == 'day' ? styles.btmCon : styles.btmCons}
            onPress={() => {
             setWeekType("day")
            }}>
            <Text style={weekType == 'day' ? styles.txtCols : styles.txtCol}>Days</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={weekType == 'week' ? styles.btmCon : styles.btmCons}
            onPress={() => {
              setWeekType("week")
            }}>
            <Text style={weekType == 'week' ? styles.txtCols : styles.txtCol}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={weekType == 'month' ? styles.btmCon : styles.btmCons}
            onPress={() => {
              setWeekType("month")
            }}>
            <Text style={weekType == 'month' ? styles.txtCols : styles.txtCol}>Month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={weekType == 'year' ? styles.btmCon : styles.btmCons}
            onPress={() => {
              setWeekType("year")
            }}>
            <Text style={weekType == 'year' ? styles.txtCols : styles.txtCol}>Year</Text>
          </TouchableOpacity>
        </View>
        {weekType == 'day'  ? (
          <View>
            <View style={styles.graphCon}>
              <View style={styles.dateCon}>
                <AntDesign
                  style={{ fontSize: 16, color: '#000000' }}
                  name="left"
                />
                <Text style={styles.ardTxt}>
                  {currentDate.toDateString().slice(3, 15)}
                </Text>
              </View>
              <View style={styles.avgCon}>
                <Text style={styles.avgTxt}>Total</Text>
              </View>
              <View style={styles.stpCon}>
                <Text style={styles.stpTxt}>{dailySteps} Steps</Text>
              </View>
              <View style={styles.avgCon}>
                <Text style={styles.avgTxt}>Today</Text>
              </View>
            </View>

            <View style={styles.totalCon}>
              <Text style={styles.totTxt}>Total Steps</Text>
              <Text style={styles.totTxt}>{dailySteps}</Text>
            </View>

            <View style={styles.spaceCon}>
              <View style={styles.bxCon}>
                <View style={styles.upCons}>
                  <Text style={styles.dateTxt}>
                    {currentDate.toDateString().slice(0, 10)}
                  </Text>
                </View>

                <View style={styles.fontCons}>
                  <Text style={styles.dateTxt}>{dailySteps} Steps </Text>
                 {showGoals && ( <TouchableOpacity onPress={() => navigate(Screens.SETSELECTGOALS)} style={styles.setbtnCon}>
                    <Text style={styles.setbtnTxt}>Set goals</Text>
                  </TouchableOpacity>)}
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}
        {weekType == 'week'  ? (
          <ScrollView style={{ marginBottom: 80 }}>
            <View style={styles.graphCon}>
              <View style={styles.dateCon}>
                <AntDesign
                  style={{ fontSize: 16, color: '#000000' }}
                  name="left"
                />
                <Text style={styles.ardTxt}>
                  {firstday.slice(4, 11)} - {lastday.slice(4, 16)}
                </Text>
                <AntDesign
                  style={{ fontSize: 16, color: '#000000' }}
                  name="right"
                />
              </View>
              <View style={styles.avgCon}>
                <Text style={styles.avgTxt}>Average</Text>
              </View>
              <View style={styles.stpCon}>
                <Text style={styles.stpTxt}>
                  {Math.round(averageSteps)} Steps
                </Text>
              </View>
              <View style={styles.avgCon}>
                <Text style={styles.avgTxt}>
                  {firstday.slice(4, 11)} - {lastday.slice(4, 16)}
                </Text>
              </View>
            </View>
            <View style={styles.graphCons}>
              <BarChart
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  marginHorizontal: 20,
                }}
                data={data}
                width={Dimensions.get('window').width / 1.1}
                height={180}
                //   yAxisLabel="$"
                chartConfig={{
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientTo: '#FFFFFF',
                  backgroundGradientToOpacity: 0.5,
                  fillShadowGradient: `rgba(551, 89, 81, 0)`,
                  fillShadowGradientOpacity: 1,
                  color: (opacity = 9) => `rgb(751, 89, 81, ${opacity})`,
                  labelColor: (opacity = 1) => `rgb(112, 112, 112, ${opacity})`,
                  strokeWidth: 2, // optional, default 3
                  barPercentage: 0.3,
                  useShadowColorFromDataset: false, // optional
                }}
              />
            </View>

            <View style={styles.totalCon}>
              <Text style={styles.totTxt}>Total Steps</Text>
              <Text style={styles.totTxt}>{weekTotalSteps}</Text>
            </View>

            {sunDaySteps != 0 ? (
              <View style={styles.spaceCon}>
                <View style={styles.bxCon}>
                  <View style={styles.upCons}>
                    <Text style={styles.dateTxt}>{firstday.slice(0, 11)}</Text>
                  </View>

                  <View style={styles.fontCons}>
                    <Text style={styles.dateTxt}>{sunDaySteps} Steps</Text>
                    {/* <Text style={styles.dateTxt}>63%</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {monDaySteps != 0 ? (
              <View style={styles.spaceCon}>
                <View style={styles.bxCon}>
                  <View style={styles.upCons}>
                    <Text style={styles.dateTxt}>{monday.slice(0, 11)}</Text>
                  </View>

                  <View style={styles.fontCons}>
                    <Text style={styles.dateTxt}>{monDaySteps} Steps</Text>
                    {/* <Text style={styles.dateTxt}>63%</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {tueDaySteps != 0 ? (
              <View style={styles.spaceCon}>
                <View style={styles.bxCon}>
                  <View style={styles.upCons}>
                    <Text style={styles.dateTxt}>{tueday.slice(0, 11)}</Text>
                  </View>

                  <View style={styles.fontCons}>
                    <Text style={styles.dateTxt}>{tueDaySteps} Steps</Text>
                    {/* <Text style={styles.dateTxt}>63%</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {wedDaySteps != 0 ? (
              <View style={styles.spaceCon}>
                <View style={styles.bxCon}>
                  <View style={styles.upCons}>
                    <Text style={styles.dateTxt}>{wedday.slice(0, 11)}</Text>
                  </View>

                  <View style={styles.fontCons}>
                    <Text style={styles.dateTxt}>{wedDaySteps} Steps</Text>
                    {/* <Text style={styles.dateTxt}>63%</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {thuDaySteps != 0 ? (
              <View style={styles.spaceCon}>
                <View style={styles.bxCon}>
                  <View style={styles.upCons}>
                    <Text style={styles.dateTxt}>{thuday.slice(0, 11)}</Text>
                  </View>

                  <View style={styles.fontCons}>
                    <Text style={styles.dateTxt}>{thuDaySteps} Steps</Text>
                    {/* <Text style={styles.dateTxt}>63%</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {friDaySteps != 0 ? (
              <View style={styles.spaceCon}>
                <View style={styles.bxCon}>
                  <View style={styles.upCons}>
                    <Text style={styles.dateTxt}>{friday.slice(0, 11)}</Text>
                  </View>

                  <View style={styles.fontCons}>
                    <Text style={styles.dateTxt}>{friDaySteps} Steps</Text>
                    {/* <Text style={styles.dateTxt}>63%</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
            {satDaySteps != 0 ? (
              <View style={styles.spaceCon}>
                <View style={styles.bxCon}>
                  <View style={styles.upCons}>
                    <Text style={styles.dateTxt}>{lastday.slice(0, 11)}</Text>
                  </View>
                  <View style={styles.fontCons}>
                    <Text style={styles.dateTxt}>{satDaySteps} Steps</Text>
                    {/* <Text style={styles.dateTxt}>63%</Text> */}
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )}
          </ScrollView>
        ) : (
          <View />
        )}
      </View>
    </SafeAreaView>
  );
};

export default StepTrackerScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: height / 1,
    width: width / 1,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
  },
  secCon: {
    height: height / 13,
    width: width / 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green'
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
  directCon: {
    height: height / 20,
    width: width / 1,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F5F5F5',
  },
  txtCol: {
    color: '#2E2E2E',
    fontSize: 14,
    fontFamily: 'Jost-Regular',
  },
  graphCon: {
    height: height / 6,
    width: width / 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
  },
  dateCon: {
    height: height / 15,
    width: width / 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  graphCons: {
    height: height / 4,
    width: width / 1.1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
  fontCon: {
    height: height / 20,
    width: width / 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCols: {
    color: '#2E2E2E',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
  spaceCon: {
    height: height / 8,
    width: width / 1,
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bxCon: {
    height: height / 10,
    width: width / 1.1,
    // backgroundColor: 'red',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#707070',
  },
  upCons: {
    height: height / 23,
    width: width / 1.2,
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  fontCons: {
    height: height / 20,
    width: width / 1.2,
    // backgroundColor: 'pink',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  setbtnCon: {
    height: height / 27,
    width: width / 4.2,
    backgroundColor: '#E5184E',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setbtnTxt: {
    fontSize: 12,
    fontFamily: 'Jost-Medium',
    color: '#FFFFFF',
  },
  dateTxt: {
    color: '#707070',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
  btmCon: {
    height: height / 23,
    width: width / 7,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5184E',
  },
  btmCons: {
    height: height / 23,
    width: width / 7,
    // backgroundColor: 'cyan',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalCon: {
    height: height / 20,
    width: width / 1.1,
    // backgroundColor: 'pink',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  totTxt: {
    color: '#A2A2A2',
    fontSize: 14,
    fontFamily: 'Jost-SemiBold',
  },
  avgCon: {
    height: height / 30,
    width: width / 1.1,
    // backgroundColor: 'pink',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  stpCon: {
    height: height / 25,
    width: width / 1.1,
    // backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  avgTxt: {
    color: '#A2A2A2',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
  stpTxt: {
    color: '#707070',
    fontSize: 16,
    fontFamily: 'Jost-Medium',
  },
  ardTxt: {
    color: '#707070',
    fontSize: 14,
    fontFamily: 'Jost-Medium',
  },
});
