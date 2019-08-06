import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Header from '../common/Header';
import { connect } from 'react-redux';
import { selectImage } from '../../actions/PostActions';
import images from '../../assets/images/data.json';
import { goConfigPost } from '../../Navigation';

class AddPost extends React.PureComponent {
    state = {
        image: '',
        imageSelected: false
    };

    onSelectImage = ({ item }) => {
        this.setState({
            image: item.url,
            imageSelected: true
        });
    };

    renderHeader = () => {
        if(this.state.imageSelected) {
            return <Header title="Add Post" onNext={this.onPressNext.bind(this)} onCancel={this.onPressCancel.bind(this)} />
        }
        return <Header title="Add Post" onCancel={this.onPressCancel.bind(this)} />
    };

    onPressNext = () => {
        this.props.selectImage(this.state.image);
        const { componentId } = this.props;

        // Navigation.push(componentId, {
        //     component: {
        //         name: 'ConfigPost',
        //         passProps: {
        //             // image: this.state.image
        //         }
        //     },
        // })
        // goConfigPost(this.state.image);
        goConfigPost();
    };

    onPressCancel = () => {

    };

    renderImage = () => {
        if(!this.state.imageSelected) {
            return (
                <View style={styles.mainImageContainer}>
                    <Text>Select an image</Text>
                </View>
            );
        }

        return (
            <View style={styles.mainImageContainer}>
                <Image source={{ uri: this.state.image }} style={styles.mainImage} />
            </View>
        )
    };

    _renderItem = ({ item }) => (
        <TouchableOpacity style={styles.miniImageContainer} onPress={() => this.onSelectImage({ item })}>
            <View>
                <Image source={{ uri: item.url }} style={styles.miniImage} />
            </View>
        </TouchableOpacity>
    );

    _keyExtractor = (item, index) => item.name;

    render() {
        const {data} = this.props;
        return (
            <View style={styles.container}>
                {this.renderHeader()}
                <ScrollView>
                    {this.renderImage()}
                    <FlatList 
                        data={data.images}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        numColumns={3}
                        ItemSeparatorComponent={() => {
                            return <View style={{ width: 15 }} />;
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
};

const mapStateToProps = () => ({
    data: images
});

export default connect(
    mapStateToProps,
    {selectImage}
)(AddPost);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    mainImageContainer: {
        width: '100%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    mainImage: {
        width: '100%',
        height: '100%',
        // paddingVertical: 5
    },
    miniImage: {
        width: 100,
        height: 100,
        margin: 5
    },
    miniImage: {
        width: 100,
        height: 100
    }
});