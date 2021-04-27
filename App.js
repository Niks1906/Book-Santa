import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Request from "./Screens/requestScreen";
import Share from "./Screens/shareScreen";
import Authentication from "./Screens/authScreen";
import { AppDrawer } from "./components/drawerNav";

export default class App extends React.Component {
  render() {
    return <Appcontainer />;
  }
}

const SwitchNavigator = createSwitchNavigator({
  Login: Authentication,
  Drawer: AppDrawer,
});

const Appcontainer = createAppContainer(SwitchNavigator);
