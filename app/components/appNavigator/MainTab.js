import React from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';

const mainTab = {
    id: 'BottomTabsId',
    children: [
        {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Home',
                        },
                    },
                ],
                options: {
                    bottomTab: {
                        text: 'Home',
                        selectedTextColor: '#FF0000',
                        icon: require('../../assets/icons/fire.jpg'),
                        // icon: <AntDesign name='home' size={24} />,
                        // icon: require('../../themes/assets/icons/Riseset.png'),
                    },
                },
            },
        },
        {
            component: {
                name: 'AddPost',
                options: {
                    bottomTab: {
                        text: 'AddPost',
                        selectedTextColor: '#FF0000',
                        icon: require('../../assets/icons/fire.jpg'),
                        // icon: require('../../themes/assets/icons/Riseset.png'),
                    },
                },
            },
        },
        {
            component: {
                name: 'Explore',
                options: {
                    bottomTab: {
                        text: 'Explore',
                        selectedTextColor: '#FF0000',
                        icon: require('../../assets/icons/fire.jpg'),
                        // icon: require('../../themes/assets/icons/Riseset.png'),
                    },
                },
            },
        },
        {
            component: {
                name: 'Profile',
                options: {
                    bottomTab: {
                        text: 'Profile',
                        selectedTextColor: '#FF0000',
                        icon: require('../../assets/icons/fire.jpg'),
                        // icon: require('../../themes/assets/icons/Riseset.png'),
                    },
                },
            },
        },
    ],
    options: {
        bottomTabs: {
            visible: true,
            animate: true,
            drawBehind: false,
            backgroundColor: 'white',
        },
        topBar: { 
            visible: false, 
            drawBehind: true,
            height: 0, 
            animate: false,
            tabBarHidden: true
        }
    },

};

export default mainTab;