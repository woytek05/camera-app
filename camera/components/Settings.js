import React, { Component } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import * as Font from "expo-font";
import MyButton from "./MyButton";
import margin from "../Styles/Margin";
import Dialog from "react-native-dialog";
const styles = require("../Styles/Styles");
const colors = require("../Styles/Colors");
const variables = require("./variables");

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogVisible: false,
            serverAddress: variables.defaultServerAddress,
            serverPort: variables.defaultServerPort,
        };
    }

    showDialog = () => {
        this.setState({
            isDialogVisible: true,
        });
    };

    handleSave = async () => {
        await variables.setServerAddress(this.state.serverAddress);
        await variables.setServerPort(this.state.serverPort);

        this.setState({
            isDialogVisible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            isDialogVisible: false,
        });
    };

    componentDidMount = async () => {
        this.setState({
            serverAddress: await variables.getServerAddress(),
            serverPort: await variables.getServerPort(),
        });
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar />
                <View style={styles.center}>
                    <View>
                        <Text style={styles.text}>Server Address:</Text>
                        <Text
                            style={[
                                { color: colors.white },
                                styles.marginBottom,
                            ]}
                        >
                            {this.state.serverAddress}
                        </Text>
                        <Text style={styles.text}>Server Port:</Text>
                        <Text
                            style={[
                                { color: colors.white },
                                styles.marginBottom,
                            ]}
                        >
                            {this.state.serverPort}
                        </Text>
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <MyButton
                                text="CHANGE"
                                margin={margin(0, 0, 0, 0)}
                                backgroundColor={colors.darkPrimaryColor}
                                onPress={() => {
                                    this.showDialog();
                                }}
                            ></MyButton>
                        </View>
                        <View>
                            <Dialog.Container
                                visible={this.state.isDialogVisible}
                            >
                                <Dialog.Title>
                                    Change Server Settings
                                </Dialog.Title>

                                <Dialog.Input
                                    label="Server Address"
                                    onChangeText={(serverAddress) =>
                                        this.setState({ serverAddress })
                                    }
                                >
                                    {this.state.serverAddress}
                                </Dialog.Input>
                                <Dialog.Input
                                    label="Server Port"
                                    onChangeText={(serverPort) =>
                                        this.setState({ serverPort })
                                    }
                                >
                                    {this.state.serverPort}
                                </Dialog.Input>
                                <Dialog.Button
                                    label="CANCEL"
                                    onPress={() => {
                                        this.handleCancel();
                                    }}
                                />
                                <Dialog.Button
                                    label="SAVE"
                                    onPress={() => {
                                        this.handleSave();
                                    }}
                                />
                            </Dialog.Container>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default Settings;
