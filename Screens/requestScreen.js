import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";
import db from "../config";

export default class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      bookReason: "",
      currentUserID: firebase.auth().currentUser.email,
    };
  }

  addRequest = () => {
    var requestID = Math.random().toString(36).substring(10);
    db.collection("request").add({
      userID: this.state.currentUserID,
      bookName: this.state.bookName,
      bookReason: this.state.bookReason,
      requestID: requestID,
    });
    this.setState({ bookName: "", bookReason: "" });
    return Alert.alert("Request made successfully");
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#2B2B2B",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder="Enter name of book"
          value={this.state.bookName}
          onChangeText={(text) => {
            this.setState({ bookName: text });
          }}
        />
        <TextInput
          placeholder="Why you want the book"
          value={this.state.bookReason}
          multiline={true}
          onChangeText={(text) => {
            this.setState({ bookReason: text });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.addRequest();
          }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
