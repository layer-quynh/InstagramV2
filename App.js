import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'react-native-firebase';
import Main from './app/Main';

export default class App extends React.PureComponent {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDThWt29wGn_rpmrs2BcOen0kWzwz1G_YM",
      authDomain: "instagram-1510.firebaseapp.com",
      databaseURL: "https://instagram-1510.firebaseio.com",
      projectId: "instagram-1510",
      storageBucket: "",
      messagingSenderId: "715681796924",
      appId: "1:715681796924:web:510969a9f5768eec"
    };

    firebase.initializeApp(config);
  };

  render() {
    return (
      <View style={styles.container}>
        <Main />
      </View>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  }
});