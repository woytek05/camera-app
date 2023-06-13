import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Image,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import MyButton from "./MyButton";
import * as MediaLibrary from "expo-media-library";
import { BackHandler } from "react-native";
import * as Sharing from "expo-sharing";
import colors from "../Styles/Colors";
const styles = require("../Styles/Styles");
import { LogBox } from "react-native";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

class BigPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    uploadPhoto = async () => {
        await this.props.route.params.uploadPhoto([this.props.route.params.id]);
        this.props.route.params.refresh();
        this.props.navigation.goBack();
    };

    sharePhoto = async () => {
        if (await Sharing.isAvailableAsync()) {
            Sharing.shareAsync(this.props.route.params.uri);
        }
    };

    deletePhoto = () => {
        this.props.route.params.deletePhoto([this.props.route.params.id]);
        this.props.route.params.refresh();
        this.props.navigation.goBack();
    };

    handleBackPress = () => {
        this.props.route.params.refresh();
        this.props.navigation.goBack();
        return true;
    };

    componentDidMount = async () => {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    };

    componentWillUnmount = () => {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackPress
        );
    };

    componentDidMount = () => {
        Image.getSize(this.props.route.params.uri, (width, height) => {
            this.setState({ width, height });
        });
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar />
                <View style={styles.flex1}>
                    <View
                        style={{
                            display: "flex",
                            flex: 3,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{
                                width: "80%",
                                height: 400,
                            }}
                            source={{ uri: this.props.route.params.uri }}
                        />
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 30,
                                color: colors.white,
                                fontWeight: "bold",
                            }}
                        >
                            {this.state.width} x {this.state.height}
                        </Text>
                    </View>
                    <View style={[styles.spaceAround, styles.row]}>
                        <MyButton
                            text="SHARE"
                            onPress={() => {
                                this.sharePhoto;
                            }}
                        ></MyButton>
                        <MyButton
                            text="DELETE"
                            onPress={() => {
                                this.deletePhoto;
                            }}
                        ></MyButton>
                        <MyButton
                            text="UPLOAD"
                            onPress={async () => {
                                await this.uploadPhoto();
                            }}
                        ></MyButton>
                    </View>
                </View>
            </View>
        );
    }
}

export default BigPhoto;
