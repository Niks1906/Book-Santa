import * as React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { TabNavigator } from "./tabNavigator";
import Share from "../Screens/shareScreen";
import Request from "../Screens/requestScreen";
import Settings from "../Screens/settings";
import * as firebase from "firebase";
import Menu from "./sidebarMenu";

export const AppDrawer = createDrawerNavigator(
  {
    Home: { screen: TabNavigator },
    Share: { screen: Share },
    Request: { screen: Request },
    Settings: { screen: Settings },
  },
  {
    contentComponent: Menu,
  },
  {
    initialRouteName: "Home",
  }
);
