import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import {store} from './Store';

import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/home';
import AddPost from './components/post/AddPost';
import Explore from './components/explore/Explore';
import Profile from './components/profile/Profile';
import Post from './components/post/Post';
import ConfigPost from './components/post/ConfigPost';
import InitScreen from './InitScreen';

const screens = [
    {
        id: 'InitScreen',
        screen: InitScreen,
    },
    {
        id: 'Login',
        screen: Login,
    },
    {
        id: 'Signup',
        screen: Signup,
    },
    {
        id: 'Home',
        screen: Home,
    },
    {
      id: 'AddPost',
      screen: AddPost
    },
    {
      id: 'Explore',
      screen: Explore
    },
    {
      id: 'Profile',
      screen: Profile
    },
    {
      id: 'Post',
      screen: Post
    },
    {
      id: 'ConfigPost',
      screen: ConfigPost
    }
];

function WrappedComponent(Component) {
    return function inject(props) {
      const EnhancedComponent = () => (
        <Provider store={store}>
          <Component
            {...props}
          />
        </Provider>
      );
  
      return <EnhancedComponent />;
    };
}

export function registerScreens() {
    screens.forEach(({ id, screen}) => 
        Navigation.registerComponent(id, () => WrappedComponent(screen))
    )
};
