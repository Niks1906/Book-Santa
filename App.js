import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Request from "./Screens/requestScreen";
import Share from "./Screens/shareScreen";
import Authentication from "./Screens/authScreen";

export default class App extends React.Component {
  render() {
    return <Appcontainer />;
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Share: { screen: Share },
    Request: { screen: Request },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        const route = navigation.state.routeName;
        if (route === "Share") {
          return (
            <Image
              source={require("./assets/share.png")}
              style={{
                width: 25,
                height: 25,
              }}
            />
          );
        } else if (route === "Request") {
          return (
            <Image
              source={require("./assets/request.png")}
              style={{
                width: 25,
                height: 25,
              }}
            />
          );
        }
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: "#2B2B2B",
      },
      activeBackgroundColor: "#ffd700",
    },
  }
);

const SwitchNavigator = createSwitchNavigator({
  Login: Authentication,
  TabNav: TabNavigator,
});

const Appcontainer = createAppContainer(SwitchNavigator);
