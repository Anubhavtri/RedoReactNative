// import React, { useState, useRef, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import PlanDetailStyles from './PlanDetailStyles';
// import { create } from '../../helpers/PlatformSpecificStyles';
// import {
//   View,
//   Text,
//   ScrollView,
//   Button,
//   TouchableOpacity,
//   ToastAndroid,
//   Dimensions
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Screens, navigate } from '../../helpers/Screens';
// import Icon from 'react-native-vector-icons/AntDesign';
// import { Transition, Transitioning } from 'react-native-reanimated';
// import BestpackageAction from '../../components/OurBestPackages/BestPackageAction';
// import PackageAction from '../../components/Packages/PackageActions';
// import Constants from '../../staticData/Constants';
// import PlanDetailReport from '../../staticData/svg/PlanDetailReport.svg';
// import Actions from './PlanDetailAction'
// import { replace } from 'lodash';
// const { height, width } = Dimensions.get('screen')
// const data = [
//   {
//     category: 'Who all are eligible for the test?',
//     subCategories: [
//       '•Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
//       '•Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadi',
//     ],
//   },
//   {
//     category: 'Who all are eligible for the test?',
//     subCategories: [
//       '•Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
//       '•Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ',
//     ],
//   },
// ];

// const newdata = [
//   {
//     category: 'Complete Hemogram (24 Tests)',
//     subCategories: [
//       'Procedural',
//       'Subspecialities',
//       'training and certification',
//     ],
//   },
//   {
//     category: 'Complete Hemogram (24 Tests)',
//     subCategories: [
//       'Procedural',
//       'Subspecialities',
//       'training and certification',
//     ],
//   },
// ];

// let packageDetailsTab = [
//   'Introduction',
//   'Test Criteria',
//   'Test Parameters',
//   'Q&A',
// ];

// export const PlanDetail = props => {
//   const item = props?.route?.params?.customParam;
//   const scrollViewRef = useRef();
//   console.log(item)
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [tabIndex, setTabIndex] = useState(0);
//   const [newcurrentIndex, setnewcurrentIndex] = useState(null);
//   const [scrollRef, setScrollRef] = useState(null);
//   const [introductionX, setIntroductionX] = useState(null);
//   const [introductionY, setIntroductionY] = useState(null);
//   const [testCriteriaX, setTestCriteriaX] = useState(null);
//   const [testCriteriaY, setTestCriteriaY] = useState(null);
//   const [testParamsX, setTestParamsX] = useState(null);
//   const [testParamsY, setTestParamsY] = useState(null);
//   const [packagename, setpackagename] = useState(item?.slug);
//   const [cityname, setcityname] = useState(props?.cityId?.city)
//   const [test, settest] = useState(false)
//   const [qaX, setQaX] = useState(null);
//   const [qaY, setQaY] = useState(null);

//   const ref = useRef();

//   const transition = (
//     <Transition.Together>
//       <Transition.In type="fade" durationMs={200} />
//       <Transition.Change />
//       <Transition.Out type="fade" durationMs={200} />
//     </Transition.Together>
//   );

