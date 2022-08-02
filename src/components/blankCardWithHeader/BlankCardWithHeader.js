import React from 'react'
import { View } from 'react-native';
import Text from '../../baseComponents/text/Text';
import { create } from '../../helpers/PlatformSpecificStyles';
import BlankCardWithHeaderStyle from './BlankCardWithHeaderStyle';

const BlankCardWithHeader = (props) => {
    return (
        <View style={styles.cardContainer}>
           
            <Text style={styles.headerContent}>
                {props.header}
            </Text>
            {props.children}
        </View>
    );
}

let styles = create(BlankCardWithHeaderStyle);

export default BlankCardWithHeader;