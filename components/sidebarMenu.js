import * as React from "react";
import { SafeAreaView, TouchableOpacity, Text, View } from "react-native";
import * as firebase from "firebase";
import db from "../config";
import { DrawerItems } from "react-navigation-drawer";

export default class Menu extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <DrawerItems {...this.props} />
        <View
          style={{
            padding: 10,
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Login");
              firebase.auth().signOut();
            }}
            style={{
              justifyContent: "center",
              marginLeft: 6,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
