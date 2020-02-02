import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator
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

let list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  }
];

//"#3FC272", "#F5E184", "#F56B5E",
class PurchaseHistory extends React.Component {
  state = {
    purchaseList: list, //when adding to here, INSERT AT BEGINNING
    currentIndex: -1,
    showList: false,
    currentPurchasedItems: []
  };

  onPress = index => {
    this.setState({
      currentIndex: index,
      showList: true,
      currentPurchasedItems: this.state.purchaseList[index]
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.slideBody}>
        <View style={{ backgroundColor: "black", height: 30 }}></View>
        <Header
          placement="center"
          centerComponent={{
            text: "Purchase History",
            style: styles.scanInfoText
          }}
          containerStyle={styles.scanInfoHeader}
        />
        <ScrollView>
          <View>
            {this.state.purchaseList.map((
              l,
              i //i = index, l = item
            ) => (
              <ListItem
                key={i}
                title={"Price"}
                subtitle={"Date"}
                bottomDivider
                onPress={() => this.onPress(i)}
              />
            ))}
          </View>
          <Modal
            visible={this.state.showList}
            onRequestClose={() => (this.state.showList = false)}
          >
            <View>
              {this.state.currentPurchasedItems.map((
                l,
                i //i = index, l = item
              ) => (
                <ListItem title={"Name"} subtitle={"Price"} bottomDivider />
              ))}
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PurchaseHistory;
