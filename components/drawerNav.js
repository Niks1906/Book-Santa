import * as React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { TabNavigator } from "./tabNavigator";
import Share from "../Screens/shareScreen";
import Request from "../Screens/requestScreen";

export const AppDrawer = createDrawerNavigator(
  {
    Home: { screen: TabNavigator },
    Share: { screen: Share },
    Request: { screen: Request },
  },
  {
    initialRouteName: "Home",
  }
);
