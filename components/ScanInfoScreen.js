import React from "react";
import { Text, View, SafeAreaView, TextInput, ScrollView } from "react-native";
import { styles } from "./styles.js";
import { Header, Icon, ListItem, Badge, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class ScanInfoScreen extends React.Component {
  list = [
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
    }
  ];

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
            color="#70C4FF"
          />
          <Icon
            reverse
            raised
            name="cart-minus"
            type="material-community"
            color="#F56B5E"
          />
          <Icon
            reverse
            raised
            name="silverware-fork-knife"
            type="material-community"
            color="#F5E184"
          />
          <Icon
            reverse
            raised
            name="popcorn"
            type="material-community"
            color="#3FC272"
          />
          <Icon
            reverse
            raised
            name="border-none-variant"
            type="material-community"
            color="grey"
          />
        </View>
        <ScrollView>
          <View>
            {this.list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
                bottomDivider
              />
            ))}
          </View>
        </ScrollView>

        <SafeAreaView style={styles.confirmDenyBar}>
          <View style={{ marginTop: 20 }}>
            <Text style={{ width: 270 }}>
              Total price: change this font bruh
            </Text>
          </View>

          <View style={styles.confirmDeny}>
            <Icon
              reverse
              raised
              name="cancel"
              type="material-community"
              color="#F56B5E"
            />
            <Icon
              reverse
              raised
              name="check"
              type="material-community"
              color="#3FC272"
            />
          </View>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

export default ScanInfoScreen;
