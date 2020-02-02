import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import { styles } from "./styles.js";
import { Header, Icon, ListItem, Badge } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `#70C4FF`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
};
const data = [
  {
    name: "Restaurants",
    spent: 50,
    color: "#70C4FF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Groceries",
    spent: 100,
    color: "#3FC272",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Miscellaneous",
    spent: 100,
    color: "#F5E184",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Clothing",
    spent: 100,
    color: "#F56B5E",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Entertainment",
    spent: 100,
    color: "grey",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

//"#3FC272", "#F5E184", "#F56B5E",
class StatisticsScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.slideBody}>
        <View style={{ backgroundColor: "black", height: 30 }}></View>
        <Header
          placement="center"
          centerComponent={{
            text: "Statistics",
            style: styles.scanInfoText
          }}
          containerStyle={styles.scanInfoHeader}
        />
        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          accessor="spent"
          backgroundColor="transparent"
          paddingLeft="2"
          absolute={false}
        />

        <LineChart
          data={lineData}
          width={Dimensions.get("window").width - 25}
          height={220}
          chartConfig={chartConfig}
          backgroundColor="transparent"
        />
      </SafeAreaView>
    );
  }
}

export default StatisticsScreen;
