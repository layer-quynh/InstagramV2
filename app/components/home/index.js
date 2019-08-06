import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../common/Header';
import { fetchPosts } from '../../actions/PostActions';
import Post from '../post/Post';
import ImagePicker from 'react-native-image-picker';

class Home extends React.PureComponent {
    state = {
        posts: []
    };

    componentWillMount() {
        this.props.fetchPosts();
    };

    componentWillReceiveProps(nextProps) {
        if(this.props !== nextProps) {
            this.setState({
                posts: nextProps.posts.posts
            });
        };
    };

    // componentDidUpdate(prevProps) {
    //     if(this.props !== prevProps) {
    //         this.setState({
    //             posts: this.props.posts.posts
    //         })
    //     }
    // }

    renderPosts() {
        if(this.state.posts === undefined || this.state.posts.length === 0) {
            return (
                <View>
                    <Text>You don't have any post here, may u want to add more?</Text>
                </View>
            )
        } else {
            const arrayPosts = Object.values(this.state.posts);
            const keysPosts = Object.keys(this.state.posts);

            return arrayPosts.map((post, i) => {
                return <Post {...post} key={keysPosts[i]} postKey={keysPosts[i]} />
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Header /> */}
                <View>
                    {/* <Text>Home</Text> */}
                    <ScrollView contentContainerStyle={styles.scrollContainer}>{this.renderPosts()}</ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.post
});

export default connect(
    mapStateToProps,
    { fetchPosts }
)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    scrollContainer: {

    }
})