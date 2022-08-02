import PropTypes from 'prop-types';
import React from 'react';
import {
    Modal,
    View
} from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import SingleModalStyles from './SingleModalStyles';
import Spinner from '../spinner/Spinner';
import Header from '../header/Header';


const SingleModal = (props) => {

    return (
        <Modal
            animationType="slide"
            visible={props.isModalVisible}
            onShow={props.onShow}
            onRequestClose={props.onCancel}>
                
            <Header
                title={props.title}
                shouldRenderLeftButton={true}
                onCancel={props.onCancel}
                mode={'singleModal'}
                onSave={props.onSave}
            />
            <Spinner visible={props.isModalSpinnerVisible} />
            <View style={{ flex: 1 }}>
                {props.children}
            </View>
        </Modal>
    );

}

let styles = create(SingleModalStyles);

SingleModal.propTypes = {
    children: PropTypes.node,
    isModalSpinnerVisible: PropTypes.bool,
    isModalVisible: PropTypes.bool,
    onCancel: PropTypes.func,
    shouldRenderLeftButton: PropTypes.bool,
    title: PropTypes.string
};
export default SingleModal;
