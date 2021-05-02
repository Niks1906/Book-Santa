import * as React from "react";
import { SafeAreaView, Text } from "react-native";
import * as firebase from "firebase";
import db from "../config";

export default class RecieverDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserID: firebase.auth().currentUser.email,
      recievarID: this.props.navigation.getParam("details")["email"],
    };
  }
  render() {
    return (
      <SafeAreaView>
        <Text>Reciever Details</Text>
      </SafeAreaView>
    );
  }
}
