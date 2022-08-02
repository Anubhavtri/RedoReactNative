import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Text from '../../baseComponents/text/Text';
import TextInput from '../../baseComponents/textInput/TextInput';
import SingleModal from '../../components/singleModal/SingleModal';
import { useDispatch } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import { create } from '../../helpers/PlatformSpecificStyles';
import samplehandoverStyles from './samplehandoverStyles';

const ConfBookinglist = (props) => {

    const [isSpinnerVisible, setSpinnerVisibilty] = useState(false);

    const closeModal = () => {
        props.onCloseModal();
    };

    const handleCheckboxChange = (value, bookingDetail) => {
       
        if (props.onPackageSelect) {
            props.onPackageSelect(bookingDetail, value);      
        } else {
            let updatedPackageList = props.selectedBookings || []
            if (value) {
                updatedPackageList?.push(bookingDetail);
            }
            else {
                updatedPackageList = updatedPackageList.filter((item) => item.id !== bookingDetail.id);
            }
            props.updatePackageList({ packages: updatedPackageList.map(item => item.id) });

        }

    }

    return (
        <SingleModal title={'All Bookings'}
            isModalVisible={props.isModalVisible}
            onCancel={closeModal}
            isModalSpinnerVisible={isSpinnerVisible}
            shouldRenderLeftButton
            onSave={closeModal}
            >
            <ScrollView style={styles.listContainer}>

                <View style={styles.packageContainer}>
                    {props.confirmedbooking.map((item) => <IndividalPackage
                        bookingDetail={item}
                        onChange={handleCheckboxChange}
                        selectedPackageList={props.selectedBookings || []} />)}
                </View>
            </ScrollView>

        </SingleModal>
    )
}
const IndividalPackage = ({ bookingDetail, onChange, selectedBookingList = [] }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const handleChange = (newValue) => {
        // console.log(newValue)
        onChange(newValue, bookingDetail);
        setToggleCheckBox(newValue);
    }

    useEffect(() => {
        const checkSelection = selectedBookingList.find(item => item.id == packageDetail.id);
        if (checkSelection) {
            setToggleCheckBox(true)
        }
    }, [selectedBookingList])

    return (

        <View key={bookingDetail.id} style={styles.checkboxContainer}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => handleChange(newValue)}
                boxType={'square'}
            />
            <View style={styles.packageTextContainer}>
                <Text >{`${bookingDetail.pk}-${bookingDetail.customer_name}`}</Text>
            </View>
        </View>
    );
}
const styles= create(samplehandoverStyles)

const mapStateToProps = (state) => ({

    booking: state.bookings.selectedBooking,
    token: state.user.token,
    confirmedbooking:state.bookings?.confirmedBookings,

})

const mapDispatchToProps = (dispatch) => {
    return {
        getBookings: (token, bookingStatus) => {
            dispatch(BookingsAction.getBookings(token, bookingStatus));
        },
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
        getBookings: () => {
            dispatchProps.getBookings(stateProps.token, ownProps.bookingStatus);
        },
    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConfBookinglist);
