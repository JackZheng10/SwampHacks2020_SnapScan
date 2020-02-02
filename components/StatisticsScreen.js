import React from "react";
import {
  View,
  SafeAreaView,
  Dimensions
} from "react-native";
import { styles } from "./styles.js";
import { Header} from "react-native-elements";
import {
  LineChart,
  PieChart
} from "react-native-chart-kit";
import { Dropdown } from 'react-native-material-dropdown';

const pieChartConfig = {
  color: (opacity = 1) => [`#70C4FF`],
  };

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  
};
const data = [
  {
    name: "Restaurants",
    spent: 52,
    color: "#70C4FF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Groceries",
    spent: 48,
    color: "#3FC272",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Miscellaneous",
    spent: 25,
    color: "#F5E184",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Clothing",
    spent: 15,
    color: "#F56B5E",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Entertainment",
    spent: 32,
    color: "grey",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
];


const lineData = { 
  labels: ['Aug','Sept', 'Oct', 'Nov', 'Dec', 'Jan'], 
  datasets: [
    { data: [ 60, 52, 55, 48, 50, 40 ], color: (opacity = 1) => `#70C4FF`},
    { data: [ 50, 50, 50, 50, 50, 50 ], color: (opacity = 1) => `#3FC272`}
  ],
  legend: ['Spent', 'Goal']
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
        <View style={{marginLeft:10, marginRight: 10}}>
        <Dropdown
        label='Period'
        data={[{
          value: 'Current Month',
        }, {
          value: 'Last Month',
        }, {
          value: '6 Month Period', 
        }, {
          value: '12 Month Period'
        }]}
      />
       </View>
        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={pieChartConfig}
          accessor="spent"
          backgroundColor="transparent"
          paddingLeft="2"
          absolute={true}
          style={{marginBottom:50, marginTop:30}}
        />

        <LineChart
        
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          data={lineData}
          backgroundColor="transparent"
        />
      </SafeAreaView>
    );
  }
}

export default StatisticsScreen;
