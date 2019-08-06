import { Navigation } from 'react-native-navigation';
// import RNFirebase from 'react-native-firebase';
// import { Provider } from 'react-redux';
import { registerScreens } from './Screens';
// import store from './Store';

// const config = {
//     apiKey: "AIzaSyDThWt29wGn_rpmrs2BcOen0kWzwz1G_YM",
//     authDomain: "instagram-1510.firebaseapp.com",
//     databaseURL: "https://instagram-1510.firebaseio.com",
//     projectId: "instagram-1510",
//     storageBucket: "",
//     messagingSenderId: "715681796924",
//     appId: "1:715681796924:web:510969a9f5768eec"
// };

// RNFirebase.initializeApp(config);

registerScreens();
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: 'InitScreen'
            }
        }
    })
})