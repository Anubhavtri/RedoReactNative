import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import HeaderStyles from './HeaderStyles';
import { create } from '../../helpers/PlatformSpecificStyles';
import PropTypes from 'prop-types';
import Text from '../../baseComponents/text/Text';

const Header = props => {


    const handleBackToAppAlert = () => {

        props.onCancel();
    }

    const renderLeftButton = () => (
        <TouchableOpacity
            testID="CancelButton"
            accessible
            accessibilityLabel="CancelButton"
            style={styles.singleModalCloseButtonStyle}
            onPress={handleBackToAppAlert}>

            <View>
                <Text style={styles.singleModalCloseText}>Cancel</Text>
            </View>

        </TouchableOpacity>
    );
    const renderRightButton = () => (
        <TouchableOpacity
            testID="SaveButton"
            accessible
            accessibilityLabel="SaveButton"
            style={styles.singleModalSaveButtonStyle}
            onPress={()=> props.onSave()}>

            <View>
                <Text style={styles.singleModalSaveText}>Save</Text>
            </View>

        </TouchableOpacity>
    );


    return (
        <View style={styles.navigationBarForModal}
            testID="ModalHeader">
            <View style={styles.navigationBarTitleView}>
                {renderLeftButton()}
                <Text testID="modalTitle"
                    style={[styles.headerTitleStyles, !props.shouldRenderLeftButton ? styles.titleLeftMargin : {}]}>{props.title}</Text>
                     {props.onSave && renderRightButton()}
            </View>
        </View>
    );

}

let styles = create(HeaderStyles);

Header.propTypes = {
    exitMessgage: PropTypes.string,
    modalNavigationText: PropTypes.string,
    mode: PropTypes.string,
    onCancel: PropTypes.func,
    shouldRenderLeftButton: PropTypes.bool,
    title: PropTypes.string
};

Header.defaultProps = {
    modalNavigationText: 'Back to App'
};

export default Header;
