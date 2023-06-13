import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomePage from "./components/WelcomePage";
import Main from "./components/Main";
import CameraScreen from "./components/CameraScreen";
import BigPhoto from "./components/BigPhoto";
import COLORS from "./Styles/Colors";
import Settings from "./components/Settings";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="welcomePage"
                    component={WelcomePage}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="main"
                    component={Main}
                    options={{
                        title: "Main",
                        headerStyle: {
                            backgroundColor: COLORS.darkPrimaryColor,
                        },
                        headerTintColor: COLORS.white,
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="camera"
                    component={CameraScreen}
                    options={{
                        title: "Camera",
                        headerStyle: {
                            backgroundColor: COLORS.darkPrimaryColor,
                        },
                        headerTintColor: COLORS.white,
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="bigphoto"
                    component={BigPhoto}
                    options={{
                        title: "BigPhoto",
                        headerStyle: {
                            backgroundColor: COLORS.darkPrimaryColor,
                        },
                        headerTintColor: COLORS.white,
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
                <Stack.Screen
                    name="settings"
                    component={Settings}
                    options={{
                        title: "Settings",
                        headerStyle: {
                            backgroundColor: COLORS.darkPrimaryColor,
                        },
                        headerTintColor: COLORS.white,
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
