import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { like, dislike, sendMessage } from '../../actions/PostActions';
import Input from '../common/Input';

class Post extends React.PureComponent {
    state = {
        message: '',
        showMessage: false
    };

    like = () => {
        this.props.like(this.props.postKey, this.props.likes)
    };

    dislike = () => {
        this.props.dislike(this.props.postKey, this.props.likes)
    };

    onWriteComment = text => {
        this.setState({
            message: text
        });
    };

    onSendComment = () => {
        this.props.sendMessage(this.props.postKey, this.props.comments_number, this.state.message);
        this.setState({
            message: ''
        });
    };

    renderHeart = () => {
        if(this.props.liked) {
            return (
                <TouchableOpacity>
                    <View>
                        <SimpleLineIcons name="heart" size={30} style={{ marginRight: 5 }} color="red" />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity>
                    <View>
                        <SimpleLineIcons name="heart" size={30} style={{ marginRight: 5 }} />
                    </View>
                </TouchableOpacity>
            )
        }
    };

    renderImage = () => {
        if(this.props.liked) {
            return (
                <TouchableOpacity activeOpacity={0.7} onPress={this.dislike.bind(this)}>
                    <View>
                        <Image source={{ uri: this.props.image }} style={styles.image} />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity activeOpacity={0.7} onPress={this.like.bind(this)}>
                    <View>
                        <Image source={{ uri: this.props.image }} style={styles.image} />
                    </View>
                </TouchableOpacity>
            )
        }
    };

    renderSendMessage = () => {
        if(this.state.message.length) {
            return (
                <TouchableOpacity style={{ flex: 0.2, marginTop: 27 }} onPress={this.onSendComment.bind(this)}>
                    <View>
                        <Text style={{ color: '#0984e3', fontSize: 12 }}>Send</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    };

    renderShowMessage = () => {
        if(!this.state.showMessage) {
            return (
                <TouchableOpacity onPress={this.showMessage.bind(this)} style={{ marginLeft: 15 }}>
                    <View>
                        <Text style={styles.textSeeComment}>See the {this.props.comments_number} comments</Text>
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity onPress={this.showMessage.bind(this)} style={{ marginLeft: 15 }}>
                    <View>
                        <Text style={styles.textSeeComment}>Close comments</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    };

    showMessage = () => {
        this.setState({
            showMessage: !this.state.showMessage
        });
    };

    renderMessage = () => {
        if(this.props.comments !== undefined) {
            const arrayMessages = Object.values(this.props.comments);
            const arrayKeys = Object.keys(this.props.comments);

            if(this.state.showMessage) {
                return arrayMessages.map((message, i) => {
                    return (
                        <View style={styles.message} key={arrayKeys[i]}>
                            <Text style={[styles.username, {fontSize: 13}]}>{message.username}</Text>
                            <Text style={[styles.text, {fontSize: 13}]}>{message.message}</Text>
                        </View>
                    )
                })
            }
        }
    }

    render() {
        // console.warn(this.props);
        return (
            <View>
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                    <Image source={{ uri: this.props.userpic }} style={styles.userPic} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.usernameTop}>{this.props.username}</Text>
                        <Text style={styles.location}>{this.props.location}</Text>
                    </View>
                </View>
                {this.renderImage()}
                <View style={{ flexDirection: 'row', marginLeft: 15, marginVertical: 1}}>
                    {this.renderHeart()}
                </View>
                <Text style={styles.likes}>{this.props.likes} likes</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.username}>{this.props.username}</Text>
                    <Text style={styles.text}>{this.props.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                    <Input 
                        onChange={this.onWriteComment.bind(this)}
                        style={styles.writeComment}
                        value={this.state.message}
                        placeholder="Write a message..." 
                    />
                    {this.renderSendMessage()}
                </View>
                <View style={{ alignContent: 'center' }}>{this.renderShowMessage()}</View>
                <View style={styles.seeComments}>{this.renderMessage()}</View>
            </View>
        )
    }
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(
    null,
    { like, dislike, sendMessage }
)(Post);

const styles = StyleSheet.create({
    image: {
        width: 330,
        height: 300,
        margin: 15,
        marginBottom: 1,
        marginTop: 1
      },
      likes: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 1,
        marginTop: 1,
        marginLeft: 15
      },
      username: {
        fontSize: 15,
        fontWeight: 'bold',
        margin: 15,
        marginTop: 1,
        marginRight: 5,
        marginBottom: 1
      },
      text: {
        fontSize: 15,
        margin: 15,
        marginTop: 1,
        marginLeft: 5,
        marginBottom: 1
      },
      seeComments: {
        margin: 15,
        marginTop: 1,
        marginLeft: 15
      },
      textSeeComments: {
        fontSize: 15,
        color: 'grey'
      },
      usernameTop: {
        margin: 15,
        marginLeft: 5,
        marginBottom: 2,
        fontWeight: 'bold'
      },
      userPic: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 15,
        marginLeft: 15,
        marginBottom: 3,
        marginRight: 2
      },
      location: {
        marginLeft: 5,
        marginBottom: 3,
        color: 'grey'
      },
      writeComment: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderRadius: 0,
        borderWidth: 0,
        flex: 0.8
      },
      messages: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 3
      }
})