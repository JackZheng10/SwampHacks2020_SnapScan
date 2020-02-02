import React from "react";
import { Text, View, SafeAreaView, TextInput, ScrollView } from "react-native";
import { styles } from "./styles.js";
import { Header, Button } from "react-native-elements";

var testData= [{name:"", category:"", price:""}, ]
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
            flexDirection: "row"
          }}
        >
          <Button title="test" type="outline" style={styles.scanInfoTypes} />
          <Button title="test2" type="outline" style={styles.scanInfoTypes} />
          <Button title="test3" type="outline" style={styles.scanInfoTypes} />
          <Button title="test4" type="outline" style={styles.scanInfoTypes} />
          <Button title="test5" type="outline" style={styles.scanInfoTypes} />
        </View>

        <ScrollView></ScrollView>
      </SafeAreaView>
    );
  }
}

export default ScanInfoScreen;
