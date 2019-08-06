import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { addPost } from '../../actions/PostActions';
import { connect } from 'react-redux';
import Input from '../common/Input';
import Button from '../common/Button';
import { goHome } from '../../Navigation';

class ConfigPost extends React.PureComponent {
    state = {
        description: '',
        location: ''
    };

    onChangeDescription = text => {
        this.setState({
            description: text
        });
    };

    onChangeLocation = text => {
        this.setState({
            location: text
        });
    };

    onAddPost = () => {
        this.props.addPost(this.props.image, this.state.location, this.state.description);
        goHome();
    };

    render() {
        // console.warn(this.props);
        return (
            <View style={styles.container}>
                <Image source={{ uri: this.props.image }} style={styles.image} />
                <View style={styles.propsContainer}>
                    <Text>Enter the description for the picture!</Text>
                    <Input 
                        styles={styles.input}
                        placeholder='Description...'
                        value={this.state.description}
                        onChange={this.onChangeDescription.bind(this)}
                    />
                </View>
                <View style={styles.propsContainer}>
                    <Text>Where it was taken?</Text>
                    <Input 
                        style={styles.input}
                        placeholder='Location'
                        value={this.state.location}
                        onChange={this.onChangeLocation.bind(this)}
                    />
                </View>
                <Button textButton='Add Post' onPress={this.onAddPost.bind(this)} />
                <TouchableOpacity>
                    <View>
                        <Text>Go back</Text>
                    </View>
                </TouchableOpacity>
            </View>
            // <View>
            //     <Text>Config Post</Text>
            // </View>
        )
    }
};

const mapStateToProps = state => ({
    image: state.post.post
});

export default connect (
    mapStateToProps,
    { addPost }
)(ConfigPost);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 15
    },
    image: {
        width: '100%',
        height: 300
    },
    input: {
        borderRadius: 0,
        backgroundColor: 'white',
        borderColor: 'white',
        borderBottomColor: 'grey'
    },
    propsContainer: {
        justifyContent: 'flex-start',
        margin: 10
    }
})