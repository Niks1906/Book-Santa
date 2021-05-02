import * as React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";
import db from "../config";
import { ListItem } from "react-native-elements";
import Headers from "../components/headers";

export default class Share extends React.Component {
  constructor() {
    super();
    this.state = { requestedBooks: [] };
  }

  getRequests = () => {
    db.collection("request").onSnapshot((snapshot) => {
      var bookList = snapshot.docs.map((doc) => doc.data());
      this.setState({ requestedBooks: bookList });
    });
  };

  componentDidMount() {
    this.getRequests();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        bottomDivider={true}
        style={{
          flex: 1,
          marginTop: 5,
          padding: 5,
          width: 300,
        }}
      >
        <Text
          style={{
            margin: 5,
            color: "#00adb5",
          }}
        >
          {item.bookName}
        </Text>
        <TouchableOpacity
          style={{
            marginLeft: 100,
          }}
          onPress={() => {
            this.props.navigation.navigate("RecieverDetails", {"details": item});
          }}
        >
          <Text
            style={{
              color: "#222831",
            }}
          >
            View Details
          </Text>
        </TouchableOpacity>
      </ListItem>
    );
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
        <Headers title="Donate Book" navigation={this.props.navigation} />
        {this.state.requestedBooks.length === 0 ? (
          <View>
            <Text style={{ color: "#d1d4c9" }}>
              List of all requested books
            </Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={this.state.requestedBooks}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
