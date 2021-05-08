import * as React from "react";
import { SafeAreaView, Text } from "react-native";
import * as firebase from "firebase";

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

  getAllDonations = () => {};

  componentDidMount() {
    this.getCurrentUserDetails();
    this.getAllDonations();
  }

  render() {
    return (
      <SafeAreaView>
        <Text>my current donations</Text>
      </SafeAreaView>
    );
  }
}
