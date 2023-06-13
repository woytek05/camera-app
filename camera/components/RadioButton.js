import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
} from "react-native";
import margin from "../Styles/Margin";
import padding from "../Styles/Padding";

const styles = require("../Styles/Styles");

class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id ? this.props.id : 0,
            text: this.props.text ? this.props.text : "RadioButton",
            multiplicator: this.props.multiplicator
                ? this.props.multiplicator
                : 0.08,
            borderWidth: this.props.borderWidth ? this.props.borderWidth : 2,
            color: this.props.color ? this.props.color : "#F00",
            selectRadioButton: this.props.selectRadioButton
                ? this.props.selectRadioButton
                : () => {},
            unselectRadioButton: this.props.unselectRadioButton
                ? this.props.unselectRadioButton
                : () => {},
        };
    }

    toggle() {
        if (!this.props.clicked) {
            this.state.selectRadioButton(this.state.id);
        }
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.alignItemsCenter, styles.row, margin(10)]}
                onPress={this.toggle.bind(this)}
            >
                <View
                    style={{
                        display: this.state.hidden ? "none" : "flex",
                        borderRadius:
                            Math.round(
                                Dimensions.get("window").width +
                                    Dimensions.get("window").height
                            ) / 2,
                        width:
                            Dimensions.get("window").width *
                            this.state.multiplicator,
                        height:
                            Dimensions.get("window").width *
                            this.state.multiplicator,
                        borderWidth: this.state.borderWidth,
                        borderColor: this.state.color,
                        justifyContent: "center",
                        alignItems: "center",
                        ...margin(1, 10, 1, 1),
                    }}
                    underlayColor={this.state.color}
                >
                    <View
                        style={{
                            display: this.props.clicked ? "flex" : "none",
                            borderRadius:
                                Math.round(
                                    Dimensions.get("window").width +
                                        Dimensions.get("window").height
                                ) / 2,
                            width:
                                (Dimensions.get("window").width *
                                    this.state.multiplicator) /
                                2,
                            height:
                                (Dimensions.get("window").width *
                                    this.state.multiplicator) /
                                2,
                            backgroundColor: this.state.color,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        underlayColor={this.props.color}
                    >
                        <></>
                    </View>
                </View>
                <Text style={{ color: "white", fontSize: 14 }}>
                    {this.state.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default RadioButton;
