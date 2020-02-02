import React from "react";
import { Text, View, SafeAreaView, TextInput, ScrollView , TouchableOpacity} from "react-native";
import { styles } from "./styles.js";
import { Header, Icon, ListItem, Badge, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class ScanInfoScreen extends React.Component {
    

    updateList = async () => {
        data.map((name, price)=>{
            console.log(name);
            console.log(price);
        });
    }

    selectCategory(c) {
        this.setState({currentCategory:c});
    }

  //res = {"response":{"100% WW FIVE GR BR":1.9,"3\" NS SS SAUTE PAN":10.99,"PUBLIX BRAN FLAKES":2.85,"total":16.51}};
  //  data = res.response;
  state = {
    ccolor:["white","#70C4FF", "#F56B5E", "#F5E184", "#3FC272","grey"],
    icolor:["#F6F5F1", "#93D4FF", "#F5A497", "#F5EFAC", "#84C295", "#F6F5F1"],
    currentCategory: 1
  }

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
            size={this.state.currentCategory==1? 30 : 25}
            onPress={()=>this.selectCategory(1)}
          />
          <Icon
            reverse
            raised
            name="cart-minus"
            type="material-community"
            color="#F56B5E"
            size={this.state.currentCategory==2? 30 : 25}
            onPress={()=>this.selectCategory(2)}
          />
          <Icon
            reverse
            raised
            name="silverware-fork-knife"
            type="material-community"
            color="#F5E184"
            size={this.state.currentCategory==3? 30 : 25}
            onPress={()=>this.selectCategory(3)}
          />
          <Icon
            reverse
            raised
            name="popcorn"
            type="material-community"
            color="#3FC272"
            size={this.state.currentCategory==4? 30 : 25}
            onPress={()=>this.selectCategory(4)}
          />
          <Icon
            reverse
            raised
            name="border-none-variant"
            type="material-community"
            color="grey"
            size={this.state.currentCategory==5? 30 : 25}
            onPress={()=>this.selectCategory(5)}
          />
        </View>
        <ScrollView>
          <View>
            {this.props.itemList.map((l, i) => (
              <View style={{height: 60, flexDirection: "row"}}>
                  <TouchableOpacity style={{backgroundColor: this.state.ccolor[l.category], height: 60, flex:1}} onPressOut={
                      ()=>{
                          const list = this.props.itemList;
                          list[i].category=this.state.currentCategory;
                          this.props.cl(list);
                        }
                      }></TouchableOpacity>
                  <TextInput placeholder="enter" value={l.name} onChangeText={
                      (val)=>{
                          const list = this.props.itemList;
                          list[i].name=val;
                          this.props.cl(list);
                          //console.log(val);
                        }
                      } style={{flex: 5, backgroundColor: this.state.icolor[l.category], paddingLeft: 10}}/>
                  <TextInput placeholder="enter" value={l.price.toString()} onChangeText={
                      (val)=>{
                        const list = this.props.itemList;
                        list[i].price=val;
                        this.props.cl(list);
                      }
                    } style={{flex: 5, backgroundColor: this.state.icolor[l.category], paddingLeft: 10}}/>
              </View>
            ))}
          </View>
        </ScrollView>

        <SafeAreaView style={styles.confirmDenyBar}>
          <View style={{ marginTop: 20 }}>
            <Text style={{ width: 270, fontSize: 20, paddingLeft: 10 }}>
              Total Price: {this.props.total}
            </Text>
          </View>

          <View style={styles.confirmDeny}>
            <Icon
              reverse
              raised
              name="cancel"
              type="material-community"
              color="#F56B5E"
              onPress={()=>{this.props.toggle(false)}}
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
