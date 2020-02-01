import React from "react";
import { Text, View, SafeAreaView, TextInput, ScrollView } from "react-native";
import { styles } from "./styles.js";
import { Header } from "react-native-elements";

class Test extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Header
          placement="center"
          centerComponent={{
            text: "Scan Results",
            style: styles.scanInfoText
          }}
          containerStyle={styles.scanInfoHeader}
        />
        <ScrollView>
          <Text>AHSHDASHDASDISAIAIAHSHDASDISADISAIAIAHSHDASDISAIAI</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Test;
