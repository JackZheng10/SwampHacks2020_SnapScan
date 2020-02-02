import React from "react";
import { Text, View, SafeAreaView, TextInput, ScrollView } from "react-native";
import { styles } from "./styles.js";
import { Header } from "react-native-elements";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

var testData= [{name:"", category:"", price:""}, ]
  class StatisticsScreen extends React.Component {

   render() {
    return (
      <View>
        <View>
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
        </View>
      </View>
    );
  }
}

export default StatisticsScreen;
