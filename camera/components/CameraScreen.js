import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    Button,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
    BackHandler,
    Animated,
} from "react-native";
import { Camera } from "expo-camera";
import CircleButton from "./CircleButton";
import * as MediaLibrary from "expo-media-library";
import padding from "../Styles/Padding";
import margin from "../Styles/Margin";
import RadioGroup from "./RadioGroup";
import * as ImagePicker from "expo-image-picker";
const variables = require("./variables");
import { LogBox } from "react-native";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

const styles = require("../Styles/Styles");

class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            camera: null,
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            pos: new Animated.Value(800),
            areSettingsHidden: true,
            ratio: "4:3",
            ratios: ["4:3", "16:9"],
            whiteBalance: "auto",
            whiteBalances: [],
            pictureSize: "4160x3120",
            pictureSizes: [],
            flashMode: "off",
            flashModes: [],
            loaded: false,
        };
    }

    showImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const data = new FormData();

            result.assets.forEach((el) => {
                const i = el.uri.lastIndexOf("/");
                el.fileName = el.uri.substring(i + 1);
                data.append(el.fileName, {
                    uri: el.uri,
                    type: "image/jpg",
                    name: el.fileName,
                });
            });

            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-type": "multipart/form-data",
                },
                body: data,
            };

            fetch(
                `${await variables.getServerAddress()}:${await variables.getServerPort()}/upload`,
                options
            )
                .then((response) => response.json())
                .then((data) => {
                    Alert.alert("Alert", data.response, [
                        {
                            text: "OK",
                        },
                    ]);
                })
                .catch((error) => console.log(error));
        }
    };

    toggleSettings() {
        if (this.state.areSettingsHidden) {
            toPos = 0;
        } else {
            toPos = 800;
        }

        Animated.spring(this.state.pos, {
            toValue: toPos,
            velocity: 1,
            tension: 0,
            friction: 10,
            useNativeDriver: true,
        }).start();

        this.setState({
            areSettingsHidden: !this.state.areSettingsHidden,
        });
    }

    takePicture = async () => {
        if (this.state.camera) {
            let foto = await this.state.camera.takePictureAsync();
            let asset = await MediaLibrary.createAssetAsync(foto.uri);
            this.props.route.params.refresh();
        }
    };

    changeCamera = () => {
        this.setState({
            type:
                this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
        });
    };

    handleBackPress = () => {
        this.props.route.params.refresh();
        this.props.navigation.goBack();
        return true;
    };

    onCameraReady = async () => {
        if (this.state.camera) {
            const pictureSizes =
                await this.state.camera.getAvailablePictureSizesAsync(
                    this.state.ratio
                );

            let whiteBalances = [];
            let flashModes = [];
            let pictureSizeId = 0;
            if (Platform.OS === "ios") {
                pictureSizeId = pictureSizes.indexOf("High");
            } else {
                // returned array is sorted in ascending order - default size is the largest one
                pictureSizeId = pictureSizes.length - 1;
            }

            for (const key of Object.keys(Camera.Constants.WhiteBalance)) {
                whiteBalances.push(key);
            }

            for (const key of Object.keys(Camera.Constants.FlashMode)) {
                flashModes.push(key);
            }

            this.setState({
                pictureSizes: pictureSizes,
                pictureSize: pictureSizes[pictureSizeId],
                whiteBalances: whiteBalances,
                flashModes: flashModes,
                loaded: true,
            });
        }
    };

    changeCameraSettings = async (option, value) => {
        if (option === "White Balance") {
            this.setState({ whiteBalance: value });
        } else if (option === "Flash Mode") {
            this.setState({ flashMode: value });
        } else if (option === "Camera Ratio") {
            const pictureSizes =
                await this.state.camera.getAvailablePictureSizesAsync(value);

            let pictureSizeId = 0;
            if (Platform.OS === "ios") {
                pictureSizeId = pictureSizes.indexOf("High");
            } else {
                pictureSizeId = pictureSizes.length - 1;
            }

            this.setState({
                ratio: value,
                pictureSizes: pictureSizes,
                pictureSize: pictureSizes[pictureSizeId],
            });
        } else if (option === "Picture Sizes") {
            this.setState({ pictureSize: value });
        }
    };

    componentDidMount = async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status === "granted" });
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    };

    componentWillUnmount = () => {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackPress
        );
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar />
                <View style={styles.flex1}>
                    {this.state.hasCameraPermission === null ? (
                        <View></View>
                    ) : this.state.hasCameraPermission === false ? (
                        <Text>No access to camera</Text>
                    ) : (
                        <View style={{ flex: 1 }}>
                            <Camera
                                ref={(ref) => {
                                    this.state.camera = ref;
                                }}
                                onCameraReady={() => {
                                    this.onCameraReady();
                                }}
                                ratio={this.state.ratio}
                                whiteBalance={this.state.whiteBalance}
                                pictureSize={this.state.pictureSize}
                                flashMode={this.state.flashMode}
                                type={this.state.type}
                                style={{ flex: 1 }}
                            >
                                <Animated.ScrollView
                                    style={[
                                        styles.animatedView,
                                        {
                                            transform: [
                                                { translateY: this.state.pos },
                                            ],
                                        },
                                        padding(10),
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.text,
                                            margin(0, 0, 10, 0),
                                        ]}
                                    >
                                        SETTINGS
                                    </Text>
                                    {this.state.loaded ? (
                                        <View style={margin(0, 0, 10, 0)}>
                                            <RadioGroup
                                                key={this.state.whiteBalances}
                                                groupName="White Balance"
                                                data={this.state.whiteBalances}
                                                clicked={
                                                    this.state.whiteBalance
                                                }
                                                changeCameraSettings={
                                                    this.changeCameraSettings
                                                }
                                            ></RadioGroup>
                                            <RadioGroup
                                                key={this.state.flashModes}
                                                groupName="Flash Mode"
                                                data={this.state.flashModes}
                                                clicked={this.state.flashMode}
                                                changeCameraSettings={
                                                    this.changeCameraSettings
                                                }
                                            ></RadioGroup>
                                            <RadioGroup
                                                key={this.state.ratios}
                                                groupName="Camera Ratio"
                                                data={this.state.ratios}
                                                clicked={this.state.ratio}
                                                changeCameraSettings={
                                                    this.changeCameraSettings
                                                }
                                            ></RadioGroup>
                                            <RadioGroup
                                                key={this.state.pictureSizes}
                                                groupName="Picture Sizes"
                                                data={this.state.pictureSizes}
                                                clicked={this.state.pictureSize}
                                                changeCameraSettings={
                                                    this.changeCameraSettings
                                                }
                                            ></RadioGroup>
                                        </View>
                                    ) : (
                                        <></>
                                    )}
                                </Animated.ScrollView>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        width: "100%",
                                        position: "absolute",
                                        bottom: 0,
                                    }}
                                >
                                    <CircleButton
                                        text="↺"
                                        width={75}
                                        height={75}
                                        onPress={this.changeCamera}
                                    ></CircleButton>
                                    <CircleButton
                                        width={75}
                                        height={75}
                                        text="+"
                                        onPress={this.takePicture}
                                    ></CircleButton>
                                    <CircleButton
                                        text="⚙"
                                        width={75}
                                        height={75}
                                        onPress={() => {
                                            this.toggleSettings();
                                        }}
                                    ></CircleButton>
                                    <CircleButton
                                        text="✂︎"
                                        width={75}
                                        height={75}
                                        onPress={() => {
                                            this.showImagePicker();
                                        }}
                                    ></CircleButton>
                                </View>
                            </Camera>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

export default CameraScreen;
