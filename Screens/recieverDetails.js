import * as React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import db from "../config";
import { Card, Header, Icon } from "react-native-elements";

export default class RecieverDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserID: firebase.auth().currentUser.email,
      recieverID: this.props.navigation.getParam("details")["userID"],
      requestID: this.props.navigation.getParam("details")["requestID"],
      bookName: this.props.navigation.getParam("details")["bookName"],
      reason: this.props.navigation.getParam("details")["bookReason"],
      recieverName: "",
      recieverAddress: "",
      recieverContact: "",
      currentUserName: "",
    };
  }

  recieverDetails = () => {
    db.collection("users")
      .where("email", "==", this.state.recieverID)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var info = doc.data();
          this.setState({
            recieverName: info.name,
            recieverContact: info.contact,
            recieverAddress: info.address,
          });
        });
      });
  };

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

  componentDidMount() {
    this.recieverDetails();
    this.getCurrentUserDetails();
  }

  updateBookStatus = () => {
    db.collection("donations").add({
      donorID: this.state.currentUserID,
      recieverID: this.state.recieverID,
      bookName: this.state.bookName,
      requestID: this.state.requestID,
      status: "donor interested",
    });
  };

  addNotifications = () => {
    var message =
      this.state.currentUserName +
      " is interested to send you the book " +
      this.state.bookName;
    db.collection("notifications").add({
      targetedUserID: this.state.recieverID,
      donorID: this.state.currentUserID,
      bookName: this.state.bookName,
      requestID: this.state.requestID,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      status: "unread",
    });
  };

  render() {
    return (
      <View>
        <View>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="font-awesome"
                onPress={() => this.props.navigation.navigate("Home")}
              />
            }
            centerComponent={{ text: "Request Details" }}
          />
        </View>

        <View style={{ flex: 0.4 }}>
          <Card title="Book Details">
            <Card>
              <Text>Name: {this.state.bookName}</Text>
            </Card>

            <Card>
              <Text>Reason: {this.state.reason}</Text>
            </Card>
          </Card>
        </View>

        <View style={{ flex: 0.4 }}>
          <Card title="Reciever Details">
            <Card>
              <Text>Reciever Name: {this.state.recieverName}</Text>
            </Card>

            <Card>
              <Text>Reciever Contact: {this.state.recieverContact}</Text>
            </Card>

            <Card>
              <Text>Reciever Address: {this.state.recieverAddress}</Text>
            </Card>
          </Card>
        </View>
        <View>
          {this.state.currentUserID !== this.state.recieverID ? (
            <TouchableOpacity
              onPress={() => {
                this.updateBookStatus();
                this.addNotifications();
                this.props.navigation.navigate("MyDonations");
              }}
            >
              <Text>Donate</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}
