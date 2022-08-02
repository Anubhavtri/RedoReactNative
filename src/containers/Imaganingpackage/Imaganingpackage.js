import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Actions from './ImaganingpackageAction'


export const Imaganingpackage = (props) => {

  const disableSpinner = () => setSpinnerVisibilty(false);

  useEffect(() => {
    // setSpinnerVisibilty(true);
    // props.getCart(props?.cityId?.cityid,props?.token)
    props.getProfileDetails();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Radiology</Text>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  token: state.user?.userData?.token,
  cityId: state.city?.cityObj,
});

const mapDispatchToProps = dispatch => {
  return {
    getProfileDetails: () => {
      dispatch(Actions.getProfileDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Imaganingpackage)