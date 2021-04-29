import * as React from "react";
import {
  TextInput,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import db from "../config";
import Headers from "../components/headers";

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      contact: "",
      address: "",
      email: "",
      documentID: "",
    };
  }

  getUserInfo = () => {
    var currentUser = firebase.auth().currentUser.email;
    db.collection("users")
      .where("email", "==", currentUser)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var info = doc.data();
          this.setState({
            name: info.name,
            contact: info.contact,
            address: info.address,
            email: info.email,
            documentID: doc.id,
          });
        });
      });
  };

  updateChanges = () => {
    db.collection("users").doc(this.state.documentID).update({
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      contact: this.state.contact,
    });
    Alert.alert("Profile updates successfully...");
  };

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#29435c",
          alignItems: "center",
        }}
      >
        <Headers title="Settings" navigation={this.props.navigation} />
        <Text>{this.state.name}</Text>
        <Text>{this.state.email}</Text>
        <TextInput
          style={{
            color: "#d1d4c9",
            borderWidth: 2,
            borderColor: "#556e53",
            margin: 10,
            padding: 10,
            backgroundColor: "#00adb5",
            width: "75%",
          }}
          value={this.state.address}
          onChangeText={(text) => {
            this.setState({ address: text });
          }}
        />
        <TextInput
          style={{
            color: "#d1d4c9",
            borderWidth: 2,
            borderColor: "#556e53",
            margin: 10,
            padding: 10,
            backgroundColor: "#00adb5",
            width: "75%",
          }}
          value={this.state.contact}
          onChangeText={(text) => {
            this.setState({ contact: text });
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#3a4750",
            margin: 10,
            padding: 10,
            borderWidth: 2,
            borderRadius: 20,
            borderColor: "#f6c90e",
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
          onPress={() => {
            Alert.alert(
              "Are you sure you want to update profile?",
              "Press YES to continue...",
              [
                {
                  text: "YES",
                  onPress: () => {
                    this.updateChanges();
                  },
                },
                {
                  text: "NO",
                  onPress: () => {
                    this.props.navigation.navigate("Settings");
                  },
                },
              ]
            );
          }}
        >
          <Text style={{ color: "#f6c90e" }}>Save Changes</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
