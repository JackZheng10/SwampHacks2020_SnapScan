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
  state = {
    data : [
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
    ]
  }

  buildData = () => {
    const names = ["Restaurants", "Groceries", "Miscellaneous", "Clothing", "Entertainment"]
    const colors = ["#70C4FF", "#3FC272", "#F5E184", "#F56B5E", "grey"]
    var d = [];
    this.props.list.map((l, i)=> {
      var sp = 0;
      l.items.map((l2, i2)=> {
        if(l2.category == (i+1))
          sp = sp + l2.price;
      });
      d.push({
        name: names[i],
        spent: parseInt(sp),
        color: colors[i],
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
      })
    });
    console.log(d);
    this.setState({data:d});
  }

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
        <Dropdown onChangeText={()=>{this.buildData();}}
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
          data={this.state.data}
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
