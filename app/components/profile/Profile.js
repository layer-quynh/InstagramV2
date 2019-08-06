import React from 'react';
import { View, Text, ScrollView, Platform, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/ProfileActions';
import { fetchPosts } from '../../actions/PostActions';
import Button from '../common/Button';
import Header from '../common/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Post from '../post/Post';

class Profile extends React.PureComponent {
    state = {
        show: {
            grid: true,
            full: false,
            pinned: false,
            saved: false
        },
    };

    componentWillMount() {
        this.props.fetchProfile();
        this.props.fetchProfile();
    };

    componentWillReceiveProps(nextProps) {
        // console.warn(this.props);
        if(this.props !== nextProps && nextProps.profile !== undefined) {
            this.setState({
                name_profile: nextProps.profile.name_profile,
                username: nextProps.profile.username,
                userpic: nextProps.profile.userpic,
                bio: nextProps.profile.bio,
                posts: nextProps.profile.posts_number,
                followers: nextProps.profile.followers,
                following: nextProps.profile.following,
                all_posts: nextProps.posts,
                postsKeys: Object.keys(nextProps.posts),
                postsArray: Object.values(nextProps.posts)
            });
        }
    }

    renderImage() {
        // if(this.props.profile === null) {
        //     return <Text>Loading image...</Text>
        // }
        // // console.warn(this.state.userpic);
        // // if(this.props.profile.userpic !== undefined || this.props.profile.userpic !== null) {
        //     return <Image style={{ width: 100, height: 100, borderRadius: 50}} source={{ uri: this.props.profile.userpic}} />
        // }
        if(this.state.userpic) {
            return <Image style={{ width: 100, height: 100, borderRadius: 50}} source={{ uri: this.state.userpic}} />
        }
        return <Text>Loading image...</Text>
    };

    showGrid() {
        this.setState({
            show: {
                grid: true,
                full: false,
                pinned: false,
                saved: false
            }
        });
    };

    showFull() {
        this.setState({
            show: {
                grid: false,
                full: true,
                pinned: false,
                saved: false
            }
        });
    };

    renderPosts() {
        if(this.state.show.grid && !this.state.show.full && !this.state.show.pinned && !this.state.show.saved) {
            if(this.state.postsArray) {
                const posts = this.state.postsArray;
                const keys = this.state.postsKeys;

                return posts.map((post, i) => {
                    return (
                        <TouchableOpacity key={keys[i]}>
                            <View>
                                <Image source={{ uri: post.image }} style={{ width: 122.5, height: 122.5, margin: 1}} />
                            </View>
                        </TouchableOpacity>
                    );
                });
            }
        }

        if(!this.state.show.grid && this.state.show.full && !this.state.show.pinned && !this.state.show.saved) {
            if(this.state.postsArray) {
                const posts = this.state.postsArray;
                const keys = this.state.postsKey;

                return posts.map((post, i) => {
                    return <Post {...post} key={keys[i]} postKey={keys[i]} />
                });
            }
        }
    };

    gotoEdit() {

    };

    render() {
        // console.warn(this.props);
        return (
            <View style={styles.container}>
            {/* {!this.props.profile && (
                <View>
                    <Text>Loading...</Text>
                </View>
            )} */}
                <Header title={this.state.username} />
                <ScrollView contentContainerStyle={{ justifyContent: 'center' }}>
                    <View style={styles.picAndInfo}>
                        {this.renderImage()}
                        <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <View style={{ flexDirection: 'column', margin: 10, marginBottom: 5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}}>{this.state.posts}</Text>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>posts</Text>
                                </View>
                                <View style={{ flexDirection: 'column', margin: 10, marginBottom: 5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}}>{this.state.followers}</Text>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>followers</Text>
                                </View>
                                <View style={{ flexDirection: 'column', margin: 10, marginBottom: 5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', alignSelf: 'center'}}>{this.state.following}</Text>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>following</Text>
                                </View>
                            </View>
                            <Button 
                                // styles={{ width: 200, height: 30, backgroundColor: 'white', borderColor: '#dcdde1', borderWidth: 1}}
                                styles={styles.editProfileButton}
                                textButton="Edit profile"
                                textStyle={{ color: 'black' }}
                                onPress={this.gotoEdit.bind(this)}
                            />
                        </View>
                    </View>
                    <View style={styles.userBioStories}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', paddingLeft: 40 }}>{this.state.name_profile}</Text>
                        <Text style={{ fontSize: 12 }}>{this.state.bio}</Text>
                        <View style={{ flexDirection: 'column', marginTop: 10, marginBottom: 8}}>
                            <TouchableOpacity>
                                <View>
                                    <Image 
                                        style={{ width: 80, height: 80 }}
                                        source={{
                                            uri: 'https://image.ibb.co/kxRZNe/image.png'
                                        }}
                                    />
                                    <Text style={{ marginLeft: 26, marginTop: 2, marginBottom: 2}}>New</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.typeView}>
                        <TouchableOpacity onPress={this.showGrid.bind(this)}>
                            <View>
                                <Ionicons
                                    name="md-grid"
                                    size={30}
                                    color={this.state.show.grid ? '#00a8ff' : '#dcdde1'}
                                    style={{ marginLeft: 35, marginRight: 35, marginTop: 5, marginBottom: 5}}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.showFull.bind(this)}>
                            <View>
                                <Ionicons
                                    name="md-square-outline"
                                    size={30}
                                    color={this.state.show.full ? '#00a8ff' : '#dcdde1'}
                                    style={{ marginLeft: 35, marginRight: 35, marginTop: 5, marginBottom: 5}}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>{this.renderPosts()}</View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    posts: state.post.posts
});

export default connect(
    mapStateToProps,
    { fetchPosts, fetchProfile }
)(Profile);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    picAndInfo: {
        flexDirection: 'row',
        margin: 5,
        marginTop: 10,
        marginLeft: 15
    },
    userBioStories: {
        flexDirection: 'column',
        margin: 10,
        marginTop: 5,
        borderBottomColor: '#dcdde1',
        borderBottomWidth: 1
    },
    typeView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    miniImage: {
        width: 125,
        height: 125,
        margin: 1
    },
    editProfileButton: {
        width: 200, 
        height: 30, 
        backgroundColor: 'white', 
        borderColor: '#dcdde1', 
        borderWidth: 1
    }
});