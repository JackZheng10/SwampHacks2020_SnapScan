import React from "react";
import { Text, View, SafeAreaView, TextInput, ScrollView } from "react-native";
import { styles } from "./styles.js";
import { Header, Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class ScanInfoScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.slideBody}>
        <Header
          placement="center"
          centerComponent={{
            text: "Scan Results",
            style: styles.scanInfoText
          }}
          containerStyle={styles.scanInfoHeader}
        />
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
            margin: 10,
            justifyContent: "space-evenly"
          }}
        >
          <Icon
            reverse
            raised
            name="tshirt-crew"
            type="material-community"
            color="red"
          />
          <Icon
            reverse
            name="cart-minus"
            type="material-community"
            color="red"
          />
          <Icon
            reverse
            name="silverware-fork-knife"
            type="material-community"
            color="red"
          />
          <Icon reverse name="popcorn" type="material-community" color="red" />
          <Icon
            reverse
            name="border-none-variant"
            type="material-community"
            color="red"
          />
        </View>

        <ScrollView></ScrollView>
      </SafeAreaView>
    );
  }
}

export default ScanInfoScreen;
