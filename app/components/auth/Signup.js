import React from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Button from '../common/Button';
import Input from '../common/Input';
import Title from '../common/Title';
import { goLogin } from '../../Navigation';
import { createUser } from '../../actions/AuthActions';

class Signup extends React.PureComponent {
    state = {
        user: '',
        password: ''
    };

    onChangeUser = text => {
        this.setState({
            user: text
        });
    };

    onChangePassword = text => {
        this.setState({
            password: text
        });
    };

    onPressSignup = () => {
        const {user, password} = this.state;
        this.props.createUser(user, password);
    };

    onGoBack = () => {
        goLogin();
    };

    renderButtons() {
        if(this.props.auth.loading) {
            console.warn(this.props.auth);
            return <ActivityIndicator />
        } else {
            console.warn(this.props.auth);
            return <Button textButton='Signup' onPress={this.onPressSignup.bind(this)} /> 
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Title title='Instagram' />
                <Input 
                    placeholder='email@gmail.com'
                    onChange={this.onChangeUser.bind(this)}
                    value={this.state.user}
                />
                <Input 
                    placeholder='password'
                    secureTextEntry
                    onChange={this.onChangePassword.bind(this)}
                    value={this.state.password}
                />
                <Text>{this.props.auth.errorCreating}</Text>
                {this.renderButtons()}
                <TouchableOpacity onPress={this.onGoBack.bind(this)}>
                    <View>
                        <Text style={styles.text}>Already got an account, take me back!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {createUser}
)(Signup);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    text: {
        color: 'blue',
        fontSize: 15
    }
})