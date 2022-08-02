import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Actions from './PendingPackageAction';
import { connect } from 'react-redux';
import BlankCardWithHeader from '../../components/blankCardWithHeader/BlankCardWithHeader';
import FlatButton from '../../baseComponents/button/FlatButton';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../helpers/Screens';
const PendingScreen = (props) => {
    return (
        <BlankCardWithHeader header={'BATCH DETAILS'}>
            <View>
                
               <Text>jhfgeygfvjwhegf,uwek,fjdkb</Text>

            </View>
        </BlankCardWithHeader>
    );
}
const mapStateToProps = (state) => ({
    assignedSamples: state.pending.assignedSample,
    token: state.user.token,
})

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}
export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    return {}
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PendingScreen);
