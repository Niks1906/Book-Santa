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
import Headers from "../components/headers";

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
          backgroundColor: "#393e46",
          alignItems: "center",
        }}
      >
        <Headers title="Request Book" navigation={this.props.navigation} />

        <View
          style={{
            alignItems: "center",
          }}
        >
          <TextInput
            style={{
              color: "#222831",
              borderWidth: 2,
              borderColor: "#eeeeee",
              margin: 10,
              padding: 10,
              backgroundColor: "#00adb5",
              width: "75%",
            }}
            placeholder="Enter name of book"
            value={this.state.bookName}
            onChangeText={(text) => {
              this.setState({ bookName: text });
            }}
          />
          <TextInput
            style={{
              color: "#222831",
              borderWidth: 2,
              borderColor: "#eeeeee",
              margin: 10,
              padding: 10,
              backgroundColor: "#00adb5",
              width: "75%",
            }}
            placeholder="Why you want the book"
            value={this.state.bookReason}
            multiline={true}
            onChangeText={(text) => {
              this.setState({ bookReason: text });
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#f9ed69",
              margin: 10,
              padding: 10,
              borderWidth: 2,
              borderRadius: 20,
              borderColor: "#6a2c70",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
            }}
            onPress={() => {
              this.addRequest();
            }}
          >
            <Text style={{ color: "#b83b5e" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
