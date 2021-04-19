import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default class Request extends React.Component {
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
        <Text
          style={{
            color: "#FAB908",
            backgroundColor: "#6B5B5B",
            padding: 25,
            borderWidth: 2,
            borderColor: "#FFEA5E",
          }}
        >
          Request Books Here.
        </Text>
      </SafeAreaView>
    );
  }
}
