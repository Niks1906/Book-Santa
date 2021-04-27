import * as React from "react";
import { Header, Icon } from "react-native-elements";

const Headers = (props) => {
  return (
    <Header
      leftComponent={
        <Icon
          name="bars"
          type="font-awesome"
          onPress={() => props.navigation.toggleDrawer()}
        />
      }
      centerComponent={{ text: props.title }}
    />
  );
};

export default Headers;
