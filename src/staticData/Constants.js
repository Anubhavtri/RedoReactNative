import {Platform} from 'react-native';

export default {
  fontType: {
    jBold: Platform.select({
      ios: {
        fontFamily: 'Jost-Bold',
        fontWeight: 'bold',
      },
      android: {
        fontFamily: 'Jost-Bold',
      },
    }),

    jSemi_bold: Platform.select({
      ios: {
        fontFamily: 'Jost-SemiBold',
        fontWeight: '600',
      },
      android: {
        fontFamily: 'Jost-SemiBold',
      },
    }),

    jMedium: Platform.select({
      ios: {
        fontFamily: 'Jost-Medium',
        fontWeight: '500',
      },
      android: {
        fontFamily: 'Jost-Medium',
      },
    }),
    jRegular: Platform.select({
      ios: {
        fontFamily: 'Jost-Regular',
        fontWeight: '400',
      },
      android: {
        fontFamily: 'Jost-Regular',
      },
    }),
  },

  bestPackage: 'Best Package',
  allPackage: 'All Packages',
  covidPackage: 'Covid Package',
  fullBodyPackage: 'Full Body Package',

  packageDetailsConstant: {
    introduction: 'Introduction',
    testCriteria: 'Test Criteria',
    testParameters: 'Test Parameters',
    qa: 'Q&A',
  },
};
