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
const styles = require("../Styles/Styles");
const colors = require("../Styles/Colors");

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            myfont: require("./mohave-bold.otf"),
        });
        this.setState({ fontLoaded: true });
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar />
                {this.state.fontLoaded ? (
                    <View style={styles.center}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate("main");
                            }}
                        >
                            <Text
                                style={[
                                    styles.myFont,
                                    styles.header,
                                    styles.marginBottom,
                                ]}
                            >
                                Camera App
                            </Text>
                        </TouchableOpacity>
                        <View>
                            <Text
                                style={[
                                    styles.smallHeader,
                                    styles.marginBottom,
                                ]}
                            >
                                🖼️ Show gallery pictures
                            </Text>
                            <Text
                                style={[
                                    styles.smallHeader,
                                    styles.marginBottom,
                                ]}
                            >
                                📷 Take picture from camera
                            </Text>
                            <Text
                                style={[
                                    styles.smallHeader,
                                    styles.marginBottom,
                                ]}
                            >
                                💾 Save photo to device
                            </Text>
                            <Text
                                style={[
                                    styles.smallHeader,
                                    styles.marginBottom,
                                ]}
                            >
                                ❌ Delete photos from device
                            </Text>
                            <Text style={styles.smallHeader}>
                                🔗 Share photos
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.center}>
                        <ActivityIndicator
                            size="large"
                            color={colors.darkPrimaryColor}
                        />
                    </View>
                )}
            </View>
        );
    }
}

export default WelcomePage;
