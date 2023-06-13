import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import margin from "../Styles/Margin";
import padding from "../Styles/Padding";
import RadioButton from "./RadioButton";

class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: this.props.groupName
                ? this.props.groupName
                : "RadioGroup Title",
            data: this.props.data
                ? this.props.data.map((el, i) => {
                      if (el === this.props.clicked) {
                          return { id: i, text: el, clicked: true };
                      } else {
                          return { id: i, text: el, clicked: false };
                      }
                  })
                : [],
            direction: this.props.direction ? this.props.direction : "column",
            titleColor: this.props.titleColor ? this.props.titleColor : "white",
        };
    }

    selectRadioButton = (id) => {
        const changedData = this.state.data;
        const index = this.state.data.findIndex((el) => el.id === id);
        changedData.map((el) => Object.assign(el, { clicked: false }));
        changedData[index].clicked = true;

        this.setState(
            {
                data: changedData,
            },
            () => {
                this.props.changeCameraSettings(
                    this.state.groupName,
                    changedData[index].text
                );
            }
        );
    };

    unselectRadioButton = (id) => {
        const changedData = this.state.data;
        const index = this.state.data.findIndex((el) => el.id === id);
        changedData[index].clicked = false;

        this.setState({
            data: changedData,
        });
    };

    render() {
        return (
            <View>
                <Text style={{ color: this.state.titleColor }}>
                    {this.state.groupName}
                </Text>
                <View style={{ flex: 1, flexDirection: this.state.direction }}>
                    {this.state.data ? (
                        this.state.data.map((el, i) => {
                            return (
                                <RadioButton
                                    key={i}
                                    id={i}
                                    text={el.text}
                                    clicked={el.clicked}
                                    selectRadioButton={this.selectRadioButton}
                                    unselectRadioButton={
                                        this.unselectRadioButton
                                    }
                                ></RadioButton>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        );
    }
}

export default RadioGroup;
