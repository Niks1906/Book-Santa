import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";
import db from "../config";

export default class Authentication extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isModal: false,
      name: "",
      address: "",
      contact: "",
      confirmPassword: "",
    };
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
      return Alert.alert("Please enter email and password");
    }
  };

  userSignUp = () => {
    if (this.state.password === this.state.confirmPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          db.collection("users").add({
            name: this.state.name,
            address: this.state.address,
            contact: this.state.contact,
            email: this.state.email,
          });
          return Alert.alert(
            "User added successfully",
            "Please Login to continue",
            [
              {
                text: "OK",
                onPress: () => {
                  this.setState({ isModal: false });
                },
              },
            ]
          );
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    } else {
      return Alert.alert("Passwords do not match");
    }
  };

  showModal = () => {
    return (
      <Modal
        visible={this.state.isModal}
        transparent={true}
        animationType={"fade"}
      >
        <View style={styles.view}>
          <KeyboardAvoidingView>
            <ScrollView>
              <Text
                style={{
                  color: "#ffd700",
                  alignSelf: "center",
                  margin: 25,
                  fontWeight: "bold",
                }}
              >
                Register
              </Text>
              <TextInput
                placeholder="Enter your name"
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ name: text });
                }}
              />
              <TextInput
                placeholder="Enter your address"
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />
              <TextInput
                placeholder="Enter your phone number"
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
                keyboardType="number"
              />
              <TextInput
                placeholder="Enter your e-mail id"
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ email: text });
                }}
                keyboardType="email"
              />
              <TextInput
                placeholder="Enter your password"
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                secureTextEntry={true}
              />
              <TextInput
                placeholder="Confirm your password"
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  this.userSignUp();
                }}
              >
                <Text style={styles.touchableOpacityText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  this.setState({ isModal: false });
                }}
              >
                <Text style={styles.touchableOpacityText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "#022c43",
        }}
      >
        <View>{this.showModal()}</View>
        <Image source={require('../assets/book.png')} style={{
          width:100,
          height:100,
        }} />
        <Text
          style={{
            color: "#f6c90e",
            fontWeight: "bold",
            margin: 25,
          }}
        >
          Book Santa
        </Text>
        <TextInput
          style={{
            backgroundColor: "#e1e099",
            borderWidth: 2,
            borderColor: "#4ecca3",
            padding: 10,
            margin: 10,
            width: "75%",
          }}
          placeholder="E-mail"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TextInput
          style={{
            backgroundColor: "#e1e099",
            borderWidth: 2,
            borderColor: "#4ecca3",
            padding: 10,
            margin: 10,
            width: "75%",
          }}
          placeholder="Password"
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => {
            this.logIn();
          }}
        >
          <Text style={styles.touchableOpacityText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => {
            this.setState({ isModal: true });
          }}
        >
          <Text style={styles.touchableOpacityText}>Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    margin: 10,
    padding: 10,
    backgroundColor: "#e1e099",
    borderWidth: 2,
    borderColor: "#4ecca3",
  },
  view: {
    flex: 1,
    backgroundColor: "#022c43",
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableOpacity: {
    backgroundColor: "#cbaf87",
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#7045af",
    borderRadius: 20,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  touchableOpacityText: {
    color: "#0d7377",
  },
});
