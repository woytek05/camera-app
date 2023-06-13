import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import margin from "../Styles/Margin";
import padding from "../Styles/Padding";

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text ? this.props.text : "Button",
            width: Number(this.props.width) ? Number(this.props.width) : 100,
            height: Number(this.props.height) ? Number(this.props.height) : 50,
            fontSize: Number(this.props.fontSize)
                ? Number(this.props.fontSize)
                : 12,
            color: this.props.color ? this.props.color : "#FFFFFF",
            backgroundColor: this.props.backgroundColor
                ? this.props.backgroundColor
                : "#1976D2",
            borderWidth: this.props.borderWidth ? this.props.borderWidth : 1,
            borderRadius: this.props.borderRadius
                ? this.props.borderRadius
                : 10,
            padding: this.props.padding ? this.props.padding : padding(5),
            margin: this.props.margin ? this.props.margin : margin(20, 0, 0, 0),
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
                        fontSize: this.state.fontSize,
                    }}
                >
                    {this.state.text}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default MyButton;
