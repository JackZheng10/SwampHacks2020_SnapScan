import React from "react";
import { View, SafeAreaView, Dimensions } from "react-native";
import { styles } from "./styles.js";
import { Header } from "react-native-elements";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Dropdown } from "react-native-material-dropdown";

const pieChartConfig = {
  color: (opacity = 1) => [`#70C4FF`]
};

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
  strokeWidth: 2 // optional, default 3
};

let current_month_data = [38, 26, 54, 15, 32];
let last_month_data = [235, 248, 150, 140, 80];
let six_month_data = [1384, 1188, 712, 680, 480];
let twelve_month_data = [2574, 2301, 1522, 1121, 800];

const graphData = [
  {
    name: "Restaurants",
    spent: 38,
    color: "#70C4FF",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Groceries",
    spent: 26,
    color: "#3FC272",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Miscellaneous",
    spent: 54,
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
  labels: ["Aug", "Sept", "Oct", "Nov", "Dec", "Jan"],
  datasets: [
    { data: [60, 52, 55, 48, 50, 40], color: (opacity = 1) => `#70C4FF` },
    { data: [50, 50, 50, 50, 50, 50], color: (opacity = 1) => `#3FC272` }
  ],
  legend: ["Spent", "Goal"]
};

//"#3FC272", "#F5E184", "#F56B5E",
class StatisticsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    list: [],
    renderCount: 0
  };

  /*
  componentDidUpdate = prevProps => {
    console.log("XXXXXX");
    if (this.props.dataList != prevProps.dataList) {
      this.setState({ list: this.props.dataList });
    }
    this.state.list.map((data, index) => {
      data.items.map((data, index) => {
        if (data.category == "1") {
          graphData[0].spent += data.price;
        } else if (data.category == "2") {
          graphData[3].spent += data.price;
        } else if (data.category == "3") {
          graphData[2].spent += data.price;
        } else if (data.category == "4") {
          graphData[1].spent += data.price;
        } else if (data.category == "5") {
          graphData[5].spent += data.price;
        }
      });
    });

  };*/

  /*
  componentDidMount = () => {
    console.log("AHHHHHH" + JSON.stringify(this.props.dataList));
    //this.props.dataList["receipt"]
    console.log(this.props.dataList[0], "test");
    console.log(this.props.dataList.length, "length of edatalist");

    if (this.props.dataList) {
      for (let receipt of this.props.dataList) {
        console.log(receipt, "each element");
        for (let item of receipt["items"]) {
          console.log("data inside receipt", item);
          if (item.category == "1") {
            graphData[0].spent += item.price;
          } else if (item.category == "2") {
            graphData[3].spent += item.price;
          } else if (item.category == "3") {
            graphData[2].spent += item.price;
          } else if (item.category == "4") {
            graphData[1].spent += item.price;
          } else if (item.category == "5") {
            graphData[5].spent += item.price;
          }
        }
      }
    }*/

  /*
      this.props.dataList['items'].map((data, index) => {
        data.items.map((data, index) => {
          if (data.category == "1") {
            graphData[0].spent += data.price;
          } else if (data.category == "2") {
            graphData[3].spent += data.price;
          } else if (data.category == "3") {
            graphData[2].spent += data.price;
          } else if (data.category == "4") {
            graphData[1].spent += data.price;
          } else if (data.category == "5") {
            graphData[5].spent += data.price;
          }
        });
      });*/

  //this.setState({ renderCount: renderCount + 1 });
  //};

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
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Dropdown
            label="Period"
            data={[
              {
                value: "This month"
              },
              {
                value: "Last month"
              },
              {
                value: "6 months"
              },
              {
                value: "12 months"
              }
            ]}
            onChangeText={() => {
              //console.log("ASKJDALKSJDLAKSJDLAKSJDLAJKSD");
              if (this.value == "This month") {
                for (let i = 0; i < 5; i++) {
                  graphData[i].spent = current_month_data[i];
                }
              } else if (this.value == "Last month") {
                for (let i = 0; i < 5; i++) {
                  graphData[i].spent = last_month_data[i];
                }
              } else if (this.value == "6 months") {
                for (let i = 0; i < 5; i++) {
                  graphData[i].spent = six_month_data[i];
                }
              } else {
                for (let i = 0; i < 5; i++) {
                  graphData[i].spent = twelve_month_data[i];
                }
              }
            }}
          />
        </View>
        <PieChart
          data={graphData}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={pieChartConfig}
          accessor="spent"
          backgroundColor="transparent"
          paddingLeft="2"
          absolute={true}
          style={({ marginBottom: 50, marginTop: 30 }, { marginLeft: 2 })}
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
