import * as React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Authentication from "./Screens/authScreen";
import { AppDrawer } from "./components/drawerNav";
import RecieverDetails from "./Screens/recieverDetails";

export default class App extends React.Component {
  render() {
    return <Appcontainer />;
  }
}

const SwitchNavigator = createSwitchNavigator({
  Login: Authentication,
  Drawer: AppDrawer,
  RecieverDetails: RecieverDetails,
});

const Appcontainer = createAppContainer(SwitchNavigator);
