import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedbackBase,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";
import db from "../config";

export default class Authentication extends React.Component {
  constructor() {
    super();
    this.state = { email: "", password: "" };
  }

  logIn = () => {
    const email = this.state.email;
    const password = this.state.password;

    if (email && password) {
      try {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            Alert.alert("Login Successful");
            this.props.navigation.navigate("TabNav");
          });
      } catch (error) {
        var errorCode = error.code;
        Alert.alert(errorCode);
      }
    } else {
      Alert.alert("Please enter email and password");
    }
  };

  render() {
    return (
      <SafeAreaView>
        <TextInput
          style={{
            backgroundColor: "yellow",
            color: "black",
          }}
          placeholder="E-mail"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TextInput
          style={{
            backgroundColor: "yellow",
            color: "black",
          }}
          placeholder="Password"
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          secureTextEntry={true}
        />

        <TouchableOpacity
          onPress={() => {
            this.logIn();
          }}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
