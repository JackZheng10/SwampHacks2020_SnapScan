import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Dimensions, Modal
} from "react-native";
import { styles } from "./styles.js";
import { Header, Icon, ListItem, Badge } from "react-native-elements";

//"#3FC272", "#F5E184", "#F56B5E",
class PurchaseHistory extends React.Component {
  state = {
    popup: true,
    list: [],
    total: 0
  };


  onPress = key => {
    this.setState({popup:true});
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
            {this.props.list.map((l,i) => (
              <ListItem
              key={i}
              title={i}
              subtitle={"total: "+i.total}
              bottomDivider
              onPress={() => this.onPress(i)}
            />
            ))}
          </View>
        </ScrollView>
        <Modal visible={this.state.popup} transparent={true} onRequestClose={()=>{this.setState({popup:false})}}>
          <View style={{flex: 1,
        flexDirection: 'column',
        paddingTop: 50,
        backgroundColor: "#55555588"
          }}>
          <SafeAreaView style={{flex: 1,
          marginVertical: 100,
          marginHorizontal: 20,
          padding: 10,
          backgroundColor: "#FFF",
          borderRadius: 10,}}>
            <SafeAreaView style={{flex: 1, flexDirection: "column"}}>
                <Text style={{textAlign:"center", marginTop: 20}}>Receipt</Text>
                <Text style={{textAlign:"right", marginTop: 20, marginRight: 10}}>Date: </Text>
              <ScrollView>
              
              </ScrollView>
              <Text style={{textAlign:"right", marginTop: 20, marginRight: 10}}>Total: {this.state.total}</Text>
              <Text></Text>
            </SafeAreaView>
          </SafeAreaView>
          </View>

      </Modal>
      </SafeAreaView>
    );
  }
}

export default PurchaseHistory;