//   const scrollToView = index => {
//     switch (index) {
//       case 0:
//         scrollRef.scrollTo({
//           x: introductionX,
//           y: introductionY,
//           animated: true,
//         });
//         break;
//       case 1:
//         scrollRef.scrollTo({
//           x: testCriteriaX,
//           y: testCriteriaY,
//           animated: true,
//         });
//         break;
//       case 2:
//         scrollRef.scrollTo({
//           x: testParamsX,
//           y: testParamsY,
//           animated: true,
//         });
//         break;
//       case 3:
//         scrollRef.scrollTo({
//           x: qaX,
//           y: qaY,
//           animated: true,
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   useEffect(() => {
//     props?.getPackParams(item.id)
//   }, [item?.id]);

//   const [testcriteria, settestcriteria] = useState(props?.route?.params?.customParam?.text_criteria ? JSON.parse(props?.route?.params?.customParam?.text_criteria.replace("in Delhi", `in ${props?.cityId?.city}`)) : [])
//   const [questionandanswer, setquestionandanswer] = useState(props?.route?.params?.customParam?.qna ? JSON.parse(props?.route?.params?.customParam?.qna.replace("in Delhi", `in ${props?.cityId?.city}`)) : [])
//   const [testparams, settestparams] = useState(props?.testPara?.param?.results)

//   console.log(props?.cityId, "zxcvbnm")

//   const Criteria = ({ data }) => {
//     const [show, setShow] = useState(false);
//     const { answer, question } = data
//     return (
//       <View style={[styles.Bodyformboxs, styles.paddingClass,]}>
//         <View >
//           <View style={styles.row}>
//             <TouchableOpacity
//               onPress={() => setShow(!show)}>
//               <Text style={styles.qStyle} numberOfLines={1} >
//                 {data?.question}
//               </Text>
//             </TouchableOpacity>
//             {!show &&
//               <AntDesign
//                 onPress={e => {
//                   setShow(!show)
//                 }}
//                 style={styles.arrowSty}
//                 name="down"
//                 backgroundColor="#3b5998"
//               />
//             }
//             {show &&
//               <AntDesign
//                 onPress={e => {
//                   setShow(!show)
//                 }}
//                 style={styles.arrowSty}
//                 name="up"
//                 backgroundColor="#3b5998"
//               />
//             }
//           </View>
//           <View style={styles.hideContent}>
//             {data?.answer && show && data.answer?.list.map((val, index) => {
//               // console.log(val, "laki km nhi krta")
//               return (
//                 <Text style={styles.txtVal}>{'\u2B24'} {val}</Text>
//               )
//             })}
//           </View>
//         </View>
//       </View>
//     )
//   }

//   const Parameters = ({ data }) => {
//     console.log(data, 'laki km krta h')
//     const [show, setShow] = useState(false);
//     const { answer, question } = data
//     return (
//       <View style={[styles.Bodyformboxs, styles.paddingClass]}>
//         <View>
//           <View style={styles.row}>
//             <TouchableOpacity
//               onPress={() => setShow(!show)}
//               style={{ maxWidth: '90%' }}
//             >
//               <Text style={{ color: '#707070' }}>
//                 {data?.name}
//               </Text>
//             </TouchableOpacity>
//             {!show &&
//               <AntDesign

//                 onPress={e => {
//                   setShow(!show)
//                 }}
//                 style={styles.arrowSty}
//                 name="down"
//                 backgroundColor="#3b5998"
//               />
//             }
//             {show &&
//               <AntDesign
//                 onPress={e => {
//                   setShow(!show)
//                 }}
//                 style={styles.arrowSty}
//                 name="up"
//                 backgroundColor="#3b5998"
//               />
//             }
//           </View>
//           <View style={styles.hideContent}>
//             {data?.package_details && show && data?.package_details.map((val, index) => {
//               // console.log(val, "laki km nhi krta")
//               return (
//                 <Text style={styles.txtVal}>{'\u2B24'}  {val.name}</Text>
//               )
//             })}
//           </View>
//         </View>
//       </View>
//     )
//   }

//   const QuestionAnswer = ({ data }) => {
//     const [show, setShow] = useState(false);
//     const { answer, question } = data
//     // console.log(data, 'laki km nhi krta')
//     return (
//       <View style={[styles.Bodyformbox, styles.paddingClass]}>
//         <View>
//           <View style={styles.row}>
//             <TouchableOpacity
//               onPress={() => setShow(!show)}
//               style={{ maxWidth: '90%' }}
//             >
//               <Text style={{ color: '#707070', }} >
//                 {data?.question}
//               </Text>
//             </TouchableOpacity>
//             {!show &&
//               <AntDesign
//                 onPress={e => {
//                   setShow(!show)
//                 }}
//                 style={styles.arrowSty}
//                 name="down"
//                 backgroundColor="#3b5998"
//               />
//             }
//             {show &&
//               <AntDesign
//                 onPress={e => {
//                   setShow(!show)
//                 }}
//                 style={styles.arrowSty}
//                 name="up"
//                 backgroundColor="#3b5998"
//               />
//             }
//           </View>
//           {data?.answer && show && (
//             <View style={styles.hideContent}>
//               <Text style={styles.txtVal}>{data.answer}</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.MainContainer}>
//       <View style={styles.TopNav}>
//         <MaterialCommunityIcons
//           onPress={e => {
//             props.navigation.goBack();
//           }}
//           style={{ fontSize: 25, marginRight: 10 }}
//           name="arrow-left"
//           backgroundColor="#3b5998"
//         />
//         <Text style={[styles.topnavtext, Constants.fontType.jMedium]}>
//           Package Details
//         </Text>
//       </View>

//       <View style={[styles.Body, styles.paddingClass]}>
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           ref={ref => setScrollRef(ref)}>
//           <View>
//             <View
//               onLayout={event => {
//                 const { layout } = event.nativeEvent;
//                 setIntroductionX(layout.x);
//                 setIntroductionY(layout.y);
//               }}
//               style={styles.intro}>
//               <View style={styles.introheading}>
//                 <Text style={[styles.packname, Constants.fontType.jBold]}>
//                   {item?.name}
//                 </Text>
//               </View>
//               <View style={styles.param}>
//                 <View style={{ flexDirection: 'row' }}>
//                   <Text
//                     style={[
//                       styles.inclusionText,
//                       { color: '#A7A7A7' },
//                       Constants.fontType.jSemi_bold,
//                     ]}>
//                     Inclusions:
//                   </Text>
//                   <Text
//                     style={[
//                       styles.inclusionText,
//                       { color: '#707070' },
//                       Constants.fontType.jSemi_bold,
//                     ]}>
//                     {item?.parameter} Tests
//                   </Text>
//                 </View>
//                 <Text style={[styles.paramtext, Constants.fontType.jRegular]}>
//                   {item?.description}
//                 </Text>
//               </View>
//               <View style={styles.suggest}>
//                 <View style={styles.suggestrow}>
//                   <View style={styles.suggestcard}>
//                     <Text
//                       style={[
//                         styles.suggestcardtext,
//                         Constants.fontType.jRegular,
//                       ]}>
//                       Report Time:
//                       <Text
//                         style={[styles.innertext, Constants.fontType.jRegular]}>

//                         {item?.tat_time}
//                       </Text>
//                     </Text>
//                   </View>
//                   <View style={styles.suggestcard}>
//                     <Text
//                       style={[
//                         styles.suggestcardtext,
//                         Constants.fontType.jRegular,
//                       ]}>
//                       {' '}
//                       Recomended for:{' '}
//                       <Text
//                         style={[styles.innertext, Constants.fontType.jRegular]}>
//                         {' '}
//                         {item?.recommended_gender}{' '}
//                       </Text>{' '}
//                     </Text>
//                   </View>
//                 </View>
//                 <View style={styles.suggestrow}>
//                   <View style={styles.suggestcard}>
//                     <Text
//                       style={[
//                         styles.suggestcardtext,
//                         Constants.fontType.jRegular,
//                       ]}>
//                       Fast Time Required:{' '}
//                       <Text style={styles.innertext}>
//                         {' '}
//                         {item?.fasting_time}{' '}
//                       </Text>
//                     </Text>
//                   </View>
//                   <View style={styles.suggestcard}>
//                     <Text
//                       style={[
//                         styles.suggestcardtext,
//                         Constants.fontType.jRegular,
//                       ]}>

//                       Age Group:
//                       <Text style={styles.innertext}>
//                         {item?.recommended_age}
//                       </Text>
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>

//             <View style={[styles.BodyComponentfirstone, styles.paddingClass]}>
//               <View
//                 style={[
//                   {
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                   },
//                 ]}>
//                 <View style={{ paddingLeft: 10 }}>
//                   <PlanDetailReport />
//                 </View>
//                 <Text
//                   style={[
//                     styles.alertTextone,
//                     { paddingLeft: 10 },
//                     Constants.fontType.jSemi_bold,
//                   ]}>
//                   FREE E-Report will be sent to your registered email ID
//                 </Text>
//               </View>
//             </View>
//             {item?.specimen_instructions ? (
//               <View style={[styles.BodyComponentfirst, styles.paddingClass]}>
//                 <View style={[styles.FlexViewRow]}>
//                   <Icon
//                     style={{ marginRight: 4 }}
//                     name="infocirlce"
//                     size={15.5}
//                     color="#F75010"
//                   />
//                   <Text
//                     style={[styles.alertText, Constants.fontType.jSemi_bold]}>
//                     {item?.specimen_instructions}
//                   </Text>
//                 </View>
//               </View>
//             ) : null}

//             <View>
//               {testcriteria && testcriteria != "" ?
//                 <View>
//                   <Text style={[styles.subheading, Constants.fontType.jBold]}>
//                     Test Criteria
//                   </Text>
//                   {testcriteria?.map((item, value) => {
//                     return (
//                       <Criteria key={value} data={item} />
//                     )
//                   })}
//                 </View> : null}
//             </View>
//             <View>
//               {testparams && testparams.length != 0 ?
//                 <View>
//                   <View style={styles.txtHead}>
//                     <Text style={[styles.subheading, Constants.fontType.jBold]}>
//                       Tests Parameters
//                     </Text>
//                   </View>
//                   {testparams?.map((item, value) => {
//                     return (
//                       <Parameters key={value} data={item} />
//                     )
//                   })}
//                 </View> : null}
//             </View>

//             <View>
//               {questionandanswer && questionandanswer != "" ?
//                 <View>
//                   <Text style={[styles.subheading, Constants.fontType.jBold]}>
//                     Question and Answer
//                   </Text>
//                   {questionandanswer?.map((item, value) => {
//                     return (
//                       <QuestionAnswer key={value} data={item} />
//                     )
//                   })}
//                 </View> : null}
//             </View>
//           </View>
//         </ScrollView>
//       </View>

//       <View
//         style={[
//           styles.Bottom,
//           styles.BorderTop,
//           styles.paddingClass,
//           styles.FlexViewRow,
//         ]}>
//         <View style={[styles.bottomViewContainer]}>
//           <Text
//             style={{
//               fontSize: 12,
//               color: '#E5184E',
//               textDecorationLine: 'line-through',
//               marginTop: '2%',
//             }}>
//             Rs{' '}
//             {item?.package_city_prices
//               ? item?.package_city_prices?.package_price
//               : item?.package_price}
//           </Text>
//           <Text style={{ color: '#205072', fontSize: 14 }}>
//             Rs{' '}
//             {item?.package_city_prices
//               ? item?.package_city_prices?.offer_price
//               : item?.offer_price}
//             /-
//           </Text>
//         </View>
//         <View style={[styles.bottomViewContainer]}>
//           <Text
//             style={{
//               backgroundColor: '#47CACC',
//               color: '#FFFFFF',
//               fontSize: 10,
//               paddingVertical: '3%',
//               paddingHorizontal: '6%',
//               borderRadius: 5,
//               marginVertical: '2%',
//             }}>
//             Get{' '}
//             {Math.floor(
//               (((item?.package_city_prices
//                 ? item?.package_city_prices?.package_price
//                 : item?.package_price) -
//                 (item?.package_city_prices
//                   ? item?.package_city_prices?.offer_price
//                   : item?.offer_price)) /
//                 (item?.package_city_prices
//                   ? item?.package_city_prices?.package_price
//                   : item?.package_price)) *
//               100,
//             )}
//             % OFF
//           </Text>
//           <Button
//             onPress={() => {
//               navigate(Screens.MY_CART);
//               props.postPackageToCart(item.id, props?.token)
//               ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
//               setTimeout(() => {
//                 props.getCart(props.cityId?.cityid, props?.token)
//               }, 700)
//             }}
//             title="BOOK"
//             color="#E5184E"
//             borderRadius="5"
//             paddingHorizontal="10"
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// let styles = create(PlanDetailStyles);

// const mapStateToProps = state => ({
//   token: state.user?.userData?.token,
//   cityId: state.city?.cityObj,
//   plandetaildetails: state.plandetails,
//   testPara: state.plandetails,
// });

// const mapDispatchToProps = dispatch => {
//   return {
//     postPackageToCart: (packageId, token) => {
//       dispatch(BestpackageAction.postPackageToCart(packageId, token));
//     },
//     getCart: (cityId, token) => {
//       dispatch(PackageAction.getCart(cityId, token));
//     },
//     getPackParams: (packagesId) => {
//       dispatch(Actions.getPackParams(packagesId));
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PlanDetail);

