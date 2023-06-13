import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import margin from "../Styles/Margin";
import padding from "../Styles/Padding";
import styles from "../Styles/Styles";

class CircleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text ? this.props.text : "",
            width: Number(this.props.width) ? Number(this.props.width) : 100,
            height: Number(this.props.height) ? Number(this.props.height) : 100,
            color: this.props.color ? this.props.color : "#FFFFFF",
            backgroundColor: this.props.backgroundColor
                ? this.props.backgroundColor
                : "rgba(0,0,0,0.6)",
            borderWidth: this.props.borderWidth ? this.props.borderWidth : 0,
            borderRadius: this.props.borderRadius
                ? this.props.borderRadius
                : 50,
            padding: this.props.padding ? this.props.padding : padding(0),
            margin: this.props.margin ? this.props.margin : margin(0, 0, 20, 0),
            hidden: this.props.hidden ? this.props.hidden : false,
            onPress: this.props.onPress ? this.props.onPress : () => {},
        };
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    display: this.state.hidden ? "none" : "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: this.state.width,
                    height: this.state.height,
                    backgroundColor: this.state.backgroundColor,
                    borderWidth: this.state.borderWidth,
                    borderRadius: this.state.borderRadius,
                    ...this.state.padding,
                    ...this.state.margin,
                }}
                onPress={() => this.state.onPress()}
            >
                <Text
                    style={{
                        color: this.state.color,
                        fontSize: 30,
                        fontWeight: "bold",
                    }}
                >
                    {this.state.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default CircleButton;
