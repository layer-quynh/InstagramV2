import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Button from '../common/Button';
import Input from '../common/Input';
import Title from '../common/Title';
import { goSignup } from '../../Navigation';
import { loginUser } from '../../actions/AuthActions';
import { rootNavigatorApp } from '../../Navigation'

class Login extends React.PureComponent {
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

    onPressLogin = () => {
        const { user, password } = this.state;
        this.props.loginUser(user, password);
    };

    onPressSignup = () => {
        goSignup();
        // Actions.Signup();
    };

    renderButtons() {
        if(this.props.auth.loading) {
            return <ActivityIndicator />
        } else if(this.props.auth.isLoginSuccess) {
            // const { componentId } = this.props;

            // Navigation.push(componentId, {
            // component: {
            //     name: 'Home',
            //         passProps: {
            //         },
            //     },
            // })
            rootNavigatorApp();
        } else {
            return (
                <View>
                    <Button textButton='Login' onPress={this.onPressLogin.bind(this)} />
                    <Button textButton='Signup' onPress={this.onPressSignup.bind(this)} />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Title title='Instagram' />
                <Input 
                    placeholder='mail@gmail.com'
                    onChange={this.onChangeUser.bind(this)}
                    value={this.state.user} 
                />
                <Input 
                    placeholder='password'
                    secureTextEntry
                    onChange={this.onChangePassword.bind(this)}
                    value={this.state.password}
                />
                <Text>{this.props.auth.errorLoging}</Text>
                {this.renderButtons()}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
})