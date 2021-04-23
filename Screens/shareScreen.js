import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as firebase from "firebase";
import db from "../config";
import { ListItem } from "react-native-elements";

export default class Share extends React.Component {
  constructor() {
    super();
    this.state = { requestedBooks: [] };
  }

  getRequests = () => {
    db.collection("requests").onSnapshot((snapshot) => {
      var bookList = snapshot.docs.map((doc) => doc.data());
      this.setState({ requestedBooks: bookList });
    });
  };

  componentDidMount() {
    this.getRequests();
  }

  renderItem = ({ item, i }) => {
    return (
      <ListItem key={i} bottomDivider={true}>
        <ListItem.Content>
          <ListItem.Title>{item.bookName}</ListItem.Title>
          <ListItem.Subtitle>{item.bookReason}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
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
        {this.state.requestedBooks.length === 0 ? (
          <View>
            <Text>List of all requested books</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.requestedBooks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
