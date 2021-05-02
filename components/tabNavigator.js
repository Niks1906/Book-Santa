import * as React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Share from "../Screens/shareScreen";
import Request from "../Screens/requestScreen";
import { Image } from "react-native";

export const TabNavigator = createBottomTabNavigator(
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
              source={require("../assets/share.png")}
              style={{
                width: 25,
                height: 25,
              }}
            />
          );
        } else if (route === "Request") {
          return (
            <Image
              source={require("../assets/request.png")}
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
        backgroundColor: "#152a38",
      },
      activeBackgroundColor: "#eeeeee",
    },
  }
);