import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlanDetailStyles from './PlanDetailStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  ToastAndroid,
  Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screens, navigate } from '../../helpers/Screens';
import Icon from 'react-native-vector-icons/AntDesign';
import { Transition, Transitioning } from 'react-native-reanimated';
import BestpackageAction from '../../components/OurBestPackages/BestPackageAction';
import PackageAction from '../../components/Packages/PackageActions';
import Constants from '../../staticData/Constants';
import PlanDetailReport from '../../staticData/svg/PlanDetailReport.svg';
import Actions from './PlanDetailAction'
import { replace } from 'lodash';
const { height, width } = Dimensions.get('screen')
const data = [
  {
    category: 'Who all are eligible for the test?',
    subCategories: [
      '•Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      '•Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadi',
    ],
  },
  {
    category: 'Who all are eligible for the test?',
    subCategories: [
      '•Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy',
      '•Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy •Lorem ipsum dolor sit amet, consetetur sadipscing elitr, ',
    ],
  },
];

const newdata = [
  {
    category: 'Complete Hemogram (24 Tests)',
    subCategories: [
      'Procedural',
      'Subspecialities',
      'training and certification',
    ],
  },
  {
    category: 'Complete Hemogram (24 Tests)',
    subCategories: [
      'Procedural',
      'Subspecialities',
      'training and certification',
    ],
  },
];

