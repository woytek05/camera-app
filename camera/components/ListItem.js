import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    Alert,
    Switch,
} from "react-native";
import MyButton from "./MyButton";
import margin from "../Styles/Margin";
import colors from "../Styles/Colors";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected ? this.props.selected : false,
        };
    }

    handlePhotoPress = () => {
        this.setState(
            {
                selected: !this.state.selected,
            },
            () => {
                this.props.togglePhoto(this.props.id, this.state.selected);
            }
        );
    };

    showDetails = () => {
        this.props.navigation.navigate("bigphoto", {
            uri: this.props.uri,
            id: this.props.id,
            refresh: this.props.refresh,
            deletePhoto: this.props.deletePhoto,
            uploadPhoto: this.props.uploadPhoto,
        });
    };

    render() {
        return (
            <TouchableOpacity
                style={[styles.flex1, ...[margin(5)]]}
                onLongPress={this.handlePhotoPress}
                onPress={this.showDetails}
            >
                {this.state.selected ? (
                    <View style={styles.center}>
                        <Image
                            style={[
                                {
                                    width: this.props.blockWidth,
                                    height: this.props.blockHeight,
                                },
                                styles.lowOpacity,
                            ]}
                            source={{ uri: this.props.uri }}
                        />
                        <View
                            style={[styles.rule, styles.horizontalRule]}
                        ></View>
                        <View style={[styles.rule, styles.verticalRule]}></View>
                    </View>
                ) : (
                    <View style={styles.center}>
                        <Image
                            style={[
                                styles.center,
                                {
                                    width: this.props.blockWidth,
                                    height: this.props.blockHeight,
                                },
                            ]}
                            source={{ uri: this.props.uri }}
                        />
                    </View>
                )}
            </TouchableOpacity>
        );
    }
}

const styles = require("../Styles/Styles");

export default ListItem;
