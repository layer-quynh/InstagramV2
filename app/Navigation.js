import { Navigation } from 'react-native-navigation';
import mainTab from './components/appNavigator/MainTab';

export const rootNavigatorApp = () => Navigation.setRoot({
  root: {
    sideMenu: {
      center: {
        bottomTabs: mainTab,
      },
    },
  },
});

export const startApp = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'Login',
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
              }
            }
          }
        }
      ]
    }
  }
})

export const goSignup = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'Signup',
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
              },
            },
          },
        },
      ],
    },
  },
});

export const goLogin = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'Login',
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
              },
            },
          },
        },
      ],
    },
  },
});

export const goConfigPost = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'ConfigPost',
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
              },
            },
          },
        },
      ],
    },
  },
});

export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'Home',
            options: {
              topBar: {
                visible: false,
                drawBehind: true,
                animate: false,
              },
            },
            // passProps: {
            //   image: data
            // }
          },
        },
      ],
    },
  },
});