let packageDetailsTab = [
  'Introduction',
  'Test Criteria',
  'Test Parameters',
  'Q&A',
];

export const PlanDetail = props => {
  const item = props?.route?.params?.customParam;
  const scrollViewRef = useRef();
  console.log(item)
  const [currentIndex, setCurrentIndex] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [newcurrentIndex, setnewcurrentIndex] = useState(null);
  const [scrollRef, setScrollRef] = useState(null);
  const [introductionX, setIntroductionX] = useState(null);
  const [introductionY, setIntroductionY] = useState(null);
  const [testCriteriaX, setTestCriteriaX] = useState(null);
  const [testCriteriaY, setTestCriteriaY] = useState(null);
  const [testParamsX, setTestParamsX] = useState(null);
  const [testParamsY, setTestParamsY] = useState(null);
  const [packagename, setpackagename] = useState(item?.slug);
  const [cityname, setcityname] = useState(props?.cityId?.city)
  const [test, settest] = useState(false)
  const [qaX, setQaX] = useState(null);
  const [qaY, setQaY] = useState(null);

  const ref = useRef();

  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={200} />
      <Transition.Change />
      <Transition.Out type="fade" durationMs={200} />
    </Transition.Together>
  );

  const scrollToView = index => {
    switch (index) {
      case 0:
        scrollRef.scrollTo({
          x: introductionX,
          y: introductionY,
          animated: true,
        });
        break;
      case 1:
        scrollRef.scrollTo({
          x: testCriteriaX,
          y: testCriteriaY,
          animated: true,
        });
        break;
      case 2:
        scrollRef.scrollTo({
          x: testParamsX,
          y: testParamsY,
          animated: true,
        });
        break;
      case 3:
        scrollRef.scrollTo({
          x: qaX,
          y: qaY,
          animated: true,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    props?.getPackParams(item.id)
  }, [item?.id]);

  console.log(props?.route?.params?.customParam?.text_criteria)
  const [testcriteria, settestcriteria] = useState(props?.route?.params?.customParam?.text_criteria ? JSON.parse(props?.route?.params?.customParam?.text_criteria.replace("in Delhi", `in ${props?.cityId?.city}`)) : [])
  const [questionandanswer, setquestionandanswer] = useState(props?.route?.params?.customParam?.qna ? JSON.parse(props?.route?.params?.customParam?.qna.replace("in Delhi", `in ${props?.cityId?.city}`)) : [])
  const [testparams, settestparams] = useState(props?.testPara?.param?.results)

  console.log(props?.cityId, "zxcvbnm")

  const Criteria = ({ data }) => {
    const [show, setShow] = useState(false);
    const { answer, question } = data
    return (
      <View style={[styles.Bodyformboxs, styles.paddingClass,]}>
        <View >
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setShow(!show)}>
              <Text style={styles.qStyle} numberOfLines={2} >
                {data?.question}
              </Text>
            </TouchableOpacity>
            {!show &&
              <AntDesign
                onPress={e => {
                  setShow(!show)
                }}
                style={styles.arrowSty}
                name="down"
                backgroundColor="#3b5998"
              />
            }
            {show &&
              <AntDesign
                onPress={e => {
                  setShow(!show)
                }}
                style={styles.arrowSty}
                name="up"
                backgroundColor="#3b5998"
              />
            }
          </View>
          <View style={styles.hideContent}>
            {data?.answer && show && data.answer?.list.map((val, index) => {
              // console.log(val, "laki km nhi krta")
              return (
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.txtVals}>{'\u2B24'}</Text>
                <Text style={styles.txtVal}>{val}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  const Parameters = ({ data }) => {
    console.log(data, 'laki km krta h')
    const [show, setShow] = useState(false);
    const { answer, question } = data
    return (
      <View style={[styles.Bodyformboxs, styles.paddingClass]}>
        <View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={{ maxWidth: '90%' }}
            >
              <Text style={{ color: '#707070' }}>
                {data?.name}
              </Text>
            </TouchableOpacity>
            {!show &&
              <AntDesign

                onPress={e => {
                  setShow(!show)
                }}
                style={styles.arrowSty}
                name="down"
                backgroundColor="#3b5998"
              />
            }
            {show &&
              <AntDesign
                onPress={e => {
                  setShow(!show)
                }}
                style={styles.arrowSty}
                name="up"
                backgroundColor="#3b5998"
              />
            }
          </View>
          <View style={styles.hideContent}>
            {data?.package_details && show && data?.package_details.map((val, index) => {
              // console.log(val, "laki km nhi krta")
              return (
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.txtVals}>{'\u2B24'}</Text>
                <Text style={styles.txtVal}>  {val.name}</Text>
              </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  const QuestionAnswer = ({ data }) => {
    const [show, setShow] = useState(false);
    const { answer, question } = data
    // console.log(data, 'laki km nhi krta')
    return (
      <View style={[styles.Bodyformbox, styles.paddingClass]}>
        <View>
        <TouchableOpacity
              onPress={() => setShow(!show)}
            >
          <View style={styles.row}>
            <View  style={{ maxWidth: '90%' }}
            >
              <Text style={{ color: '#707070', }} >
                {data?.question}
              </Text>
            </View>
            {!show &&
              <AntDesign
                onPress={e => {
                  setShow(!show)
                }}
                style={styles.arrowSty}
                name="down"
                backgroundColor="#3b5998"
              />
            }
            {show &&
              <AntDesign
                onPress={e => {
                  setShow(!show)
                }}
                style={styles.arrowSty}
                name="up"
                backgroundColor="#3b5998"
              />
            }
          </View>
          </TouchableOpacity>
          {data?.answer && show && (
            <View style={styles.hideContent}>
              <Text style={styles.txtVal}>{data.answer}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.TopNav}>
        <MaterialCommunityIcons
          onPress={e => {
            props.navigation.goBack();
          }}
          style={{ fontSize: 25, marginRight: 10 }}
          name="arrow-left"
          backgroundColor="#3b5998"
        />
        <Text style={[styles.topnavtext, Constants.fontType.jMedium]}>
          Package Details
        </Text>
      </View>

      <View style={[styles.Body, styles.paddingClass]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={ref => setScrollRef(ref)}>
          <View>
            <View
              onLayout={event => {
                const { layout } = event.nativeEvent;
                setIntroductionX(layout.x);
                setIntroductionY(layout.y);
              }}
              style={styles.intro}>
              <View style={styles.introheading}>
                <Text style={[styles.packname, Constants.fontType.jBold]}>
                  {item?.name}
                </Text>
              </View>
              <View style={styles.param}>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      styles.inclusionText,
                      { color: '#A7A7A7' },
                      Constants.fontType.jSemi_bold,
                    ]}>
                    Inclusions:
                  </Text>
                  <Text
                    style={[
                      styles.inclusionText,
                      { color: '#707070' },
                      Constants.fontType.jSemi_bold,
                    ]}>
                    {item?.parameter} Tests
                  </Text>
                </View>
                <Text style={[styles.paramtext, Constants.fontType.jRegular]}>
                  {item?.description}
                </Text>
              </View>
              <View style={styles.suggest}>
                <View style={styles.suggestrow}>
                  <View style={styles.suggestcard}>
                    <Text
                      style={[
                        styles.suggestcardtext,
                        Constants.fontType.jRegular,
                      ]}>
                      Report Time:
                      <Text
                        style={[styles.innertext, Constants.fontType.jRegular]}>

                        {item?.tat_time}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.suggestcard}>
                    <Text
                      style={[
                        styles.suggestcardtext,
                        Constants.fontType.jRegular,
                      ]}>
                      {' '}
                      Recomended for:{' '}
                      <Text
                        style={[styles.innertext, Constants.fontType.jRegular]}>
                        {' '}
                        {item?.recommended_gender}{' '}
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
                <View style={styles.suggestrow}>
                  <View style={styles.suggestcard}>
                    <Text
                      style={[
                        styles.suggestcardtext,
                        Constants.fontType.jRegular,
                      ]}>
                      Fast Time Required:{' '}
                      <Text style={styles.innertext}>
                        {' '}
                        {item?.fasting_time}{' '}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.suggestcard}>
                    <Text
                      style={[
                        styles.suggestcardtext,
                        Constants.fontType.jRegular,
                      ]}>
                      Age Group:
                      <Text style={styles.innertext}>
                        {item?.recommended_age}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={[styles.BodyComponentfirstone, styles.paddingClass]}>
              <View
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                ]}>
                <View style={{ paddingLeft: 10 }}>
                  <PlanDetailReport />
                </View>
                <Text
                  style={[
                    styles.alertTextone,
                    { paddingLeft: 10 },
                    Constants.fontType.jSemi_bold,
                  ]}>
                  FREE E-Report will be sent to your registered email ID
                </Text>
              </View>
            </View>
            {item?.specimen_instructions ? (
              <View style={[styles.BodyComponentfirst, styles.paddingClass]}>
                <View style={[styles.FlexViewRow]}>
                  <Icon
                    style={{ marginRight: 4 }}
                    name="infocirlce"
                    size={15.5}
                    color="#F75010"
                  />
                  <Text
                    style={[styles.alertText, Constants.fontType.jSemi_bold]}>
                    {item?.specimen_instructions}
                  </Text>
                </View>
              </View>
            ) : null}
            <View>
              {testcriteria && testcriteria != "" ?
                <View>
                  <Text style={[styles.subheading, Constants.fontType.jBold]}>
                    Test Criteria
                  </Text>
                  {testcriteria?.map((item, value) => {
                    return (
                      <Criteria key={value} data={item} />
                    )
                  })}
                </View> : null}
            </View>
            <View>
              {testparams && testparams.length != 0 ?
                <View>
                  <View style={styles.txtHead}>
                    <Text style={[styles.subheading, Constants.fontType.jBold]}>
                      Tests Parameters
                    </Text>
                  </View>
                  {testparams?.map((item, value) => {
                    return (
                      <Parameters key={value} data={item} />
                    )
                  })}
                </View> : null}
            </View>
            <View>
              {questionandanswer && questionandanswer != "" ?
                <View>
                  <Text style={[styles.subheading, Constants.fontType.jBold]}>
                    Question and Answer
                  </Text>
                  {questionandanswer?.map((item, value) => {
                    return (
                      <QuestionAnswer key={value} data={item} />
                    )
                  })}
                </View> : null}
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={[
          styles.Bottom,
          styles.BorderTop,
          styles.paddingClass,
          styles.FlexViewRow,
        ]}>
        <View style={[styles.bottomViewContainer]}>
          <Text
            style={{
              fontSize: 12,
              color: '#E5184E',
              textDecorationLine: 'line-through',
              marginTop: '2%',
            }}>
            Rs{' '}
            {item?.package_city_prices
              ? item?.package_city_prices?.package_price
              : item?.package_price}
          </Text>
          <Text style={{ color: '#205072', fontSize: 14 }}>
            Rs{' '}
            {item?.package_city_prices
              ? item?.package_city_prices?.offer_price
              : item?.offer_price}
            /-
          </Text>
        </View>
        <View style={[styles.bottomViewContainer]}>
          <Text
            style={{
              backgroundColor: '#47CACC',
              color: '#FFFFFF',
              fontSize: 10,
              paddingVertical: '3%',
              paddingHorizontal: '6%',
              borderRadius: 5,
              marginVertical: '2%',
            }}>
            Get{' '}
            {Math.floor(
              (((item?.package_city_prices
                ? item?.package_city_prices?.package_price
                : item?.package_price) -
                (item?.package_city_prices
                  ? item?.package_city_prices?.offer_price
                  : item?.offer_price)) /
                (item?.package_city_prices
                  ? item?.package_city_prices?.package_price
                  : item?.package_price)) *
              100,
            )}
            % OFF
          </Text>
          <Button
            onPress={() => {
              navigate(Screens.MY_CART);
              props.postPackageToCart(item.id, props?.token)
              ToastAndroid.show("Added to cart", ToastAndroid.SHORT);
              setTimeout(() => {
                props.getCart(props.cityId?.cityid, props?.token)
              }, 700)
            }}
            title="BOOK"
            color="#E5184E"
            borderRadius="5"
            paddingHorizontal="10"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

let styles = create(PlanDetailStyles);

const mapStateToProps = state => ({
  token: state.user?.userData?.token,
  cityId: state.city?.cityObj,
  plandetaildetails: state.plandetails,
  testPara: state.plandetails,
});

const mapDispatchToProps = dispatch => {
  return {
    postPackageToCart: (packageId, token) => {
      dispatch(BestpackageAction.postPackageToCart(packageId, token));
    },
    getCart: (cityId, token) => {
      dispatch(PackageAction.getCart(cityId, token));
    },
    getPackParams: (packagesId) => {
      dispatch(Actions.getPackParams(packagesId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetail);