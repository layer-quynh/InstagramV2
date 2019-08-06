import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return (
        <TextInput 
            style={[styles.input, props.styles]}
            value={props.value}
            placeholder={props.placeholder}
            onChangeText={props.onChange}
            secureTextEntry={props.secureTextEntry}
        />
    )
};

export default Input;

const styles = StyleSheet.create({
    input: {
        width: 300,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#dfe6e9',
        borderColor: '#b2bec3',
        margin: 10,
        padding: 10
    }
});