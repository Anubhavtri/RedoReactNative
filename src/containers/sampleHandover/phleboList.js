import React,{ useEffect, useState } from 'react'
import { View,TouchableOpacity,Text,ScrollView} from 'react-native'
import { connect } from 'react-redux';
import TextInput from '../../baseComponents/textInput/TextInput';
import SingleModal from '../../components/singleModal/SingleModal';
import CouponBoxStyles from './CouponBoxStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import Action from './sampleHandoverAction'

const PhleboList = (props) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = (userText) => {
        setSearchText(userText);
        props.fetchPincodeObject(userText)
    }
    const List = ({ item, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} >
                <View style={styles.pincodeTextContainer}>
                <Text style={styles.pincodetext}>{item?.id}-{item?.user.name}</Text>
                </View>
            </TouchableOpacity >
        )
    }
    const closeModal = () => {
        props.onCloseModal();
    };

    return (
        <SingleModal title={'All Phlebo List'}
            isModalVisible={props.isModalVisible}
            onCancel={closeModal}
            shouldRenderLeftButton
            onSave={closeModal}
        >
            <ScrollView>
                <View style={styles.searchBox}>
                    <TextInput
                        value={searchText}
                        // onChangeText={userText => handleSearchTextChange(userText)}
                        placeholder={'Search phlebo name'}
                    />

                </View>
                {props.phlebolist?.map((item) => {
                    return (
                        <ScrollView>
                        <List
                            item={item}
                            onPress={() => {
                                props.phleboid(item.id)
                                props.phleboname(item.user.name)
                                closeModal();
                            }}
                        />
                        </ScrollView>)
                })}

            </ScrollView>
        </SingleModal>
    )
}
const styles = create(CouponBoxStyles)
const mapStateToProps = (state) => ({
    token: state.user.token,
    phlebolist:state.samplehandover.phleboList,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getallPhleboDetails: (token) =>{
            dispatch(Action.getallPhleboDetails(token))
        }
    }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {

    let actionProps = Object.assign({}, dispatchProps, {
       
        getallPhleboDetails: () =>{
            dispatchProps.getallPhleboDetails(stateProps.token)
        }
    });

    return Object.assign({}, ownProps, stateProps, actionProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PhleboList);
