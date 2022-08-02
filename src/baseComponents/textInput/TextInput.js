import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    View,
    ViewPropTypes,
    TextInput as ReactTextInput,
    Platform
} from 'react-native';
import { create } from '../../helpers/PlatformSpecificStyles';
import TextInputStyles, { PropStyles } from './TextInputStyles';

class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
           
        };
        this.focus = this.focus.bind(this);
    }
    
    focus() {
        this.rntextinput && this.rntextinput.focus();
    }
    render() {
        let underlineColor, underlineWidth = 1;
        if (this.state.isFocused) {
            underlineColor = PropStyles.textInputUnderlineColorInFocus;
            underlineWidth = 1;
        } 
        else {
            underlineColor = PropStyles.textInputUnderlineColorInblur;
        }
        
        if (this.props.hasErrors) {
            underlineColor = PropStyles.textInputErrorColor;
        }
        let textInputStyle = [styles.textInputContainer];
        let textInputProps = {};

        if (!this.props.doNotUseValueProp)
            textInputProps.value = this.props.value;

            textInputStyle.push( { borderColor: underlineColor, borderWidth: underlineWidth });
        return (
            <View style={[textInputStyle,this.props.style]}>
                <ReactTextInput 
                    style={[styles.textInput]}
                    allowFontScaling={false}
                    autoFocus={this.props.autoFocus}
                    returnKeyType={this.props.returnKeyType}
                    keyboardType={this.props.keyboardType}
                    {...textInputProps}
                    testID={this.props.testID}
                    ref={rntextinput => this.rntextinput = rntextinput}
                    accessible
                    accessibilityLabel={this.props.testID}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={PropStyles.textInputPlaceholderTextColor}
                    editable={this.props.editable}
                    secureTextEntry={this.props.secureTextEntry}
                    autoCapitalize = {'none'}
                    autoCompleteType = {'off'}
                    textContentType={'none'}
                    maxLength={this.props.maxLength}
                    onFocus={() => this.setState({ isFocused: true })}
                    onBlur={() => this.setState({ isFocused: false })}
                    onSubmitEditing= {this.props.onSubmitEditing}
                />
            </View>
        );
    }
}

let styles = create(TextInputStyles);

TextInput.propTypes = {
    autoCapitalize: PropTypes.string,
    autoCorrect: PropTypes.bool,
    autoFocus: PropTypes.bool,
    doNotUseValueProp: PropTypes.bool,
    editable: PropTypes.bool,
    hasErrors: PropTypes.bool,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number,
    onBlur: PropTypes.func,
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    returnKeyType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    stacked: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]),
    testID: PropTypes.string,
    textInputContainerStyle: ViewPropTypes.style,
    value: PropTypes.string.isRequired,
    returnKeyType: PropTypes.string,
    onSubmitEditing: PropTypes.func
};

TextInput.defaultProps = {
    doNotUseValueProp: false
};

export default TextInput;
