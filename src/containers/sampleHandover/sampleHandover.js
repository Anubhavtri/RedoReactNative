import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { create } from '../../helpers/PlatformSpecificStyles'

import samplehandoverStyles from './samplehandoverStyles'

import TextInput from '../../baseComponents/textInput/TextInput'

import Action from './sampleHandoverAction'
import PhleboList from './phleboList'
import Button from '../../baseComponents/button/Button'

export const BookingCard = ({ bookingDetails, onPress = () => { } }) => {

    return (
        <View
            key={bookingDetails.id}
            style={[styles.rowDirection, styles.distributeFields, styles.coveredBorder]}>

            <View style={styles.packageDetailBox}>
                <Text>{bookingDetails.pk}</Text>
                <Text>{bookingDetails.customer_name}</Text>
            </View>

        </View>);
}

const sampleHandover = (props) => {

    const [pickupamount, setpickupamount] = useState("")
    const [bookinglistModal, setbookinglistModal] = useState(false);
    const [selectedBookings, setselectedBookings] = useState([]);
    const [phleboListModal, setphleboListModal] = useState(false);
    const [phleboId, setphleboId] = useState()
    const [phleboName, setphleboName] = useState()
    const [lattitude, setlattitude] = useState()
    const [longitude, setlongitude] = useState()
    useEffect(() => {
        props.getallPhleboDetails()
    }, [])

    const phleboid = (id) => {
        setphleboId(id)
    }
    const phleboname = (value) => {
        setphleboName(value)
    }

    const samplehandoverbody = () => {
        const body = {
            given_to: phleboId,

        }
        props.submitSample(body);
    }
    const BookingId = () => {
        return selectedBookings.map((item) => { return item.pk })
    }
    
    const bookingCard = selectedBookings?.map(item => <BookingCard bookingDetails={item} />)
   
    return (
        <View>
            <Text style={styles.keyBox}>Given to</Text>

            <TextInput style={styles.textWithLabelContainer}
                value={phleboName}
                placeholder='Select Rider name'
            />
            <TouchableOpacity onPress={() => setphleboListModal(true)}>

                <Text style={styles.addtext}>+ CHOOSE RIDER</Text>
            </TouchableOpacity>

            <PhleboList
                isModalVisible={phleboListModal}
                onCloseModal={() => setphleboListModal(false)}
                phleboid={phleboid}
                phleboname={phleboname}
            />
            
            <Button text='SUBMIT'
                onPress={samplehandoverbody} />
        </View>
    )
}

const styles = create(samplehandoverStyles)

const mapStateToProps = (state) => ({

    token: state.user.token,
    phlebolist: state.samplehandover.phleboList,
})

const mapDispatchToProps = (dispatch) => {
    return {
       
        getallPhleboDetails: (token) => {
            dispatch(Action.getallPhleboDetails(token))
        },
        submitSample: (body, token) => {
            dispatch(Action.submitSample(body, token))
        }
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        getBookings: () => {
            dispatchProps.getBookings(stateProps.token, ownProps.bookingStatus);
        },
        getallPhleboDetails: () => {
            dispatchProps.getallPhleboDetails(stateProps.token)
        },
        submitSample: body => {
            dispatchProps.submitSample(body, stateProps.token)
        },
    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(sampleHandover);
