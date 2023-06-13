import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    StatusBar,
    Alert,
    Switch,
    ActivityIndicator,
} from "react-native";
import MyButton from "./MyButton";
import ListItem from "./ListItem";
import margin from "../Styles/Margin";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
const styles = require("../Styles/Styles");
const colors = require("../Styles/Colors");
const variables = require("./variables");

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numColumns: 5,
            mediaLibrary: [],
            selectedPhotos: [],
        };
    }

    deletePhotos = async (ids) => {
        await MediaLibrary.deleteAssetsAsync(ids);
        this.setState({ selectedPhotos: [] });
        this.refreshMediaLibrary();
    };

    uploadPhotos = async (ids) => {
        const photos = this.state.mediaLibrary.filter((el) =>
            ids.includes(el.id)
        );

        const data = new FormData();

        for (let i = 0; i < photos.length; i++) {
            data.append(photos[i].filename, {
                uri: photos[i].uri,
                type: "image/jpg",
                name: photos[i].filename,
            });
        }

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
            .catch((error) => {
                Alert.alert("Alert", "Upload failed", [
                    {
                        text: "OK",
                    },
                ]);
                console.log(error);
            });
    };

    changeLayout = () => {
        this.setState({
            numColumns: this.state.numColumns === 5 ? 1 : 5,
        });
    };

    togglePhoto = (id, selected) => {
        let selectedPhotosCopy = JSON.parse(
            JSON.stringify(this.state.selectedPhotos)
        );
        let mediaLibraryCopy = JSON.parse(
            JSON.stringify(this.state.mediaLibrary)
        );

        const element = mediaLibraryCopy.find((el) => el.id === id);
        element["selected"] = selected;

        if (selected) {
            selectedPhotosCopy.push(id);
        } else {
            selectedPhotosCopy = selectedPhotosCopy.filter((el) => el !== id);
        }

        this.setState({
            mediaLibrary: mediaLibraryCopy,
            selectedPhotos: selectedPhotosCopy,
        });
    };

    refreshMediaLibrary = async () => {
        console.log(`${Date.now()} refresh`);
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
            alert("No permission to read images from the gallery");
        } else {
            const album = await MediaLibrary.getAlbumAsync("DCIM");
            const photos = await MediaLibrary.getAssetsAsync({
                album: album,
                first: 50,
                mediaType: ["photo"],
            });

            this.setState({
                mediaLibrary: photos.assets,
            });
        }
    };

    componentDidMount = async () => {
        await this.refreshMediaLibrary();
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <StatusBar />
                <View style={styles.flex1}>
                    <View style={[styles.spaceAround, styles.row]}>
                        <MyButton
                            width={70}
                            text="LAYOUT"
                            margin={margin(0, 0, 0, 0)}
                            backgroundColor={colors.darkPrimaryColor}
                            onPress={this.changeLayout}
                        ></MyButton>
                        <MyButton
                            width={70}
                            text="CAMERA"
                            margin={margin(0, 0, 0, 0)}
                            backgroundColor={colors.darkPrimaryColor}
                            onPress={() => {
                                this.props.navigation.navigate("camera", {
                                    refresh: this.refreshMediaLibrary,
                                });
                            }}
                        ></MyButton>
                        <MyButton
                            width={70}
                            text="DELETE"
                            margin={margin(0, 0, 0, 0)}
                            backgroundColor={colors.darkPrimaryColor}
                            onPress={() => {
                                this.deletePhotos(this.state.selectedPhotos);
                            }}
                        ></MyButton>
                        <MyButton
                            width={70}
                            text="UPLOAD"
                            margin={margin(0, 0, 0, 0)}
                            backgroundColor={colors.darkPrimaryColor}
                            onPress={async () => {
                                await this.uploadPhotos(
                                    this.state.selectedPhotos
                                );
                            }}
                        ></MyButton>
                        <MyButton
                            width={70}
                            text="SETS"
                            margin={margin(0, 0, 0, 0)}
                            backgroundColor={colors.darkPrimaryColor}
                            onPress={() => {
                                this.props.navigation.navigate("settings");
                            }}
                        ></MyButton>
                    </View>

                    <View style={styles.flex8}>
                        {this.state.mediaLibrary.length > 0 ? (
                            <FlatList
                                numColumns={this.state.numColumns}
                                key={this.state.numColumns}
                                data={this.state.mediaLibrary}
                                renderItem={({ item }) => (
                                    <ListItem
                                        modificationTime={item.modificationTime}
                                        width={item.width}
                                        blockWidth={
                                            this.state.numColumns === 5
                                                ? 60
                                                : 340
                                        }
                                        uri={item.uri}
                                        id={item.id}
                                        albumId={item.albumId}
                                        height={item.height}
                                        blockHeight={
                                            this.state.numColumns === 5
                                                ? 60
                                                : 180
                                        }
                                        creationTime={item.creationTime}
                                        filename={item.filename}
                                        mediaType={item.mediaType}
                                        duration={item.duration}
                                        togglePhoto={this.togglePhoto}
                                        selected={item.selected}
                                        refresh={this.refreshMediaLibrary}
                                        navigation={this.props.navigation}
                                        deletePhoto={(id) => {
                                            this.deletePhotos(id);
                                        }}
                                        uploadPhoto={async (id) => {
                                            await this.uploadPhotos(id);
                                        }}
                                    ></ListItem>
                                )}
                            />
                        ) : (
                            <View style={styles.center}>
                                <ActivityIndicator
                                    size="large"
                                    color={colors.darkPrimaryColor}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        );
    }
}

export default Main;
