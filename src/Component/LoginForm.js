import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './Common'; 

class LoginForm extends Component {

    state = { email: '', pass: '', error: '', loading: false };

    onButtonPress() {
        const { email, pass } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, pass)
            .catch(
                this.onLoginFail()
           );
        });
    }

    onLoginFail = () => {
        this.setState({ error: 'Authentification failed.', loading: false });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            pass: '',
            error: '',
            loading: false
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size='small' />;
        }
        return (
            <Button
                onPress={this.onButtonPress.bind(this)}
            >
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder='user@gmail.com'
                        label='Email'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        style={styles.errorTextStyle}
                        placeholder='password'
                        label='Password'
                        value={this.state.pass}
                        onChangeText={pass => this.setState({ pass })}
                        secureTextEntry
                    />
                </CardSection>
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        alignSelf: 'center',
        fontSize: 20,
        color: '#f00'
    }
};

export default LoginForm;
