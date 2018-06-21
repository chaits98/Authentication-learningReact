import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner, Button, CardSection } from './Component/Common';
import LoginForm from './Component/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDWP5p9XrNLQW1k0cNiq9bvDcLt3AKmjsQ',
            authDomain: 'auth-84c72.firebaseapp.com',
            databaseURL: 'https://auth-84c72.firebaseio.com',
            projectId: 'auth-84c72',
            storageBucket: 'auth-84c72.appspot.com',
            messagingSenderId: '319945444644'
          });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });    
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent = () => {
        switch (this.state.loggedIn) {
            case true:
            return (
                <CardSection>
                    <Button onPress={() => firebase.auth().signOut()}>
                        Logout
                    </Button>
                </CardSection>
            );

            case false:
            return <LoginForm />;
            
            default:
            return <Spinner size='large' />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText={'Authentication'} />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
