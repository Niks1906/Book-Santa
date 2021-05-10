import * as React from "react";
import { SafeAreaView, Text, FlatList, ScrollView, View } from "react-native";
import * as firebase from "firebase";
import db from "../config";
import { Icon, Card, ListItem } from "react-native-elements";

export default class CurrentUserDonations extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUserID: firebase.auth().currentUser.email,
      currentUserName: "",
      allDonations: [],
    };
  }

  getCurrentUserDetails = () => {
    db.collection("users")
      .where("email", "==", this.state.currentUserID)
      .get()
      .then((snapshot) => {
        snapshort.forEach((doc) => {
          this.setState({
            currentUserName: doc.data().name,
          });
        });
      });
  };

  getAllDonations = () => {
    db.collection("donations")
      .where("donorID", "==", this.state.currentUserID)
      .onSnapshot((snapshot) => {
        var allDonations = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation["docID"] = doc.ID;
          allDonations.push(donation);
        });
        this.setState({ allDonations: allDonations });
      });
  };

  componentDidMount() {
    this.getCurrentUserDetails();
    this.getAllDonations();
  }

  sendNotification = (bookDetails) => {
    var message =
      this.state.currentUserName + " has sent you book " + bookDetails.bookName;
    db.collection("notifications")
      .where("requestID", "==", bookDetails.requestID)
      .where("donorID", "==", bookDetails.donorID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("notifications").doc(doc.id).update({
            message: message,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            status: "unread",
          });
        });
      });
  };

  sendBook = (bookDetails) => {
    if (bookDetails.status === "donor interested") {
      db.collection("donations").doc(bookDetails.docID).update({
        status: "book sent",
      });
      this.sendNotification(bookDetails);
    }
  };

  keyExtractor = (item, index) => index.toString();
  renderItem = (item, i) => {
    return (
      <ListItem key={i} bottomDivider="true">
        <Text>{item.bookName}</Text>
        <Text>
          {"Requested by" + item.recieverID + " Status:" + item.status}
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.sendBook(item);
          }}
        >
          <Text>Donate</Text>
        </TouchableOpacity>
      </ListItem>
    );
  };

  render() {
    return (
      <SafeAreaView>
        {this.state.allDonations.length === 0 ? (
          <View>
            <Text>You have no donations</Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            data={this.state.allDonations}
          />
        )}
      </SafeAreaView>
    );
  }
}
